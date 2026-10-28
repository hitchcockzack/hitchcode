// Connected Operation exhibit (PRD §4, module B): one sample home-improvement job,
// six stages plus two branches, shown first as it runs by hand and then connected.
// Synthetic and labelled "Concept demonstration". Rendering lives in OperationMap.

export type OpNodeId =
  | 'lead'
  | 'consultation'
  | 'estimate'
  | 'scheduling'
  | 'inventory'
  | 'installation'
  | 'invoice'
  | 'followup'

export type OpMode = 'today' | 'connected'

export type OpNode = {
  id: OpNodeId
  label: string
  department: string
  branch?: boolean
  today: { input: string; action: string; output: string; stall: string; status: string; issue?: boolean }
  connected: { input: string; action: string; output: string; why: string; status: string }
}

export type HandoffIssue = 'duplicate' | 'missed-update' | 'mismatch' | 'delay'

export type OpEdge = {
  id: string
  from: OpNodeId
  to: OpNodeId
  today: { method: string; note: string; issue?: HandoffIssue; delta?: number }
  connected: { carries: string }
}

// List order is the reading order on phones: branches follow the stage that feeds them.
export const OP_NODES: readonly OpNode[] = [
  {
    id: 'lead',
    label: 'Lead',
    department: 'Sales',
    today: {
      input: 'Web form, phone call',
      action: 'Typed into the CRM by whoever answered',
      output: 'Two records for one customer',
      stall: 'So the customer now exists twice.',
      status: 'Duplicate',
      issue: true,
    },
    connected: {
      input: 'Web form, phone call',
      action: 'Matched to the existing customer',
      output: 'One record: J-2417',
      why: 'Every later step reads from this record, so nobody retypes the address or the scope.',
      status: 'One record',
    },
  },
  {
    id: 'consultation',
    label: 'Consultation',
    department: 'Sales',
    today: {
      input: 'Details copied from the CRM',
      action: 'Visit booked by phone, notes on paper',
      output: 'Photos on one person’s phone',
      stall: 'The photos live on one person’s phone.',
      status: 'Notes on paper',
    },
    connected: {
      input: 'Record J-2417',
      action: 'Visit booked from the record; notes and photos attached',
      output: 'Site notes on the job',
      why: 'The estimator prices what was actually seen on site.',
      status: 'Notes attached',
    },
  },
  {
    id: 'estimate',
    label: 'Estimate',
    department: 'Estimating',
    today: {
      input: 'Notes forwarded by email',
      action: 'Priced in a spreadsheet',
      output: 'PDF emailed to the customer',
      stall: 'The signed PDF has to be re-keyed downstream.',
      status: 'Emailed',
    },
    connected: {
      input: 'Site notes on the job',
      action: 'Priced from the visit, sent for signature',
      output: 'Signed estimate E-1182',
      why: 'The signature itself triggers scheduling and stock, not a reminder in an inbox.',
      status: 'Signed',
    },
  },
  {
    id: 'scheduling',
    label: 'Scheduling',
    department: 'Operations',
    today: {
      input: 'Signed PDF',
      action: 'Re-keyed onto the schedule board',
      output: 'Crew booked; the warehouse is not told when the date moves',
      stall: 'When the date moves, nobody tells the warehouse.',
      status: 'Retyped',
      issue: true,
    },
    connected: {
      input: 'Signed estimate E-1182',
      action: 'Holds a crew, reserves material, tells the customer',
      output: 'Crew 3, Mon 07:30 · 62 bags reserved',
      why: 'One date change reaches the crew, the warehouse and the customer together.',
      status: 'Crew held',
    },
  },
  {
    id: 'inventory',
    label: 'Inventory',
    department: 'Warehouse',
    branch: true,
    today: {
      input: 'A phone call, if someone remembers',
      action: 'Stages material from the original order',
      output: 'The wrong count on the truck',
      stall: 'Material is staged from the original order.',
      status: 'Mismatch',
      issue: true,
    },
    connected: {
      input: 'Reservation from scheduling',
      action: 'Picks against the job, flags shortages early',
      output: 'Pick list for crew 3',
      why: 'The warehouse sees a schedule change the moment it happens.',
      status: 'Picked',
    },
  },
  {
    id: 'installation',
    label: 'Installation',
    department: 'Field',
    today: {
      input: 'Printed crew sheet',
      action: 'Crew finds the material short on site',
      output: 'Job closed on paper',
      stall: 'The crew finds the shortage on site.',
      status: 'Short on site',
    },
    connected: {
      input: 'Crew sheet and pick list',
      action: 'Checklist, photos and close-out on a phone',
      output: 'Completion record',
      why: 'Closing the job is the event the office and the books are waiting for.',
      status: 'Closed',
    },
  },
  {
    id: 'invoice',
    label: 'Invoice',
    department: 'Accounting',
    today: {
      input: 'Paperwork, whenever it reaches the office',
      action: 'Invoice typed from the paperwork',
      output: 'An invoice days or weeks later',
      stall: 'Billing waits for paperwork to reach the office.',
      status: 'Waiting',
      issue: true,
    },
    connected: {
      input: 'Completion record',
      action: 'Drafted from the signed estimate; a person approves it',
      output: 'INV-3318 sent',
      why: 'Billing starts when the work ends, and every invoice is still reviewed.',
      status: 'In review',
    },
  },
  {
    id: 'followup',
    label: 'Follow-up',
    department: 'Customer care',
    branch: true,
    today: {
      input: 'Nothing arrives',
      action: 'Depends on who remembers',
      output: 'No warranty or review on record',
      stall: 'Nothing prompts it, so it rarely happens.',
      status: 'Dropped',
    },
    connected: {
      input: 'Completion record and paid invoice',
      action: 'Sends warranty details and a review request',
      output: 'Customer history on the record',
      why: 'The next job for this customer starts from what you already know.',
      status: 'Scheduled',
    },
  },
]

