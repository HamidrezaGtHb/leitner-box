-- Supabase Schema for Leitner Box App
-- Run this in Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)

-- Cards table (Leitner flashcards)
CREATE TABLE IF NOT EXISTS cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word_data JSONB NOT NULL,
  box INTEGER DEFAULT 1 CHECK (box >= 1 AND box <= 5),
  last_reviewed BIGINT,
  next_review BIGINT NOT NULL,
  correct_count INTEGER DEFAULT 0,
  incorrect_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings table (user preferences)
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_new_words INTEGER DEFAULT 10,
  theme TEXT DEFAULT 'system',
  auto_add_from_backlog BOOLEAN DEFAULT true,
  max_backlog_size INTEGER DEFAULT 500,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily stats table (learning statistics)
CREATE TABLE IF NOT EXISTS daily_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL,
  new_words INTEGER DEFAULT 0,
  reviewed INTEGER DEFAULT 0,
  correct INTEGER DEFAULT 0,
  incorrect INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Backlog table (words to learn later)
CREATE TABLE IF NOT EXISTS backlog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word_data JSONB NOT NULL,
  scheduled_for BIGINT NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'generated', 'imported', 'ocr')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cards_next_review ON cards(next_review);
CREATE INDEX IF NOT EXISTS idx_cards_box ON cards(box);
CREATE INDEX IF NOT EXISTS idx_daily_stats_date ON daily_stats(date);
CREATE INDEX IF NOT EXISTS idx_backlog_scheduled_for ON backlog(scheduled_for);

-- Enable Row Level Security (RLS) - currently disabled for simplicity
-- You can enable this later when you add authentication
-- ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE backlog ENABLE ROW LEVEL SECURITY;

-- Insert default settings if not exists
INSERT INTO settings (id, daily_new_words, theme, auto_add_from_backlog, max_backlog_size)
VALUES ('00000000-0000-0000-0000-000000000001', 10, 'system', true, 500)
ON CONFLICT DO NOTHING;
