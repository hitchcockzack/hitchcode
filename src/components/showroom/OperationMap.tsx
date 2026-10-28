'use client'

import { useEffect, useReducer, useRef } from 'react'

import {
  OP_COPY,
  OP_EDGES,
  OP_NODES,
  PROPAGATION_ORDER,
  type OpEdge,
  type OpNodeId,
} from '@/content/demo/connected-operation'
import { SAMPLE_LABEL } from '@/content/demo/job-j2417'
import { useMotionAllowed } from '@/lib/useMotionAllowed'
import { initialOpState, isFullyConnected, isNodeConnected, opReducer } from './operation-map-state'
import WorkOrder from './WorkOrder'
import styles from './OperationMap.module.css'

// Schematic geometry in viewBox units. Nodes are HTML buttons placed by percentage over
// the SVG, so routes, notes and controls stay aligned at every desktop width.
const VB = { w: 1200, h: 420 }
const NODE = { w: 136, h: 92 }
const ROW = { main: 104, branch: 330 }
const POS: Record<OpNodeId, { x: number; y: number }> = {
  lead: { x: 96, y: ROW.main },
  consultation: { x: 298, y: ROW.main },
  estimate: { x: 500, y: ROW.main },
  scheduling: { x: 702, y: ROW.main },
  installation: { x: 904, y: ROW.main },
  invoice: { x: 1106, y: ROW.main },
  inventory: { x: 803, y: ROW.branch },
  followup: { x: 1106, y: ROW.branch },
}

type Anchor = 'start' | 'middle' | 'end'
type EdgeGeometry = {
  d: string
  len: number
  vertical: boolean
  end: { x: number; y: number; dir: 'right' | 'up' | 'down' }
  mid: { x: number; y: number }
  label: { x: number; y: number; anchor: Anchor }
  note?: { x: number; y: number; anchor: Anchor }
}

// Main-row handoffs run between box edges; branches leave from the bottom of a box.
// Flagged handoffs lift their label above the revision cloud.
const mainEdge = (fromX: number, toX: number, flagged = false, labelNudge = 0): EdgeGeometry => {
  const x1 = fromX + NODE.w / 2
  const x2 = toX - NODE.w / 2
  const mid = { x: (x1 + x2) / 2, y: ROW.main }
  return {
    d: `M${x1} ${ROW.main} H${x2}`,
    len: x2 - x1,
    vertical: false,
    end: { x: x2, y: ROW.main, dir: 'right' },
    mid,
    label: { x: mid.x + labelNudge, y: ROW.main - (flagged ? 31 : 14), anchor: 'middle' },
    note: flagged ? { x: mid.x, y: ROW.main + NODE.h / 2 + 30, anchor: 'middle' } : undefined,
  }
}

const mainBottom = ROW.main + NODE.h / 2
const branchTop = ROW.branch - NODE.h / 2
const branchMidY = (mainBottom + ROW.branch) / 2

const EDGE_GEO: Record<string, EdgeGeometry> = {
  'lead-consultation': mainEdge(96, 298, true, 6),
  'consultation-estimate': mainEdge(298, 500),
  'estimate-scheduling': mainEdge(500, 702),
  'scheduling-installation': mainEdge(702, 904),
  'installation-invoice': mainEdge(904, 1106, true),
  'scheduling-inventory': {
    d: `M702 ${mainBottom} V${ROW.branch} H${803 - NODE.w / 2}`,
    len: ROW.branch - mainBottom + (803 - NODE.w / 2 - 702),
    vertical: true,
    end: { x: 803 - NODE.w / 2, y: ROW.branch, dir: 'right' },
    mid: { x: 702, y: branchMidY },
    label: { x: 674, y: branchMidY - 22, anchor: 'end' },
    note: { x: 674, y: branchMidY + 28, anchor: 'end' },
  },
  'inventory-installation': {
    d: `M${803 + NODE.w / 2} ${ROW.branch} H904 V${mainBottom}`,
    len: 904 - (803 + NODE.w / 2) + (ROW.branch - mainBottom),
    vertical: true,
    end: { x: 904, y: mainBottom, dir: 'up' },
    mid: { x: 904, y: branchMidY },
    label: { x: 932, y: branchMidY - 22, anchor: 'start' },
    note: { x: 932, y: branchMidY + 28, anchor: 'start' },
  },
  'invoice-followup': {
    d: `M1106 ${mainBottom} V${branchTop}`,
    len: branchTop - mainBottom,
    vertical: true,
    end: { x: 1106, y: branchTop, dir: 'down' },
    mid: { x: 1106, y: (mainBottom + branchTop) / 2 },
    label: { x: 1118, y: (mainBottom + branchTop) / 2 + 4, anchor: 'start' },
  },
}

const pct = (n: number, of: number) => `${Math.round((n / of) * 10000) / 100}%`

