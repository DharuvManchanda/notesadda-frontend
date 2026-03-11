'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { notespitaraApi } from '@/store/services/notespitara';
import { CascadingDropdowns } from '@/components/ui/CascadingDropdowns';

import { BranchCreateRequest } from '@/store/services/notespitara';

interface BranchFormData extends BranchCreateRequest {
  id?: string;
  description?: string;
}

interface BranchFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialData?: BranchFormData;
}

export function BranchForm({ open, onOpenChange, onSuccess, initialData }: BranchFormProps) {
  const isEditMode = !!initialData;
  const [createBranch, { isLoading: isCreating }] = notespitaraApi.useCreateBranchMutation();
  const [updateBranch, { isLoading: isUpdating }] = notespitaraApi.useUpdateBranchMutation();
  const loading = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    code: initialData?.code || '',
    programId: initialData?.programId || '',
    universityId: '', // needed for the cascading dropdown
    description: initialData?.description || '',
  });

  useEffect(() => {
    if (open) {
      setFormData({
        name: initialData?.name || '',
        code: initialData?.code || '',
        programId: initialData?.programId || '',
        universityId: '',
        description: initialData?.description || '',
      });
    }
  }, [open, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload: BranchCreateRequest = {
        name: formData.name,
        code: formData.code,
        programId: formData.programId,
      };

      if (isEditMode && initialData?.id) {
        await updateBranch({ id: initialData.id, branchCreateRequest: payload }).unwrap();
      } else {
        await createBranch({ branchCreateRequest: payload }).unwrap();
      }
      
      setFormData({ name: '', code: '', programId: '', universityId: '', description: '' });
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error saving branch:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Branch' : 'Add Branch'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
            <CascadingDropdowns
              level="PROGRAM"
              selectedUniversityId={formData.universityId}
              selectedProgramId={formData.programId}
              onUniversityChange={(val) => setFormData(prev => ({ ...prev, universityId: val }))}
              onProgramChange={(val) => setFormData(prev => ({ ...prev, programId: val }))}
            />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Branch Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Computer Science Engineering"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Code *</Label>
              <Input
                id="code"
                name="code"
                placeholder="e.g., CSE"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description of the branch"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {loading ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add Branch')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
