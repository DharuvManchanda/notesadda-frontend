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

import { ProgramCreateRequest } from '@/store/services/notespitara';

interface ProgramFormData extends ProgramCreateRequest {
  id?: string;
}

interface ProgramFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialData?: ProgramFormData;
}

export function ProgramForm({ open, onOpenChange, onSuccess, initialData }: ProgramFormProps) {
  const isEditMode = !!initialData;
  const [createProgram, { isLoading: isCreating }] = notespitaraApi.useCreateProgramMutation();
  const [updateProgram, { isLoading: isUpdating }] = notespitaraApi.useUpdateProgramMutation();
  const loading = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    type: initialData?.type || 'UG',
    duration: initialData?.duration || '',
    universityId: initialData?.universityId || '',
  });

  useEffect(() => {
    if (open) {
      setFormData({
        name: initialData?.name || '',
        description: initialData?.description || '',
        type: initialData?.type || 'UG',
        duration: initialData?.duration || '',
        universityId: initialData?.universityId || '',
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
      const payload: ProgramCreateRequest = {
        name: formData.name,
        description: formData.description,
        type: formData.type as any, // "UG" | "PG" | "DIPLOMA"
        duration: Number(formData.duration),
        universityId: formData.universityId,
      };

      if (isEditMode && initialData?.id) {
        await updateProgram({ id: initialData.id, programCreateRequest: payload }).unwrap();
      } else {
        await createProgram({ programCreateRequest: payload }).unwrap();
      }
      
      setFormData({ name: '', description: '', type: 'UG', duration: '', universityId: '' });
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error saving program:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Program' : 'Add Program'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
            <CascadingDropdowns
              level="UNIVERSITY"
              selectedUniversityId={formData.universityId}
              onUniversityChange={(val) => setFormData(prev => ({ ...prev, universityId: val }))}
            />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Program Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Bachelor of Technology"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, type: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UG">Undergraduate (UG)</SelectItem>
                  <SelectItem value="PG">Postgraduate (PG)</SelectItem>
                  <SelectItem value="DIPLOMA">Diploma</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (Years) *</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              placeholder="e.g., 4"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description of the program"
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
              {loading ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add Program')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
