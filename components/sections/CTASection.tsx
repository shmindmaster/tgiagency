import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCta: {
    text: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'gradient' | 'solid';
}

export function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = 'default',
}: CTASectionProps) {
  const backgroundStyles = {
    default: 'bg-gray-50',
    gradient: 'bg-gradient-to-r from-primary to-accent',
    solid: 'bg-secondary',
  };

  const textColor = variant === 'default' ? 'text-primary' : 'text-white';
  const descriptionColor = variant === 'default' ? 'text-foreground' : 'text-gray-100';

  return (
    <section className={cn('py-16 md:py-24', backgroundStyles[variant])}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={cn('text-3xl md:text-4xl font-bold mb-6', textColor)}>
            {title}
          </h2>

          {description && (
            <p className={cn('text-lg md:text-xl mb-8 leading-relaxed', descriptionColor)}>
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={primaryCta.onClick}
              className={cn(
                'text-lg px-8 py-6',
                variant !== 'default' && 'bg-white text-primary hover:bg-gray-100'
              )}
            >
              {primaryCta.text}
            </Button>

            {secondaryCta && (
              <Button
                size="lg"
                variant="outline"
                asChild
                className={cn(
                  'text-lg px-8 py-6',
                  variant !== 'default' && 'bg-transparent text-white border-white hover:bg-white/10'
                )}
              >
                <a href={secondaryCta.href}>{secondaryCta.text}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