/** Drafting break-line: the handoff exists only as a manual step. */
function breakSymbol({ x, y }: { x: number; y: number }, vertical: boolean) {
  return vertical
    ? `M${x} ${y - 9} L${x - 6} ${y - 3} L${x + 6} ${y + 3} L${x} ${y + 9}`
    : `M${x - 9} ${y} L${x - 3} ${y - 6} L${x + 3} ${y + 6} L${x + 9} ${y}`
}

function arrowHead({ x, y, dir }: EdgeGeometry['end']) {
  if (dir === 'up') return `M${x - 4} ${y + 8} L${x} ${y} L${x + 4} ${y + 8} Z`
  if (dir === 'down') return `M${x - 4} ${y - 8} L${x} ${y} L${x + 4} ${y - 8} Z`
  return `M${x - 8} ${y - 4} L${x} ${y} L${x - 8} ${y + 4} Z`
}

/** Small revision cloud drawn around the stalled handoff. */
function cloud({ x, y }: { x: number; y: number }, vertical: boolean) {
  const [rx, ry] = vertical ? [20, 32] : [32, 21]
  const bumps = 9
  let d = ''
  for (let i = 0; i <= bumps; i += 1) {
    const a = (i / bumps) * Math.PI * 2
    const px = Math.round((x + Math.cos(a) * rx) * 10) / 10
    const py = Math.round((y + Math.sin(a) * ry) * 10) / 10
    d += i === 0 ? `M${px} ${py}` : ` A7 7 0 0 1 ${px} ${py}`
  }
  return `${d}Z`
}

const incomingEdges = (id: OpNodeId) => OP_EDGES.filter((edge) => edge.to === id)
const edgeIndex = (edge: OpEdge) => PROPAGATION_ORDER.indexOf(edge.to)

