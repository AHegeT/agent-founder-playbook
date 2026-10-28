alter table public.finding_talent_state
  add column if not exists screen_view text not null default 'questions'
  check (screen_view in ('landing', 'questions'));
