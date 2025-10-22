'use client';

import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { BenefitsGrid } from '@/components/sections/BenefitsGrid';
import { CTASection } from '@/components/sections/CTASection';
import { useQuoteStore } from '@/stores/quote-store';
import { Shield, CheckCircle, TrendingDown, Clock, Award, Users } from 'lucide-react';

const personalInsuranceData: Record<string, any> = {
  auto: {
    title: 'Auto Insurance in Texas',
    subtitle: 'COMPREHENSIVE VEHICLE PROTECTION',
    description: 'Get affordable auto insurance coverage with liability, collision, comprehensive, and uninsured motorist protection. Protect yourself and your vehicle on Texas roads.',
    benefits: [
      {
        icon: Shield,
        title: 'Liability Coverage',
        description: 'Protects you financially if you cause an accident, covering bodily injury and property damage to others.',
      },
      {
        icon: CheckCircle,
        title: 'Collision Coverage',
        description: 'Pays for damage to your vehicle from accidents, regardless of who is at fault.',
      },
      {
        icon: TrendingDown,
        title: 'Comprehensive Coverage',
        description: 'Covers damage from non-collision events like theft, vandalism, weather, and animal strikes.',
      },
      {
        icon: Clock,
        title: 'Uninsured Motorist',
        description: "Protects you if you're hit by a driver without insurance or a hit-and-run driver.",
      },
      {
        icon: Award,
        title: 'Medical Payments',
        description: 'Covers medical expenses for you and your passengers after an accident.',
      },
      {
        icon: Users,
        title: 'Roadside Assistance',
        description: 'Optional coverage for towing, lockout service, flat tire changes, and fuel delivery.',
      },
    ],
  },
  home: {
    title: 'Homeowners Insurance in Texas',
    subtitle: 'PROTECT YOUR HOME & BELONGINGS',
    description: 'Comprehensive homeowners insurance that protects your house, personal property, and provides liability coverage. Get peace of mind knowing your most valuable asset is protected.',
    benefits: [
      {
        icon: Shield,
        title: 'Dwelling Coverage',
        description: 'Protects the physical structure of your home from covered perils like fire, wind, and hail damage.',
      },
      {
        icon: CheckCircle,
        title: 'Personal Property',
        description: 'Covers your belongings including furniture, electronics, clothing, and other personal items.',
      },
      {
        icon: TrendingDown,
        title: 'Liability Protection',
        description: "Protects you if someone is injured on your property or if you damage someone else's property.",
      },
      {
        icon: Clock,
        title: 'Loss of Use',
        description: 'Pays for temporary living expenses if your home becomes uninhabitable due to a covered loss.',
      },
      {
        icon: Award,
        title: 'Medical Payments',
        description: 'Covers medical expenses for guests injured on your property, regardless of fault.',
      },
      {
        icon: Users,
        title: 'Additional Structures',
        description: 'Covers detached structures like garages, sheds, fences, and gazebos on your property.',
      },
    ],
  },
  renters: {
    title: 'Renters Insurance in Texas',
    subtitle: 'AFFORDABLE PROTECTION FOR RENTERS',
    description: 'Protect your personal belongings and get liability coverage as a renter. Affordable coverage that gives you peace of mind in your rental home or apartment.',
    benefits: [
      {
        icon: Shield,
        title: 'Personal Property Coverage',
        description: 'Protects your belongings from theft, fire, vandalism, and other covered perils.',
      },
      {
        icon: CheckCircle,
        title: 'Liability Protection',
        description: "Covers legal costs if someone is injured in your rental or if you damage someone else's property.",
      },
      {
        icon: TrendingDown,
        title: 'Additional Living Expenses',
        description: 'Pays for temporary housing if your rental becomes uninhabitable due to a covered event.',
      },
      {
        icon: Clock,
        title: 'Medical Payments',
        description: 'Covers medical bills for guests injured in your rental, regardless of fault.',
      },
      {
        icon: Award,
        title: 'Identity Theft Protection',
        description: 'Optional coverage to help recover from identity theft and restore your credit.',
      },
      {
        icon: Users,
        title: 'Worldwide Coverage',
        description: 'Your personal property is covered even when you travel, with some limitations.',
      },
    ],
  },
  life: {
    title: 'Life Insurance in Texas',
    subtitle: "SECURE YOUR FAMILY'S FUTURE",
    description: 'Provide financial security for your loved ones with term or whole life insurance. Ensure your family can maintain their lifestyle and meet financial obligations.',
    benefits: [
      {
        icon: Shield,
        title: 'Term Life Insurance',
        description: 'Affordable coverage for a specific period, ideal for income replacement and debt protection.',
      },
      {
        icon: CheckCircle,
        title: 'Whole Life Insurance',
        description: 'Permanent coverage with cash value accumulation and guaranteed death benefit.',
      },
      {
        icon: TrendingDown,
        title: 'Income Replacement',
        description: 'Replaces your income to help your family maintain their standard of living.',
      },
      {
        icon: Clock,
        title: 'Debt Protection',
        description: "Covers mortgages, car loans, credit cards, and other debts so they don't burden your family.",
      },
      {
        icon: Award,
        title: 'Education Funding',
        description: 'Ensures your children can afford college or vocational training.',
      },
      {
        icon: Users,
        title: 'Final Expenses',
        description: 'Covers funeral costs and other end-of-life expenses, reducing stress for loved ones.',
      },
    ],
  },
  boat: {
    title: 'Boat Insurance in Texas',
    subtitle: 'COMPREHENSIVE MARINE COVERAGE',
    description: 'Protect your watercraft with specialized boat insurance covering physical damage, liability, medical payments, and more. Enjoy the water with confidence.',
    benefits: [
      {
        icon: Shield,
        title: 'Physical Damage Coverage',
        description: 'Covers damage to your boat from accidents, weather, vandalism, and theft.',
      },
      {
        icon: CheckCircle,
        title: 'Liability Protection',
        description: 'Protects you if you cause injury to others or damage to property while operating your boat.',
      },
      {
        icon: TrendingDown,
        title: 'Medical Payments',
        description: 'Covers medical expenses for you and your passengers injured in a boating accident.',
      },
      {
        icon: Clock,
        title: 'Uninsured Boater',
        description: "Protects you if you're involved in an accident with an uninsured or underinsured boater.",
      },
      {
        icon: Award,
        title: 'Personal Property',
        description: 'Covers fishing equipment, water skis, and other personal items on your boat.',
      },
      {
        icon: Users,
        title: 'Towing & Assistance',
        description: 'Provides on-water towing and assistance if your boat becomes disabled.',
      },
    ],
  },
  flood: {
    title: 'Flood Insurance in Texas',
    subtitle: 'ESSENTIAL FLOOD PROTECTION',
    description: "Protect your home and belongings from flood damage with specialized flood insurance. Standard homeowners policies don't cover floods - make sure you're protected.",
    benefits: [
      {
        icon: Shield,
        title: 'Building Coverage',
        description: 'Covers the structure of your home including foundation, walls, electrical systems, and HVAC.',
      },
      {
        icon: CheckCircle,
        title: 'Contents Coverage',
        description: 'Protects your personal belongings including furniture, electronics, and clothing.',
      },
      {
        icon: TrendingDown,
        title: 'Increased Limits',
        description: 'Available coverage up to $250,000 for your building and $100,000 for contents.',
      },
      {
        icon: Clock,
        title: 'Basement Coverage',
        description: 'Limited coverage for items in basements, including furnaces, water heaters, and washers/dryers.',
      },
      {
        icon: Award,
        title: 'Replacement Cost',
        description: 'Optional coverage that pays to replace damaged items without depreciation.',
      },
      {
        icon: Users,
        title: 'All Flood Zones',
        description: "Coverage available regardless of whether you're in a high-risk flood zone.",
      },
    ],
  },
};

export default function PersonalInsurancePage({ params }: { params: { slug: string } }) {
  const openModal = useQuoteStore((state) => state.openModal);
  const data = personalInsuranceData[params.slug];

  if (!data) {
    notFound();
  }

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
      />

      <BenefitsGrid
        benefits={data.benefits}
        title="Coverage Options"
        subtitle="WHAT'S INCLUDED"
        columns={3}
      />

      <CTASection
        title="Ready to Get Covered?"
        description="Get your personalized quote in minutes. Our experienced agents are here to help you find the right coverage at the best price."
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
