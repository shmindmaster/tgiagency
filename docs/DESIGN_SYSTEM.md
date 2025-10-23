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