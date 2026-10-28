# AI Concierge — Build Notes & Reference

Live demo on the homepage: a visitor enters name/phone/email + consent → backend saves a lead, places an outbound Twilio call → a realtime AI runs a short screening conversation → on hangup the transcript is summarized, stored, and emailed.

**Flow:** form → `start-call` (rate limits, lead + call saved, Twilio dials, Pushover "call starting") → Twilio `<Connect><Stream>` → voice-server WS ↔ OpenAI Realtime → AI calls `end_call` (or caller hangs up / a guard trips) → voice-server POSTs transcript → `post-call-summary` (LLM summary + Supabase + Resend emails + Pushover "call ended").

## Architecture (where each piece runs)

| Piece | Runs on | Notes |
|---|---|---|
| Next.js app + API routes | **Vercel** (`www.hitchcode.net`) | UI, `start-call`, `twilio/voice`, `twilio/status`, `post-call-summary`, `/admin/ai-concierge` |
| Realtime voice bridge | **Railway** (`hitchcode-voice-production.up.railway.app`) | Long-lived WebSocket — **cannot** run on Vercel |
| Database | **Supabase** (`leads`, `calls`, `call_events`) | Server-only via service-role key; RLS on, no public policies |
| Outbound calls + recording | **Twilio** | |
| Live conversation LLM + STT | **OpenAI Realtime** (`gpt-realtime`) | speech-to-speech, μ-law 8kHz |
| Post-call summary | **OpenAI** (`gpt-4.1`) | JSON mode |
| Email | **Resend** (domain `hitchcode.net`) | Lives in the same Resend team as Age Verified Lax; DNS records in Vercel DNS |
| Operator alerts | **Pushover** | Call starting / ended / failed, health-check failures |

## Gotchas we hit (read before debugging)

**OpenAI Realtime (GA)**
- **Do NOT send `OpenAI-Beta: realtime=v1`** → `beta_api_shape_disabled`. GA uses the nested shape: `session.type:'realtime'`, `audio.input/output.format:{type:'audio/pcmu'}` (μ-law 8kHz = Twilio's format, zero transcoding).
- **Every** `session.update` (including mid-call instruction nudges) must include `session.type:'realtime'`, or `missing_required_parameter: session.type`.
- Audio-out event is `response.output_audio.delta`; greet first by sending `response.create` after `session.updated`.
- **Turn detection:** `server_vad` with a raised `threshold` (~0.6) keeps the AI talking through background noise; `semantic_vad`/eagerness `auto` was too trigger-happy. `interrupt_response`+`create_response` enable barge-in.

**Voice-server design**
- **Don't drive the call flow from transcript counts.** A stage machine that advanced per caller utterance drifted (a voicemail greeting and stray "yeah"s each counted), first causing premature hangups, then telling the model to "end the call" mid-conversation → repeated goodbyes and a wrong follow-up flag. The model runs the flow from the system prompt.
- **The AI hangs up via the `end_call` tool**, acted on only when `response.done` has `status: 'completed'` (`response.function_call_arguments.done` also fires for interrupted responses). The bridge then sends a Twilio `mark`; when Twilio echoes it (goodbye finished playing) the bridge closes the stream and Twilio runs the TwiML `<Hangup/>`. Caller speech during a voicemail message cancels the hangup (someone picked up); otherwise it just cuts the goodbye short.
- **Every idle path ends the call:** Twilio `timeLimit` (5 min) is the hard stop; the model is told to wrap up 60s before; 30s of caller silence → check-in, +20s → goodbye + hangup; a dropped OpenAI session hangs up instead of leaving a silent, billing line.

**Resend**
- **The sending domain must be verified** (DKIM `resend._domainkey`, `send.` MX + SPF TXT, `rsend` CNAME). `hitchcode.net` wasn't until Oct 2026, so every recap email was rejected since June — and nothing surfaced it. Delivery results now land in `call_events` (`email_internal_*`, `email_lead_*`, `push_*`) and failures are included in the end-of-call push.

**Supabase**
- Backend uses the **service-role / secret key**, not the publishable key.
- DB types must be `type` aliases, **not `interface`** — supabase-js collapses to `never` otherwise.
- **The migration must actually run.** Empty DB → `start-call` 500. Apply via Supabase MCP `apply_migration` (or SQL editor / psql with the DB connection string).
- **Free-plan projects pause after ~7 days of low DB activity.** The `<ref>.supabase.co` hostname stops resolving (NXDOMAIN), every query returns `TypeError: fetch failed`, and `start-call` 500s before Twilio is dialed. This silently took the demo down from July to Oct 2026. Fix: Supabase Dashboard → project → **Resume project** (restorable for up to 1 year). Prevented by the daily `/api/ai-concierge/health` cron, which writes a `keepalive` row to `call_events` (pruning ones older than 14 days) and runs table counts. The write matters: reports suggest read-only traffic may not reset the inactivity timer. Supabase also emails a warning ~1 week before pausing. The only guaranteed fix is the Pro plan.

**Zod v4**
- `z.record(keyType, valueType)` needs **both** args; `z.literal(true, { message })` (not `errorMap`).
- Harden LLM output with **`.catch()`** on every field so a sparse/empty transcript can't throw (that 500'd `post-call-summary`). `lead_score` is coerced + clamped.

