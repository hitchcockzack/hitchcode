import { ReactNode } from 'react';

export const metadata = {
  title: 'HitchCode | Software Services',
  description: 'Custom web and app solutions, built specifically for you.',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.svg',
      type: 'image/svg+xml',
      sizes: 'any',
    },
  ],
};

export default function FullStackDevelopmentLayout({ children }: { children: ReactNode }) {
  return children;
}
