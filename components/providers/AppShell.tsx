'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface AppShellProps {
  children: ReactNode;
}

const HIDDEN_CHROME_PREFIXES = ['/auth', '/admin', '/reset-password'];

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideChrome = HIDDEN_CHROME_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
