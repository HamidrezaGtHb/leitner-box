-- Add metadata column to backlog table for storing additional data (e.g., German translation for Persian sentences)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'backlog' AND column_name = 'metadata'
  ) THEN
    ALTER TABLE backlog ADD COLUMN metadata JSONB DEFAULT NULL;
  END IF;
END $$;

-- Add comment for documentation
COMMENT ON COLUMN backlog.metadata IS 'Additional metadata for backlog items (e.g., germanTranslation for fa-de items)';
