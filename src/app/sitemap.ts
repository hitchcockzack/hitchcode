import type { MetadataRoute } from 'next'

import { SITE } from '@/content/site'

const ROUTES = [
  { path: '/', priority: 1 },
  { path: '/capabilities', priority: 0.9 },
  { path: '/solutions', priority: 0.9 },
  { path: '/work', priority: 0.8 },
  { path: '/work/ageverified-lax', priority: 0.7 },
  { path: '/about', priority: 0.7 },
  { path: '/contact', priority: 0.8 },
  { path: '/blog', priority: 0.5 },
  { path: '/demos', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map((route) => ({
    url: `${SITE.url}${route.path === '/' ? '' : route.path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route.priority,
  }))
}
