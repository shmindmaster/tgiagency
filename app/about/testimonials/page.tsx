import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

// Next.js 16: Static testimonials page
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Client Testimonials - Texas General Insurance',
  description: 'Read what our clients say about the TGI experience. Real reviews from real neighbors in Sugar Land, Houston, and Richmond.',
  openGraph: {
    title: 'Client Testimonials - Texas General Insurance',
    description: 'Read what our clients say about the TGI experience. Real reviews from real neighbors in Sugar Land, Houston, and Richmond.',
  },
};

const testimonials = [
  {
    name: 'J. Rodriguez',
    location: 'Sugar Land, TX',
    initials: 'JR',
    text: "Switching to TGI was the best decision I've made for my home and auto insurance. Mir Khan didn't just save me money; he took the time to explain my coverage in a way I could actually understand. When I had a small claim, the process was seamless. It feels great to have a local agent who actually knows my name.",
    rating: 5,
  },
  {
    name: 'Sarah C.',
    location: 'Houston, TX',
    initials: 'SC',
    text: "As a small business owner, my time is limited. Fahad at TGI handled everything for my commercial policy, from liability to workers' comp. He found gaps in my old coverage I didn't even know existed and secured a better policy for a lower premium. Their professionalism is top-notch.",
    rating: 5,
  },
  {
    name: 'The Davis Family',
    location: 'Richmond, TX',
    initials: 'DF',
    text: "After a hailstorm damaged our roof, we were dreading the claims process. The TGI team was our advocate from start to finish. They were responsive, compassionate, and made a stressful situation so much easier to manage. You can't put a price on that kind of service.",
    rating: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary/10 via-primary/5 to-background py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              What Our Clients Say
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              We're proud of the relationships we've built. Don't just take our word for it.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <Quote className="w-10 h-10 text-primary/20 shrink-0" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                          {testimonial.text}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pl-14">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-lg">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-muted/50">
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Our Family of Satisfied Clients?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the TGI difference for yourself. Get a personalized quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get Your Free Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about/our-story">Learn About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
