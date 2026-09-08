-- Certivo protected content tables. Safe to keep in the repo because it contains no question text.

create table if not exists public.certivo_questions (
  id text primary key,
  topic text not null,
  simulator integer not null,
  sort_order integer not null default 0,
  question jsonb not null,
  is_free boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.certivo_questions add column if not exists sort_order integer not null default 0;
alter table public.certivo_questions enable row level security;

drop policy if exists "Anyone can read free Certivo questions" on public.certivo_questions;
drop policy if exists "Paid students can read protected Certivo questions" on public.certivo_questions;

create policy "Anyone can read free Certivo questions"
on public.certivo_questions
for select
to anon, authenticated
using (is_free = true);

create policy "Paid students can read protected Certivo questions"
on public.certivo_questions
for select
to authenticated
using (
  exists (
    select 1
    from public.certivo_access access
    where access.user_id = auth.uid()
      and access.status = 'active'
      and (access.access_until is null or access.access_until > now())
  )
);

create index if not exists certivo_questions_topic_idx
on public.certivo_questions (topic);

create index if not exists certivo_questions_simulator_idx
on public.certivo_questions (simulator);

create index if not exists certivo_questions_sort_idx
on public.certivo_questions (sort_order);

create table if not exists public.certivo_flashcards (
  id text primary key,
  sort_order integer not null default 0,
  card jsonb not null,
  is_free boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.certivo_flashcards add column if not exists sort_order integer not null default 0;
alter table public.certivo_flashcards enable row level security;

drop policy if exists "Anyone can read free Certivo flashcards" on public.certivo_flashcards;
drop policy if exists "Paid students can read protected Certivo flashcards" on public.certivo_flashcards;

create policy "Anyone can read free Certivo flashcards"
on public.certivo_flashcards
for select
to anon, authenticated
using (is_free = true);

create policy "Paid students can read protected Certivo flashcards"
on public.certivo_flashcards
for select
to authenticated
using (
  exists (
    select 1
    from public.certivo_access access
    where access.user_id = auth.uid()
      and access.status = 'active'
      and (access.access_until is null or access.access_until > now())
  )
);

create index if not exists certivo_flashcards_sort_idx
on public.certivo_flashcards (sort_order);
