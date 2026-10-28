# Finding the right talent event (archived)

This module contains the original event site, moderator controls, attendee voting and comments, projection screen, Wi-Fi QR image, and the Supabase setup used for the October 2026 event. The interactive event app is archived. The active route `/events/finding-right-talent` now serves a separate historical recap page.

## Contents

- `src/pages/` — event, moderator, voting, QR, and projection pages
- `src/components/` — event header and audience comments panel
- `src/lib/` — event questions/state, Supabase state synchronization, and Supabase client
- `src/assets/qr-code.png` — event Wi-Fi QR image
- `supabase/` — setup guide, attendee seed data, and all event migrations

## Restoring it to the app

The source was written for the main project's Vite aliases and shared React dependencies. To restore it, copy the archived `src` folders back under `src/`, then add the imports and routes from the archived pages in `src/App.tsx` (replace the recap route if restoring the original event page). Apply the archived Supabase migrations in order only if restoring the event database as well.

The Supabase project is not changed by this archive. Any remote tables, policies, users, votes, and comments remain as they were.
