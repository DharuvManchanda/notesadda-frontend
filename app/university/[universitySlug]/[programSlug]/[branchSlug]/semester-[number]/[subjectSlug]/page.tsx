import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { NoteCard } from '@/components/cards/NoteCard';
import { universities } from '@/lib/mockData';
import { resolveRoute, generateBreadcrumbs } from '@/lib/routeHelpers';
import { BookMarked } from 'lucide-react';

interface SubjectPageProps {
  params: Promise<{
    universitySlug: string;
    programSlug: string;
    branchSlug: string;
    number: string;
    subjectSlug: string;
  }>;
}

export async function generateStaticParams() {
  const params: Array<{
    universitySlug: string;
    programSlug: string;
    branchSlug: string;
    number: string;
    subjectSlug: string;
  }> = [];

  universities.forEach((uni) => {
    uni.programs.forEach((prog) => {
      prog.branches.forEach((branch) => {
        branch.semesters.forEach((semester) => {
          semester.subjects.forEach((subject) => {
            params.push({
              universitySlug: uni.slug,
              programSlug: prog.slug,
              branchSlug: branch.slug,
              number: semester.number.toString(),
              subjectSlug: subject.slug,
            });
          });
        });
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: SubjectPageProps) {
  const { universitySlug, programSlug, branchSlug, number, subjectSlug } = await params;
  const { university, subject } = resolveRoute({ universitySlug, programSlug, branchSlug, number, subjectSlug });

  return {
    title: `${subject!.name} - ${subject!.code} - StudyHub`,
    description: `Browse ${subject!.totalNotes} study notes for ${subject!.name} (${subject!.code}) from ${university.name}.`,
  };
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { universitySlug, programSlug, branchSlug, number, subjectSlug } = await params;
  const { university, program, branch, semester, subject } = resolveRoute({
    universitySlug,
    programSlug,
    branchSlug,
    number,
    subjectSlug,
  });

  const breadcrumbs = generateBreadcrumbs(
    { universitySlug, programSlug, branchSlug, number, subjectSlug },
    { university, program, branch, semester, subject }
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
                <div className="h-14 w-14 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <BookMarked className="h-7 w-7 text-secondary" />
                </div>
                <div>
                  <PageHeader
                    title={subject.name}
                    subtitle={`${subject.code} • ${subject.totalNotes} Study Notes`}
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
                  <p className="font-semibold">{semesterNumber}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Branch</p>
                  <p className="font-semibold">{branch.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Notes</p>
                  <p className="text-2xl font-bold text-accent">{subject.totalNotes}</p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="py-12 md:py-16 bg-muted/40">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Study Notes</h2>

            {subject.notes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subject.notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    universitySlug={universitySlug}
                    programSlug={programSlug}
                    branchSlug={branchSlug}
                    semesterNumber={semesterNumber}
                    subjectSlug={subject.slug}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No notes available for this subject yet.</p>
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
