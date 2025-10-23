import { test, expect } from '@playwright/test';
import { TestHelpers, testData } from '../helpers/test-utils';

test.describe('Insurance Pages', () => {
  test.describe('Personal Insurance Pages', () => {
    const personalSlugs = testData.insuranceTypes.personal;

    for (const slug of personalSlugs) {
      test.describe(`Personal Insurance - ${slug}`, () => {
        test(`should load /personal/${slug} page`, async ({ page }) => {
          await page.goto(`/personal/${slug}`);
          
          // Should not be 404
          await expect(page.locator('h1')).not.toContainText('404');
          await expect(page.locator('h1')).not.toContainText('Not Found');
        });

        test(`should display correct title for ${slug} insurance`, async ({ page }) => {
          await page.goto(`/personal/${slug}`);
          
          // Title should contain the insurance type
          const title = await page.title();
          expect(title.toLowerCase()).toContain(slug);
        });

        test(`should have main heading with ${slug} in it`, async ({ page }) => {
          await page.goto(`/personal/${slug}`);
          
          const h1 = page.locator('h1').first();
          await expect(h1).toBeVisible();
          
          const text = await h1.textContent();
          expect(text?.toLowerCase()).toMatch(new RegExp(slug, 'i'));
        });

        test(`should display benefits/features for ${slug} insurance`, async ({ page }) => {
          await page.goto(`/personal/${slug}`);
          
          // Look for benefit items or list
          const benefits = page.locator('li, article, [class*="benefit"], [class*="feature"]');
          const count = await benefits.count();
          
          // Should have at least 3 benefits/features
          expect(count).toBeGreaterThanOrEqual(3);
        });

        test(`should have Get Quote button on ${slug} page`, async ({ page }) => {
          await page.goto(`/personal/${slug}`);
          
          const quoteButton = page.getByRole('button', { name: /get.*quote/i }).first();
          await expect(quoteButton).toBeVisible();
        });

        test(`should open quote modal from ${slug} page`, async ({ page }) => {
          await page.goto(`/personal/${slug}`);
          
          const quoteButton = page.getByRole('button', { name: /get.*quote/i }).first();
          await quoteButton.click();
          
          // Wait for modal
          await page.waitForSelector('[role="dialog"]', { state: 'visible', timeout: 5000 });
          
          const modal = page.locator('[role="dialog"]').first();
          await expect(modal).toBeVisible();
        });

        test(`should have clean console on ${slug} page`, async ({ page }) => {
          const helpers = new TestHelpers(page);
          const console = await helpers.assertCleanConsole();
          
          await page.goto(`/personal/${slug}`);
          await page.waitForLoadState('networkidle');
          
          console.assertNoErrors();
        });

        test(`should have no horizontal scroll on ${slug} page`, async ({ page }) => {
          const helpers = new TestHelpers(page);
          
          await page.goto(`/personal/${slug}`);
          await page.waitForLoadState('networkidle');
          
          await helpers.assertNoHorizontalScroll();
        });
      });
    }

    test('should navigate between personal insurance pages', async ({ page }) => {
      await page.goto('/personal/auto');
      
      // Look for link to home insurance
      const homeLink = page.getByRole('link', { name: /home insurance/i }).first();
      
      if (await homeLink.isVisible()) {
        await homeLink.click();
        await page.waitForURL(/\/personal\/home/);
        expect(page.url()).toContain('/personal/home');
      }
    });
  });

  test.describe('Business Insurance Pages', () => {
    const businessSlugs = testData.insuranceTypes.business;

    for (const slug of businessSlugs) {
      test.describe(`Business Insurance - ${slug}`, () => {
        test(`should load /business/${slug} page`, async ({ page }) => {
          await page.goto(`/business/${slug}`);
          
          // Should not be 404
          await expect(page.locator('h1')).not.toContainText('404');
          await expect(page.locator('h1')).not.toContainText('Not Found');
        });

        test(`should display correct title for ${slug}`, async ({ page }) => {
          await page.goto(`/business/${slug}`);
          
          const title = await page.title();
          // Should contain business or the slug name
          expect(title.toLowerCase()).toMatch(/business|landlord|bond/);
        });

        test(`should have main heading on ${slug} page`, async ({ page }) => {
          await page.goto(`/business/${slug}`);
          
          const h1 = page.locator('h1').first();
          await expect(h1).toBeVisible();
        });

        test(`should display benefits/features for ${slug}`, async ({ page }) => {
          await page.goto(`/business/${slug}`);
          
          const benefits = page.locator('li, article, [class*="benefit"], [class*="feature"]');
          const count = await benefits.count();
          
          expect(count).toBeGreaterThanOrEqual(3);
        });

        test(`should have Get Quote button on ${slug} page`, async ({ page }) => {
          await page.goto(`/business/${slug}`);
          
          const quoteButton = page.getByRole('button', { name: /get.*quote/i }).first();
          await expect(quoteButton).toBeVisible();
        });

        test(`should open quote modal from ${slug} page`, async ({ page }) => {
          await page.goto(`/business/${slug}`);
          
          const quoteButton = page.getByRole('button', { name: /get.*quote/i }).first();
          await quoteButton.click();
          
          await page.waitForSelector('[role="dialog"]', { state: 'visible', timeout: 5000 });
          
          const modal = page.locator('[role="dialog"]').first();
          await expect(modal).toBeVisible();
        });

        test(`should have clean console on ${slug} page`, async ({ page }) => {
          const helpers = new TestHelpers(page);
          const console = await helpers.assertCleanConsole();
          
          await page.goto(`/business/${slug}`);
          await page.waitForLoadState('networkidle');
          
          console.assertNoErrors();
        });
      });
    }
  });

  test.describe('Insurance Page Components', () => {
    test('should display insurance page with proper structure', async ({ page }) => {
      await page.goto('/personal/auto');
      
      // Should have main heading
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      
      // Should have description text
      const description = page.locator('p').first();
      await expect(description).toBeVisible();
      
      // Should have CTA button
      const cta = page.getByRole('button', { name: /get.*quote/i }).first();
      await expect(cta).toBeVisible();
    });

    test('should have breadcrumb navigation on insurance pages', async ({ page }) => {
      await page.goto('/personal/auto');
      
      // Look for breadcrumb or navigation trail
      const breadcrumb = page.locator('nav[aria-label*="breadcrumb" i], [class*="breadcrumb"]');
      
      // Breadcrumbs are optional
      if (await breadcrumb.count() > 0) {
        await expect(breadcrumb.first()).toBeVisible();
      }
    });

    test('should load images correctly on insurance pages', async ({ page }) => {
      const helpers = new TestHelpers(page);
      
      await page.goto('/personal/auto');
      await page.waitForLoadState('networkidle');
      
      await helpers.assertNoBrokenImages();
    });
  });

  test.describe('Static Generation Verification', () => {
    test('should have all personal insurance pages pre-rendered', async ({ page }) => {
      // Check that pages load quickly (indicating static generation)
      const slugs = testData.insuranceTypes.personal;
      
      for (const slug of slugs) {
        const startTime = Date.now();
        
        await page.goto(`/personal/${slug}`);
        await page.waitForLoadState('load');
        
        const loadTime = Date.now() - startTime;
        
        // Static pages should load very quickly
        expect(loadTime).toBeLessThan(3000);
      }
    });

    test('should have all business insurance pages pre-rendered', async ({ page }) => {
      const slugs = testData.insuranceTypes.business;
      
      for (const slug of slugs) {
        const startTime = Date.now();
        
        await page.goto(`/business/${slug}`);
        await page.waitForLoadState('load');
        
        const loadTime = Date.now() - startTime;
        
        expect(loadTime).toBeLessThan(3000);
      }
    });
  });

  test.describe('Visual Regression - Insurance Pages', () => {
    test('should match auto insurance page snapshot', async ({ page, viewport }) => {
      if (!viewport || viewport.width < 1024) {
        test.skip();
      }

      await page.goto('/personal/auto');
      await page.waitForLoadState('networkidle');
      
      await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
      
      await expect(page).toHaveScreenshot('personal-auto-desktop.png', {
        fullPage: true,
        animations: 'disabled',
        mask: [page.locator('img')],
      });
    });

    test('should match business insurance page snapshot', async ({ page, viewport }) => {
      if (!viewport || viewport.width < 1024) {
        test.skip();
      }

      await page.goto('/business/business');
      await page.waitForLoadState('networkidle');
      
      await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
      
      await expect(page).toHaveScreenshot('business-business-desktop.png', {
        fullPage: true,
        animations: 'disabled',
        mask: [page.locator('img')],
      });
    });
  });
});
