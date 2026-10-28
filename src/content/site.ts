// Site-wide facts and navigation. Every factual statement used on the public site is
// listed with its source in docs/redesign/content-claims.md.

export const SITE = {
  name: 'Hitchcode',
  tagline: 'Operations engineering for established businesses',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hitchcode.net',
  description:
    'We connect the software, workflows, and equipment behind established companies, and build what is missing. Less work between teams. More control over the operation.',
  founder: 'Zack Hitchcock',
  email: 'hitchcockzack@gmail.com',
  phone: '+1 (617) 586-5962',
  phoneHref: 'tel:+16175865962',
  linkedin: 'https://www.linkedin.com/in/zack-hitchcock-17841a219/',
  ogImage: '/og/hitchcode-og.png',
  ogAlt: 'Hitchcode: You built the business. We engineer what runs it.',
} as const

export const PRIMARY_NAV = [
  { href: '/work', label: 'Work' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/about', label: 'About' },
] as const

export const PRIMARY_CTA = { href: '/contact', label: 'Discuss your operation' } as const
