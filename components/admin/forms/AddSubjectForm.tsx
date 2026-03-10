'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface AddSubjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  semesters: Array<{ id: string; name: string }>;
  onSuccess?: () => void;
}

export function AddSubjectForm({ open, onOpenChange, semesters, onSuccess }: AddSubjectFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    credits: '',
    semesterId: '',
    syllabusUrl: '',
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
      
      console.log('Adding subject:', formData);
      
      setFormData({ name: '', code: '', credits: '', semesterId: '', syllabusUrl: '' });
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error adding subject:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Subject</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="semesterId">Semester *</Label>
            <Select value={formData.semesterId} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, semesterId: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((sem) => (
                  <SelectItem key={sem.id} value={sem.id}>
                    {sem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
            <Label htmlFor="credits">Credits *</Label>
            <Input
              id="credits"
              name="credits"
              type="number"
              placeholder="e.g., 4"
              min="1"
              max="10"
              value={formData.credits}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="syllabusUrl">Syllabus URL (Optional)</Label>
            <Input
              id="syllabusUrl"
              name="syllabusUrl"
              type="url"
              placeholder="https://example.com/syllabus.pdf"
              value={formData.syllabusUrl}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {loading ? 'Adding...' : 'Add Subject'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
