BEGIN;

CREATE TABLE public."ProgressEvent" (
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    id uuid NOT NULL,
    sequence bigint GENERATED ALWAYS AS IDENTITY,
    event jsonb NOT NULL,
    PRIMARY KEY (user_id, id),
    CHECK (jsonb_typeof(event) = 'object' AND (event->>'id') IS NOT DISTINCT FROM id::text)
);

CREATE UNIQUE INDEX "ProgressEvent_user_sequence_key"
    ON public."ProgressEvent" (user_id, sequence);

ALTER TABLE public."ProgressEvent" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."ProgressEvent" FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT ON public."ProgressEvent" TO authenticated;
CREATE POLICY "Read own progress" ON public."ProgressEvent"
    FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Append own progress" ON public."ProgressEvent"
    FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE TABLE public."StudyPlan" (
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    week_start date NOT NULL CHECK (extract(isodow FROM week_start) = 1),
    plan jsonb NOT NULL CHECK (
        jsonb_typeof(plan) = 'object'
        AND plan @> '{"version":1}'
        AND jsonb_typeof(plan->'tasks') IS NOT DISTINCT FROM 'array'
    ),
    PRIMARY KEY (user_id, week_start)
);

ALTER TABLE public."StudyPlan" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."StudyPlan" FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public."StudyPlan" TO authenticated;
CREATE POLICY "Manage own study plan" ON public."StudyPlan" FOR ALL TO authenticated
    USING ((SELECT auth.uid()) = user_id) WITH CHECK ((SELECT auth.uid()) = user_id);

REVOKE ALL ON public."Profile", public."CardReview", public."PhraseReview", public."StudyLog",
    public."VocabWord", public."Phrase", public."GrammarLesson", public."ReadingPassage"
    FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public."Profile", public."CardReview", public."PhraseReview" TO authenticated;
GRANT SELECT, INSERT ON public."StudyLog" TO authenticated;
GRANT SELECT ON public."VocabWord", public."Phrase", public."GrammarLesson", public."ReadingPassage" TO authenticated;

ALTER POLICY "Users can view own profile" ON public."Profile" TO authenticated USING ((SELECT auth.uid())::text = user_id);
ALTER POLICY "Users can insert own profile" ON public."Profile" TO authenticated WITH CHECK ((SELECT auth.uid())::text = user_id);
ALTER POLICY "Users can update own profile" ON public."Profile" TO authenticated
    USING ((SELECT auth.uid())::text = user_id) WITH CHECK ((SELECT auth.uid())::text = user_id);
ALTER POLICY "Users can view own card reviews" ON public."CardReview" TO authenticated USING ((SELECT auth.uid())::text = user_id);
ALTER POLICY "Users can insert own card reviews" ON public."CardReview" TO authenticated WITH CHECK ((SELECT auth.uid())::text = user_id);
ALTER POLICY "Users can update own card reviews" ON public."CardReview" TO authenticated
    USING ((SELECT auth.uid())::text = user_id) WITH CHECK ((SELECT auth.uid())::text = user_id);
ALTER POLICY "Users can view own phrase reviews" ON public."PhraseReview" TO authenticated USING ((SELECT auth.uid())::text = user_id);
ALTER POLICY "Users can insert own phrase reviews" ON public."PhraseReview" TO authenticated WITH CHECK ((SELECT auth.uid())::text = user_id);
ALTER POLICY "Users can update own phrase reviews" ON public."PhraseReview" TO authenticated
    USING ((SELECT auth.uid())::text = user_id) WITH CHECK ((SELECT auth.uid())::text = user_id);
ALTER POLICY "Users can view own study logs" ON public."StudyLog" TO authenticated USING ((SELECT auth.uid())::text = user_id);
ALTER POLICY "Users can insert own study logs" ON public."StudyLog" TO authenticated WITH CHECK ((SELECT auth.uid())::text = user_id);
ALTER POLICY "Authenticated users can read vocab" ON public."VocabWord" TO authenticated USING (true);
ALTER POLICY "Authenticated users can read phrases" ON public."Phrase" TO authenticated USING (true);
ALTER POLICY "Authenticated users can read grammar lessons" ON public."GrammarLesson" TO authenticated USING (true);
ALTER POLICY "Authenticated users can read passages" ON public."ReadingPassage" TO authenticated USING (true);

ALTER FUNCTION public.current_user_id() SECURITY INVOKER;
REVOKE EXECUTE ON FUNCTION public.current_user_id() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.current_user_id() TO authenticated;

-- Preserve the XP total for profiles associated with real Auth users.
-- Legacy StudyLog rows remain intact. They contain daily aggregates without scores.
INSERT INTO public."ProgressEvent" (user_id, id, event)
SELECT users.id, legacy.id, jsonb_build_object('id', legacy.id, 'at', 0, 'kind', 'xp', 'xp', profile.xp)
FROM public."Profile" profile
JOIN auth.users users ON users.id::text = profile.user_id
CROSS JOIN LATERAL (SELECT md5('profile-xp:' || profile.id)::uuid AS id) legacy
WHERE profile.xp > 0;

-- Preserve cards shown on the old dashboard, including the original saved date.
INSERT INTO public."ProgressEvent" (user_id, id, event)
SELECT users.id, legacy.id, jsonb_build_object(
    'id', legacy.id, 'at', floor(extract(epoch FROM review.created_at) * 1000)::bigint,
    'kind', 'save', 'card', jsonb_build_object(
        'hanzi', vocab.hanzi, 'pinyin', vocab.pinyin, 'meaningVi', vocab.meaning_vi, 'hskLevel', vocab.hsk_level))
FROM public."CardReview" review
JOIN public."VocabWord" vocab ON vocab.id = review.vocab_word_id
JOIN auth.users users ON users.id::text = review.user_id
CROSS JOIN LATERAL (SELECT md5('card-review:' || review.id)::uuid AS id) legacy;

COMMIT;
