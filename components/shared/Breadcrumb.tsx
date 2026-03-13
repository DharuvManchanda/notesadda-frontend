import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-2 text-xs text-muted-foreground sm:text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex min-w-0 items-center gap-1">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {item.href ? (
            <Link href={item.href} className="truncate text-primary hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="truncate font-medium text-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
