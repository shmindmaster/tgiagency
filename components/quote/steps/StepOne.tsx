'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuoteStore } from '@/stores/quote-store';
import { quoteStepOneSchema, QuoteStepOneData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Car, Home, Building2, Heart, Anchor, Droplets, Users, Key, FileCheck } from 'lucide-react';

const insuranceTypes = [
  { id: 'auto', label: 'Auto Insurance', icon: Car },
  { id: 'home', label: 'Home Insurance', icon: Home },
  { id: 'renters', label: 'Renters Insurance', icon: Key },
  { id: 'life', label: 'Life Insurance', icon: Heart },
  { id: 'boat', label: 'Boat Insurance', icon: Anchor },
  { id: 'flood', label: 'Flood Insurance', icon: Droplets },
  { id: 'business', label: 'Business Insurance', icon: Building2 },
  { id: 'landlord', label: 'Landlord Insurance', icon: Users },
  { id: 'bonds', label: 'Surety Bonds', icon: FileCheck },
];

export function StepOne() {
  const { formData, updateFormData, nextStep } = useQuoteStore();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuoteStepOneData>({
    resolver: zodResolver(quoteStepOneSchema),
    defaultValues: {
      insuranceType: formData.insuranceType || '',
    },
  });

  const selectedType = watch('insuranceType');

  const onSubmit = (data: QuoteStepOneData) => {
    updateFormData(data);
    nextStep();
  };

  const handleTypeSelect = (type: string) => {
    setValue('insuranceType', type, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-primary mb-2">
          What type of insurance are you looking for?
        </h3>
        <p className="text-muted-foreground mb-6">
          Select the insurance type that best fits your needs
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {insuranceTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => handleTypeSelect(type.id)}
                className={`p-4 border-2 rounded-lg transition-all hover:border-secondary ${
                  selectedType === type.id
                    ? 'border-secondary bg-accent/10'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Icon className={`h-8 w-8 mb-2 mx-auto ${
                  selectedType === type.id ? 'text-secondary' : 'text-primary'
                }`} />
                <p className="text-sm font-medium text-center">{type.label}</p>
              </button>
            );
          })}
        </div>

        {errors.insuranceType && (
          <p className="text-sm text-destructive mt-2">{errors.insuranceType.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" size="lg">
          Continue
        </Button>
      </div>
    </form>
  );
}
