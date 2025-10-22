# Agent Instructions for TGI Agency

## Commands
- **Build:** `npm run build` (typecheck included)
- **Typecheck:** `npm run typecheck` (or `tsc --noEmit`)
- **Lint:** `npm run lint`
- **Dev:** `npm run dev`
- **Test:** Playwright configured (`npx playwright test` for E2E, single test: `npx playwright test <filename>`)

## Architecture
- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5.9.3
- **Styling:** Tailwind CSS 4.1 + shadcn/ui components
- **State:** Zustand (`stores/quote-store.ts`)
- **Database:** Supabase (client in `lib/supabase.ts`)
- **Structure:** `app/` (routes), `components/` (UI), `lib/` (utils), `hooks/`, `stores/`
- **Caching:** Static routes use `force-static`, dynamic use `force-dynamic`, ISR on blog index

## Code Style
- **TypeScript:** Strict mode, avoid `any`, use Zod for validation
- **Imports:** Alias `@/` for root paths (e.g., `@/components/ui/button`)
- **Components:** Server Components by default, mark `'use client'` explicitly
- **Naming:** PascalCase (components/types), camelCase (functions/vars), kebab-case (files)
- **Comments:** Minimal—explain WHY not WHAT; no code explanations unless complex
- **Formatting:** Match project ESLint flat config; run lint before committing
