interface ReviewItem {
  label: string;
  value: string | number;
}

interface ReviewStepProps {
  items: ReviewItem[];
}

export function ReviewStep({ items }: ReviewStepProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Review & Submit</h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="pb-4 border-b border-border last:border-b-0">
            <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
            <p className="font-medium">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
