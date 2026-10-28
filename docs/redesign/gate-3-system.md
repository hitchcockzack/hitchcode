# Gate 3 — System and signature interactions

**Decision recorded (Gate 2):** direction **A, Technical Atelier**, as the site's look. C's build line becomes the section-05 signature and B's terminal the section-07 managed-outputs artifact. Approved by the owner on Oct 28, 2026.

**Housekeeping done before this gate:** the production code that existed only in the working tree (AI concierge, voice server, `vercel.json`, homepage and header updates) is committed on `main` as `7327f2a` (local, not pushed). `redesign/digital-showroom` is rebased on top of it. Left untracked on purpose: `.cursor/`, `enterprise/` (internal pricing), `public/from-figma/`.

**Review it at** `/design-lab/system` (also linked as "G3" in the lab switcher).

## What was built

| Piece | File | Notes |
| --- | --- | --- |
| Tokens | `src/styles/design-tokens.css` | Color, type scale, space, grid, radius, elevation, motion, layers. Custom properties only; inert until used. |
| Fonts | `src/lib/fonts.ts` | Newsreader (display), Instrument Sans (text), IBM Plex Mono (annotation), Doto (printed objects only), VT323 (terminal only). |
| Connected operation | `src/components/showroom/OperationMap.tsx` | PRD module B. Six stages plus inventory and follow-up branches. |
| Operation state | `src/components/showroom/operation-map-state.ts` | Pure reducer, unit-tested. |
| Operation content | `src/content/demo/connected-operation.ts` | Every node: input, action, output, plus *where it stalls* (today) or *why connected* (connected). |
| Reveal engine | `src/components/showroom/BlueprintReveal.tsx` | PRD module A. Scene-agnostic: takes `draft` and `live` layers. |
| Job scene | `JobConsole.tsx`, `JobReveal.tsx` | The J-2417 console in A's materials; live data phases and approval. |
| Retro artifact | `src/components/showroom/WorkOrder.tsx` | Dot-matrix work order whose stamp reports the operation's state. |
| Demo job | `src/content/demo/job-j2417.ts` | Single source for all synthetic data; the lab studies now re-export it. |
| Review page | `src/app/design-lab/system/` | Token specimen plus both exhibits. |

## Token decisions worth knowing

- **Two text-safe neutrals were added.** PRD slate (`#707C79`) measures about 3.7:1 on paper, below the 4.5:1 needed for small text. `--slate-text #56615F` (about 5.2:1) is used for annotations on paper; slate stays for lines. Likewise `--signal-text #A9481F` for orange text on paper; `--signal` itself stays a fill and line color.
- **Font tokens must live with the font variables.** CSS custom properties resolve where they are declared, so the family tokens are declared on `:root` and on `.hc-type` (which `systemFontVariables` adds). At Gate 4 the font classes move to `<html>` and `:root` alone suffices.
- **Section rhythm is deliberately uneven:** quiet 96–180px, standard 72–128px, tight 48–80px.
- **Motion:** drafting ease `cubic-bezier(0.65, 0, 0.35, 1)` for things being drawn, settle ease `cubic-bezier(0.22, 1, 0.36, 1)` for responses. Nothing bounces. Reduced motion collapses every duration token to 1ms and keeps every control working.

## Animation architecture

The rule: **state lives in React, motion lives in CSS, and nothing animates layout.**

1. **Small state machines, no timeline library.** Each exhibit holds a few values (operation mode, propagation step, selected node; reveal position, glide flag; job phase). Timers advance them and are cleared on unmount, so nothing leaks: no `requestAnimationFrame` loops, no observers.
2. **CSS turns state into motion.**
   - Routes draw with `stroke-dashoffset` from their computed length, staggered by a per-edge `--i` index along the job's path. Arrowheads land after their line.
   - Department status changes one step every 320ms.
   - The build line moves the boundary of two `clip-path` layers; it only transitions during a glide, never while dragging.
