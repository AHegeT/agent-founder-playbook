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

For the attendee experience, run migrations `202610250002`, `202610250003`, and `202610250004` in order in the SQL Editor, then run [`attendees_seed.sql`](attendees_seed.sql). The audience enters an email only. Emails marked `Going` in the roster continue directly; an email not found in the roster is asked for a role or LinkedIn (at least one is required), with organization and company website optional. Votes are limited to one per entered email and question in the database. Moderator access still uses a Supabase Auth email/password account and the moderator allowlist described above.

Email-only access does not prove mailbox ownership. Someone could enter a listed attendee's email and vote as them, so use this flow when a fast roster check is the desired tradeoff. Requiring a magic link, OTP, or password would be needed to verify control of the address.

## Import the RSVP attendee list

The roster migration creates a private table. The seed import is safe to rerun: it updates RSVP name/status by email. The source's `Going` and `Not Going` statuses are both kept. `Not Going` records are retained but are not admitted through the roster check; they would need to complete the unlisted-email profile flow to continue.

To add one attendee such as Luis Derechin, run this in the SQL Editor after the roster migration:

```sql
insert into public.finding_talent_attendees (full_name, email, rsvp_status)
values ('Luis Derechin', 'ld@nir-yu.com', 'going')
on conflict (email) do update
set full_name = excluded.full_name,
    rsvp_status = excluded.rsvp_status,
    updated_at = now();
```
