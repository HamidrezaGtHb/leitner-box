-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Backlog table
create table public.backlog (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  term text not null,
  term_normalized text not null,
  level text,
  pos text,
  topic text,
  created_at timestamptz default now() not null,
  
  -- Unique constraint: one user cannot have duplicate normalized terms in backlog
  constraint backlog_user_term_unique unique (user_id, term_normalized)
);

-- Cards table
create table public.cards (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  term text not null,
  term_normalized text not null,
  level text,
  pos text,
  box integer default 1 not null check (box >= 1 and box <= 5),
  due_date date default current_date not null,
  back_json jsonb not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  
  -- Unique constraint: one user cannot have duplicate normalized terms in cards
  constraint cards_user_term_unique unique (user_id, term_normalized)
);

-- Reviews table (tracking history)
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  card_id uuid references public.cards(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  result text not null check (result in ('correct', 'wrong')),
  reviewed_at timestamptz default now() not null,
  from_box integer not null,
  to_box integer not null
);

-- Settings table (optional for MVP)
create table public.settings (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  intervals jsonb default '{"1":1,"2":2,"3":4,"4":8,"5":16}'::jsonb not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Indexes
create index backlog_user_id_idx on public.backlog(user_id);
create index backlog_term_normalized_idx on public.backlog(term_normalized);
create index cards_user_id_idx on public.cards(user_id);
create index cards_user_due_idx on public.cards(user_id, due_date);
create index cards_box_idx on public.cards(box);
create index cards_term_normalized_idx on public.cards(term_normalized);
create index reviews_card_id_idx on public.reviews(card_id);
create index reviews_user_id_idx on public.reviews(user_id);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.backlog enable row level security;
alter table public.cards enable row level security;
alter table public.reviews enable row level security;
alter table public.settings enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Backlog policies
create policy "Users can view own backlog"
  on public.backlog for select
  using (auth.uid() = user_id);

create policy "Users can insert own backlog"
  on public.backlog for insert
  with check (auth.uid() = user_id);

create policy "Users can update own backlog"
  on public.backlog for update
  using (auth.uid() = user_id);

create policy "Users can delete own backlog"
  on public.backlog for delete
  using (auth.uid() = user_id);

-- Cards policies
create policy "Users can view own cards"
  on public.cards for select
  using (auth.uid() = user_id);

create policy "Users can insert own cards"
  on public.cards for insert
  with check (auth.uid() = user_id);

create policy "Users can update own cards"
  on public.cards for update
  using (auth.uid() = user_id);

create policy "Users can delete own cards"
  on public.cards for delete
  using (auth.uid() = user_id);

-- Reviews policies
create policy "Users can view own reviews"
  on public.reviews for select
  using (auth.uid() = user_id);

create policy "Users can insert own reviews"
  on public.reviews for insert
  with check (auth.uid() = user_id);

-- Settings policies
create policy "Users can view own settings"
  on public.settings for select
  using (auth.uid() = user_id);

create policy "Users can insert own settings"
  on public.settings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own settings"
  on public.settings for update
  using (auth.uid() = user_id);

-- Trigger for profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  
  insert into public.settings (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger set_updated_at
  before update on public.cards
  for each row execute procedure public.handle_updated_at();

create trigger set_updated_at
  before update on public.settings
  for each row execute procedure public.handle_updated_at();
