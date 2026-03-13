'use client';

import { use } from 'react';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { BranchCard } from '@/components/cards/BranchCard';
import { notFound } from 'next/navigation';
import { Clock, BookMarked } from 'lucide-react';
import { notespitaraApi } from '@/store/services/notespitara';
import { PageLoader } from '@/components/ui/PageLoader';
import { formatSlug } from '@/lib/utils';

interface ProgramPageProps {
  params: Promise<{
    universitySlug: string;
    programSlug: string;
  }>;
}

export default function ProgramPage({ params }: ProgramPageProps) {
  // Unwrap params
  const { universitySlug, programSlug } = use(params);

  const { data: progResponse, isLoading: isProgLoading } = notespitaraApi.useGetProgramBySlugQuery({
    slug: programSlug,
  });
  const program = (progResponse as any)?.data;

  // 3. Fetch Branches for that program
  const { data: branchData, isLoading: isBranchLoading } = notespitaraApi.useGetBranchesByProgramQuery(
    {
      id: program?.id || '',
      page: 0,
      size: 50,
    },
    { skip: !program?.id }
  );

  if (isProgLoading) return <PageLoader />;
  if (!program) return notFound();

  return (
    <>
      <main>
        <Section className="pt-8 md:pt-12 lg:pt-16">
          <Container>
            <Breadcrumb
              items={[
                { label: 'Explore', href: '/explore' },
                { label: formatSlug(universitySlug), href: `/university/${universitySlug}` },
                { label: program.name },
              ]}
            />

            <div className="mb-8">
              <PageHeader
                title={program.name}
                subtitle={program.description}
              />

              <div className="mt-8 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-start gap-2 rounded-lg border border-border/60 bg-card/60 p-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-semibold">{program.type}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 rounded-lg border border-border/60 bg-card/60 p-3">
                  <BookMarked className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Branches</p>
                    <p className="font-semibold">{program.branchesCountTotal || 0}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-border/60 bg-card/60 p-3">
                  <p className="text-muted-foreground">University</p>
                  <p className="break-words font-semibold">{formatSlug(universitySlug)}</p>
                </div>
                {/* <div>
                  <p className="text-muted-foreground">Total Notes</p>
                  <p className="text-2xl font-bold text-accent">{program.totalNotes.toLocaleString()}</p>
                </div> */}
              </div>
            </div>
          </Container>
        </Section>

        <Section className="py-12 md:py-16 bg-muted/40">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Specializations</h2>

            {isBranchLoading ? (
              <div className="flex justify-center py-8"><PageLoader /></div>
            ) : (branchData as any)?.data?.branches?.content?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(branchData as any).data.branches.content.map((branch: any) => (
                  <BranchCard
                    key={branch.id}
                    branch={branch}
                    universitySlug={universitySlug}
                    programSlug={program.slug}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground border rounded-lg bg-card">
                No branches found for this program.
              </div>
            )}
          </Container>
        </Section>
      </main>
    </>
  );
}
