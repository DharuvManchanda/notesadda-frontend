'use client';

import { use } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { InfoGrid } from '@/components/shared/InfoGrid';
import { CardGrid } from '@/components/shared/CardGrid';
import { SemesterCard } from '@/components/cards/SemesterCard';
import { notFound } from 'next/navigation';
import { BookMarked, Zap } from 'lucide-react';
import { notespitaraApi } from '@/store/services/notespitara';
import { PageLoader } from '@/components/ui/PageLoader';
import { formatSlug } from '@/lib/utils';

interface BranchPageProps {
  params: Promise<{
    universitySlug: string;
    programSlug: string;
    branchSlug: string;
  }>;
}

export default function BranchPage({ params }: BranchPageProps) {
  const { universitySlug, programSlug, branchSlug } = use(params);

  // 3. Fetch Branch
  const { data: branchResponse, isLoading: isBranchLoading } = notespitaraApi.useGetBranchBySlugQuery({ slug: branchSlug });
  const branch = (branchResponse as any)?.data;

  // 4. Fetch Semesters for the branch
  const { data: semesterData, isLoading: isSemLoading } = notespitaraApi.useGetSemestersByBranchQuery(
    { id: branch?.id || '', page: 0, size: 50 },
    { skip: !branch?.id }
  );

  if (isBranchLoading) return <PageLoader />;
  if (!branch) return notFound();

  const breadcrumbs = [
    { label: 'Explore', href: '/explore' },
    { label: formatSlug(universitySlug), href: `/university/${universitySlug}` },
    { label: formatSlug(programSlug), href: `/university/${universitySlug}/${programSlug}` },
    { label: branch.name }
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
                  { label: 'Program', value: formatSlug(programSlug) },
                  { icon: <BookMarked className="h-4 w-4" />, label: 'Semesters', value: branch.semestersCountTotal || 0 },
                  { label: 'University', value: formatSlug(universitySlug) },
                  // { label: 'Total Notes', value: branch.totalNotes.toLocaleString() },
                ]}
                columns={3}
              />
            </div>
          </Container>
        </Section>

        <Section className="py-12 md:py-16 bg-muted/40">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Semesters</h2>
            {isSemLoading ? (
              <div className="flex justify-center py-8"><PageLoader /></div>
            ) : (semesterData as any)?.data?.semesters?.content?.length ? (
              <CardGrid columns="lg">
                {(semesterData as any).data.semesters.content.map((semester: any) => (
                  <SemesterCard
                    key={semester.id}
                    semester={semester}
                    universitySlug={universitySlug}
                    programSlug={programSlug}
                    branchSlug={branch.slug}
                  />
                ))}
              </CardGrid>
            ) : (
              <div className="text-center py-8 text-muted-foreground border rounded-lg bg-card">
                No semesters found for this branch.
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
