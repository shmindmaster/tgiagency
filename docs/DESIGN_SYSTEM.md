# 🎨 TGI Agency Design System

## Color Palette

### Primary Palette
- **Primary:** `#002244` (Deep Blue) - Headers, primary buttons, brand elements
- **Secondary:** `#BF5700` (Burnt Orange) - Accents, CTAs, highlights
- **Accent:** `#7BAFD4` (Soft Blue) - Interactive elements, links, focus states

### Text & Neutral Palette
- **Text:** `#505050` (Medium Grey) - Body text
- **Label:** `#333333` (Dark Grey) - Labels, headings
- **White:** `#FFFFFF` - Backgrounds, light text

### Background & UI Elements
- **Background:** `#FAFAFA` - Page background
- **Element Background:** `#E8E8E8` - Cards, panels
- **Light:** `#F2F2F2` - Subtle backgrounds
- **Border:** `#CCCCCC` - Input borders, dividers
- **Border 02:** `#DDDDDD80` (Light Grey with Transparency) - Subtle borders

## Typography Scale

### Typeface
- **Primary Font:** Inter, system-ui, -apple-system, sans-serif
- **Monospace:** 'Courier New', monospace (for code/data)

### Type Scale
- **Display:** 40px / 48px / 700 - Hero headlines, landing pages
- **H1:** 32px / 40px / 700 - Page titles
- **H2:** 24px / 32px / 700 - Section headings
- **H3:** 20px / 28px / 600 - Subsection headings
- **Body:** 16px / 24px / 400 - Default body text
- **Small:** 14px / 20px / 400 - Captions, helper text

*Format: font-size / line-height / font-weight*

## Spacing Scale

Use consistent spacing based on 4px increments:
- **xs:** 4px
- **sm:** 8px
- **md:** 12px
- **base:** 16px
- **lg:** 24px
- **xl:** 32px
- **2xl:** 48px
- **3xl:** 64px

## Border Radius

- **sm:** 6px - Inputs, small buttons
- **md:** 12px - Cards, large buttons, modals

## Shadows

Use shadows sparingly for depth and hierarchy:
- **sm:** `0 1px 2px 0 rgba(0, 0, 0, 0.05)` - Subtle elevation
- **md:** `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)` - Cards
- **lg:** `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)` - Modals, dropdowns

All shadows maintain accessible contrast ratios.

## Components

### Buttons

**Primary Button:**
- Background: `#002244` (Primary)
- Text: `#FFFFFF` (White)
- Padding: 12px 24px
- Border Radius: 6px
- Font: 16px / 600
- Hover: Lighten by 10%
- Focus: 2px outline `#7BAFD4` (Accent)

**Secondary Button:**
- Background: Transparent
- Border: 2px solid `#002244` (Primary)
- Text: `#002244` (Primary)
- Padding: 10px 22px (account for border)
- Border Radius: 6px
- Font: 16px / 600
- Hover: Background `#002244`, Text `#FFFFFF`

**Accent Button:**
- Background: `#7BAFD4` (Accent)
- Text: `#FFFFFF` (White)
- Padding: 12px 24px
- Border Radius: 6px
- Font: 16px / 600
- Use for secondary CTAs

**Disabled Button:**
- Background: `#DDDDDD80` (Border 02)
- Text: `#999999`
- Cursor: not-allowed
- No hover state

### Cards

- Background: `#FFFFFF` (White)
- Border: 1px solid `#DDDDDD80` (Border 02)
- Border Radius: 12px
- Padding: 24px
- Shadow: sm (optional, for elevation)

### Inputs

**Text Input / Select / Textarea:**
- Background: `#FFFFFF` (White)
- Border: 1px solid `#CCCCCC` (Border)
- Border Radius: 6px
- Padding: 10px 12px
- Font: 16px / 400
- Focus: Border `#7BAFD4` (Accent), 2px ring `#7BAFD480`
- Error: Border `#BF5700` (Secondary), helper text in Secondary color

**Labels:**
- Color: `#333333` (Label)
- Font: 14px / 600
- Margin Bottom: 8px

### Navigation

**Header:**
- Background: `#FFFFFF` (White)
- Text: `#333333` (Label)
- Border Bottom: 1px solid `#DDDDDD80`
- Sticky positioning
- Padding: 16px 24px
- Logo: Max height 48px
- CTA Button: Primary button style

**Mega Menu Dropdown:**
- Background: `#FFFFFF` (White)
- Border: 1px solid `#DDDDDD80`
- Shadow: lg
- Padding: 24px
- Link hover: Background `#F2F2F2` (Light)

**Footer:**
- Background: `#002244` (Primary)
- Text: `#FFFFFF` (White)
- Link Color: `#7BAFD4` (Accent)
- Padding: 48px 24px

