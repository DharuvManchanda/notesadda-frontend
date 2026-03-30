import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { UniversitiesList } from '@/components/shared/UniversitiesList';

export const metadata = {
  title: 'Explore Notes – Find Notes by Subject, Semester & University',
  description: 'Explore structured academic notes by university, program, branch, semester, and subject. Quickly find reliable notes uploaded by students.',
  alternates: {
    canonical: 'https://notespitara.com/explore',
  },
};

export default function ExplorePage() {
  return (
    <>
      <main>
        <Section className="pt-8 md:pt-12 lg:pt-16">
          <Container>
            <PageHeader
              title="Explore Universities"
              subtitle="Discover academic programs and study materials from top institutions around the world"
            />

            <UniversitiesList />
          </Container>
        </Section>
      </main>
    </>
  );
}
