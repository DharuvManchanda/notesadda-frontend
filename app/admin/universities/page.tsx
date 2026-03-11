'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { UniversityForm } from '@/components/admin/forms/UniversityForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { PageLoader } from '@/components/ui/PageLoader';
import { notespitaraApi } from '@/store/services/notespitara';
import { GetAllUniversitiesResponse, University } from '@/components/types/types';

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState<any>(null);

  const { data, isLoading, refetch } = notespitaraApi.useGetAllUniversitiesQuery({ page: 0, size: 20 });
  const typedData = data as any;
  const universities: University[] = Array.isArray(typedData) ? typedData : typedData?.data?.universities?.content || typedData?.data?.content || typedData?.content || [];

  const filteredUniversities = universities.filter((uni) =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSuccess = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <PageLoader />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader
          title="Universities"
          description="Manage universities in the system"
          searchPlaceholder="Search universities..."
          onSearch={setSearchTerm}
          onAdd={() => {
            setEditingUniversity(null);
            setOpenDialog(true);
          }}
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
                      {/* Removing programs badge, it might not be in GET API */}
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
                          onClick={() => {
                            setEditingUniversity({
                              id: uni.id,
                              name: uni.name,
                              code: uni.code,
                              description: '', // Mock data doesn't have description so default to empty
                              city: uni.city,
                              state: uni.state,
                            });
                            setOpenDialog(true);
                          }}
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

      <UniversityForm 
        open={openDialog} 
        onOpenChange={(open) => {
          setOpenDialog(open);
          if (!open) setEditingUniversity(null); // Clear editing state when closing
        }} 
        onSuccess={handleAddSuccess} 
        initialData={editingUniversity}
      />
    </AdminLayout>
  );
}