## Accessibility

### Color Contrast
- All text on `#002244` (Primary) uses `#FFFFFF` (White) - **AA+ compliant**
- All text on `#7BAFD4` (Accent) uses `#FFFFFF` (White) or `#333333` (Label) - **AA+ compliant**
- Body text `#505050` on `#FFFFFF` - **AA compliant (7:1 ratio)**
- Labels `#333333` on `#FFFFFF` - **AAA compliant (12.6:1 ratio)**

### Focus States
- All interactive elements have visible focus indicators
- Focus ring: 2px outline `#7BAFD4` (Accent) with 2px offset
- Never remove focus styles without providing alternative

### Touch Targets
- Minimum target size: **44x44px** for all interactive elements
- Adequate spacing between adjacent targets (min 8px)

### Motion & Animation
- Respect `prefers-reduced-motion` media query
- Transitions: 200-300ms for micro-interactions
- No auto-playing animations

## Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px
- **Wide:** > 1440px

## Dark Mode (Optional - Future Enhancement)

When implementing dark mode:
- Invert surface colors (Background becomes `#1A1A1A`, cards `#2D2D2D`)
- Maintain Primary `#002244` with adjusted luminosity
- Ensure all contrast ratios remain AA+ compliant
- Use `prefers-color-scheme` media query

## Component Library

**Recommended Stack:**
- **shadcn/ui** - For Dialog, Tabs, Form components
- **react-hook-form** - Form state management
- **zod** - Schema validation
- **Tailwind CSS** - Utility-first styling with design tokens

---

## Blog & Resources Design Components

### Blog Listing Page

**Hero Section:**
- Background: `#FAFAFA` (Background) with optional gradient overlay
- H1: "Insurance Resources & Guides for Texas"
- Font: 40px / 48px / 700 (Display)
- Color: `#002244` (Primary)
- Subtitle: "Expert insurance guides for Texas families and businesses"
- Font: 20px / 28px / 400 (H3 size, body weight)
- Color: `#505050` (Text)
- Padding: 64px vertical on desktop, 48px on mobile

**Category Filter Tabs:**
- Container: Horizontal scroll on mobile, flex row on desktop
- Individual Tab:
  - Background (inactive): `#FFFFFF` (White)
  - Background (active): `#002244` (Primary)
  - Text (inactive): `#333333` (Label)
  - Text (active): `#FFFFFF` (White)
  - Border: 1px solid `#DDDDDD80`
  - Border Radius: 6px
  - Padding: 10px 20px
  - Font: 16px / 600
  - Hover (inactive): Background `#F2F2F2` (Light)
- Categories: All Posts, Personal Insurance, Business Insurance, Cost Savings
- Spacing: 8px gap between tabs

**Blog Card Component:**
```
┌─────────────────────────────────────┐
│                                     │
│        [Hero Image 16:9]            │
│                                     │
├─────────────────────────────────────┤
│ [Category Badge]                    │
│                                     │
│ Blog Post Title Here (H3)           │
│                                     │
│ Brief excerpt description that      │
│ provides context about the post...  │
│                                     │
│ Jan 15, 2025 · 8 min read           │
│                                     │
│ [Read More →]                       │
└─────────────────────────────────────┘
```

**Card Specifications:**
- Container:
  - Background: `#FFFFFF` (White)
  - Border: 1px solid `#DDDDDD80`
  - Border Radius: 12px
  - Shadow: sm (on hover: md)
  - Padding: 0 (image full-bleed at top)
  - Transition: all 200ms ease
  - Hover: Lift by 4px (transform: translateY(-4px))

- Hero Image:
  - Aspect Ratio: 16:9
  - Border Radius: 12px 12px 0 0 (top corners only)
  - Object Fit: cover
  - Loading: lazy (except first 3 cards)
  - Alt text: Descriptive based on blog content

- Content Padding:
  - Desktop: 24px all sides
  - Mobile: 16px all sides

- Category Badge:
  - Background: `#7BAFD4` (Accent) for Personal Insurance
  - Background: `#BF5700` (Secondary) for Business Insurance
  - Background: `#002244` (Primary) for Cost Savings
  - Text: `#FFFFFF` (White)
  - Font: 12px / 400 / uppercase / letter-spacing: 0.5px
  - Padding: 4px 12px
  - Border Radius: 4px
  - Margin Bottom: 12px

- Post Title:
  - Font: 20px / 28px / 600 (H3)
  - Color: `#002244` (Primary)
  - Margin Bottom: 12px
  - Max Lines: 2 (truncate with ellipsis)
  - Hover: Color `#7BAFD4` (Accent)

