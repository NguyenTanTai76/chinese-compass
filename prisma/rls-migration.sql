-- Supabase RLS Migration for Chinese Compass
-- Run this in Supabase SQL Editor after tables are created

-- Enable RLS on all tables
ALTER TABLE "Profile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VocabWord" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CardReview" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Phrase" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PhraseReview" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StudyLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "GrammarLesson" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReadingPassage" ENABLE ROW LEVEL SECURITY;

-- Profile policies
CREATE POLICY "Users can view own profile" ON "Profile"
  FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can update own profile" ON "Profile"
  FOR UPDATE USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own profile" ON "Profile"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

-- VocabWord policies (public read for all authenticated users)
CREATE POLICY "Authenticated users can read vocab" ON "VocabWord"
  FOR SELECT USING (auth.role() = 'authenticated');

-- CardReview policies
CREATE POLICY "Users can view own card reviews" ON "CardReview"
  FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own card reviews" ON "CardReview"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own card reviews" ON "CardReview"
  FOR UPDATE USING (auth.uid()::text = "userId");

-- Phrase policies (public read for all authenticated users)
CREATE POLICY "Authenticated users can read phrases" ON "Phrase"
  FOR SELECT USING (auth.role() = 'authenticated');

-- PhraseReview policies
CREATE POLICY "Users can view own phrase reviews" ON "PhraseReview"
  FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own phrase reviews" ON "PhraseReview"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own phrase reviews" ON "PhraseReview"
  FOR UPDATE USING (auth.uid()::text = "userId");

-- StudyLog policies
CREATE POLICY "Users can view own study logs" ON "StudyLog"
  FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own study logs" ON "StudyLog"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

-- GrammarLesson policies (public read)
CREATE POLICY "Authenticated users can read grammar lessons" ON "GrammarLesson"
  FOR SELECT USING (auth.role() = 'authenticated');

-- ReadingPassage policies (public read)
CREATE POLICY "Authenticated users can read passages" ON "ReadingPassage"
  FOR SELECT USING (auth.role() = 'authenticated');

-- ProgressEvent policies
CREATE POLICY "Users can view own progress events" ON "ProgressEvent"
  FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own progress events" ON "ProgressEvent"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

-- Helper function to get current user id
CREATE OR REPLACE FUNCTION current_user_id() RETURNS text
LANGUAGE sql SECURITY DEFINER
AS $$ SELECT auth.uid()::text; $$;

-- Grant usage on function
GRANT EXECUTE ON FUNCTION current_user_id() TO authenticated;