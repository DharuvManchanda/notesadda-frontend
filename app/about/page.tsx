import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Button } from '@/components/ui/button';
import { BookOpen, FolderTree, Users, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'About Notes Pitara – Structured Academic Notes Platform',
  description: 'Learn about Notes Pitara, a platform built to organize academic knowledge into a structured repository. Our mission is to make student notes accessible, searchable, and reusable.',
  alternates: {
    canonical: 'https://notespitara.com/about',
  },
};

const beliefs = [
  {
    title: 'Knowledge Should Be Shared',
    description:
      'When students share notes, everyone benefits from collective learning.',
    icon: Users,
  },
  {
    title: 'Structure Matters',
    description:
      'Academic content should follow the structure students already understand: their university syllabus.',
    icon: FolderTree,
  },
  {
    title: 'Students Build the Best Resources',
    description:
      'Some of the best notes come from students who have recently studied the subject.',
    icon: BookOpen,
  },
];

const futurePlans = [
  'AI-powered summaries',
  'Important exam questions',
  'Flashcards and revision tools',
  'Academic discussions',
  'Study communities',
];

export default function AboutPage() {
  return (
    <main>
      <Section className="pt-8 md:pt-12 lg:pt-16">
        <Container>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
          <PageHeader
            title="About the Platform"
            subtitle="Our mission is simple: make academic knowledge easier to discover, share, and access for students everywhere."
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8">
              <section className="flex flex-col items-start gap-4 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center">
                <img
                  src="/notespitara.jpg"
                  alt="Notes Pitara logo"
                  className="h-20 w-20 rounded-2xl object-cover shadow-sm ring-1 ring-border/60 sm:h-24 sm:w-24"
                />
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                    Notes Pitara
                  </p>
                  <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                    A structured academic platform built to help students discover, share,
                    and reuse the study resources that usually get lost in private folders
                    and temporary links.
                  </p>
                </div>
              </section>

              <section className="rounded-2xl border bg-card p-6">
                <h2 className="mb-4 text-2xl font-bold">The Idea</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Every semester students create valuable study materials, but most of it
                    stays hidden inside personal folders, WhatsApp groups, or temporary links.
                  </p>
                  <p>
                    Students often struggle with finding reliable notes for their subjects,
                    even within the same college. Resources are fragmented, inconsistent,
                    and difficult to access when they are needed most.
                  </p>
                  <p>
                    We built this platform to solve that problem by organizing academic
                    content in the same way universities structure their curriculum:
                  </p>
                  <p className="font-medium text-foreground">
                    University -&gt; Program -&gt; Branch -&gt; Semester -&gt; Subject
                  </p>
                  <p>
                    This transforms scattered resources into a structured academic repository
                    where students can quickly find the exact study material they need.
                  </p>
                </div>
              </section>

              <section className="rounded-2xl border bg-card p-6">
                <h2 className="mb-4 text-2xl font-bold">What We Believe</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {beliefs.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-xl border border-border/60 bg-background p-5">
                        <Icon className="mb-3 h-6 w-6 text-primary" />
                        <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="rounded-2xl border bg-card p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mb-3 text-2xl font-bold">Our Goal</h2>
                <p className="text-muted-foreground">
                  Our long-term goal is to create the largest structured academic repository
                  for students, where anyone can easily access quality study resources.
                </p>
              </section>

              <section className="rounded-2xl border bg-card p-6">
                <h2 className="mb-4 text-xl font-bold">What&apos;s Next</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {futurePlans.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
                <h2 className="mb-3 text-2xl font-bold">Explore the Platform</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  Start discovering structured academic notes or contribute your own resources.
                </p>
                <div className="flex flex-col gap-3">
                  <Link href="/explore">
                    <Button className="w-full">Explore Notes</Button>
                  </Link>
                  <Link href="/upload">
                    <Button variant="outline" className="w-full">
                      Upload Notes
                    </Button>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
