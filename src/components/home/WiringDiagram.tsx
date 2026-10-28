'use client'

import { useState } from 'react'

import styles from './CapabilityChapters.module.css'

type Tool = {
  id: string
  label: string
  shares: string
  x: number
  row: 'top' | 'bottom'
}

// Generic tool categories, not named vendors: we connect whatever the company already runs.
const TOOLS: Tool[] = [
  { id: 'crm', label: 'CRM', shares: 'Customer, scope, source', x: 110, row: 'top' },
  { id: 'phones', label: 'Phones', shares: 'Calls, voicemail, recaps', x: 320, row: 'top' },
  { id: 'estimating', label: 'Estimating', shares: 'Signed estimate, line items', x: 530, row: 'top' },
  { id: 'scheduling', label: 'Scheduling', shares: 'Crew, date, changes', x: 110, row: 'bottom' },
  { id: 'inventory', label: 'Inventory', shares: 'Reservations, pick lists', x: 320, row: 'bottom' },
  { id: 'accounting', label: 'Accounting', shares: 'Completion, invoice, payment', x: 530, row: 'bottom' },
]

const BUS_Y = 180
const BLOCK = { w: 120, h: 46 }
const ROW_Y = { top: 48, bottom: 268 }

/*
  Chapter 01 drawing: an electrical-style wiring diagram. Existing tools are terminal
  blocks; one job record is the bus they all land on. Inspecting a tool lights its wire.
*/
export default function WiringDiagram() {
  const [active, setActive] = useState<string | null>(null)
  const activeTool = TOOLS.find((tool) => tool.id === active)

  return (
    <div className={styles.wiring} data-active={active ?? undefined}>
      <svg viewBox="0 0 640 360" className={styles.wiringSvg} aria-hidden="true">
        {/* Bus bar with terminal screws: the job record. */}
        <rect x={60} y={BUS_Y - 9} width={520} height={18} className={styles.bus} />
        {Array.from({ length: 14 }, (_, i) => (
          <circle key={i} cx={78 + i * 37.5} cy={BUS_Y} r={3.2} className={styles.screw} />
        ))}
        <text x={320} y={BUS_Y + 4} textAnchor="middle" className={styles.busLabel}>
          JOB RECORD · J-2417
        </text>

        {TOOLS.map((tool) => {
          const top = tool.row === 'top'
          const blockY = ROW_Y[tool.row]
          const wireStart = top ? blockY + BLOCK.h : blockY
          const wireEnd = top ? BUS_Y - 9 : BUS_Y + 9
          const jogX = tool.x + (top ? 14 : -14)
          const midY = (wireStart + wireEnd) / 2
          return (
            <g key={tool.id} className={styles.circuit} data-on={active === tool.id ? '' : undefined}>
              <path
                d={`M${tool.x} ${wireStart} V${midY - 8} L${jogX} ${midY + 8} V${wireEnd}`}
                className={styles.wire}
              />
              <circle cx={jogX} cy={wireEnd} r={4} className={styles.lug} />
              <rect x={tool.x - BLOCK.w / 2} y={blockY} width={BLOCK.w} height={BLOCK.h} className={styles.block} />
              <circle cx={tool.x - BLOCK.w / 2 + 10} cy={blockY + 10} r={2.5} className={styles.screw} />
              <circle cx={tool.x + BLOCK.w / 2 - 10} cy={blockY + BLOCK.h - 10} r={2.5} className={styles.screw} />
              <text x={tool.x} y={blockY + BLOCK.h / 2 + 5} textAnchor="middle" className={styles.blockLabel}>
                {tool.label}
              </text>
            </g>
          )
        })}
      </svg>

      <ul className={styles.toolList} aria-label="Tools this sample company already runs">
        {TOOLS.map((tool) => (
          <li key={tool.id}>
            <button
              type="button"
              aria-pressed={active === tool.id}
              onMouseEnter={() => setActive(tool.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(tool.id)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(tool.id)}
            >
              {tool.label}
            </button>
          </li>
        ))}
      </ul>
      <p className={styles.wiringReadout} aria-live="polite">
        {activeTool ? (
          <>
            <b>{activeTool.label}</b> writes to the job record: {activeTool.shares}.
          </>
        ) : (
          'Six tools the company already pays for, wired to one record. Select one to see what it shares.'
        )}
      </p>
    </div>
  )
}
