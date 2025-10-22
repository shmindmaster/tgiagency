import type { PostMeta } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  post: PostMeta;
  priority?: boolean;
}

const categoryStyles: Record<string, string> = {
  'personal-insurance': 'bg-accent text-white',
  'business-insurance': 'bg-secondary text-white',
  'cost-savings': 'bg-primary text-white'
};

export function BlogCard({ post, priority }: BlogCardProps) {
  return (
    <article className="group rounded-md border border-border overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <Link href={`/resources/${post.slug}`} className="block relative aspect-video overflow-hidden">
        {post.image && (
          <Image
            src={post.image}
            alt={post.imageAlt || post.title}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className={cn('text-xs font-medium px-3 py-1 rounded-full tracking-wide', categoryStyles[post.category] || 'bg-gray-200 text-gray-700')}>
            {formatCategory(post.category)}
          </span>
          <time className="text-xs text-muted-foreground" dateTime={post.publishedDate}>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
        </div>
        <h3 className="text-base md:text-lg font-semibold text-primary group-hover:text-secondary line-clamp-2 mb-2">
          <Link href={`/resources/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-sm text-foreground/80 line-clamp-3 mb-4">{post.excerpt}</p>
        <div className="mt-auto flex items-center text-sm text-secondary font-medium group-hover:translate-x-0.5 transition-transform">
          Read More →
        </div>
      </div>
    </article>
  );
}

function formatCategory(cat: string) {
  switch (cat) {
    case 'personal-insurance': return 'Personal Insurance';
    case 'business-insurance': return 'Business Insurance';
    case 'cost-savings': return 'Cost Savings';
    default: return cat;
  }
}
