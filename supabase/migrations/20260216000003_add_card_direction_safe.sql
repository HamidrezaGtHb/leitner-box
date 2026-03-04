-- Add direction column to cards table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'cards' AND column_name = 'direction'
  ) THEN
    ALTER TABLE cards ADD COLUMN direction TEXT NOT NULL DEFAULT 'de-fa' 
      CHECK (direction IN ('de-fa', 'fa-de'));
  END IF;
END $$;

-- Add direction column to backlog table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'backlog' AND column_name = 'direction'
  ) THEN
    ALTER TABLE backlog ADD COLUMN direction TEXT NOT NULL DEFAULT 'de-fa'
      CHECK (direction IN ('de-fa', 'fa-de'));
  END IF;
END $$;

-- Create index for cards (if not exists)
CREATE INDEX IF NOT EXISTS idx_cards_direction ON cards(user_id, direction);

-- Create index for backlog (if not exists)
CREATE INDEX IF NOT EXISTS idx_backlog_direction ON backlog(user_id, direction);

-- Add comments
COMMENT ON COLUMN cards.direction IS 'Card direction: de-fa (German→Persian) or fa-de (Persian→German)';
COMMENT ON COLUMN backlog.direction IS 'Backlog item direction: de-fa (German→Persian) or fa-de (Persian→German)';
