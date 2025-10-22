import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, TrendingUp, Users } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

// Next.js 16: Static our-story page
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Our Story - Texas General Insurance',
  description: 'Learn about Texas General Insurance, your neighbors in protection. Built in Sugar Land with a mission to treat clients like neighbors.',
  openGraph: {
    title: 'Our Story - Texas General Insurance',
    description: 'Learn about Texas General Insurance, your neighbors in protection. Built in Sugar Land with a mission to treat clients like neighbors.',
  },
};

const values = [
  {
    icon: Shield,
    title: 'Independence',
    description: 'We work for you, not giant corporations. This allows us to compare policies from top-rated carriers.',
  },
  {
    icon: Users,
    title: 'Community Focus',
    description: "We're not just agents; we're parents, homeowners, and local business supporters right here in Sugar Land.",
  },
  {
    icon: Heart,
    title: 'Personal Service',
    description: 'Get honest, personal insurance advice you can\'t get from a 1-800 number.',
  },
  {
    icon: TrendingUp,
    title: 'Long-Term Relationships',
    description: "We're building relationships, not just a book of business. Your trusted advisor for life's biggest moments.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary/10 via-primary/5 to-background py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your Neighbors in Protection
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Built right here in Sugar Land, with a simple mission: to treat our clients like neighbors.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Texas General Insurance wasn't founded in a boardroom. It was built right here in Sugar Land,
                with a simple mission: to treat our clients like neighbors and provide the kind of honest,
                personal insurance advice you can't get from a 1-800 number.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                For years, we've watched our community grow, and we've grown with it. We understand the unique
                challenges and opportunities of living and working in Texas because we're doing it, too. We're
                not just agents; we're parents, homeowners, and local business supporters.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                Our independence is your advantage. As an independent agency, we don't work for one giant
                corporation. We work for you. This allows us to compare policies from a wide range of top-rated
                carriers to find the perfect blend of coverage and value for your specific needs.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                At TGI, we're building more than a book of business—we're building relationships. We're here
                to be your trusted advisor for life's biggest moments, offering clarity and confidence every
                step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Sets Us Apart</h2>
              <p className="text-xl text-muted-foreground">
                Our values drive everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                          <p className="text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
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
