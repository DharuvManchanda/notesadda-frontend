'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Loader2, Edit } from 'lucide-react';
import { notespitaraApi } from '@/store/services/notespitara';
import { toast } from 'sonner';

interface EditNoteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  noteId: string | null;
  initialTitle?: string;
  initialDescription?: string;
}

export function EditNoteForm({ open, onOpenChange, onSuccess, noteId, initialTitle = '', initialDescription = '' }: EditNoteFormProps) {
  const [updateNote, { isLoading }] = notespitaraApi.useUpdateNotesMutation();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    if (open) {
      setTitle(initialTitle);
      setDescription(initialDescription || '');
    }
  }, [open, initialTitle, initialDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteId || !title.trim()) return;

    try {
      await updateNote({ 
        id: noteId, 
        notesUpdateRequest: { 
          title: title.trim(), 
          description: description.trim() 
        } 
      }).unwrap();
      
      toast.success('Note updated successfully');
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error('Failed to update note. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-primary" />
            Edit Note
          </DialogTitle>
          <DialogDescription>
            Update the title and description for this note.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-semibold">
              Title *
            </Label>
            <Input
              id="title"
              placeholder="E.g., Computer Networks Chapter 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Optional description of the note contents."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] resize-none"
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
              disabled={isLoading || !title.trim()}
              className="min-w-[100px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
