import { Space_Grotesk } from 'next/font/google'

// Display face with a computing accent in its letterforms (it descends from Space Mono).
// UI text inside the live console uses Geist, the product face already in the app.
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})
