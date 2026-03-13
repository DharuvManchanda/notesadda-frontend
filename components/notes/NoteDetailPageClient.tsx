'use client';

import { notFound } from 'next/navigation';
import { formatDate } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { NoteCard } from '@/components/cards/NoteCard';
import { notespitaraApi } from '@/store/services/notespitara';
import { PageLoader } from '@/components/ui/PageLoader';
import { NoteDownloadButton } from '@/components/notes/NoteDownloadButton';
import { FileText, User } from 'lucide-react';
import { formatSlug } from '@/lib/utils';
import type { ApiResponse, NoteSummary, NotesPayload, SubjectSummary } from '@/lib/api-types';

interface NoteDetailPageClientProps {
  routeParams: {
    universitySlug: string;
    programSlug: string;
    branchSlug: string;
    semesterSlug: string;
    subjectSlug: string;
    noteSlug: string;
  };
}

export function NoteDetailPageClient({
  routeParams,
}: NoteDetailPageClientProps) {
  const {
    universitySlug,
    programSlug,
    branchSlug,
    semesterSlug,
    subjectSlug,
    noteSlug,
  } = routeParams;

  const semesterStr =
    typeof semesterSlug === 'string' && semesterSlug.length > 0
      ? semesterSlug.replace('semester-', '')
      : '';

  const { data: subjectResponse, isLoading: isSubjectLoading } =
    notespitaraApi.useGetSubjectBySlugQuery({ slug: subjectSlug });
  const subject = (subjectResponse as ApiResponse<SubjectSummary> | undefined)?.data;

  const { data: noteResponse, isLoading: isNoteLoading } =
    notespitaraApi.useGetNotesBySlugQuery({ slug: noteSlug });
  const note = (noteResponse as ApiResponse<NoteSummary> | undefined)?.data;

  const { data: relatedResponse } = notespitaraApi.useGetNotesBySubjectQuery(
    { id: subject?.id ?? '', page: 0, size: 4 },
    { skip: !subject?.id },
  );

  if (isSubjectLoading || isNoteLoading) {
    return <PageLoader />;
  }

  if (!subject || !note) {
    notFound();
  }

  const relatedNotes =
    ((relatedResponse as ApiResponse<NotesPayload> | undefined)?.data?.notes.content ?? []).filter(
      (relatedNote) => relatedNote.id !== note.id,
    ).slice(0, 3);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: formatSlug(universitySlug), href: `/university/${universitySlug}` },
    {
      label: formatSlug(programSlug),
      href: `/university/${universitySlug}/${programSlug}`,
    },
    {
      label: formatSlug(branchSlug),
      href: `/university/${universitySlug}/${programSlug}/${branchSlug}`,
    },
    {
      label: semesterStr ? `Semester ${semesterStr}` : 'Semester',
      href: `/university/${universitySlug}/${programSlug}/${branchSlug}/${semesterSlug}`,
    },
    {
      label: subject.name,
      href: `/university/${universitySlug}/${programSlug}/${branchSlug}/${semesterSlug}/${subjectSlug}`,
    },
    { label: note.title },
  ];

  const uploaderName =
    note.uploaderName ?? note.user?.name ?? note.uploadedBy?.name ?? 'Unknown';
  const uploaderEmail =
    note.uploaderEmail ?? note.user?.email ?? note.uploadedBy?.email ?? 'Unknown';
  const uploaderNoteCount =
    note.uploaderTotalNotes ?? note.uploadedBy?.uploadedNotesCount ?? 0;

  return (
    <main className="flex-1">
      <Container>
        <Section>
          <Breadcrumb items={breadcrumbItems} />

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <article className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h1 className="mb-2 text-4xl font-bold text-balance">
                        {note.title}
                      </h1>
                      <p className="text-lg text-muted-foreground">
                        {subject.name}
                      </p>
                    </div>
                    <Badge variant="secondary" className="whitespace-nowrap">
                      {note.fileType?.toUpperCase() ?? 'PDF'}
                    </Badge>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h2 className="mb-4 text-2xl font-bold">About This Note</h2>
                  <p className="text-lg leading-relaxed text-foreground">
                    {note.description || 'No description provided for this note yet.'}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="mb-4 text-lg font-bold">Uploaded By</h3>
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold">{uploaderName}</h4>
                      <p className="mb-2 text-sm text-muted-foreground">
                        {uploaderEmail}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">{uploaderNoteCount}</span>{' '}
                        notes uploaded
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Uploaded{' '}
                        {note.createdAt
                          ? formatDate(new Date(note.createdAt), 'PPP')
                          : 'Unknown date'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <NoteDownloadButton noteId={note.id} />
                </div>
              </article>
            </div>

            <div className="space-y-6">
              <div className="space-y-4 rounded-lg border border-border bg-card p-6">
                <div className="flex h-40 items-center justify-center rounded-lg bg-muted">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">File Type</p>
                  <p className="font-semibold">{note.fileType?.toUpperCase() ?? 'PDF'}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Size</p>
                  <p className="font-semibold">{note.fileSize ?? 'N/A'}</p>
                </div>
              </div>

              {relatedNotes.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Related Notes</h3>
                  <div className="space-y-3">
                    {relatedNotes.map((relatedNote) => (
                      <NoteCard
                        key={relatedNote.id}
                        note={relatedNote}
                        universitySlug={universitySlug}
                        programSlug={programSlug}
                        branchSlug={branchSlug}
                        semesterNumber={semesterStr || relatedNote.semesterNumber || ''}
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
  );
}
