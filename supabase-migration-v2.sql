-- Supabase Migration V2: Strict Leitner System with Authentication
-- Run this in Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- WARNING: This will DROP existing tables. Backup data if needed.

-- ============================================
-- STEP 1: Drop existing tables (fresh start)
-- ============================================

DROP TABLE IF EXISTS daily_stats CASCADE;
DROP TABLE IF EXISTS backlog CASCADE;
DROP TABLE IF EXISTS cards CASCADE;
DROP TABLE IF EXISTS settings CASCADE;

-- ============================================
-- STEP 2: Create new tables with strict schema
-- ============================================

-- Cards table with strict Leitner fields
CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  normalized_key TEXT NOT NULL,
  word_data JSONB NOT NULL,
  box_index INTEGER DEFAULT 1 CHECK (box_index >= 1 AND box_index <= 5),
  next_review_at TIMESTAMPTZ NOT NULL,
  last_reviewed_at TIMESTAMPTZ,
  last_answer TEXT CHECK (last_answer IN ('correct', 'wrong', 'hard')),
  correct_count INTEGER DEFAULT 0,
  incorrect_count INTEGER DEFAULT 0,
  hard_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, normalized_key)
);

-- Settings with Locked Mode and intervals
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  daily_new_words INTEGER DEFAULT 10,
  theme TEXT DEFAULT 'system',
  is_locked_mode BOOLEAN DEFAULT false,
  review_intervals JSONB DEFAULT '[1, 2, 4, 7, 14]'::jsonb,
  auto_add_from_backlog BOOLEAN DEFAULT true,
  max_backlog_size INTEGER DEFAULT 500,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Backlog with normalized_key
CREATE TABLE backlog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  normalized_key TEXT NOT NULL,
  word_data JSONB NOT NULL,
  scheduled_for TIMESTAMPTZ NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'generated', 'imported', 'ocr')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, normalized_key)
);

-- Daily stats per user
CREATE TABLE daily_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  new_words INTEGER DEFAULT 0,
  reviewed INTEGER DEFAULT 0,
  correct INTEGER DEFAULT 0,
  incorrect INTEGER DEFAULT 0,
  hard INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- ============================================
-- STEP 3: Create indexes for performance
-- ============================================

CREATE INDEX idx_cards_user_next_review ON cards(user_id, next_review_at);
CREATE INDEX idx_cards_normalized_key ON cards(normalized_key);
CREATE INDEX idx_cards_box_index ON cards(box_index);
CREATE INDEX idx_backlog_user_scheduled ON backlog(user_id, scheduled_for);
CREATE INDEX idx_backlog_normalized_key ON backlog(normalized_key);
CREATE INDEX idx_daily_stats_user_date ON daily_stats(user_id, date);

-- ============================================
-- STEP 4: Enable Row Level Security (RLS)
-- ============================================

ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE backlog ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 5: Create RLS Policies
-- ============================================

-- Cards policies
CREATE POLICY "Users can view their own cards"
  ON cards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cards"
  ON cards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cards"
  ON cards FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cards"
  ON cards FOR DELETE
  USING (auth.uid() = user_id);

-- Settings policies
CREATE POLICY "Users can view their own settings"
  ON settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings"
  ON settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
  ON settings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own settings"
  ON settings FOR DELETE
  USING (auth.uid() = user_id);

-- Daily stats policies
CREATE POLICY "Users can view their own stats"
  ON daily_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats"
  ON daily_stats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats"
  ON daily_stats FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stats"
  ON daily_stats FOR DELETE
  USING (auth.uid() = user_id);

-- Backlog policies
CREATE POLICY "Users can view their own backlog"
  ON backlog FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own backlog"
  ON backlog FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own backlog"
  ON backlog FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own backlog"
  ON backlog FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- STEP 6: Create helper functions
-- ============================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_cards_updated_at BEFORE UPDATE ON cards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMPLETED
-- ============================================

-- Migration completed successfully!
-- Next steps:
-- 1. Enable email authentication in Supabase Dashboard (Authentication -> Providers)
-- 2. Configure email templates if needed
-- 3. Test the schema with a test user
-- 4. Update your .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
