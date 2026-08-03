-- Vitprax question-system metadata upgrade.
-- Safe additive migration: existing JSONB question/card content remains functional.
-- Run after supabase/sql/certivo_content_tables.sql.

alter table public.certivo_questions
  add column if not exists certification_id text not null default 'texas-life',
  add column if not exists topic_id text,
  add column if not exists subtopic_id text,
  add column if not exists concept_id text,
  add column if not exists family_id text,
  add column if not exists style text not null default 'recall',
  add column if not exists cognitive_skill text not null default 'recall',
  add column if not exists difficulty integer not null default 1,
  add column if not exists exam_weight text not null default 'medium',
  add column if not exists is_active boolean not null default true,
  add column if not exists is_reviewed boolean not null default false;

alter table public.certivo_questions drop constraint if exists certivo_questions_style_check;
alter table public.certivo_questions
  add constraint certivo_questions_style_check
  check (style in ('recall', 'scenario', 'comparison', 'except_not', 'best_recommendation', 'professional_action', 'multi_step')) not valid;

alter table public.certivo_questions drop constraint if exists certivo_questions_cognitive_skill_check;
alter table public.certivo_questions
  add constraint certivo_questions_cognitive_skill_check
  check (cognitive_skill in ('recall', 'understand', 'apply', 'analyze', 'evaluate')) not valid;

alter table public.certivo_questions drop constraint if exists certivo_questions_difficulty_check;
alter table public.certivo_questions
  add constraint certivo_questions_difficulty_check
  check (difficulty between 1 and 5) not valid;

alter table public.certivo_questions drop constraint if exists certivo_questions_exam_weight_check;
alter table public.certivo_questions
  add constraint certivo_questions_exam_weight_check
  check (exam_weight in ('low', 'medium', 'high')) not valid;

update public.certivo_questions
set
  certification_id = coalesce(question #>> '{metadata,certificationId}', certification_id, 'texas-life'),
  topic_id = coalesce(question #>> '{metadata,topicId}', question ->> 'topic', topic),
  subtopic_id = nullif(coalesce(question #>> '{metadata,subtopicId}', question ->> 'subtopicId', ''), ''),
  concept_id = nullif(coalesce(question #>> '{metadata,conceptId}', question ->> 'conceptId', ''), ''),
  family_id = coalesce(nullif(question #>> '{metadata,familyId}', ''), nullif(question ->> 'familyId', ''), id),
  style = coalesce(nullif(question #>> '{metadata,style}', ''), nullif(question ->> 'style', ''), style, 'recall'),
  cognitive_skill = coalesce(nullif(question #>> '{metadata,cognitiveSkill}', ''), nullif(question ->> 'cognitiveSkill', ''), cognitive_skill, 'recall'),
  difficulty = greatest(1, least(5, coalesce(
    case when (question #>> '{metadata,difficulty}') ~ '^[1-5]$' then (question #>> '{metadata,difficulty}')::integer end,
    case when (question ->> 'difficultyLevel') ~ '^[1-5]$' then (question ->> 'difficultyLevel')::integer end,
    difficulty,
    1
  ))),
  exam_weight = coalesce(nullif(question #>> '{metadata,examWeight}', ''), nullif(question ->> 'examWeight', ''), exam_weight, 'medium'),
  is_active = coalesce((question #>> '{metadata,isActive}')::boolean, is_active, true),
  is_reviewed = coalesce((question #>> '{metadata,isReviewed}')::boolean, is_reviewed, false);

create index if not exists certivo_questions_certification_topic_idx
on public.certivo_questions (certification_id, topic_id);

create index if not exists certivo_questions_style_idx
on public.certivo_questions (style);

create index if not exists certivo_questions_difficulty_idx
on public.certivo_questions (difficulty);

create index if not exists certivo_questions_family_idx
on public.certivo_questions (family_id);

create index if not exists certivo_questions_active_reviewed_idx
on public.certivo_questions (is_active, is_reviewed);

alter table public.certivo_flashcards
  add column if not exists certification_id text not null default 'texas-life',
  add column if not exists topic_id text,
  add column if not exists subtopic_id text,
  add column if not exists concept_id text,
  add column if not exists family_id text,
  add column if not exists card_type text not null default 'term_definition',
  add column if not exists difficulty integer not null default 1,
  add column if not exists is_active boolean not null default true,
  add column if not exists is_reviewed boolean not null default false;

alter table public.certivo_flashcards drop constraint if exists certivo_flashcards_card_type_check;
alter table public.certivo_flashcards
  add constraint certivo_flashcards_card_type_check
  check (card_type in ('term_definition', 'question_answer', 'scenario', 'comparison', 'true_false', 'exam_shortcut', 'common_confusion')) not valid;

alter table public.certivo_flashcards drop constraint if exists certivo_flashcards_difficulty_check;
alter table public.certivo_flashcards
  add constraint certivo_flashcards_difficulty_check
  check (difficulty between 1 and 5) not valid;

update public.certivo_flashcards
set
  certification_id = coalesce(card #>> '{metadata,certificationId}', card ->> 'certificationId', certification_id, 'texas-life'),
  topic_id = coalesce(card #>> '{metadata,topicId}', card ->> 'topicId', card ->> 'topic', topic_id),
  subtopic_id = nullif(coalesce(card #>> '{metadata,subtopicId}', card ->> 'subtopicId', ''), ''),
  concept_id = nullif(coalesce(card #>> '{metadata,conceptId}', card ->> 'conceptId', card ->> 'term', ''), ''),
  family_id = coalesce(nullif(card #>> '{metadata,familyId}', ''), nullif(card ->> 'familyId', ''), id),
  card_type = coalesce(nullif(card #>> '{metadata,type}', ''), nullif(card ->> 'type', ''), card_type, 'term_definition'),
  difficulty = greatest(1, least(5, coalesce(
    case when (card #>> '{metadata,difficulty}') ~ '^[1-5]$' then (card #>> '{metadata,difficulty}')::integer end,
    case when (card ->> 'difficulty') ~ '^[1-5]$' then (card ->> 'difficulty')::integer end,
    difficulty,
    1
  ))),
  is_active = coalesce((card #>> '{metadata,isActive}')::boolean, is_active, true),
  is_reviewed = coalesce((card #>> '{metadata,isReviewed}')::boolean, is_reviewed, false);

create index if not exists certivo_flashcards_certification_topic_idx
on public.certivo_flashcards (certification_id, topic_id);

create index if not exists certivo_flashcards_type_idx
on public.certivo_flashcards (card_type);

create index if not exists certivo_flashcards_family_idx
on public.certivo_flashcards (family_id);
