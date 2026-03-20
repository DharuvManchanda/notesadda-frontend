'use client';

import { LoaderIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

function Spinner({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn('size-8 animate-spin text-primary sm:size-10', className)}
      {...props}
    />
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="flex items-center gap-4">
        <Spinner />
      </div>
    </div>
  );
}
