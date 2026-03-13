import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { SearchBar } from '@/components/shared/SearchBar';
import { FeaturedUniversities } from '@/components/home/FeaturedUniversities';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Share2,
  Building2,
  Sparkles,
  Users,
  FolderTree,
} from 'lucide-react';

export const metadata = {
  title: 'NotesPitara - Structured Academic Notes for Students',
  description:
    'Explore structured academic notes by university, program, branch, semester, and subject. Discover reliable notes and contribute your own.',
};

const howItWorks = [
  {
    title: 'Explore Your University',
    description:
      'Browse academic content structured exactly like your university curriculum: University -> Program -> Branch -> Semester -> Subject.',
    icon: Search,
  },
  {
    title: 'Discover Reliable Notes',
    description:
      'Access well-organized notes uploaded by fellow students, with subject context, contributor details, and quality signals.',
    icon: BookOpen,
  },
  {
    title: 'Contribute and Help Others',
    description:
      'Upload your own notes for any subject and become part of a growing academic knowledge community.',
    icon: Share2,
  },
];

const platformBenefits = [
  {
    title: 'Structured Learning',
    description:
      'Notes are organized by real academic hierarchies so you always find what you need.',
    icon: FolderTree,
  },
  {
    title: 'Fast Discovery',
    description:
      'Powerful search and filtering help you find subject-specific notes instantly.',
    icon: Sparkles,
  },
  {
    title: 'Peer Learning',
    description:
      'Learn from students across different colleges and universities through shared resources.',
    icon: Users,
  },
  {
    title: 'Always Growing',
    description:
      'Every semester the repository grows with new notes, study materials, and resources.',
    icon: Building2,
  },
];

const featuredHighlights = [
  {
    title: 'Featured Universities',
    description:
      'Browse notes from universities across different programs and branches where students actively contribute and share knowledge.',
  },
  {
    title: 'Trending Notes',
    description:
      'Discover the most downloaded and highest-rated notes uploaded by students and stay ahead during exams.',
  },
  {
    title: 'Built for Students',
    description:
      'Academic notes are often scattered across chats, drives, and private folders. We bring them together into one structured platform.',
  },
];

export default function HomePage() {
  return (
    <main>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.1]" />
        <Section className="pt-16 pb-12 md:pt-24 md:pb-16">
          <Container className="relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Structured Academic Repository
              </p>
              <h1 className="mb-6 text-4xl font-bold text-balance md:text-5xl lg:text-6xl">
                Find, Share, and Organize <span className="text-primary">Academic Notes</span>
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground text-balance md:text-xl">
                Browse structured academic content the way your university already works:
                University, Program, Branch, Semester, and Subject. Discover reliable notes
                without digging through scattered folders and chat threads.
              </p>

              <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/explore">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore Notes
                  </Button>
                </Link>
                <Link href="/upload">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Upload Notes
                  </Button>
                </Link>
              </div>

              <div className="mb-12 flex justify-center">
                <SearchBar className="max-w-full bg-background" />
              </div>
            </div>
          </Container>
        </Section>
      </div>

      <Section className="bg-muted/40 py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="text-muted-foreground">
              Find the right subject faster, discover reliable notes, and contribute
              to a shared academic knowledge base.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {howItWorks.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border bg-card p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="py-12 md:py-16">
        <Container>
          <div className="mb-12">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Why Students Use Our Platform</h2>
            <p className="max-w-3xl text-muted-foreground">
              The platform is built around the way students actually search for notes:
              by subject, semester, and university context.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {platformBenefits.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border bg-card p-6">
                  <Icon className="mb-4 h-6 w-6 text-primary" />
                  <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40 py-12 md:py-16">
        <Container>
          <div className="mb-12">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Featured Universities</h2>
            <p className="text-muted-foreground">
              Explore academic content from institutions where students actively contribute
              and share knowledge.
            </p>
          </div>

          <FeaturedUniversities />
        </Container>
      </Section>

      <Section className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {featuredHighlights.map((item) => (
              <div key={item.title} className="rounded-2xl border bg-card p-6">
                <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-12 md:py-16">
        <Container>
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Start Exploring Academic Notes Today
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Join a growing community of students building the largest structured
              repository of academic resources.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/explore">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Notes
                </Button>
              </Link>
              <Link href="/upload">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Upload Notes
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
