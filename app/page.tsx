import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { SearchBar } from '@/components/shared/SearchBar';
import { UniversityCard } from '@/components/cards/UniversityCard';
import { NoteCard } from '@/components/cards/NoteCard';
import { Button } from '@/components/ui/button';
import { universities } from '@/lib/mockData';
import Link from 'next/link';
import { BookOpen, Search, Share2, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'StudyHub - Share and Discover College Notes',
  description: 'A modern platform for college students to share, discover, and learn from notes across universities and programs.',
};

export default function HomePage() {
  // Get featured universities (first 3)
  const featuredUniversities = universities.slice(0, 3);

  // Get trending notes from all universities
  const trendingNotes = universities
    .flatMap((uni) =>
      uni.programs.flatMap((prog) =>
        prog.branches.flatMap((branch) =>
          branch.semesters.flatMap((sem) => sem.subjects.flatMap((subj) => subj.notes))
        )
      )
    )
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Section className="pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">
                Share and Discover <span className="text-primary">College Notes</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Join thousands of students collaborating and sharing academic notes across universities and programs. Find the perfect study materials for your courses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/explore">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore Notes
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Upload Notes
                </Button>
              </div>

              <div className="flex justify-center mb-12">
                <SearchBar className="max-w-full" />
              </div>

              <div className="grid grid-cols-3 gap-4 md:gap-8 text-center text-sm">
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-primary">{universities.length}</p>
                  <p className="text-muted-foreground">Universities</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-secondary">
                    {universities.reduce((sum, uni) => sum + uni.totalPrograms, 0)}
                  </p>
                  <p className="text-muted-foreground">Programs</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-accent">
                    {universities.reduce((sum, uni) => sum + uni.totalNotes, 0).toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">Notes</p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Featured Universities */}
        <Section className="py-12 md:py-16 bg-muted/40">
          <Container>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Universities</h2>
              <p className="text-muted-foreground">Explore top institutions and their academic programs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredUniversities.map((uni) => (
                <UniversityCard key={uni.id} university={uni} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/explore">
                <Button variant="outline">View All Universities</Button>
              </Link>
            </div>
          </Container>
        </Section>

        {/* Trending Notes */}
        <Section className="py-12 md:py-16">
          <Container>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-6 w-6 text-accent" />
                <h2 className="text-3xl md:text-4xl font-bold">Trending Notes</h2>
              </div>
              <p className="text-muted-foreground">Most downloaded and highly rated study materials</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {trendingNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </Container>
        </Section>

        {/* How It Works */}
        <Section className="py-12 md:py-16 bg-muted/40">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How StudyHub Works</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Search & Explore</h3>
                  <p className="text-muted-foreground">
                    Browse through notes organized by university, program, semester, and subject.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Study & Download</h3>
                  <p className="text-muted-foreground">
                    Download high-quality notes and study materials from verified contributors.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Share2 className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Share & Contribute</h3>
                  <p className="text-muted-foreground">
                    Upload your notes and help other students succeed in their studies.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section className="py-12 md:py-16">
          <Container>
            <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our community of students sharing and discovering the best study materials for their courses.
              </p>
              <Link href="/explore">
                <Button size="lg">Explore All Notes</Button>
              </Link>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
