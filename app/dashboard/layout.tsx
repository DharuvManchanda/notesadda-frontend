import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - NotesPitara',
  description: 'Your NotesPitara dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
