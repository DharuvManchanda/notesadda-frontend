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

import { SubjectCreateRequest } from '@/store/services/notespitara';

interface SubjectFormData extends Omit<SubjectCreateRequest, 'credits' | 'syllabusUrl'> {
  id?: string;
  description?: string;
}

interface SubjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialData?: SubjectFormData;
}

export function SubjectForm({ open, onOpenChange, onSuccess, initialData }: SubjectFormProps) {
  const isEditMode = !!initialData;
  const [createSubject, { isLoading: isCreating }] = notespitaraApi.useCreateSubjectMutation();
  const [updateSubject, { isLoading: isUpdating }] = notespitaraApi.useUpdateSubjectMutation();
  const loading = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    code: initialData?.code || '',
    semesterId: initialData?.semesterId || '',
    branchId: '',
    programId: '',
    universityId: '',
    description: initialData?.description || '',
  });

  useEffect(() => {
    if (open) {
      setFormData({
        name: initialData?.name || '',
        code: initialData?.code || '',
        semesterId: initialData?.semesterId || '',
        branchId: '',
        programId: '',
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
      const payload: SubjectCreateRequest = {
        name: formData.name,
        code: formData.code,
        semesterId: formData.semesterId,
        ...(formData.description && { description: formData.description }),
      };

      if (isEditMode && initialData?.id) {
        await updateSubject({ id: initialData.id, subjectCreateRequest: payload }).unwrap();
      } else {
        await createSubject({ subjectCreateRequest: payload }).unwrap();
      }
      
      setFormData({ name: '', code: '', semesterId: '', branchId: '', programId: '', universityId: '', description: '' });
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error saving subject:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Subject' : 'Add Subject'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
            <CascadingDropdowns
              level="SEMESTER"
              selectedUniversityId={formData.universityId}
              selectedProgramId={formData.programId}
              selectedBranchId={formData.branchId}
              selectedSemesterId={formData.semesterId}
              onUniversityChange={(val) => setFormData(prev => ({ ...prev, universityId: val }))}
              onProgramChange={(val) => setFormData(prev => ({ ...prev, programId: val }))}
              onBranchChange={(val) => setFormData(prev => ({ ...prev, branchId: val }))}
              onSemesterChange={(val) => setFormData(prev => ({ ...prev, semesterId: val }))}
            />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Subject Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Data Structures"
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
                placeholder="e.g., CS201"
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
              placeholder="Brief description of the subject content and objectives"
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
              {loading ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add Subject')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
