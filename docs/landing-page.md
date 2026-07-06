# Landing Page

How `/` ([src/pages/Home.tsx](../src/pages/Home.tsx)) is composed.

## Structure

`Home.tsx` is a thin layout that stacks four sections:

```
<Navbar />          (rendered once in App.tsx, above all routes)
<Hero />
<ValueChain />
<section>           split 60/40 on desktop
  <Spotlight />      (lg:col-span-6)
  <UpcomingEvents /> (lg:col-span-4)
</section>
<Footer />
```

All four inner components live in [src/components/home/](../src/components/home/) (Footer is shared, in [src/components/](../src/components/)).

### Hero — [Hero.tsx](../src/components/home/Hero.tsx)
Static banner: headline, subtext, a "See Upcoming Events" button linking to `/events/roundtables`, and two background images (`agfou_banner3.png` desktop background, `agfou_banner_k.png` bottom banner) imported from `src/assets/`. No dynamic content.

### ValueChain — [ValueChain.tsx](../src/components/home/ValueChain.tsx)
Static 4-step "Connect → Learn → Build → Scale" row, hardcoded in a local `steps` array. No content file — edit the array directly to change copy or icons.

### Spotlight — [Spotlight.tsx](../src/components/home/Spotlight.tsx)
"Member Spotlight" card. Currently fully hardcoded (name, quote, photo URL) — there's no content file or rotation logic yet. To feature a different member, edit this component directly.

### Community Calendar — [UpcomingEvents.tsx](../src/components/home/UpcomingEvents.tsx) {#community-calendar}
The only dynamic section on the landing page. Fetches events via `getUpcomingEvents()` from [src/lib/events.ts](../src/lib/events.ts) and renders one compact row per event: date badge, optional thumbnail (`event.image`), title + formatted date, and an external "RSVP" button (`event.rsvpUrl`).

Clicking the title/date area of a row navigates *within the site* (not to Meetup) via `getEventPageUrl()` in the same file, which maps `event.type` to a route:

| `type` | Internal link |
|---|---|
| `roundtable` | `/events/roundtables/:slug` (the specific session's detail page) |
| `webinar` | `/events/webinars` |
| `workshop` | `/events/workshops` |
| `mastermind` | `/events/masterminds` |

(Only `roundtable` has a per-item detail route today, so that's the only type that deep-links to its own page; the others land on their section's listing page.)

## Content source for the calendar

Each event is one markdown file in [src/content/events/](../src/content/events/), loaded the same way as roundtables (`import.meta.glob` + `gray-matter` in `src/lib/events.ts`). Filename → `slug`.

### Frontmatter fields (`EventMetadata`)

| Field | Required | Notes |
|---|---|---|
| `id` | yes | |
| `title` | yes | |
| `type` | yes | `webinar` \| `roundtable` \| `workshop` \| `mastermind` — drives the internal link mapping above. |
| `date` | yes | ISO datetime, or `null` for TBD. TBD events sort to the end of the list. |
| `tags` | yes | Array of short strings, e.g. `["#AI", "#Roundtable"]`. Rendered as pills on the Webinars page; not shown in the compact calendar row. |
| `rsvpUrl` | yes | External link, opened in a new tab from the RSVP button. |
| `location` | no | |
| `description` | no | |
| `image` | no | Root-absolute path into `public/`, e.g. `/roundtables/my-session.jpeg`. See note in [roundtables-pages.md](roundtables-pages.md#images) — don't use `src/assets/...` here, it won't resolve in a production build. |
| `highlight` | no | If `true`, the calendar row (and the Webinars-page card) is styled with the orange "highlighted" treatment instead of the default white/muted one. |
| `published` | yes | Unpublished events never appear. |

`getUpcomingEvents()` filters to `published && date >= now` (plus any TBD events appended at the end) and sorts soonest-first.

## Relationship to the Roundtables pages

This `src/content/events/` system is **separate** from `src/content/roundtables/` (see [roundtables-pages.md](roundtables-pages.md)). A roundtable session that should show up both in the homepage calendar *and* have its own dedicated "Next Session" card / detail page needs **two** matching markdown files — one in each folder, ideally with the same slug so the calendar's deep link (`/events/roundtables/:slug`) resolves. There is no shared registry between the two; keep fields like title/date/image in sync manually.

## Adding/editing landing page content

- **New calendar event**: add a file to `src/content/events/` (see fields above).
- **Change Hero copy/images**: edit `Hero.tsx` directly.
- **Change ValueChain steps**: edit the `steps` array in `ValueChain.tsx`.
- **Change the spotlighted member**: edit `Spotlight.tsx` directly (no content file to update).
