'use client';

import { useState, useMemo } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { Pagination } from '@/components/shared/Pagination';
import { notespitaraApi } from '@/store/services/notespitara';
import { PageLoader } from '@/components/ui/PageLoader';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { RejectNoteForm } from '@/components/admin/forms/RejectNoteForm';
import { EditNoteForm } from '@/components/admin/forms/EditNoteForm';
import { AddNoteForm } from '@/components/admin/forms/AddNoteForm';
import { toast } from 'sonner';

const NOTES_PER_PAGE = 20;

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'subject', label: 'Subject' },
  { key: 'uploadedBy', label: 'Uploaded By' },
  { key: 'status', label: 'Status' },
];

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  // Queries
  const { data: notesData, isLoading, refetch } = notespitaraApi.useGetAllNotesForAdminQuery({
    page: currentPage - 1,
    size: NOTES_PER_PAGE,
  } as any);

  // Mutations
  const [approveNote, { isLoading: isApproving }] = notespitaraApi.useApproveNotesFromAdminReviewMutation();
  const [rejectNote, { isLoading: isRejecting }] = notespitaraApi.useRejectNotesMutation();
  const [deleteNote, { isLoading: isDeleting }] = notespitaraApi.useDeleteNotesMutation();

  // Dialog States
  const [actionNode, setActionNode] = useState<{ 
    id: string; 
    type: 'approve' | 'delete' | 'reject' | 'edit';
    note?: any; 
  } | null>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // reset to page 1 when searching
  };

  const handleAction = async () => {
    if (!actionNode) return;

    try {
      if (actionNode.type === 'approve') {
        await approveNote({ id: actionNode.id }).unwrap();
        toast.success('Note approved successfully');
      } else if (actionNode.type === 'delete') {
        await deleteNote({ id: actionNode.id }).unwrap();
        toast.success('Note deleted successfully');
      }
      setActionNode(null);
    } catch (err) {
      toast.error(`Failed to ${actionNode.type} note`);
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <PageLoader />
      </AdminLayout>
    );
  }

  // Map backend response matching the AdminTable's expected column keys
  const notesResponse: any = (notesData as any)?.data;
  const paginatedNotes = notesResponse?.content?.map((note: any) => ({
    id: note.id,
    title: note.title,
    // Using subjectId as placeholder since name is not in the provided snippet
    subject: note.subjectId || 'Unknown',
    uploadedBy: note.uploaderName || 'Unknown',
    description: note.description, // Store for edit
    viewUrl: note.viewUrl || note.downloadUrl, // fallback to downloadUrl just in case
    _isApproved: note.isApproved,
    _rejectionNote: note.rejectionNote,
    status: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        note.isApproved ? 'bg-green-100 text-green-800' :
        note.rejectionNote ? 'bg-orange-100 text-orange-800' :
        'bg-yellow-100 text-yellow-800' // PENDING
      }`}>
        {note.isApproved ? 'APPROVED' : note.rejectionNote ? 'REJECTED' : 'PENDING'}
      </span>
    ),
  })) || [];

  const totalPages = notesResponse?.totalPages || 1;
  const totalElements = notesResponse?.totalElements || 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader
          title="Notes"
          description={`Manage all uploaded notes (${totalElements} total)`}
          searchPlaceholder="Search notes..."
          onSearch={handleSearch}
          onAdd={() => setIsAddNoteOpen(true)}
          addButtonLabel="Add Note"
        />

        <div className="px-6 space-y-4">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <AdminTable
              columns={columns}
              data={paginatedNotes}
              onApprove={(id: string) => setActionNode({ id, type: 'approve' })}
              onReject={(id: string) => setActionNode({ id, type: 'reject' })}
              onEdit={(id: string) => setActionNode({ 
                id, 
                type: 'edit',
                note: paginatedNotes.find((n: any) => n.id === id)
              })}
              onDelete={(id: string) => setActionNode({ id, type: 'delete' })}
              onView={(url: string) => {
                if (url) window.open(url, '_blank');
                else toast.error('View URL is not available for this note');
              }}
              isApproveDisabled={(row: any) => row._isApproved === true}
              isRejectDisabled={(row: any) => !!row._rejectionNote}
            />
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Confirmation Dialogs */}
      <AlertDialog 
        open={actionNode?.type === 'approve' || actionNode?.type === 'delete'} 
        onOpenChange={(open) => !open && setActionNode(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionNode?.type === 'approve' ? 'Approve Note' : 'Delete Note'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionNode?.type === 'approve' 
                ? 'Are you sure you want to approve this note? It will become visible to all users.'
                : 'Are you sure you want to delete this note? This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isApproving || isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAction}
              disabled={isApproving || isDeleting}
              className={actionNode?.type === 'delete' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
            >
              {isApproving || isDeleting ? 'Processing...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Form */}
      <RejectNoteForm
        open={actionNode?.type === 'reject'}
        onOpenChange={(open) => !open && setActionNode(null)}
        noteId={actionNode?.id || null}
      />

      {/* Edit Form */}
      <EditNoteForm
        open={actionNode?.type === 'edit'}
        onOpenChange={(open) => !open && setActionNode(null)}
        noteId={actionNode?.id || null}
        initialTitle={actionNode?.note?.title}
        initialDescription={actionNode?.note?.description}
      />

      <AddNoteForm
        open={isAddNoteOpen}
        onOpenChange={setIsAddNoteOpen}
        onSuccess={() => {
          refetch();
        }}
      />
    </AdminLayout>
  );
}
