'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SemesterForm } from '@/components/admin/forms/SemesterForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { PageLoader } from '@/components/ui/PageLoader';
import { ConfirmDeletePopover } from '@/components/shared/ConfirmDeletePopover';
import { notespitaraApi } from '@/store/services/notespitara';
import { Semester, Branch } from '@/components/types/types';
import { toast } from 'sonner';

export default function SemestersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSemester, setEditingSemester] = useState<any>(null);
  const [deleteSemesterId, setDeleteSemesterId] = useState<string | null>(null);

  const { data: semestersData, isLoading: isSemestersLoading, refetch: refetchSemesters } = notespitaraApi.useGetAllSemestersQuery({ page: 0, size: 20 });
  const { data: branchesData, isLoading: isBranchesLoading } = notespitaraApi.useGetAllBranchesQuery({ page: 0, size: 100 });
  const [deleteSemester, { isLoading: isDeleting }] = notespitaraApi.useDeleteSemesterMutation();

  const typedSData = semestersData as any;
  const typedBData = branchesData as any;

  const semesters: Semester[] = Array.isArray(typedSData) ? typedSData : typedSData?.data?.semesters?.content || typedSData?.data?.content || typedSData?.content || [];
  const branches: Branch[] = Array.isArray(typedBData) ? typedBData : typedBData?.data?.branches?.content || typedBData?.data?.content || typedBData?.content || [];

  const filteredSemesters = semesters.filter((sem) =>
    (sem.branch?.name || sem.branchName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    sem.number.toString().includes(searchTerm)
  );

  const handleAddSuccess = () => {
    refetchSemesters();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSemester({ id }).unwrap();
      toast.success('Semester deleted successfully');
      setDeleteSemesterId(null);
      refetchSemesters();
    } catch (error) {
      console.error('Error deleting semester:', error);
      toast.error('Failed to delete semester');
    }
  };

  if (isSemestersLoading || isBranchesLoading) {
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
          title="Semesters"
          description="Manage academic semesters"
          searchPlaceholder="Search semesters..."
          onSearch={setSearchTerm}
          onAdd={() => {
            setEditingSemester(null);
            setOpenDialog(true);
          }}
          addButtonLabel="Add Semester"
        />

        <div className="px-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
            <table className="min-w-[680px] w-full">
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
                    <td className="px-6 py-3 text-sm text-muted-foreground">{sem.branch?.name || sem.branchName}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      {/* Removed subjects count as it may not be in GET API */}
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
                          onClick={() => {
                            setEditingSemester({
                              id: sem.id,
                              number: sem.number,
                              branchId: sem.branch?.id || sem.branchId,
                            });
                            setOpenDialog(true);
                          }}
                          title="Edit semester"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <ConfirmDeletePopover
                          open={deleteSemesterId === sem.id}
                          onOpenChange={(open) => setDeleteSemesterId(open ? sem.id : null)}
                          onConfirm={() => handleDelete(sem.id)}
                          isLoading={isDeleting && deleteSemesterId === sem.id}
                          title="Delete this semester?"
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            title="Delete semester"
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

            {filteredSemesters.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No semesters found
              </div>
            )}
          </div>
        </div>
      </div>

      <SemesterForm
        open={openDialog}
        onOpenChange={(open) => {
          setOpenDialog(open);
          if (!open) setEditingSemester(null);
        }}
        onSuccess={handleAddSuccess}
        initialData={editingSemester}
      />
    </AdminLayout>
  );
}
