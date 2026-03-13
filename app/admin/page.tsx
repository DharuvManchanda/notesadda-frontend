import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboardContent } from '@/components/admin/AdminDashboardContent';

export const metadata = {
  title: 'Admin Dashboard - NotesPitara',
  description: 'Admin dashboard for managing universities, programs, subjects, and notes',
};

export default function AdminDashboard() {
  return (
    <AdminLayout adminName="Admin">
      <AdminDashboardContent />
    </AdminLayout>
  );
}
