# TGI Agency - Asset Integration Plan

**Version**: 1.0
**Date**: October 22, 2025
**Status**: Ready for Implementation

---

## Overview

This document provides a complete integration plan for all optimized assets into the TGI Agency website. All images have been analyzed, enhanced, and compressed for optimal web performance.

## Asset Directory Structure

```
assets/
├── blog/           # Blog hero images (4 files, 1.45 MB)
├── brand/          # Logos, icons, meta images (8 files, 532 KB)
├── general/        # Hero images, backgrounds (11 files, 1.3 MB)
├── partners/       # Insurance carrier logos (3 files, 31 KB)
├── products/       # Product category images (9 files, 1.5 MB)
└── testimonials/   # Authentic customer photos (6 files, 567 KB)

Total: 41 files, 6.9 MB (optimized)
```

---

## 1. Brand Assets Integration

### A. Meta Tags & SEO (HTML `<head>`)

```html
<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/icon-favicon.png">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/assets/brand/apple-touch-icon.png">

<!-- PWA Icons -->
<link rel="manifest" href="/manifest.json">

<!-- Open Graph (Social Media Sharing) -->
<meta property="og:image" content="/assets/brand/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="TGI Agency - Texas Insurance Experts">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="/assets/brand/og-image.png">

<!-- Primary Logo -->
<meta itemprop="logo" content="/assets/brand/logo.png">
```

### B. Web App Manifest (`manifest.json`)

```json
{
  "name": "TGI Agency - Texas Insurance Experts",
  "short_name": "TGI Agency",
  "description": "Comprehensive insurance coverage for Texas families and businesses",
  "icons": [
    {
      "src": "/assets/brand/pwa-icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/brand/pwa-icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#002244",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

### C. Logo Usage

| Location | File | Usage |
|----------|------|-------|
| Header (Desktop) | `logo-primary.svg` | Main navigation logo (scalable) |
| Header (Mobile) | `logo.png` | Simplified logo for mobile |
| Footer | `logo-footer.png` | Footer branding |
| Email Signatures | `logo.png` | Small size, optimized |

**Implementation Example:**

```html
<!-- Header Logo -->
<header>
  <a href="/" class="logo">
    <img src="/assets/brand/logo-primary.svg"
         alt="TGI Agency - Texas Insurance Experts"
         width="200"
         height="60">
  </a>
</header>

<!-- Footer Logo -->
<footer>
  <img src="/assets/brand/logo-footer.png"
       alt="TGI Agency"
       width="150"
       height="45"
       loading="lazy">
</footer>
```

---

## 2. Page-Specific Asset Integration

### A. Home Page (`content/pages/home.md`)

#### Hero Section

```markdown
---
hero:
  image: /assets/general/hero-business-people.jpg
  alt: Professional insurance agent serving Texas families
  title: Texas-Sized Protection, Personalized Service
---
```

**HTML Implementation:**

```html
<section class="hero">
  <picture>
    <source media="(max-width: 768px)"
            srcset="/assets/general/hero-business-people.jpg?w=768">
    <source media="(max-width: 1920px)"
            srcset="/assets/general/hero-business-people.jpg?w=1920">
    <img src="/assets/general/hero-business-people.jpg"
         alt="Professional insurance agent serving Texas families"
         width="1920"
         height="1080"
         loading="eager"
         fetchpriority="high">
  </picture>
  <div class="hero-content">
    <h1>Texas-Sized Protection, Personalized Service</h1>
    <!-- ... -->
  </div>
