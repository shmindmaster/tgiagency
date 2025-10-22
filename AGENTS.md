# Agent Instructions for TGI Agency

An insurance agency website built with Next.js 16, React 19, and Tailwind CSS v4.

## Quick Start

```bash
npm run dev      # Start development server
npm run build    # Build for production (includes typecheck)
npm run lint     # Run ESLint
npm run typecheck # Run TypeScript compiler check
```

## Commands & Scripts

### Development
- `npm run dev` - Start Next.js dev server on http://localhost:3000
- `npm run start` - Start production server (run build first)

### Testing & Quality
- `npx playwright test` - Run all E2E tests
- `npx playwright test <filename>` - Run specific test file
- `npm run typecheck` or `tsc --noEmit` - TypeScript type checking
- `npm run lint` - ESLint with Next.js config
- `npm run build` - Production build (includes typecheck)

### Pre-Commit Checklist
Always run before committing:
1. `npm run lint` - Must pass with 0 errors
2. `npm run build` - Must build successfully
3. Test affected functionality

## Project Architecture

### Tech Stack
- **Framework:** Next.js 16.0.0 (App Router)
- **React:** 19.2.0 (Server Components by default)
- **TypeScript:** 5.9.3 (Strict mode)
- **Styling:** Tailwind CSS 4.1.15 (CSS-first with @theme)
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Forms:** React Hook Form + Zod 4.x validation
- **State:** Zustand (`stores/quote-store.ts`)
- **Database:** Supabase (`lib/supabase.ts`)
- **Analytics:** Google Analytics, Microsoft Clarity
- **Testing:** Playwright (E2E)

### Directory Structure

```
app/                    # Next.js App Router
├── (pages)/           # Route groups
│   ├── about/         # About pages (static)
│   ├── business/      # Business insurance (static params)
│   ├── personal/      # Personal insurance (static params)
│   ├── contact/       # Contact form (static)
│   ├── resources/     # Blog/resources (ISR + dynamic)
│   └── privacy-policy/
├── api/               # API routes
│   └── quotes/        # Quote submission endpoint (POST)
├── layout.tsx         # Root layout
├── page.tsx           # Homepage (dynamic - zustand state)
└── globals.css        # Tailwind CSS @theme config

components/
├── ui/               # shadcn/ui components
├── quote/            # Multi-step quote form
├── sections/         # Page sections (hero, benefits, etc.)
├── layout/           # Header, footer, navigation
├── blog/             # Blog-specific components
├── contact/          # Contact form
├── analytics/        # Analytics wrappers
└── seo/              # SEO components

lib/
├── supabase.ts       # Supabase client
├── validations.ts    # Zod schemas
├── utils.ts          # Utility functions
└── content/          # Markdown blog utilities

stores/
└── quote-store.ts    # Zustand quote form state

hooks/                # Custom React hooks
```

### Route Caching Strategy

**Static Routes** (`export const dynamic = 'force-static'`)
- `/about/*` - All about pages
- `/contact`
- `/privacy-policy`
- `/business/[slug]` - With generateStaticParams
- `/personal/[slug]` - With generateStaticParams

**Dynamic Routes** (`export const dynamic = 'force-dynamic'`)
- `/` - Homepage (client state with zustand)
- `/api/quotes` - POST endpoint
- `/resources/[slug]` - Blog posts (temporary - has serialization issue)

**ISR Routes** (`export const revalidate = 3600`)
- `/resources` - Blog index (1 hour revalidation)

See `docs/CACHING_STRATEGY.md` for details.

## Code Style & Conventions

### TypeScript
- **Strict mode enabled** - No implicit any
- **Avoid `any`** - Use proper types or `unknown`
- **Use Zod** for runtime validation
- **No type assertions** without justification
- **No suppressions** (`@ts-expect-error`, `as any`) unless necessary

### React Components
- **Server Components** by default
- **Mark `'use client'`** explicitly when needed (state, effects, browser APIs)
- **Use next/link** for internal navigation
- **Use next/image** for images (optimization enabled)
- **PascalCase** for components and types
- **camelCase** for functions and variables
- **kebab-case** for file names

### Imports
- Use **`@/` alias** for root paths (e.g., `@/components/ui/button`)
- Check existing imports before adding libraries
- Group imports: React → Next.js → External → Internal → Styles
- No default exports except for pages/layouts (Next.js convention)

