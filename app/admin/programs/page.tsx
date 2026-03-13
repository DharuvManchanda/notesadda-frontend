'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProgramForm } from '@/components/admin/forms/ProgramForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { PageLoader } from '@/components/ui/PageLoader';
import { ConfirmDeletePopover } from '@/components/shared/ConfirmDeletePopover';
import { notespitaraApi } from '@/store/services/notespitara';
import { Program, University } from '@/components/types/types';
import { toast } from 'sonner';

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [deleteProgramId, setDeleteProgramId] = useState<string | null>(null);

  const { data: programsData, isLoading: isProgramsLoading, refetch: refetchPrograms } = notespitaraApi.useGetAllProgramsQuery({ page: 0, size: 20 });
  const { data: universitiesData, isLoading: isUniversitiesLoading } = notespitaraApi.useGetAllUniversitiesQuery({ page: 0, size: 100 });
  const [deleteProgram, { isLoading: isDeleting }] = notespitaraApi.useDeleteProgramMutation();

  const typedPData = programsData as any;
  const typedUData = universitiesData as any;

  const programs: Program[] = Array.isArray(typedPData) ? typedPData : typedPData?.data?.programs?.content || typedPData?.data?.content || typedPData?.content || [];
  const universities: University[] = Array.isArray(typedUData) ? typedUData : typedUData?.data?.universities?.content || typedUData?.data?.content || typedUData?.content || [];

  const filteredPrograms = programs.filter((prog) =>
    prog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSuccess = () => {
    refetchPrograms();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProgram({ id }).unwrap();
      toast.success('Program deleted successfully');
      setDeleteProgramId(null);
      refetchPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
      toast.error('Failed to delete program');
    }
  };

  if (isProgramsLoading || isUniversitiesLoading) {
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
          title="Programs"
          description="Manage academic programs"
          searchPlaceholder="Search programs..."
          onSearch={setSearchTerm}
          onAdd={() => {
            setEditingProgram(null);
            setOpenDialog(true);
          }}
          addButtonLabel="Add Program"
        />

        <div className="px-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">University</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Duration</th>
                  {/* <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Branches</th> */}
                  <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.map((prog) => (
                  <tr key={prog.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3 text-sm text-foreground font-medium">{prog.name}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{prog.university?.name || prog.universityName}</td>
                    <td className="px-6 py-3 text-sm">
                      <Badge variant="outline">
                        {prog.type === 'UG' ? 'Undergraduate' : prog.type === 'PG' ? 'Postgraduate' : 'Diploma'}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{prog.duration} years</td>
                    {/* <td className="px-6 py-3 text-sm text-muted-foreground">
                      Removed branches badge as it might not be implemented in GET API
                    </td> */}
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
                          onClick={() => {
                            setEditingProgram({
                              id: prog.id,
                              name: prog.name,
                              type: prog.type,
                              duration: prog.duration?.toString(),
                              universityId: prog.university?.id || prog.universityId,
                              description: '', // defaults to empty
                            });
                            setOpenDialog(true);
                          }}
                          title="Edit program"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <ConfirmDeletePopover
                          open={deleteProgramId === prog.id}
                          onOpenChange={(open) => setDeleteProgramId(open ? prog.id : null)}
                          onConfirm={() => handleDelete(prog.id)}
                          isLoading={isDeleting && deleteProgramId === prog.id}
                          title="Delete this program?"
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            title="Delete program"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </ConfirmDeletePopover>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            {filteredPrograms.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No programs found
              </div>
            )}
          </div>
        </div>
      </div>

      <ProgramForm
        open={openDialog}
        onOpenChange={(open) => {
          setOpenDialog(open);
          if (!open) setEditingProgram(null);
        }}
        onSuccess={handleAddSuccess}
        initialData={editingProgram}
      />
    </AdminLayout>
  );
}
