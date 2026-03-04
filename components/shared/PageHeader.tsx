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
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground text-pretty mb-6">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
