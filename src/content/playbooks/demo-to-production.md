---
id: demo-to-production
title: From Demo to Production
category: Operations & Strategy
author: Alan Hegewisch
summary: A profile-based checklist for going from one user to many. Whether you're scared to send the link, flying blind with real users, or afraid to touch what already works.
metrics: Go from "scared to send the link" to shipped in one afternoon
icon: Shield
published: true
date: 2026-08-04
---

# Playbook: The Demo-to-Production Checklist

Your app worked perfectly. Then you sent someone else the link.

Most vibecoded apps don't break because the code is bad. They break because the demo had exactly one user — you — and that user knew where to go. Real users will try things you never thought of, they will behave differently than you imagined, and some of them aren't real users at all.

## The Fear Is a Checklist You Haven't Written Yet

That nervous feeling before you send the link isn't wrong, it's just **unfocused**. You don't know what you don't know, so the risk feels infinite. But it isn't. The gap between "works for me" and "works for everyone" is a simple, boring list — and none of it requires being a "real engineer."

So don't build "production grade." Build *grade for the users you actually have* — twelve friends is a different bar than twelve paying strangers. Check off what you have, note what you don't. It's fine to skip something as a conscious decision; not knowing it existed is what gets you. What's left isn't a verdict on you as a builder, it's your next two afternoons.

## Which Profile Are You?
*Identify your current bottleneck to jump to the right section.*

