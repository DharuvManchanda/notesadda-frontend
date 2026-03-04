'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { universities } from '@/lib/mockData';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'uploads', label: 'Uploads' },
  { key: 'joinedDate', label: 'Joined' },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const userMap = new Map();

  universities.forEach((uni) => {
    uni.programs.forEach((prog) => {
      prog.branches.forEach((branch) => {
        branch.semesters.forEach((semester) => {
          semester.subjects.forEach((subject) => {
            subject.notes.forEach((note) => {
              const userId = note.uploadedBy.id;
              if (!userMap.has(userId)) {
                userMap.set(userId, {
                  id: userId,
                  name: note.uploadedBy.name,
                  email: note.uploadedBy.email,
                  uploads: 0,
                  joinedDate: '2024-01-15',
                });
              }
              const user = userMap.get(userId);
              user.uploads += 1;
            });
          });
        });
      });
    });
  });

  const tableData = Array.from(userMap.values())
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader
          title="Users"
          description="Manage platform users"
          searchPlaceholder="Search users..."
          onSearch={setSearchTerm}
          onAdd={() => console.log('Add user')}
          addButtonLabel="Add User"
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
