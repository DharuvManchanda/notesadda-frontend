import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { NoteCard } from '@/components/cards/NoteCard';
import { getNoteById, getNotePathInfo, universities } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Bookmark, Share2, Star, User, Calendar, FileText } from 'lucide-react';
import { formatDistanceToNow, formatDate } from 'date-fns';

interface NotePageProps {
  params: Promise<{
    noteId: string;
  }>;
}

export async function generateStaticParams() {
  // Return empty array to avoid generating thousands of static pages at build time.
  // Pages will be rendered on-demand (SSR) when accessed.
  return [];
}

export async function generateMetadata({ params }: NotePageProps) {
  const { noteId } = await params;
  const note = getNoteById(noteId);

  if (!note) {
    return { title: 'Note Not Found' };
  }

  return {
    title: `${note.title} - NotesPitara`,
    description: `Downloaded by ${note.downloads} students. Uploaded by ${note.uploadedBy.name}. Rating: ${note.rating}/5`,
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { noteId } = await params;
  const note = getNoteById(noteId);

  if (!note) {
    notFound();
  }

  // Find the subject this note belongs to
  let subjectInfo: { universitySlug: string; programSlug: string; branchSlug: string; semesterNumber: number; subjectSlug: string } | null = null;

  for (const university of universities) {
    for (const program of university.programs) {
      for (const branch of program.branches) {
        for (const semester of branch.semesters) {
          for (const subject of semester.subjects) {
            if (subject.notes.some((n) => n.id === noteId)) {
              subjectInfo = {
                universitySlug: university.slug,
                programSlug: program.slug,
                branchSlug: branch.slug,
                semesterNumber: semester.number,
                subjectSlug: subject.slug,
              };
              break;
            }
          }
        }
      }
    }
  }

  // Get related notes from the same subject
  let relatedNotes: any[] = [];
  if (subjectInfo) {
    const university = universities.find((u) => u.slug === subjectInfo.universitySlug);
    const program = university?.programs.find((p) => p.slug === subjectInfo.programSlug);
    const branch = program?.branches.find((b) => b.slug === subjectInfo.branchSlug);
    const semester = branch?.semesters.find((s) => s.number === subjectInfo.semesterNumber);
    const subject = semester?.subjects.find((s) => s.slug === subjectInfo.subjectSlug);
    relatedNotes = subject?.notes.filter((n) => n.id !== noteId).slice(0, 3) || [];
  }

  return (
    <>
      <Header />
      <main>
        <Section className="pt-8 md:pt-12 lg:pt-16">
          <Container>
            <Breadcrumb
              items={[
                { label: 'Explore', href: '/explore' },
                ...(subjectInfo
                  ? [
                    {
                      label: 'Universities',
                      href: `/university/${subjectInfo.universitySlug}`,
                    },
                    {
                      label: 'Programs',
                      href: `/university/${subjectInfo.universitySlug}/${subjectInfo.programSlug}`,
                    },
                    {
                      label: 'Branches',
                      href: `/university/${subjectInfo.universitySlug}/${subjectInfo.programSlug}/${subjectInfo.branchSlug}`,
                    },
                  ]
                  : []),
                { label: note.title },
              ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="rounded-xl bg-card border border-border p-8 mb-8">
                  <div className="mb-4">
                    <Badge className="mb-3">{note.fileType.toUpperCase()}</Badge>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{note.title}</h1>
                    <p className="text-lg text-muted-foreground mb-6">{note.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 py-6 border-y border-border">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="font-semibold">{note.rating}/5</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Download className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Downloads</p>
                        <p className="font-semibold">{note.downloads.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">File Size</p>
                        <p className="font-semibold">{note.fileSize}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-secondary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Uploaded</p>
                        <p className="font-semibold text-sm">
                          {formatDistanceToNow(new Date(note.uploadedAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Uploader Info */}
                <div className="rounded-xl bg-muted/40 border border-border p-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{note.uploadedBy.name}</h3>
                      <p className="text-sm text-muted-foreground">{note.uploadedBy.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {note.uploadedBy.uploadedNotesCount} notes uploaded
                      </p>
                    </div>
                  </div>
                </div>

                {/* PDF Preview Placeholder */}
                <div className="rounded-xl bg-muted/60 border border-border p-16 flex items-center justify-center mb-8">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">PDF Preview</p>
                    <p className="text-sm text-muted-foreground">Preview not available in demo</p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="rounded-xl bg-card border border-border p-6 sticky top-24">
                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <Download className="h-4 w-4 mr-2" />
                      Download Note
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save to Bookmarks
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Note
                    </Button>
                  </div>

                  {subjectInfo && (
                    <div className="mt-6 pt-6 border-t">
                      <p className="text-sm text-muted-foreground font-semibold mb-3">Located in:</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">University: {subjectInfo.universitySlug}</p>
                        <p className="text-muted-foreground">Program: {subjectInfo.programSlug}</p>
                        <p className="text-muted-foreground">Branch: {subjectInfo.branchSlug}</p>
                        <p className="text-muted-foreground">Semester: {subjectInfo.semesterNumber}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Related Notes */}
        {relatedNotes.length > 0 && (
          <Section className="py-12 md:py-16 bg-muted/40">
            <Container>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Related Notes</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedNotes.map((relatedNote) => (
                  <NoteCard key={relatedNote.id} note={relatedNote} />
                ))}
              </div>
            </Container>
          </Section>
        )}
      </main>
      <Footer />
    </>
  );
}
