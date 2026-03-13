'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { BookMarked } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { NotesList } from '@/components/shared/NotesList';
import { notespitaraApi } from '@/store/services/notespitara';
import { PageLoader } from '@/components/ui/PageLoader';
import { formatSlug } from '@/lib/utils';

interface SubjectPageProps {
  params: Promise<{
    universitySlug: string;
    programSlug: string;
    branchSlug: string;
    semesterSlug: string;
    subjectSlug: string;
  }>;
}

export default function SubjectPage({ params }: SubjectPageProps) {
  const { universitySlug, programSlug, branchSlug, semesterSlug, subjectSlug } =
    use(params);

  const semesterStr = semesterSlug.replace('semester-', '');

  const { data: subjectResponse, isLoading: isSubjectLoading } =
    notespitaraApi.useGetSubjectBySlugQuery({ slug: subjectSlug });
  const subject = (subjectResponse as any)?.data;

  const { data: notesResponse, isLoading: isNotesLoading } =
    notespitaraApi.useGetNotesBySubjectQuery(
      { id: subject?.id || '', page: 0, size: 50 },
      { skip: !subject?.id },
    );

  if (isSubjectLoading) {
    return <PageLoader />;
  }

  if (!subject) {
    return notFound();
  }

  const breadcrumbs = [
    { label: 'Explore', href: '/explore' },
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
      label: `Semester ${semesterStr}`,
      href: `/university/${universitySlug}/${programSlug}/${branchSlug}/semester-${semesterStr}`,
    },
    { label: subject.name },
  ];

  return (
    <main>
      <Section className="pt-8 md:pt-12 lg:pt-16">
        <Container>
          <Breadcrumb items={breadcrumbs} />

          <div className="mb-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                <BookMarked className="h-7 w-7 text-secondary" />
              </div>
              <div className="min-w-0">
                <PageHeader
                  title={subject.name}
                  subtitle={`${subject.code} • ${subject.notesCountTotal || 0} Study Notes`}
                  className="mb-0"
                />
              </div>
            </div>

            <p className="mb-8 max-w-3xl text-base text-muted-foreground sm:text-lg">
              {subject.description}
            </p>

            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-lg border border-border/60 bg-card/60 p-3">
                <p className="text-muted-foreground">Subject Code</p>
                <p className="font-semibold">{subject.code}</p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 p-3">
                <p className="text-muted-foreground">Semester</p>
                <p className="font-semibold">{semesterStr}</p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 p-3">
                <p className="text-muted-foreground">Branch</p>
                <p className="font-semibold">{formatSlug(branchSlug)}</p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 p-3">
                <p className="text-muted-foreground">Total Notes</p>
                <p className="text-2xl font-bold text-accent">
                  {subject.notesCountTotal || 0}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40 py-12 md:py-16">
        <Container>
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">Study Notes</h2>

          {isNotesLoading ? (
            <div className="flex justify-center py-8">
              <PageLoader />
            </div>
          ) : (notesResponse as any)?.data?.notes?.content?.length ? (
            <NotesList
              notes={(notesResponse as any).data.notes.content}
              universitySlug={universitySlug}
              programSlug={programSlug}
              branchSlug={branchSlug}
              semesterNumber={semesterStr}
              subjectSlug={subject.slug}
            />
          ) : (
            <div className="mb-8 rounded-lg border bg-card py-8 text-center text-muted-foreground">
              No study notes found for this subject.
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
