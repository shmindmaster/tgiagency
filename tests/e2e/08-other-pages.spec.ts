import { test, expect } from '@playwright/test';
import { TestHelpers } from '../helpers/test-utils';

test.describe('Other Pages', () => {
  test.describe('Privacy Policy Page', () => {
    test('should load privacy policy page', async ({ page }) => {
      await page.goto('/privacy-policy');
      
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      
      const title = await page.title();
      expect(title.toLowerCase()).toContain('privacy');
    });

    test('should display privacy policy content', async ({ page }) => {
      await page.goto('/privacy-policy');
      
      // Should have substantial content
      const paragraphs = page.locator('p');
      const count = await paragraphs.count();
      
      expect(count).toBeGreaterThanOrEqual(5);
    });

    test('should contain legal terminology', async ({ page }) => {
      await page.goto('/privacy-policy');
      
      const content = await page.textContent('body');
      
      // Should contain privacy-related terms
      expect(content?.toLowerCase()).toMatch(/privacy|data|information|collect|protect|consent/);
    });

    test('should have clean console', async ({ page }) => {
      const helpers = new TestHelpers(page);
      const console = await helpers.assertCleanConsole();
      
      await page.goto('/privacy-policy');
      await page.waitForLoadState('networkidle');
      
      console.assertNoErrors();
    });

    test('should not have horizontal scrolling', async ({ page }) => {
      const helpers = new TestHelpers(page);
      
      await page.goto('/privacy-policy');
      await page.waitForLoadState('networkidle');
      
      await helpers.assertNoHorizontalScroll();
    });

    test('should have proper heading structure', async ({ page }) => {
      await page.goto('/privacy-policy');
      
      // Should have h1
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      
      // Should have section headings (h2, h3)
      const h2Count = await page.locator('h2').count();
      const h3Count = await page.locator('h3').count();
      
      expect(h2Count + h3Count).toBeGreaterThanOrEqual(3);
    });
  });

  test.describe('404 Not Found Page', () => {
    test('should display custom 404 page for invalid route', async ({ page }) => {
      const response = await page.goto('/this-page-does-not-exist-12345');
      
      // Should return 404 status
      expect(response?.status()).toBe(404);
      
      // Should have 404 content
      const content = await page.textContent('body');
      expect(content?.toLowerCase()).toMatch(/404|not found|page.*not.*found/);
    });

    test('should have 404 heading', async ({ page }) => {
      await page.goto('/this-page-does-not-exist-12345');
      
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      
      const text = await h1.textContent();
      expect(text?.toLowerCase()).toMatch(/404|not found/);
    });

    test('should have "Go Back Home" or similar link', async ({ page }) => {
      await page.goto('/this-page-does-not-exist-12345');
      
      const homeLink = page.getByRole('link', { name: /home|back|return/i });
      await expect(homeLink.first()).toBeVisible();
      
      const href = await homeLink.first().getAttribute('href');
      expect(href).toBe('/');
    });

    test('should navigate back to home from 404 page', async ({ page }) => {
      await page.goto('/this-page-does-not-exist-12345');
      
      const homeLink = page.getByRole('link', { name: /home|back|return/i }).first();
      await homeLink.click();
      
      await page.waitForURL('/');
      expect(page.url()).toMatch(/\/$|\/$/);
    });

    test('should have header and footer on 404 page', async ({ page }) => {
      await page.goto('/this-page-does-not-exist-12345');
      
      // Header and footer should still be present
      const header = page.locator('header');
      const footer = page.locator('footer');
      
      await expect(header).toBeVisible();
      await expect(footer).toBeVisible();
    });

    test('should have clean console on 404 page', async ({ page }) => {
      const helpers = new TestHelpers(page);
      const console = await helpers.assertCleanConsole();
      
      await page.goto('/this-page-does-not-exist-12345');
      await page.waitForLoadState('networkidle');
      
      // 404 pages should still have clean console
      console.assertNoErrors();
    });
  });

  test.describe('Sitemap and Robots', () => {
    test('should have sitemap.xml', async ({ page }) => {
      const response = await page.goto('/sitemap.xml');
      
      // Should return 200
      expect(response?.status()).toBe(200);
      
      // Should be XML content
      const contentType = response?.headers()['content-type'];
      expect(contentType).toContain('xml');
    });

    test('should have robots.txt', async ({ page }) => {
      const response = await page.goto('/robots.txt');
      
      // Should return 200
      expect(response?.status()).toBe(200);
      
      // Should be text content
      const contentType = response?.headers()['content-type'];
      expect(contentType).toContain('text');
    });

    test('sitemap should include key pages', async ({ page }) => {
      await page.goto('/sitemap.xml');
      
      const content = await page.textContent('body');
      
      // Should include main pages
      expect(content).toContain('/about');
      expect(content).toContain('/contact');
    });

    test('robots.txt should reference sitemap', async ({ page }) => {
      await page.goto('/robots.txt');
      
      const content = await page.textContent('body');
      
      // Should reference sitemap
      expect(content?.toLowerCase()).toContain('sitemap');
    });
  });

  test.describe('Visual Regression - Other Pages', () => {
    test('should match privacy policy snapshot on desktop', async ({ page, viewport }) => {
      if (!viewport || viewport.width < 1024) {
        test.skip();
      }

      await page.goto('/privacy-policy');
      await page.waitForLoadState('networkidle');
      
      await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
      
      await expect(page).toHaveScreenshot('privacy-policy-desktop.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });

    test('should match 404 page snapshot on desktop', async ({ page, viewport }) => {
      if (!viewport || viewport.width < 1024) {
        test.skip();
      }

      await page.goto('/this-page-does-not-exist');
      await page.waitForLoadState('networkidle');
      
      await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
      
      await expect(page).toHaveScreenshot('404-desktop.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });
  });
});
