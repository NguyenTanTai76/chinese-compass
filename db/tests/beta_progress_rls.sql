-- Run only against a disposable database after applying both migrations.
BEGIN;

INSERT INTO auth.users (id, email) VALUES
    ('95f9da46-1baa-4d74-ac46-9ee358dc4801', 'beta-a-fixture@example.invalid'),
    ('95f9da46-1baa-4d74-ac46-9ee358dc4802', 'beta-b-fixture@example.invalid');

INSERT INTO public."VocabWord" (id, hanzi, pinyin, meaning_vi, hsk_level)
VALUES ('beta-vocab-fixture', '测', 'cè', 'kiểm tra', 1);
INSERT INTO public."Phrase" (id, vietnamese, chinese, pinyin, category)
VALUES ('beta-phrase-fixture', 'Câu kiểm thử', '测试句', 'cèshì jù', 'beta-test');

SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', '95f9da46-1baa-4d74-ac46-9ee358dc4801', true);

INSERT INTO public."Profile" (user_id, email)
VALUES (auth.uid()::text, 'beta-a-fixture@example.invalid');

INSERT INTO public."CardReview" (user_id, vocab_word_id, due_at, last_reviewed)
VALUES (auth.uid()::text, 'beta-vocab-fixture', now(), now());
INSERT INTO public."PhraseReview" (user_id, phrase_id, correct, score)
VALUES (auth.uid()::text, 'beta-phrase-fixture', true, 100);
INSERT INTO public."StudyLog" (user_id, type, date)
VALUES (auth.uid()::text, 'test', '2026-11-16');

INSERT INTO public."StudyPlan" (user_id, week_start, plan)
VALUES (auth.uid(), '2026-11-16', '{"version":1,"tasks":[]}');

INSERT INTO public."ProgressEvent" (user_id, id, event)
VALUES
    (auth.uid(), '4bd8d2d0-31eb-4fb0-8fff-6a8348365201',
    '{"id":"4bd8d2d0-31eb-4fb0-8fff-6a8348365201","at":1794816000000,"kind":"session","result":{"type":"test","score":11,"total":20},"xp":33}'),
    (auth.uid(), '4bd8d2d0-31eb-4fb0-8fff-6a8348365202',
    '{"id":"4bd8d2d0-31eb-4fb0-8fff-6a8348365202","at":1794816000000,"kind":"session","result":{"type":"test","score":16,"total":20},"xp":48}');

-- An upload retried after a lost response must have no effect.
INSERT INTO public."ProgressEvent" (user_id, id, event)
SELECT user_id, id, event FROM public."ProgressEvent"
ON CONFLICT (user_id, id) DO NOTHING;

DO $$
BEGIN
    IF (SELECT count(*) FROM public."ProgressEvent") <> 2 OR
       (SELECT sum((event#>>'{result,score}')::int) FROM public."ProgressEvent") <> 27 THEN
        RAISE EXCEPTION 'A cannot recover both exact scores after a retry';
    END IF;
END;
$$;

SELECT set_config('request.jwt.claim.sub', '95f9da46-1baa-4d74-ac46-9ee358dc4802', true);
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM public."Profile") OR
       EXISTS (SELECT 1 FROM public."CardReview") OR
       EXISTS (SELECT 1 FROM public."PhraseReview") OR
       EXISTS (SELECT 1 FROM public."StudyLog") OR
       EXISTS (SELECT 1 FROM public."ProgressEvent") OR
       EXISTS (SELECT 1 FROM public."StudyPlan") THEN
        RAISE EXCEPTION 'B can read A data';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public."VocabWord" WHERE id = 'beta-vocab-fixture') THEN
        RAISE EXCEPTION 'Authenticated users cannot read shared vocab';
    END IF;

    UPDATE public."StudyPlan" SET plan = '{"version":1,"tasks":[{}]}';
    IF FOUND THEN RAISE EXCEPTION 'B can update A plan'; END IF;

    BEGIN
        INSERT INTO public."ProgressEvent" (user_id, id, event)
        VALUES ('95f9da46-1baa-4d74-ac46-9ee358dc4801', '4bd8d2d0-31eb-4fb0-8fff-6a8348365203',
          '{"id":"4bd8d2d0-31eb-4fb0-8fff-6a8348365203","at":1794816000000,"kind":"xp","xp":9}');
        RAISE EXCEPTION 'B can insert progress for A';
    EXCEPTION WHEN insufficient_privilege THEN NULL;
    END;
END;
$$;

INSERT INTO public."StudyPlan" (user_id, week_start, plan)
VALUES (auth.uid(), '2026-11-16', '{"version":1,"tasks":[{}]}');

INSERT INTO public."ProgressEvent" (user_id, id, event)
VALUES (auth.uid(), '4bd8d2d0-31eb-4fb0-8fff-6a8348365201',
    '{"id":"4bd8d2d0-31eb-4fb0-8fff-6a8348365201","at":1794816000000,"kind":"xp","xp":9}');

SELECT set_config('request.jwt.claim.sub', '95f9da46-1baa-4d74-ac46-9ee358dc4801', true);
DO $$
BEGIN
    IF (SELECT count(*) FROM public."ProgressEvent") <> 2 OR
       (SELECT jsonb_array_length(plan->'tasks') FROM public."StudyPlan") <> 0 THEN
        RAISE EXCEPTION 'A sees B data';
    END IF;
END;
$$;

SET LOCAL ROLE anon;
SELECT set_config('request.jwt.claim.sub', '', true);
DO $$
BEGIN
    BEGIN
        PERFORM 1 FROM public."ProgressEvent";
        RAISE EXCEPTION 'Anon can query progress';
    EXCEPTION WHEN insufficient_privilege THEN NULL;
    END;
    BEGIN
        PERFORM 1 FROM public."StudyPlan";
        RAISE EXCEPTION 'Anon can query plans';
    EXCEPTION WHEN insufficient_privilege THEN NULL;
    END;
END;
$$;

ROLLBACK;
