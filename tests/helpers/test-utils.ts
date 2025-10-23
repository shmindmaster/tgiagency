import { expect, Page } from '@playwright/test';

/**
 * Test utilities for common operations across test suite
 */

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for page to load and check console for errors
   */
  async assertCleanConsole() {
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];

    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
      if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });

    // Also catch page errors
    this.page.on('pageerror', (error) => {
      consoleErrors.push(error.message);
    });

    return {
      consoleErrors,
      consoleWarnings,
      assertNoErrors: () => {
        expect(consoleErrors, `Console errors found: ${consoleErrors.join(', ')}`).toHaveLength(0);
      },
      assertNoWarnings: () => {
        expect(consoleWarnings, `Console warnings found: ${consoleWarnings.join(', ')}`).toHaveLength(0);
      },
    };
  }

  /**
   * Check for broken images on the page
   */
  async assertNobrokenImages() {
    const images = await this.page.locator('img').all();
    const brokenImages: string[] = [];

    for (const img of images) {
      const src = await img.getAttribute('src');
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      
      if (naturalWidth === 0 && src) {
        brokenImages.push(src);
      }
    }

    expect(brokenImages, `Broken images found: ${brokenImages.join(', ')}`).toHaveLength(0);
  }

  /**
   * Check for horizontal scrolling
   */
  async assertNoHorizontalScroll() {
    const hasHorizontalScroll = await this.page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasHorizontalScroll, 'Page has horizontal scrolling').toBe(false);
  }

  /**
   * Wait for network to be idle
   */
  async waitForNetworkIdle(timeout = 5000) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Get all links on page
   */
  async getAllLinks(): Promise<string[]> {
    return await this.page.locator('a[href]').evaluateAll((links: HTMLAnchorElement[]) =>
      links.map((link) => link.href)
    );
  }

  /**
   * Check if link is broken (returns 4xx or 5xx)
   */
  async checkLinkStatus(url: string): Promise<{ url: string; status: number; ok: boolean }> {
    try {
      const response = await this.page.request.get(url);
      return {
        url,
        status: response.status(),
        ok: response.ok(),
      };
    } catch (error) {
      return {
        url,
        status: 0,
        ok: false,
      };
    }
  }

  /**
   * Fill form field and trigger validation
   */
  async fillField(selector: string, value: string) {
    await this.page.fill(selector, value);
    await this.page.locator(selector).blur(); // Trigger validation
  }

  /**
   * Wait for element to be visible and return it
   */
  async waitForElement(selector: string, timeout = 5000) {
    return await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Take a snapshot with a descriptive name
   */
  async takeSnapshot(name: string) {
    await expect(this.page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
  }

  /**
   * Open quote modal from anywhere
   */
  async openQuoteModal() {
    // Look for any "Get Your Free Quote" or similar button
    const quoteButton = this.page.getByRole('button', { name: /get.*quote/i }).first();
    await quoteButton.click();
    
    // Wait for modal to appear
    await this.page.waitForSelector('[role="dialog"]', { state: 'visible' });
  }

  /**
   * Close any open modal/dialog
   */
  async closeModal() {
    const closeButton = this.page.locator('[role="dialog"] button[aria-label*="close" i], [role="dialog"] button:has-text("×")').first();
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  }

  /**
   * Check keyboard navigation accessibility
   */
  async testKeyboardNavigation(startSelector: string, expectedStops: number) {
    await this.page.locator(startSelector).focus();
    let focusedElements = 1;

    for (let i = 0; i < expectedStops; i++) {
      await this.page.keyboard.press('Tab');
      const focused = await this.page.evaluate(() => document.activeElement?.tagName);
      if (focused && ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(focused)) {
        focusedElements++;
      }
    }

    expect(focusedElements).toBeGreaterThanOrEqual(expectedStops);
  }
}

/**
 * Common test data
 */
export const testData = {
  validContact: {
    name: 'Test User',
    email: 'test@example.com',
    phone: '5551234567',
    message: 'This is a test message for the contact form.',
  },
  validQuote: {
    insuranceType: 'auto',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '5551234567',
    address: '123 Main Street',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    vehicleYear: '2020',
    coverageAmount: '100000',
    deductible: '500',
    consent: true,
  },
  insuranceTypes: {
    personal: ['auto', 'home', 'renters', 'life', 'boat', 'flood'],
    business: ['business', 'landlord', 'bonds'],
  },
};

/**
 * Viewport configurations
 */
export const viewports = {
  mobile: {
    iphoneSE: { width: 375, height: 667 },
    iphone14ProMax: { width: 430, height: 932 },
  },
  tablet: {
    ipadMini: { width: 768, height: 1024 },
  },
  desktop: {
    small: { width: 1366, height: 768 },
    standard: { width: 1920, height: 1080 },
  },
};

/**
 * Expected page titles
 */
export const pageTitles = {
  home: 'Home | TGI Agency',
  about: 'About Us | TGI Agency',
  contact: 'Contact Us | TGI Agency',
  resources: 'Resources | TGI Agency',
  privacy: 'Privacy Policy | TGI Agency',
};
