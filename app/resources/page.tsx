import { Metadata } from 'next';
import Link from 'next/link';
import { HeroSection } from '@/components/sections/HeroSection';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Insurance Resources & Blog - Texas General Insurance',
  description: 'Expert insurance tips, guides, and articles to help you understand your coverage options and make informed decisions.',
};

export const revalidate = 3600;

async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data || [];
}

export default async function ResourcesPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <HeroSection
        title="Insurance Resources & Blog"
        subtitle="EXPERT GUIDANCE"
        description="Stay informed with our latest insurance tips, guides, and industry insights. Learn how to protect what matters most."
        variant="compact"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/resources/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    {post.featured_image && (
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center text-secondary font-medium group-hover:translate-x-1 transition-transform">
                        Read more
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-primary mb-4">Coming Soon</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're working on creating valuable content to help you understand insurance better. Check back soon for helpful articles, guides, and tips from our insurance experts.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
