## TGI Agency – Concise AI Guidance

Stack: Next.js 16 App Router (React 19), TypeScript strict, Tailwind v4 + shadcn/ui, Supabase, Zustand.

1. Components: Default Server Components. Add `'use client'` only for stateful UI (quote modal steps, homepage with zustand, forms, analytics). Reuse `components/ui/` primitives—do not duplicate.
2. Routing & Caching: Preserve existing declarations. Static (`force-static`): about/*, contact, privacy-policy, business/[slug], personal/[slug], resources/[slug]. Dynamic (`force-dynamic`): home (`app/page.tsx`), `api/quotes`. ISR: resources index (`revalidate = 3600`). For new static slug routes implement `generateStaticParams()` mirroring business/personal patterns.
3. Quote Flow: Launcher → Modal → step components → API POST `/api/quotes`. State in `stores/quote-store.ts` (persist only formData). Max steps 5; use store actions (`nextStep`,`prevStep`). Maintain honeypot + rate limit + Zod validation in route handler.
4. Content: Blog posts sourced from filesystem markdown via `lib/content/posts`. Supabase `blog_posts` table unused—do not switch without explicit requirement.
5. Supabase: Client from `lib/supabase.ts` with anon key only. Inserts pattern: `supabase.from('quotes').insert(payload)`. New tables require a new migration file under `supabase/migrations/` (never edit existing). Add helper modules in `lib/` for reusable queries.
6. Validation: Schemas live in `lib/validations.ts`. Use Zod v4 and `error.issues`. Client forms: React Hook Form + `zodResolver`. Always repeat server-side validation in API routes.
7. Styling & Tokens: Use Tailwind utilities; color tokens Primary 002244 / Secondary BF5700 / Accent 7BAFD4; spacing 4px scale; radii 12px (cards) / 6px (inputs/buttons). Keep accessible focus rings.
8. SEO: Each page/blog exports `metadata`. Title format: `<Specific> | TGI Agency`. For blog posts include JSON-LD when data available (see `app/resources/[slug]/page.tsx`). Breadcrumbs components under `components/seo/`.
9. Performance: Use `<Image>` with `priority` only for above-fold hero. Keep hero/background assets ≤250KB. Avoid adding client state to static pages; prefer Server Components.
10. Migrations: Filename pattern `YYYYMMDDHHMMSS_description.sql`; create new file—never modify applied ones. Keep SQL idempotent where feasible.
11. Assets: Compress large hero/product images to ≤250KB JPEG/WebP before commit; replace low-quality placeholders (e.g., boat image) rather than upscaling.
12. Analytics: GA4 / Clarity only activate when env IDs present; implement in existing analytics components—do not inline scripts elsewhere.
13. Env Vars: Require `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`; service role key only in server code. Never embed keys inline.
14. Testing: E2E (`npx playwright test`) for quote flow & contact form; always run `npm run lint` + `npm run build` pre-commit.
15. Anti-Patterns: Do NOT alter caching directives accidentally, duplicate shadcn/ui primitives, add extra global state, bypass validation/spam checks, edit applied migrations, or use `any`.
16. Extension: For admin/write ops beyond public inserts, add server-only route handlers and require service role (never ship it client side).

Keep changes surgical and aligned with existing patterns; request clarification before architectural shifts.

Last Updated: 2025-10-22
