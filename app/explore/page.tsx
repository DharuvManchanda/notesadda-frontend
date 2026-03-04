import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { UniversitiesList } from '@/components/shared/UniversitiesList';

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

            <UniversitiesList />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

