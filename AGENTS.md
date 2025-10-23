# AGENTS.md – TGI Agency

Insurance agency website: Next.js 16 App Router, React 19, TypeScript 5.9.3, Tailwind CSS v4, Supabase.

## Quick Commands

```bash
npm run dev      # Development server
npm run build    # Production build (includes typecheck)
npm run lint     # ESLint check
npm run typecheck # TypeScript check
npx playwright test # E2E tests
```

**Pre-commit:** Always run `npm run lint` and `npm run build` before committing.

## Tech Stack

- **Framework:** Next.js 16 App Router (React 19 Server Components default)
- **Language:** TypeScript 5.9.3 strict mode
- **Styling:** Tailwind CSS 4.1.15 (CSS-first @theme) + shadcn/ui
- **Forms:** React Hook Form + Zod v4 validation
- **State:** Zustand (`stores/quote-store.ts`)
- **Database:** Supabase
- **Testing:** Playwright E2E

## Directory Map

```
app/          Routes (about/, business/, personal/, contact/, resources/, api/quotes/)
components/   UI (ui/, quote/, sections/, layout/, blog/, contact/, seo/, analytics/)
lib/          Utils (supabase.ts, validations.ts, utils.ts, content/)
stores/       State (quote-store.ts)
hooks/        Custom React hooks
```

## Domain Rules

- **Quote Flow:** Multi-step modal (max 5 steps) → API `/api/quotes` → Supabase insert
- **Forms:** All validated client-side (React Hook Form + Zod) AND server-side (API routes)
- **Blog Content:** Sourced from filesystem markdown (`lib/content/posts`), NOT `blog_posts` table
- **Static Routes:** Must use `generateStaticParams()` for slug-based pages (business/personal)
- **Security:** Honeypot + rate limiting on `/api/quotes`, never bypass
- **Images:** Keep ≤250KB, use next/image with `priority` only above-fold

## Architecture Decisions

- **Caching Strategy:**
  - Static: `/about/*`, `/contact`, `/privacy-policy`, `/business/[slug]`, `/personal/[slug]`
  - Dynamic: `/` (homepage - zustand state), `/api/quotes`, `/resources/[slug]`
  - ISR: `/resources` index (`revalidate: 3600`)
  - **Never remove** `export const dynamic` directives
- **Server Components:** Default. Only add `'use client'` for state, effects, browser APIs
- **Supabase:** Client uses anon key only. Service role key server-only
- **Zod v4:** Use `error.issues` not `error.errors`
- **shadcn/ui:** Reuse `components/ui/` before creating new components

## Team Conventions

- **Imports:** Use `@/` alias (e.g., `@/components/ui/button`)
- **Naming:** PascalCase (components), camelCase (functions), kebab-case (files)
- **Styling:** Tailwind utilities, colors: Primary #002244, Secondary #BF5700, Accent #7BAFD4
- **Comments:** Minimal - explain WHY not WHAT
- **No `any` types** - use proper types or `unknown`
- **Migrations:** New file in `supabase/migrations/`, never modify existing
- **Quote State:** All state in `stores/quote-store.ts`, persist only `formData`

## Common Patterns

**Server Component (default):**
```tsx
import { Component } from '@/components/example'
export default function Page() { return <Component /> }
```

**Client Component:**
```tsx
'use client'
import { useState } from 'react'
export default function ClientComponent() { /* state */ }
```

**Static Route:**
```tsx
export const dynamic = 'force-static'
export async function generateStaticParams() {
  return [{ slug: 'home' }, { slug: 'auto' }]
}
```

**Form with Validation:**
```tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mySchema } from '@/lib/validations'

export function MyForm() {
  const form = useForm({ resolver: zodResolver(mySchema) })
  async function onSubmit(data: z.infer<typeof mySchema>) { /* API call */ }
  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>
}
```

## Common Issues

- **Blog prerendering fails:** JSON serialization issue, set to `force-dynamic` temporarily (low priority)
- **Lint errors:** Run `npm run lint` - must be 0 errors before commit
- **Build fails:** Check TypeScript with `npm run typecheck`
- **Quote modal broken:** Verify zustand store state, check max steps (5)
- **Missing env vars:** Check `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Images slow:** Compress to ≤250KB, use WebP format

## Testing

- **E2E:** `npx playwright test` for quote flow + contact form
- **Manual:** Test quote wizard, contact form, blog rendering, responsive design
- **Pre-deploy:** Lint, build, typecheck must all pass

## Environment Variables

Required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_MICROSOFT_CLARITY_ID`

Never commit secrets. Use env vars only.

## Additional Docs

- `docs/CACHING_STRATEGY.md` - Route caching details
- `Copilot-Processing.md` - Modernization log
- `.github/copilot-instructions.md` - Copilot-specific guidance

---

**Keep ≤150 lines. Update with code changes.**