export const OP_EDGES: readonly OpEdge[] = [
  {
    id: 'lead-consultation',
    from: 'lead',
    to: 'consultation',
    today: { method: 'Retyped', note: 'Lead typed twice', issue: 'duplicate', delta: 1 },
    connected: { carries: 'Customer and scope' },
  },
  {
    id: 'consultation-estimate',
    from: 'consultation',
    to: 'estimate',
    today: { method: 'Email', note: 'Photos forwarded' },
    connected: { carries: 'Site notes' },
  },
  {
    id: 'estimate-scheduling',
    from: 'estimate',
    to: 'scheduling',
    today: { method: 'Re-keyed', note: 'Signed PDF re-keyed' },
    connected: { carries: 'Signed estimate' },
  },
  {
    id: 'scheduling-installation',
    from: 'scheduling',
    to: 'installation',
    today: { method: 'Printout', note: 'Crew sheet printed' },
    connected: { carries: 'Crew and date' },
  },
  {
    id: 'scheduling-inventory',
    from: 'scheduling',
    to: 'inventory',
    today: { method: 'Phone', note: 'Date change never reached the warehouse', issue: 'missed-update', delta: 2 },
    connected: { carries: 'Reservation' },
  },
  {
    id: 'inventory-installation',
    from: 'inventory',
    to: 'installation',
    today: { method: 'Truck', note: 'Wrong count staged', issue: 'mismatch', delta: 3 },
    connected: { carries: 'Pick list' },
  },
  {
    id: 'installation-invoice',
    from: 'installation',
    to: 'invoice',
    today: { method: 'Paperwork', note: 'Invoice waits for paperwork', issue: 'delay', delta: 4 },
    connected: { carries: 'Completion record' },
  },
  {
    id: 'invoice-followup',
    from: 'invoice',
    to: 'followup',
    today: { method: 'None', note: 'No follow-up' },
    connected: { carries: 'Paid invoice' },
  },
]

// The order status propagates once connected: the job's path, branches as they occur.
export const PROPAGATION_ORDER: readonly OpNodeId[] = [
  'lead',
  'consultation',
  'estimate',
  'scheduling',
  'inventory',
  'installation',
  'invoice',
  'followup',
]

export const OP_COPY = {
  today: {
    title: 'Four handoffs where the job can stall.',
    body: 'Nothing here is broken software. It is capable departments passing one job by hand. Each handoff is a place where a customer waits, a crew stands idle, or finished work sits unbilled.',
  },
  connected: {
    title: 'One record, every department.',
    body: 'The same people and most of the same tools. The job now carries its own record from first call to paid invoice. When the date moves, the warehouse knows. When the crew closes the job, billing starts, and a person still approves the invoice.',
  },
  outcomes: [
    'Schedule changes reach the crew, the warehouse and the customer at once.',
    'Invoices start when the work ends, not when the paperwork surfaces.',
    'The owner stops being the switchboard.',
  ],
} as const
