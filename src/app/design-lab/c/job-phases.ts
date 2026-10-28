import { SAMPLE_JOB, type StageId } from '../_shared/sample-operation'

// Live-system states for study C, kept apart from rendering so the sequence is testable.
// Phase 0 is the first frame: scheduled, waiting for install day.
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
