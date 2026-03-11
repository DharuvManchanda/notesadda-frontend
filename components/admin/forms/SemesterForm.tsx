'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { notespitaraApi } from '@/store/services/notespitara';
import { CascadingDropdowns } from '@/components/ui/CascadingDropdowns';

import { SemesterCreateRequest } from '@/store/services/notespitara';

interface SemesterFormData extends Omit<SemesterCreateRequest, 'number'> {
  id?: string;
  number: number | string; // allowing string because the input maps to string before parsing
}

interface SemesterFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialData?: SemesterFormData;
}

export function SemesterForm({ open, onOpenChange, onSuccess, initialData }: SemesterFormProps) {
  const isEditMode = !!initialData;
  const [createSemester, { isLoading: isCreating }] = notespitaraApi.useCreateSemesterMutation();
  const [updateSemester, { isLoading: isUpdating }] = notespitaraApi.useUpdateSemesterMutation();
  const loading = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    number: initialData?.number?.toString() || '',
    branchId: initialData?.branchId || '',
    programId: '', // needed for the cascading dropdown
    universityId: '', // needed for the cascading dropdown
  });

  useEffect(() => {
    if (open) {
      setFormData({
        number: initialData?.number?.toString() || '',
        branchId: initialData?.branchId || '',
        programId: '',
        universityId: '',
      });
    }
  }, [open, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload: SemesterCreateRequest = {
        number: Number(formData.number),
        branchId: formData.branchId,
      };

      if (isEditMode && initialData?.id) {
        await updateSemester({ id: initialData.id, semesterCreateRequest: payload }).unwrap();
      } else {
        await createSemester({ semesterCreateRequest: payload }).unwrap();
      }
      
      setFormData({ number: '', branchId: '', programId: '', universityId: '' });
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error saving semester:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Semester' : 'Add Semester'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
            <CascadingDropdowns
              level="BRANCH"
              selectedUniversityId={formData.universityId}
              selectedProgramId={formData.programId}
              selectedBranchId={formData.branchId}
              onUniversityChange={(val) => setFormData(prev => ({ ...prev, universityId: val }))}
              onProgramChange={(val) => setFormData(prev => ({ ...prev, programId: val }))}
              onBranchChange={(val) => setFormData(prev => ({ ...prev, branchId: val }))}
            />

          <div className="space-y-2">
            <Label htmlFor="number">Semester Number *</Label>
            <Input
              id="number"
              name="number"
              type="number"
              placeholder="e.g., 1"
              min="1"
              max="10"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {loading ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add Semester')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
