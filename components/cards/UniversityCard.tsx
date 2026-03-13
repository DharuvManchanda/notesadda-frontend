import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, BookMarked, FileText } from 'lucide-react';
import type { UniversitySummary } from '@/lib/api-types';

interface UniversityCardProps {
  university: UniversitySummary;
}

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <Link href={`/university/${university.slug}`}>
      <div className="h-full p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all duration-300 cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <BookMarked className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-secondary/20 text-secondary-foreground">
            {university.programsCountTotal || 0} Programs
          </span>
        </div>

        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {university.name}
        </h3>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4" />
          <span>{university.city ? `${university.city}, ${university.state}` : 'Location unknown'}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {university.description}
        </p>

        {/* <div className="flex items-center gap-4 text-sm mb-4">
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">{university.totalNotes.toLocaleString()} Notes</span>
          </div>
          <div className="text-xs text-muted-foreground">Est. {university.foundedYear}</div>
        </div> */}

        <Button variant="outline" size="sm" className="w-full">
          Explore Programs
        </Button>
      </div>
    </Link>
  );
}
