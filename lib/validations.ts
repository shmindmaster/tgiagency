import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const quoteStepOneSchema = z.object({
  insuranceType: z.string().min(1, 'Please select an insurance type'),
});

export const quoteStepTwoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
});

export const quoteStepThreeSchema = z.object({
  propertyType: z.string().optional(),
  yearBuilt: z.string().optional(),
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleYear: z.string().optional(),
  businessType: z.string().optional(),
  employeeCount: z.string().optional(),
  annualRevenue: z.string().optional(),
});

export const quoteStepFourSchema = z.object({
  coverageAmount: z.string().optional(),
  deductible: z.string().optional(),
  startDate: z.string().optional(),
  additionalNotes: z.string().optional(),
});

// Unified quote submission schema for API route
export const quoteSubmissionSchema = z.object({
  // Step 1
  insuranceType: z.string().min(1, 'Insurance type is required'),
  // Step 2
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  // Step 3 (conditional)
  propertyType: z.string().optional(),
  yearBuilt: z.string().optional(),
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleYear: z.string().optional(),
  businessType: z.string().optional(),
  employeeCount: z.string().optional(),
  annualRevenue: z.string().optional(),
  // Step 4
  coverageAmount: z.string().optional(),
  deductible: z.string().optional(),
  startDate: z.string().optional(),
  additionalNotes: z.string().optional(),
  // Security & Compliance
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy and terms',
  }),
  honeypot: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type QuoteStepOneData = z.infer<typeof quoteStepOneSchema>;
export type QuoteStepTwoData = z.infer<typeof quoteStepTwoSchema>;
export type QuoteStepThreeData = z.infer<typeof quoteStepThreeSchema>;
export type QuoteStepFourData = z.infer<typeof quoteStepFourSchema>;
export type QuoteSubmissionData = z.infer<typeof quoteSubmissionSchema>;
