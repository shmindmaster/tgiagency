import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface InsuranceCard {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

interface InsuranceCardGridProps {
  cards: InsuranceCard[];
  title?: string;
  subtitle?: string;
}

export function InsuranceCardGrid({
  cards,
  title,
  subtitle,
}: InsuranceCardGridProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {subtitle && (
              <p className="text-sm font-semibold tracking-wide uppercase text-secondary mb-2">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link key={index} href={card.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <card.icon className="h-7 w-7 text-secondary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed mb-4">
                    {card.description}
                  </p>
                  <div className="flex items-center text-secondary font-medium group-hover:translate-x-1 transition-transform">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
