import { Button } from '@/components/ui/button';

interface UploadNavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isLastStep: boolean;
  isLoading?: boolean;
  error?: string;
}

export function UploadNavigationButtons({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  isLastStep,
  isLoading,
  error,
}: UploadNavigationButtonsProps) {
  if (isLastStep) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Button variant="outline" onClick={onBack} disabled={currentStep === 1 || isLoading} className="min-h-11 w-full sm:w-auto">
        Back
      </Button>
      {error && <p className="text-sm text-destructive order-last sm:order-none w-full sm:w-auto text-center sm:text-left">{error}</p>}
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        {currentStep < totalSteps - 1 && <Button onClick={onNext} disabled={isLoading} className="min-h-11 w-full sm:w-auto">Next</Button>}
        {currentStep === totalSteps - 1 && (
          <Button onClick={onSubmit} disabled={isLoading} className="min-h-11 w-full sm:w-auto">
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        )}
      </div>
    </div>
  );
}
