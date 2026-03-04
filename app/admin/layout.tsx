import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - StudyHub',
  description: 'Admin dashboard for managing StudyHub platform',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
