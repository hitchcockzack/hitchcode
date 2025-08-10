'use client'

import { NextStudioNoScript } from 'next-sanity/studio'
import {Studio} from 'sanity'
import config from '../../../../sanity.config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hitchcode Blog Studio',
  description: 'Content management for the Hitchcode blog',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <NextStudioNoScript />
      </head>
      <body>{children}</body>
    </html>
  )
}
