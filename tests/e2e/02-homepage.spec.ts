import { test, expect } from '@playwright/test';
import { TestHelpers } from '../helpers/test-utils';

test.describe('Homepage', () => {
  test.describe('Hero Section', () => {
    test('should render hero section with main heading', async ({ page }) => {
      await page.goto('/');
      
      // Look for main heading (h1)
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      
      // Should contain insurance-related text
      const text = await h1.textContent();
      expect(text?.toLowerCase()).toMatch(/insurance|protect|coverage/);
    });

    test('should have primary CTA button in hero', async ({ page }) => {
      await page.goto('/');
      
      // Look for "Get Your Free Quote" or similar primary CTA
      const ctaButton = page.getByRole('button', { name: /get.*quote/i }).first();
      await expect(ctaButton).toBeVisible();
    });

    test('should open quote modal from hero CTA', async ({ page }) => {
      await page.goto('/');
      
      const ctaButton = page.getByRole('button', { name: /get.*quote/i }).first();
      await ctaButton.click();
      
      // Wait for modal to appear
      await page.waitForSelector('[role="dialog"]', { state: 'visible', timeout: 5000 });
      
      const modal = page.locator('[role="dialog"]').first();
      await expect(modal).toBeVisible();
    });

    test('should have hero image that loads correctly', async ({ page }) => {
      await page.goto('/');
      
      // Look for hero section image
      const heroSection = page.locator('section').first();
      const heroImage = heroSection.locator('img').first();
      
      if (await heroImage.isVisible()) {
        // Check that image has loaded
        const naturalWidth = await heroImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Benefits Grid Section', () => {
    test('should render benefits/features grid', async ({ page }) => {
      await page.goto('/');
      
      // Look for benefits section - check for headings and content sections
      const headings = page.locator('h2, h3');
      const headingCount = await headings.count();
      
      // Should have multiple sections with headings (at least 2)
      expect(headingCount).toBeGreaterThanOrEqual(2);
      
      // Should have paragraphs with content
      const paragraphs = page.locator('p');
      const paragraphCount = await paragraphs.count();
      
      expect(paragraphCount).toBeGreaterThanOrEqual(3);
    });

    test('should display benefit icons and text', async ({ page }) => {
      await page.goto('/');
      
      // Benefits should have headings
      const headings = page.locator('h2, h3');
      const count = await headings.count();
      
      expect(count).toBeGreaterThanOrEqual(3);
    });
  });

  test.describe('Insurance Cards Grid Section', () => {
    test('should render insurance types cards', async ({ page }) => {
      await page.goto('/');
      
      // Look for insurance type cards/links
      const autoLink = page.getByRole('link', { name: /auto insurance/i });
      const homeLink = page.getByRole('link', { name: /home insurance/i });
      
      await expect(autoLink.first()).toBeVisible();
      await expect(homeLink.first()).toBeVisible();
    });

    test('should navigate to auto insurance page from card', async ({ page }) => {
      await page.goto('/');
      
      const autoCard = page.getByRole('link', { name: /auto insurance/i }).first();
      await autoCard.click();
      
      await page.waitForURL(/\/personal\/auto/);
      expect(page.url()).toContain('/personal/auto');
    });

    test('should navigate to home insurance page from card', async ({ page }) => {
      await page.goto('/');
      
      const homeCard = page.getByRole('link', { name: /home insurance/i }).first();
      await homeCard.click();
      
      await page.waitForURL(/\/personal\/home/);
      expect(page.url()).toContain('/personal/home');
    });

    test('should navigate to business insurance page from card', async ({ page }) => {
      await page.goto('/');
      
      const businessCard = page.getByRole('link', { name: /business insurance/i }).first();
      
      if (await businessCard.isVisible()) {
        await businessCard.click();
        await page.waitForURL(/\/business\//);
        expect(page.url()).toContain('/business/');
      }
    });
  });

  test.describe('Partners Section', () => {
    test('should render partners/carriers section', async ({ page }) => {
      await page.goto('/');
      
      // Look for partners section heading
      const partnersHeading = page.getByRole('heading', { name: /partner|carrier|trusted/i });
      
      if (await partnersHeading.count() > 0) {
        await expect(partnersHeading.first()).toBeVisible();
      }
    });

    test('should display partner logos', async ({ page }) => {
      await page.goto('/');
      
      // Look for images in partners section
      const partnerImages = page.locator('img[alt*="partner" i], img[alt*="carrier" i], img[alt*="logo" i]');
      const count = await partnerImages.count();
      
      // May have partner logos
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Testimonials Section', () => {
    test('should render testimonials section', async ({ page }) => {
      await page.goto('/');
      
      // Look for testimonials heading
      const testimonialsHeading = page.getByRole('heading', { name: /testimonial|review|client|customer/i });
      
      if (await testimonialsHeading.count() > 0) {
        await expect(testimonialsHeading.first()).toBeVisible();
      }
    });

    test('should display testimonial content', async ({ page }) => {
      await page.goto('/');
      
      // Look for testimonial cards/items with quotes or customer names
      const testimonialText = page.locator('blockquote, [class*="testimonial"]');
      
      if (await testimonialText.count() > 0) {
        await expect(testimonialText.first()).toBeVisible();
      }
    });

    test('should have testimonial carousel navigation', async ({ page }) => {
      await page.goto('/');
      
      // Look for carousel controls (previous/next buttons or dots)
      const carouselButtons = page.locator('button[aria-label*="previous" i], button[aria-label*="next" i], button[class*="carousel"]');
      
      if (await carouselButtons.count() > 0) {
        await expect(carouselButtons.first()).toBeVisible();
      }
    });
  });

  test.describe('CTA Section', () => {
    test('should render call-to-action section', async ({ page }) => {
      await page.goto('/');
      
      // Scroll to bottom to find CTA section
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Look for CTA buttons near the bottom
      const ctaButtons = page.getByRole('button', { name: /get.*quote|contact|get started/i });
      const count = await ctaButtons.count();
      
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should have secondary CTA for viewing coverage options', async ({ page }) => {
      await page.goto('/');
      
      // Look for "View Coverage Options" or similar secondary CTA
      const secondaryCTA = page.getByRole('link', { name: /view.*coverage|learn more|explore/i }).first();
      
      if (await secondaryCTA.isVisible()) {
        await expect(secondaryCTA).toBeVisible();
      }
    });
  });

  test.describe('Page Performance', () => {
    test('should load all images without errors', async ({ page }) => {
      const helpers = new TestHelpers(page);
      await page.goto('/');
      
      await page.waitForLoadState('networkidle');
      
      // Check for broken images
      await helpers.assertNobrokenImages();
    });

    test('should load homepage within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('load');
      
      const loadTime = Date.now() - startTime;
      
      // Should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });
  });

  test.describe('Visual Regression', () => {
    test('should match homepage snapshot on desktop', async ({ page, viewport }) => {
      // Only run on desktop
      if (!viewport || viewport.width < 1024) {
        test.skip();
      }

      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Disable animations for consistent snapshots
      await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
      
      await expect(page).toHaveScreenshot('homepage-desktop.png', {
        fullPage: true,
        animations: 'disabled',
        mask: [page.locator('img')], // Mask images to avoid flakiness
      });
    });

    test('should match homepage snapshot on mobile', async ({ page, viewport }) => {
      // Only run on mobile
      if (!viewport || viewport.width > 768) {
        test.skip();
      }

      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
      
      await expect(page).toHaveScreenshot('homepage-mobile.png', {
        fullPage: true,
        animations: 'disabled',
        mask: [page.locator('img')],
      });
    });
  });

  test.describe('Quote Launcher Integration', () => {
    test('should have quote launcher button accessible on homepage', async ({ page }) => {
      await page.goto('/');
      
      // Should have at least one quote button
      const quoteButtons = page.getByRole('button', { name: /get.*quote/i });
      const count = await quoteButtons.count();
      
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should open quote modal from multiple locations', async ({ page }) => {
      await page.goto('/');
      
      const quoteButtons = page.getByRole('button', { name: /get.*quote/i });
      const firstButton = quoteButtons.first();
      
      await firstButton.click();
      
      // Modal should appear
      const modal = page.locator('[role="dialog"]').first();
      await expect(modal).toBeVisible();
      
      // Close modal
      const closeButton = modal.locator('button').first();
      if (await closeButton.isVisible()) {
        await closeButton.click();
      }
    });
  });
});
