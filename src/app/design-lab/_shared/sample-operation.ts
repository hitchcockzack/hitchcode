// Synthetic operating data shared by every design-lab study.
// Nothing here describes a real client. Any artifact that renders this data
// must also render SAMPLE_LABEL (PRD §0, "Concept demonstration").

export const SAMPLE_LABEL = 'Concept demonstration · sample data'

export type StageId =
  | 'lead'
  | 'consultation'
  | 'estimate'
  | 'scheduling'
  | 'installation'
  | 'invoice'

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

export type DepartmentLayer = {
  id: 'sales' | 'office' | 'field' | 'books'
  n: string
  name: string
  line: string
  input: string
  action: string
  output: string
  planned?: boolean
}

// Study A draws the same job as four stacked departments.
export const DEPARTMENT_LAYERS: readonly DepartmentLayer[] = [
  {
    id: 'sales',
    n: '01',
    name: 'Sales',
    line: 'One record from the first call.',
    input: 'Web form, phone call',
    action: 'Matches, books the visit',
    output: 'One lead record',
  },
  {
    id: 'office',
    n: '02',
    name: 'Office',
    line: 'The signed estimate becomes the schedule.',
    input: 'Signed estimate E-1182',
    action: 'Holds crew, reserves stock',
    output: 'Crew sheet and pick list',
  },
  {
    id: 'field',
    n: '03',
    name: 'Field',
    line: 'The crew sees the right materials.',
    input: 'Crew sheet and pick list',
    action: 'Check-in, photos, close-out',
    output: 'Completion record',
  },
  {
    id: 'books',
    n: '04',
    name: 'Books',
    line: 'The invoice waits on paperwork.',
    input: 'Completion record',
    action: 'Retyped by hand today',
    output: 'Planned: drafts at job close',
    planned: true,
  },
]
