-- Private RSVP roster, separate from Supabase Auth accounts.
create table if not exists public.finding_talent_attendees (
  email text primary key check (email = lower(email)),
  full_name text not null,
  rsvp_status text not null check (rsvp_status in ('going', 'not_going')),
  user_id uuid unique references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.finding_talent_attendees enable row level security;
revoke all on public.finding_talent_attendees from anon, authenticated;
grant all on public.finding_talent_attendees to service_role;

create or replace function public.claim_finding_talent_attendee()
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  linked boolean := false;
begin
  update public.finding_talent_attendees
  set user_id = (select auth.uid()), updated_at = now()
  where email = lower((select auth.jwt() ->> 'email'))
    and (user_id is null or user_id = (select auth.uid()));
  linked := found;
  return linked;
end;
$$;

revoke all on function public.claim_finding_talent_attendee() from public;
grant execute on function public.claim_finding_talent_attendee() to authenticated;
