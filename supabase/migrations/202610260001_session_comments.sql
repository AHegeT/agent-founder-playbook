-- Session-wide public comments, one vote per registered participant, and moderator dismissal.

create table if not exists public.finding_talent_comments (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.finding_talent_participants(participant_id) on delete restrict,
  author_name text not null,
  body text not null check (char_length(body) between 1 and 400),
  vote_count integer not null default 0 check (vote_count >= 0),
  created_at timestamptz not null default now(),
  dismissed_at timestamptz
);

create index if not exists finding_talent_comments_active_order
  on public.finding_talent_comments (vote_count desc, created_at desc)
  where dismissed_at is null;

create table if not exists public.finding_talent_comment_votes (
  comment_id uuid not null references public.finding_talent_comments(id) on delete cascade,
  participant_id uuid not null references public.finding_talent_participants(participant_id) on delete restrict,
  created_at timestamptz not null default now(),
  primary key (comment_id, participant_id)
);

alter table public.finding_talent_comments enable row level security;
alter table public.finding_talent_comment_votes enable row level security;
revoke all on public.finding_talent_comments, public.finding_talent_comment_votes from anon, authenticated;
grant select on public.finding_talent_comments to anon, authenticated;

drop policy if exists "Anyone can read active session comments" on public.finding_talent_comments;
create policy "Anyone can read active session comments"
  on public.finding_talent_comments for select to anon, authenticated
  using (dismissed_at is null);

create or replace function public.get_finding_talent_comments(p_email text default null)
returns table (
  id uuid,
  author_name text,
  body text,
  created_at timestamptz,
  vote_count integer,
  has_voted boolean
)
language sql
stable
security definer
set search_path = ''
as $$
  select c.id, c.author_name, c.body, c.created_at, c.vote_count,
    exists (
      select 1 from public.finding_talent_comment_votes v
      join public.finding_talent_participants p on p.participant_id = v.participant_id
      where v.comment_id = c.id and lower(p.email) = lower(trim(coalesce(p_email, '')))
    ) as has_voted
  from public.finding_talent_comments c
  where c.dismissed_at is null
  order by c.vote_count desc, c.created_at desc;
$$;

create or replace function public.add_finding_talent_comment(p_email text, p_body text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  participant public.finding_talent_participants%rowtype;
  normalized_email text := lower(trim(p_email));
  normalized_body text := trim(p_body);
  comment_id uuid;
begin
  if normalized_body is null or char_length(normalized_body) not between 1 and 400 then
    raise exception 'El comentario debe tener entre 1 y 400 caracteres.';
  end if;

  select * into participant from public.finding_talent_participants p
  where lower(p.email) = normalized_email;
  if not found then raise exception 'Verifica tu correo para participar.'; end if;

  insert into public.finding_talent_comments (participant_id, author_name, body)
  values (
    participant.participant_id,
    coalesce(nullif(trim(participant.display_name), ''), split_part(normalized_email, '@', 1)),
    normalized_body
  ) returning id into comment_id;
  return comment_id;
end;
$$;

create or replace function public.cast_finding_talent_comment_vote(p_comment_id uuid, p_email text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_participant_id uuid;
  inserted_rows integer := 0;
begin
  select p.participant_id into v_participant_id from public.finding_talent_participants p
  where lower(p.email) = lower(trim(p_email));
  if v_participant_id is null then raise exception 'Verifica tu correo para votar en comentarios.'; end if;

  insert into public.finding_talent_comment_votes (comment_id, participant_id)
  select p_comment_id, v_participant_id
  from public.finding_talent_comments c
  where c.id = p_comment_id and c.dismissed_at is null
  on conflict (comment_id, participant_id) do nothing;

  get diagnostics inserted_rows = row_count;
  return inserted_rows = 1;
end;
$$;

create or replace function public.update_finding_talent_comment_vote_count()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.finding_talent_comments
  set vote_count = vote_count + 1
  where id = new.comment_id and dismissed_at is null;
  return new;
end;
$$;

drop trigger if exists finding_talent_comment_vote_count on public.finding_talent_comment_votes;
create trigger finding_talent_comment_vote_count
  after insert on public.finding_talent_comment_votes
  for each row execute function public.update_finding_talent_comment_vote_count();

create or replace function public.dismiss_finding_talent_comment(p_comment_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  updated_rows integer := 0;
begin
  if not public.is_finding_talent_moderator() then
    raise exception 'Solo una persona moderadora puede retirar comentarios.';
  end if;
  update public.finding_talent_comments
  set dismissed_at = now()
  where id = p_comment_id and dismissed_at is null;
  get diagnostics updated_rows = row_count;
  return updated_rows = 1;
end;
$$;

revoke all on function public.get_finding_talent_comments(text) from public;
revoke all on function public.add_finding_talent_comment(text, text) from public;
revoke all on function public.cast_finding_talent_comment_vote(uuid, text) from public;
revoke all on function public.dismiss_finding_talent_comment(uuid) from public;
grant execute on function public.get_finding_talent_comments(text) to anon, authenticated;
grant execute on function public.add_finding_talent_comment(text, text) to anon, authenticated;
grant execute on function public.cast_finding_talent_comment_vote(uuid, text) to anon, authenticated;
grant execute on function public.dismiss_finding_talent_comment(uuid) to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'finding_talent_comments'
  ) then
    alter publication supabase_realtime add table public.finding_talent_comments;
  end if;
end;
$$;

notify pgrst, 'reload schema';
