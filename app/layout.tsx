import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { QuoteModal } from '@/components/quote/QuoteModal';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tgiagency.com';
const siteName = 'Texas General Insurance';
const siteDescription = 'Get affordable auto, home, business, and life insurance coverage from Texas General Insurance. Serving Texas families and businesses since 1985.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Texas General Insurance - Comprehensive Insurance Solutions in Texas',
    template: '%s | Texas General Insurance',
  },
  description: siteDescription,
  keywords: [
    'insurance',
    'Texas insurance',
    'auto insurance',
    'home insurance',
    'business insurance',
    'life insurance',
    'renters insurance',
    'landlord insurance',
    'flood insurance',
    'boat insurance',
    'surety bonds',
    'insurance quotes',
    'insurance agency Texas',
  ],
  authors: [{ name: 'Texas General Insurance' }],
  creator: 'Texas General Insurance',
  publisher: 'Texas General Insurance',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteName,
    title: 'Texas General Insurance - Comprehensive Insurance Solutions',
    description: siteDescription,
    images: [
      {
        url: '/assets/brand/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Texas General Insurance - Your Trusted Insurance Partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas General Insurance - Comprehensive Insurance Solutions',
    description: siteDescription,
    images: ['/assets/brand/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#002244',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  logo: `${siteUrl}/assets/brand/logo.png`,
  image: `${siteUrl}/assets/brand/og-image.jpg`,
  telephone: '+1-XXX-XXX-XXXX',
  email: 'info@tgiagency.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'XXX Main Street',
    addressLocality: 'Austin',
    addressRegion: 'TX',
    postalCode: '78701',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'State',
    name: 'Texas',
  },
  foundingDate: '1985',
  sameAs: [
    'https://www.facebook.com/tgiagency',
    'https://www.linkedin.com/company/tgiagency',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Insurance Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Auto Insurance',
          description: 'Comprehensive auto insurance coverage for Texas drivers',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Home Insurance',
          description: 'Protect your home with comprehensive homeowners insurance',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Insurance',
          description: 'Tailored insurance solutions for Texas businesses',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Life Insurance',
          description: 'Life insurance policies to protect your loved ones',
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {ga4Id && <link rel="preconnect" href="https://www.googletagmanager.com" />}
        {clarityId && <link rel="preconnect" href="https://www.clarity.ms" />}

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <QuoteModal />

        {/* Google Analytics 4 */}
        {ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4Id}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* Microsoft Clarity */}
        {clarityId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
