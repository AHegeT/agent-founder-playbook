-- Finding the right talent in the agentic era
-- Run this migration in the Supabase SQL Editor for the project configured in Vercel.
-- After creating the moderator user in Authentication > Users, run the allowlist
-- statement at the bottom with that user's email.

create table if not exists public.finding_talent_questions (
  id text primary key,
  sort_order integer not null unique,
  block text not null,
  statement text not null,
  assigned text not null,
  kind text not null check (kind in ('warmup', 'discussion'))
);

create table if not exists public.finding_talent_state (
  singleton boolean primary key default true check (singleton),
  active_question_id text not null references public.finding_talent_questions(id),
  poll_status text not null default 'open' check (poll_status in ('open', 'closed', 'revealed')),
  revealed_question_id text references public.finding_talent_questions(id),
  reveal_all boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.finding_talent_moderators (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.finding_talent_votes (
  question_id text not null references public.finding_talent_questions(id),
  voter_id uuid not null,
  choice text not null check (choice in ('myth', 'reality')),
  created_at timestamptz not null default now(),
  primary key (question_id, voter_id)
);

insert into public.finding_talent_questions (id, sort_order, block, statement, assigned, kind)
values
  ('warmup-opening', 0, 'Voto inicial', 'La IA va a reemplazar a los humanos en los empleos.', 'Voto del público · se retoma al cierre', 'warmup'),
  ('block-1-1', 1, 'Bloque 1 · Cómo encontramos talento', 'La IA es más objetiva que un reclutador humano.', 'Lauyumi Rojas y Mary Martínez', 'discussion'),
  ('block-1-2', 2, 'Bloque 1 · Cómo encontramos talento', 'Si tu CV no tiene las palabras clave correctas, ningún humano lo va a ver.', 'Mary Martínez', 'discussion'),
  ('block-1-3', 3, 'Bloque 1 · Cómo encontramos talento', 'Usar IA para preparar tu CV o tu entrevista es trampa.', 'Lauyumi Rojas y Uriel Valtierra', 'discussion'),
  ('block-2-1', 4, 'Bloque 2 · Qué talento buscamos', 'Si un agente puede hacer la tarea, ya no necesitas contratar a alguien para ella.', 'Alan Hegewisch y Lauyumi Rojas', 'discussion'),
  ('block-2-2', 5, 'Bloque 2 · Qué talento buscamos', 'Saber usar IA ya es más importante que tener experiencia.', 'Uriel Valtierra', 'discussion'),
  ('block-2-3', 6, 'Bloque 2 · Qué talento buscamos', 'Un perfil promedio con buenos agentes rinde más que un perfil brillante sin ellos.', 'Alan Hegewisch', 'discussion'),
  ('warmup-closing', 7, 'Voto final', 'La IA va a reemplazar a los humanos en los empleos.', 'Compara el resultado con el voto inicial', 'warmup')
on conflict (id) do nothing;

insert into public.finding_talent_state (singleton, active_question_id, poll_status)
values (true, 'warmup-opening', 'open')
on conflict (singleton) do nothing;

create or replace function public.is_finding_talent_moderator()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.finding_talent_moderators
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_finding_talent_moderator() from public;
grant execute on function public.is_finding_talent_moderator() to authenticated;

create or replace function public.get_finding_talent_results()
returns table (
  question_id text,
  myth_votes bigint,
  reality_votes bigint,
  total_votes bigint
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    q.id,
    count(v.voter_id) filter (where v.choice = 'myth'),
    count(v.voter_id) filter (where v.choice = 'reality'),
    count(v.voter_id)
  from public.finding_talent_questions q
  join public.finding_talent_state s on s.singleton = true
  left join public.finding_talent_votes v on v.question_id = q.id
  where s.reveal_all or q.id = s.revealed_question_id
  group by q.id, q.sort_order
  order by q.sort_order;
$$;

revoke all on function public.get_finding_talent_results() from public;
grant execute on function public.get_finding_talent_results() to anon, authenticated;

alter table public.finding_talent_questions enable row level security;
alter table public.finding_talent_state enable row level security;
alter table public.finding_talent_moderators enable row level security;
alter table public.finding_talent_votes enable row level security;

drop policy if exists "Anyone can read event questions" on public.finding_talent_questions;
create policy "Anyone can read event questions"
  on public.finding_talent_questions for select to anon, authenticated using (true);

drop policy if exists "Anyone can read event state" on public.finding_talent_state;
create policy "Anyone can read event state"
  on public.finding_talent_state for select to anon, authenticated using (true);

drop policy if exists "Moderators can update event state" on public.finding_talent_state;
create policy "Moderators can update event state"
  on public.finding_talent_state for update to authenticated
  using (public.is_finding_talent_moderator())
  with check (public.is_finding_talent_moderator());

drop policy if exists "Moderators can read their own allowlist row" on public.finding_talent_moderators;
create policy "Moderators can read their own allowlist row"
  on public.finding_talent_moderators for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Audience can vote on the active open question" on public.finding_talent_votes;
create policy "Audience can vote on the active open question"
  on public.finding_talent_votes for insert to anon, authenticated
  with check (
    choice in ('myth', 'reality')
    and question_id = (
      select s.active_question_id
      from public.finding_talent_state s
      where s.singleton = true and s.poll_status = 'open'
    )
  );

grant select on public.finding_talent_questions, public.finding_talent_state to anon, authenticated;
grant select on public.finding_talent_moderators to authenticated;
grant update on public.finding_talent_state to authenticated;
grant insert on public.finding_talent_votes to anon, authenticated;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'finding_talent_state'
  ) then
    alter publication supabase_realtime add table public.finding_talent_state;
  end if;
end;
$$;

-- Moderator setup (run after creating the account in Supabase Auth):
-- insert into public.finding_talent_moderators (user_id)
-- select id from auth.users where email = 'moderator@example.com'
-- on conflict do nothing;