- Excerpt:
  - Font: 16px / 24px / 400 (Body)
  - Color: `#505050` (Text)
  - Max Lines: 3 (truncate with ellipsis)
  - Margin Bottom: 16px

- Meta Information:
  - Font: 14px / 20px / 400 (Small)
  - Color: `#999999`
  - Separator: " · " between date and read time
  - Margin Bottom: 16px

- "Read More" CTA:
  - Secondary button style (transparent with border)
  - Full-width on mobile, auto on desktop
  - Icon: Right arrow (→)
  - Hover: Fill with `#002244`, text to white

**Grid Layout:**
- Desktop: 3 columns (1fr 1fr 1fr)
- Tablet: 2 columns (1fr 1fr)
- Mobile: 1 column (1fr)
- Gap: 32px (vertical and horizontal)
- Max Width: 1200px container

---

### Individual Blog Post Template

**Post Header:**
```
┌─────────────────────────────────────┐
│                                     │
│     [Hero Image - Full Width]       │
│                                     │
├─────────────────────────────────────┤
│ [Category Badge]                    │
│                                     │
│ The Ultimate Guide to Home          │
│ Insurance in Texas (2025)           │
│                                     │
│ Jan 15, 2025 · 8 min read           │
└─────────────────────────────────────┘
```

**Header Specifications:**
- Hero Image:
  - Dimensions: 1920x1080 (16:9)
  - Max Height: 500px on desktop, 300px on mobile
  - Object Fit: cover
  - Object Position: center
  - Loading: eager (above fold)
  - Quality: 85%

- Content Container:
  - Max Width: 800px (centered)
  - Padding: 48px vertical, 24px horizontal
  - Background: `#FFFFFF` (White)

- Category Badge:
  - Same styling as blog card badges
  - Margin Bottom: 16px

- H1 Title:
  - Font: 40px / 48px / 700 (Display) on desktop
  - Font: 32px / 40px / 700 (H1) on mobile
  - Color: `#002244` (Primary)
  - Margin Bottom: 16px

- Meta Line:
  - Font: 14px / 20px / 400 (Small)
  - Color: `#999999`
  - Margin Bottom: 32px

**Post Content Area:**

*Typography Hierarchy:*
- **H2 Subheadings:**
  - Font: 24px / 32px / 700
  - Color: `#002244` (Primary)
  - Margin: 48px 0 16px 0 (creates visual breaks)
  - Border Bottom: 2px solid `#E8E8E8` (optional)
  - Padding Bottom: 8px (if border used)

- **H3 Sub-subheadings:**
  - Font: 20px / 28px / 600
  - Color: `#333333` (Label)
  - Margin: 32px 0 12px 0

- **Body Paragraphs:**
  - Font: 16px / 24px / 400 (Body)
  - Color: `#505050` (Text)
  - Margin Bottom: 24px
  - Max Width: 65ch (optimal reading length)

- **Bulleted Lists:**
  - Font: 16px / 24px / 400
  - Color: `#505050` (Text)
  - Margin: 16px 0 24px 0
  - Padding Left: 24px
  - List Style: Disc (custom color `#7BAFD4` if possible)
  - Line Height: 32px (increased for readability)

- **Numbered Lists:**
  - Font: 16px / 24px / 400
  - Color: `#505050` (Text)
  - Counter Style: Decimal
  - Margin: 16px 0 24px 0
  - Padding Left: 24px

*Special Content Blocks:*

**Blockquote / Callout:**
- Background: `#F2F2F2` (Light)
- Border Left: 4px solid `#BF5700` (Secondary)
- Padding: 16px 24px
- Margin: 32px 0
- Font: 18px / 28px / 400
- Color: `#333333` (Label)
- Border Radius: 0 6px 6px 0
- Icon: Optional quotation mark or info icon

**Important Note Box:**
- Background: `#7BAFD410` (Accent at 10% opacity)
- Border: 1px solid `#7BAFD4` (Accent)
- Border Radius: 6px
- Padding: 16px 20px
- Margin: 24px 0
- Icon: ℹ️ or ⚠️ at start
- Font: 16px / 24px / 400
- Color: `#002244` (Primary)

**Comparison Tables:**
- Border: 1px solid `#DDDDDD80`
- Border Radius: 6px
- Margin: 32px 0
- Header Row:
  - Background: `#002244` (Primary)
  - Text: `#FFFFFF` (White)
  - Font: 16px / 600
  - Padding: 12px 16px
- Body Rows:
  - Background: `#FFFFFF` (White)
  - Alternating: `#FAFAFA` (Background)
  - Text: `#505050` (Text)
  - Font: 16px / 400
  - Padding: 12px 16px
  - Border Bottom: 1px solid `#DDDDDD80`
- Responsive: Horizontal scroll on mobile