export default function OperationMap() {
  const motionAllowed = useMotionAllowed()
  const [state, dispatch] = useReducer(opReducer, undefined, () => initialOpState('scheduling'))
  const nodeRefs = useRef<Partial<Record<OpNodeId, HTMLButtonElement | null>>>({})
  const connected = state.mode === 'connected'
  const complete = isFullyConnected(state, PROPAGATION_ORDER)

  // Status propagates one department at a time after the routes are drawn.
  useEffect(() => {
    if (!connected || complete) return
    if (!motionAllowed) {
      dispatch({ type: 'complete', order: PROPAGATION_ORDER })
      return
    }
    const delay = state.propagated === 0 ? 650 : 320
    const timer = window.setTimeout(() => dispatch({ type: 'step', order: PROPAGATION_ORDER }), delay)
    return () => window.clearTimeout(timer)
  }, [connected, complete, motionAllowed, state.propagated])

  const selected = OP_NODES.find((node) => node.id === state.selected) ?? OP_NODES[0]
  const selectedLive = isNodeConnected(state, selected.id, PROPAGATION_ORDER)

  const onNodeKey = (e: React.KeyboardEvent) => {
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    let target: OpNodeId | null = null
    if (delta) {
      const i = PROPAGATION_ORDER.indexOf(state.selected)
      target = PROPAGATION_ORDER[(i + delta + PROPAGATION_ORDER.length) % PROPAGATION_ORDER.length]
    }
    if (e.key === 'Home') target = PROPAGATION_ORDER[0]
    if (e.key === 'End') target = PROPAGATION_ORDER[PROPAGATION_ORDER.length - 1]
    if (!target) return
    e.preventDefault()
    dispatch({ type: 'select', id: target })
    nodeRefs.current[target]?.focus()
  }

  const stampText = complete ? 'Invoice in review' : 'Invoice not sent'

  return (
    <figure className={styles.exhibit} data-mode={state.mode} data-complete={complete ? '' : undefined}>
      <div className={styles.head}>
        <div>
          <p className={styles.kicker}>03 · The connected operation</p>
          <h2 className={styles.title}>Watch one job cross the company.</h2>
        </div>
        <div className={styles.controls}>
          <div className={styles.toggle} role="group" aria-label="Show the operation">
            <button type="button" aria-pressed={!connected} onClick={() => dispatch({ type: 'disconnect' })}>
              As it runs today
            </button>
            <button type="button" aria-pressed={connected} onClick={() => dispatch({ type: 'connect' })}>
              Connected
            </button>
          </div>
          <p className={styles.sample}>{SAMPLE_LABEL}</p>
        </div>
      </div>

      <div className={styles.schematic}>
        <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className={styles.routes} aria-hidden="true">
          {OP_EDGES.map((edge) => {
            const geo = EDGE_GEO[edge.id]
            return (
              <g key={edge.id} className={styles.edge} data-issue={edge.today.issue ? '' : undefined}>
                <path d={geo.d} className={styles.handoff} />
                <rect
                  x={geo.mid.x - 11}
                  y={geo.mid.y - 11}
                  width={22}
                  height={22}
                  className={styles.breakGap}
                />
                <path d={breakSymbol(geo.mid, geo.vertical)} className={styles.breakLine} />
                <text x={geo.label.x} y={geo.label.y} textAnchor={geo.label.anchor} className={styles.method}>
                  {edge.today.method}
                </text>
                {edge.today.issue && (
                  <>
                    <path d={cloud(geo.mid, geo.vertical)} className={styles.cloud} />
                    {geo.note && (
                      <text x={geo.note.x} y={geo.note.y} textAnchor={geo.note.anchor} className={styles.issueNote}>
                        <tspan className={styles.delta}>△{edge.today.delta}</tspan> {edge.today.note}
                      </text>
                    )}
                  </>
                )}
                <path
                  d={geo.d}
                  className={styles.route}
                  style={{ '--len': geo.len, '--i': edgeIndex(edge) } as React.CSSProperties}
                />
                <path
                  d={arrowHead(geo.end)}
                  className={styles.arrow}
                  style={{ '--i': edgeIndex(edge) } as React.CSSProperties}
                />
              </g>
            )
          })}
        </svg>

        <ol className={styles.nodes} aria-label="Departments the sample job passes through">
          {OP_NODES.map((node) => {
            const pos = POS[node.id]
            const live = isNodeConnected(state, node.id, PROPAGATION_ORDER)
            const isSelected = node.id === state.selected
            const incoming = incomingEdges(node.id)
            return (
              <li
                key={node.id}
                className={styles.nodeItem}
                data-branch={node.branch ? '' : undefined}
                style={
                  {
                    '--x': pct(pos.x - NODE.w / 2, VB.w),
                    '--y': pct(pos.y - NODE.h / 2, VB.h),
                    '--w': pct(NODE.w, VB.w),
                    '--h': pct(NODE.h, VB.h),
                  } as React.CSSProperties
                }
              >
                {incoming.length > 0 && (
                  <p className={styles.inline}>
                    {incoming.map((edge) => (
                      <span key={edge.id} data-issue={edge.today.issue && !connected ? '' : undefined}>
                        {connected ? `Receives: ${edge.connected.carries}` : `${edge.today.method}: ${edge.today.note}`}
                      </span>
                    ))}
                  </p>
                )}
                {node.id === 'lead' && <span className={styles.ghost} aria-hidden="true" />}
                <button
                  ref={(el) => {
                    nodeRefs.current[node.id] = el
                  }}
                  type="button"
                  className={styles.node}
                  aria-pressed={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  data-live={live ? '' : undefined}
                  data-issue={!connected && node.today.issue ? '' : undefined}
                  onClick={() => dispatch({ type: 'select', id: node.id })}
                  onKeyDown={onNodeKey}
                >
                  <span className={styles.dept}>{node.department}</span>
                  <span className={styles.nodeLabel}>{node.label}</span>
                  <span className={styles.status}>
                    <span className={styles.statusMark} aria-hidden="true" />
                    {live ? node.connected.status : node.today.status}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        <WorkOrder
          className={styles.workOrder}
          stamp={stampText}
          tone={complete ? 'settled' : 'alert'}
          status={complete ? 'Job closed · invoice drafted' : 'Job closed Mon 15:12'}
        />
      </div>

      <div className={styles.foot}>
        <div className={styles.copy} aria-live="polite">
          <p className={styles.copyTitle}>{connected ? OP_COPY.connected.title : OP_COPY.today.title}</p>
          <p className={styles.copyBody}>{connected ? OP_COPY.connected.body : OP_COPY.today.body}</p>
          {connected && (
            <ul className={styles.outcomes}>
              {OP_COPY.outcomes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}
        </div>

        <section className={styles.inspector} aria-label="Inspect a department" aria-live="polite">
          <p className={styles.inspectHead}>
            <span>{selected.department}</span>
            <strong>{selected.label}</strong>
            <span className={styles.inspectMode}>{selectedLive ? 'Connected' : 'Today'}</span>
          </p>
          <dl className={styles.table}>
            <div>
              <dt>In</dt>
              <dd>{selectedLive ? selected.connected.input : selected.today.input}</dd>
            </div>
            <div>
              <dt>Does</dt>
              <dd>{selectedLive ? selected.connected.action : selected.today.action}</dd>
            </div>
            <div>
              <dt>Out</dt>
              <dd>{selectedLive ? selected.connected.output : selected.today.output}</dd>
            </div>
            <div data-emphasis="">
              <dt>{selectedLive ? 'Why connected' : 'Where it stalls'}</dt>
              <dd>{selectedLive ? selected.connected.why : selected.today.stall}</dd>
            </div>
          </dl>
          <p className={styles.hint}>Select a department, or use the arrow keys, to inspect it.</p>
        </section>
      </div>

      <figcaption className={styles.strip}>
        <span>Sheet 003 · The connected operation · Job J-2417 · Scale NTS</span>
        <span className={styles.legend}>
          <i className={styles.legendBroken} aria-hidden="true" /> Manual handoff
          <i className={styles.legendRoute} aria-hidden="true" /> Connected
          <i className={styles.legendIssue} aria-hidden="true" /> Where it stalls
        </span>
      </figcaption>
    </figure>
  )
}
