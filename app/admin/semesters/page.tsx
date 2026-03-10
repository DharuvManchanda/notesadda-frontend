'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AddSemesterForm } from '@/components/admin/forms/AddSemesterForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Eye } from 'lucide-react';

// Mock data
const mockBranches = [
  { id: '1', name: 'Computer Science Engineering' },
  { id: '2', name: 'Electronics Engineering' },
  { id: '3', name: 'Mechanical Engineering' },
];

const mockSemesters = [
  {
    id: '1',
    number: 1,
    branchId: '1',
    branchName: 'Computer Science Engineering',
    subjects: 6,
  },
  {
    id: '2',
    number: 2,
    branchId: '1',
    branchName: 'Computer Science Engineering',
    subjects: 6,
  },
  {
    id: '3',
    number: 3,
    branchId: '1',
    branchName: 'Computer Science Engineering',
    subjects: 5,
  },
  {
    id: '4',
    number: 1,
    branchId: '2',
    branchName: 'Electronics Engineering',
    subjects: 6,
  },
];

export default function SemestersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [semesters, setSemesters] = useState(mockSemesters);
  const [openDialog, setOpenDialog] = useState(false);

  const filteredSemesters = semesters.filter((sem) =>
    sem.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sem.number.toString().includes(searchTerm)
  );

  const handleAddSuccess = () => {
    console.log('Semester added successfully');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader
          title="Semesters"
          description="Manage academic semesters"
          searchPlaceholder="Search semesters..."
          onSearch={setSearchTerm}
          onAdd={() => setOpenDialog(true)}
          addButtonLabel="Add Semester"
        />

        <div className="px-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Semester</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Branch</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Subjects</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSemesters.map((sem) => (
                  <tr key={sem.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3 text-sm text-foreground font-medium">
                      <Badge variant="default">Sem {sem.number}</Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{sem.branchName}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      <Badge>{sem.subjects}</Badge>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => console.log('View', sem.id)}
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => console.log('Edit', sem.id)}
                          title="Edit semester"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => console.log('Delete', sem.id)}
                          title="Delete semester"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredSemesters.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No semesters found
              </div>
            )}
          </div>
        </div>
      </div>

      <AddSemesterForm
        open={openDialog}
        onOpenChange={setOpenDialog}
        branches={mockBranches}
        onSuccess={handleAddSuccess}
      />
    </AdminLayout>
  );
}
