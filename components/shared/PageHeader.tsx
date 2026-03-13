import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, children, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-8 md:mb-12', className)}>
      <h1 className="mb-2 text-2xl font-bold text-balance sm:text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mb-6 text-base text-muted-foreground text-pretty sm:text-lg">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
