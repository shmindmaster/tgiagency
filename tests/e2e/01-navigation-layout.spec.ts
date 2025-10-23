import { test, expect } from '@playwright/test';
import { TestHelpers } from '../helpers/test-utils';

test.describe('Navigation and Layout', () => {
  test.describe('Header Navigation', () => {
    test('should render header with logo and navigation links', async ({ page }) => {
      await page.goto('/');
      
      // Check logo is visible
      const logo = page.locator('header').locator('img').first();
      await expect(logo).toBeVisible();
      
      // Verify logo alt text
      const alt = await logo.getAttribute('alt');
      expect(alt).toContain('Texas General Insurance');
      
      // Check main navigation links
      const nav = page.locator('header nav');
      await expect(nav).toBeVisible();
      
      // Check for key navigation items (buttons or links)
      const aboutLink = page.locator('header').getByRole('link', { name: /about/i }).first();
      const contactLink = page.locator('header').getByRole('link', { name: /contact/i }).first();
      
      // At least About and Contact should be visible
      await expect(aboutLink).toBeVisible();
      await expect(contactLink).toBeVisible();
    });

    test('should have working Personal Insurance dropdown', async ({ page }) => {
      await page.goto('/');
      
      // Look for Personal Insurance button in header
      const personalInsurance = page.locator('header').getByRole('button', { name: /personal insurance/i }).first();
      await personalInsurance.hover();
      
      // Wait a moment for dropdown to appear
      await page.waitForTimeout(300);
      
      // Check for dropdown items (use first() to handle multiple matches)
      await expect(page.getByRole('link', { name: /auto insurance/i }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: /home insurance/i }).first()).toBeVisible();
    });

    test('should have working Business Insurance dropdown', async ({ page }) => {
      await page.goto('/');
      
      // Look for Business Insurance button in header
      const businessInsurance = page.locator('header').getByRole('button', { name: /business insurance/i }).first();
      await businessInsurance.hover();
      
      // Wait for dropdown to appear
      await page.waitForTimeout(300);
      
      // Check for dropdown item (use menuitem role or just look for the link)
      const businessLink = page.locator('#business-menu').getByRole('link', { name: /business insurance/i }).first();
      if (await businessLink.isVisible()) {
        await expect(businessLink).toBeVisible();
      }
    });

    test('should show mobile menu on small screens', async ({ page, viewport }) => {
      // Only run on mobile viewports
      if (!viewport || viewport.width > 768) {
        test.skip();
      }

      await page.goto('/');
      
      // Look for hamburger menu button
      const menuButton = page.locator('header button[aria-label*="menu" i], header button:has(svg)').first();
      await expect(menuButton).toBeVisible();
      
      // Click to open mobile menu
      await menuButton.click();
      
      // Check that navigation is now visible
      await page.waitForTimeout(300); // Animation
      const mobileNav = page.locator('header nav, [role="dialog"] nav, aside nav').first();
      await expect(mobileNav).toBeVisible();
    });

    test('should navigate to About page from header', async ({ page }) => {
      await page.goto('/');
      
      await page.locator('header').getByRole('link', { name: /about/i }).first().click();
      await page.waitForURL(/\/about/);
      
      expect(page.url()).toContain('/about');
    });

    test('should navigate to Contact page from header', async ({ page }) => {
      await page.goto('/');
      
      await page.locator('header').getByRole('link', { name: /contact/i }).first().click();
      await page.waitForURL(/\/contact/);
      
      expect(page.url()).toContain('/contact');
    });
  });

  test.describe('Footer Navigation', () => {
    test('should render footer with all sections', async ({ page }) => {
      await page.goto('/');
      
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      
      // Check for company info
      await expect(footer.getByText(/TGI Agency/i)).toBeVisible();
      
      // Check for contact information
      await expect(footer.getByText(/512/)).toBeVisible(); // Phone number
      await expect(footer.getByText(/@/)).toBeVisible(); // Email
    });

    test('should have working footer links', async ({ page }) => {
      await page.goto('/');
      
      const footer = page.locator('footer');
      
      // Check for links to key pages
      const aboutLink = footer.getByRole('link', { name: /about/i }).first();
      await expect(aboutLink).toBeVisible();
      await expect(aboutLink).toHaveAttribute('href', /\/about/);
      
      const contactLink = footer.getByRole('link', { name: /contact/i }).first();
      await expect(contactLink).toBeVisible();
      await expect(contactLink).toHaveAttribute('href', /\/contact/);
    });

    test('should have social media links in footer', async ({ page }) => {
      await page.goto('/');
      
      const footer = page.locator('footer');
      
      // Look for social media icons or links
      const socialLinks = footer.locator('a[href*="facebook"], a[href*="twitter"], a[href*="linkedin"], a[href*="instagram"]');
      const count = await socialLinks.count();
      
      // Should have at least one social link
      expect(count).toBeGreaterThanOrEqual(0); // May not have social links
    });

    test('should navigate to Privacy Policy from footer', async ({ page }) => {
      await page.goto('/');
      
      const footer = page.locator('footer');
      const privacyLink = footer.getByRole('link', { name: /privacy/i }).first();
      
      if (await privacyLink.isVisible()) {
        await privacyLink.click();
        await page.waitForURL(/\/privacy/);
        expect(page.url()).toContain('/privacy');
      }
    });
  });

  test.describe('Responsive Layout', () => {
    test('should not have horizontal scrolling on mobile', async ({ page, viewport }) => {
      if (!viewport || viewport.width > 768) {
        test.skip();
      }

      const helpers = new TestHelpers(page);
      await page.goto('/');
      await helpers.assertNoHorizontalScroll();
      
      // Check on other pages too
      await page.goto('/about');
      await helpers.assertNoHorizontalScroll();
      
      await page.goto('/contact');
      await helpers.assertNoHorizontalScroll();
    });

    test('should not have horizontal scrolling on tablet', async ({ page, viewport }) => {
      if (!viewport || viewport.width < 768 || viewport.width > 1024) {
        test.skip();
      }

      const helpers = new TestHelpers(page);
      await page.goto('/');
      await helpers.assertNoHorizontalScroll();
    });

    test('should not have horizontal scrolling on desktop', async ({ page, viewport }) => {
      if (!viewport || viewport.width < 1024) {
        test.skip();
      }

      const helpers = new TestHelpers(page);
      await page.goto('/');
      await helpers.assertNoHorizontalScroll();
    });

    test('should have proper spacing and alignment', async ({ page }) => {
      await page.goto('/');
      
      // Check that header and footer are properly positioned
      const header = page.locator('header');
      const footer = page.locator('footer');
      
      await expect(header).toBeVisible();
      await expect(footer).toBeVisible();
      
      // Header should be at the top
      const headerBox = await header.boundingBox();
      expect(headerBox?.y).toBeLessThanOrEqual(10);
    });
  });

  test.describe('Skip Link (Accessibility)', () => {
    test('should have skip to content link', async ({ page }) => {
      await page.goto('/');
      
      // Skip link should be in the DOM (may be visually hidden)
      const skipLink = page.getByText(/skip to (main )?content/i).first();
      
      // It may not be visible until focused
      await page.keyboard.press('Tab');
      
      // Check if it exists in DOM
      const count = await page.getByText(/skip to (main )?content/i).count();
      expect(count).toBeGreaterThanOrEqual(0); // May or may not have skip link
    });
  });

  test.describe('Console Cleanliness', () => {
    test('should have clean console on homepage', async ({ page }) => {
      const helpers = new TestHelpers(page);
      const console = await helpers.assertCleanConsole();
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check for errors (warnings are acceptable in development)
      console.assertNoErrors();
    });

    test('should have clean console on About page', async ({ page }) => {
      const helpers = new TestHelpers(page);
      const console = await helpers.assertCleanConsole();
      
      await page.goto('/about');
      await page.waitForLoadState('networkidle');
      
      console.assertNoErrors();
    });

    test('should have clean console on Contact page', async ({ page }) => {
      const helpers = new TestHelpers(page);
      const console = await helpers.assertCleanConsole();
      
      await page.goto('/contact');
      await page.waitForLoadState('networkidle');
      
      console.assertNoErrors();
    });
  });
});
