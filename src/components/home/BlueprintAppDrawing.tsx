import styles from './CapabilityChapters.module.css'

const CHECKS = ['Baffles installed at eaves', 'Depth checked: 16 in.', 'Photos: 6 of 6', 'Customer walkthrough signed']

/*
  Chapter 02 drawing: a tool that did not exist, drafted on blueprint before it is built.
  A crew close-out app for job J-2417, with dimensions and the drafter's notes.
*/
export default function BlueprintAppDrawing() {
  return (
    <svg viewBox="0 0 420 470" className={styles.appSvg} role="img" aria-labelledby="app-drawing-title">
      <title id="app-drawing-title">
        Blueprint of a crew close-out app for job J-2417, with a checklist and a close job button
      </title>

      {/* Phone outline and screen */}
      <rect x={110} y={40} width={200} height={400} rx={26} className={styles.bpLine} />
      <rect x={122} y={64} width={176} height={352} rx={6} className={styles.bpFaint} />
      <path d="M190 52 H230" className={styles.bpLine} />

      {/* Header */}
      <text x={134} y={92} className={styles.bpLabel}>
        J-2417 · CLOSE-OUT
      </text>
      <path d="M134 102 H286" className={styles.bpFaint} />

      {/* Checklist */}
      {CHECKS.map((item, i) => {
        const y = 128 + i * 42
        return (
          <g key={item}>
            <rect x={134} y={y} width={14} height={14} className={styles.bpLine} />
            {i < 3 && <path d={`M137 ${y + 7} L141 ${y + 11} L147 ${y + 3}`} className={styles.bpCheck} />}
            <text x={158} y={y + 11} className={styles.bpText}>
              {item}
            </text>
          </g>
        )
      })}

      {/* Photo strip */}
      {Array.from({ length: 3 }, (_, i) => (
        <rect key={i} x={134 + i * 52} y={300} width={44} height={36} className={styles.bpHatch} />
      ))}

      {/* Close job button */}
      <rect x={134} y={360} width={152} height={36} rx={4} className={styles.bpButton} />
      <text x={210} y={383} textAnchor="middle" className={styles.bpButtonText}>
        CLOSE JOB
      </text>

      {/* Dimensions */}
      <path d="M110 456 H310 M110 450 V462 M310 450 V462" className={styles.bpDim} />
      <text x={210} y={468} textAnchor="middle" className={styles.bpDimText}>
        PHONE · ONE HAND · WORKS OFFLINE
      </text>
      <path d="M96 40 V440 M90 40 H102 M90 440 H102" className={styles.bpDim} />

      {/* Drafter's notes with leaders */}
      <path d="M298 150 H336 L352 134" className={styles.bpFaint} />
      <text x={330} y={126} className={styles.bpNote}>
        <tspan x={330}>FROM THE SIGNED</tspan>
        <tspan x={330} dy={12}>ESTIMATE</tspan>
      </text>
      <path d="M286 378 H336 L352 394" className={styles.bpFaint} />
      <text x={330} y={410} className={styles.bpNote}>
        <tspan x={330}>CLOSING DRAFTS</tspan>
        <tspan x={330} dy={12}>THE INVOICE</tspan>
      </text>
      <path d="M134 318 H86 L70 302" className={styles.bpFaint} />
      <text x={14} y={292} className={styles.bpNote}>
        <tspan x={14}>PHOTOS FILE</tspan>
        <tspan x={14} dy={12}>TO THE JOB</tspan>
      </text>
    </svg>
  )
}
