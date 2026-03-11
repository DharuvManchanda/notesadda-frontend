import type { Metadata } from 'next';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Admin Dashboard - NotesPitara',
  description: 'Admin dashboard for managing NotesPitara platform',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['ROLE_UNIVERSITY_ADMIN', 'ROLE_SUPER_ADMIN']}>
      {children}
    </ProtectedRoute>
  );
}
