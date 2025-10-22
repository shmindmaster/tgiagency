'use client';

import { useQuoteStore } from '@/stores/quote-store';
import { StepOne } from './steps/StepOne';
import { StepTwo } from './steps/StepTwo';
import { StepThree } from './steps/StepThree';
import { StepFour } from './steps/StepFour';
import { StepFive } from './steps/StepFive';
import { Progress } from '@/components/ui/progress';

export function QuoteFormWizard() {
  const currentStep = useQuoteStore((state) => state.currentStep);

  const steps = [
    { component: StepOne, label: 'Insurance Type' },
    { component: StepTwo, label: 'Personal Info' },
    { component: StepThree, label: 'Details' },
    { component: StepFour, label: 'Coverage' },
    { component: StepFive, label: 'Review' },
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;
  const progress = (currentStep / steps.length) * 100;

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm font-medium text-primary">
            {steps[currentStep - 1].label}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="min-h-[400px]">
        <CurrentStepComponent />
      </div>
    </div>
  );
}
