import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { InfoGrid } from '@/components/shared/InfoGrid';
import { CardGrid } from '@/components/shared/CardGrid';
import { SemesterCard } from '@/components/cards/SemesterCard';
import { universities } from '@/lib/mockData';
import { resolveRoute, generateBreadcrumbs } from '@/lib/routeHelpers';
import { BookMarked, Zap } from 'lucide-react';

interface BranchPageProps {
  params: Promise<{
    universitySlug: string;
    programSlug: string;
    branchSlug: string;
  }>;
}

export async function generateStaticParams() {
  const params: Array<{ universitySlug: string; programSlug: string; branchSlug: string }> = [];
  universities.forEach((uni) => {
    uni.programs.forEach((prog) => {
      prog.branches.forEach((branch) => {
        params.push({
          universitySlug: uni.slug,
          programSlug: prog.slug,
          branchSlug: branch.slug,
        });
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }: BranchPageProps) {
  const { universitySlug, programSlug, branchSlug } = await params;
  const { university, branch } = resolveRoute({ universitySlug, programSlug, branchSlug });

  return {
    title: `${branch.name} - ${university.name} - NotesPitara`,
    description: `${branch.description} Browse semesters and subjects for ${branch.name} at ${university.name}.`,
  };
}

export default async function BranchPage({ params }: BranchPageProps) {
  const { universitySlug, programSlug, branchSlug } = await params;
  const { university, program, branch } = resolveRoute({ universitySlug, programSlug, branchSlug });

  const breadcrumbs = generateBreadcrumbs({ universitySlug, programSlug, branchSlug }, { university, program, branch });

  return (
    <>
      <Header />
      <main>
        <Section className="pt-8 md:pt-12 lg:pt-16">
          <Container>
            <Breadcrumb items={breadcrumbs} />

            <div className="mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-14 w-14 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <PageHeader
                    title={branch.name}
                    subtitle={branch.description}
                    className="mb-0"
                  />
                </div>
              </div>

              <InfoGrid
                items={[
                  { label: 'Program', value: program.name },
                  { icon: <BookMarked className="h-4 w-4" />, label: 'Semesters', value: branch.totalSemesters },
                  { label: 'University', value: university.name },
                  { label: 'Total Notes', value: branch.totalNotes.toLocaleString() },
                ]}
                columns={4}
              />
            </div>
          </Container>
        </Section>

        <Section className="py-12 md:py-16 bg-muted/40">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Semesters</h2>
            <CardGrid columns="lg">
              {branch.semesters.map((semester) => (
                <SemesterCard
                  key={semester.id}
                  semester={semester}
                  universitySlug={university.slug}
                  programSlug={program.slug}
                  branchSlug={branch.slug}
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
