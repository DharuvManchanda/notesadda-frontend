'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UploadNoteWizard } from '@/components/upload/UploadNoteWizard';

interface AddNoteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddNoteForm({ open, onOpenChange, onSuccess }: AddNoteFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          <DialogDescription>
            Upload a new note for review using the same academic flow as the public upload page.
          </DialogDescription>
        </DialogHeader>

        <UploadNoteWizard
          heading="Upload a New Note"
          subtitle="Add a note directly from the admin panel without leaving this page."
          successReturnLabel="Back to Notes"
          onSuccessReturn={() => onOpenChange(false)}
          onUploadSuccess={onSuccess}
          className="mx-auto mt-2 w-full max-w-3xl"
        />
      </DialogContent>
    </Dialog>
  );
}
