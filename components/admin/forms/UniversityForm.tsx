'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Upload } from 'lucide-react';
import { notespitaraApi } from '@/store/services/notespitara';

import { UniversityCreateRequest } from '@/store/services/notespitara';

interface UniversityFormData extends UniversityCreateRequest {
  id?: string;
}

interface UniversityFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialData?: UniversityFormData;
}

export function UniversityForm({ open, onOpenChange, onSuccess, initialData }: UniversityFormProps) {
  const isEditMode = !!initialData;
  const [createUniversity, { isLoading: isCreating }] = notespitaraApi.useCreateUniversityMutation();
  const [updateUniversity, { isLoading: isUpdating }] = notespitaraApi.useUpdateUniversityMutation();
  const loading = isCreating || isUpdating;

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    code: initialData?.code || '',
    description: initialData?.description || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    logo: null as File | null,
  });

  useEffect(() => {
    if (open) {
      const payload: UniversityCreateRequest = {
        name: initialData?.name || '',
        code: initialData?.code || '',
        description: initialData?.description || '',
        city: initialData?.city || '',
        state: initialData?.state || '',
      };
      setFormData({
        ...payload,
        logo: null,
      });
      setLogoPreview(null);
    }
  }, [open, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { logo, ...data } = formData;
      const formDataObj = new FormData();
      formDataObj.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
      if (logo) {
        formDataObj.append('logo', logo);
      }

      if (isEditMode && initialData?.id) {
        await updateUniversity({ id: initialData.id, body: formDataObj as any }).unwrap();
      } else {
        await createUniversity({ body: formDataObj as any }).unwrap();
      }
      
      setFormData({ name: '', code: '', description: '', city: '', state: '', logo: null });
      setLogoPreview(null);
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error saving university:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit University' : 'Add University'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logo">University Logo</Label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="cursor-pointer"
                />
              </div>
              {logoPreview && (
                <div className="flex items-center gap-2">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-12 w-12 object-cover rounded border border-border"
                  />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Recommended: 512x512px, PNG or JPG format</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">University Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Punjab Technical University"
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
                placeholder="e.g., PTU"
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
              placeholder="Brief description of the university"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                name="city"
                placeholder="e.g., Jalandhar"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                name="state"
                placeholder="e.g., Punjab"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {loading ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add University')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
