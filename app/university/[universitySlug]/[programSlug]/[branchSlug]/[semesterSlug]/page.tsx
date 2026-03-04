import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { InfoGrid } from '@/components/shared/InfoGrid';
import { CardGrid } from '@/components/shared/CardGrid';
import { SubjectCard } from '@/components/cards/SubjectCard';
import { universities } from '@/lib/mockData';
import { resolveRoute, generateBreadcrumbs } from '@/lib/routeHelpers';
import { BookOpen } from 'lucide-react';

interface SemesterPageProps {
  params: Promise<{
    universitySlug: string;
    programSlug: string;
    branchSlug: string;
    semesterSlug: string;
  }>;
}

export async function generateStaticParams() {
  // Return empty array to avoid generating thousands of static pages at build time.
  // Pages will be rendered on-demand (SSR) when accessed.
  return [];
}

export async function generateMetadata({ params }: SemesterPageProps) {
  const { universitySlug, programSlug, branchSlug, semesterSlug } = await params;
  const resolved = resolveRoute({ universitySlug, programSlug, branchSlug, semesterSlug });

  if (!resolved.semester) {
    return { title: 'Semester Not Found' };
  }

  return {
    title: `Semester ${resolved.semester.number} - ${resolved.branch.name} - StudyHub`,
    description: `Browse subjects and notes for Semester ${resolved.semester.number} of ${resolved.branch.name} at ${resolved.university.name}.`,
  };
}

export default async function SemesterPage({ params }: SemesterPageProps) {
  const { universitySlug, programSlug, branchSlug, semesterSlug } = await params;
  const resolved = resolveRoute({
    universitySlug,
    programSlug,
    branchSlug,
    semesterSlug,
  });

  if (!resolved.semester) {
    return null; // notFound() will be called by resolveRoute
  }

  const { university, program, branch } = resolved;
  const semester = resolved.semester;

  const breadcrumbs = generateBreadcrumbs(
    { universitySlug, programSlug, branchSlug, semesterSlug },
    resolved
  );

  return (
    <>
      <Header />
      <main>
        <Section className="pt-8 md:pt-12 lg:pt-16">
          <Container>
            <Breadcrumb items={breadcrumbs} />

            <div className="mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <PageHeader
                    title={`Semester ${semester.number}`}
                    subtitle={`${semester.totalSubjects} Subjects • ${semester.totalNotes} Notes`}
                    className="mb-0"
                  />
                </div>
              </div>

              <InfoGrid
                items={[
                  { label: 'Branch', value: branch.name },
                  { label: 'Program', value: program.name },
                  { label: 'University', value: university.name },
                  { label: 'Total Notes', value: semester.totalNotes.toLocaleString() },
                ]}
                columns={4}
              />
            </div>
          </Container>
        </Section>

        <Section className="py-12 md:py-16 bg-muted/40">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Subjects</h2>
            <CardGrid columns="md">
              {semester.subjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  href={`/university/${universitySlug}/${programSlug}/${branchSlug}/semester-${semester.number}/${subject.slug}`}
                />
              ))}
            </CardGrid>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
