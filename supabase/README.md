# Finding the right talent event

## Connect the event app to Supabase

The app reads these Vite variables at build time:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY` (the project's publishable/anon key)

Set them in the Vercel project's Environment Variables for the environments where the event should work, then redeploy so Vite includes them in the client build. The publishable key is intended for browser use; never put the service role key in a `VITE_` variable.

## Apply the database migration

In the Supabase project used by Vercel, open **SQL Editor**, paste and run [`migrations/202610250001_finding_talent_event.sql`](migrations/202610250001_finding_talent_event.sql). It creates and seeds the event questions and state, stores votes, enables Realtime for moderator state changes, and adds RLS policies so the audience can vote without reading unrevealed results.

## Authorize the moderator

1. In Supabase, open **Authentication → Users** and create a user with an email and password for the moderator.
2. In **SQL Editor**, run this query, replacing the email with the account you just created:

   ```sql
   insert into public.finding_talent_moderators (user_id)
   select id from auth.users where email = 'moderator@example.com'
   on conflict do nothing;
   ```

3. Open `/events/finding-right-talent/moderator` on the deployed site and sign in with that account.

The moderator view controls the active question, voting open/closed state, and whether the audience sees the active question's results or aggregate results for all questions. The audience uses `/events/finding-right-talent/vote`; one QR can remain on screen for the entire session.

## Attendee registration and voting identity

After the event schema is in place, run [`migrations/202610250002_attendee_registration.sql`](migrations/202610250002_attendee_registration.sql) in the SQL Editor. This adds private attendee profiles and changes voting to require an authenticated account. Participants create an account or sign in with email and password, then fill out a short profile (name, optional organization, and optional event expectation). Role is omitted because it is already collected on the event registration page. Each account can vote once per question; the database enforces the limit even if someone clears browser storage or changes devices.

In **Authentication → URL Configuration**, add the deployed event URL to the allowed redirect/site URLs. In **Authentication → Providers → Email**, keep email/password sign-in enabled. If email confirmations are enabled, Supabase may also send its standard confirmation link after account creation; this flow does not use one-time passcodes. Participants may use the email from event registration or create an account with another email.

## Import the RSVP attendee list

Run [`migrations/202610250003_attendee_roster.sql`](migrations/202610250003_attendee_roster.sql) in the Supabase SQL Editor, then run [`attendees_seed.sql`](attendees_seed.sql). The import is safe to rerun: it updates RSVP name/status by email and preserves an attendee's linked auth account. The source's `Going` and `Not Going` statuses are both kept. When someone creates an account using a listed email, the app links that Supabase Auth user to the roster row. New emails are still allowed to register and vote.

To add one attendee such as Luis Derechin, run this in the SQL Editor after the roster migration:

```sql
insert into public.finding_talent_attendees (full_name, email, rsvp_status)
values ('Luis Derechin', 'ld@nir-yu.com', 'going')
on conflict (email) do update
set full_name = excluded.full_name,
    rsvp_status = excluded.rsvp_status,
    updated_at = now();
```
