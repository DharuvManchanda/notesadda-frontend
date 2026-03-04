import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatCard } from '@/components/admin/StatCard';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Layers, BookOpen, FileText, Users, Clock, Check, X } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard - StudyHub',
  description: 'Admin dashboard for managing universities, programs, subjects, and notes',
};

const STATS = [
  { label: 'Total Universities', value: 25, icon: Building2, trend: { value: 12, isPositive: true } },
  { label: 'Total Programs', value: 156, icon: Layers, trend: { value: 8, isPositive: true } },
  { label: 'Total Subjects', value: 1250, icon: BookOpen, trend: { value: 15, isPositive: true } },
  { label: 'Total Notes', value: 4890, icon: FileText, trend: { value: 20, isPositive: true } },
  { label: 'Total Users', value: 8420, icon: Users, trend: { value: 5, isPositive: true } },
  { label: 'Pending Approvals', value: 34, icon: Clock },
];

const RECENT_UPLOADS = [
  {
    id: 1,
    title: 'Advanced Calculus - Chapter 5 Notes',
    university: 'Stanford University',
    subject: 'Mathematics',
    uploadedBy: 'John Doe',
    date: '2024-03-01',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Quantum Physics - Lecture 3',
    university: 'MIT',
    subject: 'Physics',
    uploadedBy: 'Jane Smith',
    date: '2024-03-01',
    status: 'Approved',
  },
  {
    id: 3,
    title: 'Organic Chemistry - Reactions Summary',
    university: 'Harvard University',
    subject: 'Chemistry',
    uploadedBy: 'Mike Johnson',
    date: '2024-02-28',
    status: 'Pending',
  },
];

export default function AdminDashboard() {
  const tableColumns = [
    { key: 'title', label: 'Title' },
    { key: 'university', label: 'University' },
    { key: 'subject', label: 'Subject' },
    { key: 'uploadedBy', label: 'Uploaded By' },
    { key: 'date', label: 'Date' },
    {
      key: 'status',
      label: 'Status',
      render: (status: string) => (
        <Badge variant={status === 'Approved' ? 'secondary' : 'default'} className="text-xs">
          {status}
        </Badge>
      ),
    },
  ];

  const tableActions = (row: any) => (
    <div className="flex gap-2">
      <Button size="sm" variant="ghost" className="text-primary">
        <Check className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost" className="text-destructive">
        <X className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <AdminLayout adminName="Admin">
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Recent Uploads Table */}
        <DataTable
          title="Recent Uploads"
          columns={tableColumns}
          data={RECENT_UPLOADS}
          actions={tableActions}
        />
      </div>
    </AdminLayout>
  );
}
