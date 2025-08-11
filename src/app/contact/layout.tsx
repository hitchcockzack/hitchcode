import { ReactNode } from 'react';

export const metadata = {
  title: 'hitchcode | Contact',
  description: "Let's start a conversation about your next project or idea.",
  icons: [
    {
      rel: 'icon',
      url: '/favicon.svg',
      type: 'image/svg+xml',
      sizes: 'any',
    },
  ],
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
