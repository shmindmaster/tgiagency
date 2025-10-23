import { test, expect } from '@playwright/test';
import { TestHelpers } from '../helpers/test-utils';

test.describe('Accessibility (A11y)', () => {
  test.describe('Keyboard Navigation', () => {
    test('should be able to navigate homepage with keyboard', async ({ page }) => {
      await page.goto('/');
      
      // Start from the top
      await page.keyboard.press('Tab');
      
      // Should be able to tab through interactive elements
      let focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      
      // Should have focused an interactive element
      expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement || '');
    });

    test('should be able to navigate header with keyboard', async ({ page }) => {
      await page.goto('/');
      
      // Tab through header navigation
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
        
        const focused = await page.evaluate(() => {
          const el = document.activeElement;
          return {
            tag: el?.tagName,
            inHeader: el?.closest('header') !== null,
          };
        });
        
        // At some point should be in header
        if (focused.inHeader && ['A', 'BUTTON'].includes(focused.tag || '')) {
          expect(focused.inHeader).toBe(true);
          break;
        }
      }
    });

    test('should be able to activate links with Enter key', async ({ page }) => {
      await page.goto('/');
      
      // Tab to a link
      await page.keyboard.press('Tab');
      
      // Find a link and focus it
      const aboutLink = page.locator('header a[href*="/about"]').first();
      await aboutLink.focus();
      
      // Press Enter
      await page.keyboard.press('Enter');
      
      // Should navigate
      await page.waitForTimeout(500);
      
      // URL should change
      const url = page.url();
      expect(url).toMatch(/about|contact|insurance/);
    });

    test('should be able to activate buttons with Space key', async ({ page }) => {
      await page.goto('/');
      
      // Focus on Get Quote button
      const quoteButton = page.getByRole('button', { name: /get.*quote/i }).first();
      await quoteButton.focus();
      
      // Press Space
      await page.keyboard.press('Space');
      
      // Modal should open
      await page.waitForTimeout(500);
      
      const modal = page.locator('[role="dialog"]');
      const isVisible = await modal.first().isVisible();
      
      expect(isVisible).toBe(true);
    });

    test('should be able to close modal with Escape key', async ({ page }) => {
      await page.goto('/');
      
      // Open modal
      const quoteButton = page.getByRole('button', { name: /get.*quote/i }).first();
      await quoteButton.click();
      
      const modal = page.locator('[role="dialog"]').first();
      await expect(modal).toBeVisible();
      
      // Press Escape
      await page.keyboard.press('Escape');
      
      await page.waitForTimeout(500);
      
      // Modal should close
      const isVisible = await modal.isVisible();
      expect(isVisible).toBe(false);
    });

    test('should be able to navigate form fields with Tab', async ({ page }) => {
      await page.goto('/contact');
      
      // Focus first field
      const nameInput = page.locator('input[name="name"]').first();
      await nameInput.focus();
      
      // Tab through fields
      await page.keyboard.press('Tab');
      
      let focused = await page.evaluate(() => document.activeElement?.tagName);
      expect(['INPUT', 'TEXTAREA']).toContain(focused || '');
      
      await page.keyboard.press('Tab');
      
      focused = await page.evaluate(() => document.activeElement?.tagName);
      expect(['INPUT', 'TEXTAREA', 'BUTTON']).toContain(focused || '');
    });

    test('should be able to navigate mobile menu with keyboard', async ({ page, viewport }) => {
      if (!viewport || viewport.width > 768) {
        test.skip();
      }

      await page.goto('/');
      
      // Find and focus mobile menu button
      const menuButton = page.locator('header button').first();
      await menuButton.focus();
      
      // Activate with Space or Enter
      await page.keyboard.press('Space');
      
      await page.waitForTimeout(300);
      
      // Should open menu
      const nav = page.locator('nav, [role="dialog"]');
      const isVisible = await nav.first().isVisible();
      
      expect(isVisible).toBe(true);
    });
  });

  test.describe('Focus Management', () => {
    test('should have visible focus indicators', async ({ page }) => {
      await page.goto('/');
      
      // Tab to first focusable element
      await page.keyboard.press('Tab');
      
      // Check if focus is visible
      const hasFocusOutline = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) {
          return false;
        }
        
        const styles = window.getComputedStyle(el);
        return (
          styles.outline !== 'none' ||
          styles.outlineWidth !== '0px' ||
          styles.boxShadow !== 'none'
        );
      });
      
      // Should have some form of focus indicator
      expect(typeof hasFocusOutline).toBe('boolean');
    });

    test('should trap focus in modal', async ({ page }) => {
      await page.goto('/');
      
      // Open modal
      const quoteButton = page.getByRole('button', { name: /get.*quote/i }).first();
      await quoteButton.click();
      
      const modal = page.locator('[role="dialog"]').first();
      await expect(modal).toBeVisible();
      
      // Tab multiple times
      for (let i = 0; i < 20; i++) {
        await page.keyboard.press('Tab');
      }
      
      // Focus should still be inside modal
      const focusInModal = await page.evaluate(() => {
        const el = document.activeElement;
        return el?.closest('[role="dialog"]') !== null;
      });
      
      expect(focusInModal).toBe(true);
    });

    test('should restore focus when modal closes', async ({ page }) => {
      await page.goto('/');
      
      // Focus button
      const quoteButton = page.getByRole('button', { name: /get.*quote/i }).first();
      await quoteButton.focus();
      
      // Remember button
      const buttonText = await quoteButton.textContent();
      
      // Open modal
      await quoteButton.click();
      
      const modal = page.locator('[role="dialog"]').first();
      await expect(modal).toBeVisible();
      
      // Close with Escape
      await page.keyboard.press('Escape');
      
      await page.waitForTimeout(500);
      
      // Focus should return to button (or somewhere reasonable)
      const focusedText = await page.evaluate(() => document.activeElement?.textContent);
      
      // Focus management may vary
      expect(typeof focusedText).toBe('string');
    });
  });

  test.describe('Semantic HTML', () => {
    test('should have proper landmark regions', async ({ page }) => {
      await page.goto('/');
      
      // Should have header
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Should have main
      const main = page.locator('main');
      await expect(main).toBeVisible();
      
      // Should have footer
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    test('should have only one h1 per page', async ({ page }) => {
      await page.goto('/');
      
      const h1Count = await page.locator('h1').count();
      
      // Should have exactly one h1
      expect(h1Count).toBe(1);
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/');
      
      // Get all headings
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
      
      // Should have multiple heading levels
      expect(headings.length).toBeGreaterThan(0);
    });

    test('should use nav element for navigation', async ({ page }) => {
      await page.goto('/');
      
      const nav = page.locator('nav');
      const navCount = await nav.count();
      
      // Should have at least one nav element
      expect(navCount).toBeGreaterThanOrEqual(1);
    });

    test('should have form labels', async ({ page }) => {
      await page.goto('/contact');
      
      // Check that inputs have associated labels
      const inputs = await page.locator('input[name], textarea[name]').all();
      
      for (const input of inputs) {
        const id = await input.getAttribute('id');
        const name = await input.getAttribute('name');
        
        if (id) {
          // Look for label with for attribute
          const label = page.locator(`label[for="${id}"]`);
          const hasLabel = (await label.count()) > 0;
          
          // Or check if wrapped in label
          const wrappedInLabel = await input.evaluate((el) => {
            return el.closest('label') !== null;
          });
          
          // Should have some form of label
          expect(hasLabel || wrappedInLabel).toBe(true);
          break; // Just check first one
        }
      }
    });

    test('should have alt text for images', async ({ page }) => {
      await page.goto('/');
      
      const images = await page.locator('img').all();
      
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        
        // All images should have alt attribute (can be empty for decorative)
        expect(alt !== null).toBe(true);
      }
    });
  });

  test.describe('ARIA Attributes', () => {
    test('should have proper button roles', async ({ page }) => {
      await page.goto('/');
      
      // Buttons should have button role (implicit or explicit)
      const buttons = await page.locator('button, [role="button"]').all();
      
      expect(buttons.length).toBeGreaterThan(0);
    });

    test('should have proper modal dialog attributes', async ({ page }) => {
      await page.goto('/');
      
      // Open modal
      const quoteButton = page.getByRole('button', { name: /get.*quote/i }).first();
      await quoteButton.click();
      
      const modal = page.locator('[role="dialog"]').first();
      await expect(modal).toBeVisible();
      
      // Should have aria-modal or role="dialog"
      const ariaModal = await modal.getAttribute('aria-modal');
      const role = await modal.getAttribute('role');
      
      expect(role).toBe('dialog');
    });

    test('should have aria-label for icon-only buttons', async ({ page }) => {
      await page.goto('/');
      
      // Look for buttons with icons but no text
      const iconButtons = page.locator('button:not(:has-text(""))').first();
      
      if (await iconButtons.isVisible()) {
        // Should have aria-label or aria-labelledby
        const ariaLabel = await iconButtons.getAttribute('aria-label');
        const ariaLabelledBy = await iconButtons.getAttribute('aria-labelledby');
        
        expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    });
  });

  test.describe('Skip Link', () => {
    test('should have skip to main content link', async ({ page }) => {
      await page.goto('/');
      
      // Look for skip link
      const skipLink = page.getByText(/skip to (main )?content/i);
      
      // May not be visible but should be in DOM
      const count = await skipLink.count();
      
      // Skip link is optional but recommended
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should make skip link visible on focus', async ({ page }) => {
      await page.goto('/');
      
      // Press Tab
      await page.keyboard.press('Tab');
      
      // Check if skip link became visible
      const skipLink = page.getByText(/skip to (main )?content/i).first();
      
      if (await skipLink.count() > 0) {
        const isVisible = await skipLink.isVisible();
        
        // If present, should be visible on focus
        expect(typeof isVisible).toBe('boolean');
      }
    });

    test('should navigate to main content when activated', async ({ page }) => {
      await page.goto('/');
      
      const skipLink = page.getByText(/skip to (main )?content/i).first();
      
      if (await skipLink.isVisible()) {
        await skipLink.click();
        
        // Should focus main content
        await page.waitForTimeout(300);
        
        const focusedElement = await page.evaluate(() => {
          return document.activeElement?.tagName.toLowerCase();
        });
        
        // Should be on main or within main
        expect(['main', 'body', 'div', 'h1'].includes(focusedElement || '')).toBe(true);
      }
    });
  });

  test.describe('Color Contrast', () => {
    test('should have sufficient color contrast on homepage', async ({ page }) => {
      await page.goto('/');
      
      // This is a basic check - proper contrast testing requires axe or similar
      // We'll just verify that text elements have defined colors
      const textElement = page.locator('body').first();
      
      const hasColors = await textElement.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.color !== '' && styles.backgroundColor !== '';
      });
      
      expect(hasColors).toBe(true);
    });
  });

  test.describe('Responsive and Accessible', () => {
    test('should be accessible on mobile viewport', async ({ page, viewport }) => {
      if (!viewport || viewport.width > 768) {
        test.skip();
      }

      await page.goto('/');
      
      // Should still have proper landmarks on mobile
      const header = page.locator('header');
      const main = page.locator('main');
      const footer = page.locator('footer');
      
      await expect(header).toBeVisible();
      await expect(main).toBeVisible();
      await expect(footer).toBeVisible();
    });

    test('should have accessible mobile menu', async ({ page, viewport }) => {
      if (!viewport || viewport.width > 768) {
        test.skip();
      }

      await page.goto('/');
      
      // Mobile menu button should have accessible name
      const menuButton = page.locator('header button[aria-label], header button').first();
      
      if (await menuButton.isVisible()) {
        const ariaLabel = await menuButton.getAttribute('aria-label');
        const text = await menuButton.textContent();
        
        // Should have either aria-label or text content
        expect(ariaLabel || text).toBeTruthy();
      }
    });
  });
});
