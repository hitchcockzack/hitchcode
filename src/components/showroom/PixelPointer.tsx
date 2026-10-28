// Classic 1-bit arrow pointer drawn from a pixel map: a small computing accent
// that shows where to drag, and disappears once the visitor takes over.
const POINTER = [
  'X...........',
  'XX..........',
  'XoX.........',
  'XooX........',
  'XoooX.......',
  'XooooX......',
  'XoooooX.....',
  'XooooooX....',
  'XoooooooX...',
  'XooooooooX..',
  'XoooooXXXXX.',
  'XooXooX.....',
  'XoX.XooX....',
  'XX..XooX....',
  'X....XooX...',
  '.....XooX...',
  '......XX....',
]

export default function PixelPointer({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 17" width="18" height="25.5" className={className} aria-hidden="true" shapeRendering="crispEdges">
      {POINTER.flatMap((row, y) =>
        row.split('').map((cell, x) =>
          cell === '.' ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={cell === 'X' ? '#101413' : '#f7f6f1'} />
          ),
        ),
      )}
    </svg>
  )
}
