import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface InsuranceCard {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  image?: string;
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

        <div className="@container">
          <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <Link key={index} href={card.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden">
                  <CardContent className="p-0">
                    {card.image && (
                      <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-primary/5 to-secondary/5">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <div className="w-12 h-12 bg-white/90 backdrop-blur-xs rounded-lg flex items-center justify-center">
                            <card.icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-secondary transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-foreground leading-relaxed mb-4">
                        {card.description}
                      </p>
                      <div className="flex items-center text-secondary font-medium group-hover:translate-x-1 transition-transform">
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
