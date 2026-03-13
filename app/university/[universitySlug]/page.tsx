'use client';

import { use } from 'react';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { InfoGrid } from '@/components/shared/InfoGrid';
import { CardGrid } from '@/components/shared/CardGrid';
import { ProgramCard } from '@/components/cards/ProgramCard';
import { notFound } from 'next/navigation';
import { MapPin, Calendar } from 'lucide-react';
import { notespitaraApi } from '@/store/services/notespitara';
import { PageLoader } from '@/components/ui/PageLoader';

interface UniversityPageProps {
  params: Promise<{
    universitySlug: string;
  }>;
}

export default function UniversityPage({ params }: UniversityPageProps) {
  // Unwrap params
  const { universitySlug } = use(params);

  const { data: uniData, isLoading: isUniLoading } = notespitaraApi.useGetUniversityBySlugQuery({
    slug: universitySlug,
  });

  const university = (uniData as any)?.data;

  const { data: progData, isLoading: isProgLoading } = notespitaraApi.useGetProgramsByUniversityQuery(
    {
      id: university?.id || '',
      page: 0,
      size: 50, // Get a reasonable number of programs
    },
    { skip: !university?.id }
  );

  if (isUniLoading) return <PageLoader />;
  if (!university) return notFound();

  const infoItems = [
    { icon: <MapPin className="h-4 w-4" />, label: 'Location', value: university.city && university.state ? `${university.city}, ${university.state}` : 'N/A' },
    // { icon: <Calendar className="h-4 w-4" />, label: 'Founded', value: university.foundedYear },
    { label: 'Programs', value: (uniData as any)?.data?.programsCountTotal || 0 },
    // { label: 'Total Notes', value: university.totalNotes.toLocaleString() },
  ];

  return (
    <>
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

              <InfoGrid items={infoItems} columns={3} />
            </div>
          </Container>
        </Section>

        <Section className="py-12 md:py-16 bg-muted/40">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Programs</h2>
            {isProgLoading ? (
              <div className="flex justify-center py-8"><PageLoader /></div>
            ) : (progData as any)?.data?.programs?.content?.length ? (
              <CardGrid columns="md">
                {(progData as any).data.programs.content.map((program: any) => (
                  <ProgramCard
                    key={program.id}
                    program={program}
                    universitySlug={university.slug}
                  />
                ))}
              </CardGrid>
            ) : (
              <div className="text-center py-8 text-muted-foreground border rounded-lg bg-card">
                No programs found for this university.
              </div>
            )}
          </Container>
        </Section>
      </main>
    </>
  );
}
