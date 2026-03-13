import { NoteDetailPageClient } from '@/components/notes/NoteDetailPageClient';

interface NoteSEORouteProps {
  params: Promise<{
    universitySlug: string;
    programSlug: string;
    branchSlug: string;
    semesterSlug: string;
    subjectSlug: string;
    noteSlug: string;
  }>;
}

export default async function NoteSEOPage({ params }: NoteSEORouteProps) {
  const routeParams = await params;

  return <NoteDetailPageClient routeParams={routeParams} />;
}