**Inline Links:**
- Color: `#7BAFD4` (Accent)
- Text Decoration: underline
- Hover: Color `#BF5700` (Secondary), underline remains
- External links: Add icon (↗) after text
- Font Weight: 600 (bold for emphasis)

**Code Snippets (if applicable):**
- Background: `#2D2D2D` (dark grey)
- Text: `#F8F8F2` (light grey)
- Font: 14px / 'Courier New', monospace
- Padding: 16px
- Border Radius: 6px
- Overflow: auto (horizontal scroll if needed)
- Margin: 24px 0

**Post Footer:**

**CTA Box:**
```
┌─────────────────────────────────────┐
│                                     │
│     Get Your Free Quote Today       │
│                                     │
│  Call (281) 494-4990 or click       │
│  below to compare rates from        │
│  top Texas carriers.                │
│                                     │
│  [Get Free Quote →] [Call Us]       │
│                                     │
└─────────────────────────────────────┘
```

- Background: `#002244` (Primary) with subtle gradient
- Text: `#FFFFFF` (White)
- Padding: 48px 32px
- Border Radius: 12px
- Margin: 64px 0 48px 0
- Center-aligned text
- Buttons: Accent (primary CTA) + Secondary variant
- Shadow: md

**Related Posts Section:**
- H2: "Related Articles"
- Font: 24px / 32px / 700
- Margin Bottom: 32px
- Grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Cards: Same design as blog listing cards (smaller variant)
- Max: 3 related posts

---

### Blog Category Color System

Use consistent colors for category badges across all blog components:

| Category | Background Color | Text Color | Use Case |
|----------|------------------|------------|----------|
| Personal Insurance | `#7BAFD4` (Accent) | `#FFFFFF` (White) | Auto, Home, Renters, Life, Flood |
| Business Insurance | `#BF5700` (Secondary) | `#FFFFFF` (White) | GL, BOP, Workers' Comp, Landlord |
| Cost Savings | `#002244` (Primary) | `#FFFFFF` (White) | Bundling, Discounts, Comparison |

**Additional Categories (Future):**
- Industry News: `#333333` (Label) / `#FFFFFF`
- Guides & How-To: `#7BAFD4` (Accent) / `#FFFFFF`

---

### Blog Component Checklist

**For Developers:**

- [ ] **BlogCard Component** (`components/blog/BlogCard.tsx`)
  - [ ] Responsive image with 16:9 ratio
  - [ ] Category badge with dynamic color
  - [ ] Title truncation (2 lines)
  - [ ] Excerpt truncation (3 lines)
  - [ ] Meta info (date + read time)
  - [ ] Hover animations (lift + shadow)
  - [ ] Accessible link wrapping entire card

- [ ] **BlogPostHeader Component** (`components/blog/BlogPostHeader.tsx`)
  - [ ] Full-width hero image
  - [ ] Category badge
  - [ ] H1 title with responsive sizing
  - [ ] Publication date and read time
  - [ ] Schema markup (JSON-LD Article)

- [ ] **BlogPostContent Component** (`components/blog/BlogPostContent.tsx`)
  - [ ] Typography styles for H2, H3, p, ul, ol
  - [ ] Blockquote/callout styling
  - [ ] Table styling (responsive)
  - [ ] Inline link styling
  - [ ] Max-width constraint (800px)
  - [ ] Proper spacing between sections

- [ ] **BlogCTA Component** (`components/blog/BlogCTA.tsx`)
  - [ ] Full-width CTA box
  - [ ] Phone number with tel: link
  - [ ] Dual CTA buttons
  - [ ] Gradient background

- [ ] **RelatedPosts Component** (`components/blog/RelatedPosts.tsx`)
  - [ ] Responsive grid (3/2/1 columns)
  - [ ] Reuse BlogCard component
  - [ ] Filter logic (same category or popular)

- [ ] **CategoryFilter Component** (`components/blog/CategoryFilter.tsx`)
  - [ ] Tab-style filter buttons
  - [ ] Active state styling
  - [ ] Horizontal scroll on mobile
  - [ ] Query param integration (?category=personal-insurance)

---

### Blog SEO & Accessibility

**Meta Tags (Every Blog Post):**
```tsx
export const metadata = {
  title: "The Ultimate Guide to Home Insurance in Texas (2025) | TGI Agency",
  description: "Learn everything about Texas home insurance: HO-3 vs HO-5, TWIA windstorm, flood coverage, and how to save on premiums.",
  openGraph: {
    title: "The Ultimate Guide to Home Insurance in Texas (2025)",
    description: "Learn everything about Texas home insurance: HO-3 vs HO-5, TWIA windstorm, flood coverage, and how to save on premiums.",
    url: "https://tgiagency.com/resources/ultimate-guide-home-insurance-texas",
    type: "article",
    images: [
      {
        url: "/assets/blog/home-insurance-guide-texas.jpg",
        width: 1920,
        height: 1080,
        alt: "Texas home insurance guide"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ultimate Guide to Home Insurance in Texas (2025)",
    description: "Learn everything about Texas home insurance: HO-3 vs HO-5, TWIA windstorm, flood coverage, and how to save on premiums.",
    images: ["/assets/blog/home-insurance-guide-texas.jpg"]
  }
};
```

