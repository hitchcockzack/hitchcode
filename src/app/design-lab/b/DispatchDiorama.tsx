import { gableRoof, iso, isoBox, planeMatrix, pts, round } from '../_shared/iso'
import styles from './control-room.module.css'

// Low-poly yard: warehouse, office, road, job site. Flat-shaded, three tones per object,
// lit from the upper left. Purely presentational; ControlConsole owns all state.
const OX = 200
const OY = 60
const P = (u: number, v: number, z: number) => iso(u, v, z, OX, OY)

const plate = isoBox(0, 0, 300, 200, 12, OX, OY, -12)
const warehouse = isoBox(20, 20, 100, 76, 54, OX, OY)
const warehouseRoof = gableRoof(20, 20, 100, 76, 54, 16, OX, OY)
const office = isoBox(134, 22, 44, 40, 36, OX, OY)
const officeUnit = isoBox(150, 30, 12, 10, 6, OX, OY, 36)
const house = isoBox(214, 120, 60, 56, 34, OX, OY)
const houseRoof = gableRoof(214, 120, 60, 56, 34, 18, OX, OY)
const pallets = [isoBox(96, 102, 10, 10, 9, OX, OY), isoBox(108, 102, 10, 10, 9, OX, OY), isoBox(96, 114, 10, 10, 9, OX, OY)]

const face = (corners: [number, number, number][]) => pts(corners.map(([u, v, z]) => P(u, v, z)))

const warehouseDoor = face([
  [46, 96, 0],
  [84, 96, 0],
  [84, 96, 34],
  [46, 96, 34],
])
const doorSlats = [8, 16, 24]
  .map((z) => {
    const [a, b] = [P(46, 96, z), P(84, 96, z)]
    return `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`
  })
  .join(' ')
const officeWindow = face([
  [140, 62, 16],
  [172, 62, 16],
  [172, 62, 27],
  [140, 62, 27],
])
const houseDoor = face([
  [224, 176, 0],
  [234, 176, 0],
  [234, 176, 20],
  [224, 176, 20],
])
const houseWindow = face([
  [244, 176, 12],
  [262, 176, 12],
  [262, 176, 24],
  [244, 176, 24],
])
const houseSideWindow = face([
  [274, 134, 12],
  [274, 152, 12],
  [274, 152, 24],
  [274, 134, 24],
])

function tree(u: number, v: number, r: number, h: number) {
  const apex = P(u, v, h + 6)
  return {
    left: pts([apex, P(u - r, v + r, 6), P(u + r, v + r, 6)]),
    right: pts([apex, P(u + r, v - r, 6), P(u + r, v + r, 6)]),
    trunk: isoBox(u - 1.5, v - 1.5, 3, 3, 6, OX, OY),
  }
}
const backTree = tree(288, 104, 9, 30)
const frontTree = tree(194, 188, 8, 24)

// Van drawn once at the origin, then translated along the route in screen space.
const VAN = {
  u: { body: isoBox(0, 0, 34, 18, 18, OX, OY), cab: isoBox(34, 1, 12, 16, 13, OX, OY) },
  v: { body: isoBox(0, 0, 18, 34, 18, OX, OY), cab: isoBox(1, 34, 16, 12, 13, OX, OY) },
}
const VAN_GLASS = {
  u: face([
    [46, 4, 7],
    [46, 14, 7],
    [46, 14, 12],
    [46, 4, 12],
  ]),
  v: face([
    [4, 46, 7],
    [14, 46, 7],
    [14, 46, 12],
    [4, 46, 12],
  ]),
}

/** Route from the warehouse door to the job site. p: 0 = docked, 1 = on site. */
export function vanPose(p: number) {
  if (p < 0.3) return { u0: 61, v0: round(98 + (p / 0.3) * 26), heading: 'v' as const }
  return { u0: round(61 + ((p - 0.3) / 0.7) * 101), v0: 149, heading: 'u' as const }
}

const housePin = P(244, 148, 64)
const officePin = P(156, 42, 58)

type Props = {
  vanP: number
  palletsLoaded: boolean
  officeLit: boolean
  jobDone: boolean
  review: boolean
}

