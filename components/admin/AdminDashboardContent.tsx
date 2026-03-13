'use client';

import { useMemo, useState } from 'react';
import { StatCard } from '@/components/admin/StatCard';
import { DataTable } from '@/components/shared/DataTable';
import { ConfirmDeletePopover } from '@/components/shared/ConfirmDeletePopover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { notespitaraApi } from '@/store/services/notespitara';
import {
  Building2,
  Layers,
  BookOpen,
  FileText,
  Users,
  Clock,
  Check,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

const STATS = [
  { label: 'Total Universities', value: 25, icon: Building2, trend: { value: 12, isPositive: true } },
  { label: 'Total Programs', value: 156, icon: Layers, trend: { value: 8, isPositive: true } },
  { label: 'Total Subjects', value: 1250, icon: BookOpen, trend: { value: 15, isPositive: true } },
  { label: 'Total Notes', value: 4890, icon: FileText, trend: { value: 20, isPositive: true } },
  { label: 'Total Users', value: 8420, icon: Users, trend: { value: 5, isPositive: true } },
  { label: 'Pending Approvals', value: 34, icon: Clock },
];

function formatDate(dateValue?: string) {
  if (!dateValue) return '-';

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return '-';

  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function AdminDashboardContent() {
  const [deletePopoverId, setDeletePopoverId] = useState<string | null>(null);
  const { data: notesData, isLoading, refetch } =
    notespitaraApi.useGetAllNotesForAdminQuery({
      page: 0,
      size: 5,
    });
  const [deleteNote, { isLoading: isDeleting }] =
    notespitaraApi.useDeleteNotesMutation();

  const recentUploads = useMemo(() => {
    const notesResponse = (notesData as any)?.data;
    return (notesResponse?.content ?? []).map((note: any) => ({
      id: note.id,
      title: note.title || 'Untitled Note',
      university: note.universityName || '-',
      subject: note.subjectName || note.subjectId || '-',
      uploadedBy: note.uploaderName || 'Unknown',
      date: formatDate(note.createdAt),
      status: note.isApproved ? 'Approved' : note.rejectionNote ? 'Rejected' : 'Pending',
    }));
  }, [notesData]);

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
        <Badge
          variant={status === 'Approved' ? 'secondary' : 'default'}
          className="text-xs"
        >
          {status}
        </Badge>
      ),
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      await deleteNote({ id }).unwrap();
      toast.success('Note deleted successfully');
      setDeletePopoverId(null);
      refetch();
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note. Please try again.');
    }
  };

  const tableActions = (row: any) => (
    <div className="flex gap-2">
      <Button size="sm" variant="ghost" className="text-primary" disabled>
        <Check className="h-4 w-4" />
      </Button>
      <ConfirmDeletePopover
        open={deletePopoverId === row.id}
        onOpenChange={(open) => setDeletePopoverId(open ? row.id : null)}
        onConfirm={() => handleDelete(row.id)}
        isLoading={isDeleting && deletePopoverId === row.id}
        title="Delete this note?"
      >
        <Button size="sm" variant="ghost" className="text-destructive">
          <X className="h-4 w-4" />
        </Button>
      </ConfirmDeletePopover>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      <DataTable
        title="Recent Uploads"
        columns={tableColumns}
        data={isLoading ? [] : recentUploads}
        actions={tableActions}
      />
    </div>
  );
}