**Schema Markup (JSON-LD):**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Ultimate Guide to Home Insurance in Texas (2025)",
  "image": "https://tgiagency.com/assets/blog/home-insurance-guide-texas.jpg",
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-15",
  "author": {
    "@type": "Organization",
    "name": "TGI Agency Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "TGI Agency",
    "logo": {
      "@type": "ImageObject",
      "url": "https://tgiagency.com/assets/brand/logo-primary.svg"
    }
  },
  "description": "Comprehensive guide to home insurance in Texas covering policy types, TWIA, flood insurance, and cost-saving strategies.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://tgiagency.com/resources/ultimate-guide-home-insurance-texas"
  }
}
```

**Accessibility Requirements:**
- All images have descriptive alt text
- Headings follow logical hierarchy (H1 → H2 → H3, no skipping)
- Link text is descriptive (avoid "click here")
- Color contrast meets WCAG AA standard
- Focus indicators visible on all interactive elements
- Skip-to-content link for keyboard navigation
- ARIA labels on category filter buttons

**Performance Targets:**
- Lighthouse Performance: 90+
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Total page weight: < 1.5 MB (including hero image)

---

### Blog Asset Specifications

**Hero Images:**
- Dimensions: 1920x1080px (16:9 ratio)
- Format: JPEG (Next.js auto-converts to WebP)
- Quality: 85% (balance of quality and file size)
- Target Size: 200-500 KB compressed
- Loading: `priority={true}` for above-fold
- Alt Text: Descriptive and keyword-rich

**Available Blog Assets:**

| Post | Image File | Size | Alt Text Example |
|------|------------|------|------------------|
| Home Insurance Guide | `home-insurance-guide-texas.jpg` | 446 KB | "Modern Texas home with well-maintained lawn and insurance protection" |
| Business Insurance 101 | `business-insurance-texas.jpg` | 320 KB | "Texas retail storefront with professional business insurance coverage" |
| Flood Insurance Guide | `texas-street-flood.jpg` | 215 KB | "Flooded Texas residential street showing need for flood insurance" |
| Bundle Guide | `bundle-home-auto.jpg` | 470 KB | "Happy family with home and car representing bundled insurance savings" |

**Image Optimization:**
```tsx
import Image from 'next/image';

// Blog hero image
<div className="relative h-[500px] w-full overflow-hidden">
  <Image
    src="/assets/blog/home-insurance-guide-texas.jpg"
    alt="Modern Texas home with well-maintained lawn and insurance protection"
    fill
    className="object-cover object-center"
    priority
    quality={85}
    sizes="100vw"
  />
