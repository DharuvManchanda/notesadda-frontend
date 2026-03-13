'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ConfirmDeletePopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  loadingLabel?: string;
  confirmLabel?: string;
  children: ReactNode;
}

export function ConfirmDeletePopover({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
  title = 'Delete this item?',
  description = 'This action cannot be undone.',
  loadingLabel = 'Deleting...',
  confirmLabel = 'Delete',
  children,
}: ConfirmDeletePopoverProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end" className="w-64 space-y-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={isLoading}
            onClick={onConfirm}
          >
            {isLoading ? loadingLabel : confirmLabel}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
