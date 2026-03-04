import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { UniversityCard } from '@/components/cards/UniversityCard';
import { universities } from '@/lib/mockData';

export const metadata = {
  title: 'Explore Universities - StudyHub',
  description: 'Browse all universities and their academic programs available on StudyHub.',
};

export default function ExplorePage() {
  return (
    <>
      <Header />
      <main>
        <Section className="pt-8 md:pt-12 lg:pt-16">
          <Container>
            <PageHeader
              title="Explore Universities"
              subtitle="Discover academic programs and study materials from top institutions around the world"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map((university) => (
                <UniversityCard key={university.id} university={university} />
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
