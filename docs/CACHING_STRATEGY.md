# Next.js 16 Caching Strategy

**Implementation Date:** 2025-01-XX
**Framework:** Next.js 16 App Router
**Status:** ✅ Implemented

## Overview

This document outlines the caching strategy applied to all routes in the TGI Agency Next.js application to optimize performance and ensure correct build behavior with Next.js 16.

## Route Segment Config

### Dynamic Routes (force-dynamic)

Routes that require dynamic rendering due to client-side state or runtime data:

| Route | Reason | Configuration |
|-------|--------|---------------|
| `app/page.tsx` | Client component with zustand state | `export const dynamic = 'force-dynamic'` |
| `app/api/quotes/route.ts` | API endpoint with POST handler | `export const dynamic = 'force-dynamic'` |

### Static Routes (force-static)

Routes with static content pre-rendered at build time:

| Route | Type | Configuration |
|-------|------|---------------|
| `app/contact/page.tsx` | Static contact info | `export const dynamic = 'force-static'` |
| `app/about/page.tsx` | Static company info | `export const dynamic = 'force-static'` |
| `app/about/our-story/page.tsx` | Static narrative | `export const dynamic = 'force-static'` |
| `app/about/testimonials/page.tsx` | Static testimonials | `export const dynamic = 'force-static'` |
| `app/about/careers/page.tsx` | Static career info | `export const dynamic = 'force-static'` |
| `app/privacy-policy/page.tsx` | Static policy | `export const dynamic = 'force-static'` |

### Static Routes with generateStaticParams

Dynamic routes pre-rendered at build time using static data:

| Route | Static Params | Configuration |
|-------|--------------|---------------|
| `app/business/[slug]/page.tsx` | `['business', 'landlord', 'bonds']` | `export const dynamic = 'force-static'` |
| `app/personal/[slug]/page.tsx` | `['auto', 'home', 'renters', 'life', 'boat', 'flood']` | `export const dynamic = 'force-static'` |
| `app/resources/[slug]/page.tsx` | All blog post slugs | `export const dynamic = 'force-static'` |

### Incremental Static Regeneration (ISR)

Routes that combine static generation with periodic revalidation:

| Route | Revalidation | Reason |
|-------|--------------|--------|
| `app/resources/page.tsx` | 3600s (1 hour) | Blog index updates periodically |

## Implementation Details

### Client Component Home Page

```typescript
// app/page.tsx
'use client';

// Next.js 16: Client components with hooks require dynamic rendering
export const dynamic = 'force-dynamic';
```

**Rationale:** The home page uses `'use client'` and zustand state management. While it could theoretically be static, the client-side interactivity requires dynamic rendering to properly hydrate client state.

### API Routes

```typescript
// app/api/quotes/route.ts
// Next.js 16: API routes must be dynamic
export const dynamic = 'force-dynamic';
```

**Rationale:** All API routes must be marked as dynamic since they handle runtime requests and cannot be pre-rendered.

### Static Content Pages

```typescript
// app/contact/page.tsx, app/about/page.tsx, etc.
// Next.js 16: Static contact page
export const dynamic = 'force-static';
```

**Rationale:** These pages contain only static content and metadata. Pre-rendering at build time improves performance and reduces server load.

### Dynamic Routes with Static Data

```typescript
// app/business/[slug]/page.tsx
// Next.js 16: Pre-render all business insurance pages at build time
export const dynamic = 'force-static';

export function generateStaticParams() {
  return Object.keys(businessInsuranceData).map((slug) => ({ slug }));
}
```

**Rationale:** Although these routes have dynamic segments `[slug]`, the data is static and known at build time. Using `generateStaticParams` pre-renders all possible pages, eliminating runtime overhead.

### Blog Index with ISR

```typescript
// app/resources/page.tsx
// Next.js 16: Revalidate blog index every hour
export const revalidate = 3600;
```

**Rationale:** The blog index aggregates all posts. While the underlying data is static, revalidating every hour ensures new posts appear without a full rebuild, striking a balance between performance and freshness.

## Build Output Verification

After implementing this strategy, the build should show:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    XXX kB        XXX kB
├ ● /about                               XXX kB        XXX kB
├ ● /about/careers                       XXX kB        XXX kB
├ ● /about/our-story                     XXX kB        XXX kB
├ ● /about/testimonials                  XXX kB        XXX kB
├ ● /contact                             XXX kB        XXX kB
├ ● /privacy-policy                      XXX kB        XXX kB
├ ● /resources                           XXX kB        XXX kB
├ ● /resources/[slug]                    XXX kB        XXX kB
├   ├ /resources/auto-insurance-texas
├   ├ /resources/business-insurance-guide
├   └ [+XX more paths]
├ ● /business/[slug]                     XXX kB        XXX kB
├   ├ /business/business
├   ├ /business/landlord
├   └ /business/bonds
├ ● /personal/[slug]                     XXX kB        XXX kB
├   ├ /personal/auto
├   ├ /personal/home
├   ├ /personal/renters
├   ├ /personal/life
├   ├ /personal/boat
├   └ /personal/flood
└ ƒ /api/quotes

○ (Static)   prerendered as static content
● (SSG)      prerendered as static HTML (uses getStaticProps)
ƒ (Dynamic)  server-rendered on demand
```

## Performance Benefits

1. **Reduced Server Load:** Static pages eliminate runtime rendering overhead
2. **Faster Page Loads:** Pre-rendered HTML served directly from CDN
3. **Lower Hosting Costs:** Fewer dynamic requests reduce compute costs
4. **Better SEO:** Static pages indexed more effectively by search engines
5. **Improved Core Web Vitals:** Faster LCP, FID, and CLS metrics

## Monitoring & Maintenance

### Validation Checklist

- [ ] Run `pnpm build` to verify all routes build successfully
- [ ] Check build output for correct route indicators (○, ●, ƒ)
- [ ] Test dynamic routes with all static params
- [ ] Verify ISR revalidation works as expected
- [ ] Monitor page load times in production

### Future Considerations

- **Blog Post Updates:** Consider adding on-demand revalidation webhook for instant blog updates
- **Client State Migration:** Evaluate moving home page to server components with progressive enhancement
- **Edge Rendering:** Consider moving API routes to Edge Runtime for lower latency
- **Analytics Integration:** Add performance monitoring for cache hit rates and revalidation frequency

## References

- [Next.js 16 App Router Documentation](https://nextjs.org/docs/app)
- [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)
- [Incremental Static Regeneration](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
