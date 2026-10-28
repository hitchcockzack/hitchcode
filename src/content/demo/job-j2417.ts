// Synthetic job J-2417 for a fictional insulation contractor. Nothing here describes a
// real client. Every artifact that renders this data must also render SAMPLE_LABEL
// (PRD §0, "Concept demonstration").

export const SAMPLE_LABEL = 'Concept demonstration · sample data'

export type StageId = 'lead' | 'consultation' | 'estimate' | 'scheduling' | 'installation' | 'invoice'

export type Stage = {
  id: StageId
  label: string
  department: string
  code: string
}

// The six-node home-improvement process from PRD §4, module B.
export const STAGES: readonly Stage[] = [
  { id: 'lead', label: 'Lead', department: 'Sales', code: 'LEAD' },
  { id: 'consultation', label: 'Consultation', department: 'Sales', code: 'CONSULT' },
  { id: 'estimate', label: 'Estimate', department: 'Estimating', code: 'ESTIMATE' },
  { id: 'scheduling', label: 'Scheduling', department: 'Operations', code: 'SCHEDULE' },
  { id: 'installation', label: 'Installation', department: 'Field', code: 'INSTALL' },
  { id: 'invoice', label: 'Invoice', department: 'Accounting', code: 'INVOICE' },
]

export const stageIndex = (id: StageId) => STAGES.findIndex((stage) => stage.id === id)

export const SAMPLE_JOB = {
  id: 'J-2417',
  scope: 'Attic insulation + air sealing',
  site: '14 Larch St.',
  siteNote: '2-story colonial',
  estimate: { id: 'E-1182', total: '$8,940' },
  crew: 'Crew 3',
  slot: 'Mon 11/3 · 07:30',
  material: { name: 'R-49 cellulose', qty: '62 bags', location: 'Bay 4' },
  invoice: { id: 'INV-3318' },
} as const

export type LogStatus = 'OK' | 'REVIEW'

export type LogEvent = {
  at: string
  stage: StageId
  system: string
  text: string
  status: LogStatus
}

// One job crossing every department. Each line is a handoff a person would
// otherwise retype, chase, or remember.
export const EVENT_LOG: readonly LogEvent[] = [
  { at: 'TUE 08:12', stage: 'lead', system: 'WEB', text: 'Lead in · attic insulation', status: 'OK' },
  { at: 'TUE 08:12', stage: 'lead', system: 'CRM', text: 'Matched customer · no duplicate', status: 'OK' },
  { at: 'TUE 08:15', stage: 'consultation', system: 'CAL', text: 'Site visit booked · Thu 10:00', status: 'OK' },
  { at: 'THU 10:47', stage: 'consultation', system: 'CRM', text: 'Visit notes + 14 photos filed', status: 'OK' },
  { at: 'THU 14:30', stage: 'estimate', system: 'EST', text: 'E-1182 sent · $8,940', status: 'OK' },
  { at: 'FRI 16:05', stage: 'estimate', system: 'EST', text: 'E-1182 signed by customer', status: 'OK' },
  { at: 'FRI 16:05', stage: 'scheduling', system: 'SCH', text: 'Crew 3 held · Mon 07:30', status: 'OK' },
  { at: 'FRI 16:06', stage: 'scheduling', system: 'STK', text: '62 bags R-49 reserved · bay 4', status: 'OK' },
  { at: 'MON 07:41', stage: 'installation', system: 'FLD', text: 'Crew 3 on site · checklist open', status: 'OK' },
  { at: 'MON 15:12', stage: 'installation', system: 'FLD', text: 'Job closed · 0 open items', status: 'OK' },
  { at: 'MON 15:12', stage: 'invoice', system: 'ACC', text: 'INV-3318 drafted from E-1182', status: 'REVIEW' },
  { at: 'MON 15:40', stage: 'invoice', system: 'ACC', text: 'Approved by office · sent', status: 'OK' },
]

// Live-system states for the Blueprint → Working System scene. Phase 0 is the
// first frame: scheduled, waiting for install day.
export type JobPhase = {
  active: StageId | 'complete'
  status: string
  schedule: string
  materials: string
  billing: string
  billingNote: string
  needsReview: boolean
  ticker: string
}

export const JOB_PHASES: readonly JobPhase[] = [
  {
    active: 'scheduling',
    status: 'Scheduled · Mon 07:30',
    schedule: '7.5 h planned on site',
    materials: 'Reserved',
    billing: 'Drafts when the job closes',
    billingNote: `From ${SAMPLE_JOB.estimate.id} · ${SAMPLE_JOB.estimate.total}`,
    needsReview: false,
    ticker: 'FRI 16:06  62 bags R-49 reserved for J-2417, bay 4',
  },
  {
    active: 'installation',
    status: 'On site · Crew 3',
    schedule: 'Checked in 07:41',
    materials: 'Loaded on truck 3',
    billing: 'Drafts when the job closes',
    billingNote: `From ${SAMPLE_JOB.estimate.id} · ${SAMPLE_JOB.estimate.total}`,
    needsReview: false,
    ticker: 'MON 07:41  Crew 3 checked in on site, checklist open',
  },
  {
    active: 'invoice',
    status: 'Closed · invoice drafted',
    schedule: 'Closed 15:12 · 6 photos',
    materials: '62 of 62 used',
    billing: `${SAMPLE_JOB.invoice.id} drafted`,
    billingNote: 'Needs office review',
    needsReview: true,
    ticker: `MON 15:12  ${SAMPLE_JOB.invoice.id} drafted from signed estimate ${SAMPLE_JOB.estimate.id}`,
  },
  {
    active: 'complete',
    status: 'Invoiced · sent 15:40',
    schedule: 'Closed 15:12 · 6 photos',
    materials: '62 of 62 used',
    billing: `${SAMPLE_JOB.invoice.id} sent`,
    billingNote: `${SAMPLE_JOB.estimate.total} · approved by office`,
    needsReview: false,
    ticker: `MON 15:40  ${SAMPLE_JOB.invoice.id} approved by the office and sent`,
  },
]

// Delay before each phase after the visitor switches to the live system.
export const PHASE_DELAYS_MS = [0, 1100, 2300, 2100] as const

export const RAIL_META: Record<StageId, string> = {
  lead: 'Tue 08:12',
  consultation: 'Thu 10:00',
  estimate: 'Signed Fri',
  scheduling: 'Crew 3 held',
  installation: 'Mon 11/3',
  invoice: 'At job close',
}
