# TGI Agency Website — Complete Build Guide (Refined)

**Primary Goal**
Build a modern, conversion-optimized website that simplifies insurance shopping, builds trust, and maximizes qualified leads for **Texas General Insurance (TGI)**.

## Strategic Pillars

1. **Unified Journey** — two clear paths: **Personal** and **Business**.
2. **Intelligent Quote Engine** — one multi‑step funnel replacing 25+ forms.
3. **Component‑First** — professional React components; no markdown-rendered pages.
4. **Texas‑First** — local expertise, service areas, and SERP dominance in TX.

---

## Non‑Negotiables (Read This First)

* **This is a modern React/Next app, not a blog.** Components drive UX.
* **Content is provided by stakeholders.** Do not invent copy.
* **Accessibility, performance, and SEO are part of “done,” not “later.”**

---

## Technology Stack (Locked)

* **Framework:** Next.js **15+** (App Router)
* **Language:** TypeScript (strict)
* **Styling:** Tailwind CSS **v4** with `@theme` design tokens
* **UI Components:** **shadcn/ui** with **lucide-react** icons
* **Forms:** `react-hook-form` + `zod`
* **State:** `zustand` (quote funnel, lightweight global)
* **Deployment:** Azure Static Web Apps (SSR validated) or Azure App Service (if heavier SSR/server actions)
* **Analytics:** GA4 + Microsoft Clarity
* **CI/CD:** GitHub Actions → Azure

> **Rule:** Don’t add libraries without explicit approval.

---

## URL Structure

* **Personal:** `/personal/[slug]` (6 pages)

  * `/personal/auto-insurance`
  * `/personal/home-insurance`
  * `/personal/renters-insurance`
  * `/personal/life-insurance`
  * `/personal/boat-watercraft-insurance`
  * `/personal/flood-insurance`
* **Business:** `/business/[slug]` (3 pages)

  * `/business/business-insurance`
  * `/business/landlord-property-insurance`
  * `/business/bonds-surety`
* **About:** `/about`, `/contact`
* **Resources:** `/resources` (listing), `/resources/[slug]` (post)
* **Static:** `/privacy-policy`

---

## Project Structure

```text
app/
├─ layout.tsx                     # Root layout with Header/Footer
├─ page.tsx                       # Homepage
├─ personal/
│  └─ [slug]/page.tsx             # Dynamic personal pages
├─ business/
│  └─ [slug]/page.tsx             # Dynamic business pages
├─ about/page.tsx
├─ contact/page.tsx
├─ resources/
│  ├─ page.tsx                    # Blog listing
│  └─ [slug]/page.tsx             # Blog post
└─ privacy-policy/page.tsx

components/
├─ shared/
│  ├─ layout/
│  │  ├─ Header.tsx
│  │  └─ Footer.tsx
│  ├─ sections/
│  │  ├─ HeroSection.tsx
│  │  ├─ BenefitsGrid.tsx
│  │  ├─ TestimonialsCarousel.tsx
│  │  └─ CTASection.tsx
│  └─ quote/
│     ├─ QuoteLauncher.tsx
│     ├─ QuoteModal.tsx
│     ├─ QuoteFormWizard.tsx
│     └─ steps/
│        ├─ StepSelectProduct.tsx
│        ├─ StepPersonalDetails.tsx
│        ├─ StepRiskDetails.tsx
│        └─ StepReviewSubmit.tsx
└─ ui/                             # shadcn components only

lib/
├─ utils.ts
└─ validations.ts                  # zod schemas

stores/
└─ quote-store.ts                  # zustand store

public/
└─ assets/                         # images, logos
```

> **House rule:** `components/shared` for site-specific UI; `components/ui` for shadcn primitives.

---

## Bolt.new — Project Knowledge

Add in **Project Settings → Knowledge**:

```md
## Build Guidelines — TGI Website (Strict)

### 1) Tech Stack
- Next.js 15+ App Router, TypeScript (strict)
- Tailwind CSS v4 only, shadcn/ui only, lucide-react only
- Forms: react-hook-form + zod, State: zustand
- Do not install extra libs without approval

### 2) Design & UI Quality
- Follow `/docs/DESIGN_SYSTEM.md` tokens exactly
- Output must look like Progressive/Lemonade (not docs/blog)
- Use lucide-react for icons; use official TGI logo asset (no icon as logo)

### 3) IA & Content Rules
- Content authored by stakeholders; never invent copy
- Navigation in `/docs/INFORMATION_ARCHITECTURE.md`

### 4) Component-First
- Build professional sections (Hero, BenefitsGrid, CTA, etc.)
- Place assets in `/public/assets/...`

### 5) Next.js Best Practices
- Add `"use client"` where hooks are used
- Avoid hydration mismatches; ensure server and client HTML match

### 6) Naming Conventions
- Folders/files: kebab-case; Components: PascalCase
```

