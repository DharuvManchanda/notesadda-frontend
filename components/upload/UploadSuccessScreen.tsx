import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadSuccessScreenProps {
  onReturn: () => void;
  returnLabel?: string;
}

export function UploadSuccessScreen({
  onReturn,
  returnLabel = 'Back to Home',
}: UploadSuccessScreenProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
      <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-green-900 mb-2">Upload Successful!</h2>
      <p className="text-green-800 mb-6">Your notes have been submitted for review. You'll be notified once they're approved.</p>
      <Button onClick={onReturn}>{returnLabel}</Button>
    </div>
  );
}
