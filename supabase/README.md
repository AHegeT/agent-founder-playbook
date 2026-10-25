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
