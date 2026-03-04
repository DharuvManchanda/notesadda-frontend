'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { universities } from '@/lib/mockData';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'code', label: 'Code' },
  { key: 'semester', label: 'Semester' },
  { key: 'notes', label: 'Notes' },
];

export default function SubjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const tableData = universities
    .flatMap((uni) =>
      uni.programs.flatMap((prog) =>
        prog.branches.flatMap((branch) =>
          branch.semesters.flatMap((semester) =>
            semester.subjects.map((subject) => ({
              id: subject.id,
              name: subject.name,
              code: subject.code,
              semester: semester.number,
              notes: subject.notes.length,
            }))
          )
        )
      )
    )
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader
          title="Subjects"
          description="Manage subjects and courses"
          searchPlaceholder="Search subjects..."
          onSearch={setSearchTerm}
          onAdd={() => console.log('Add subject')}
          addButtonLabel="Add Subject"
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
