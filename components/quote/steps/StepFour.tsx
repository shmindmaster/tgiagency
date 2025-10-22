'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuoteStore } from '@/stores/quote-store';
import { quoteStepFourSchema, QuoteStepFourData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function StepFour() {
  const { formData, updateFormData, nextStep, prevStep } = useQuoteStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QuoteStepFourData>({
    resolver: zodResolver(quoteStepFourSchema),
    defaultValues: {
      coverageAmount: formData.coverageAmount || '',
      deductible: formData.deductible || '',
      startDate: formData.startDate || '',
      additionalNotes: formData.additionalNotes || '',
    },
  });

  const onSubmit = (data: QuoteStepFourData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-primary mb-2">
          Coverage Preferences
        </h3>
        <p className="text-muted-foreground mb-6">
          Let us know your coverage preferences
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="coverageAmount">Desired Coverage Amount (Optional)</Label>
            <Select onValueChange={(value) => setValue('coverageAmount', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select coverage amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50k">$50,000</SelectItem>
                <SelectItem value="100k">$100,000</SelectItem>
                <SelectItem value="250k">$250,000</SelectItem>
                <SelectItem value="500k">$500,000</SelectItem>
                <SelectItem value="1m">$1,000,000</SelectItem>
                <SelectItem value="custom">Custom Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="deductible">Preferred Deductible (Optional)</Label>
            <Select onValueChange={(value) => setValue('deductible', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select deductible" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="250">$250</SelectItem>
                <SelectItem value="500">$500</SelectItem>
                <SelectItem value="1000">$1,000</SelectItem>
                <SelectItem value="2500">$2,500</SelectItem>
                <SelectItem value="5000">$5,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="startDate">Desired Start Date (Optional)</Label>
            <Input
              id="startDate"
              type="date"
              {...register('startDate')}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <Label htmlFor="additionalNotes">Additional Notes or Questions (Optional)</Label>
            <Textarea
              id="additionalNotes"
              {...register('additionalNotes')}
              placeholder="Tell us anything else we should know..."
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