3. **One geometry, two materials.** The reveal renders the same component twice: drawn (`aria-hidden`) and working. Draft-only notes are absolutely positioned, so both layers keep identical layout at every width without measuring anything. Values the system fills in become hatched placeholders in the drawing.
4. **Schematics are SVG with HTML on top.** Routes, clouds and notes are SVG in a fixed coordinate space; departments are real buttons placed by percentage of that space. That gives aligned art plus native focus, keyboard and screen-reader behavior.
5. **Component-level responsiveness.** `OperationMap` switches from schematic to list with a container query (at 1040px of its own width), so it adapts wherever it is placed. The reveal runs its line horizontally on phones and the same 767px query drives both CSS and pointer math.
6. **GSAP is still not installed.** Nothing here needs a timeline. It enters at Gate 4 only if scroll-choreographed sections (section 02's schematic, the closing loop) need ScrollTrigger, and the license is to be re-checked at install.

## Accessibility

- **Operation map.** Departments are toggle buttons with a roving tab stop; the arrow keys, Home and End move selection and focus. The inspector and the explanatory copy are polite live regions. The schematic SVG is decorative (`aria-hidden`), and its content is duplicated as text for phones and assistive tech.
- **Reveal.** The build line is a `slider` (`aria-valuenow`, `aria-valuetext` "46% built", "Live system"), with arrow, Page and Home/End keys. Blueprint and Live system are `aria-pressed` toggles. A polite status line announces each job phase, closing a Gate 2 limitation.
- **Focus** is visible everywhere: signal outline on departments, ink outline on the grip only.
- **Reduced motion:** connecting jumps straight to the finished state; the reveal glides instantly and the job lands on "sent".
- **Without JavaScript,** the server render shows the operation as it runs today and the reveal at 46% built.

## Checks performed

- Full-page captures at 1440, 1280, 1024, 768, 390 and 320 widths, plus reduced motion and no-JS (`screenshots/gate-3/`). No horizontal overflow at any width. One 2px overflow at 768 was caused by a drafting overshoot; it was fixed in the component and clipped at the page.
- Scripted interactions:
  - Connecting propagated 3 of 8 departments at 1.2s and all 8 by 4s, and the stamp changed to "Invoice in review".
  - Inspecting Invoice shows "Why connected"; Arrow Right moves selection and focus to Follow-up.
  - Returning to today resets the map.
  - The reveal reaches review, "Approve and send" works, and the status line reads "Job J-2417: Invoiced · sent 15:40".
  - Reduced-motion connect completes instantly.
- `node --test scripts/qa/operation-state.test.mjs`: 6/6 pass.
- `tsc --noEmit`: 0 errors. Zero console or page errors.

Evidence:
- [operation, connecting](screenshots/gate-3/interactions/op-connecting.png)
- [operation, connected, Invoice inspected](screenshots/gate-3/interactions/op-connected-invoice.png)
- [reveal at review](screenshots/gate-3/interactions/reveal-review.png)
- [reveal sent](screenshots/gate-3/interactions/reveal-sent.png)
- [phone list, today](screenshots/gate-3/interactions/g3-mob-list-today.png)
- [phone list, connected](screenshots/gate-3/interactions/g3-mob-list-connected.png)
- [phone reveal](screenshots/gate-3/interactions/g3-mob-reveal.png)

## Known limits and risks

- **On a 1040–1150px container the schematic's SVG text renders at about 9–10px.** Below that the list layout takes over.
- **The operation map's copy column is drafted by me,** not owner-approved PRD copy. It avoids numbers on purpose. Flagged for your review:
  - Today: "Four handoffs where the job can stall."
  - Connected: "One record, every department."
  - Outcomes: "Schedule changes reach the crew, the warehouse and the customer at once." / "Invoices start when the work ends, not when the paperwork surfaces." / "The owner stops being the switchboard."
- **Nothing on the live site changed.** The components are used only under `/design-lab` until Gate 4.

## Gate 4 plan (needs your go-ahead)

Assemble the homepage from these pieces on the PRD storyboard:

1. **01 Hero:** study A.
2. **02 Recognition:** the sheet becomes the page, with a horizontal-to-vertical job schematic.
3. **03 Connected operation:** `OperationMap`.
4. **04 Capabilities:** four editorial chapters, each with its own drawing.
5. **05 From plan to live system:** `JobReveal`.
6. **06 Proof:** AgeVerified Lax and Newark facts, pending your `[VERIFY]` answers.
7. **07 Managed outputs:** B's terminal, cut down to input → review → result.
8. **08 Principle.**
9. **09 Contact:** "Where is the work getting stuck?"

The existing homepage, including the AI concierge demo, stays reachable until you approve the swap.
