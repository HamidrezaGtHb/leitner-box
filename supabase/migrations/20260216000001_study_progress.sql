-- Migration: Add study_progress table for tracking mastery levels
-- This table stores user progress for Study Sets feature

create table study_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  card_id text not null,
  category text not null,
  mastery_level int default 0 check (mastery_level >= 0 and mastery_level <= 3),
  last_reviewed_at timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  
  unique(user_id, card_id)
);

-- Index for fast lookups by user and category
create index idx_study_progress_user_category 
  on study_progress(user_id, category);

-- Row Level Security Policies
alter table study_progress enable row level security;

create policy "Users can view own progress"
  on study_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on study_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on study_progress for update
  using (auth.uid() = user_id);
