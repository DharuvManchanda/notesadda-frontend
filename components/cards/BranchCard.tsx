import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Book } from 'lucide-react';

interface BranchCardProps {
  branch: any;
  universitySlug: string;
  programSlug: string;
}

export function BranchCard({ branch, universitySlug, programSlug }: BranchCardProps) {
  return (
    <Link href={`/university/${universitySlug}/${programSlug}/${branch.slug}`}>
      <div className="group h-full cursor-pointer rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-accent hover:shadow-md sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/20 sm:h-12 sm:w-12">
            <Zap className="h-6 w-6 text-accent" />
          </div>
          <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground sm:text-xs">
            {branch.semestersCountTotal || 0} Semesters
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-base font-bold transition-colors group-hover:text-primary sm:text-lg">
          {branch.name}
        </h3>

        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {branch.description}
        </p>

        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Book className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{branch.semestersCountTotal || 0} Sem</span>
          </div>
        </div>

        <Button variant="outline" size="sm" className="min-h-10 w-full">
          View Semesters
        </Button>
      </div>
    </Link>
  );
}
