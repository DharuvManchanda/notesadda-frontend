'use client';

import { use, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { NotesList } from '@/components/shared/NotesList';
import { BookMarked } from 'lucide-react';
import { notFound } from 'next/navigation';
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
  const { universitySlug, programSlug, branchSlug, semesterSlug, subjectSlug } = use(params);

  // Parse semester slug (e.g. "semester-1" -> "1")
  const semesterStr = semesterSlug.replace('semester-', '');

  const { data: subjectResponse, isLoading: isSubjLoading } = notespitaraApi.useGetSubjectBySlugQuery({ slug: subjectSlug });
  const subject = (subjectResponse as any)?.data;

  const { data: notesResponse, isLoading: isNotesLoading } = notespitaraApi.useGetNotesBySubjectQuery(
    { id: subject?.id || '', page: 0, size: 50 },
    { skip: !subject?.id }
  );

  if (isSubjLoading) return <PageLoader />;
  if (!subject) return notFound();

  const breadcrumbs = [
    { label: 'Explore', href: '/explore' },
    { label: formatSlug(universitySlug), href: `/university/${universitySlug}` },
    { label: formatSlug(programSlug), href: `/university/${universitySlug}/${programSlug}` },
    { label: formatSlug(branchSlug), href: `/university/${universitySlug}/${programSlug}/${branchSlug}` },
    { label: `Semester ${semesterStr}`, href: `/university/${universitySlug}/${programSlug}/${branchSlug}/semester-${semesterStr}` },
    { label: subject.name }
  ];

  return (
    <>
      <Header />
      <main>
        <Section className="pt-8 md:pt-12 lg:pt-16">
          <Container>
            <Breadcrumb items={breadcrumbs} />

            <div className="mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-14 w-14 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <BookMarked className="h-7 w-7 text-secondary" />
                </div>
                <div>
                  <PageHeader
                    title={subject.name}
                    subtitle={`${subject.code} • ${subject.notesCountTotal || 0} Study Notes`}
                    className="mb-0"
                  />
                </div>
              </div>

              <p className="text-lg text-muted-foreground max-w-3xl mb-8">
                {subject.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Subject Code</p>
                  <p className="font-semibold">{subject.code}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Semester</p>
                  <p className="font-semibold">{semesterStr}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Branch</p>
                  <p className="font-semibold">{formatSlug(branchSlug)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Notes</p>
                  <p className="text-2xl font-bold text-accent">{subject.notesCountTotal || 0}</p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="py-12 md:py-16 bg-muted/40">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Study Notes</h2>

            {isNotesLoading ? (
              <div className="flex justify-center py-8"><PageLoader /></div>
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
              <div className="text-center py-8 text-muted-foreground border rounded-lg bg-card mb-8">
                No study notes found for this subject.
              </div>
            )}
          </Container>
        </Section>

      </main>
      <Footer />
    </>
  );
}
