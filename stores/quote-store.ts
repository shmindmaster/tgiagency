/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuoteFormData {
  insuranceType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType?: string;
  yearBuilt?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  businessType?: string;
  employeeCount?: string;
  annualRevenue?: string;
  coverageAmount?: string;
  deductible?: string;
  startDate?: string;
  additionalNotes?: string;
  consent?: boolean;
  honeypot?: string;
}

interface QuoteStore {
  currentStep: number;
  formData: Partial<QuoteFormData>;
  isModalOpen: boolean;
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  resetForm: () => void;
  openModal: () => void;
  closeModal: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

const initialFormData: Partial<QuoteFormData> = {
  insuranceType: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: initialFormData,
      isModalOpen: false,

      setCurrentStep: (step) => set({ currentStep: step }),

      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      resetForm: () =>
        set({
          currentStep: 1,
          formData: initialFormData,
        }),

      openModal: () => set({ isModalOpen: true }),

      closeModal: () => set({ isModalOpen: false }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 5),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),
    }),
    {
      name: 'quote-storage',
      partialize: (state) => ({ formData: state.formData }),
    }
  )
);
