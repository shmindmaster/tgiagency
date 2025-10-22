import { BlogCard } from '@/components/blog/BlogCard';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { HeroSection } from '@/components/sections/HeroSection';
import { getAllPosts, getPostsByCategory } from '@/lib/content/posts';
import { BlogCategory } from '@/lib/content/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insurance Resources & Guides | TGI Agency Texas',
  description: 'Expert insurance guides for Texas families and businesses. Learn about home, auto, flood, business coverage, and cost-saving strategies.',
};

interface ResourcesPageProps { searchParams?: { category?: BlogCategory }; }

export default function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const activeCategory = searchParams?.category;
  const posts = getPostsByCategory(activeCategory);
  const all = getAllPosts();
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Insurance Resources & Guides',
    description: 'Expert insurance guides for Texas families and businesses',
    hasPart: posts.slice(0, 50).map(p => ({
      '@type': 'Article',
      headline: p.title,
      datePublished: p.publishedDate,
      dateModified: p.updatedDate,
      image: p.image || undefined,
      url: `/resources/${p.slug}`
    })),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: all.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `/resources/${p.slug}`,
        name: p.title
      }))
    }
  };
  return (
    <div>
      <HeroSection
        title="Insurance Resources & Guides"
        subtitle="KNOWLEDGE CENTER"
        description="Trusted, plain‑English guides to help Texas families and businesses make confident insurance decisions."
        variant="compact"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <CategoryFilter current={activeCategory} />
          {posts.length ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => <BlogCard key={p.slug} post={p} priority={i < 2} />)}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-20">No posts available in this category yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
