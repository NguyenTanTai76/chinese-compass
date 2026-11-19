-- Chinese Compass Database Migration
-- Generated from prisma/schema.prisma
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/<your-project>/sql

-- Enable UUID extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- TABLES
-- ============================================

-- Profile table
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar_url" TEXT,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "last_active" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- VocabWord table
CREATE TABLE "VocabWord" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "hanzi" TEXT NOT NULL,
    "pinyin" TEXT NOT NULL,
    "meaning_vi" TEXT NOT NULL,
    "hsk_level" INTEGER NOT NULL,
    "audio_url" TEXT,
    "components" TEXT[] NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "VocabWord_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "VocabWord_hanzi_key" ON "VocabWord"("hanzi");
CREATE INDEX "VocabWord_hsk_level_idx" ON "VocabWord"("hsk_level");

-- CardReview table
CREATE TABLE "CardReview" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "user_id" TEXT NOT NULL,
    "vocab_word_id" TEXT NOT NULL,
    "ease_factor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 0,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "due_at" TIMESTAMPTZ NOT NULL,
    "last_reviewed" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "CardReview_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CardReview_user_id_vocab_word_id_key" ON "CardReview"("user_id", "vocab_word_id");
CREATE INDEX "CardReview_user_id_due_at_idx" ON "CardReview"("user_id", "due_at");

-- Phrase table
CREATE TABLE "Phrase" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "vietnamese" TEXT NOT NULL,
    "chinese" TEXT NOT NULL,
    "pinyin" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "audio_url" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "Phrase_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Phrase_chinese_key" ON "Phrase"("chinese");
CREATE INDEX "Phrase_category_idx" ON "Phrase"("category");

-- PhraseReview table
CREATE TABLE "PhraseReview" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "user_id" TEXT NOT NULL,
    "phrase_id" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "PhraseReview_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PhraseReview_user_id_phrase_id_key" ON "PhraseReview"("user_id", "phrase_id");
CREATE INDEX "PhraseReview_user_id_idx" ON "PhraseReview"("user_id");

-- StudyLog table
CREATE TABLE "StudyLog" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "xp_earned" INTEGER NOT NULL DEFAULT 0,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "StudyLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "StudyLog_user_id_date_type_key" ON "StudyLog"("user_id", "date", "type");
CREATE INDEX "StudyLog_user_id_date_idx" ON "StudyLog"("user_id", "date");

-- GrammarLesson table
CREATE TABLE "GrammarLesson" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "level" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "GrammarLesson_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "GrammarLesson_title_key" ON "GrammarLesson"("title");

-- ReadingPassage table
CREATE TABLE "ReadingPassage" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "word_count" INTEGER NOT NULL,
    "audio_url" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "ReadingPassage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReadingPassage_title_key" ON "ReadingPassage"("title");

-- ============================================
-- FOREIGN KEYS
-- ============================================

ALTER TABLE "CardReview"
    ADD CONSTRAINT "CardReview_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "Profile"("user_id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CardReview"
    ADD CONSTRAINT "CardReview_vocab_word_id_fkey"
    FOREIGN KEY ("vocab_word_id") REFERENCES "VocabWord"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PhraseReview"
    ADD CONSTRAINT "PhraseReview_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "Profile"("user_id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PhraseReview"
    ADD CONSTRAINT "PhraseReview_phrase_id_fkey"
    FOREIGN KEY ("phrase_id") REFERENCES "Phrase"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "StudyLog"
    ADD CONSTRAINT "StudyLog_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "Profile"("user_id")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

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
    FOR SELECT USING (auth.uid()::text = "user_id");

CREATE POLICY "Users can update own profile" ON "Profile"
    FOR UPDATE USING (auth.uid()::text = "user_id");

CREATE POLICY "Users can insert own profile" ON "Profile"
    FOR INSERT WITH CHECK (auth.uid()::text = "user_id");

-- VocabWord policies (public read for all authenticated users)
CREATE POLICY "Authenticated users can read vocab" ON "VocabWord"
    FOR SELECT USING (auth.role() = 'authenticated');

-- CardReview policies
CREATE POLICY "Users can view own card reviews" ON "CardReview"
    FOR SELECT USING (auth.uid()::text = "user_id");

CREATE POLICY "Users can insert own card reviews" ON "CardReview"
    FOR INSERT WITH CHECK (auth.uid()::text = "user_id");

CREATE POLICY "Users can update own card reviews" ON "CardReview"
    FOR UPDATE USING (auth.uid()::text = "user_id");

-- Phrase policies (public read for all authenticated users)
CREATE POLICY "Authenticated users can read phrases" ON "Phrase"
    FOR SELECT USING (auth.role() = 'authenticated');

-- PhraseReview policies
CREATE POLICY "Users can view own phrase reviews" ON "PhraseReview"
    FOR SELECT USING (auth.uid()::text = "user_id");

CREATE POLICY "Users can insert own phrase reviews" ON "PhraseReview"
    FOR INSERT WITH CHECK (auth.uid()::text = "user_id");

CREATE POLICY "Users can update own phrase reviews" ON "PhraseReview"
    FOR UPDATE USING (auth.uid()::text = "user_id");

-- StudyLog policies
CREATE POLICY "Users can view own study logs" ON "StudyLog"
    FOR SELECT USING (auth.uid()::text = "user_id");

CREATE POLICY "Users can insert own study logs" ON "StudyLog"
    FOR INSERT WITH CHECK (auth.uid()::text = "user_id");

-- GrammarLesson policies (public read)
CREATE POLICY "Authenticated users can read grammar lessons" ON "GrammarLesson"
    FOR SELECT USING (auth.role() = 'authenticated');

-- ReadingPassage policies (public read)
CREATE POLICY "Authenticated users can read passages" ON "ReadingPassage"
    FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================
-- HELPER FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION current_user_id() RETURNS text
LANGUAGE sql SECURITY DEFINER
AS $$ SELECT auth.uid()::text; $$;

GRANT EXECUTE ON FUNCTION current_user_id() TO authenticated;

-- ============================================
-- TRIGGER FOR updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profile_updated_at
    BEFORE UPDATE ON "Profile"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();