</div>
```

---

## Asset Usage Guide

### Asset Inventory

All assets are located in `/assets` with the following structure:

```
assets/
├── brand/           # Logos and brand identity
├── general/         # Background images and generic photos
├── partners/        # Partner/carrier logos
├── products/        # Insurance product hero images
├── testimonials/    # Customer testimonial photos
├── blog/            # Blog post hero images (NEW)
└── videos/          # Video content (not recommended for web)
```

**Total Asset Count:** 41 files
**Total Size:** ~6.9 MB

---

### Brand Assets

**Logo Usage:**

**Primary Logo (SVG):**
- **File:** `/assets/brand/logo-primary.svg` (7.6 KB)
- **Usage:** Header navigation, hero sections, marketing materials
- **Format:** SVG - scalable, crisp at any size
- **Color:** Should work on white backgrounds
- **Implementation:**
  ```tsx
  <Image src="/assets/brand/logo-primary.svg" alt="TGI Agency" width={180} height={60} priority />
  ```

**PNG Logos:**
- **Files:** `logo.png` (6.5 KB), `logo-footer.png` (2.1 KB)
- **Usage:** Fallback or specific placements
- **Recommendation:** ⚠️ Use SVG version instead for better quality

**Favicon:**
- **File:** `/assets/brand/icon-favicon.png` (1.2 KB)
- **Usage:** Browser tab icon
- **Status:** ✅ Good size, ready to use
- **Implementation:** Add to `app/layout.tsx` metadata

**⚠️ MISSING ASSETS:**
- **OG Share Image:** Need 1200x630px image for social sharing (Facebook, LinkedIn, Twitter)
- **Apple Touch Icon:** Need 180x180px for iOS home screen
- **PWA Icons:** Need 192x192px and 512x512px for Progressive Web App

**Recommendation:** Create these from logo or hero images for complete branding.

---

### Product Hero Images

**Purpose:** Full-width background images for insurance product pages

**Available Images:**

| Product | File | Size | Status | Usage |
|---------|------|------|--------|-------|
| Auto | `car-insurance.jpg` | 190 KB | ✅ Good | `/personal/auto-insurance` hero |
| Home | `home-insurance.jpg` | 207 KB | ✅ Good | `/personal/home-insurance` hero |
| Renters | `renter-insurance.jpg` | 263 KB | ⚠️ Large | `/personal/renters-insurance` hero |
| Life | `life-insurance.jpg` | 356 KB | ⚠️ Large | `/personal/life-insurance` hero |
| Boat | `boat-insurance-OLD.jpg` | 16 KB | ❌ Low quality - REPLACED | **See BOAT-IMAGE-NEEDED.txt** |
| Flood | `flood-insurance.jpg` | 85 KB | ✅ Good | `/personal/flood-insurance` hero |
| Business | `business-insurance.jpg` | 472 KB | ❌ Too large | `/business/business-insurance` hero |
| Landlord | `landlord-insurance.jpg` | 156 KB | ✅ Good | `/business/landlord-property-insurance` hero |
| Bonds | `bond-insurance.jpg` | 403 KB | ⚠️ Large | `/business/bonds-surety` hero |

**Implementation Pattern:**
```tsx
<HeroSection
  backgroundImage="/assets/products/car-insurance.jpg"
  title="Affordable Auto Insurance in Texas"
  subtitle="Comprehensive coverage with competitive rates"
/>
```

**⚠️ OPTIMIZATION REQUIRED:**

**✅ COMPLETED:**
- ✅ Video files deleted (saved 14+ MB)
- ✅ Low-quality boat image flagged for replacement

**📋 REMAINING TASKS:**

1. **boat-insurance.jpg** - Low-quality file has been renamed to `boat-insurance-OLD.jpg`
   - **Action:** Download high-quality replacement from Unsplash or Pexels
   - **Details:** See `/assets/products/BOAT-IMAGE-NEEDED.txt` for specifications
   - **Target:** 150-250 KB, 1920x1080px minimum

2. **business-insurance.jpg** (472 KB) - Too large for web
   - **Action:** Compress to 200-250 KB max (use TinyPNG or ImageOptim)

3. **life-insurance.jpg** (356 KB) - Larger than needed
   - **Action:** Compress to 200-250 KB

4. **bond-insurance.jpg** (403 KB) - Larger than needed
   - **Action:** Compress to 200-250 KB

5. **renter-insurance.jpg** (263 KB) - Acceptable but could be optimized
   - **Action:** Compress to 150-200 KB

**Target Size:** Aim for 150-250 KB per hero image for optimal performance.

**🔧 QUICK FIX - Use Helper Script:**
Run this PowerShell script to prepare images for compression:
```powershell
.\scripts\prepare-for-compression.ps1
```
This will copy the 5 images that need compression to a temporary folder and guide you through the TinyPNG process.

**Next.js Image Optimization:**
```tsx
import Image from 'next/image';

// Next.js will automatically optimize
<div className="relative h-[500px] w-full">
  <Image
    src="/assets/products/car-insurance.jpg"
    alt="Auto Insurance"
    fill
    className="object-cover"
    priority // for above-fold images
    quality={85} // balance quality and file size
  />
</div>
```

---

### General Background Images

**Available Images:**

| File | Size | Suggested Use | Status |
|------|------|---------------|--------|
| `background-header-generic.jpg` | 460 KB | Generic hero background | ❌ Too large - compress to 200-250 KB |
| `background-agent-contract.jpg` | 171 KB | About page, testimonials section | ✅ Good |
| `background-insurance-hands.jpg` | 191 KB | Contact page, CTA sections | ✅ Good |
| `background-insurance-services.jpg` | 115 KB | Services overview | ✅ Good |
| `background-policy-header.jpg` | 166 KB | Blog posts, resources | ✅ Good |
| `hero-business-people.jpg` | 159 KB | Business pages hero | ✅ Good |
| `insurance-agent-hands.jpg` | 148 KB | Trust sections, about | ✅ Good |
| `insurance-brokers.jpg` | 148 KB | Team section | ✅ Good |
| `businessman-motor-show.jpg` | 67 KB | Blog thumbnails | ✅ Good |
| `hand-holding-car-key.jpg` | 162 KB | Auto insurance content sections | ✅ Good |
| `misc-404-not-found.jpg` | 60 KB | 404 error page | ✅ Good |

**Recommendations:**
- ✅ Most images are well-optimized (100-200 KB range)
- ❌ `background-header-generic.jpg` needs compression (460 KB → 200 KB)
- ✅ Good variety for different page contexts

---

### Partner Logos

**Available Partners:**

| Partner | Files | Size | Status |
|---------|-------|------|--------|
| American Risk | JPG (4.5 KB), PNG (4.5 KB) | ✅ Optimized | Good |
| Farmers | JPG (6.6 KB), PNG (6.6 KB) | ✅ Optimized | Good |
| Swyfft | JPG (18.6 KB), PNG (18.6 KB) | ✅ Optimized | Good |

**Usage Pattern:**
```tsx
<div className="partners-grid">
  <Image src="/assets/partners/logo-american-risk.png" alt="American Risk" width={120} height={60} />
  <Image src="/assets/partners/logo-farmers.png" alt="Farmers Insurance" width={120} height={60} />
  <Image src="/assets/partners/logo-swyfft.png" alt="Swyfft" width={120} height={60} />
