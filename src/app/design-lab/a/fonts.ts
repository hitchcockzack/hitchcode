import { Doto, Instrument_Sans, Newsreader } from 'next/font/google'

// Editorial display serif: reads as an established practice, and the optical-size
// axis keeps it sharp from 20px wordmark to 116px headline.
export const newsreader = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-newsreader',
  display: 'swap',
})

export const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

// Dot-matrix face, used only for the printed work order (the study's one retro object).
export const doto = Doto({
  subsets: ['latin'],
  axes: ['ROND'],
  variable: '--font-doto',
  display: 'swap',
})
