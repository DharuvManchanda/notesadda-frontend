'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AddUniversityForm } from '@/components/admin/forms/AddUniversityForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Eye } from 'lucide-react';

// Mock data
const mockUniversities = [
  {
    id: '1',
    name: 'Punjab Technical University',
    code: 'PTU',
    city: 'Jalandhar',
    state: 'Punjab',
    programs: 12,
  },
  {
    id: '2',
    name: 'Delhi University',
    code: 'DU',
    city: 'New Delhi',
    state: 'Delhi',
    programs: 25,
  },
  {
    id: '3',
    name: 'Mumbai University',
    code: 'MU',
    city: 'Mumbai',
    state: 'Maharashtra',
    programs: 18,
  },
];

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [universities, setUniversities] = useState(mockUniversities);
  const [openDialog, setOpenDialog] = useState(false);

  const filteredUniversities = universities.filter((uni) =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSuccess = () => {
    // In a real app, you would refresh the list from API
    console.log('University added successfully');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader
          title="Universities"
          description="Manage universities in the system"
          searchPlaceholder="Search universities..."
          onSearch={setSearchTerm}
          onAdd={() => setOpenDialog(true)}
          addButtonLabel="Add University"
        />

        <div className="px-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Code</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Programs</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUniversities.map((uni) => (
                  <tr key={uni.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3 text-sm text-foreground font-medium">{uni.name}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      <Badge variant="outline">{uni.code}</Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      {uni.city}, {uni.state}
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      <Badge>{uni.programs}</Badge>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => console.log('View', uni.id)}
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => console.log('Edit', uni.id)}
                          title="Edit university"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => console.log('Delete', uni.id)}
                          title="Delete university"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUniversities.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No universities found
              </div>
            )}
          </div>
        </div>
      </div>

      <AddUniversityForm open={openDialog} onOpenChange={setOpenDialog} onSuccess={handleAddSuccess} />
    </AdminLayout>
  );
}
