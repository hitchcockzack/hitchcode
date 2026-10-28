'use client'

import { usePathname } from 'next/navigation'

import SiteHeader from '@/components/site/SiteHeader'

// Business cards, the Sanity studio and design-lab studies render their own chrome.
export const BARE_ROUTES = ['/greeting', '/design-lab', '/studio']

export default function ConditionalHeader() {
  const pathname = usePathname()

  if (BARE_ROUTES.some((route) => pathname.startsWith(route))) {
    return null
  }

  return <SiteHeader />
}
