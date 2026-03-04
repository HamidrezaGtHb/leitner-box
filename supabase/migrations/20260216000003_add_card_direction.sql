-- Add direction column to cards table
ALTER TABLE cards ADD COLUMN direction TEXT NOT NULL DEFAULT 'de-fa' 
  CHECK (direction IN ('de-fa', 'fa-de'));

-- Add direction column to backlog table
ALTER TABLE backlog ADD COLUMN direction TEXT NOT NULL DEFAULT 'de-fa'
  CHECK (direction IN ('de-fa', 'fa-de'));

-- Create index for better query performance
CREATE INDEX idx_cards_direction ON cards(user_id, direction);
CREATE INDEX idx_backlog_direction ON backlog(user_id, direction);

-- Add comment for documentation
COMMENT ON COLUMN cards.direction IS 'Card direction: de-fa (German→Persian) or fa-de (Persian→German)';
COMMENT ON COLUMN backlog.direction IS 'Backlog item direction: de-fa (German→Persian) or fa-de (Persian→German)';
