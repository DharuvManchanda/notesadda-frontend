import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Home } from 'lucide-react';

export function AuthCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4 relative">
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <Home size={16} />
        Back to Home
      </Link>
      <div className={cn(
        'w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg',
        className,
      )}>
        {children}
      </div>
    </div>
  );
}
