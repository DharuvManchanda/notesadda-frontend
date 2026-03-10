'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AddProgramForm } from '@/components/admin/forms/AddProgramForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Eye } from 'lucide-react';

// Mock data
const mockUniversities = [
  { id: '1', name: 'Punjab Technical University' },
  { id: '2', name: 'Delhi University' },
  { id: '3', name: 'Mumbai University' },
];

const mockPrograms = [
  {
    id: '1',
    name: 'Bachelor of Technology',
    type: 'UG',
    duration: 4,
    universityId: '1',
    universityName: 'Punjab Technical University',
    branches: 8,
  },
  {
    id: '2',
    name: 'Bachelor of Computer Applications',
    type: 'UG',
    duration: 3,
    universityId: '2',
    universityName: 'Delhi University',
    branches: 5,
  },
  {
    id: '3',
    name: 'Master of Computer Applications',
    type: 'PG',
    duration: 2,
    universityId: '3',
    universityName: 'Mumbai University',
    branches: 3,
  },
];

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [programs, setPrograms] = useState(mockPrograms);
  const [openDialog, setOpenDialog] = useState(false);

  const filteredPrograms = programs.filter((prog) =>
    prog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSuccess = () => {
    console.log('Program added successfully');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader
          title="Programs"
          description="Manage academic programs"
          searchPlaceholder="Search programs..."
          onSearch={setSearchTerm}
          onAdd={() => setOpenDialog(true)}
          addButtonLabel="Add Program"
        />

        <div className="px-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">University</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Duration</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Branches</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.map((prog) => (
                  <tr key={prog.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3 text-sm text-foreground font-medium">{prog.name}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{prog.universityName}</td>
                    <td className="px-6 py-3 text-sm">
                      <Badge variant="outline">
                        {prog.type === 'UG' ? 'Undergraduate' : prog.type === 'PG' ? 'Postgraduate' : 'Diploma'}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{prog.duration} years</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      <Badge>{prog.branches}</Badge>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => console.log('View', prog.id)}
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => console.log('Edit', prog.id)}
                          title="Edit program"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => console.log('Delete', prog.id)}
                          title="Delete program"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPrograms.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No programs found
              </div>
            )}
          </div>
        </div>
      </div>

      <AddProgramForm
        open={openDialog}
        onOpenChange={setOpenDialog}
        universities={mockUniversities}
        onSuccess={handleAddSuccess}
      />
    </AdminLayout>
  );
}
