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
    <div className="flex justify-between mb-12">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`flex flex-col items-center ${step.number <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center border-2 mb-2 ${
              step.number < currentStep
                ? 'bg-primary border-primary text-primary-foreground'
                : step.number === currentStep
                  ? 'border-primary'
                  : 'border-border'
            }`}
          >
            {step.number < currentStep ? <CheckCircle className="h-6 w-6" /> : step.number}
          </div>
          <span className="text-sm font-medium">{step.label}</span>
        </div>
      ))}
    </div>
  );
}