---

## .bolt/ignore

```text
node_modules/
package-lock.json
.next/
.env.local
out/
dist/
build/
```

---

## Environment Variables (sample)

Create `.env.local` and configure secrets in Azure:

```
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=XXXXXXXXXX
QUOTE_INTAKE_WEBHOOK_URL=https://...
QUOTE_INTAKE_EMAIL=leads@tgiagency.com
QUOTE_INTAKE_SMTP_URL=smtps://user:pass@smtp.provider:465
ALLOW_ORIGIN=https://tgiagency.com
```

---

## Phase 1 — Foundation & Layout

### 1) Initialize project

```bash
pnpm create next-app@latest tgi --ts --use-tailwind --eslint
cd tgi
pnpm add @radix-ui/react-dialog @radix-ui/react-select react-hook-form @hookform/resolvers zod zustand lucide-react
```

### 2) Initialize shadcn/ui

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add dialog button input select textarea card tabs navigation-menu sheet alert
```

### 3) Tailwind v4 tokens (globals)

> Tailwind v4 favors CSS design tokens with `@theme`.

**`app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-primary: #002244;
  --color-secondary: #BF5700;
  --color-accent: #7BAFD4;
  --color-text: #505050;
  --color-label: #333333;
  --radius-sm: 6px;
  --radius-md: 12px;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-base: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

### 4) Header & Footer (requirements)

* **Header**: TGI logo → `/`, mega-menu (Personal/Business), "Contact", **Get a Free Quote** (opens modal), mobile hamburger (Radix `NavigationMenu`/`Sheet`).
* **Footer**: Four columns (Quick Links, Support, Legal, Contact), social icons, copyright.

### 5) Root layout

* Include `Header` and `Footer`.
* Set base typography, colors from tokens.

**Deliverables**

* ✅ Working Next.js app
* ✅ Responsive Header/Footer
* ✅ Design tokens wired in Tailwind v4

---

## Phase 2 — Intelligent Quote Funnel (Primary Revenue Engine)

### Zustand Store (`stores/quote-store.ts`)

```ts
import { create } from 'zustand';

type Product =
  | 'auto' | 'home' | 'renters' | 'life' | 'boat' | 'flood'
  | 'business' | 'landlord' | 'bonds';

interface QuoteState {
  currentStep: number;
  selectedProduct: Product | null;
  formData: Record<string, unknown>;
  setStep: (step: number) => void;
  setProduct: (product: Product) => void;
  updateFormData: (data: Record<string, unknown>) => void;
  resetForm: () => void;
}

export const useQuoteStore = create<QuoteState>((set) => ({
  currentStep: 0,
  selectedProduct: null,
  formData: {},
  setStep: (step) => set({ currentStep: step }),
  setProduct: (product) => set({ selectedProduct: product }),
  updateFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  resetForm: () => set({ currentStep: 0, selectedProduct: null, formData: {} }),
}));
```

### Validation Schemas (`lib/validations.ts`)

```ts
import { z } from 'zod';

export const personalDetailsSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\d{10}$/,'Valid 10-digit phone required'),
  zip: z.string().regex(/^\d{5}$/,'Valid ZIP code required'),
  consent: z.boolean().refine(Boolean, 'Consent is required'),
});

export const autoInsuranceSchema = z.object({
  vehicleYear: z.string().min(4),
  vehicleMake: z.string().min(2),
  vehicleModel: z.string().min(1),
  numDrivers: z.coerce.number().min(1),
  hasCurrentInsurance: z.boolean(),
});

// TODO: add schemas for each product type; keep lean & validated on server too
```

### Step Components (Key Rules)

* **StepSelectProduct**: Cards with lucide icons; update store; block Next until selected.
* **StepPersonalDetails**: `react-hook-form` + `zodResolver`; real-time errors; ARIA labels.
* **StepRiskDetails**: Conditional forms by product; keep fields minimal to reduce drop-off.
* **StepReviewSubmit**: Summaries by section; inline edit; disable submit until valid.

### Wizard Orchestration

