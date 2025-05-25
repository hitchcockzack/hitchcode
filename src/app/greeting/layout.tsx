import { ReactNode } from 'react';

export const metadata = {
  title: 'You found me | hitchcode',
  description: 'A digital handshake.',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.svg',
      type: 'image/svg+xml',
      sizes: 'any',
    },
  ],
};

export default function GreetingLayout({ children }: { children: ReactNode }) {
  return children;
}
