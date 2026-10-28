# HITCHCODE — Digital Showroom PRD
**Version:** 1.0 · **Date:** October 28, 2026 · **Status:** Design/build brief, subject to visual review
**Owner:** Hitchcode · **Implementation:** Cursor-driven Next.js codebase

> **One-line mission:** Make Hitchcode appear and behave like a highly capable independent operations engineering firm, using the expressive creative engineering of a top digital studio without sacrificing the judgment, clarity, and trust required by owner-led $10M–$75M businesses.

---

## 0. Operating instructions for the AI team

Treat this document as the product requirements and art-direction contract. It is NOT permission to immediately generate an entire generic website. Inspect the repository, preserve functioning integrations and existing content until reviewed, and build from a cohesive creative concept. The design must be demonstrated in rendered browser views, not judged from source code.

**Work in stages with explicit approval gates:** Audit → visual explorations → selected system and motion prototype → complete homepage → interior pages → test/ship. Do not modify production or deploy without authorization. At the end of every stage, report exactly what was created, screenshots or local preview paths, what remains unverified, and the next decision required. Work on a branch; preserve the original site for rollback.

**Do not fabricate:** customer lists, case-study outcomes, screenshots of existing products, testimonials, certifications, team size, revenues, or integrations already delivered. Demonstrations using synthetic data must say "Concept demonstration". Any copy requiring fact confirmation is marked `[VERIFY]` in a content file, not silently published as fact.

## 1. Business purpose and success criteria

### Audience
Owners, founders, CEOs, COOs, and occasionally finance/operations directors at established, profitable companies whose growth has outpaced their operating systems. Initial market: family/owner-led home improvement firms, installation-heavy contractors, specialty services, regional distributors, and other multi-department, transaction-heavy operations. Target annual sales of roughly $10M–$75M is an internal prioritization hypothesis, not a public exclusion criterion.

These people often operate with capable employees and many paid software products, but lack reliable flow of information across advertising, sales, quoting, scheduling, service fulfillment, inventory, accounting, and customer care.

### Desired perception after five seconds
1. This company understands the practical mechanics of running a successful business.
2. It can connect and improve existing systems, not merely sell a new application.
3. It combines serious technical capability with operational judgment.
4. Its work is bespoke, technically rigorous, and worth discussing with an owner.

### Primary goal
Obtain qualified discovery conversations with owners/operators seeking a substantive systems or operational engineering engagement.

### Secondary goals
Demonstrate craft and technical depth; communicate available engagements; build trust through verified projects; create targeted entry pages for later outreach; present lower-friction fully managed services (lead operations, invoicing) without confusing them with the core high-value offering.

### Success measures
- Five-second comprehension tests with actual target buyers.
- Qualified conversations per month and source attribution (privacy-respecting analytics).
- Contact form completion and scheduled discovery calls.
- Case study and interactive-demo engagement (diagnostic, not vanity KPIs).
- Core Web Vitals and accessibility targets; see section 14.

## 2. Positioning and message

**Category:** Operational technology and systems engineering for established businesses.

**Promise:** Better coordination, clearer information, fewer manual handoffs, more dependable operations. Do not guarantee financial results without client-specific evidence.

**Core headline candidate:**

> You built the business.
> We engineer what runs it.

**Subhead:**

> We connect the software, workflows, and equipment behind established companies, and build what is missing. Less work between teams. More control over the operation.

**Primary CTA:** `Discuss your operation`
**Secondary CTA:** `Explore the systems`
**Alternative headline for exploration:** `The business grew. The systems didn't.`

**Offer hierarchy:**
1. **Systems Engineering & Integration:** audit, architecture, connections across CRM/ERP/finance/scheduling, data flows, custom interfaces, hardware-to-software interfaces, monitoring/reliability.
2. **Fractional Technology Leadership:** strategic technical decisions, roadmap, vendor evaluation, implementation oversight, technology governance, practical ongoing leadership. Do not claim a team or full department if one does not exist.
3. **Custom Software & AI Workflows:** internal applications, operational agents with checks and human review, purpose-built tools and user experiences.
4. **Managed Operations:** client buys completed operational outputs rather than software access. Initial categories: inbound lead handling/qualification and invoicing. Define concrete deliverables, exceptions, service boundaries, and human review; do not imply universal hands-free autonomy.

