import type { MetadataRoute } from 'next'

import { SITE } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Review lab, admin, CMS studio and social-preview debug pages are not for search.
        disallow: [
          '/design-lab',
          '/admin',
          '/studio',
          '/api/',
          '/meta-debug',
          '/facebook-test',
          '/linkedin-test',
          '/twitter-test',
          '/blog/debug-linkedin',
          '/buttons',
        ],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
