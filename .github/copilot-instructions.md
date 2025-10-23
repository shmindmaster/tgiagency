# Copilot Instructions for TGI Agency

## Project Context

This is an insurance agency website built with Next.js 16, React 19, and TypeScript 5.9.3. The project uses Tailwind CSS v4 with CSS-first configuration, shadcn/ui components, Supabase for the database, and Zustand for state management.

## Package Manager

Use npm for all package management commands. Do not use pnpm or yarn.

## Component Guidelines

Server Components are the default in this Next.js App Router project. Only mark components with 'use client' when they need state, effects, or browser APIs.

Reuse components from the components/ui/ directory before creating new ones. These are shadcn/ui primitives that follow our design system.

Always use next/link for internal navigation and next/image for images to maintain optimization.

## Route Caching Strategy

Preserve existing route segment configuration when editing pages. Static routes use force-static, dynamic routes use force-dynamic, and the blog index uses ISR with revalidate set to 3600.

Static routes include all about pages, contact, privacy policy, business insurance pages, and personal insurance pages.

Dynamic routes include the homepage which uses zustand state and the API quotes endpoint.

When creating new slug-based pages with static data, implement generateStaticParams following the existing pattern in business and personal routes.

## TypeScript Standards

Strict mode is enabled across the project. Avoid using any types - use proper types or unknown instead.

No type assertions without justification and no suppressions like @ts-expect-error or as any unless absolutely necessary.

All validation schemas live in lib/validations.ts using Zod v4.

## Styling Conventions

Use Tailwind CSS utilities following the mobile-first approach. Start with base styles for mobile, then add responsive variants with sm:, md:, lg:, and xl: breakpoints.

Follow the design system color tokens: Primary #002244, Secondary #BF5700, Accent #7BAFD4.

Maintain consistent spacing using the 4px scale. Cards use 12px border radius, inputs and buttons use 6px.

## Form Handling

Use React Hook Form with Zod v4 for all forms. Remember that Zod v4 uses error.issues not error.errors.

Always implement both client-side validation with React Hook Form and server-side validation in API routes.

The quote form is a multi-step modal with state managed in stores/quote-store.ts. Maximum 5 steps, using nextStep and prevStep actions.

## Database Integration

The Supabase client in lib/supabase.ts uses the public anon key. Never expose the service role key in client code.

Blog content comes from filesystem markdown in lib/content/posts. The blog_posts table exists in Supabase but is not currently used.

When creating new migrations, add a new file to supabase/migrations/ with the pattern YYYYMMDDHHMMSS_description.sql. Never modify existing migration files.

## Import Conventions

Always use the @/ alias for imports from the project root. For example, import Button from '@/components/ui/button'.

Group imports in this order: React, Next.js, External libraries, Internal modules, Styles.

Check existing imports before adding new libraries to ensure we use what's already available.

## Naming Conventions

Use PascalCase for component names and type definitions.

Use camelCase for function names and variables.

Use kebab-case for file names.

## Code Comments

Keep comments minimal. Code should be self-documenting through clear naming.

When you do add comments, explain WHY something is done, not WHAT it does.

Only add detailed comments for complex logic that requires additional context.

## Security Requirements

Never commit secrets or API keys. All sensitive values must be in environment variables.

The quotes API endpoint includes honeypot fields and rate limiting. Never bypass these spam countermeasures.

Always validate user inputs on both client and server sides.

## Performance Optimization

Use Server Components whenever possible as they're faster and ship less JavaScript.

Only use the priority prop on next/image for above-the-fold hero images.

Keep image file sizes at or below 250KB. Compress large images before committing.

## Testing Requirements

Run E2E tests with npx playwright test. Focus on the quote form multi-step flow and contact form submission.

Always run npm run lint and npm run build before committing. Both must pass with zero errors.

Test responsive design across mobile, tablet, and desktop viewports.

## Accessibility Standards

Use semantic HTML elements throughout the application.

Maintain visible focus rings for keyboard navigation.

Include proper ARIA labels where appropriate.

Ensure color contrast meets WCAG standards.

## SEO Requirements

Every page must export metadata following the pattern: Title | TGI Agency.

Blog posts should include JSON-LD structured data when available.

Reuse breadcrumb and schema components from components/seo/ for hierarchical pages.

## Environment Variables

The project requires these environment variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_GA_MEASUREMENT_ID, NEXT_PUBLIC_MICROSOFT_CLARITY_ID.

Never embed keys directly in code. Always access them through process.env.

## Anti-Patterns to Avoid

Do not remove route caching directives from pages.

Do not convert Server Components to Client Components unnecessarily.

Do not duplicate shadcn/ui components - reuse existing primitives.

Do not add global mutable state outside the zustand store.

Do not bypass validation or spam countermeasures in forms.

Do not modify applied database migrations - create new ones instead.

## Additional Resources

See AGENTS.md for comprehensive project documentation including domain rules and architecture decisions.

See docs/CACHING_STRATEGY.md for detailed caching strategy implementation.

See Copilot-Processing.md for the complete modernization and upgrade history.
