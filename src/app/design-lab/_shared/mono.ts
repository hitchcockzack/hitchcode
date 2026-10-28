import { IBM_Plex_Mono } from 'next/font/google'

// Technical metadata face shared by all three studies (PRD §3 type guidance).
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})
