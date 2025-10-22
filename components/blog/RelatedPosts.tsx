import { getRelatedPosts } from '@/lib/content/posts';
import Link from 'next/link';
import { BlogCard } from './BlogCard';

export function RelatedPosts({ slug }: { slug: string }) {
  const related = getRelatedPosts(slug, 3);
  if (!related.length) return null;
  return (
    <section className="max-w-6xl mx-auto px-4 mt-24">
      <h2 className="text-2xl font-bold text-primary mb-6">Related Articles</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {related.map((p, i) => (
          <BlogCard key={p.slug} post={p} priority={i === 0} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/resources" className="text-secondary font-medium hover:underline">View all resources →</Link>
      </div>
    </section>
  );
}