</section>
```

#### Services Grid (Home Page)

| Service | Image | Alt Text |
|---------|-------|----------|
| Automobile Insurance | `/assets/products/car-insurance.jpg` | Family protected by comprehensive auto insurance |
| Boat Insurance | `/assets/products/boat-insurance.jpg` | Luxury boat on Texas waters |
| Bonds (Surety) | `/assets/products/bond-insurance.jpg` | Construction site with surety bond protection |
| Business Insurance | `/assets/products/business-insurance.jpg` | Texas business owners with comprehensive coverage |
| Flood Insurance | `/assets/products/flood-insurance.jpg` | Home protected from flood damage |
| Home Insurance | `/assets/products/home-insurance.jpg` | Texas family home with insurance protection |
| Landlord Insurance | `/assets/products/landlord-insurance.jpg` | Rental property investment protection |
| Renters Insurance | `/assets/products/renter-insurance.jpg` | Young family in rental home |
| Life Insurance | `/assets/products/life-insurance.jpg` | Family financial security and protection |

**Implementation Example:**

```html
<div class="services-grid">
  <article class="service-card">
    <img src="/assets/products/car-insurance.jpg"
         alt="Family protected by comprehensive auto insurance"
         width="600"
         height="400"
         loading="lazy">
    <h3>Automobile Insurance</h3>
    <p>Coverage That Keeps You Moving.</p>
    <a href="/auto-insurance" class="cta">Learn More</a>
  </article>

  <!-- Repeat for each service -->
</div>
```

### B. Product Detail Pages

Each product page should use its dedicated hero image:

| Page | Hero Image | Background Image |
|------|-----------|------------------|
| `/personal/auto-insurance` | `products/car-insurance.jpg` | `general/hand-holding-car-key.jpg` |
| `/personal/boat-watercraft-insurance` | `products/boat-insurance.jpg` | N/A |
| `/business/bonds-surety` | `products/bond-insurance.jpg` | `general/businessman-motor-show.jpg` |
| `/business/business-insurance` | `products/business-insurance.jpg` | `general/insurance-brokers.jpg` |
| `/personal/flood-insurance` | `products/flood-insurance.jpg` | `general/background-insurance-services.jpg` |
| `/personal/home-insurance` | `products/home-insurance.jpg` | `general/background-insurance-hands.jpg` |
| `/business/landlord-property-insurance` | `products/landlord-insurance.jpg` | `general/background-policy-header.jpg` |
| `/personal/renters-insurance` | `products/renter-insurance.jpg` | N/A |
| `/personal/life-insurance` | `products/life-insurance.jpg` | N/A |

**Template Structure:**

```html
<!-- Product Detail Page Template -->
<article class="product-page">
  <!-- Hero Banner -->
  <section class="product-hero">
    <img src="/assets/products/[PRODUCT]-insurance.jpg"
         alt="[Product] insurance coverage in Texas"
         width="1920"
         height="600"
         loading="eager">
    <div class="hero-overlay">
      <h1>[Product] Insurance</h1>
      <p class="subtitle">[Headline]</p>
    </div>
  </section>

  <!-- Content Section -->
  <section class="product-content">
    <!-- Product details here -->
  </section>

  <!-- Background Section (if applicable) -->
  <section class="cta-section"
           style="background-image: url('/assets/general/[BACKGROUND].jpg')">
    <div class="cta-overlay">
      <h2>Ready to Get Protected?</h2>
      <a href="/contact" class="btn-primary">Get Your Free Quote</a>
    </div>
  </section>
</article>
```

### C. About Pages

#### Our Story (`content/about/our-story.md`)

```html
<section class="about-hero">
  <img src="/assets/general/insurance-agent-hands.jpg"
       alt="TGI Agency insurance professionals helping customers"
       width="1920"
       height="800"
       loading="eager">
</section>

<section class="our-mission">
  <img src="/assets/general/background-agent-contract.jpg"
       alt="Insurance agent explaining policy to Texas family"
       width="800"
       height="600"
       loading="lazy">
  <!-- Content -->
