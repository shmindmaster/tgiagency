import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tgiagency.com';

  // Core pages
  const routes = [
    '',
    '/about',
    '/contact',
    '/resources',
    '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Insurance product pages
  const insuranceTypes = [
    'auto-insurance',
    'home-insurance',
    'renters-insurance',
    'landlord-insurance',
    'business-insurance',
    'life-insurance',
    'flood-insurance',
    'boat-insurance',
    'surety-bonds',
  ];

  const productPages = insuranceTypes.map((type) => ({
    url: `${baseUrl}/personal/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const businessPages = [
    'general-liability',
    'workers-compensation',
    'commercial-property',
    'professional-liability',
  ].map((type) => ({
    url: `${baseUrl}/business/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // TODO: Add dynamic blog posts when blog is implemented
  // const blogPosts = await getBlogPosts();
  // const blogUrls = blogPosts.map((post) => ({
  //   url: `${baseUrl}/resources/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  // }));

  return [...routes, ...productPages, ...businessPages];
}