* Progress indicator: "Step X of 4"
* Buttons: **Back**, **Next**, **Submit**; guard transitions with validation
* Persist state in store; reset on success

### Quote Modal

* `shadcn` Dialog; full-screen on mobile; confirm before closing if dirty

### API: Server Endpoint (Next.js App Router)

**`app/api/quote/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server';
import { personalDetailsSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    // Minimal server validation (never trust client)
    personalDetailsSchema.parse(payload.personalDetails);

    // Forward to CRM/Webhook/Email (no extra libs here)
    const webhook = process.env.QUOTE_INTAKE_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(payload) });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok:false, error:'Invalid submission' }, { status: 400 });
  }
}
```

> **Azure SWA note:** If using SWA Functions instead, mirror the schema check in an HTTP-triggered function and keep the same payload shape.

### Anti‑Spam & Safety (no extra libs)

* Hidden honeypot field; server rejects if filled.
* Rate-limit by IP in API (simple in-memory counter or SWA binding).
* Required **consent** checkbox with explicit disclosure.

### Analytics Events (GA4 + Clarity)

| Event                 | When                                           |
| --------------------- | ---------------------------------------------- |
| `quote_launch`        | Quote button clicked                           |
| `quote_step_complete` | Each step finished (include `{step, product}`) |
| `quote_submit`        | Successful POST                                |
| `quote_error`         | Validation/API failure                         |

**Deliverables**

* ✅ Fully functional multi-step quote form
* ✅ State persists across steps
* ✅ Server validation on submit
* ✅ Mobile-first, accessible modal UX

---

## Phase 3 — Content, SEO, and Local Dominance

### Homepage Skeleton (`app/page.tsx`)

* Hero → Benefits → Testimonials → CTA
* All CTAs open the Quote Modal

### Dynamic Insurance Pages

* One template per category, tailored benefits, FAQs, and CTAs
* Reuse sections; keep copy minimal and scannable

### Metadata API + JSON‑LD

Add per-page metadata and **InsuranceAgency** schema.

```ts
// Example metadata export
export const metadata = {
  title: 'Texas General Insurance | Auto, Home & Business Insurance',
  description: 'Affordable coverage in Sugar Land, TX. Get a free quote.',
  openGraph: { title: 'Texas General Insurance', images: ['/assets/og-image.jpg'] },
};
```

```tsx
// JSON-LD in layout or page
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'InsuranceAgency',
      name: 'Texas General Insurance',
      address: { addressLocality: 'Sugar Land', addressRegion: 'TX', addressCountry: 'US' },
      url: 'https://tgiagency.com',
      telephone: '+1-XXX-XXX-XXXX',
      areaServed: 'Texas',
    }),
  }}
/>
```

### Local SEO

* NAP consistency sitewide & in footer
* Link to Google Business Profile
* Service area mentions (major TX metros)

**Deliverables**

* ✅ Homepage + 9 insurance pages
* ✅ About, Contact, Privacy
* ✅ Blog list + 4 comprehensive blog posts
* ✅ SEO metadata + JSON-LD
* ✅ Blog assets (4 hero images, optimized)

---

## Blog/Resources Implementation

### Content Created

Four comprehensive, SEO-optimized blog posts with hero images:

1. **The Ultimate Guide to Home Insurance in Texas (2025)**
   - File: `content/blogs/01-home-insurance-texas-guide.md`
   - Image: `/assets/blog/home-insurance-guide-texas.jpg` (446 KB)
   - 3,500+ words | Focus: HO-3 vs HO-5, TWIA, flood, RCV vs ACV
   - Target keywords: "Texas home insurance", "HO-3 vs HO-5", "TWIA windstorm"

2. **Business Insurance 101: GL vs BOP vs Workers' Comp**
   - File: `content/blogs/02-business-insurance-gl-bop-workers-comp.md`
   - Image: `/assets/blog/business-insurance-texas.jpg` (320 KB)
   - 2,500+ words | Focus: GL, BOP, Workers' Comp in Texas
   - Target keywords: "Texas business insurance", "GL vs BOP", "workers comp Texas"

3. **Do I Need Flood Insurance Outside a Flood Zone?**
   - File: `content/blogs/03-flood-insurance-outside-flood-zone.md`
   - Image: `/assets/blog/texas-street-flood.jpg` (215 KB)
   - 2,000+ words | Focus: FEMA zones, Houston Harvey case study
   - Target keywords: "flood insurance Texas", "NFIP outside flood zone"

