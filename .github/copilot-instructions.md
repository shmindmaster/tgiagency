# Copilot Instructions for TGI Agency

**Project:** Insurance agency website built with Next.js 16, React 19, TypeScript 5.9.3  
**Focus:** Concise, actionable guidance. Follow existing patterns.

## Core Technologies

- **Framework:** Next.js 16 App Router with React 19 Server Components
- **TypeScript:** 5.9.3 (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first @theme approach) + shadcn/ui
- **State:** Zustand (`stores/quote-store.ts`)
- **Database:** Supabase
- **Forms:** React Hook Form + Zod v4 validation
- **Testing:** Playwright E2E

## Package Manager

Use **npm** for all commands (not pnpm or yarn). The project uses npm:
```bash
npm run dev      # Development
npm run build    # Production build
npm run lint     # Linting
npm run typecheck # Type checking
```

## Project Structure

```
app/              # Next.js App Router
├── about/        # Static pages
├── business/     # Business insurance (static params)
├── personal/     # Personal insurance (static params)
├── resources/    # Blog/resources
├── contact/      # Contact form
├── api/quotes/   # Quote submission endpoint
└── page.tsx      # Homepage (dynamic)

components/
├── ui/           # shadcn/ui components (REUSE FIRST)
├── quote/        # Multi-step quote form
├── sections/     # Page sections
├── layout/       # Header, footer, nav
├── blog/         # Blog components
├── contact/      # Contact form
└── seo/          # SEO components

lib/
├── supabase.ts   # Supabase client
├── validations.ts # Zod schemas
├── utils.ts      # Utilities
└── content/      # Blog markdown

stores/
└── quote-store.ts # Zustand state

hooks/            # Custom hooks
```

## Code Style Rules

### TypeScript
- Strict mode enabled - no `any` types
- Use Zod for runtime validation
- No type assertions without justification
- No `@ts-expect-error` or suppressions unless necessary

### React Components
- **Default:** Server Components
- **Client only when:** state, effects, browser APIs, or interactivity required
- Mark explicitly with `'use client'` at top of file
- Use `next/link` for navigation
- Use `next/image` for images

### Imports
- Use `@/` alias for root imports (e.g., `@/components/ui/button`)
- Check existing imports before adding new libraries
- Group: React → Next.js → External → Internal → Styles
- No default exports except pages/layouts

### Naming Conventions
- **PascalCase:** Components and types
- **camelCase:** Functions and variables
- **kebab-case:** File names

### Styling
- Tailwind CSS v4 - CSS-first approach with @theme
- Mobile-first responsive design
- Use shadcn/ui components from `components/ui/` before creating new ones
- Design tokens:
  - Primary: #002244
  - Secondary: #BF5700
  - Accent: #7BAFD4
  - Spacing: 4px scale
  - Border radius: cards 12px, inputs/buttons 6px

### Comments
- Minimal comments - code should be self-documenting
- Explain WHY, not WHAT
- No code explanations unless complex logic

## Route Caching Strategy

**IMPORTANT:** Always preserve route segment config when editing pages.

### Static Routes (`export const dynamic = 'force-static'`)
- `/about/*` - All about pages
- `/contact`
- `/privacy-policy`
- `/business/[slug]` - With generateStaticParams
- `/personal/[slug]` - With generateStaticParams

### Dynamic Routes (`export const dynamic = 'force-dynamic'`)
- `/` - Homepage (client state with zustand)
- `/api/quotes` - POST endpoint
- `/resources/[slug]` - Blog posts (temporary)

### ISR Routes (`export const revalidate = 3600`)
- `/resources` - Blog index (1 hour revalidation)

### Pattern for Static Params
```typescript
export const dynamic = 'force-static'

export async function generateStaticParams() {
  return [
    { slug: 'home' },
    { slug: 'auto' },
  ]
}
```

## Forms & Validation

### Quote Form
- Multi-step modal: `QuoteLauncher` → `QuoteModal` → step components
- State managed in `stores/quote-store.ts`
- Max 5 steps, use `nextStep()` and `prevStep()`
- Server submission at `/api/quotes` with:
  - Zod validation
  - Honeypot field
  - Rate limiting
  - Supabase insert

### Contact Form
- Direct Supabase insert to `contacts` table
- Client-side validation with React Hook Form + Zod

### Validation Pattern
```typescript
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

### Zod v4 Notes
- Use `error.issues` not `error.errors`
- Schemas in `lib/validations.ts`
- Server-side validation required in API routes

## Database (Supabase)

- Client in `lib/supabase.ts`
- Use public anon key only (no service role in client)
- Pattern for inserts:
```typescript
const { error } = await supabase.from('quotes').insert(payload)
```
- Migrations: Add new files to `supabase/migrations/` - never modify existing
- Query helpers: Encapsulate in `lib/` (e.g., `lib/quotes.ts`)

## Environment Variables

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_MICROSOFT_CLARITY_ID`

**Never:**
- Commit secrets
- Embed keys directly in code
- Expose service role key client-side

## Performance & Optimization

- Use Server Components when possible (faster, less JS)
- Implement proper caching strategies
- Use `next/image` with `priority` only for above-fold
- Target image sizes ≤250 KB
- Code splitting with dynamic imports when needed

## Accessibility

- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Visible focus rings
- One H1 per page
- Alt text for all images

## SEO

- Metadata exports in page files
- Title format: `"<Specific> | TGI Agency"`
- JSON-LD structured data
- Breadcrumbs from `components/seo/`
- Sitemap and robots.txt configured

## Testing

- E2E with Playwright: `npx playwright test`
- Test critical interactive components
- Test API route validations
- Manual testing checklist:
  1. Quote form multi-step flow
  2. Contact form submission
  3. Blog post rendering
  4. Navigation and routing
  5. Responsive design

## Before Committing

**Always run:**
1. `npm run lint` - Must pass with 0 errors
2. `npm run build` - Must build successfully
3. Test affected functionality

## Anti-Patterns (DO NOT)

- ❌ Remove route caching directives
- ❌ Convert server pages to client unnecessarily
- ❌ Use `any` types
- ❌ Duplicate shadcn/ui components
- ❌ Add global mutable state outside zustand
- ❌ Bypass validation or spam countermeasures
- ❌ Modify applied migrations
- ❌ Expose service role key client-side

## Common Patterns

### Server Component (Default)
```tsx
import { Component } from '@/components/example'

export default function Page() {
  return <Component />
}
```

### Client Component (Explicit)
```tsx
'use client'

import { useState } from 'react'

export default function ClientComponent() {
  const [state, setState] = useState()
  return <div>...</div>
}
```

### Static Page
```tsx
export const dynamic = 'force-static'

export default function StaticPage() {
  return <div>Static content</div>
}
```

## When Adding Features

1. Check existing patterns in similar components
2. Use existing libraries (check `package.json`)
3. Follow route caching strategy
4. Add validation schemas to `lib/validations.ts`
5. Run `npm run build` and `npm run lint` before completion
6. Keep changes surgical - preserve established patterns

## Additional Resources

- See `AGENTS.md` for comprehensive project documentation
- See `docs/CACHING_STRATEGY.md` for caching details
- See `Copilot-Processing.md` for migration history

---

**Last Updated:** 2025-01-22
