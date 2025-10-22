import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Briefcase, Building2, Users } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - Texas General Insurance',
  description: 'Learn about Texas General Insurance - your trusted neighbors in protection. Discover our story, read client testimonials, and explore career opportunities.',
  openGraph: {
    title: 'About Us - Texas General Insurance',
    description: 'Learn about Texas General Insurance - your trusted neighbors in protection. Discover our story, read client testimonials, and explore career opportunities.',
  },
};

const sections = [
  {
    icon: Building2,
    title: 'Our Story',
    description: 'Learn about how we started and what drives us to serve our community with integrity.',
    href: '/about/our-story',
    cta: 'Read Our Story',
  },
  {
    icon: Users,
    title: 'Client Testimonials',
    description: 'See what our clients say about the TGI experience and the service we provide.',
    href: '/about/testimonials',
    cta: 'Read Reviews',
  },
  {
    icon: Briefcase,
    title: 'Careers',
    description: 'Join our team and build a rewarding career protecting our community.',
    href: '/about/careers',
    cta: 'View Openings',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About Texas General Insurance
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Your trusted neighbors in protection, serving Sugar Land and the greater Houston area.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Intro */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              Texas General Insurance isn't just another insurance agency. We're your neighbors,
              your advocates, and your partners in protection. Built right here in Sugar Land,
              we understand the unique needs of Texas families and businesses.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              As an independent agency, we work for you—not giant corporations. This means we can
              compare policies from multiple top-rated carriers to find the perfect coverage at
              the right price for your specific situation.
            </p>
          </div>
        </div>
      </section>

      {/* Section Cards */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">{section.title}</h3>
                      <p className="text-muted-foreground mb-6">{section.description}</p>
                      <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground" asChild>
                        <Link href={section.href}>
                          {section.cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                <div className="text-lg text-muted-foreground">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
                <div className="text-lg text-muted-foreground">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10+</div>
                <div className="text-lg text-muted-foreground">Years Serving Texas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience the TGI Difference?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's start a conversation about protecting what matters most to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/resources">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
