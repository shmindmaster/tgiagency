import { ContactForm } from '@/components/contact/ContactForm';
import { HeroSection } from '@/components/sections/HeroSection';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';
import type { Metadata } from 'next';

// Next.js 16: Static contact page
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Texas General Insurance for personalized insurance guidance, quotes, claims assistance, and policy support.',
  openGraph: {
    title: 'Contact Texas General Insurance',
    description: 'Reach out for quotes, claims help, or coverage questions. Our experienced Texas agents are ready to assist.',
    type: 'website',
    images: ['/assets/brand/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Texas General Insurance',
    description: 'Reach out for quotes, claims help, or coverage questions. Our experienced Texas agents are ready to assist.',
  },
};

export default function ContactPage() {
  return (
    <div>
      <HeroSection
        title="Get in Touch"
        subtitle="CONTACT US"
        description="Have questions about insurance coverage? Need help with a claim? Our experienced team is here to help. Reach out today."
        variant="compact"
        backgroundImage="/assets/general/insurance-agent-hands.jpg"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Phone</h3>
                    <p className="text-foreground mb-1">Main Office</p>
                    <a href="tel:+12814944990" className="text-secondary hover:underline font-medium">
                      (281) 494-4990
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">
                      Monday - Friday: 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
                    <p className="text-foreground mb-1">General Inquiries</p>
                    <a href="mailto:info@tgiagency.com" className="text-secondary hover:underline font-medium">
                      info@tgiagency.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Visit Us</h3>
                    <p className="text-foreground">
                      132 Eldridge Rd, Suite C<br />
                      Sugar Land, TX 77478
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Walk-ins welcome during business hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
