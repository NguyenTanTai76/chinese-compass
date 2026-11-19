-- Supabase Migration: Create ProgressEvent table + RLS
-- Run this in Supabase Dashboard → SQL Editor on the STAGING project only.
-- Do NOT run on production.

-- 1. Create ProgressEvent table
CREATE TABLE IF NOT EXISTS "ProgressEvent" (
  id         text      NOT NULL,
  user_id    text      NOT NULL,
  sequence   bigint    NOT NULL GENERATED ALWAYS AS IDENTITY,
  event      jsonb     NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, id)
);

-- 2. Index for cursor-paginated progress reads
CREATE INDEX IF NOT EXISTS "ProgressEvent_user_id_sequence_idx"
  ON "ProgressEvent" (user_id, sequence);

-- 3. Enable RLS
ALTER TABLE "ProgressEvent" ENABLE ROW LEVEL SECURITY;

-- 4. RLS policies: users can only read/write their own events
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'ProgressEvent' AND policyname = 'Users can view own progress events'
  ) THEN
    CREATE POLICY "Users can view own progress events" ON "ProgressEvent"
      FOR SELECT USING (auth.uid()::text = "userId");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'ProgressEvent' AND policyname = 'Users can insert own progress events'
  ) THEN
    CREATE POLICY "Users can insert own progress events" ON "ProgressEvent"
      FOR INSERT WITH CHECK (auth.uid()::text = "userId");
  END IF;
END $$;

-- 5. Grant usage (harmless if already granted)
GRANT SELECT, INSERT ON "ProgressEvent" TO authenticated;
