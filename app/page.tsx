'use client';

// Next.js 16: Client components with hooks require dynamic rendering
export const dynamic = 'force-dynamic';

import { BenefitsGrid } from '@/components/sections/BenefitsGrid';
import { CTASection } from '@/components/sections/CTASection';
import { HeroSection } from '@/components/sections/HeroSection';
import { InsuranceCardGrid } from '@/components/sections/InsuranceCardGrid';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { useQuoteStore } from '@/stores/quote-store';
import {
  Anchor,
  Award,
  Building2,
  Car,
  CheckCircle,
  Clock,
  Droplets,
  FileCheck,
  Heart,
  Home as HomeIcon,
  Key,
  Shield,
  TrendingDown,
  Users
} from 'lucide-react';

export default function Home() {
  const openModal = useQuoteStore((state) => state.openModal);

  const benefits = [
    {
      icon: Shield,
      title: 'Comprehensive Coverage',
      description: 'Protect what matters most with tailored insurance solutions designed for your unique needs.',
    },
    {
      icon: Clock,
      title: 'Fast Quote Process',
      description: 'Get your personalized quote in minutes, not hours. Our streamlined process saves you time.',
    },
    {
      icon: Users,
      title: 'Local Expertise',
      description: 'Your neighbors in Sugar Land. We understand Texas and serve our community with pride.',
    },
    {
      icon: TrendingDown,
      title: 'Competitive Rates',
      description: 'Access multiple carriers to find the best coverage at the most affordable price.',
    },
    {
      icon: CheckCircle,
      title: 'Claims Support',
      description: 'We are with you every step of the way, from quote to claim. Your success is our priority.',
    },
    {
      icon: Award,
      title: 'Trusted Service',
      description: '40+ years of excellence serving Texas families and businesses with integrity.',
    },
  ];

  const insuranceCards = [
    {
      icon: Car,
      title: 'Auto Insurance',
      description: 'Comprehensive coverage for your vehicle with liability, collision, and comprehensive options.',
      href: '/personal/auto',
      image: '/assets/products/car-insurance.jpg',
    },
    {
      icon: HomeIcon,
      title: 'Home Insurance',
      description: 'Protect your home and belongings with customizable coverage options and competitive rates.',
      href: '/personal/home',
      image: '/assets/products/home-insurance.jpg',
    },
    {
      icon: Key,
      title: 'Renters Insurance',
      description: 'Affordable protection for your personal property and liability coverage for renters.',
      href: '/personal/renters',
      image: '/assets/products/renter-insurance.jpg',
    },
    {
      icon: Heart,
      title: 'Life Insurance',
      description: 'Secure your family\'s financial future with term and whole life insurance options.',
      href: '/personal/life',
      image: '/assets/products/life-insurance.jpg',
    },
    {
      icon: Anchor,
      title: 'Boat Insurance',
      description: 'Keep your watercraft protected with specialized marine insurance coverage.',
      href: '/personal/boat',
      image: '/assets/products/boat-insurance.jpg',
    },
    {
      icon: Droplets,
      title: 'Flood Insurance',
      description: 'Essential protection against flood damage not covered by standard homeowners policies.',
      href: '/personal/flood',
      image: '/assets/products/flood-insurance.jpg',
    },
    {
      icon: Building2,
      title: 'Business Insurance',
      description: 'Comprehensive commercial coverage to protect your business assets and operations.',
      href: '/business/business',
      image: '/assets/products/business-insurance.jpg',
    },
    {
      icon: Users,
      title: 'Landlord Insurance',
      description: 'Specialized coverage for rental property owners and real estate investors.',
      href: '/business/landlord',
      image: '/assets/products/landlord-insurance.jpg',
    },
    {
      icon: FileCheck,
      title: 'Surety Bonds',
      description: 'Professional bonding services for contractors, businesses, and legal requirements.',
      href: '/business/bonds',
      image: '/assets/products/bond-insurance.jpg',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Martinez',
      location: 'Sugar Land, TX',
      rating: 5,
      text: 'Texas General Insurance made switching my auto and home insurance incredibly easy. I saved over $800 a year and got better coverage. Their team is professional, responsive, and truly cares.',
      insuranceType: 'Auto & Home Insurance',
      image: '/assets/testimonials/testimonial-woman-30s-caucasian.jpg',
    },
    {
      name: 'Michael Chen',
      location: 'Houston, TX',
      rating: 5,
      text: 'As a small business owner, finding the right insurance was overwhelming until I found TGI. They took the time to understand my needs and found coverage that fits my budget perfectly.',
      insuranceType: 'Business Insurance',
      image: '/assets/testimonials/testimonial-businessman-50s.jpg',
    },
    {
      name: 'Jennifer Williams',
      location: 'Dallas, TX',
      rating: 5,
      text: 'When my home was damaged in a storm, Texas General Insurance guided me through every step of the claims process. Their support made a stressful situation so much easier.',
      insuranceType: 'Home Insurance',
      image: '/assets/testimonials/testimonial-businesswoman-40s.jpg',
    },
  ];

  return (
    <div>
      <HeroSection
        title="Protect What Matters Most"
        subtitle="TEXAS INSURANCE EXPERTS"
        description="Get comprehensive insurance coverage for your auto, home, business, and life. Serving Sugar Land and the greater Houston area with competitive rates and exceptional service."
        primaryCta={{
          text: 'Get Your Free Quote',
          onClick: openModal,
        }}
        secondaryCta={{
          text: 'View Coverage Options',
          href: '#insurance-types',
        }}
        backgroundImage="/assets/general/hero-business-people.jpg"
        priorityImage={true}
      />

      <BenefitsGrid
        benefits={benefits}
        title="Why Choose Texas General Insurance?"
        subtitle="OUR COMMITMENT"
        columns={3}
      />

      <InsuranceCardGrid
        cards={insuranceCards}
        title="Comprehensive Insurance Solutions"
        subtitle="COVERAGE OPTIONS"
      />

      <PartnersSection />

      <TestimonialsCarousel
        testimonials={testimonials}
        title="What Our Customers Say"
        subtitle="TESTIMONIALS"
      />

      <CTASection
        title="Ready to Get Started?"
        description="Get your free, no-obligation quote in minutes. Our experienced team is here to help you find the perfect coverage at the best price."
        primaryCta={{
          text: 'Get Your Free Quote',
          onClick: openModal,
        }}
        secondaryCta={{
          text: 'Contact Us',
          href: '/contact',
        }}
        variant="gradient"
      />
    </div>
  );
}
