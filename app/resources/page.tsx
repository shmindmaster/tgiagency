import { ResourcesClient } from '@/components/blog/ResourcesClient';
import { HeroSection } from '@/components/sections/HeroSection';
import { getAllPosts } from '@/lib/content/posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insurance Resources & Guides | TGI Agency Texas',
  description: 'Expert insurance guides for Texas families and businesses. Learn about home, auto, flood, business coverage, and cost-saving strategies.',
};

export default function ResourcesPage() {
  const allPosts = getAllPosts();

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Insurance Resources & Guides',
    description: 'Expert insurance guides for Texas families and businesses',
    hasPart: allPosts.slice(0, 50).map(p => ({
      '@type': 'Article',
      headline: p.title,
      datePublished: p.publishedDate,
      dateModified: p.updatedDate,
      image: p.image || undefined,
      url: `/resources/${p.slug}`
    })),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allPosts.map((p, i) => ({
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
      <ResourcesClient allPosts={allPosts} />
    </div>
  );
}