| [**The Builder** ⚙️](#builder-profile) | [**The Optimizer** 🔄](#optimizer-profile) | [**The Strategist** 📊](#strategist-profile) |
| :--- | :--- | :--- |
| **Pain:** It works on your machine, and you're nervous about sending the link. | **Pain:** Real people are in it. You have no idea what they're doing or what's breaking. | **Pain:** It's a product now. You're afraid to touch it, because one change silently breaks three flows. |
| **Goal:** Get it out there. | **Goal:** See what's happening and survive it. | **Goal:** Change it confidently. |

---

## Builder Profile
*⚙️ Focus: Get it out there. Budget: one afternoon.*

#### 1. Make It a Real URL
A preview link, your laptop, and ngrok are not deployment.
* **The Workflow:** Push to a git repo → Connect it to **Vercel** or **Netlify** → Set env vars in the host's dashboard → Point a domain at it.
* **The Rule:** From here on, deploys come from git. You can work in a branch (an isolated space), so you can "undo" with one command instead of a plea.

#### 2. The Secrets Sweep
Do this *before* the URL is public. Search your repo for `sk-`, `secret`, `password`, `api_key`. Then check git history — deleting a key from a file doesn't delete it from the commit that added it.
* **The Rule:** If a real value comes up, replace it **today**, not after launch.
* **The Tool:** **gitleaks**. Then open DevTools → Network. If a key rides along in a request from the browser, it's public.

#### 3. The Two-Account Test
It takes five minutes, and it will show you the most common critical bug in AI-generated apps.
* **The Workflow:** Create account A → Create a record → Log in as B → Look up A's record by its ID.
* **The Insight:** If it returns data, any user could look up the data of another. It's not enough to hide a button.
Supabase makes this easy with RLS (Row Level Security), but it is off by default.
* **The Rule:** Don't write auth yourself. It can be messy and complicated, and solutions like **Clerk** or **Supabase Auth** take care of it for you.

#### 4. The Stranger Test
You are the worst possible tester: you know where to click. Hand it to one person who has never seen it, say nothing, and watch.
* **The Insight:** This is where you find what AI never builds — the empty state on day one, the screen with no explanation, the layout that collapses on a phone, the button whose label only makes sense to you.
* **The Rule:** Give them one obvious way to reach you: a feedback button, a WhatsApp link, your email in the footer. For your first ten users, that channel should be a human. You.

#### 5. Ship It When You Hit This Bar
You're ready when: it's on a real URL, no secrets are in the client, the two-account test passes, a stranger got through it unaided, people can reach you, and **you have restored a backup at least once.**
* **The Rule:** Everyone says they have backups. Almost nobody has restored one. **If you've never done a restore, you don't have backups — you have hope.** Do one this week into a scratch database. Then send the link.

## Optimizer Profile
*🔄 Focus: See what's happening — and what it's costing you.*

#### 1. Error Tracking — Best Time-to-Value on This List
Users don't report bugs. They leave, quietly, and you never find out it happened.
* **The Workflow:** Exception thrown → Captured with user + stack trace → Alert in Slack.
* **The Tool:** **Sentry** free tier, ~20 minutes. **GlitchTip** if you'd rather self-host.

#### 2. Know Whether Anyone Actually Used It
Errors tell you what broke. Analytics tell you whether anyone got far enough to care.
* **The Workflow:** Instrument three events — *signed up*, *did the core action*, *came back*.
* **The Tool:** **PostHog** or **Plausible**.
* **The Insight:** "50 signups" is a vanity number. "9 people did the core action twice" is a business.

#### 3. Uptime You Don't Have to Check
A free monitor pinging your URL every five minutes. **UptimeRobot**, five minutes to set up. Finding out from a customer is the expensive version.

#### 4. The Cost Ceiling
Your $4/month solo bill goes superlinear, because heavy users are heavy — and the free tiers on your database and model provider have walls you'll hit without warning.
* **The Workflow:** Rate limit per user → Cap tokens per request → Route cheap tasks to a cheap model → Cache repeated prompts. Then set a billing alert.
* **The Insight:** One enthusiastic user on an uncapped LLM endpoint can outspend your entire MRR in a weekend.

## Strategist Profile
*📊 Focus: Change it confidently — and don't build in what you'd have to rewrite.*

#### 1. Catch the Silent Rewrite
The real risk of agentic coding isn't the change you asked for. It's the three files it touched that you never opened.
* **The Workflow:** Playwright screenshot tests on your five most important pages → Run on every branch → Visual diff in the PR.
* **The Insight:** One afternoon of setup, and it catches exactly what your eyes skip.

#### 2. Make the Boring Steps Automatic
Anything you do more than twice should be a **Claude Code skill**, not something you remember.
* **Pre-merge check:** install → build → tests → screenshot diff → report. One command before every merge.
* **Release notes:** diff the branch → summarize by user impact → post to the team channel.
* **The Insight:** The process you have to remember is the process you skip at 11pm.

#### 3. Anything Touching Money Trusts Nothing
Two failure modes, both common, both expensive: the price arrives from the frontend (so a user can edit it), and webhook signatures are never verified (so anyone can POST "payment succeeded" at you).
* **The Rule:** Look up the price server-side from a product ID, and [verify every webhook signature](https://docs.stripe.com/webhooks) — it's one call in Stripe's own libraries, and it's the step you skip by never thinking about it.
* **The Tool:** Run [Stripe's go-live checklist](https://docs.stripe.com/get-started/checklist/go-live) before you switch to live keys. It's boring and correct on key rotation, error handling, and production endpoints — but it won't catch either failure above, so do those two yourself.

#### 4. Draw the Multi-Tenant Line
Put `tenant_id` on every table, and enforce the filter in one shared data-access layer instead of 40 hand-written queries. Retrofitting this later *is* the rewrite everyone is trying to avoid.
* **The Insight:** Once input comes from people you don't control, *"ignore previous instructions"* is a real request your app will receive. The mitigation isn't a cleverer prompt — it's blast radius. An agent that can only read is a nuisance when hijacked. One that can send email or run SQL is an incident.

#### 5. The Metric That Matters: Time to Roll Back
Get a staging environment and real migrations. Chatting with your production database is fine right up until the day it isn't — and that day is unrecoverable.
* **The Insight:** Stop tracking uptime and test coverage. Track how long it takes to undo a bad deploy. At 30 seconds, you'll ship daily. At an afternoon, you'll quietly stop shipping.

## Common Mistakes

### 1. Polishing Instead of Shipping
* **Mistake:** Adding a settings page, dark mode, one more feature. It feels like progress but it can paradoxially make it harder for users to adopt.
* **Fix:** Decide on what is the minimum to ship. Once you're there, send the link. Every week your app has zero users is a week you learn nothing real about it.

### 2. The "I Asked the AI and It Said It Was Secure" Trap
* **Mistake:** Asking the model that wrote the code to review the code, it's very likely to agree with itself.
* **Fix:** Open a fresh session with no context and give it a prompt like it were an adversary: *"Here is my API layer. Find every route where one user could read another user's data."* Run the two-account test by hand anyway.

### 3. The Rewrite Reflex
* **Mistake:** Deciding the demo is unsalvageable and starting over "properly."
* **Fix:** The rewrite takes a month and reintroduces the same bugs — the same tool is writing it. The checklist takes an afternoon. Harden what works.

---

## Getting Started

### The Ship-It Kit (Builder)
* **Vercel / Netlify:** Git-connected deploys and a real domain.
* **gitleaks:** Scans your repo *and its history* for leaked secrets.
* **Clerk / Supabase Auth:** Auth you didn't write and don't maintain.
* **Git + branches:** Non-negotiable once an agent is writing code.

### The Operator's Stack (Optimizer)
* **Sentry:** Know something broke, because your users won't tell you.
* **PostHog / Plausible:** Whether anyone reached the part that matters.
* **UptimeRobot:** A free ping every five minutes.

### The Agent Workflow (Strategist)
* **Claude Code Skills:** Encode the pre-merge check and release notes so they always run.
* **Playwright:** Screenshot tests that catch what the agent changed behind your back.
* **[Stripe Go-Live Checklist](https://docs.stripe.com/get-started/checklist/go-live):** The boring, correct list to run before you flip to live keys.
* **Adversarial subagent review:** A second, context-free model whose only job is to break it.
* **Staging environment:** Where you find out, instead of where your customers do.
