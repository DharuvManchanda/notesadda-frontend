import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, BookMarked } from 'lucide-react';
import type { UniversitySummary } from '@/lib/api-types';

interface UniversityCardProps {
  university: UniversitySummary;
}

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <Link href={`/university/${university.slug}`}>
      <div className="group h-full cursor-pointer rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary hover:shadow-md sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20 sm:h-12 sm:w-12">
            <BookMarked className="h-6 w-6 text-primary" />
          </div>
          <span className="shrink-0 rounded-full bg-secondary/20 px-2 py-1 text-[11px] font-semibold text-secondary-foreground sm:text-xs">
            {university.programsCountTotal || 0} Programs
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-base font-bold transition-colors group-hover:text-primary sm:text-lg">
          {university.name}
        </h3>

        <div className="mb-4 flex items-start gap-1 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span className="break-words">
            {university.city ? `${university.city}, ${university.state}` : 'Location unknown'}
          </span>
        </div>

        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {university.description}
        </p>

        <Button variant="outline" size="sm" className="min-h-10 w-full">
          Explore Programs
        </Button>
      </div>
    </Link>
  );
}
