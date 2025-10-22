'use client';

import { CTASection } from '@/components/sections/CTASection';
import { HeroSection } from '@/components/sections/HeroSection';
import { Card, CardContent } from '@/components/ui/card';
import { useQuoteStore } from '@/stores/quote-store';
import { Award, CheckCircle, Clock, Shield, TrendingDown, Users } from 'lucide-react';

const iconMap: Record<string, any> = {
  Shield,
  CheckCircle,
  TrendingDown,
  Clock,
  Award,
  Users,
};

export function BusinessPageClient({ data }: { data: any }) {
  const openModal = useQuoteStore((state) => state.openModal);

  return (
    <div>
      <HeroSection
        title={data.title}
        subtitle={data.subtitle}
        description={data.description}
        primaryCta={{
          text: 'Get Your Free Quote',
          onClick: openModal,
        }}
        secondaryCta={{
          text: 'Contact Us',
          href: '/contact',
        }}
        variant="compact"
        backgroundImage={data.backgroundImage}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
              WHAT'S INCLUDED
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Coverage Options
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.benefits.map((benefit: any, index: number) => {
              const Icon = iconMap[benefit.icon];
              return (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Protect Your Business?"
        description="Get a customized quote tailored to your business needs. Our commercial insurance specialists are ready to help."
        primaryCta={{
          text: 'Get Your Free Quote',
          onClick: openModal,
        }}
        secondaryCta={{
          text: 'Speak with an Agent',
          href: '/contact',
        }}
        variant="solid"
      />
    </div>
  );
}
