import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Clock, FileText } from 'lucide-react';

interface ProgramCardProps {
  program: any;
  universitySlug: string;
}

export function ProgramCard({ program, universitySlug }: ProgramCardProps) {
  return (
    <Link href={`/university/${universitySlug}/${program.slug}`}>
      <div className="h-full p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all duration-300 cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
            <GraduationCap className="h-6 w-6 text-secondary" />
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-muted text-muted-foreground">
            {program.branchesCountTotal || 0} Branches
          </span>
        </div>

        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {program.name}
        </h3>

        <div className="flex items-center gap-4 text-sm mb-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{program.duration}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {program.description}
        </p>
{/* 
        <div className="flex items-center gap-1 text-sm mb-4">
          <FileText className="h-4 w-4 text-accent" />
          <span className="text-muted-foreground">{program.totalNotes.toLocaleString()} Notes</span>
        </div> */}

        <Button variant="outline" size="sm" className="w-full">
          View Branches
        </Button>
      </div>
    </Link>
  );
}
