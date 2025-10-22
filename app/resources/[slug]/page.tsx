import { BlogCTA } from '@/components/blog/BlogCTA';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { BlogPostHeader } from '@/components/blog/BlogPostHeader';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { generateStaticPostParams, getPostBySlug } from '@/lib/content/posts';
import type { Metadata } from 'next';

// Restoring static prerender now that serialization safeguards are in place
export const dynamic = 'force-static';

export function generateStaticParams() {
  return generateStaticPostParams();
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) { return { title: 'Post Not Found | TGI Agency' }; }
  return {
    title: `${post.title || 'Article'} | TGI Agency`,
    description: post.description || post.excerpt || '',
    openGraph: post.image ? {
      title: post.title || '',
      description: post.description || post.excerpt || '',
      type: 'article',
      images: [{ url: post.image, alt: post.imageAlt || post.title || '' }]
    } : undefined,
    twitter: post.image ? {
      card: 'summary_large_image',
      title: post.title || '',
      description: post.description || post.excerpt || '',
      images: [post.image]
    } : undefined
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) { return <div className="container mx-auto px-4 py-24"><h1 className="text-3xl font-bold">Post Not Found</h1></div>; }

  const jsonLd = post.schema ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title || '',
    datePublished: post.publishedDate || '',
    dateModified: post.updatedDate || post.publishedDate || '',
    author: { '@type': 'Organization', name: post.author || 'TGI Agency Team' },
    publisher: {
      '@type': 'Organization',
      name: 'TGI Agency',
      logo: { '@type': 'ImageObject', url: '/assets/brand/logo.png' }
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `/resources/${post.slug || ''}` },
    description: post.description || post.excerpt || '',
    ...(post.image && { image: post.image })
  } : null;

  return (
    <article className="pb-24">
      <BlogPostHeader post={post} />
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <BlogPostContent html={post.html} />
      <BlogCTA />
      <RelatedPosts slug={post.slug || ''} />
    </article>
  );
}