## 3. Creative north star: THE WORKSHOP / BLUEPRINT TO REALITY

The site should feel like a digital architecture studio crossed with an industrial operations room, with tiny moments of retro-computing eccentricity. It is more about precision and authorship than luxury for its own sake.

**References** (study principles, never clone layouts, graphics, trade dress, copy, or branded assets):
- https://basement.studio/ — live creative engineering, palpable personality, animated and inspectable detail.
- https://basement.studio/post/new-digital-hq-pt-1 — explanation of nostalgic low-poly art, inspectable objects, optimized graphics, split visual layers.
- https://2022.basement.studio/ — bold type, irreverent visual storytelling, graphic rhythm.
- https://old.basement.studio/ — restrained black/white editorial composition and technical wireframe elements.

**Our unique signature:** The visitor is encountering a working engineering practice, not a sci-fi control panel or a video game. The animated artifacts represent actual business processes: orders, leads, crews, job statuses, handoffs, approvals, payments. Visuals reveal how complexity is designed away.

**Target feeling:** engineered, tactile, ingenious, confident, contemporary, slightly unexpected, still safe to entrust with mission-critical operations.

### Visual language
- Architectural drafting overlays, construction lines, coordinate ticks, grid numbers, schematic labels, exploded-view transitions, alignment marks, light technical hatching, isometric components.
- Retro systems graphics as accents: 90s terminal displays, bitmap diagnostic labels, low-frame sprite-like movement, stylized status LEDs, deliberate scan sweeps. A *hint* of nostalgic hardware, not a gamified site.
- Oversized expressive typography; tight editorial composition; long quiet spaces; purposeful cropping; occasional overlapping caption annotations.
- Rich dark hero and atmospheric transitions balanced with readable light sections. Avoid forcing the entire site into a black rectangle.
- Asymmetry within a consistent structural grid. Visual rhythm should change meaningfully across sections.

### Proposed color tokens (starting hypothesis, change only through a conscious concept review)
- `--ink: #101413` — main dark surface and typography.
- `--paper: #EDECE5` — warm, not pure-white, light surface.
- `--slate: #707C79` — secondary technical labels.
- `--blueprint: #244D70` — blueprint panels and selected diagram fields.
- `--draft-line: #7EC5E7` — diagram ink on dark blue.
- `--signal: #EF875C` — sparingly used state highlight / active signal.
- `--hairline: rgba(237,236,229,.22)` — quiet technical dividers.

Color should be 80–90% neutral. Blue is a *material* for blueprint scenes, not a generic primary button color. Signal orange should never look like an imitation of Basement's brand.

### Type guidance
- Try `Space Grotesk` or `Geist` for display; `Geist` or `Instrument Sans` for body; `IBM Plex Mono` for technical metadata. Use at most two principal families plus mono. Verify font licensing and readability.
- Oversized headlines may extend beyond conventional content columns, but **never** cut off information at mobile widths.
- Monospace annotations are restrained, typically 10–12px and legible at final rendering.
- Body copy ~16–19px on desktop; sensible line lengths (~55–75 characters); avoid tiny gray copy.
- Typography is a main visual material: not merely labels attached to cards.

### Absolute anti-patterns
No repetitive rounded service-card grids, bland centered hero with two buttons under a gradient blob, glassmorphism, purple/cyan AI gradients, glowing connected nodes without a story, meaningless orbital particles, stock people posing near glass offices, standard dashboard screenshots as decoration, typewriter-effect hero copy, unsolicited ambient audio, scroll hijacking, obligatory loading intro, artificial film grain that harms legibility, or animations on every element.

Do not solve composition by putting everything in boxes. At least three sections should have wholly different spatial composition; some should have no rectangular containers at all. Use borders when they carry meaning, like a technical drawing or table.

## 4. Interaction design principles