</section>
```

#### Testimonials (`content/about/testimonials.md`)

```html
<div class="testimonials-grid">
  <article class="testimonial">
    <img src="/assets/testimonials/testimonial-businessman-50s.jpg"
         alt="Business owner testimonial"
         width="150"
         height="150"
         loading="lazy"
         class="testimonial-avatar">
    <blockquote>
      <p>"TGI Agency provided exactly the coverage my business needed..."</p>
      <cite>John D., Business Owner</cite>
    </blockquote>
  </article>

  <article class="testimonial">
    <img src="/assets/testimonials/testimonial-businesswoman-30s-caucasian.jpg"
         alt="Professional woman testimonial"
         width="150"
         height="150"
         loading="lazy"
         class="testimonial-avatar">
    <blockquote>
      <p>"Outstanding service and personalized attention..."</p>
      <cite>Sarah M., Homeowner</cite>
    </blockquote>
  </article>

  <!-- 6 total testimonials available -->
</div>
```

**Available Testimonial Images:**
- `testimonial-businessman-50s.jpg` - Mature business professional
- `testimonial-businesswoman-30s-caucasian.jpg` - Professional woman
- `testimonial-businesswoman-40s.jpg` - Senior businesswoman
- `testimonial-entrepreneur-20s-black.jpg` - Young entrepreneur
- `testimonial-man-30s-hispanic.jpg` - Hispanic professional
- `testimonial-woman-30s-caucasian.jpg` - Young professional woman

#### Careers (`content/about/careers.md`)

```html
<section class="careers-hero">
  <img src="/assets/general/hero-business-people.jpg"
       alt="Join the TGI Agency team"
       width="1920"
       height="600"
       loading="eager">
</section>
```

### D. Contact Page (`content/pages/contact.md`)

```html
<section class="contact-hero">
  <img src="/assets/general/background-header-generic.jpg"
       alt="TGI Agency Sugar Land, Texas office"
       width="1920"
       height="400"
       loading="eager">
</section>

<section class="contact-cta">
  <img src="/assets/general/insurance-agent-hands.jpg"
       alt="Insurance agent ready to help"
       width="600"
       height="400"
       loading="lazy">
</section>
```

### E. 404 Error Page

```html
<section class="error-404">
  <img src="/assets/general/misc-404-not-found.jpg"
       alt="Page not found - TGI Agency"
       width="800"
       height="600"
       loading="eager">
  <h1>Oops! Page Not Found</h1>
  <p>Let's get you back to safety.</p>
  <a href="/" class="btn-primary">Return Home</a>
</section>
```

---

## 3. Partner Logos Integration

### Trust Bar / Partners Section

```html
<section class="partners">
  <h2>Trusted Insurance Carriers</h2>
  <div class="partner-logos">
    <img src="/assets/partners/logo-farmers.png"
         alt="Farmers Insurance Partner"
         width="120"
         height="60"
         loading="lazy">

    <img src="/assets/partners/logo-american-risk.png"
         alt="American Risk Underwriters Partner"
         width="120"
         height="60"
         loading="lazy">

    <img src="/assets/partners/logo-swyfft.png"
         alt="Swyfft Insurance Partner"
         width="120"
         height="60"
         loading="lazy">
  </div>
</section>
```

---

## 4. Performance Optimization Guidelines

### A. Image Loading Strategy

**Priority Loading:**
```html
<!-- Critical above-the-fold images -->
<img loading="eager" fetchpriority="high">

<!-- Below-the-fold images -->
<img loading="lazy">
```

**Recommended Loading:**
- Hero images: `loading="eager" fetchpriority="high"`
- Service cards (visible): `loading="eager"`
- Service cards (below fold): `loading="lazy"`
- Testimonial avatars: `loading="lazy"`
- Footer logo: `loading="lazy"`
- Partner logos: `loading="lazy"`

### B. Responsive Images

Use `<picture>` element for hero images:

```html
<picture>
  <source media="(max-width: 640px)"
          srcset="/assets/general/hero-business-people.jpg?w=640 640w">
  <source media="(max-width: 1024px)"
          srcset="/assets/general/hero-business-people.jpg?w=1024 1024w">
  <source media="(max-width: 1920px)"
          srcset="/assets/general/hero-business-people.jpg?w=1920 1920w">
  <img src="/assets/general/hero-business-people.jpg"
       alt="Professional insurance agent"
       width="1920"
       height="1080">
