import Link from 'next/link';
import { Semester } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText } from 'lucide-react';

interface SemesterCardProps {
  semester: Semester;
  universitySlug: string;
  programSlug: string;
  branchSlug: string;
}

export function SemesterCard({ semester, universitySlug, programSlug, branchSlug }: SemesterCardProps) {
  return (
    <Link href={`/university/${universitySlug}/${programSlug}/${branchSlug}/semester-${semester.number}`}>
      <div className="p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all duration-300 cursor-pointer group">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
          Semester {semester.number}
        </h3>

        <p className="text-sm text-muted-foreground mb-4">
          {semester.totalSubjects} Subjects • {semester.totalNotes} Notes
        </p>

        <Button variant="outline" size="sm" className="w-full">
          View Subjects
        </Button>
      </div>
    </Link>
  );
}
