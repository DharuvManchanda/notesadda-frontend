import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { NoteCard } from '@/components/cards/NoteCard';
import { getNoteBySlug, getUniversityBySlug, getProgramBySlug, getBranchBySlug, getNoteById, universities } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Bookmark, Share2, Star, User, Calendar, FileText } from 'lucide-react';
import { formatDistanceToNow, formatDate } from 'date-fns';

interface NoteSEORouteProps {
  params: Promise<{
    universitySlug: string;
    programSlug: string;
    branchSlug: string;
    semesterSlug: string;
    subjectSlug: string;
    noteSlug: string;
  }>;
}

export async function generateStaticParams() {
  const params: Array<{
    universitySlug: string;
    programSlug: string;
    branchSlug: string;
    semesterSlug: string;
    subjectSlug: string;
    noteSlug: string;
  }> = [];

  universities.forEach((uni) => {
    uni.programs.forEach((prog) => {
      prog.branches.forEach((branch) => {
        branch.semesters.forEach((semester) => {
          semester.subjects.forEach((subject) => {
            subject.notes.forEach((note) => {
              params.push({
                universitySlug: uni.slug,
                programSlug: prog.slug,
                branchSlug: branch.slug,
                semesterSlug: `semester-${semester.number}`,
                subjectSlug: subject.slug,
                noteSlug: note.slug,
              });
            });
          });
        });
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: NoteSEORouteProps) {
  const { universitySlug, programSlug, branchSlug, semesterSlug, subjectSlug, noteSlug } = await params;
  const university = getUniversityBySlug(universitySlug);
  const program = university ? getProgramBySlug(university, programSlug) : null;
  const branch = program ? getBranchBySlug(program, branchSlug) : null;
  const semesterNumber = parseInt(semesterSlug.replace('semester-', ''), 10);
  const semester = branch?.semesters.find((s) => s.number === semesterNumber);
  const subject = semester?.subjects.find((s) => s.slug === subjectSlug);
  const note = subject ? getNoteBySlug(subject, noteSlug) : null;

  if (!note) {
    return { title: 'Note Not Found' };
  }

  return {
    title: `${note.title} - ${subject?.name} - StudyHub`,
    description: `Downloaded by ${note.downloads} students. Uploaded by ${note.uploadedBy.name}. Rating: ${note.rating}/5`,
    alternates: {
      canonical: `/note/${note.id}`,
    },
  };
}

export default async function NoteSEOPage({ params }: NoteSEORouteProps) {
  const { universitySlug, programSlug, branchSlug, semesterSlug, subjectSlug, noteSlug } = await params;
  const university = getUniversityBySlug(universitySlug);
  const program = university ? getProgramBySlug(university, programSlug) : null;
  const branch = program ? getBranchBySlug(program, branchSlug) : null;
  const semesterNumber = parseInt(semesterSlug.replace('semester-', ''), 10);
  const semester = branch?.semesters.find((s) => s.number === semesterNumber);
  const subject = semester?.subjects.find((s) => s.slug === subjectSlug);
  const note = subject ? getNoteBySlug(subject, noteSlug) : null;

  if (!note) {
    notFound();
  }

  // Get related notes from the same subject
  const relatedNotes = subject?.notes.filter((n) => n.id !== note.id).slice(0, 3) || [];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: university?.name || 'University', href: `/university/${universitySlug}` },
    { label: program?.name || 'Program', href: `/university/${universitySlug}/${programSlug}` },
    { label: branch?.name || 'Branch', href: `/university/${universitySlug}/${programSlug}/${branchSlug}` },
    { label: `Semester ${semester?.number}`, href: `/university/${universitySlug}/${programSlug}/${branchSlug}/${semesterSlug}` },
    { label: subject?.name || 'Subject', href: `/university/${universitySlug}/${programSlug}/${branchSlug}/${semesterSlug}/${subjectSlug}` },
    { label: note.title },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Container>
          <Section>
            <Breadcrumb items={breadcrumbItems} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <article className="space-y-8">
                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-2 text-balance">{note.title}</h1>
                        <p className="text-lg text-muted-foreground">{subject?.name}</p>
                      </div>
                      <Badge variant="secondary" className="whitespace-nowrap">
                        {note.fileType.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Downloads</p>
                      <p className="text-2xl font-bold">{note.downloads}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Rating</p>
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold">{note.rating}</span>
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">File Size</p>
                      <p className="text-2xl font-bold">{note.fileSize}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Uploaded</p>
                      <p className="text-sm font-medium">{formatDistanceToNow(note.uploadedAt, { addSuffix: true })}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4">About This Note</h2>
                    <p className="text-lg text-foreground leading-relaxed">{note.description}</p>
                  </div>

                  {/* Uploader Info */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Uploaded By</h3>
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{note.uploadedBy.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{note.uploadedBy.email}</p>
                        <p className="text-sm">
                          <span className="font-semibold">{note.uploadedBy.uploadedNotesCount}</span> notes uploaded
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Uploaded {formatDate(note.uploadedAt, 'PPP')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 flex-wrap">
                    <Button size="lg" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download Note
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2">
                      <Bookmark className="h-4 w-4" />
                      Save
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* File Preview */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <div className="h-40 bg-muted rounded-lg flex items-center justify-center">
                    <FileText className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">File Type</p>
                    <p className="font-semibold">{note.fileType.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Size</p>
                    <p className="font-semibold">{note.fileSize}</p>
                  </div>
                </div>

                {/* Related Notes */}
                {relatedNotes.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">Related Notes</h3>
                    <div className="space-y-3">
                      {relatedNotes.map((relatedNote) => (
                        <NoteCard
                          key={relatedNote.id}
                          note={relatedNote}
                          universitySlug={universitySlug}
                          programSlug={programSlug}
                          branchSlug={branchSlug}
                          semesterNumber={semester?.number || 1}
                          subjectSlug={subjectSlug}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Section>
        </Container>
      </main>
      <Footer />

      {/* Canonical Link */}
      <link rel="canonical" href={`/note/${note.id}`} />
    </div>
  );
}
