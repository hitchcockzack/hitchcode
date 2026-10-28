'use client'

import { useState } from 'react'

import { DEPARTMENT_LAYERS, type DepartmentLayer } from '@/content/demo/department-layers'
import { SAMPLE_JOB, SAMPLE_LABEL } from '@/content/demo/job-j2417'
import { iso, planeMatrix, pts, round, type Pt } from '@/lib/iso'
import { useMotionAllowed } from '@/lib/useMotionAllowed'
import styles from './HeroAtelier.module.css'

type LayerId = DepartmentLayer['id']

// Drawing geometry, in viewBox units. Four W × D department plates stacked GAP apart.
const W = 240
const D = 150
const T = 8
const GAP = 124
const OX = 150
const OY = 470
const VB = { x: 0, y: 86, w: 394, h: 594 }
// Where the job pierces every plate. Chosen so each node sits in front of the plate above it.
const THREAD = { u: 120, v: 75 }

const Z: Record<LayerId, number> = { sales: GAP * 3, office: GAP * 2, field: GAP, books: 0 }

const P = (u: number, v: number, z: number) => iso(u, v, z, OX, OY)
const plateTop = (z: number) => pts([P(0, 0, z), P(W, 0, z), P(W, D, z), P(0, D, z)])
const plateSideV = (z: number) => pts([P(0, D, z), P(W, D, z), P(W, D, z - T), P(0, D, z - T)])
const plateSideU = (z: number) => pts([P(W, 0, z), P(W, D, z), P(W, D, z - T), P(W, 0, z - T)])
const node = (z: number) => P(THREAD.u, THREAD.v, z)
// Front edge of a plate directly below the thread, including plate thickness.
const frontEdgeY = (z: number) => P(THREAD.u - THREAD.v + D, D, z)[1] + T
const rightVertex = (z: number) => P(W, 0, z)

const noteTop = (id: LayerId) => `${round(((rightVertex(Z[id])[1] - VB.y) / VB.h) * 100)}%`

function extend(a: Pt, b: Pt, by: number): [Pt, Pt] {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const len = Math.hypot(dx, dy)
  const ux = (dx / len) * by
  const uy = (dy / len) * by
  return [
    [round(a[0] - ux), round(a[1] - uy)],
    [round(b[0] + ux), round(b[1] + uy)],
  ]
}

/** Revision cloud: clockwise scalloped outline, the drafting mark for "changed here". */
function cloudPath(x0: number, y0: number, x1: number, y1: number, bump: number) {
  const corners: Pt[] = [
    [x0, y0],
    [x1, y0],
    [x1, y1],
    [x0, y1],
    [x0, y0],
  ]
  let d = `M${x0} ${y0}`
  for (let i = 0; i < 4; i += 1) {
    const [ax, ay] = corners[i]
    const [bx, by] = corners[i + 1]
    const len = Math.hypot(bx - ax, by - ay)
    const n = Math.max(2, Math.round(len / bump))
    const r = round((len / n) * 0.62)
    for (let k = 1; k <= n; k += 1) {
      d += ` A${r} ${r} 0 0 1 ${round(ax + ((bx - ax) * k) / n)} ${round(ay + ((by - ay) * k) / n)}`
    }
  }
  return `${d}Z`
}

const booksCorners: Pt[] = [P(0, 0, 0), P(W, 0, 0), P(W, D, 0), P(0, D, 0)]
const constructionLines = booksCorners.map((corner, i) => extend(corner, booksCorners[(i + 1) % 4], 14))

const threadX = node(Z.sales)[0]

