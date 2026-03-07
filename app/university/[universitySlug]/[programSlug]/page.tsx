import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { BranchCard } from '@/components/cards/BranchCard';
import { getUniversityBySlug, getProgramBySlug, universities } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import { Clock, BookMarked } from 'lucide-react';

interface ProgramPageProps {
  params: Promise<{
    universitySlug: string;
    programSlug: string;
  }>;
}

export async function generateStaticParams() {
  const params: Array<{ universitySlug: string; programSlug: string }> = [];
  universities.forEach((uni) => {
    uni.programs.forEach((prog) => {
      params.push({
        universitySlug: uni.slug,
        programSlug: prog.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }: ProgramPageProps) {
  const { universitySlug, programSlug } = await params;
  const university = getUniversityBySlug(universitySlug);
  const program = university ? getProgramBySlug(university, programSlug) : null;

  if (!program) {
    return { title: 'Program Not Found' };
  }

  return {
    title: `${program.name} - ${university?.name} - NotesPitara`,
    description: `${program.description} Explore branches and notes for ${program.name} at ${university?.name}.`,
  };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { universitySlug, programSlug } = await params;
  const university = getUniversityBySlug(universitySlug);

  if (!university) {
    notFound();
  }

  const program = getProgramBySlug(university, programSlug);

  if (!program) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <Section className="pt-8 md:pt-12 lg:pt-16">
          <Container>
            <Breadcrumb
              items={[
                { label: 'Explore', href: '/explore' },
                { label: university.name, href: `/university/${university.slug}` },
                { label: program.name },
              ]}
            />

            <div className="mb-8">
              <PageHeader
                title={program.name}
                subtitle={program.description}
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-8">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-semibold">{program.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookMarked className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Branches</p>
                    <p className="font-semibold">{program.totalBranches}</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">University</p>
                  <p className="font-semibold">{university.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Notes</p>
                  <p className="text-2xl font-bold text-accent">{program.totalNotes.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="py-12 md:py-16 bg-muted/40">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Specializations</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {program.branches.map((branch) => (
                <BranchCard
                  key={branch.id}
                  branch={branch}
                  universitySlug={university.slug}
                  programSlug={program.slug}
                />
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
