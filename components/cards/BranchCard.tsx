import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Book, FileText } from 'lucide-react';

interface BranchCardProps {
  branch: any;
  universitySlug: string;
  programSlug: string;
}

export function BranchCard({ branch, universitySlug, programSlug }: BranchCardProps) {
  return (
    <Link href={`/university/${universitySlug}/${programSlug}/${branch.slug}`}>
      <div className="h-full p-6 rounded-xl bg-card border border-border hover:border-accent hover:shadow-md transition-all duration-300 cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
            <Zap className="h-6 w-6 text-accent" />
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-muted text-muted-foreground">
            {branch.semestersCountTotal || 0} Semesters
          </span>
        </div>

        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {branch.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {branch.description}
        </p>

        <div className="flex items-center gap-4 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Book className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{branch.semestersCountTotal || 0} Sem</span>
          </div>
          {/* <div className="flex items-center gap-1">
            <FileText className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">{branch.totalNotes.toLocaleString()} Notes</span>
          </div> */}
        </div>

        <Button variant="outline" size="sm" className="w-full">
          View Semesters
        </Button>
      </div>
    </Link>
  );
}