4. **How to Bundle Home + Auto and Actually Save**
   - File: `content/blogs/04-bundle-home-auto-save-money.md`
   - Image: `/assets/blog/bundle-home-auto.jpg` (470 KB)
   - 1,800+ words | Focus: Multi-policy discounts, TCO analysis
   - Target keywords: "bundle home auto Texas", "multi-policy discount"

### Blog Page Structure

```typescript
// app/resources/page.tsx - Blog listing
export default function ResourcesPage() {
  const posts = [
    {
      slug: 'ultimate-guide-home-insurance-texas',
      title: 'The Ultimate Guide to Home Insurance in Texas (2025)',
      excerpt: 'Everything Texas homeowners need to know about HO-3 vs HO-5, TWIA windstorm...',
      image: '/assets/blog/home-insurance-guide-texas.jpg',
      category: 'Personal Insurance',
      date: '2025-10-22',
      readTime: '12 min'
    },
    // ... other posts
  ];

  return (
    <section className="resources-index">
      <h1>Insurance Resources & Guides</h1>
      <div className="post-grid">
        {posts.map(post => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
}

// app/resources/[slug]/page.tsx - Individual post
export async function generateStaticParams() {
  return [
    { slug: 'ultimate-guide-home-insurance-texas' },
    { slug: 'business-insurance-101-gl-bop-workers-comp' },
    { slug: 'flood-insurance-outside-flood-zone' },
    { slug: 'bundle-home-auto-insurance-save-money' }
  ];
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  return (
    <article className="blog-post">
      <header className="post-header">
        <img src={post.image} alt={post.imageAlt} />
        <h1>{post.title}</h1>
      </header>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

### SEO & Schema for Blog Posts

Each post includes:
- Meta title/description
- Open Graph tags with hero image
- Article schema markup (JSON-LD)
- Internal linking to related products/pages
- External citations to authoritative sources (FEMA, TDI, TWIA)

---

## Phase 4 — Testing, Perf, Accessibility, Deploy

### Functionality

* [ ] Nav links work
* [ ] Quote supports all products
* [ ] Client + server validation
* [ ] Error states & success toasts
* [ ] Mobile menu and dialog

### Responsive

* [ ] 375/414 mobile, 768/1024 tablet, 1280/1920 desktop
* [ ] No horizontal scroll; tap targets ≥ 44×44

### Accessibility (AA)

* [ ] Images have `alt`
* [ ] Proper heading hierarchy
* [ ] Labels/aria-* for inputs; keyboard reachable; focus visible
* [ ] Dialog traps focus; ESC closes; restores focus

### Performance Budget

* Use `next/image` everywhere; WebP/AVIF
* Lazy-load heavy sections; dynamic import carousels
* CLS < 0.1, LCP < 2.5s, TBT < 200ms
* Lighthouse: **Perf ≥ 90**, **A11y ≥ 95**, **SEO = 100**

### Security & Privacy

* HTTPS only; CORS restricted via `ALLOW_ORIGIN`
* Never log PII; redact phone/email/ZIP in server logs
* Explicit consent language; link to privacy policy near submit

### Deployment

* **Azure SWA** (preferred for static + light SSR) or **App Service** (heavy SSR)
* Configure CI with GitHub Actions and env secrets

**Sample SWA workflow (excerpt)**

```yml
name: deploy-swa
on: { push: { branches: [ main ] } }
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_SWA_TOKEN }}
          app_location: "/"
          output_location: ".next"
```

---

## Success Criteria (Definition of Done)

* ✅ Lighthouse: Perf ≥ 90, A11y ≥ 95, SEO = 100
* ✅ Quote funnel works E2E (all products), server validated, anti-spam in place
* ✅ Mobile-first, accessible, fast
* ✅ All CTAs invoke the modal and fire analytics events
* ✅ Pages accurate, internal nav complete, contact info correct

---

## Quick Start Commands (copy/paste)

```bash
# Create & deps
pnpm create next-app@latest tgi --ts --use-tailwind --eslint
cd tgi
pnpm add @radix-ui/react-dialog @radix-ui/react-select react-hook-form @hookform/resolvers zod zustand lucide-react

# shadcn/ui
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add dialog button input select textarea card tabs navigation-menu sheet alert

# Dev
pnpm dev
```

> **Reminder:** Begin with **Phase 1**. Only move to **Phase 2** after header/footer, tokens, and layout are in and reviewed.
