# Gate 1 — Repository audit

Branch: `redesign/digital-showroom` (created from `main` at `f4aca4b`). Nothing on `main` was modified, committed, pushed or deployed.

## The one thing to fix before anything merges

**Production is not in git.** The live AI-concierge feature (`src/app/api/ai-concierge/*`, `src/app/api/twilio/*`, `src/app/admin/`, `src/app/components/AIConciergeSection.tsx`, `src/lib/ai-concierge/*`, `src/lib/supabase/`, `src/lib/phone.ts`, `supabase/`, `voice-server/`, `vercel.json`, `.env.example`) is untracked, and 14 tracked files (homepage, header, `globals.css`, `layout.tsx`, `package.json`, lockfile, Tailwind and TS config, several Magic UI components) carry uncommitted edits. `AI_CONCIERGE_NOTES.md` documents deploys as `vercel --prod --yes` from the working tree, so www.hitchcode.net is running code that exists only on this laptop.

These changes travelled onto this branch untouched (git carries uncommitted work across a branch switch). I did not commit them because they are your in-progress work. **Recommendation:** commit them to `main` yourself (or let me do it on request) before Gate 4, so the redesign has a real baseline to merge into and roll back to.

## Stack

| Area | Current state |
| --- | --- |
| Framework | Next.js 15.1.11 App Router, React 19, TypeScript strict. `next dev --turbopack`. Typecheck is clean (0 errors). |
| Styling | Tailwind 3.4 with shadcn tokens, plus CSS Modules on a few pages. Copper accent `#D4A574`, stone palette. |
| Fonts | `geist` package on `<body>`; four pages also load **Inter** through `next/font/google`, so typography is inconsistent page to page. |
| Motion | `framer-motion` **and** `motion` (same library, two names), Magic UI and Aceternity components, a canvas `Vortex` particle hero. No GSAP. |
| 3D | `three`, `@react-three/fiber`, `drei`, `maath`, `simplex-noise`: used by `MirrorRubiksCube`, the Vortex, and the `/greeting3` AR card, none of which survive the redesign. |
| CMS | Sanity v3 with the full Studio embedded at `/studio`, powering `/blog`. |
| Hosting | Vercel (`.vercel/`, `vercel.json` daily cron). `netlify.toml` and `deploy.sh` (git add-all, commit, push, Pushover) are leftovers from Netlify. |
| Lint / tests | `next lint` has no ESLint config in the root project. No tests, no Playwright. |

## Routes

**Marketing:** `/`, `/services` (+ `full-stack-development`, `system-refinement`, `technology-consulting`), `/demos`, `/about`, `/contact`, `/blog`, `/blog/[slug]`.

**Utility / personal:** `/greeting`, `/greeting2`, `/greeting3` (digital business cards, header hidden), `/studio` (Sanity), `/admin/ai-concierge` (gated only by `?key=`).

**Debug pages that are publicly reachable and indexable:** `/facebook-test`, `/linkedin-test`, `/twitter-test`, `/meta-debug`, `/blog/debug-linkedin`, `/blog/[slug]/debug-meta`, `/buttons`. `src/app/testpage/` is an empty folder.

**APIs:** `/api/ai-concierge/{start-call,post-call-summary,health}`, `/api/twilio/{voice,status}`, `/api/notify`.

## Working integrations to preserve

- **AI concierge demo**: form → Supabase lead → Twilio outbound call → Railway voice bridge → OpenAI Realtime → summary, Resend email, Pushover. Rate-limited, consent-gated, documented in `AI_CONCIERGE_NOTES.md`. It is a genuine working system and a candidate proof point for the "working systems" story, presented honestly as a demo.
- **Contact form**: Formspree endpoint plus a Pushover alert. Works, but see the risks below.
- **Sanity blog** with OG/Twitter metadata per post.
- **Vercel Analytics and Speed Insights.**

## Defects and risks found