### Signature module A: BLUEPRINT → WORKING SYSTEM
The central reusable visual component. The **same example process or interface** has two precisely aligned representations:
- **Draft state:** structural grid, sketched node outlines, technical paths, dimensions, labels, dotted dependencies, measurements and notes.
- **Operational state:** a polished, believable application or connected operational workflow, with clearly readable real labels, statuses, and outputs.
- On deliberate user action (toggle/scrub/scroll reveal), drafting strokes and guide marks yield to the operational design; data begins flowing and the displayed result updates. Use SVG paths, aligned layers, clip masks, CSS transforms, or a carefully chosen GSAP timeline. The effect must feel like an engineered transformation, not a fade between unrelated screenshots.
- Controls: `Blueprint` / `Live System` visible toggles, with arrow-key/keyboard access; optional draggable reveal handle with accessible alternative; restart and pause if appropriate.
- Demo data is simulated and labeled. The default scene should still communicate a result with JavaScript or animation disabled.
- Mobile: simplified vertically stacked version, manual toggle (no fragile long pinned scroll).

### Signature module B: THE CONNECTED OPERATION
A sample home-improvement business process expressed in six named nodes: Lead → Consultation → Estimate → Scheduling → Installation → Invoice. Optionally show Inventory/Procurement and Customer Follow-up as branches. Start with visibly disconnected handoffs. Trigger a deliberate reconfiguration: connections route, duplications are removed, issues resolve, and status propagates between departments.

Interactive actions must change actual demo state and update accompanying explanatory text. For each node, show: input, action, output, and reason for connection. Do not simulate confidential client data. Make this an inspectable diagram rather than a cinematic video users cannot control.

### Signature module C: RETRO OPERATIONAL ARTIFACTS
Choose two or three distinctive, self-contained visual objects rather than dozens of gimmicks:
- A CRT-like terminal showing labeled **sample** order events and system checks.
- A tiny isometric dispatch/warehouse/field-service vignette with limited frame-rate purposeful movement and simple low-poly geometry.
- A printed-job-ticket visual with punch marks, annotations, and status changes.

Artifacts should carry real information or support navigational discovery; no fake system metrics framed as company achievements. Restrained sound is optional **only as opt-in**, default off.

### Motion language
- Quiet default: sparse environmental motion, occasional blinking cursor/status light, subtle diagram pulse.
- Narrative motion: precisely timed stroke drawing, cropping, annotation appearance, staged connections; `ease` should have a designed feel, never bounce everywhere.
- Use GSAP ScrollTrigger for choreographed narrative sections and SVG transforms; keep most ordinary components CSS-native. Use Motion for React only when it solves an actual interaction need, not as a second global timeline system.
- Animate opacity and transforms, not constant layout-reflow properties; avoid excessive pinned sections.
- `prefers-reduced-motion`: transitions become short/instant; full functionality remains available.

## 5. Information architecture

### V1 routes (build fully)
1. `/` — strategic statement, signature animation, problem framing, capabilities, proof, finished-output solutions, clear CTA.
2. `/capabilities` — systems integration, technical leadership, custom software & AI, hardware connectivity; outcomes and concrete examples.
3. `/work` — project index using editorial exhibits, not generic tiles.
4. `/work/ageverified-lax` — verified product case study; authentic UI, distinct user roles, operational workflow. Facts marked for review.
5. `/solutions` — completed operational results, with links to lead management and invoicing propositions; clearly mark services as offered versus concepts under development.
6. `/about` — founder/working philosophy, operational leadership, engineering practice; truthful firm size and background.
7. `/contact` — short qualifying form and alternative direct-contact method, working back end (or clearly identified development mode).

### Future routes (plan, don't build unnecessarily)
`/industries/home-improvement`, `/industries/contractors`, `/industries/distributors`, `/work/[slug]`, `/insights/[slug]`, `/solutions/invoicing`, `/solutions/leads`.

### Navigation
Work / Capabilities / Solutions / About / `Discuss your operation`. Avoid a sprawling menu. Mobile navigation must work flawlessly.

## 6. Homepage storyboard — DO NOT reduce this to a card stack

