'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Loader2, AlertCircle } from 'lucide-react';
import { notespitaraApi } from '@/store/services/notespitara';
import { toast } from 'sonner';

interface RejectNoteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  noteId: string | null;
}

export function RejectNoteForm({ open, onOpenChange, onSuccess, noteId }: RejectNoteFormProps) {
  const [rejectNote, { isLoading }] = notespitaraApi.useRejectNotesMutation();
  const [rejectionNote, setRejectionNote] = useState('');

  useEffect(() => {
    if (open) {
      setRejectionNote('');
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteId || !rejectionNote.trim()) return;

    try {
      await rejectNote({ id: noteId, rejectionNote: rejectionNote.trim() }).unwrap();
      toast.success('Note rejected successfully');
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error rejecting note:', error);
      toast.error('Failed to reject note. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Reject Note
          </DialogTitle>
          <DialogDescription>
            Provide a reason for rejection. This will be shared with the uploader.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="rejectionNote" className="font-semibold">
              Rejection Reason *
            </Label>
            <Textarea
              id="rejectionNote"
              placeholder="e.g., File is corrupted, wrong subject, or contains inappropriate content."
              value={rejectionNote}
              onChange={(e) => setRejectionNote(e.target.value)}
              className="min-h-[120px] resize-none focus-visible:ring-destructive"
              required
            />
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="destructive"
              disabled={isLoading || !rejectionNote.trim()}
              className="min-w-[100px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Rejecting...
                </>
              ) : (
                'Confirm Reject'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
