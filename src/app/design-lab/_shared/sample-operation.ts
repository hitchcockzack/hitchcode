// The lab studies read the canonical synthetic job from src/content/demo.
export {
  EVENT_LOG,
  SAMPLE_JOB,
  SAMPLE_LABEL,
  STAGES,
  stageIndex,
  type LogEvent,
  type LogStatus,
  type Stage,
  type StageId,
} from '@/content/demo/job-j2417'

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
