import { Button } from '@/components/ui/button';

interface UploadNavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isLastStep: boolean;
  isLoading?: boolean;
}

export function UploadNavigationButtons({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  isLastStep,
  isLoading,
}: UploadNavigationButtonsProps) {
  if (isLastStep) {
    return null;
  }

  return (
    <div className="flex gap-4 mt-8 justify-between">
      <Button variant="outline" onClick={onBack} disabled={currentStep === 1 || isLoading}>
        Back
      </Button>
      <div className="flex gap-4">
        {currentStep < totalSteps - 1 && <Button onClick={onNext} disabled={isLoading}>Next</Button>}
        {currentStep === totalSteps - 1 && (
          <Button onClick={onSubmit} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        )}
      </div>
    </div>
  );
}
