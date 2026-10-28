import { EVENT_LOG, STAGES, SAMPLE_JOB } from './job-j2417'

// Terminal channels for the managed-operations screens. Synthetic, labelled as sample data
// wherever rendered. Each line is a finished output or a hand-off to a person.

export type TerminalStatus = 'OK' | 'REVIEW' | 'HOLD'

export type TerminalLine = {
  at: string
  stage: string
  system: string
  text: string
  status: TerminalStatus
}

export type TerminalChannel = {
  id: string
  label: string
  title: string
  stages: readonly { id: string; code: string }[]
  log: readonly TerminalLine[]
  /** Lines already printed on the server-rendered first frame. */
  firstFrame: number
  /** Where a replay restarts. */
  replayFrom: number
  watching: string
  complete: string
}

export const JOB_CHANNEL: TerminalChannel = {
  id: 'job',
  label: 'Job',
  title: `Ops monitor · job ${SAMPLE_JOB.id}`,
  stages: STAGES.map((stage) => ({ id: stage.id, code: stage.code })),
  log: EVENT_LOG,
  firstFrame: 8,
  replayFrom: 3,
  watching: `watching ${SAMPLE_JOB.id}`,
  complete: 'job complete · invoice sent',
}

const LEAD_STAGES = [
  { id: 'answer', code: 'ANSWER' },
  { id: 'match', code: 'MATCH' },
  { id: 'qualify', code: 'QUALIFY' },
  { id: 'book', code: 'BOOK' },
  { id: 'recap', code: 'RECAP' },
] as const

export const LEADS_CHANNEL: TerminalChannel = {
  id: 'leads',
  label: 'Leads',
  title: 'Managed lead desk · today',
  stages: LEAD_STAGES,
  log: [
    { at: 'MON 07:02', stage: 'answer', system: 'TEL', text: 'Inbound call answered in 2 rings', status: 'OK' },
    { at: 'MON 07:03', stage: 'answer', system: 'AI', text: 'Scope: attic insulation · 2-story', status: 'OK' },
    { at: 'MON 07:03', stage: 'match', system: 'CRM', text: 'Existing customer · no duplicate', status: 'OK' },
    { at: 'MON 07:04', stage: 'qualify', system: 'AI', text: 'In service area · timeline 3 weeks', status: 'OK' },
    { at: 'MON 07:04', stage: 'book', system: 'CAL', text: 'Site visit held · Thu 10:00', status: 'OK' },
    { at: 'MON 07:05', stage: 'recap', system: 'MAIL', text: 'Recap to the office + customer', status: 'OK' },
    { at: 'MON 09:41', stage: 'answer', system: 'TEL', text: 'Inbound · 40k sq ft warehouse', status: 'OK' },
    { at: 'MON 09:42', stage: 'qualify', system: 'AI', text: 'Outside standard scope', status: 'REVIEW' },
    { at: 'MON 09:55', stage: 'qualify', system: 'OPS', text: 'Owner called back · quote path', status: 'OK' },
    { at: 'MON 09:56', stage: 'recap', system: 'MAIL', text: 'Recap filed with the decision', status: 'OK' },
  ],
  firstFrame: 6,
  replayFrom: 2,
  watching: 'answering the main line',
  complete: '2 leads handled · 1 to a person',
}

const INVOICE_STAGES = [
  { id: 'close', code: 'CLOSE' },
  { id: 'draft', code: 'DRAFT' },
  { id: 'check', code: 'CHECK' },
  { id: 'send', code: 'SEND' },
  { id: 'paid', code: 'PAID' },
] as const

export const INVOICES_CHANNEL: TerminalChannel = {
  id: 'invoices',
  label: 'Invoices',
  title: 'Managed invoicing · this week',
  stages: INVOICE_STAGES,
  log: [
    { at: 'MON 15:12', stage: 'close', system: 'FLD', text: 'J-2417 closed · 6 photos', status: 'OK' },
    { at: 'MON 15:12', stage: 'draft', system: 'ACC', text: 'INV-3318 drafted from E-1182', status: 'OK' },
    { at: 'MON 15:13', stage: 'check', system: 'CHK', text: 'Matches signed scope · $8,940', status: 'OK' },
    { at: 'MON 15:40', stage: 'send', system: 'ACC', text: 'Approved by office · sent', status: 'OK' },
    { at: 'TUE 11:20', stage: 'close', system: 'FLD', text: 'J-2422 closed · 1 change order', status: 'OK' },
    { at: 'TUE 11:21', stage: 'check', system: 'CHK', text: 'Change order not signed', status: 'REVIEW' },
    { at: 'TUE 13:05', stage: 'check', system: 'OPS', text: 'Signature collected on site', status: 'OK' },
    { at: 'TUE 13:06', stage: 'send', system: 'ACC', text: 'INV-3324 sent with change order', status: 'OK' },
    { at: 'THU 09:15', stage: 'paid', system: 'PAY', text: 'INV-3318 paid · ACH', status: 'OK' },
  ],
  firstFrame: 4,
  replayFrom: 1,
  watching: 'watching job close-outs',
  complete: 'week closed · nothing unbilled',
}