1. **Canonical and OG URLs point at a dead domain.** `layout.tsx` uses `https://hitchcode.com` in production, but the notes say that domain is not attached (SSL fails) and production is `www.hitchcode.net`. Every page's canonical tag and OG image URL is wrong.
2. **`GET /favicon.ico` returns 500 in dev** because `src/app/favicon.ico` and `public/favicon.ico` both exist. It fails on every route and will trip the PRD's "no console errors" gate. Fix: delete one (I left it for your approval).
3. **`/api/notify` is an open relay** to your phone. Anyone can POST any text, and about 50 client-side calls use it as homemade analytics (page visits, shares, clicks, theme changes). It should be authenticated or replaced with privacy-respecting analytics.
4. **Contact form fails silently.** A non-OK Formspree response only logs to the console; the visitor sees nothing.
5. **About page and `/demos` publish unverifiable claims** (detail below). These conflict with the PRD's content-integrity rules today, not only after the redesign.
6. **~100 MB of camera originals are tracked in `public/`** (four 13–19 MB PNGs, a 26 MB `.mov`), and a 1 GB `.exr` sits in `public/` (git-ignored but served in dev). `.git` is 112 MB. `public/optimized/*.webp` already holds the web versions.
7. **A Figma export lives in `public/from-figma/src`**, so its source files are publicly downloadable.
8. `<head>` preloads `/optimized/zack.webp` on every route and preconnects to Google Fonts, which `next/font` never calls.
9. `/admin/ai-concierge` is protected only by a query-string token (already noted in your TODOs).

## Content integrity

Statements currently on the site that would need evidence or removal under the PRD:

| Where | Claim | Status |
| --- | --- | --- |
| `/about` achievements | "Innovation Award", "increased internal productivity by over 300%", "100% client satisfaction… across 50+ projects" (2022) | `[VERIFY]`, likely remove |
| `/about` achievements | "Completed advanced certification in modern web development" (2024) | `[VERIFY]` issuer and name |
| `/about` achievements | "Led $3M+ projects with 3–5 teams of 4" (2021) | `[VERIFY]`; the PRD says ~$3.2M, ~50 Newark school buildings, 2022 |
| `/demos` | "95% time saved", "0% error rate", "3x faster", "250% engagement boost", etc. | Remove; these are demo animations, not results |
| Homepage proof | "proprietary machine learning for age checks" (AgeVerified Lax), "Audio monitoring platform" | `[VERIFY]` wording and permission |
| `/contact` | "24h response", "consultation in 3–5 days", "proposal within 1 week", "CTO-level guidance" | `[VERIFY]` you can commit to these |
| Copy voice | "Transform your business with innovative digital solutions" (meta description), "Digital Architect" | Replace (PRD §7 banned phrasing) |

The design-lab studies use only PRD-approved copy and one synthetic job (J-2417, a fictional insulation contractor), labelled "Concept demonstration · sample data" in every study.

## Preserve, replace, later

**Preserve (carry into the redesign as-is or nearly):**
- The AI-concierge backend, voice server, Supabase schema, and their env/ops notes.
- `/api/twilio/*`, `/api/ai-concierge/*`, and the Vercel cron.
- The Sanity blog content and schema (becomes `/insights` later).
- The `/greeting*` business cards (personal utility, outside the marketing IA).
- Analytics and Speed Insights; `next/font`; `next/image` config.
- The Formspree endpoint as the contact back end until a replacement is approved.

**Replace (at Gates 3–5):**
- Homepage, header, footer, `/services`, `/demos`, `/about`, `/contact` presentation and copy, rebuilt on the PRD IA (`/work`, `/capabilities`, `/solutions`, `/about`, `/contact`) and one token file.
- Inter and Magic UI / Aceternity / Vortex visuals.
- Root metadata (title, description, canonical, OG) with the correct domain.
- Pushover-as-analytics with privacy-respecting events.

**Later or delete (needs your call):**
- Debug and test routes (delete or `noindex`).
- Three.js and R3F (drop unless a chosen scene needs real 3D), and the duplicate `framer-motion`.
- Netlify leftovers (`netlify.toml`, `deploy.sh`).
- Camera originals in `public/` and the `from-figma` export (move out of `public/`).
- Real auth for `/admin`.

## What Gate 2 added (all on this branch)

- `AGENTS.md`, `HITCHCODE_PRD.md`, `CURSOR_START_HERE.md` (the brief, saved verbatim).
- `src/app/design-lab/**`: three studies, a review index, shared sample data, isometric helpers, scoped tokens. `noindex`, and not linked from the site.
- `src/app/components/ConditionalHeader.tsx`: one condition so `/design-lab` renders its own art-directed headers (same treatment `/greeting` already had).
- `scripts/qa/capture-screens.mjs`: screenshot matrix runner. It uses `playwright-core` from `~/.cache/hitchcode-qa` and your installed Chrome, so `package.json` is untouched.
- `docs/redesign/*` and the screenshots under `docs/redesign/screenshots/gate-2/`.

No dependencies were added; GSAP is deferred to Gate 3.
