'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { QuoteStepThreeData } from '@/lib/validations';
import { quoteStepThreeSchema } from '@/lib/validations';
import { useQuoteStore } from '@/stores/quote-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function StepThree() {
  const { formData, updateFormData, nextStep, prevStep } = useQuoteStore();
  const insuranceType = formData.insuranceType;

  const { register, handleSubmit, setValue } = useForm<QuoteStepThreeData>({
    resolver: zodResolver(quoteStepThreeSchema),
    defaultValues: {
      propertyType: formData.propertyType || '',
      yearBuilt: formData.yearBuilt || '',
      vehicleMake: formData.vehicleMake || '',
      vehicleModel: formData.vehicleModel || '',
      vehicleYear: formData.vehicleYear || '',
      businessType: formData.businessType || '',
      employeeCount: formData.employeeCount || '',
      annualRevenue: formData.annualRevenue || '',
    },
  });

  const onSubmit = (data: QuoteStepThreeData) => {
    updateFormData(data);
    nextStep();
  };

  const renderFields = () => {
    if (insuranceType === 'auto') {
      return (
        <>
          <div>
            <Label htmlFor="vehicleYear">Vehicle Year</Label>
            <Input id="vehicleYear" {...register('vehicleYear')} placeholder="2020" />
          </div>
          <div>
            <Label htmlFor="vehicleMake">Vehicle Make</Label>
            <Input id="vehicleMake" {...register('vehicleMake')} placeholder="Toyota" />
          </div>
          <div>
            <Label htmlFor="vehicleModel">Vehicle Model</Label>
            <Input id="vehicleModel" {...register('vehicleModel')} placeholder="Camry" />
          </div>
        </>
      );
    }

    if (insuranceType === 'home' || insuranceType === 'renters') {
      return (
        <>
          <div>
            <Label htmlFor="propertyType">Property Type</Label>
            <Select onValueChange={(value) => setValue('propertyType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single-family">Single Family</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="yearBuilt">Year Built</Label>
            <Input id="yearBuilt" {...register('yearBuilt')} placeholder="2000" />
          </div>
        </>
      );
    }

    if (insuranceType === 'business' || insuranceType === 'landlord') {
      return (
        <>
          <div>
            <Label htmlFor="businessType">Business Type</Label>
            <Input id="businessType" {...register('businessType')} placeholder="Retail, Restaurant, etc." />
          </div>
          <div>
            <Label htmlFor="employeeCount">Number of Employees</Label>
            <Select onValueChange={(value) => setValue('employeeCount', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5</SelectItem>
                <SelectItem value="6-10">6-10</SelectItem>
                <SelectItem value="11-25">11-25</SelectItem>
                <SelectItem value="26-50">26-50</SelectItem>
                <SelectItem value="50+">50+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="annualRevenue">Annual Revenue</Label>
            <Select onValueChange={(value) => setValue('annualRevenue', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-100k">$0 - $100,000</SelectItem>
                <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                <SelectItem value="500k-1m">$500,000 - $1M</SelectItem>
                <SelectItem value="1m+">$1M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      );
    }

    return (
      <div>
        <p className="text-muted-foreground">
          No additional details needed for this insurance type. Click continue to proceed.
        </p>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-primary mb-2">
          Additional Details
        </h3>
        <p className="text-muted-foreground mb-6">
          Help us understand your specific needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderFields()}
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