### Styling
- **Tailwind CSS 4.x** - CSS-first @theme approach
- **Mobile-first** - Base styles for mobile, use `sm:`, `md:`, `lg:`, `xl:` breakpoints
- **shadcn/ui first** - Check `components/ui/` before creating new UI components
- **Custom properties** in `app/globals.css` @theme block
- **Class variance authority** for component variants

### Forms & Validation
- **React Hook Form** for form state
- **Zod v4** for validation schemas (in `lib/validations.ts`)
- Use `error.issues` not `error.errors` (Zod v4 API)
- Server-side validation in API routes

### Comments & Documentation
- **Minimal comments** - Code should be self-documenting
- Explain **WHY** not WHAT
- No code explanations unless complex
- Update relevant docs when changing architecture

### Formatting
- Follow ESLint flat config (`eslint.config.mjs`)
- Run `npm run lint` before committing
- 2-space indentation
- Single quotes for strings (unless template literals)

## Common Patterns

### Server Components (Default)
```tsx
// app/example/page.tsx
import { Component } from '@/components/example'

export default function Page() {
  return <Component />
}
```

### Client Components (Explicit)
```tsx
'use client'

import { useState } from 'react'

export default function ClientComponent() {
  const [state, setState] = useState()
  return <div>...</div>
}
```

### Static Route Configuration
```tsx
// app/static-page/page.tsx
export const dynamic = 'force-static'

export default function StaticPage() {
  return <div>Static content</div>
}
```

### Dynamic Route with Static Params
```tsx
// app/category/[slug]/page.tsx
export const dynamic = 'force-static'

export async function generateStaticParams() {
  return [
    { slug: 'home' },
    { slug: 'auto' },
  ]
}

export default function Page({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>
}
```

### Form with Validation
```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mySchema } from '@/lib/validations'

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(mySchema),
  })

  async function onSubmit(data: z.infer<typeof mySchema>) {
    // Submit to API
  }

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>
}
```

## Important Guidelines

### Security
- **Never commit secrets** - Use environment variables
- **Validate all inputs** - Server-side validation required
- **Rate limiting** - Implemented on API routes
- **Honeypot fields** - Anti-spam protection on forms

### Performance
- Use Server Components when possible (faster, less JS)
- Implement proper caching strategies
- Optimize images with next/image
- Code splitting with dynamic imports when needed

### Accessibility
- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast compliance

### SEO
- Metadata exports in page files
- Structured data (JSON-LD)
- Sitemap and robots.txt generated
- Open Graph tags

## Known Issues & Workarounds

### Blog Post Prerendering
**Issue:** JSON serialization error when prerendering blog posts
**Workaround:** Blog posts set to `force-dynamic` temporarily
**Status:** Low priority - works dynamically

## Testing Strategy

### E2E Testing
- Playwright configured
- Test files in repo (check for `*.spec.ts` or `*.test.ts`)
- Run with `npx playwright test`
- Single test: `npx playwright test <filename>`

### Manual Testing
After making changes, test:
1. Quote form multi-step flow
2. Contact form submission
3. Blog post rendering
4. Navigation and routing
5. Responsive design (mobile, tablet, desktop)

## Deployment

### Environment Variables Required
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_MICROSOFT_CLARITY_ID`

### Build Requirements
- Node.js runtime (not static export)
- Supports API routes
- Image optimization enabled
- Vercel or serverless platform recommended

## Context for AI Assistants

### When Adding Features
1. Check existing patterns in similar components
2. Use existing libraries (check `package.json`)
3. Follow route caching strategy
4. Add validation schemas to `lib/validations.ts`
5. Run build and lint before completion

### When Fixing Bugs
1. Check relevant logs/errors
2. Verify types and validation
3. Test in dev before building
4. Run full build to catch issues

### When Refactoring
1. Maintain existing patterns
2. Don't break route caching strategy
3. Update tests if they exist
4. Run full type check and lint

## Additional Documentation

- `Copilot-Processing.md` - Full modernization project log
- `docs/CACHING_STRATEGY.md` - Detailed caching implementation
- See `.github/copilot-instructions.md` for GitHub Copilot-specific guidance (if exists)

---

**Last Updated:** 2025-01-22
**Next.js Version:** 16.0.0
**React Version:** 19.2.0
**Tailwind CSS Version:** 4.1.15
