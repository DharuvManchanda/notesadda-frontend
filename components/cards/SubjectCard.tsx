import Link from 'next/link';
import { Subject } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { BookMarked, FileText } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  href: string;
}

export function SubjectCard({ subject, href }: SubjectCardProps) {
  return (
    <Link href={href}>
      <div className="h-full p-6 rounded-xl bg-card border border-border hover:border-secondary hover:shadow-md transition-all duration-300 cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
            <BookMarked className="h-6 w-6 text-secondary" />
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-muted text-muted-foreground">
            {subject.code}
          </span>
        </div>

        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {subject.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {subject.description}
        </p>

        <div className="flex items-center gap-1 text-sm mb-4">
          <FileText className="h-4 w-4 text-accent" />
          <span className="text-muted-foreground">{subject.totalNotes} Notes</span>
        </div>

        <Button variant="outline" size="sm" className="w-full">
          View Notes
        </Button>
      </div>
    </Link>
  );
}