**01 — HERO / FIRST IMPRESSION**
- Full-bleed dark environment, generous vertical space, commanding left-offset headline: `You built the business. / We engineer what runs it.`
- Supporting sentence no more than 32 words. Primary CTA `Discuss your operation`; secondary `Explore the systems`.
- To the right or underneath, the animated but interactive 'mechanics of a business' artifact: partly sketched plan, partly realized system. It can overlap the editorial type *without obscuring it*.
- Tiny corner labels like `HITCHCODE / OPERATIONS ENGINEERING` and `SYSTEM STUDY 001` establish drafted-object language. Do not present invented client names or statistics.
- First paint must be beautiful and intelligible before animations load.

**02 — THE RECOGNITION MOMENT**
- Transition to light warm surface with one large editorial statement: `Growth can hide a remarkable amount of friction.`
- Tell a precise operational story in three or four short observations: lead information copied between systems, schedule changed without corresponding updates, warehouse order mismatched, invoice delayed.
- A horizontal-to-vertical schematic visually demonstrates the same job crossing departments. Avoid stock illustrations.

**03 — FEATURE EXPERIENCE / CONNECTED OPERATION**
- The six-stage connected-workflow exhibit. Users inspect inputs, transformations, failure points, and corrected flow. Make this a complete, high-quality interaction and not a wireframe placeholder.
- A strong neighboring text column says what it means commercially, without invented financial ROI.

**04 — CAPABILITIES AS EDITORIAL CHAPTERS**
- Four numbered chapters with unique visual treatments. No four identical cards.
- `01 / Connect what exists.` Systems & integrations.
- `02 / Build what's missing.` Custom tools, AI workflows, interfaces.
- `03 / Lead the technical decisions.` Fractional CTO / architecture / delivery oversight.
- `04 / Take work off the operation.` Managed lead and invoice outcomes.
- Every chapter includes a two-sentence human explanation and an authentic example, not an aspirational feature list.

**05 — FROM PLAN TO LIVE SYSTEM**
- Full-width `Blueprint → Working System` sequence. Let the visitor control the reveal. Show a specific product workflow or operational console with plausible synthetic example data.
- A well-designed technical annotation layer explains what is being connected; remove annotation clutter in the live state.

**06 — PROOF / SELECTED WORK**
- One or two substantive, art-directed features rather than fake social proof.
- AgeVerified Lax: actual service, real role flows, real screenshots where available. Avoid publishing unsupported metrics; mark for verification.
- Newark school retrofit operations leadership: may support a personal operating-history story, but clearly distinguish from Hitchcode-delivered software work. [VERIFY wording, dates, approvals, and figures before public copy.]
- No fake Fortune 500 logos, invented case studies, or anonymous five-star reviews.

**07 — MANAGED OUTPUTS**
- A more product-like area demonstrating completed work delivered to the client. Lead handling, invoicing. Example terminal or document artifact shows input → review/exception path → finished result.
- Do not conflate a future service concept with an existing live deployment.

**08 — THE PRINCIPLE / ABOUT**
- One short operational philosophy and personal credibility. Human, matter-of-fact, unusually succinct. No 'we are a passionate team of innovators'.

**09 — CONTACT / FINAL PITCH**
- Warm, confident invitation: `Where is the work getting stuck?`
- One simple CTA. Subtle animated schematic closes/loops into first section. No aggressive qualifying quiz.

## 7. Writing and editorial rules

Audience: a company owner, not a developer. Explain problems in company-language first, technical mechanisms second. Confident, calm, slightly sharp, never buzzword-heavy.

**Approved starting copy (rewrite only with a stated reason):**
- Hero: `You built the business. We engineer what runs it.`
- Subhead: `We connect the software, workflows, and equipment behind established companies, and build what is missing. Less work between teams. More control over the operation.`
- Problem: `Growth can hide a remarkable amount of friction.`
- Systems: `Connect what exists.` / `Your tools should agree about what happened.`
- Software: `Build what's missing.` / `When the right tool doesn't exist, we make it.`
- Leadership: `Someone needs to own the technical decisions.`
- Managed work: `You should receive the result, not another dashboard to manage.`
- Contact: `Where is the work getting stuck?` / `Discuss your operation.`

