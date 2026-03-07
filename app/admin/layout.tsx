import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - NotesPitara',
  description: 'Admin dashboard for managing NotesPitara platform',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