/** The hero drawing sheet: exploded job J-2417, notes column, title strip and work order. */
export default function HeroSheet() {
  const [active, setActive] = useState<LayerId | null>(null)
  const [motionChoice, setMotionChoice] = useState<boolean | null>(null)
  const motionAllowed = useMotionAllowed()
  const motionOn = motionChoice ?? motionAllowed

  const layerProps = (id: LayerId) => ({
    className: styles.layer,
    'data-on': active === id ? '' : undefined,
  })

  return (
    <div className={styles.stage} data-motion={motionOn ? 'on' : 'off'}>
      <aside className={styles.ticketWrap} aria-label="Sample work order, concept demonstration">
        <div className={styles.ticket}>
          <p className={styles.dotLine}>
            <span>Work order</span>
            <span>{SAMPLE_JOB.id}</span>
          </p>
          <p className={styles.dotLine}>
            <span>Attic insulation + air sealing</span>
          </p>
          <p className={styles.dotLine}>
            <span>{SAMPLE_JOB.site}</span>
            <span>{SAMPLE_JOB.crew}</span>
          </p>
          <p className={styles.dotLine}>
            <span>Mon 11/3 07:30</span>
            <span>62 bags R-49</span>
          </p>
          <p className={styles.dotLine}>
            <span>Job closed Mon 15:12</span>
          </p>
          <p className={styles.stamp}>Invoice not sent</p>
        </div>
      </aside>

      <figure id="sheet" className={styles.sheet}>
        <div className={styles.zonesBottom} aria-hidden="true">
          {['1', '2', '3', '4', '5', '6'].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
        <div className={styles.zonesLeft} aria-hidden="true">
          {['A', 'B', 'C', 'D'].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>

        <div className={styles.field}>
          <div className={styles.drawing} data-active={active ?? undefined}>
            <svg
              viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
              className={styles.axo}
              role="img"
              aria-labelledby="axo-title axo-desc"
            >
              <title id="axo-title">{`Job ${SAMPLE_JOB.id} drawn through four departments`}</title>
              <desc id="axo-desc">
                Sales, office and field plates are built and connected by the job thread. The books plate is
                still a planned connection: the invoice waits on paperwork.
              </desc>
              <defs>
                <pattern id="atelier-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="4" className={styles.hatchLine} />
                </pattern>
              </defs>

              {/* 04 Books: planned. Construction lines only, no plate. */}
              <g {...layerProps('books')}>
                {constructionLines.map(([a, b], i) => (
                  <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={styles.construction} />
                ))}
                <polygon points={plateTop(Z.books)} className={styles.plannedPlate} />
                <g transform={planeMatrix(OX, OY, Z.books)}>
                  <rect x={92} y={44} width={78} height={80} className={styles.plannedShape} />
                  <path d="M100 56 H132 M100 70 H140 M100 80 H136 M100 90 H138 M140 108 H162" className={styles.plannedShape} />
                  <rect x={182} y={48} width={54} height={70} className={styles.plannedShape} />
                  <path d="M182 62 H236 M182 76 H236 M182 90 H236 M182 104 H236" className={styles.plannedShape} />
                  <path d={cloudPath(82, 34, 180, 134, 11)} className={styles.cloud} />
                  <path d="M190 124 L199 140 L181 140 Z" className={styles.delta} />
                  <text x={187.2} y={137.6} className={styles.deltaText}>
                    1
                  </text>
                  <circle cx={THREAD.u} cy={THREAD.v} r={8} className={styles.plannedNode} />
                  <text x={10} y={144} className={styles.planeLabel}>
                    BOOKS · PLANNED
                  </text>
                </g>
              </g>

              <line x1={threadX} y1={node(Z.field)[1]} x2={threadX} y2={node(Z.books)[1]} className={styles.threadPlanned} />

              {/* 03 Field */}
              <g {...layerProps('field')}>
                <polygon points={plateSideV(Z.field)} className={styles.sideLight} />
                <polygon points={plateSideU(Z.field)} className={styles.sideDark} />
                <polygon points={plateTop(Z.field)} className={styles.plate} />
                <g transform={planeMatrix(OX, OY, Z.field)}>
                  <rect x={18} y={98} width={64} height={40} className={styles.shape} />
                  <rect x={26} y={106} width={12} height={12} className={styles.hatched} />
                  <rect x={42} y={106} width={12} height={12} className={styles.hatched} />
                  <rect x={58} y={106} width={12} height={12} className={styles.dashedShape} />
                  <rect x={96} y={62} width={64} height={28} className={styles.paper} />
                  <rect x={160} y={65} width={16} height={22} className={styles.paper} />
                  <rect x={132} y={67} width={10} height={9} className={styles.hatched} />
                  <rect x={145} y={67} width={10} height={9} className={styles.hatched} />
                  <rect x={132} y={78} width={10} height={9} className={styles.hatched} />
                  <path d="M176 76 H214 V98" className={styles.route} />
                  <rect x={192} y={98} width={44} height={44} className={styles.paper} />
                  <path d="M192 98 L206 120 H222 L236 98 M192 142 L206 120 M222 120 L236 142" className={styles.shape} />
                  <circle cx={THREAD.u} cy={THREAD.v} r={8} className={styles.nodeRing} />
                  <circle cx={THREAD.u} cy={THREAD.v} r={2.6} className={styles.nodeDot} />
                  <text x={10} y={144} className={styles.planeLabel}>
                    FIELD
                  </text>
                </g>
              </g>

              <line x1={threadX} y1={node(Z.office)[1]} x2={threadX} y2={node(Z.field)[1]} className={styles.thread} />
              <line x1={threadX} y1={node(Z.office)[1]} x2={threadX} y2={node(Z.field)[1]} className={`${styles.pulse} ${styles.pulse2}`} />

              {/* 02 Office */}
              <g {...layerProps('office')}>
                <polygon points={plateSideV(Z.office)} className={styles.sideLight} />
                <polygon points={plateSideU(Z.office)} className={styles.sideDark} />
                <polygon points={plateTop(Z.office)} className={styles.plate} />
                <g transform={planeMatrix(OX, OY, Z.office)}>
                  <rect x={92} y={44} width={78} height={80} className={styles.paper} />
                  <path d="M100 54 H140" className={styles.heavy} />
                  <path d="M100 68 H136 M100 78 H132 M100 88 H138 M100 98 H128 M150 68 H162 M150 78 H162 M150 88 H162 M150 98 H162" className={styles.shape} />
                  <path d="M140 110 H162 M140 113 H162" className={styles.shape} />
                  <path d="M170 93 H180 M176 90 L180 93 L176 96" className={styles.shape} />
                  <rect x={182} y={48} width={54} height={92} className={styles.paper} />
                  <path d="M200 48 V140 M218 48 V140 M182 66 H236 M182 84 H236 M182 102 H236 M182 120 H236" className={styles.shape} />
                  <rect x={182} y={84} width={18} height={18} className={styles.signalFill} />
                  <circle cx={THREAD.u} cy={THREAD.v} r={8} className={styles.nodeRing} />
                  <circle cx={THREAD.u} cy={THREAD.v} r={2.6} className={styles.nodeDot} />
                  <text x={10} y={144} className={styles.planeLabel}>
                    OFFICE
                  </text>
                </g>
              </g>

              <line x1={threadX} y1={node(Z.sales)[1]} x2={threadX} y2={node(Z.office)[1]} className={styles.thread} />
              <line x1={threadX} y1={node(Z.sales)[1]} x2={threadX} y2={node(Z.office)[1]} className={`${styles.pulse} ${styles.pulse1}`} />

              {/* 01 Sales */}
              <g {...layerProps('sales')}>
                <polygon points={plateSideV(Z.sales)} className={styles.sideLight} />
                <polygon points={plateSideU(Z.sales)} className={styles.sideDark} />
                <polygon points={plateTop(Z.sales)} className={styles.plate} />
                <g transform={planeMatrix(OX, OY, Z.sales)}>
                  <rect x={18} y={84} width={34} height={22} className={styles.paper} />
                  <path d="M18 84 L35 97 L52 84" className={styles.shape} />
                  <rect x={24} y={114} width={22} height={26} className={styles.paper} />
                  <path d="M28 120 H42 M28 126 H42 M28 132 H38" className={styles.shape} />
                  <path d="M52 94 L92 80 M46 124 L92 98" className={styles.route} />
                  <rect x={92} y={52} width={96} height={56} className={styles.paper} />
                  <rect x={92} y={52} width={96} height={10} className={styles.inkFill} />
                  <path d="M134 74 H180 M134 84 H172 M134 94 H164" className={styles.shape} />
                  <rect x={198} y={16} width={36} height={44} className={styles.paper} />
                  <path d="M198 27 H234 M198 38 H234 M198 49 H234 M210 16 V60 M222 16 V60" className={styles.shape} />
                  <rect x={210} y={38} width={12} height={11} className={styles.inkFill} />
                  <circle cx={THREAD.u} cy={THREAD.v} r={8} className={styles.nodeRing} />
                  <circle cx={THREAD.u} cy={THREAD.v} r={2.6} className={styles.nodeDot} />
                  <text x={10} y={144} className={styles.planeLabel}>
                    SALES
                  </text>
                </g>
              </g>

              {/* Hidden-line convention: the thread continues under each plate. */}
              {(['sales', 'office', 'field'] as const).map((id) => (
                <line
                  key={id}
                  x1={threadX}
                  y1={node(Z[id])[1] + 9}
                  x2={threadX}
                  y2={frontEdgeY(Z[id])}
                  className={styles.hiddenLine}
                />
              ))}

              {DEPARTMENT_LAYERS.map((layer) => {
                const [x, y] = rightVertex(Z[layer.id])
                return (
                  <g key={layer.id} className={styles.leader}>
                    <circle cx={x + 6} cy={y} r={1.6} />
                    <line x1={x + 6} y1={y} x2={VB.w} y2={y} />
                  </g>
                )
              })}
            </svg>

            <ol className={styles.notes}>
              {DEPARTMENT_LAYERS.map((layer) => (
                <li
                  key={layer.id}
                  className={styles.note}
                  style={{ '--y': noteTop(layer.id) } as React.CSSProperties}
                  data-on={active === layer.id ? '' : undefined}
                  data-planned={layer.planned ? '' : undefined}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(layer.id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(layer.id)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(layer.id)}
                  >
                    <span className={styles.noteNo}>
                      {layer.n} · {layer.name}
                      {layer.planned ? ' · planned' : ''}
                    </span>
                    <span className={styles.noteLine}>{layer.line}</span>
                    <span className={styles.noteDetail}>
                      <span>
                        <b>In</b> {layer.input}
                      </span>
                      <span>
                        <b>Does</b> {layer.action}
                      </span>
                      <span>
                        <b>Out</b> {layer.output}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <figcaption className={styles.strip}>
          <span className={styles.stripBrand}>
            <b>Hitchcode</b> Operations engineering
          </span>
          <span className={styles.stripStudy}>System study 001 · Sheet SS-001 · Scale NTS</span>
          <span className={styles.legend}>
            <i className={styles.legendBuilt} aria-hidden="true" /> Built
            <i className={styles.legendPlanned} aria-hidden="true" /> Planned
          </span>
          <span className={styles.sampleCell}>{SAMPLE_LABEL}</span>
          <button
            type="button"
            className={styles.motionToggle}
            aria-pressed={!motionOn}
            onClick={() => setMotionChoice(!motionOn)}
          >
            {motionOn ? 'Pause motion' : 'Play motion'}
          </button>
        </figcaption>
      </figure>
    </div>
  )
}
