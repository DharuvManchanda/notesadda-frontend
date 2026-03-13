'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { BranchForm } from '@/components/admin/forms/BranchForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { PageLoader } from '@/components/ui/PageLoader';
import { ConfirmDeletePopover } from '@/components/shared/ConfirmDeletePopover';
import { notespitaraApi } from '@/store/services/notespitara';
import { Branch, Program } from '@/components/types/types';
import { toast } from 'sonner';

export default function BranchesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBranch, setEditingBranch] = useState<any>(null);
  const [deleteBranchId, setDeleteBranchId] = useState<string | null>(null);

  const { data: branchesData, isLoading: isBranchesLoading, refetch: refetchBranches } = notespitaraApi.useGetAllBranchesQuery({ page: 0, size: 20 });
  const { data: programsData, isLoading: isProgramsLoading } = notespitaraApi.useGetAllProgramsQuery({ page: 0, size: 100 });
  const [deleteBranch, { isLoading: isDeleting }] = notespitaraApi.useDeleteBranchMutation();

  const typedBData = branchesData as any;
  const typedPData = programsData as any;

  const branches: Branch[] = Array.isArray(typedBData) ? typedBData : typedBData?.data?.branches?.content || typedBData?.data?.content || typedBData?.content || [];
  const programs: Program[] = Array.isArray(typedPData) ? typedPData : typedPData?.data?.programs?.content || typedPData?.data?.content || typedPData?.content || [];

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSuccess = () => {
    refetchBranches();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBranch({ id }).unwrap();
      toast.success('Branch deleted successfully');
      setDeleteBranchId(null);
      refetchBranches();
    } catch (error) {
      console.error('Error deleting branch:', error);
      toast.error('Failed to delete branch');
    }
  };

  if (isBranchesLoading || isProgramsLoading) {
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
          title="Branches"
          description="Manage academic branches"
          searchPlaceholder="Search branches..."
          onSearch={setSearchTerm}
          onAdd={() => {
            setEditingBranch(null);
            setOpenDialog(true);
          }}
          addButtonLabel="Add Branch"
        />

        <div className="px-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full">
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
                    <td className="px-6 py-3 text-sm text-muted-foreground">{branch.program?.name || branch.programName}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      {/* Removed semesters badge if count is not returned directly */}
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
                          onClick={() => {
                            setEditingBranch({
                              id: branch.id,
                              name: branch.name,
                              code: branch.code,
                              programId: branch.program?.id || branch.programId,
                              description: '',
                            });
                            setOpenDialog(true);
                          }}
                          title="Edit branch"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <ConfirmDeletePopover
                          open={deleteBranchId === branch.id}
                          onOpenChange={(open) => setDeleteBranchId(open ? branch.id : null)}
                          onConfirm={() => handleDelete(branch.id)}
                          isLoading={isDeleting && deleteBranchId === branch.id}
                          title="Delete this branch?"
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            title="Delete branch"
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

            {filteredBranches.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No branches found
              </div>
            )}
          </div>
        </div>
      </div>

      <BranchForm
        open={openDialog}
        onOpenChange={(open) => {
          setOpenDialog(open);
          if (!open) setEditingBranch(null);
        }}
        onSuccess={handleAddSuccess}
        initialData={editingBranch}
      />
    </AdminLayout>
  );
}
