-- Verified attendee identity, short profile, and one vote per authenticated email.

create table if not exists public.finding_talent_participants (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text not null,
  organization text,
  event_intent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Safe for projects where the earlier draft of this migration was already applied.
alter table public.finding_talent_participants drop column if exists role;

alter table public.finding_talent_votes
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create unique index if not exists finding_talent_votes_one_per_user_question
  on public.finding_talent_votes (question_id, user_id)
  where user_id is not null;

drop policy if exists "Audience can vote on the active open question" on public.finding_talent_votes;
drop policy if exists "Verified attendees can vote on the active open question" on public.finding_talent_votes;
create policy "Verified attendees can vote on the active open question"
  on public.finding_talent_votes for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and choice in ('myth', 'reality')
    and question_id = (
      select s.active_question_id
      from public.finding_talent_state s
      where s.singleton = true and s.poll_status = 'open'
    )
  );

drop policy if exists "Attendees can read their own votes" on public.finding_talent_votes;
create policy "Attendees can read their own votes"
  on public.finding_talent_votes for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Participants can read their own profile" on public.finding_talent_participants;
create policy "Participants can read their own profile"
  on public.finding_talent_participants for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Participants can create their own profile" on public.finding_talent_participants;
create policy "Participants can create their own profile"
  on public.finding_talent_participants for insert to authenticated
  with check (user_id = (select auth.uid()));

drop policy if exists "Participants can update their own profile" on public.finding_talent_participants;
create policy "Participants can update their own profile"
  on public.finding_talent_participants for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

grant select, insert, update on public.finding_talent_participants to authenticated;
grant select on public.finding_talent_votes to authenticated;
grant insert on public.finding_talent_votes to authenticated;
