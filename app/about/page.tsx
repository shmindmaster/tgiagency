import { BenefitsGrid } from '@/components/sections/BenefitsGrid';
import { HeroSection } from '@/components/sections/HeroSection';
import { Award, Clock, Heart, Shield, TrendingUp, Users } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Texas General Insurance, a family-owned agency serving Texas since 1985 with comprehensive insurance solutions and exceptional service.',
  openGraph: {
    title: 'About Texas General Insurance',
    description: 'Family-owned and operated since 1985, serving Texas families and businesses with integrity, expertise, and personalized service.',
    type: 'website',
    images: ['/assets/brand/og-about.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Texas General Insurance',
    description: 'Family-owned and operated since 1985, serving Texas families and businesses with integrity, expertise, and personalized service.',
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Integrity First',
      description: 'We always put our clients\' interests first, providing honest advice and transparent pricing.',
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'As a local, family-owned business, we\'re deeply invested in the success of our Texas community.',
    },
    {
      icon: Award,
      title: 'Expert Guidance',
      description: 'Our experienced agents have decades of combined experience in the insurance industry.',
    },
    {
      icon: Heart,
      title: 'Personal Service',
      description: 'We treat every client like family, providing personalized attention and ongoing support.',
    },
    {
      icon: TrendingUp,
      title: 'Competitive Rates',
      description: 'We shop multiple carriers to ensure you get the best coverage at the most competitive price.',
    },
    {
      icon: Clock,
      title: 'Always Available',
      description: 'When you need us, we are here. Fast quotes, quick claims support, and responsive service.',
    },
  ];

  return (
    <div>
      <HeroSection
        title="About Texas General Insurance"
        subtitle="OUR STORY"
        description="Family-owned and operated since 1985, serving Texas families and businesses with comprehensive insurance solutions and exceptional personal service."
        variant="compact"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
              <p className="text-foreground leading-relaxed mb-4">
                Founded in 1985, Texas General Insurance began with a simple mission: to provide Texas families and businesses with honest, reliable insurance coverage at fair prices. What started as a small office in Austin has grown into one of the most trusted independent insurance agencies in the state.
              </p>
              <p className="text-foreground leading-relaxed mb-4">
                For over 40 years, we have remained true to our founding principles: integrity, personalized service, and unwavering commitment to our clients. As an independent agency, we represent multiple insurance carriers, giving us the flexibility to shop the market and find the perfect coverage for each client's unique needs.
              </p>
              <p className="text-foreground leading-relaxed mb-8">
                Today, we serve thousands of satisfied customers across Texas, from individual families to large commercial enterprises. Our team of experienced agents brings decades of combined industry knowledge, and we are proud to maintain long-lasting relationships with our clients - many of whom have been with us for generations.
              </p>

              <h2 className="text-3xl font-bold text-primary mb-6">Why Choose Us?</h2>
              <p className="text-foreground leading-relaxed mb-4">
                As an independent insurance agency, we work for you, not the insurance companies. This means we have the freedom to shop multiple carriers, compare coverage options, and negotiate on your behalf to secure the best possible rates. Whether you need auto, home, business, or life insurance, we take the time to understand your unique situation and provide customized solutions.
              </p>
              <p className="text-foreground leading-relaxed mb-8">
                Our commitment to exceptional service does not end when you sign a policy. We are here for you throughout the life of your coverage - helping with claims, adjusting policies as your needs change, and always available to answer your questions. When you work with Texas General Insurance, you are not just getting an insurance policy; you are gaining a trusted advisor and partner.
              </p>

              <h2 className="text-3xl font-bold text-primary mb-6">Our Service Area</h2>
              <p className="text-foreground leading-relaxed mb-4">
                While our headquarters is in Austin, we proudly serve clients throughout the great state of Texas. From the Gulf Coast to the Panhandle, from East Texas to West Texas, we understand the unique insurance needs of Texans. Our agents are licensed in Texas and have extensive knowledge of state-specific requirements and coverage options.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BenefitsGrid
        benefits={values}
        title="Our Core Values"
        subtitle="WHAT DRIVES US"
        columns={3}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-lg text-foreground mb-8 leading-relaxed">
              Join thousands of satisfied Texas families and businesses who trust Texas General Insurance for their coverage needs. Get your free quote today and discover why we have been the preferred choice for over 40 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-secondary hover:bg-secondary/90 rounded-lg transition-colors"
              >
                Contact Us Today
              </a>
              <a
                href="tel:+15555555555"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-primary bg-white border-2 border-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Call (555) 555-5555
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