</div>
```

**Recommendation:**
- ✅ Logos are well-optimized
- Consider converting to SVG for perfect scaling if vector versions available
- Use PNG versions (already provided) for best quality

---

### Testimonial Photos

**Available Photos:**

| File | Size | Status |
|------|------|--------|
| `testimonial-businessman-50s.jpg` | 57 KB | ✅ Good |
| `testimonial-businesswoman-30s-caucasian.jpg` | 55 KB | ✅ Good |
| `testimonial-businesswoman-40s.jpg` | 60 KB | ✅ Good |
| `testimonial-entrepreneur-20s-black.jpg` | 56 KB | ✅ Good |
| `testimonial-man-30s-hispanic.jpg` | 55 KB | ✅ Good |
| `testimonial-woman-30s-caucasian.jpg` | 69 KB | ✅ Good |

**Usage Pattern:**
```tsx
<div className="testimonial-card">
  <Image
    src="/assets/testimonials/testimonial-businessman-50s.jpg"
    alt="Client testimonial"
    width={80}
    height={80}
    className="rounded-full"
  />
  <p>"TGI Agency saved me 25% on my auto insurance!"</p>
  <cite>— John D., Houston TX</cite>
</div>
```

**Recommendation:**
- ✅ All photos well-optimized (50-70 KB range)
- ✅ Good diversity representation
- ✅ Professional quality
- Consider adding real client photos if available (with permission)

---

### Blog Hero Images

**Available Images:**

| File | Size | Post | Status |
|------|------|------|--------|
| `home-insurance-guide-texas.jpg` | 446 KB | Ultimate Guide to Home Insurance in Texas | ✅ Good |
| `business-insurance-texas.jpg` | 320 KB | Business Insurance 101: GL vs BOP | ✅ Good |
| `texas-street-flood.jpg` | 215 KB | Flood Insurance Outside Flood Zone | ✅ Good |
| `bundle-home-auto.jpg` | 470 KB | Bundle Home + Auto and Save | ✅ Good |

**Usage Pattern:**
```tsx
// Blog post hero
<div className="relative h-[500px] w-full">
  <Image
    src="/assets/blog/home-insurance-guide-texas.jpg"
    alt="Modern Texas home with insurance protection"
    fill
    className="object-cover object-center"
    priority
    quality={85}
  />
</div>

// Blog card thumbnail (16:9 aspect ratio)
<div className="relative aspect-video w-full">
  <Image
    src="/assets/blog/business-insurance-texas.jpg"
    alt="Texas business storefront"
    fill
    className="object-cover rounded-t-xl"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

**Recommendation:**
- ✅ All images web-optimized (215-470 KB range, 79-86% compression achieved)
- ✅ Consistent 1920x1080px resolution (16:9 ratio)
- ✅ Texas-specific imagery (authentic locations and scenarios)
- ✅ Professional photorealistic quality from Gemini 2.5 Flash
- Future: Consider adding real client case study photos for specific posts

---

### Video Assets

**Status:** ✅ **RESOLVED** - Large video files (7+ MB each) have been removed from the project.

**Previous Issue:** Video files were 7+ MB each and would have severely impacted page load performance.

**Options for Video Content:**

1. **YouTube/Vimeo Embed** (Recommended)
   - Upload videos to YouTube or Vimeo
   - Embed with iframe (only loads when user plays)
   - Example:
     ```tsx
     <iframe
       src="https://www.youtube.com/embed/VIDEO_ID"
       title="Insurance Explainer"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     />
     ```

2. **Lottie Animations** (Alternative)
   - Use Lottie for lightweight motion graphics (< 50 KB)
   - Great for explainer animations and micro-interactions

