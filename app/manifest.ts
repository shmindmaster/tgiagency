import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Texas General Insurance',
    short_name: 'TGI Agency',
    description: 'Get affordable auto, home, business, and life insurance coverage from Texas General Insurance. Your neighbors in Sugar Land serving Texas families and businesses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#002244',
    orientation: 'portrait-primary',
    categories: ['finance', 'business'],
    icons: [
      {
        src: '/assets/brand/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/assets/brand/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/assets/brand/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
