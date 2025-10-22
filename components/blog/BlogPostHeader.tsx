import type { Post } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const categoryStyles: Record<string, string> = {
  'personal-insurance': 'bg-accent text-white',
  'business-insurance': 'bg-secondary text-white',
  'cost-savings': 'bg-primary text-white'
};

export function BlogPostHeader({ post }: { post: Post }) {
  return (
    <header className="mb-10">
      {post.image && (
        <div className="relative w-full h-[300px] md:h-[420px] mb-6 overflow-hidden rounded-md">
          <Image
            src={post.image}
            alt={post.imageAlt || post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="max-w-3xl mx-auto px-4">
        <span className={cn('inline-block text-xs font-medium px-3 py-1 rounded-full mb-4', categoryStyles[post.category] || 'bg-gray-200 text-gray-700')}>
          {formatCategory(post.category)}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-4">{post.title}</h1>
        <p className="text-sm text-muted-foreground flex flex-wrap gap-3">
          <time dateTime={post.publishedDate}>{new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          <span>• {post.readTimeMinutes} min read</span>
          {post.updatedDate && post.updatedDate !== post.publishedDate && (
            <span>• Updated {new Date(post.updatedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          )}
        </p>
      </div>
    </header>
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
