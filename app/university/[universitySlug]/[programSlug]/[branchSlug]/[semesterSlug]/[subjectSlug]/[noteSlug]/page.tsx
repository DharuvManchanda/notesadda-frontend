'use client';

import { use } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { NoteCard } from '@/components/cards/NoteCard';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Bookmark, Share2, Star, User, Calendar, FileText } from 'lucide-react';
import { formatDistanceToNow, formatDate } from 'date-fns';
import { notespitaraApi } from '@/store/services/notespitara';
import { PageLoader } from '@/components/ui/PageLoader';
import { toast } from 'sonner';
import { formatSlug } from '@/lib/utils';

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

export default function NoteSEOPage({ params }: NoteSEORouteProps) {
  const { universitySlug, programSlug, branchSlug, semesterSlug, subjectSlug, noteSlug } = use(params);

  const [triggerDownload, { isFetching: isDownloading }] = notespitaraApi.useLazyGetDownloadLinkQuery();

  // Parse semester (e.g. "semester-1" -> "1")
  const semesterStr = semesterSlug.replace('semester-', '');


  const { data: subjectResponse, isLoading: isSubjLoading } = notespitaraApi.useGetSubjectBySlugQuery({ slug: subjectSlug });
  const subject = (subjectResponse as any)?.data;

  const { data: noteResponse, isLoading: isNoteLoading } = notespitaraApi.useGetNotesBySlugQuery({ slug: noteSlug });
  const note = (noteResponse as any)?.data;

  const { data: relatedResponse } = notespitaraApi.useGetNotesBySubjectQuery(
    { id: subject?.id || '', page: 0, size: 4 },
    { skip: !subject?.id }
  );

  if (isSubjLoading || isNoteLoading) {
    return <PageLoader />;
  }

  if (!subject || !note) {
    return notFound();
  }

  const handleDownload = async () => {
    try {
      const data: any = await triggerDownload({ id: note.id }).unwrap();
      if (data?.status && data?.data?.downloadUrl) {
        window.open(data.data.downloadUrl, '_blank');
      } else {
        toast.error((data as any)?.message || 'Failed to generate download link');
      }
    } catch (error: any) {
      console.error('Download error:', error);
      toast.error(error?.data?.message || 'An error occurred while trying to download the note');
    }
  };

  const relatedNotes = (relatedResponse as any)?.data?.notes?.content?.filter((n: any) => n.id !== note.id).slice(0, 3) || [];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: formatSlug(universitySlug), href: `/university/${universitySlug}` },
    { label: formatSlug(programSlug), href: `/university/${universitySlug}/${programSlug}` },
    { label: formatSlug(branchSlug), href: `/university/${universitySlug}/${programSlug}/${branchSlug}` },
    { label: `Semester ${semesterStr}`, href: `/university/${universitySlug}/${programSlug}/${branchSlug}/${semesterSlug}` },
    { label: subject?.name || 'Subject', href: `/university/${universitySlug}/${programSlug}/${branchSlug}/${semesterSlug}/${subjectSlug}` },
    { label: note.title },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Container>
          <Section>
            <Breadcrumb items={breadcrumbItems} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <article className="space-y-8">
                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-2 text-balance">{note.title}</h1>
                        <p className="text-lg text-muted-foreground">{subject?.name}</p>
                      </div>
                      <Badge variant="secondary" className="whitespace-nowrap">
                        {note.fileType?.toUpperCase() || 'PDF'}
                      </Badge>
                    </div>
                  </div>

                  {/* Meta Information */}
                  {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Downloads</p>
                      <p className="text-2xl font-bold">{note.downloadsCount || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Rating</p>
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold">{note.averageRating || 0}</span>
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">File Size</p>
                      <p className="text-2xl font-bold">{note.fileSize || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Uploaded</p>
                      <p className="text-sm font-medium">{note.createdAt ? formatDistanceToNow(new Date(note.createdAt), { addSuffix: true }) : 'Recently'}</p>
                    </div>
                  </div> */}

                  {/* Description */}
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4">About This Note</h2>
                    <p className="text-lg text-foreground leading-relaxed">{note.description}</p>
                  </div>

                  {/* Uploader Info */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Uploaded By</h3>
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{note.uploaderName || note.user?.name || note.uploadedBy?.name || 'Unknown'}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{note.uploaderEmail || note.user?.email || note.uploadedBy?.email}</p>
                        <p className="text-sm">
                          <span className="font-semibold">{note.uploaderTotalNotes || note.uploadedBy?.uploadedNotesCount || 0}</span> notes uploaded
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Uploaded {note.createdAt ? formatDate(new Date(note.createdAt), 'PPP') : 'Unknown Form'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 flex-wrap">
                    <Button 
                      size="lg" 
                      className="gap-2" 
                      onClick={handleDownload}
                      disabled={isDownloading}
                    >
                      <Download className="h-4 w-4" />
                      {isDownloading ? 'Generating Link...' : 'Download Note'}
                    </Button>
                    {/* <Button size="lg" variant="outline" className="gap-2">
                      <Bookmark className="h-4 w-4" />
                      Save
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button> */}
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* File Preview */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <div className="h-40 bg-muted rounded-lg flex items-center justify-center">
                    <FileText className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">File Type</p>
                    <p className="font-semibold">{note.fileType?.toUpperCase() || 'PDF'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Size</p>
                    <p className="font-semibold">{note.fileSize || 'N/A'}</p>
                  </div>
                </div>

                {/* Related Notes */}
                {relatedNotes.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">Related Notes</h3>
                    <div className="space-y-3">
                      {relatedNotes.map((relatedNote: any) => (
                        <NoteCard
                          key={relatedNote.id}
                          note={relatedNote}
                          universitySlug={universitySlug}
                          programSlug={programSlug}
                          branchSlug={branchSlug}
                          semesterNumber={semesterStr}
                          subjectSlug={subjectSlug}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Section>
        </Container>
      </main>
      <Footer />

      {/* Canonical Link */}
      <link rel="canonical" href={`/note/${note.id}`} />
    </div>
  );
}
