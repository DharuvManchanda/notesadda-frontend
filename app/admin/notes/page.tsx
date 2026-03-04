'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { universities } from '@/lib/mockData';

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'subject', label: 'Subject' },
  { key: 'uploadedBy', label: 'Uploaded By' },
  { key: 'downloads', label: 'Downloads' },
];

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const tableData = universities
    .flatMap((uni) =>
      uni.programs.flatMap((prog) =>
        prog.branches.flatMap((branch) =>
          branch.semesters.flatMap((semester) =>
            semester.subjects.flatMap((subject) =>
              subject.notes.map((note) => ({
                id: note.id,
                title: note.title,
                subject: subject.name,
                uploadedBy: note.uploadedBy.name,
                downloads: note.downloads,
              }))
            )
          )
        )
      )
    )
    .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader
          title="Notes"
          description="Manage all uploaded notes"
          searchPlaceholder="Search notes..."
          onSearch={setSearchTerm}
          onAdd={() => console.log('Add note')}
          addButtonLabel="Add Note"
        />

        <div className="px-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <AdminTable
              columns={columns}
              data={tableData}
              onEdit={(id) => console.log('Edit', id)}
              onDelete={(id) => console.log('Delete', id)}
              onView={(id) => console.log('View', id)}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
