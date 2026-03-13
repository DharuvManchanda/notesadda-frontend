import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Clock } from 'lucide-react';

interface ProgramCardProps {
  program: any;
  universitySlug: string;
}

export function ProgramCard({ program, universitySlug }: ProgramCardProps) {
  return (
    <Link href={`/university/${universitySlug}/${program.slug}`}>
      <div className="group h-full cursor-pointer rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary hover:shadow-md sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-secondary/10 transition-colors group-hover:bg-secondary/20 sm:h-12 sm:w-12">
            <GraduationCap className="h-6 w-6 text-secondary" />
          </div>
          <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground sm:text-xs">
            {program.branchesCountTotal || 0} Branches
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-base font-bold transition-colors group-hover:text-primary sm:text-lg">
          {program.name}
        </h3>

        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{program.duration}</span>
          </div>
        </div>

        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {program.description}
        </p>

        <Button variant="outline" size="sm" className="min-h-10 w-full">
          View Branches
        </Button>
      </div>
    </Link>
  );
}
