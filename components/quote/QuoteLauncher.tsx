'use client';

import { Button } from '@/components/ui/button';
import { useQuoteStore } from '@/stores/quote-store';

interface QuoteLauncherProps {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function QuoteLauncher({ variant, size, className }: QuoteLauncherProps) {
  const openModal = useQuoteStore((state) => state.openModal);

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={openModal}
    >
      Get a Quote
    </Button>
  );
}
