import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Heart, Megaphone, TrendingUp, UserCheck, Users } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

// Next.js 16: Static careers page
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Careers - Texas General Insurance',
  description: 'Join the Texas General Insurance team. Build a rewarding career protecting our community with integrity and expertise.',
  openGraph: {
    title: 'Careers - Texas General Insurance',
    description: 'Join the Texas General Insurance team. Build a rewarding career protecting our community with integrity and expertise.',
  },
};

const benefits = [
  {
    icon: Users,
    title: 'Supportive Team',
    description: 'Work with a close-knit team that values collaboration and mutual success.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Opportunities',
    description: 'Build a career, not just a job. We invest in your professional development.',
  },
  {
    icon: Heart,
    title: 'Community Impact',
    description: 'Make a real difference in the lives of our clients and neighbors.',
  },
];

const positions = [
  {
    icon: Briefcase,
    title: 'Licensed Insurance Agents',
    description: 'Help clients find the right coverage while building long-term relationships.',
    requirements: ['Active insurance license', 'Strong communication skills', 'Customer-focused mindset'],
  },
  {
    icon: UserCheck,
    title: 'Customer Service Representatives',
    description: 'Be the friendly voice that helps our clients navigate their insurance needs.',
    requirements: ['Excellent phone and email etiquette', 'Problem-solving abilities', 'Detail-oriented approach'],
  },
  {
    icon: Megaphone,
    title: 'Marketing & Community Outreach',
    description: 'Share our story and connect with the Sugar Land community.',
    requirements: ['Marketing or communications experience', 'Social media savvy', 'Creative and enthusiastic'],
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary/10 via-primary/5 to-background py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Build a Career Protecting Our Community
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Join a team that values expertise, empathy, and community.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              Are you passionate about helping people? Do you believe in building strong relationships based on
              trust and integrity? Then you might be a perfect fit for the Texas General Insurance team.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              We're more than just an insurance agency; we're a close-knit team dedicated to making a real
              difference in the lives of our clients. We offer a supportive, growth-oriented environment where
              you can build a rewarding career, not just a job.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join TGI?</h2>
              <p className="text-xl text-muted-foreground">
                More than a job—it's a career with purpose
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="border-2 text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
              <p className="text-xl text-muted-foreground">
                We're always looking for talented and motivated individuals
              </p>
            </div>

            <div className="grid md:grid-cols-1 gap-6">
              {positions.map((position, index) => {
                const Icon = position.icon;
                return (
                  <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                          <p className="text-muted-foreground">{position.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="pl-16">
                        <h4 className="font-semibold mb-3">What we're looking for:</h4>
                        <div className="flex flex-wrap gap-2">
                          {position.requirements.map((req, i) => (
                            <Badge key={i} variant="secondary" className="text-sm">
                              {req}
                            </Badge>
                          ))}
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

      {/* Application CTA */}
      <section className="py-16 md:py-24 bg-linear-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Our Team?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Send your resume and cover letter to{' '}
              <a
                href="mailto:info@tgiagency.com"
                className="text-primary hover:underline font-semibold"
              >
                info@tgiagency.com
              </a>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="mailto:info@tgiagency.com">Apply Now</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about/our-story">Learn About TGI</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
