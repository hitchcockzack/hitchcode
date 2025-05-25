'use client'
import SmartSchedulerDemo from '../SmartSchedulerDemo';

export default function TestPage() {
  return <SmartSchedulerDemo />;
}

export const metadata = {
  title: 'HitchCode | Test Page',
  description: 'A space for experiments and demos.',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.svg',
      type: 'image/svg+xml',
      sizes: 'any',
    },
  ],
};
