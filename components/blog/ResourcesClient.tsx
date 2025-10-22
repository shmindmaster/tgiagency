'use client';

import { BlogCard } from '@/components/blog/BlogCard';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import type { BlogCategory, PostMeta } from '@/lib/content/types';
import { useState } from 'react';

export function ResourcesClient({ allPosts }: { allPosts: PostMeta[] }) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | undefined>();

  const filteredPosts = activeCategory
    ? allPosts.filter(post => post.category === activeCategory)
    : allPosts;

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
          {filteredPosts.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No posts found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