No phrases such as unlock potential, leverage cutting-edge, seamlessly transform, innovative solutions, revolutionize, synergies, AI-powered everything, scale effortlessly, or empower your journey. No exaggerated universal claims like 'eliminate all manual work'. Prefer concrete verbs and common nouns. Keep paragraphs short, use subheads that carry meaning, and vary rhythm. No gratuitous em dashes or hard-sell urgency. Every claim must be accurate or marked `[VERIFY]`.

## 8. Design tokens and composition

- Desktop canvas design at 1440px with a 12-column underlying grid and variable section max-width; mobile-first reality at 390px, test 320px too.
- Deliberately break internal grids for large type, offset details, stage-like scenes, and art direction without horizontal overflow.
- Spacing based on 4/8px primitives but vary section scale widely (80–180px desktop when appropriate). Do not use uniform padding on every section.
- Borders mostly hairline separators, dimension lines, or technical charts. Use near-square or subtly rounded edges where necessary; avoid ubiquitous `rounded-xl`.
- Navigation unobtrusive, persistently accessible. Calls to action meaningful, visually restrained but clear.
- Avoid excessive blur, contrast effects, parallax and noise; they can make premium work feel synthetic.
- For each section define its **one major visual idea** and one concrete visitor takeaway.

## 9. Implementation architecture

**Default if repository permits:** Next.js App Router + TypeScript. Reuse existing architecture where reasonable. Do not migrate frameworks casually. React Server Components for static content, client components only for actual stateful experiences. Semantic HTML and properly labeled controls.

**Recommended motion and art tools:** GSAP + ScrollTrigger for choreographed sequences; SVG and CSS for drafting and line art; optional Motion for React for stateful small UI; native CSS for micro motion; Three.js/React Three Fiber only if the chosen scene truly requires real 3D. All plugin/library choices must be justified by benefit and page weight. GSAP is commercially available at no charge under its standard license; verify current terms when installing.

**Important:** Do not add Framer or Webflow as a competing deployment target. Figma is for visual planning, asset composition, review, and optional design-system work, not a required production renderer.

**Component plan:**
- `SiteHeader`, `SiteFooter`, `EditorialSection`, `ProofFeature`, `ContactForm`.
- `BlueprintReveal`: reusable scene with mode control and reduced-motion fallback.
- `OperationMap`: inspectable process model in JSON data, linked to actual SVG node positions and explanatory panels.
- `RetroArtifact`: optional, isolated interactive diagnostic visual.
- `CaseStudyLayout`: reusable project typography and evidence structure.
- One central `design-tokens.css`; avoid unmaintainable per-component magic numbers.

Keep demo process data separate from rendering logic. Use testable state transitions. Use actual source assets when permission exists, or original drawings made for this site. No copyrighted Basement visual exports.

### Minimum animation prototype acceptance
- One prototype showing a specific business event moving across three departments, including a meaningful inspect action.
- One blueprint-to-live state switch with perfectly aligned geometry and readable output.
- One deliberately playful retro artifact that is not a distraction.
- Works on desktop and on a touch/mobile fallback; keyboard operable.

## 10. Build stages and required reviews

**Gate 1 — Repository audit and design research**
Read project files, dependencies, architecture, assets, routes, copy and existing integrations. Report what can be preserved and what is missing. Inspect live Basement and its published build breakdown where browsing is available. Do not touch production. Create `docs/redesign/audit.md` and `docs/redesign/reference-notes.md`.

**Gate 2 — Visual exploration**
Make three materially different but on-strategy HERO studies (not three generic palette swaps). The three directions:
- **A / Technical Atelier:** editorial typography and almost architectural drafting, sparse retro details.
- **B / The Control Room:** stronger nostalgic hardware texture, CRT sample-data displays, low-poly operational vignette.
- **C / The Living Blueprint:** technical schematics and blueprint-to-product transformation dominate, with playful computing accents.

Render as real, screenshot-ready HTML/CSS prototype routes under `/design-lab/a`, `/design-lab/b`, `/design-lab/c`, not just prose or image moodboards. Ensure different composition, type scale, negative space, and art direction. Screenshot desktop/mobile. Pause for owner selection of direction, or choose C as default only if autonomous operation was explicitly requested.

