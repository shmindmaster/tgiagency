import { BusinessPageClient } from '@/components/sections/BusinessPageClient';
import { notFound } from 'next/navigation';

// Next.js 16: Pre-render all business insurance pages at build time
export const dynamic = 'force-static';

const businessInsuranceData: Record<string, any> = {
  business: {
    title: 'Business Insurance in Texas',
    subtitle: 'COMPREHENSIVE COMMERCIAL PROTECTION',
    description: 'Protect your business assets, employees, and operations with comprehensive commercial insurance. From general liability to property coverage, we have you covered.',
    backgroundImage: '/assets/general/businessman-motor-show.jpg',
    benefits: [
      {
        icon: 'Shield',
        title: 'General Liability',
        description: 'Protects against third-party claims for bodily injury, property damage, and advertising injury.',
      },
      {
        icon: 'CheckCircle',
        title: 'Property Coverage',
        description: 'Covers buildings, equipment, inventory, and furniture from fire, theft, and other perils.',
      },
      {
        icon: 'TrendingDown',
        title: 'Business Interruption',
        description: 'Replaces lost income if your business operations are suspended due to a covered loss.',
      },
      {
        icon: 'Clock',
        title: 'Workers Compensation',
        description: 'Covers medical expenses and lost wages for employees injured on the job.',
      },
      {
        icon: 'Award',
        title: 'Professional Liability',
        description: 'Protects against claims of negligence, errors, or omissions in professional services.',
      },
      {
        icon: 'Users',
        title: 'Commercial Auto',
        description: 'Covers vehicles used for business purposes including liability and physical damage.',
      },
    ],
  },
  landlord: {
    title: 'Landlord Insurance in Texas',
    subtitle: 'PROTECT YOUR RENTAL PROPERTY',
    description: 'Specialized coverage for rental property owners including property damage, liability protection, and loss of rental income. Protect your investment property.',
    backgroundImage: '/assets/general/background-policy-header.jpg',
    benefits: [
      {
        icon: 'Shield',
        title: 'Dwelling Coverage',
        description: 'Protects the physical structure of your rental property from fire, wind, vandalism, and other perils.',
      },
      {
        icon: 'CheckCircle',
        title: 'Liability Protection',
        description: 'Covers legal costs if a tenant or visitor is injured on your rental property.',
      },
      {
        icon: 'TrendingDown',
        title: 'Loss of Rental Income',
        description: 'Replaces lost rent if your property becomes uninhabitable due to a covered loss.',
      },
      {
        icon: 'Clock',
        title: 'Legal Expenses',
        description: 'Covers legal costs for eviction proceedings and other landlord-tenant disputes.',
      },
      {
        icon: 'Award',
        title: 'Equipment & Appliances',
        description: 'Covers appliances, HVAC systems, and other equipment you provide to tenants.',
      },
      {
        icon: 'Users',
        title: 'Additional Structures',
        description: 'Covers garages, storage buildings, and other structures on the rental property.',
      },
    ],
  },
  bonds: {
    title: 'Surety Bonds in Texas',
    subtitle: 'PROFESSIONAL BONDING SERVICES',
    description: 'Get the surety bonds you need for contractor licensing, court requirements, and business operations. Fast approval and competitive rates.',
    backgroundImage: '/assets/general/background-agent-contract.jpg',
    benefits: [
      {
        icon: 'Shield',
        title: 'Contractor License Bonds',
        description: 'Required bonds for general contractors, electricians, plumbers, and other licensed trades.',
      },
      {
        icon: 'CheckCircle',
        title: 'Court Bonds',
        description: 'Judicial bonds including appeal bonds, fiduciary bonds, and probate bonds.',
      },
      {
        icon: 'TrendingDown',
        title: 'Commercial Bonds',
        description: 'Business service bonds, utility bonds, and other commercial surety products.',
      },
      {
        icon: 'Clock',
        title: 'Fast Approval',
        description: 'Quick turnaround times with most bonds issued within 24-48 hours.',
      },
      {
        icon: 'Award',
        title: 'Competitive Rates',
        description: 'Access to multiple surety markets ensures you get the best rates available.',
      },
      {
        icon: 'Users',
        title: 'Expert Guidance',
        description: 'Experienced agents help you navigate bond requirements and application processes.',
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(businessInsuranceData).map((slug) => ({
    slug,
  }));
}

export default async function BusinessInsurancePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const data = businessInsuranceData[params.slug];

  if (!data) {
    notFound();
  }

  return <BusinessPageClient data={data} />;
}

