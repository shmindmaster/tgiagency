'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuoteStore } from '@/stores/quote-store';
import { QuoteFormWizard } from './QuoteFormWizard';
import { X } from 'lucide-react';

export function QuoteModal() {
  const { isModalOpen, closeModal, resetForm } = useQuoteStore();

  const handleClose = () => {
    closeModal();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-4 sticky top-0 bg-white border-b z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-primary">
              Get Your Free Quote
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="p-6 pt-2">
          <QuoteFormWizard />
        </div>
      </DialogContent>
    </Dialog>
  );
}
