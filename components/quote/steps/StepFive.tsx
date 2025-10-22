'use client';

import { trackQuoteSubmit } from '@/components/analytics/analytics';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useQuoteStore } from '@/stores/quote-store';
import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function StepFive() {
  const { formData, updateFormData, prevStep, closeModal, resetForm, setCurrentStep } = useQuoteStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(formData.consent || false);

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    if (!consent) {
      setError('You must agree to the privacy policy and terms to continue.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Update store with consent before submission
      updateFormData({ consent, honeypot: '' });

      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          consent,
          honeypot: '', // Empty honeypot for legitimate submissions
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit quote request');
      }

      // Track analytics event
      trackQuoteSubmit(formData.insuranceType || '');

      setIsSuccess(true);
      setTimeout(() => {
        resetForm();
        closeModal();
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit quote request. Please try again.');
      console.error('Error submitting quote:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-2">Quote Request Submitted!</h3>
        <p className="text-muted-foreground">
          Thank you! We'll review your information and contact you within 24 hours with your personalized quote.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-primary mb-2">
          Review Your Information
        </h3>
        <p className="text-muted-foreground mb-6">
          Please review your details before submitting
        </p>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-primary">Insurance Type</h4>
              <Button variant="ghost" size="sm" onClick={() => handleEdit(1)}>
                Edit
              </Button>
            </div>
            <p className="text-foreground capitalize">{formData.insuranceType?.replace('-', ' ')}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-primary">Personal Information</h4>
              <Button variant="ghost" size="sm" onClick={() => handleEdit(2)}>
                Edit
              </Button>
            </div>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
              <p><span className="font-medium">Email:</span> {formData.email}</p>
              <p><span className="font-medium">Phone:</span> {formData.phone}</p>
              <p><span className="font-medium">Address:</span> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
            </div>
          </div>

          {(formData.vehicleMake || formData.propertyType || formData.businessType) && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-primary">Additional Details</h4>
                <Button variant="ghost" size="sm" onClick={() => handleEdit(3)}>
                  Edit
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                {formData.vehicleMake && (
                  <p><span className="font-medium">Vehicle:</span> {formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel}</p>
                )}
                {formData.propertyType && (
                  <>
                    <p><span className="font-medium">Property Type:</span> {formData.propertyType}</p>
                    <p><span className="font-medium">Year Built:</span> {formData.yearBuilt}</p>
                  </>
                )}
                {formData.businessType && (
                  <>
                    <p><span className="font-medium">Business Type:</span> {formData.businessType}</p>
                    <p><span className="font-medium">Employees:</span> {formData.employeeCount}</p>
                    <p><span className="font-medium">Revenue:</span> {formData.annualRevenue}</p>
                  </>
                )}
              </div>
            </div>
          )}

          {(formData.coverageAmount || formData.deductible || formData.startDate) && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-primary">Coverage Preferences</h4>
                <Button variant="ghost" size="sm" onClick={() => handleEdit(4)}>
                  Edit
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                {formData.coverageAmount && (
                  <p><span className="font-medium">Coverage Amount:</span> {formData.coverageAmount}</p>
                )}
                {formData.deductible && (
                  <p><span className="font-medium">Deductible:</span> ${formData.deductible}</p>
                )}
                {formData.startDate && (
                  <p><span className="font-medium">Start Date:</span> {formData.startDate}</p>
                )}
              </div>
            </div>
          )}

          {formData.additionalNotes && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Additional Notes</h4>
              <p className="text-sm text-foreground">{formData.additionalNotes}</p>
            </div>
          )}
        </div>

        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
          }}
          aria-hidden="true"
        />

        {/* Consent checkbox */}
        <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
          <Checkbox
            id="consent"
            checked={consent}
            onCheckedChange={(checked) => setConsent(checked === true)}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="consent" className="text-sm font-medium cursor-pointer">
              I agree to the{' '}
              <a href="/privacy-policy" target="_blank" className="text-primary hover:underline">
                Privacy Policy
              </a>{' '}
              and consent to be contacted regarding my quote request.
            </Label>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting || !consent}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Quote Request'
          )}
        </Button>
      </div>
    </div>
  );
}
