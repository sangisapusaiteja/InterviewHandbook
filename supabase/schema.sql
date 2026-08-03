create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.user_topic_progress (
  clerk_user_id text not null,
  section_slug text not null,
  topic_slug text not null,
  topic_id text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  last_opened_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (clerk_user_id, section_slug, topic_slug)
);

create index if not exists user_topic_progress_user_completed_idx
  on public.user_topic_progress (clerk_user_id, completed);

create index if not exists user_topic_progress_user_last_opened_idx
  on public.user_topic_progress (clerk_user_id, last_opened_at desc);

create table if not exists public.user_preferences (
  clerk_user_id text primary key,
  app_theme text not null default 'system',
  pinned_topic_hrefs text[] not null default '{}',
  recent_queries text[] not null default '{}',
  recent_topic_hrefs text[] not null default '{}',
  assistant_state jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_preferences_app_theme_check
    check (app_theme in ('light', 'dark', 'system'))
);

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

create or replace view public.user_progress_dashboard as
select
  clerk_user_id,
  count(*) filter (where completed) as completed_topics,
  max(last_opened_at) as last_opened_at,
  max(completed_at) as last_completed_at,
  max(updated_at) as last_activity_at
from public.user_topic_progress
group by clerk_user_id;

comment on table public.user_topic_progress is
  'Stores per-user topic progress keyed by Clerk user id and a section-aware topic identity.';

comment on table public.user_preferences is
  'Stores per-user UI preferences such as light or dark theme.';