</picture>
```

### C. Image Optimization Checklist

- ✅ All images compressed (average 90% reduction)
- ✅ Appropriate `width` and `height` attributes (prevent layout shift)
- ✅ Descriptive `alt` text (SEO and accessibility)
- ✅ Lazy loading for below-fold images
- ✅ Eager loading for critical images
- ✅ Responsive srcset for different screen sizes

---

## 5. CSS Background Images

For decorative background images:

```css
/* Hero Section */
.hero {
  background-image: url('/assets/general/hero-business-people.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* CTA Sections */
.cta-auto {
  background-image: url('/assets/general/hand-holding-car-key.jpg');
}

.cta-business {
  background-image: url('/assets/general/businessman-motor-show.jpg');
}

.cta-general {
  background-image: url('/assets/general/background-insurance-services.jpg');
}

/* Responsive Background Images */
@media (max-width: 768px) {
  .hero {
    background-image: url('/assets/general/hero-business-people.jpg?w=768');
  }
}
```

---

## 6. Content Frontmatter Integration

Update markdown files with image references:

```yaml
---
title: Auto Insurance
slug: auto-insurance
hero_image: /assets/products/car-insurance.jpg
hero_alt: Comprehensive auto insurance coverage in Texas
background_image: /assets/general/hand-holding-car-key.jpg
seo:
  og_image: /assets/products/car-insurance.jpg
  twitter_image: /assets/products/car-insurance.jpg
---
```

---

## 7. Implementation Checklist

### Phase 1: Brand & Meta (Priority: High)
- [ ] Add favicon to HTML `<head>`
- [ ] Add Apple Touch Icon
- [ ] Configure Open Graph tags
- [ ] Create and link `manifest.json`
- [ ] Add PWA icons to manifest
- [ ] Update header logo
- [ ] Update footer logo

### Phase 2: Home Page (Priority: High)
- [ ] Add hero image with proper loading
- [ ] Add service card images (9 products)
- [ ] Add partner logos section
- [ ] Implement responsive images
- [ ] Test loading performance

### Phase 3: Product Pages (Priority: Medium)
- [ ] Auto insurance page hero + background
- [ ] Boat insurance page hero
- [ ] Bond insurance page hero + background
- [ ] Business insurance page hero + background
- [ ] Flood insurance page hero + background
- [ ] Home insurance page hero + background
- [ ] Landlord insurance page hero + background
- [ ] Renters insurance page hero
- [ ] Life insurance page hero

### Phase 4: About Pages (Priority: Medium)
- [ ] Our Story page images
- [ ] Testimonials page (6 customer photos)
- [ ] Careers page hero

### Phase 5: Other Pages (Priority: Low)
- [ ] Contact page hero + background
- [ ] 404 error page image
- [ ] Privacy policy header (if needed)
- [ ] Terms page header (if needed)

### Phase 6: Testing & Optimization (Priority: High)
- [ ] Test all images load correctly
- [ ] Verify alt text for accessibility
- [ ] Test responsive images on mobile
- [ ] Check page load performance (Lighthouse)
- [ ] Verify Open Graph preview on social media
- [ ] Test PWA installation
- [ ] Validate SEO meta tags

---

## 8. Asset Naming Convention Reference

All assets follow a clear naming convention:

| Pattern | Example | Usage |
|---------|---------|-------|
| `[product]-insurance.jpg` | `car-insurance.jpg` | Product hero images |
| `background-[context].jpg` | `background-agent-contract.jpg` | Background images |
| `hero-[context].jpg` | `hero-business-people.jpg` | Hero section images |
| `logo-[variant].png` | `logo-footer.png` | Logo variations |
| `testimonial-[demographic].jpg` | `testimonial-businessman-50s.jpg` | Testimonial photos |

---

## 9. Quick Reference: Asset Usage Map

```
Homepage
├── Hero: hero-business-people.jpg
├── Auto: car-insurance.jpg
├── Boat: boat-insurance.jpg
├── Bond: bond-insurance.jpg
├── Business: business-insurance.jpg
├── Flood: flood-insurance.jpg
├── Home: home-insurance.jpg
├── Landlord: landlord-insurance.jpg
├── Renters: renter-insurance.jpg
├── Life: life-insurance.jpg
└── Partners: logo-farmers.png, logo-american-risk.png, logo-swyfft.png

Product Pages
├── Auto: car-insurance.jpg → hand-holding-car-key.jpg
├── Boat: boat-insurance.jpg
├── Bond: bond-insurance.jpg → businessman-motor-show.jpg
├── Business: business-insurance.jpg → insurance-brokers.jpg
├── Flood: flood-insurance.jpg → background-insurance-services.jpg
├── Home: home-insurance.jpg → background-insurance-hands.jpg
├── Landlord: landlord-insurance.jpg → background-policy-header.jpg
├── Renters: renter-insurance.jpg
└── Life: life-insurance.jpg

About Pages
├── Our Story: insurance-agent-hands.jpg, background-agent-contract.jpg
├── Testimonials: All 6 testimonial-*.jpg files
└── Careers: hero-business-people.jpg

Other Pages
├── Contact: background-header-generic.jpg, insurance-agent-hands.jpg
└── 404: misc-404-not-found.jpg
```

---

## 10. Next Steps

1. **Immediate**: Implement Phase 1 (Brand & Meta)
2. **This Week**: Complete Phase 2 (Home Page)
3. **Next Week**: Finish Phase 3 (Product Pages)
4. **Following Week**: Complete Phases 4-5
5. **Final**: Phase 6 Testing & Optimization

---

## 8. Blog/Resources Section Integration

### A. Blog Index Page (`/resources`)

All blog posts with hero images, excerpts, and read more links.

**Implementation:**

```html
<article class="blog-card">
  <a href="/resources/ultimate-guide-home-insurance-texas">
    <img src="/assets/blog/home-insurance-guide-texas.jpg"
         alt="Texas brick home under a big sky with storm clouds"
         width="1920"
         height="1080"
         loading="lazy">
  </a>
  <div class="card-content">
    <span class="category">Personal Insurance</span>
    <h3>
      <a href="/resources/ultimate-guide-home-insurance-texas">
        The Ultimate Guide to Home Insurance in Texas (2025)
      </a>
    </h3>
    <p>Everything Texas homeowners need to know about HO-3 vs HO-5, TWIA windstorm, deductibles, exclusions, and how to save—without risking underinsurance.</p>
    <div class="meta">
      <time datetime="2025-10-22">October 22, 2025</time>
      <span class="read-time">12 min read</span>
    </div>
    <a href="/resources/ultimate-guide-home-insurance-texas" class="btn-read-more">
      Read More →
    </a>
  </div>
</article>
```

### B. Individual Blog Posts

**Blog Post Assets:**

| File | Post | Alt Text | Dimensions | Size |
|------|------|----------|------------|------|
| `home-insurance-guide-texas.jpg` | Ultimate Guide to Home Insurance | Texas brick home under storm clouds | 1920x1080 | 446 KB |
| `business-insurance-texas.jpg` | Business Insurance 101 | Texas small business storefront with Open sign | 1920x1080 | 320 KB |
| `texas-street-flood.jpg` | Flood Insurance Guide | Texas neighborhood street with flood water | 1920x1080 | 215 KB |
| `bundle-home-auto.jpg` | Bundle Home + Auto Guide | Family car in driveway of Texas home | 1920x1080 | 470 KB |

**Blog Post Hero Implementation:**

```html
<article class="blog-post">
  <header class="post-header">
    <div class="post-meta">
      <span class="category">Personal Insurance</span>
      <time datetime="2025-10-22">October 22, 2025</time>
      <span class="read-time">12 min read</span>
    </div>

    <h1>The Ultimate Guide to Home Insurance in Texas (2025)</h1>

    <img src="/assets/blog/home-insurance-guide-texas.jpg"
         alt="Texas brick home under a big sky with storm clouds"
         width="1920"
         height="1080"
         class="post-hero"
         loading="eager"
         fetchpriority="high">
  </header>

  <div class="post-content">
    <!-- Blog content here -->
  </div>

  <footer class="post-footer">
    <div class="cta-box">
      <h3>Ready to protect what matters most?</h3>
      <p>Get your free quote today</p>
      <a href="/contact" class="btn-primary">Get Your Free Quote</a>
      <p class="phone">Or call <a href="tel:+12814944990">(281) 494-4990</a></p>
    </div>
  </footer>
</article>
```

### C. Blog SEO & Schema

**Meta Tags for Blog Posts:**

```html
<!-- Example: Home Insurance Guide -->
<head>
  <title>The Ultimate Guide to Home Insurance in Texas (2025) | TGI Agency</title>
  <meta name="description" content="Everything Texas homeowners need to know about HO-3 vs HO-5, TWIA windstorm, deductibles, exclusions, and how to save—without risking underinsurance.">

  <!-- Open Graph -->
  <meta property="og:title" content="The Ultimate Guide to Home Insurance in Texas (2025)">
  <meta property="og:description" content="Everything Texas homeowners need to know about HO-3 vs HO-5, TWIA windstorm, deductibles, and how to save.">
  <meta property="og:image" content="/assets/blog/home-insurance-guide-texas.jpg">
  <meta property="og:type" content="article">
  <meta property="article:published_time" content="2025-10-22">
  <meta property="article:author" content="TGI Agency Team">

  <!-- Schema.org Article Markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "The Ultimate Guide to Home Insurance in Texas (2025 Update)",
    "image": "/assets/blog/home-insurance-guide-texas.jpg",
    "datePublished": "2025-10-22",
    "dateModified": "2025-10-22",
    "author": {
      "@type": "Organization",
      "name": "TGI Agency Team",
      "url": "https://tgiagency.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TGI Agency",
      "logo": {
        "@type": "ImageObject",
        "url": "/assets/brand/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "/resources/ultimate-guide-home-insurance-texas"
    },
    "description": "Everything Texas homeowners need to know about HO-3 vs HO-5, TWIA windstorm, deductibles, exclusions, and how to save—without risking underinsurance."
  }
  </script>
</head>
```

### D. Blog Navigation & Related Posts

```html
<!-- Related Posts Section -->
<section class="related-posts">
  <h2>Related Articles</h2>
  <div class="related-grid">
    <article class="related-card">
      <img src="/assets/blog/texas-street-flood.jpg"
           alt="Texas neighborhood street with flood water"
           width="400"
           height="225"
           loading="lazy">
      <h3>Do I Need Flood Insurance Outside a Flood Zone?</h3>
      <a href="/resources/flood-insurance-outside-flood-zone">Read More →</a>
    </article>

    <article class="related-card">
      <img src="/assets/blog/bundle-home-auto.jpg"
           alt="Family car in driveway of Texas home"
           width="400"
           height="225"
           loading="lazy">
      <h3>How to Bundle Home + Auto and Actually Save</h3>
      <a href="/resources/bundle-home-auto-insurance-save-money">Read More →</a>
    </article>
  </div>
</section>
```

### E. Blog Content Files

**Created Blog Posts:**

1. **`content/blogs/01-home-insurance-texas-guide.md`**
   - 3,500+ words comprehensive guide
   - Covers HO-3 vs HO-5, TWIA, flood, RCV vs ACV
   - Texas-specific considerations and examples

2. **`content/blogs/02-business-insurance-gl-bop-workers-comp.md`**
   - 2,500+ words business insurance guide
   - GL vs BOP comparison, Workers' Comp in Texas
   - Side-by-side coverage comparison table

3. **`content/blogs/03-flood-insurance-outside-flood-zone.md`**
   - 2,000+ words flood insurance guide
   - FEMA zones, Houston Harvey examples
   - 30-day waiting period warnings

4. **`content/blogs/04-bundle-home-auto-save-money.md`**
   - 1,800+ words bundling strategy guide
   - TCO calculations, when NOT to bundle
   - Multi-policy discount analysis

---
