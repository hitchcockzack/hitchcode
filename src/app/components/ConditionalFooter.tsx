'use client'

import { usePathname } from 'next/navigation'

import SiteFooter from '@/components/site/SiteFooter'
import { BARE_ROUTES } from './ConditionalHeader'

export default function ConditionalFooter() {
  const pathname = usePathname()

  if (BARE_ROUTES.some((route) => pathname.startsWith(route)) || pathname.startsWith('/admin')) {
    return null
  }

  return <SiteFooter />
}