export default function DispatchDiorama({ vanP, palletsLoaded, officeLit, jobDone, review }: Props) {
  const pose = vanPose(vanP)
  const dx = round((pose.u0 - pose.v0) * (Math.sqrt(3) / 2))
  const dy = round((pose.u0 + pose.v0) / 2)
  const van = VAN[pose.heading]

  return (
    <svg
      viewBox="20 6 450 326"
      className={styles.diorama}
      role="img"
      aria-label="Sample yard: warehouse, office and a job site. The van leaves when the job is scheduled and the site is marked done when the crew closes the job."
    >
      <g className={styles.plateShadow}>
        <polygon points={plate.left} fill="#a29d8f" />
        <polygon points={plate.right} fill="#868173" />
        <polygon points={plate.top} fill="#c8c3b5" />
      </g>

      <g transform={planeMatrix(OX, OY, 0)}>
        <path d="M54 98 H86 V146 H208 V172 H54 Z" fill="#3a403f" />
        <path d="M70 104 V140 M94 159 H200" className={styles.roadLine} />
        <path d="M30 100 H44 M30 108 H44 M30 116 H44" className={styles.lotLine} />
      </g>

      <polygon points={warehouse.left} fill="#dcd8cc" />
      <polygon points={warehouse.right} fill="#b6b1a4" />
      <polygon points={warehouseDoor} fill="#2c3231" />
      <path d={doorSlats} className={styles.slats} />
      <polygon points={warehouseRoof.back} fill="#59605e" />
      <polygon points={warehouseRoof.gable} fill="#b6b1a4" />
      <polygon points={warehouseRoof.front} fill="#474e4c" />

      <polygon points={office.top} fill="#e6e2d6" />
      <polygon points={office.left} fill="#d1ccbf" />
      <polygon points={office.right} fill="#aba699" />
      <polygon points={officeWindow} className={officeLit ? styles.windowLit : styles.windowDark} />
      <polygon points={officeUnit.top} fill="#c9c4b7" />
      <polygon points={officeUnit.left} fill="#b2ad9f" />
      <polygon points={officeUnit.right} fill="#959083" />

      <polygon points={backTree.trunk.left} fill="#6b5f50" />
      <polygon points={backTree.left} fill="#7f8a81" />
      <polygon points={backTree.right} fill="#5f6a62" />

      {!palletsLoaded &&
        pallets.map((box, i) => (
          <g key={i}>
            <polygon points={box.top} fill="#f1eee5" />
            <polygon points={box.left} fill="#d5d0c3" />
            <polygon points={box.right} fill="#b5b0a3" />
          </g>
        ))}

      <g transform={`translate(${dx} ${dy})`} className={styles.van}>
        <polygon points={van.body.top} fill="#f39a73" />
        <polygon points={van.body.left} fill="#ef875c" />
        <polygon points={van.body.right} fill="#c9673e" />
        <polygon points={van.cab.top} fill="#f6ad8c" />
        <polygon points={van.cab.left} fill="#e47b50" />
        <polygon points={van.cab.right} fill="#bb5f39" />
        <polygon points={VAN_GLASS[pose.heading]} fill="#1d2423" />
      </g>

      <polygon points={house.left} fill="#ece8dd" />
      <polygon points={house.right} fill="#c8c3b6" />
      <polygon points={houseDoor} fill="#2c3231" />
      <polygon points={houseWindow} fill="#2c3231" />
      <polygon points={houseSideWindow} fill="#2c3231" />
      <polygon points={houseRoof.back} fill="#1c3d59" />
      <polygon points={houseRoof.gable} fill="#c8c3b6" />
      <polygon points={houseRoof.front} fill="#244d70" />

      <polygon points={frontTree.trunk.left} fill="#6b5f50" />
      <polygon points={frontTree.left} fill="#7f8a81" />
      <polygon points={frontTree.right} fill="#5f6a62" />

      {jobDone && (
        <g className={styles.pin} transform={`translate(${housePin[0]} ${housePin[1]})`}>
          <line x1={0} y1={0} x2={0} y2={30} />
          <rect x={-26} y={-15} width={52} height={15} />
          <text x={0} y={-4.5} textAnchor="middle">
            DONE
          </text>
        </g>
      )}
      {review && (
        <g className={`${styles.pin} ${styles.pinReview}`} transform={`translate(${officePin[0]} ${officePin[1]})`}>
          <line x1={0} y1={0} x2={0} y2={22} />
          <rect x={-30} y={-15} width={60} height={15} />
          <text x={0} y={-4.5} textAnchor="middle">
            REVIEW
          </text>
        </g>
      )}
    </svg>
  )
}
