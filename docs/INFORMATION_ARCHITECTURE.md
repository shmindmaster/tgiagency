# 🗺️ Website Navigation (Final Information Architecture)

This streamlined structure is optimized for user experience and reflects the unified quote form approach.

## Main Navigation (Header)

- **Home** (`href="/"`)
- **Insurance** (Mega-menu dropdown)
  - **Personal Insurance** (Sub-heading)
    - Auto Insurance (`href="/personal/auto-insurance"`)
    - Homeowners Insurance (`href="/personal/home-insurance"`)
    - Renters Insurance (`href="/personal/renters-insurance"`)
    - Life Insurance (`href="/personal/life-insurance"`)
    - Boat & Watercraft (`href="/personal/boat-watercraft-insurance"`)
    - Flood Insurance (`href="/personal/flood-insurance"`)
  - **Business Insurance** (Sub-heading)
    - Business Insurance Overview (`href="/business/business-insurance"`)
      - General Liability & BOP (anchor sections on same page)
      - Workers' Compensation (anchor section on same page)
      - Commercial Auto (anchor section on same page, or separate page later if needed)
    - Landlord & Property Insurance (`href="/business/landlord-property-insurance"`)
    - Bonds (Surety) (`href="/business/bonds-surety"`)
- **About Us** (Dropdown or direct link to `/about`)
  - Our Story (`href="/about/our-story"`)
  - Testimonials (`href="/about/testimonials"`)
  - Careers (`href="/about/careers"`)
- **Resources** (`href="/resources"`)
  - Blog/Insurance Guides (list of all posts)
  - Featured Posts:
    - The Ultimate Guide to Home Insurance in Texas
    - Business Insurance 101: GL vs BOP vs Workers' Comp
    - Do I Need Flood Insurance Outside a Flood Zone?
    - How to Bundle Home + Auto and Actually Save
  - Category filters: Personal Insurance, Business Insurance, Cost Savings
- **[Contact]** (Button in header - `href="/contact"`)
- **[Get a Free Quote]** (Primary CTA button - opens unified Quote form modal site-wide)

**Note:** All "Get a Quote" CTAs throughout the site trigger the unified Quote form modal. No separate form pages exist.

## Footer Navigation

- **Quick Links**
  - Home (`href="/"`)
  - About Us (`href="/about/our-story"`)
  - Contact (`href="/contact"`)
  - Blog (`href="/resources"`)
- **Support**
  - Make a Payment
  - Update Your Policy
  - File a Claim
- **Legal**
  - Privacy Policy (`href="/privacy-policy"`)
  - Terms & Conditions
- **Contact Info**
  - 132 Eldridge Rd, Suite C, Sugar Land, TX 77478
  - +1 (281) 494-4990
  - info@tgiagency.com
  - (Social Media Icons: Facebook, LinkedIn, etc.)

## URL Structure

- **Homepage:** `/`
- **Personal Insurance Pages:** `/personal/[slug]`
  - `/personal/auto-insurance`
  - `/personal/home-insurance`
  - `/personal/renters-insurance`
  - `/personal/life-insurance`
  - `/personal/boat-watercraft-insurance`
  - `/personal/flood-insurance`
