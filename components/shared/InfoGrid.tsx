import { ReactNode } from 'react';

export interface InfoItem {
  icon?: ReactNode;
  label: string;
  value: string | ReactNode;
}

interface InfoGridProps {
  items: InfoItem[];
  columns?: 2 | 3 | 4;
}

const columnClasses = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

export function InfoGrid({ items, columns = 4 }: InfoGridProps) {
  return (
    <div className={`grid ${columnClasses[columns]} gap-4 text-sm`}>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {item.icon && <div className="h-4 w-4 text-primary flex-shrink-0">{item.icon}</div>}
          <div>
            <p className="text-muted-foreground">{item.label}</p>
            <p className="font-semibold">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
