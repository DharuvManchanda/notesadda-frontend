import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  description?: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  onAdd?: () => void;
  addButtonLabel?: string;
}

export function AdminHeader({
  title,
  description,
  searchPlaceholder = 'Search...',
  onSearch,
  onAdd,
  addButtonLabel = 'Add New',
}: AdminHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-border bg-card px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
        {onSearch && (
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch(e.target.value)}
            className="min-h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary sm:min-w-64"
          />
        )}
        {onAdd && (
          <Button onClick={onAdd} className="min-h-11 w-full gap-2 sm:w-auto">
            <Plus className="h-4 w-4" />
            {addButtonLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
