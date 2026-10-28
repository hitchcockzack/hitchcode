'use client'

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();

  // Greeting pages and design-lab studies render their own art-directed headers.
  const hidesGlobalHeader =
    pathname.startsWith('/greeting') || pathname.startsWith('/design-lab');

  if (hidesGlobalHeader) {
    return null;
  }

  return <Header />;
}
