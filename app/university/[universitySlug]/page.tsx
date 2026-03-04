import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { InfoGrid } from '@/components/shared/InfoGrid';
import { CardGrid } from '@/components/shared/CardGrid';
import { ProgramCard } from '@/components/cards/ProgramCard';
import { getUniversityBySlug, universities } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import { MapPin, Calendar } from 'lucide-react';

interface UniversityPageProps {
  params: Promise<{
    universitySlug: string;
  }>;
}

export async function generateStaticParams() {
  return universities.map((uni) => ({
    universitySlug: uni.slug,
  }));
}

export async function generateMetadata({ params }: UniversityPageProps) {
  const { universitySlug } = await params;
  const university = getUniversityBySlug(universitySlug);

  if (!university) {
    return { title: 'University Not Found' };
  }

  return {
    title: `${university.name} - StudyHub`,
    description: `${university.description} Browse programs and notes from ${university.name}.`,
  };
}

export default async function UniversityPage({ params }: UniversityPageProps) {
  const { universitySlug } = await params;
  const university = getUniversityBySlug(universitySlug);

  if (!university) {
    notFound();
  }

  const infoItems = [
    { icon: <MapPin className="h-4 w-4" />, label: 'Location', value: university.location },
    { icon: <Calendar className="h-4 w-4" />, label: 'Founded', value: university.foundedYear },
    { label: 'Programs', value: university.totalPrograms },
    { label: 'Total Notes', value: university.totalNotes.toLocaleString() },
  ];

  return (
    <>
      <Header />
      <main>
        <Section className="pt-8 md:pt-12 lg:pt-16">
          <Container>
            <Breadcrumb
              items={[
                { label: 'Explore', href: '/explore' },
                { label: university.name },
              ]}
            />

            <div className="mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">{university.name.charAt(0)}</span>
                </div>
                <div>
                  <PageHeader
                    title={university.name}
                    subtitle={university.description}
                    className="mb-0"
                  />
                </div>
              </div>

              <InfoGrid items={infoItems} columns={4} />
            </div>
          </Container>
        </Section>

        <Section className="py-12 md:py-16 bg-muted/40">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Programs</h2>
            <CardGrid columns="md">
              {university.programs.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  universitySlug={university.slug}
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
