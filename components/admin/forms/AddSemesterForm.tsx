'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface AddSemesterFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branches: Array<{ id: string; name: string }>;
  onSuccess?: () => void;
}

export function AddSemesterForm({ open, onOpenChange, branches, onSuccess }: AddSemesterFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    number: '',
    branchId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      
      console.log('Adding semester:', formData);
      
      setFormData({ number: '', branchId: '' });
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error adding semester:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Semester</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="branchId">Branch *</Label>
            <Select value={formData.branchId} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, branchId: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
              {loading ? 'Adding...' : 'Add Semester'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
