'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface AddProgramFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  universities: Array<{ id: string; name: string }>;
  onSuccess?: () => void;
}

export function AddProgramForm({ open, onOpenChange, universities, onSuccess }: AddProgramFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'UG',
    duration: '',
    universityId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Dummy API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log('Adding program:', formData);
      
      setFormData({ name: '', description: '', type: 'UG', duration: '', universityId: '' });
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error adding program:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Program</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="universityId">University *</Label>
            <Select value={formData.universityId} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, universityId: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select university" />
              </SelectTrigger>
              <SelectContent>
                {universities.map((uni) => (
                  <SelectItem key={uni.id} value={uni.id}>
                    {uni.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
              {loading ? 'Adding...' : 'Add Program'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
