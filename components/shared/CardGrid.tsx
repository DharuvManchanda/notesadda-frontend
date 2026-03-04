import { ReactNode } from 'react';

interface CardGridProps {
  children: ReactNode;
  columns?: 'auto' | 'sm' | 'md' | 'lg';
}

const columnClasses = {
  auto: 'grid-cols-1',
  sm: 'grid-cols-1 md:grid-cols-2',
  md: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  lg: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

export function CardGrid({ children, columns = 'md' }: CardGridProps) {
  return <div className={`grid ${columnClasses[columns]} gap-6`}>{children}</div>;
}
