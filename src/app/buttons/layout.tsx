import { ReactNode } from 'react';

export const metadata = {
  title: 'HitchCode | Buttons',
  description: 'A playful grid of interactive buttons and games.',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.svg',
      type: 'image/svg+xml',
      sizes: 'any',
    },
  ],
};

export default function ButtonsLayout({ children }: { children: ReactNode }) {
  return children;
}
