import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { NoteSummary } from '@/lib/api-types';

interface NoteCardProps {
  note: NoteSummary;
  universitySlug?: string;
  programSlug?: string;
  branchSlug?: string;
  semesterNumber?: number | string;
  subjectSlug?: string;
}

export function NoteCard({
  note,
  universitySlug,
  programSlug,
  branchSlug,
  semesterNumber,
  subjectSlug,
}: NoteCardProps) {
  const href =
    universitySlug &&
    programSlug &&
    branchSlug &&
    semesterNumber &&
    subjectSlug
      ? `/university/${universitySlug}/${programSlug}/${branchSlug}/semester-${semesterNumber}/${subjectSlug}/${note.slug}`
      : `/note/${note.id}`;

  return (
    <Link href={href}>
      <div className="group h-full cursor-pointer rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary hover:shadow-md sm:p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <Badge variant="secondary" className="mb-2">
              {note.fileType?.toUpperCase() || 'PDF'}
            </Badge>
            <h3 className="line-clamp-2 text-base font-bold transition-colors group-hover:text-primary">
              {note.title}
            </h3>
          </div>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {note.description}
        </p>

        <div className="mb-4 flex flex-wrap items-center gap-2 border-b pb-4 text-xs text-muted-foreground">
          <User className="h-3 w-3 flex-shrink-0" />
          <span className="min-w-0 truncate font-medium">
            {note.uploaderName || note.user?.name || note.uploadedBy?.name || 'Unknown'}
          </span>
          <span className="hidden text-muted-foreground/60 sm:inline">•</span>
          <span>
            {note.createdAt
              ? formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })
              : 'Recently'}
          </span>
        </div>

        <Button variant="outline" size="sm" className="min-h-10 w-full">
          View Note
        </Button>
      </div>
    </Link>
  );
}