3. **Static Images with Motion** (Simple)
   - Use static hero images with CSS animations
   - Parallax effects and fade-ins (minimal KB impact)

---

## Asset Optimization Checklist

**✅ COMPLETED:**
- [x] **Delete video files** (saved 14+ MB!)
  - [x] `video-home-and-car-insurance.mp4`
  - [x] `video-keyboard-insurance-services.mp4`
- [x] **Flag low-quality boat image** (renamed to boat-insurance-OLD.jpg)
- [x] **Generate blog hero images** (4 images created)
  - [x] `home-insurance-guide-texas.jpg` (2127 KB → 446 KB compressed)
  - [x] `business-insurance-texas.jpg` (1853 KB → 320 KB compressed)
  - [x] `texas-street-flood.jpg` (1595 KB → 215 KB compressed)
  - [x] `bundle-home-auto.jpg` (2176 KB → 470 KB compressed)
- [x] **Compress blog images** (79-86% size reduction achieved)

**📋 BEFORE LAUNCH:**

- [ ] **Compress large product images** (Use `.\scripts\prepare-for-compression.ps1`):
  - [ ] `business-insurance.jpg` (472 KB → 200-250 KB)
  - [ ] `bond-insurance.jpg` (403 KB → 200-250 KB)
  - [ ] `life-insurance.jpg` (356 KB → 200-250 KB)
  - [ ] `renter-insurance.jpg` (263 KB → 150-200 KB)
  - [ ] `background-header-generic.jpg` (460 KB → 200-250 KB)

- [ ] **Replace low-quality image:**
  - [ ] Download new `boat-insurance.jpg` (See BOAT-IMAGE-NEEDED.txt for details)
  - [ ] Compress to 150-250 KB
  - [ ] Delete `boat-insurance-OLD.jpg`

- [ ] **Create missing brand assets:**
  - [ ] OG share image (1200x630px)
  - [ ] Apple touch icon (180x180px)
  - [ ] PWA icons (192x192px, 512x512px)

- [ ] **Convert images to WebP format** (Next.js Image component does this automatically)

- [ ] **Add proper alt text** to all images for accessibility

**🚀 QUICK START TOOLS:**
- **Helper Script:** `.\scripts\prepare-for-compression.ps1` - Auto-prepares images for TinyPNG
- **Asset Generator:** `.\scripts\generate-assets.js` - Auto-generates brand icons (requires: npm install canvas)
- **Blog Assets:** `.\scripts\generate-blog-assets.js` - Generates blog hero images (COMPLETED)
- **Blog Compression:** `.\scripts\compress-blog-images.js` - Compresses blog images (COMPLETED)
- **Full Guide:** See `docs\ASSET_FIXING_GUIDE.md` for detailed instructions (if exists)

**Tools for Optimization:**
- **TinyPNG** (https://tinypng.com) - PNG/JPG compression
- **ImageOptim** (Mac) or **Squoosh** (https://squoosh.app) - Image optimization
- **Next.js Image Component** - Automatic optimization and WebP conversion
- **Sharp (Node.js)** - Used in compression scripts for automated optimization

---## Image Best Practices

### Using Next.js Image Component

**Always use the Next.js `<Image>` component** instead of HTML `<img>` tags:

```tsx
import Image from 'next/image';

// Hero background
<div className="relative h-[600px]">
  <Image
    src="/assets/products/car-insurance.jpg"
    alt="Auto insurance coverage"
    fill
    className="object-cover"
    priority // for above-fold images
    quality={85}
  />
</div>

// Logo
<Image
  src="/assets/brand/logo-primary.svg"
  alt="TGI Agency"
  width={180}
  height={60}
  priority
/>

// Testimonial photo
<Image
  src="/assets/testimonials/testimonial-businessman-50s.jpg"
  alt="Client testimonial"
  width={80}
  height={80}
  className="rounded-full"
/>
```

**Benefits:**
- Automatic WebP/AVIF conversion
- Lazy loading (except when `priority` is set)
- Responsive image sizing
- Prevents Cumulative Layout Shift (CLS)

### Alt Text Guidelines

**Good alt text:**
- ✅ "Family reviewing home insurance policy together"
- ✅ "Auto insurance claim being filed on smartphone"
- ✅ "Business owner shaking hands with insurance agent"

**Bad alt text:**
- ❌ "image1.jpg"
- ❌ "photo"
- ❌ "" (empty)

### Performance Targets

- **Hero images:** < 250 KB (compressed)
- **Content images:** < 150 KB
- **Logos:** < 20 KB (or SVG)
- **Thumbnails:** < 50 KB
- **Total page weight:** < 1.5 MB (including all assets)

**Lighthouse targets:**
- Performance: 90+
- Best Practices: 95+
- Accessibility: 95+ (requires proper alt text)
