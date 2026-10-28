import { Doto, IBM_Plex_Mono, Instrument_Sans, Newsreader, VT323 } from 'next/font/google'

// Direction A type system: two principal families plus mono (PRD §3), and two
// artifact faces that only ever appear inside a printed or on-screen object.

export const fontDisplay = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-newsreader',
  display: 'swap',
})

export const fontText = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

export const fontAnnotation = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})

/** Dot-matrix printing: work orders and tickets only. */
export const fontPrinted = Doto({
  subsets: ['latin'],
  axes: ['ROND'],
  variable: '--font-doto',
  display: 'swap',
})

/** Phosphor terminal: the managed-outputs screen only. */
export const fontTerminal = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
  display: 'swap',
})

// .hc-type re-declares the family tokens on the same element as the font variables
// (see design-tokens.css), so var(--font-display) resolves inside the subtree.
export const systemFontVariables = [
  'hc-type',
  ...[fontDisplay, fontText, fontAnnotation, fontPrinted].map((font) => font.variable),
].join(' ')