**Vercel**
- Env vars must be set **in Vercel** (not just `.env.local`); set them before deploy (`NEXT_PUBLIC_*` are build-time).
- Production domain is **`www.hitchcode.net`** — `hitchcode.com` is NOT attached (SSL fails). `NEXT_PUBLIC_SITE_URL` must match the real domain or Twilio webhooks 404.
- Duplicate keys in `.env.local`: **last one wins** (an empty `SUPABASE_SERVICE_ROLE_KEY` once silently overrode the real one).
- `compiler.removeConsole` (`next.config.ts`) strips `console.*` from production builds. `error`/`warn` are now excluded; before Oct 2026 they were stripped too, so route failures never reached the Vercel logs.
- Hobby plan: crons can run **at most once a day** — a more frequent schedule in `vercel.json` fails the deploy.

**Railway**
- Old CLI (npm-global 4.x) can't auth on a non-TTY shell → upgrade to 5.x, use `railway login --browserless` (device code).
- `railway up` needs `--service <id>` when the project has a service; runtime var changes require a redeploy; generate a public domain and set target port **8080**.

**Twilio**
- `from` must be **E.164** and a **number owned by the account**.
- **Transcripts are NOT in Twilio** — they come from OpenAI Realtime and live in Supabase `calls.transcript` (+ recap email). Twilio only has call metadata. Audio recordings (we enabled `record:true`, dual-channel) live in **Twilio Console → Monitor → Logs → Recordings**.

**UI / Vortex**
- The Vortex glow self-composites with `brightness(200%)` 3×, so a non-black `backgroundColor` (`#0C0A09`) washes out to pale tan. Fix: keep the canvas transparent and put the solid color on the container behind it.

## Tuning levers

| Want to change | Where | Redeploy |
|---|---|---|
| Persona / questions / flow | `LIVE_CALL_SYSTEM_PROMPT` (voice-server `conversationOrchestrator.ts`, mirror `lib/ai-concierge/prompts.ts`) | Railway |
| Interruption sensitivity | `REALTIME_VAD_THRESHOLD` (↑ = more stubborn), `REALTIME_SILENCE_MS` | Railway env |
| AI voice | `OPENAI_REALTIME_VOICE` (cedar/marin/alloy/ash/ballad/verse/sage/shimmer) | Railway env |
| Models | `OPENAI_REALTIME_MODEL`, `OPENAI_SUMMARY_MODEL` | — |
| Summary fields / scoring | `POST_CALL_SUMMARY_PROMPT` + `conciergeSummarySchema` | Vercel |
| Max call length | `CALL_TIME_LIMIT_SECONDS` (`lib/ai-concierge/twilio.ts`; passed to the voice-server as a stream param) | Vercel |
| Form rate limits | `DAILY_CALL_LIMITS` in `start-call` (per number / per IP / total, rolling 24h); US numbers only | Vercel |
| Silence + wrap-up timing | `SILENCE_*`, `WRAP_UP_LEAD_SECONDS` (voice-server `twilioMediaStream.ts`) | Railway |

> Lead score needs an explicit **1–100 scale with anchors** in the prompt, or the model defaults to ~1–10.

## Ops cheat-sheet

- **Admin dashboard:** `https://www.hitchcode.net/admin/ai-concierge?key=<ADMIN_DASHBOARD_TOKEN>`
- **Health check:** daily Vercel cron (`vercel.json`, ~14:00 UTC) → `/api/ai-concierge/health`: Supabase keep-alive + Twilio balance (< $5 alerts) + voice-server `/health`. Failures push to Pushover and return 503. Manual run: `curl -H "Authorization: Bearer $CRON_SECRET" https://www.hitchcode.net/api/ai-concierge/health`
- **Deploy app:** `vercel --prod --yes` (repo root)
- **Deploy voice-server:** `railway up -y --detach --service <service-id>` (from `voice-server/`)
- **Voice-server logs:** `railway logs --service <service-id>`
- **App logs:** Vercel runtime logs (errors are handled + logged via `console.error`, so check info-level too)
- **DB:** Supabase MCP `list_tables` / `apply_migration` / `execute_sql` (the `plugin-supabase-supabase` variant needs `project_id`)
- **Supabase project ref:** `gvsldjplhsurevfakuzv` · **Railway project:** `hitchcode-voice`

### Env var locations
- **`.env.local` (local only)** and **Vercel (production):** `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`, `NEXT_PUBLIC_SITE_URL`, `VOICE_SERVER_WS_URL`, `OPENAI_API_KEY`, `OPENAI_SUMMARY_MODEL`, `RESEND_API_KEY`, `FROM_EMAIL`, `INTERNAL_LEAD_EMAIL`, `POST_CALL_SHARED_SECRET`, `ADMIN_DASHBOARD_TOKEN`, `CRON_SECRET`, `PUSHOVER_TOKEN`, `PUSHOVER_USER`
- **Railway (voice-server):** `PORT`, `APP_BASE_URL`, `POST_CALL_SHARED_SECRET` (must match the app), `OPENAI_API_KEY`, `OPENAI_REALTIME_MODEL`, `OPENAI_REALTIME_VOICE`, `REALTIME_TURN_DETECTION`, `REALTIME_VAD_THRESHOLD`

## Known scaffolded / TODO
- `/admin/ai-concierge` is gated only by `?key=` (env token). Replace with real auth before relying on it.
- ElevenLabs TTS + Deepgram STT clients exist but are **unused** in the live loop (kept for an optional post-call recap voicemail / cascade pipeline).
- Recording URL isn't stored in Supabase yet (lives in Twilio Console). Add a `recordingStatusCallback` if you want it surfaced in the dashboard.
- Twilio webhook signature validation is opt-in (`TWILIO_VALIDATE_SIGNATURE=true`).
