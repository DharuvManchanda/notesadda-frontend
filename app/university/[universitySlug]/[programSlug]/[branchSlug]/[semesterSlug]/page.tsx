'use client';

import { use, useMemo } from 'react';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { InfoGrid } from '@/components/shared/InfoGrid';
import { CardGrid } from '@/components/shared/CardGrid';
import { SubjectCard } from '@/components/cards/SubjectCard';
import { notFound } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { notespitaraApi } from '@/store/services/notespitara';
import { PageLoader } from '@/components/ui/PageLoader';
import { formatSlug } from '@/lib/utils';

interface SemesterPageProps {
  params: Promise<{
    universitySlug: string;
    programSlug: string;
    branchSlug: string;
    semesterSlug: string;
  }>;
}

export default function SemesterPage({ params }: SemesterPageProps) {
  const { universitySlug, programSlug, branchSlug, semesterSlug } = use(params);

  // Parse semester slug (e.g. "semester-1" -> "1")
  const semesterStr = semesterSlug.replace('semester-', '');

  const { data: branchResponse, isLoading: isBranchLoading } = notespitaraApi.useGetBranchBySlugQuery({ slug: branchSlug });
  const branch = (branchResponse as any)?.data;

  // We need the branch ID to find the semester ID
  const { data: semestersResponse, isLoading: isSemsLoading } = notespitaraApi.useGetSemestersByBranchQuery(
    { id: branch?.id || '', page: 0, size: 50 },
    { skip: !branch?.id }
  );
  
  const semestersContent = (semestersResponse as any)?.data?.semesters?.content || [];
  const semester = useMemo(() => {
    return semestersContent.find((s: any) => String(s.number) === semesterStr || s.name === semesterStr);
  }, [semestersContent, semesterStr]);

  const { data: subjectData, isLoading: isSubjLoading } = notespitaraApi.useGetSubjectsBySemesterQuery(
    { id: semester?.id || '', page: 0, size: 50 },
    { skip: !semester?.id }
  );

  if (isBranchLoading || isSemsLoading) return <PageLoader />;
  if (!branch || !semester) return notFound();

  const breadcrumbs = [
    { label: 'Explore', href: '/explore' },
    { label: formatSlug(universitySlug), href: `/university/${universitySlug}` },
    { label: formatSlug(programSlug), href: `/university/${universitySlug}/${programSlug}` },
    { label: branch.name, href: `/university/${universitySlug}/${programSlug}/${branchSlug}` },
    { label: `Semester ${semester.number || semesterStr}` }
  ];

  return (
    <>
      <main>
        <Section className="pt-8 md:pt-12 lg:pt-16">
          <Container>
            <Breadcrumb items={breadcrumbs} />

            <div className="mb-8">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-7 w-7 text-primary" />
                </div>
                <div className="min-w-0">
                  <PageHeader
                    title={`Semester ${semester.number || semesterStr}`}
                    subtitle={`${semester.subjectsCountTotal || 0} Subjects`}
                    className="mb-0"
                  />
                </div>
              </div>

              <InfoGrid
                items={[
                  { label: 'Branch', value: branch.name },
                  { label: 'Program', value: formatSlug(programSlug) },
                  { label: 'University', value: formatSlug(universitySlug) },
                ]}
                columns={3}
              />
            </div>
          </Container>
        </Section>

        <Section className="py-12 md:py-16 bg-muted/40">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Subjects</h2>
            {isSubjLoading ? (
              <div className="flex justify-center py-8"><PageLoader /></div>
            ) : (subjectData as any)?.data?.subjects?.content?.length ? (
              <CardGrid columns="md">
                {(subjectData as any).data.subjects.content.map((subject: any) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    href={`/university/${universitySlug}/${programSlug}/${branch.slug}/semester-${semester.number || semesterStr}/${subject.slug}`}
                  />
                ))}
              </CardGrid>
            ) : (
              <div className="text-center py-8 text-muted-foreground border rounded-lg bg-card">
                No subjects found for this semester.
              </div>
            )}
          </Container>
        </Section>
      </main>
    </>
  );
}
