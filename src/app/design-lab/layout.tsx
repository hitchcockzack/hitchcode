import type { Metadata } from 'next'

import './lab.css'
import LabNav from './_shared/LabNav'

export const metadata: Metadata = {
  title: 'Design Lab · Hitchcode',
  description: 'Gate 2 hero explorations for the Hitchcode redesign. Not part of the public site.',
  robots: { index: false, follow: false },
}

export default function DesignLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-lab>
      {children}
      <LabNav />
    </div>
  )
}
