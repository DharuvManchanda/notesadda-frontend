import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Star, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NoteCardProps {
  note: any;
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
  // Use SEO-friendly route if context is provided, otherwise use canonical route
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
      <div className="h-full p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all duration-300 cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 mr-4">
            <Badge variant="secondary" className="mb-2">
              {note.fileType?.toUpperCase() || 'PDF'}
            </Badge>
            <h3 className="text-base font-bold line-clamp-2 group-hover:text-primary transition-colors">
              {note.title}
            </h3>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {note.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 pb-4 border-b">
          <User className="h-3 w-3" />
          <span className="font-medium">{note.uploaderName || note.user?.name || note.uploadedBy?.name || 'Unknown'}</span>
          <span className="text-muted-foreground/60">•</span>
          <span>{note.createdAt ? formatDistanceToNow(new Date(note.createdAt), { addSuffix: true }) : 'Recently'}</span>
        </div>

        {/* <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
          <div className="flex items-center gap-1">
            <Download className="h-3 w-3 text-accent" />
            <span className="text-muted-foreground">{(note.downloadsCount || 0).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
            <span className="text-muted-foreground">{note.averageRating || 0}</span>
          </div>
          <div className="text-right text-muted-foreground">
            {note.fileSize || 'Unknown Size'}
          </div>
        </div> */}

        <Button variant="outline" size="sm" className="w-full">
          View Note
        </Button>
      </div>
    </Link>
  );
}
