'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AddBranchForm } from '@/components/admin/forms/AddBranchForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Eye } from 'lucide-react';

// Mock data
const mockPrograms = [
  { id: '1', name: 'Bachelor of Technology' },
  { id: '2', name: 'Bachelor of Computer Applications' },
  { id: '3', name: 'Master of Computer Applications' },
];

const mockBranches = [
  {
    id: '1',
    name: 'Computer Science Engineering',
    code: 'CSE',
    programId: '1',
    programName: 'Bachelor of Technology',
    semesters: 8,
  },
  {
    id: '2',
    name: 'Electronics Engineering',
    code: 'ECE',
    programId: '1',
    programName: 'Bachelor of Technology',
    semesters: 8,
  },
  {
    id: '3',
    name: 'Mechanical Engineering',
    code: 'ME',
    programId: '1',
    programName: 'Bachelor of Technology',
    semesters: 8,
  },
  {
    id: '4',
    name: 'Computer Science',
    code: 'CS',
    programId: '2',
    programName: 'Bachelor of Computer Applications',
    semesters: 6,
  },
];

export default function BranchesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [branches, setBranches] = useState(mockBranches);
  const [openDialog, setOpenDialog] = useState(false);

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSuccess = () => {
    console.log('Branch added successfully');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader
          title="Branches"
          description="Manage academic branches"
          searchPlaceholder="Search branches..."
          onSearch={setSearchTerm}
          onAdd={() => setOpenDialog(true)}
          addButtonLabel="Add Branch"
        />

        <div className="px-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Code</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Program</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Semesters</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.map((branch) => (
                  <tr key={branch.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3 text-sm text-foreground font-medium">{branch.name}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      <Badge variant="outline">{branch.code}</Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{branch.programName}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      <Badge>{branch.semesters}</Badge>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => console.log('View', branch.id)}
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => console.log('Edit', branch.id)}
                          title="Edit branch"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => console.log('Delete', branch.id)}
                          title="Delete branch"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBranches.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No branches found
              </div>
            )}
          </div>
        </div>
      </div>

      <AddBranchForm
        open={openDialog}
        onOpenChange={setOpenDialog}
        programs={mockPrograms}
        onSuccess={handleAddSuccess}
      />
    </AdminLayout>
  );
}
