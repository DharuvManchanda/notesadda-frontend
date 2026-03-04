import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - StudyHub',
  description: 'Your StudyHub dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
