alter table public.finding_talent_state
  add column if not exists event_finished boolean not null default false;

notify pgrst, 'reload schema';
