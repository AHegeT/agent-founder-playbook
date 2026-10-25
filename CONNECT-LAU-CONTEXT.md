# Lau Connect page — context for follow-up

## Goal
A Spanish-language personal contact page for Lauyumi Rojas, based on the compact card-and-destination pattern from Alan’s Connect page. It lives in the Agents & Founders app at `/connect/lau`.

## Current implementation
- `src/pages/connect/LauConnect.tsx` renders Lau’s intro, profile photo, and four destination cards.
- `src/pages/connect/LauConnect.css` provides a warm terracotta/cream visual identity distinct from the main community site while retaining the familiar Connect page structure.
- `src/App.tsx` registers the route.
- The route is intentionally omitted from the Navbar and sets `noindex, nofollow` while open, so the page remains accessible by its NFC URL without being promoted for search discovery.
- `vercel.json` rewrites direct paths to the SPA entry point, allowing `/connect/lau` to load on a fresh visit.
- The personal website exit link is intentionally omitted.
- Destination clicks call `window.posthog.capture("connect_destination_selected", ...)` if PostHog is present. This project currently has no PostHog initialization/configuration, so the hook does nothing until analytics is wired up here.

## Contact destinations
- Agents & Founders: `https://agfou.sidekickflow.com/`
- LinkedIn: `https://www.linkedin.com/in/lauyumiopsmx/`
- WhatsApp: `https://wa.me/5215631108284` (normalized from +52 1 56 3110 8284)
- Email: `lau.reds94@gmail.com`

## Design/content decisions
- Page copy is in Spanish.
- Lau’s existing photo and LinkedIn details are reused from the About page.
- Intro copy is adapted from her existing bio: “I turn complex people and operations challenges into clear, scalable systems…”
- The visual treatment uses warm terracotta and cream with Lau’s portrait; the community destination is the primary card.
- No contact submissions are stored by this page: the links hand off to WhatsApp, email, LinkedIn, or the community site.

## Review items
- Confirm Spanish copy and the positioning line (“Operaciones · Talento · Comunidad”).
- Decide whether this page should be linked from the About page or Navbar. It is currently reachable by direct URL only.
- Confirm the Agents & Founders destination is the desired invite/join URL.
- Decide whether to set up PostHog for this Vite/React app or omit click analytics here.
