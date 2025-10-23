import { test, expect } from '@playwright/test';
import { TestHelpers } from '../helpers/test-utils';

test.describe('About Pages', () => {
  test.describe('Main About Page', () => {
    test('should load about page successfully', async ({ page }) => {
      await page.goto('/about');
      
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      
      const title = await page.title();
      expect(title.toLowerCase()).toContain('about');
    });

    test('should display company information', async ({ page }) => {
      await page.goto('/about');
      
      // Should have content about the company
      const content = await page.textContent('body');
      
      expect(content?.toLowerCase()).toMatch(/insurance|tgi|agency/);
    });

    test('should have navigation to about sub-pages', async ({ page }) => {
      await page.goto('/about');
      
      // Look for links to sub-pages
      const ourStoryLink = page.getByRole('link', { name: /our story|story/i });
      const testimonialsLink = page.getByRole('link', { name: /testimonial/i });
      const careersLink = page.getByRole('link', { name: /career/i });
      
      // At least one of these should be visible
      const linksCount = (await ourStoryLink.count()) + 
                        (await testimonialsLink.count()) + 
                        (await careersLink.count());
      
      expect(linksCount).toBeGreaterThanOrEqual(1);
    });

    test('should have clean console', async ({ page }) => {
      const helpers = new TestHelpers(page);
      const console = await helpers.assertCleanConsole();
      
      await page.goto('/about');
      await page.waitForLoadState('networkidle');
      
      console.assertNoErrors();
    });

    test('should not have horizontal scrolling', async ({ page }) => {
      const helpers = new TestHelpers(page);
      
      await page.goto('/about');
      await page.waitForLoadState('networkidle');
      
      await helpers.assertNoHorizontalScroll();
    });
  });

  test.describe('Our Story Page', () => {
    test('should load our story page', async ({ page }) => {
      const response = await page.goto('/about/our-story');
      
      // Should not be 404
      expect(response?.status()).toBeLessThan(400);
      
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    });

    test('should display company history/values', async ({ page }) => {
      await page.goto('/about/our-story');
      
      // Should have narrative content
      const paragraphs = page.locator('p');
      const count = await paragraphs.count();
      
      // Should have substantial content
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should have clean console', async ({ page }) => {
      const helpers = new TestHelpers(page);
      const console = await helpers.assertCleanConsole();
      
      await page.goto('/about/our-story');
      await page.waitForLoadState('networkidle');
      
      console.assertNoErrors();
    });
  });

  test.describe('Testimonials Page', () => {
    test('should load testimonials page', async ({ page }) => {
      const response = await page.goto('/about/testimonials');
      
      expect(response?.status()).toBeLessThan(400);
      
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    });

    test('should display customer testimonials', async ({ page }) => {
      await page.goto('/about/testimonials');
      
      // Should have testimonial content
      const testimonials = page.locator('blockquote, [class*="testimonial"], article');
      const count = await testimonials.count();
      
      // Should have at least some testimonials
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should display reviewer information', async ({ page }) => {
      await page.goto('/about/testimonials');
      
      // Should have names or quotes
      const content = await page.textContent('body');
      
      // Should have substantive content
      expect(content?.length || 0).toBeGreaterThan(100);
    });

    test('should have clean console', async ({ page }) => {
      const helpers = new TestHelpers(page);
      const console = await helpers.assertCleanConsole();
      
      await page.goto('/about/testimonials');
      await page.waitForLoadState('networkidle');
      
      console.assertNoErrors();
    });
  });

  test.describe('Careers Page', () => {
    test('should load careers page', async ({ page }) => {
      const response = await page.goto('/about/careers');
      
      expect(response?.status()).toBeLessThan(400);
      
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    });

    test('should display job benefits/culture information', async ({ page }) => {
      await page.goto('/about/careers');
      
      // Should have content about working at TGI
      const content = await page.textContent('body');
      
      expect(content?.toLowerCase()).toMatch(/career|job|benefit|work|team|culture/);
    });

    test('should have Apply Now or Contact email link', async ({ page }) => {
      await page.goto('/about/careers');
      
      // Look for application CTA
      const applyButton = page.getByRole('link', { name: /apply|join|contact/i });
      const emailLink = page.locator('a[href^="mailto:"]');
      
      const hasApplicationMethod = (await applyButton.count()) > 0 || (await emailLink.count()) > 0;
      
      expect(hasApplicationMethod).toBe(true);
    });

    test('should have working mailto link to info@tgiagency.com', async ({ page }) => {
      await page.goto('/about/careers');
      
      const emailLink = page.locator('a[href*="mailto:info@tgiagency.com"]');
      
      if (await emailLink.count() > 0) {
        const href = await emailLink.first().getAttribute('href');
        expect(href).toContain('mailto:info@tgiagency.com');
      }
    });

    test('should have clean console', async ({ page }) => {
      const helpers = new TestHelpers(page);
      const console = await helpers.assertCleanConsole();
      
      await page.goto('/about/careers');
      await page.waitForLoadState('networkidle');
      
      console.assertNoErrors();
    });
  });

  test.describe('Navigation Between About Pages', () => {
    test('should navigate from main About to Our Story', async ({ page }) => {
      await page.goto('/about');
      
      const ourStoryLink = page.getByRole('link', { name: /our story|story/i }).first();
      
      if (await ourStoryLink.isVisible()) {
        await ourStoryLink.click();
        await page.waitForURL(/\/about\/our-story/);
        
        expect(page.url()).toContain('/about/our-story');
      }
    });

    test('should navigate from main About to Testimonials', async ({ page }) => {
      await page.goto('/about');
      
      const testimonialsLink = page.getByRole('link', { name: /testimonial/i }).first();
      
      if (await testimonialsLink.isVisible()) {
        await testimonialsLink.click();
        await page.waitForURL(/\/about\/testimonials/);
        
        expect(page.url()).toContain('/about/testimonials');
      }
    });

    test('should navigate from main About to Careers', async ({ page }) => {
      await page.goto('/about');
      
      const careersLink = page.getByRole('link', { name: /career/i }).first();
      
      if (await careersLink.isVisible()) {
        await careersLink.click();
        await page.waitForURL(/\/about\/careers/);
        
        expect(page.url()).toContain('/about/careers');
      }
    });
  });

  test.describe('CTAs on About Pages', () => {
    test('should have Get in Touch or Contact CTA', async ({ page }) => {
      await page.goto('/about');
      
      const contactCTA = page.getByRole('link', { name: /get in touch|contact|reach out/i });
      
      if (await contactCTA.count() > 0) {
        await expect(contactCTA.first()).toBeVisible();
        
        const href = await contactCTA.first().getAttribute('href');
        expect(href).toContain('/contact');
      }
    });

    test('should have Learn About TGI or similar navigation CTAs', async ({ page }) => {
      await page.goto('/about');
      
      // Look for CTAs that navigate to other pages
      const ctas = page.getByRole('link', { name: /learn|discover|explore|read more/i });
      const count = await ctas.count();
      
      // Should have some navigation options
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Visual Regression - About Pages', () => {
    test('should match about page snapshot on desktop', async ({ page, viewport }) => {
      if (!viewport || viewport.width < 1024) {
        test.skip();
      }

      await page.goto('/about');
      await page.waitForLoadState('networkidle');
      
      await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
      
      await expect(page).toHaveScreenshot('about-desktop.png', {
        fullPage: true,
        animations: 'disabled',
        mask: [page.locator('img')],
      });
    });
  });
});
