import { Archivo, VT323 } from 'next/font/google'

// Industrial grotesk with a width axis: semi-condensed for the headline (equipment
// nameplates, manuals), normal width for body copy. One family, two voices.
export const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

// Terminal face, used only inside the CRT. It is the screen's material, not site typography.
export const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
  display: 'swap',
})
