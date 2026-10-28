// How an engagement runs. Durations and prices are deliberately omitted until confirmed.

export const ENGAGEMENT_STEPS = [
  {
    no: '01',
    name: 'Conversation',
    line: 'One call about where the work gets stuck. No pitch deck.',
    detail:
      'You describe the operation and where it hurts. We tell you plainly whether it is worth an engagement, and if it is not, what we would do in your seat.',
  },
  {
    no: '02',
    name: 'Map',
    line: 'Real jobs traced end to end, from first call to paid invoice.',
    detail:
      'We follow actual jobs through every department and every tool, and write down each handoff, retype and wait. You get a plain map of where work and money stall.',
  },
  {
    no: '03',
    name: 'Blueprint',
    line: 'A drawing of what we connect, what we build, and what we leave alone.',
    detail:
      'Before anything is built you approve a blueprint: the systems involved, the record that ties them together, the checks, and who reviews what.',
  },
  {
    no: '04',
    name: 'Build',
    line: 'Small steps you can see working, with your people involved.',
    detail:
      'We build in pieces that go live one at a time, starting with the handoff that costs the most. Nothing waits for a big launch day.',
  },
  {
    no: '05',
    name: 'Run',
    line: 'Kept current and improved, one change at a time.',
    detail:
      'After launch we stay accountable for how it runs: monitoring, fixes, and one improvement at a time as the operation changes.',
  },
] as const
