'use client'

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();

  // Hide header on greeting pages
  const isGreetingPage = pathname.startsWith('/greeting');

  if (isGreetingPage) {
    return null;
  }

  return <Header />;
}
