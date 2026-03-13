import { CheckCircle } from 'lucide-react';

interface Step {
  number: number;
  label: string;
}

interface UploadStepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

export function UploadStepIndicator({ currentStep, steps }: UploadStepIndicatorProps) {
  return (
    <div className="mb-8 flex items-start justify-between gap-3 overflow-x-auto pb-2 md:mb-12">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`flex min-w-20 flex-col items-center text-center ${step.number <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <div
            className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
              step.number < currentStep
                ? 'bg-primary border-primary text-primary-foreground'
                : step.number === currentStep
                  ? 'border-primary'
                  : 'border-border'
            }`}
          >
            {step.number < currentStep ? <CheckCircle className="h-6 w-6" /> : step.number}
          </div>
          <span className="text-xs font-medium sm:text-sm">{step.label}</span>
        </div>
      ))}
    </div>
  );
}
