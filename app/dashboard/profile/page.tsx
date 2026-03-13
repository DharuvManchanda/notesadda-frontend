import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Button } from '@/components/ui/button';
import { User, Download, Bookmark, Upload, Calendar } from 'lucide-react';

export const metadata = {
  title: 'My Profile - NotesPitara',
  description: 'View your profile and uploaded notes',
};

const userProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  university: 'Stanford University',
  program: 'Bachelor of Technology',
  branch: 'Computer Science',
  joinedDate: 'January 15, 2024',
  avatar: null,
};

const stats = [
  { label: 'Total Uploads', value: 12, icon: Upload },
  { label: 'Total Downloads', value: 456, icon: Download },
  { label: 'Saved Notes', value: 23, icon: Bookmark },
];

const uploadedNotes = [
  {
    id: 1,
    title: 'Data Structures - Chapter 3',
    subject: 'Data Structures',
    downloads: 45,
    status: 'Approved',
    uploadedDate: '2024-02-28',
  },
  {
    id: 2,
    title: 'Algorithms - Sorting',
    subject: 'Algorithms',
    downloads: 32,
    status: 'Approved',
    uploadedDate: '2024-02-20',
  },
  {
    id: 3,
    title: 'Database Design - Normalization',
    subject: 'Databases',
    downloads: 0,
    status: 'Pending',
    uploadedDate: '2024-03-01',
  },
];

export default function ProfilePage() {
  return (
    <>
      <main>
        <Section className="pt-8 md:pt-12 lg:pt-16 pb-12 md:pb-16 lg:pb-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                    <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                  </div>
                  <div className="space-y-3 text-sm border-t border-border pt-4">
                    <div>
                      <p className="text-muted-foreground">University</p>
                      <p className="font-medium">{userProfile.university}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Program</p>
                      <p className="font-medium">{userProfile.program}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Branch</p>
                      <p className="font-medium">{userProfile.branch}</p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <p>Joined {userProfile.joinedDate}</p>
                    </div>
                  </div>
                  <Button className="w-full">Edit Profile</Button>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="bg-card border border-border rounded-lg p-4 text-center">
                        <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Uploaded Notes */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-border">
                    <h3 className="text-lg font-bold">Your Uploaded Notes</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50 border-b border-border">
                        <tr>
                          <th className="px-6 py-3 text-left font-semibold">Title</th>
                          <th className="px-6 py-3 text-left font-semibold">Subject</th>
                          <th className="px-6 py-3 text-left font-semibold">Downloads</th>
                          <th className="px-6 py-3 text-left font-semibold">Status</th>
                          <th className="px-6 py-3 text-left font-semibold">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {uploadedNotes.map((note) => (
                          <tr key={note.id} className="hover:bg-muted/50 transition-colors">
                            <td className="px-6 py-3 font-medium">{note.title}</td>
                            <td className="px-6 py-3 text-muted-foreground">{note.subject}</td>
                            <td className="px-6 py-3 text-muted-foreground">{note.downloads}</td>
                            <td className="px-6 py-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  note.status === 'Approved'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {note.status}
                              </span>
                            </td>
                            <td className="px-6 py-3 text-muted-foreground">{note.uploadedDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
