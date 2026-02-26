-- Migration: Add performance indexes for better query optimization
-- This migration adds composite indexes to improve query performance

-- Index for streak calculation (reviews by user and date descending)
-- Improves: calculateStreak in src/lib/streak.ts
CREATE INDEX IF NOT EXISTS reviews_user_date_desc_idx 
  ON reviews(user_id, reviewed_at DESC);

-- Composite index for cards queries (user, box, due_date)
-- Improves: Today page queries and box filtering
CREATE INDEX IF NOT EXISTS cards_user_box_due_idx 
  ON cards(user_id, box, due_date);

-- Index for cards by user and creation date
-- Improves: Cards page initial load and pagination
CREATE INDEX IF NOT EXISTS cards_user_created_idx 
  ON cards(user_id, created_at DESC);

-- Index for study progress lookups by user and category
-- Already exists but ensuring it's there: idx_study_progress_user_category
-- This index is created in 20260216000001_study_progress.sql
