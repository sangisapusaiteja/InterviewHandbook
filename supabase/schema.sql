-- ============================================================
-- Interview Handbook auth migration
-- Replaces Clerk auth with custom username + password accounts.
-- Run this in the Supabase SQL Editor.
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ------------------------------------------------------------
-- 1. Custom accounts
-- ------------------------------------------------------------
create table if not exists public.auth_users (
  id text primary key,
  username text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.auth_sessions (
  id text primary key,
  user_id text not null references public.auth_users (id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists auth_sessions_user_id_idx
  on public.auth_sessions (user_id);

-- ------------------------------------------------------------
-- 2. Rename clerk_user_id -> user_id on existing tables
--    (preserves existing progress/preferences data)
--    Drop the dependent view first, then recreate it later.
-- ------------------------------------------------------------
drop view if exists public.user_progress_dashboard;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'user_topic_progress'
      and column_name = 'clerk_user_id'
  ) then
    alter table public.user_topic_progress
      rename column clerk_user_id to user_id;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'user_preferences'
      and column_name = 'clerk_user_id'
  ) then
    alter table public.user_preferences
      rename column clerk_user_id to user_id;
  end if;
end $$;

-- ------------------------------------------------------------
-- 3. Add foreign keys to auth_users (idempotent)
--    First remove orphaned rows whose user_id has no matching
--    auth_users entry (e.g. old Clerk user ids).
-- ------------------------------------------------------------
delete from public.user_topic_progress
where user_id not in (select id from public.auth_users);

delete from public.user_preferences
where user_id not in (select id from public.auth_users);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'user_topic_progress_user_id_fkey'
  ) then
    alter table public.user_topic_progress
      add constraint user_topic_progress_user_id_fkey
      foreign key (user_id) references public.auth_users (id) on delete cascade;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'user_preferences_user_id_fkey'
  ) then
    alter table public.user_preferences
      add constraint user_preferences_user_id_fkey
      foreign key (user_id) references public.auth_users (id) on delete cascade;
  end if;
end $$;

-- ------------------------------------------------------------
-- 4. Triggers
-- ------------------------------------------------------------
drop trigger if exists set_auth_users_updated_at on public.auth_users;
create trigger set_auth_users_updated_at
before update on public.auth_users
for each row
execute function public.set_updated_at();

drop trigger if exists set_user_topic_progress_updated_at on public.user_topic_progress;
create trigger set_user_topic_progress_updated_at
before update on public.user_topic_progress
for each row
execute function public.set_updated_at();

drop trigger if exists set_user_preferences_updated_at on public.user_preferences;
create trigger set_user_preferences_updated_at
before update on public.user_preferences
for each row
execute function public.set_updated_at();

-- ------------------------------------------------------------
-- 5. Dashboard view
-- ------------------------------------------------------------
create or replace view public.user_progress_dashboard as
select
  user_id,
  count(*) filter (where completed) as completed_topics,
  max(last_opened_at) as last_opened_at,
  max(completed_at) as last_completed_at,
  max(updated_at) as last_activity_at
from public.user_topic_progress
group by user_id;

comment on table public.auth_users is
  'Custom username and password accounts for Interview Handbook.';

comment on table public.auth_sessions is
  'Session tokens issued for custom auth users.';