- **Business Insurance Pages:** `/business/[slug]`
  - `/business/business-insurance` (overview with sections for GL, BOP, Workers' Comp, Commercial Auto)
  - `/business/landlord-property-insurance`
  - `/business/bonds-surety`
- **About Pages:** `/about/[slug]`
  - `/about/our-story`
  - `/about/testimonials`
  - `/about/careers`
- **Static Pages:**
  - `/contact`
  - `/privacy-policy`
  - `/resources` (blog listing page with 4 posts)
  - `/resources/[post-slug]` (individual blog posts)
    - `/resources/ultimate-guide-home-insurance-texas`
    - `/resources/business-insurance-101-gl-bop-workers-comp`
    - `/resources/flood-insurance-outside-flood-zone`
    - `/resources/bundle-home-auto-insurance-save-money`

## Quote Form Strategy

**Unified Dynamic Quote Form:**
- All "Get a Quote" CTAs open a single multi-step modal
- Step 1: Product selection (Auto, Home, Renters, Life, Boat, Flood, Business types)
- Steps 2-N: Conditional fields based on selected product
- Final step: Review and submit
- No separate form pages needed
- Form component lives in `components/quote/`

---

## Resources/Blog Content Strategy

### Published Blog Posts (4)

#### 1. The Ultimate Guide to Home Insurance in Texas (2025)
- **URL**: `/resources/ultimate-guide-home-insurance-texas`
- **Category**: Personal Insurance
- **Word Count**: 3,500+
- **Hero Image**: `/assets/blog/home-insurance-guide-texas.jpg` (446 KB)
- **Key Topics**:
  - HO-3 vs HO-5 policy types
  - Texas Wind & Hail (TWIA) requirements
  - Foundation/slab issues (HO 04 68 endorsement)
  - Flood insurance (separate policy)
  - RCV vs ACV coverage
  - Deductible strategies
  - Claims process in Texas
- **Target Keywords**: Texas home insurance, HO-3 vs HO-5, TWIA windstorm, homeowners insurance Texas, RCV vs ACV
- **Internal Links**: Home Insurance product page, Flood Insurance product page, Contact page
- **External Citations**: TWIA, Texas Department of Insurance, FEMA, Forbes, Insure.com

#### 2. Business Insurance 101: GL vs BOP vs Workers' Comp (Texas Guide)
- **URL**: `/resources/business-insurance-101-gl-bop-workers-comp`
- **Category**: Business Insurance
- **Word Count**: 2,500+
- **Hero Image**: `/assets/blog/business-insurance-texas.jpg` (320 KB)
- **Key Topics**:
  - General Liability coverage explained
  - Business Owners Policy (BOP) bundling
  - Workers' Compensation in Texas (optional for most private employers)
  - Side-by-side coverage comparison table
  - Bundling strategies
  - Cost drivers and real-world examples
- **Target Keywords**: Texas business insurance, GL vs BOP, workers comp Texas, business liability insurance, commercial insurance Texas
- **Internal Links**: Business Insurance product page, Contact page
- **External Citations**: Texas Department of Insurance, III, Insurance.com, The Hartford, Investopedia

#### 3. Do I Need Flood Insurance If I'm Not in a Flood Zone? (Texas Edition)
- **URL**: `/resources/flood-insurance-outside-flood-zone`
- **Category**: Personal Insurance
- **Word Count**: 2,000+
- **Hero Image**: `/assets/blog/texas-street-flood.jpg` (215 KB)
- **Key Topics**:
  - FEMA flood zones explained
  - Hurricane Harvey case study (75% outside flood zones)
  - NFIP 30-day waiting period
  - Cost-benefit analysis
  - Building vs Contents coverage
  - Private flood insurance alternatives
- **Target Keywords**: flood insurance Texas, NFIP outside flood zone, Texas flood zones, Houston flooding, flood insurance cost
- **Internal Links**: Flood Insurance product page, Home Insurance product page, Contact page
- **External Citations**: FEMA, Houston Chronicle, AP News, Floodsmart

#### 4. How to Bundle Home + Auto and Actually Save (Texas 2025)
- **URL**: `/resources/bundle-home-auto-insurance-save-money`
- **Category**: Cost Savings
- **Word Count**: 1,800+
- **Hero Image**: `/assets/blog/bundle-home-auto.jpg` (470 KB)
- **Key Topics**:
  - Average savings (~15%, around $700/year)
  - Benefits beyond savings (simplified claims, combined deductibles)
  - When bundling makes sense vs when it doesn't
  - TCO (Total Cost of Ownership) analysis
  - Multi-policy discount strategies
  - Annual re-shopping recommendations
- **Target Keywords**: bundle home auto Texas, multi-policy discount, home auto insurance savings, insurance bundling Texas
- **Internal Links**: Home Insurance product page, Auto Insurance product page, Contact page
- **External Citations**: Insure.com, Insurance.com, NAIC

### Blog Listing Page Features

**Filters & Categories:**
- All Posts (default)
- Personal Insurance (3 posts)
- Business Insurance (1 post)
- Cost Savings (1 post)

**Post Card Components:**
- Hero image (landscape 16:9)
- Category tag
- Post title (H3)
- Excerpt (2-3 sentences)
- Meta: Date, Read time
- "Read More →" CTA button

**SEO Optimization:**
- Meta title: "Insurance Resources & Guides | TGI Agency Texas"
- Meta description: "Expert insurance guides for Texas families and businesses. Learn about home, auto, flood, and business insurance from local experts."
- H1: "Insurance Resources & Guides for Texas"
- Schema: CollectionPage markup

### Individual Blog Post Template

**Components:**
1. **Post Header**
   - Hero image (1920x1080, loading="eager")
   - Category badge
   - Publication date
   - Read time estimate
   - H1 title

2. **Post Content**
   - Structured with H2/H3 headings
   - Bulleted lists for key points
   - Blockquotes for important callouts
   - Tables for comparisons (e.g., GL vs BOP)
   - Internal links to relevant product pages
   - External citations with proper attribution

3. **Post Footer**
   - CTA box: "Get Your Free Quote"
   - Phone number CTA: (281) 494-4990
   - Related posts (2-3 cards)

4. **Schema Markup**
   - Article schema (JSON-LD)
   - Author: Organization (TGI Agency Team)
   - Publisher logo
   - Main entity of page
   - Date published/modified

### Content Maintenance

- **Review Cycle**: Quarterly updates for regulatory changes
- **Evergreen Focus**: Guides remain relevant across years (2025 date stamps indicate freshness)
- **Expansion Plan**: Add 1-2 posts per quarter on trending topics
- **Performance Metrics**: Track bounce rate, time on page, quote form conversions from blog

---
