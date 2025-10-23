'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuoteStore } from '@/stores/quote-store';
import { QuoteFormWizard } from './QuoteFormWizard';

export function QuoteModal() {
  const { isModalOpen, closeModal } = useQuoteStore();

  const handleClose = () => {
    closeModal();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-full sm:max-w-2xl md:max-w-3xl px-4 sm:px-0 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-0 rounded-none sm:rounded-lg">
        <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 sticky top-0 bg-white border-b z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
              Get Your Free Quote
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="p-4 sm:p-6 md:p-8 pt-2">
          <QuoteFormWizard />
        </div>
      </DialogContent>
    </Dialog>
  );
}
