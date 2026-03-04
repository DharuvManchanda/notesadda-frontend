'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { universities } from '@/lib/mockData';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'university', label: 'University' },
  { key: 'branches', label: 'Branches' },
  { key: 'duration', label: 'Duration' },
];

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const tableData = universities
    .flatMap((uni) =>
      uni.programs.map((prog) => ({
        id: prog.id,
        name: prog.name,
        university: uni.name,
        branches: prog.branches.length,
        duration: '4 Years',
      }))
    )
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader
          title="Programs"
          description="Manage academic programs"
          searchPlaceholder="Search programs..."
          onSearch={setSearchTerm}
          onAdd={() => console.log('Add program')}
          addButtonLabel="Add Program"
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
