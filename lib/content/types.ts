export type BlogCategory = 'personal-insurance' | 'business-insurance' | 'cost-savings';

export interface PostFrontMatter {
  title: string;
  description?: string;
  publishedDate: string; // ISO date
  updatedDate?: string; // ISO date
  author?: string;
  category: BlogCategory;
  tags?: string[];
  slug: string; // stored with or without /resources prefix
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  schema?: boolean;
}

export interface PostMeta extends PostFrontMatter {
  slug: string; // normalized slug without leading /resources
  excerpt: string;
  readTimeMinutes: number;
  wordCount: number;
}

export interface Post extends PostMeta {
  raw: string; // original markdown body
  html: string; // transformed html (basic markdown pass)
}
