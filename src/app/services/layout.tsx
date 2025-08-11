import { ReactNode } from 'react'

export const metadata = {
  title: 'hitchcode | Services',
  description: 'Full-stack development, technology consulting, and system refinement — unified services designed to move your business forward.',
  icons: [
    { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
  ],
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children
}
