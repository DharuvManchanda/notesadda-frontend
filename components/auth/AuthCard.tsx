import React from 'react';
import { cn } from '@/lib/utils';

export function AuthCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
      <div className={cn(
        'w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg',
        className,
      )}>
        {children}
      </div>
    </div>
  );
}
