-- Add new columns to settings table for learning mode feature

-- Add daily_limit column (default 10 cards per day)
ALTER TABLE public.settings
ADD COLUMN IF NOT EXISTS daily_limit INTEGER DEFAULT 10;

-- Add hide_future_cards column (default true - hide Box 2+ until due)
ALTER TABLE public.settings
ADD COLUMN IF NOT EXISTS hide_future_cards BOOLEAN DEFAULT true;

-- Update existing rows to have default values
UPDATE public.settings
SET daily_limit = 10
WHERE daily_limit IS NULL;

UPDATE public.settings
SET hide_future_cards = true
WHERE hide_future_cards IS NULL;
