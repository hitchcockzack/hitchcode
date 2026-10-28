'use client'

import { useEffect, useState } from 'react'

/**
 * False when the visitor prefers reduced motion. Starts true so the server
 * render matches the first client render; CSS media queries cover the gap.
 */
export function useMotionAllowed() {
  const [allowed, setAllowed] = useState(true)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setAllowed(!query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return allowed
}
