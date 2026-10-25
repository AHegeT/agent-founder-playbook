-- Switch the public attendee experience from Supabase Auth to email-only roster lookup.
-- A typed email is not proof of mailbox ownership; see the README before enabling.

alter table public.finding_talent_participants
  add column if not exists participant_id uuid default gen_random_uuid(),
  add column if not exists company_url text,
  add column if not exists linkedin_url text,
  add column if not exists role text;

update public.finding_talent_participants
set participant_id = gen_random_uuid()
where participant_id is null;

alter table public.finding_talent_participants
  alter column participant_id set not null,
  alter column display_name drop not null;

-- The live project may have a different primary-key name/column than migration 002.
-- Drop whichever PK is currently present before making user_id nullable.
do $$
declare
  primary_key_name text;
begin
  select c.conname into primary_key_name
  from pg_constraint c
  where c.conrelid = 'public.finding_talent_participants'::regclass
    and c.contype = 'p';

  if primary_key_name is not null then
    execute format('alter table public.finding_talent_participants drop constraint %I', primary_key_name);
  end if;
end;
$$;

alter table public.finding_talent_participants
  alter column user_id drop not null;

alter table public.finding_talent_participants
  add constraint finding_talent_participants_pkey primary key (participant_id);

create unique index if not exists finding_talent_participants_email_unique
  on public.finding_talent_participants (lower(email));

alter table public.finding_talent_votes
  add column if not exists voter_email text;

create unique index if not exists finding_talent_votes_one_per_email_question
  on public.finding_talent_votes (question_id, lower(voter_email))
  where voter_email is not null;

drop function if exists public.claim_finding_talent_attendee();

drop policy if exists "Participants can read their own profile" on public.finding_talent_participants;
drop policy if exists "Participants can create their own profile" on public.finding_talent_participants;
drop policy if exists "Participants can update their own profile" on public.finding_talent_participants;
drop policy if exists "Attendees can read their own votes" on public.finding_talent_votes;
drop policy if exists "Verified attendees can vote on the active open question" on public.finding_talent_votes;
drop policy if exists "Audience can vote on the active open question" on public.finding_talent_votes;

alter table public.finding_talent_participants enable row level security;
alter table public.finding_talent_votes enable row level security;
revoke all on public.finding_talent_participants from anon, authenticated;
revoke all on public.finding_talent_votes from anon, authenticated;

create or replace function public.check_finding_talent_attendee(p_email text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_email text := lower(trim(p_email));
  roster_name text;
  participant_name text;
begin
  if normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    raise exception 'Escribe un correo válido.';
  end if;

  select a.full_name into roster_name
  from public.finding_talent_attendees a
  where a.email = normalized_email and a.rsvp_status = 'going';

  if found then
    insert into public.finding_talent_participants (email, display_name)
    values (normalized_email, roster_name)
    on conflict ((lower(email))) do nothing;
    return jsonb_build_object('registered', true, 'rostered', true, 'display_name', roster_name);
  end if;

  select p.display_name into participant_name
  from public.finding_talent_participants p
  where lower(p.email) = normalized_email;

  if found then
    return jsonb_build_object('registered', true, 'rostered', false, 'display_name', participant_name);
  end if;

  return jsonb_build_object('registered', false, 'rostered', false);
end;
$$;

create or replace function public.register_finding_talent_participant(
  p_email text,
  p_role text,
  p_organization text,
  p_company_url text,
  p_linkedin_url text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_email text := lower(trim(p_email));
  normalized_role text := nullif(trim(p_role), '');
  normalized_linkedin text := nullif(trim(p_linkedin_url), '');
begin
  if normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    raise exception 'Escribe un correo válido.';
  end if;
  if normalized_role is null and normalized_linkedin is null then
    raise exception 'Agrega tu rol o tu LinkedIn para continuar.';
  end if;

  insert into public.finding_talent_participants (
    email, role, organization, company_url, linkedin_url
  ) values (
    normalized_email,
    normalized_role,
    nullif(trim(p_organization), ''),
    nullif(trim(p_company_url), ''),
    normalized_linkedin
  )
  on conflict ((lower(email))) do update set
    role = coalesce(excluded.role, public.finding_talent_participants.role),
    organization = coalesce(excluded.organization, public.finding_talent_participants.organization),
    company_url = coalesce(excluded.company_url, public.finding_talent_participants.company_url),
    linkedin_url = coalesce(excluded.linkedin_url, public.finding_talent_participants.linkedin_url),
    updated_at = now();
  return true;
end;
$$;

create or replace function public.has_finding_talent_voted(p_question_id text, p_email text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.finding_talent_votes v
    where v.question_id = p_question_id
      and lower(v.voter_email) = lower(trim(p_email))
  );
$$;

create or replace function public.cast_finding_talent_vote(
  p_question_id text,
  p_voter_email text,
  p_choice text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_email text := lower(trim(p_voter_email));
  inserted_rows integer := 0;
begin
  if p_choice not in ('myth', 'reality') then
    raise exception 'Opción de voto inválida.';
  end if;
  if not exists (
    select 1 from public.finding_talent_participants p
    where lower(p.email) = normalized_email
  ) then
    raise exception 'Primero registra tu correo para participar.';
  end if;

  insert into public.finding_talent_votes (question_id, voter_id, user_id, voter_email, choice)
  select p_question_id, gen_random_uuid(), null, normalized_email, p_choice
  from public.finding_talent_state s
  where s.singleton = true
    and s.active_question_id = p_question_id
    and s.poll_status = 'open'
  on conflict (question_id, (lower(voter_email))) where voter_email is not null do nothing;

  get diagnostics inserted_rows = row_count;
  return inserted_rows = 1;
end;
$$;

revoke all on function public.check_finding_talent_attendee(text) from public;
revoke all on function public.register_finding_talent_participant(text, text, text, text, text) from public;
revoke all on function public.has_finding_talent_voted(text, text) from public;
revoke all on function public.cast_finding_talent_vote(text, text, text) from public;
grant execute on function public.check_finding_talent_attendee(text) to anon, authenticated;
grant execute on function public.register_finding_talent_participant(text, text, text, text, text) to anon, authenticated;
grant execute on function public.has_finding_talent_voted(text, text) to anon, authenticated;
grant execute on function public.cast_finding_talent_vote(text, text, text) to anon, authenticated;

notify pgrst, 'reload schema';