**Gate 3 — System and signature interaction**
With chosen direction, establish tokens, typography, spacing, grid, controls, illustration language and motion timings. Build `BlueprintReveal` and `OperationMap` as functional, accessible components. Capture states and write a short explanation of the animation architecture. Do not build all pages until the signature interaction feels excellent.

**Gate 4 — Homepage**
Implement all nine storyboard sections with real copy, unique composition, contact action, robust responsive behavior, and no placeholder service cards.

**Gate 5 — Inside pages and case study**
Implement V1 routes with consistent typography, original diagrams, credible project evidence, clear crosslinks and CTAs. No fake proof.

**Gate 6 — QA and launch preparation**
Run lints, typechecking, tests, production build, screenshot inspection, interaction tests, browser/mobile checks. Evaluate performance, keyboard access, reduced motion, metadata, OG cards, SEO basics, contact flow, analytics, privacy and errors. Do not deploy without approval.

**Required agent progress report after every gate:** Changed files, running preview address, screenshots paths, checks performed, major visual decisions, known risks, factual claims to verify, and what requires human approval.

## 11. Required browser tests

- Screenshots at 1440×900, 1280×800, 768×1024, 390×844, and 320×720. Inspect screenshots, not just whether Playwright completes.
- Compare before/after interactions, keyboard tab sequence, touch simulation, and reduced-motion rendering.
- Test navigation, blueprint toggle, each inspectable node, contact form states, invalid submissions, thank-you state and fallback.
- No overflow, clipped headlines, illegible annotations, dead controls, scroll traps, content hidden beneath header, layout jumps, blank WebGL regions, or interactive failures in reduced-motion mode.
- Fail the build if browser console errors occur on core routes.

## 12. Content integrity and working assumptions

- Hitchcode is a lean independent technology business; do not portray it as a large anonymous agency.
- User's past operational project: approximately 50 Newark school buildings, ~$3.2M project (2022). This is founder experience, not automatically a Hitchcode software case study. `[VERIFY]`
- AgeVerified Lax: actual product user owns/builds, with real customer workflow and usage. Get current facts and authorized captures before showing numbers, identities, or real UI. `[VERIFY]`
- Bay State Bath is an ideal-client example; **not a published customer** without permission. Do not name or show it on the site by default.
- AI workflows and hardware integration are service capabilities; do not imply specific vendor certifications or completed integrations without proof.
- Lead generation/invoicing packaged outcomes require exact scope, review process, pricing and SLA to be confirmed before launch. `[VERIFY]`

## 13. Practical performance and quality budgets

- Aim for field Core Web Vitals: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at the 75th percentile. Lab tests are not substitutes for field performance.
- Page usable and legible before animation bundles initialize; important text is server-rendered.
- Lazy-load below-fold media and expensive interactive sections. Prefer vector/SVG for diagrams over loaded 3D scenes where the visual result is comparable.
- Use `next/font`, `next/image`, compression, responsive imagery, and static poster frames for optional canvas scenes.
- Animations must be deterministic, cancelable, cleaned up on unmount, and should not leak requestAnimationFrame loops or observers.
- Do not block scroll or key interactions with decorative layers; use pointer-events correctly.
- Meaningful focus states, accessible contrast, labeled inputs, reduced motion, useful alt text. No auto-audio.

## 14. Definition of done

The result is approved only if:
- A target business owner can explain what Hitchcode does in five seconds.
- The site visually feels authored and editorial, not templated; visual identity is consistent across pages and breakpoints.
- The schematic-to-working-system transformation is convincing, smooth, controllable, and actually tells a business story.
- The retro elements are distinct and delightful but not childlike, distracting or game-first.
- The work section is credible and honest; every metric and claim has owner approval.
- The content describes outcomes and operational realities before capabilities and implementation details.
- Primary call to action works; forms and fallback routes are functional.
- Mobile, accessibility, browser behavior and performance pass the documented gates.
- Production deployment is explicitly approved by the owner.

**North-star test:** Could a successful owner-operated contractor or distributor see the site and conclude that this is somebody who could safely untangle a complicated, profitable business? If not, the redesign is not finished.
