import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

interface SemesterCardProps {
  semester: any;
  universitySlug: string;
  programSlug: string;
  branchSlug: string;
}

export function SemesterCard({ semester, universitySlug, programSlug, branchSlug }: SemesterCardProps) {
  return (
    <Link href={`/university/${universitySlug}/${programSlug}/${branchSlug}/semester-${semester.number}`}>
      <div className="group rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary hover:shadow-md sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20 sm:h-12 sm:w-12">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
        </div>

        <h3 className="mb-1 text-xl font-bold transition-colors group-hover:text-primary sm:text-2xl">
          Semester {semester.number}
        </h3>

        <p className="mb-4 text-sm text-muted-foreground">
          {semester.subjectsCountTotal || 0} Subjects
        </p>

        <Button variant="outline" size="sm" className="min-h-10 w-full">
          View Subjects
        </Button>
      </div>
    </Link>
  );
}
