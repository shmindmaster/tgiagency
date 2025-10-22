import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ReactNode } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    text: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  imageAlt?: string;
  priorityImage?: boolean;
  variant?: 'default' | 'centered' | 'compact';
  children?: ReactNode;
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
  imageAlt = '',
  priorityImage = false,
  variant = 'default',
  children,
}: HeroSectionProps) {
  const isCompact = variant === 'compact';
  const isCentered = variant === 'centered';

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden',
        isCompact ? 'py-16 md:py-20' : 'py-20 md:py-32',
        backgroundImage && 'text-white'
      )}
    >
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt={imageAlt || subtitle || title}
            fill
            priority={priorityImage}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={cn(
            'max-w-4xl',
            isCentered && 'mx-auto text-center'
          )}
        >
          {subtitle && (
            <p className={cn(
              'text-sm font-semibold tracking-wide uppercase mb-4',
              backgroundImage ? 'text-accent' : 'text-secondary'
            )}>
              {subtitle}
            </p>
          )}

          <h1
            className={cn(
              'font-bold mb-6',
              isCompact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl lg:text-6xl',
              !backgroundImage && 'text-primary'
            )}
          >
            {title}
          </h1>

          {description && (
            <p className={cn(
              'text-lg md:text-xl mb-8 leading-relaxed',
              backgroundImage ? 'text-gray-100' : 'text-foreground'
            )}>
              {description}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className={cn(
              'flex flex-col sm:flex-row gap-4',
              isCentered && 'justify-center'
            )}>
              {primaryCta && (
                <Button
                  size="lg"
                  onClick={primaryCta.onClick}
                  className="text-lg px-8 py-6"
                >
                  {primaryCta.text}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className={cn(
                    'text-lg px-8 py-6',
                    backgroundImage && 'bg-white hover:bg-gray-100 text-primary border-white'
                  )}
                >
                  <a href={secondaryCta.href}>{secondaryCta.text}</a>
                </Button>
              )}
            </div>
          )}

          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
