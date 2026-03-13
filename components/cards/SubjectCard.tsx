import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookMarked } from 'lucide-react';

interface SubjectCardProps {
  subject: any;
  href: string;
}

export function SubjectCard({ subject, href }: SubjectCardProps) {
  return (
    <Link href={href}>
      <div className="group h-full cursor-pointer rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-secondary hover:shadow-md sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-secondary/10 transition-colors group-hover:bg-secondary/20 sm:h-12 sm:w-12">
            <BookMarked className="h-6 w-6 text-secondary" />
          </div>
          <span className="max-w-[55%] truncate rounded-full bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground sm:text-xs">
            {subject.code}
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-base font-bold transition-colors group-hover:text-primary sm:text-lg">
          {subject.name}
        </h3>

        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {subject.description}
        </p>

        <Button variant="outline" size="sm" className="min-h-10 w-full">
          View Notes
        </Button>
      </div>
    </Link>
  );
}
