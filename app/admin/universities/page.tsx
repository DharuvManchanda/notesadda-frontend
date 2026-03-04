'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { universities } from '@/lib/mockData';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'location', label: 'Location' },
  { key: 'programs', label: 'Programs' },
  { key: 'notes', label: 'Notes' },
];

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const tableData = universities
    .filter((uni) => uni.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((uni) => ({
      id: uni.id,
      name: uni.name,
      location: `${uni.city}, ${uni.country}`,
      programs: uni.programs.length,
      notes: uni.programs.reduce((sum, p) => sum + p.totalNotes, 0),
    }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader
          title="Universities"
          description="Manage universities in the system"
          searchPlaceholder="Search universities..."
          onSearch={setSearchTerm}
          onAdd={() => console.log('Add university')}
          addButtonLabel="Add University"
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
