# Roundtables Pages

How the `/events/roundtables` list page and `/events/roundtables/:slug` detail page are built, and how to add a new session.

## Routes

Defined in [src/App.tsx](../src/App.tsx):

- `/events/roundtables` → [src/pages/Roundtables.tsx](../src/pages/Roundtables.tsx) — hero, "Next Session" / "Latest Session" cards, locations info.
- `/events/roundtables/:slug` → [src/pages/RoundtableDetail.tsx](../src/pages/RoundtableDetail.tsx) — full session write-up, RSVP, Slido.

## Content source

Each session is one markdown file in [src/content/roundtables/](../src/content/roundtables/). The filename (minus `.md`) becomes the route `slug`.

Files are loaded via `import.meta.glob('/src/content/roundtables/*.md', { as: 'raw' })` in [src/lib/roundtables.ts](../src/lib/roundtables.ts) and parsed with `gray-matter` into frontmatter + markdown body. `README.md` in that folder is skipped.

### Frontmatter fields (`RoundtableMetadata`)

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Matches filename by convention, not enforced. |
| `title` | yes | |
| `description` | yes | Shown under the title on both list and detail pages. |
| `nextSession` | yes | Free-text display string, e.g. `"Next session: Jul 8th, 2026"`. Not parsed as a date. |
| `duration` | yes | Free-text, e.g. `"90 minutes"`. |
| `location` | no | |
| `meetupUrl` | no | If present, renders the "Join the Session / RSVP on Meetup" card on the detail page. |
| `slidoUrl` | no | If present, renders the "Join the Conversation" Slido card on the detail page. |
| `image` | no | Path to a preview image, e.g. `/roundtables/my-session.jpeg`. See [Images](#images) below. |
| `published` | yes | Unpublished sessions are filtered out everywhere. |
| `date` | yes | ISO date (`YYYY-MM-DD`). Drives past/future sorting — see below. |

The markdown body below the frontmatter is rendered on the detail page via `react-markdown`.

### Past vs. upcoming

`src/lib/roundtables.ts` compares each session's `date` to `new Date()`:

- `getNextUpcomingRoundtable()` — closest session with `date >= now`. Powers the "Next Session" card.
- `getLatestPastRoundtable()` — most recent session with `date < now`. Powers the "Latest Session" card.

There's no "past sessions archive" list on this page — only the single latest past session is shown.

## Images

`image` should point at a file in [public/roundtables/](../public/roundtables/), referenced with a root-absolute path (`/roundtables/<file>.jpeg`), **not** `src/assets/...`.

Files under `src/content/**/*.md` frontmatter are plain strings, not JS imports, so Vite's asset pipeline never sees or bundles them. A path like `/src/assets/...` happens to resolve in `vite dev` (which serves `/src` directly) but 404s in a production build. `public/` files are copied as-is and always resolve at the root, in both dev and prod.

When pulling a cover photo from an external source (e.g. a Meetup event page), download and commit a reasonably-sized copy rather than hot-linking the third-party URL — those links aren't guaranteed to stay stable (Meetup in particular appears to rotate/regenerate image IDs once an event passes).

## Adding a new session

1. Create `src/content/roundtables/<slug>.md` with the frontmatter above (future `date`, `published: true`).
2. If you have a cover image, drop it in `public/roundtables/<slug>.jpeg` and set `image: /roundtables/<slug>.jpeg`.
3. That's it — no registry/index file to update. `getNextUpcomingRoundtable()` will pick it up automatically once it's the closest future date among published sessions.

If the session should also appear in the homepage "Community Calendar", also add a matching entry to `src/content/events/` — see [landing-page.md](landing-page.md#community-calendar) for that system, which is separate from this one.
