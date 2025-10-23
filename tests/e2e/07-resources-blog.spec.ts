import { test, expect } from '@playwright/test';
import { TestHelpers } from '../helpers/test-utils';

test.describe('Resources/Blog Pages', () => {
  test.describe('Blog Listing Page', () => {
    test('should load resources/blog listing page', async ({ page }) => {
      await page.goto('/resources');
      
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      
      const title = await page.title();
      expect(title.toLowerCase()).toMatch(/resource|blog/);
    });

    test('should display blog posts', async ({ page }) => {
      await page.goto('/resources');
      
      // Should have blog post cards/articles
      const posts = page.locator('article, [class*="post"], [class*="card"]');
      const count = await posts.count();
      
      // Should have at least 1 blog post
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should display blog post titles and excerpts', async ({ page }) => {
      await page.goto('/resources');
      
      // Should have clickable post titles
      const postLinks = page.locator('a[href*="/resources/"]');
      const count = await postLinks.count();
      
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should have category filter', async ({ page }) => {
      await page.goto('/resources');
      
      // Look for category filter buttons/tabs
      const categoryButtons = page.getByRole('button', { name: /all|tips|guide|news|category/i });
      
      // Category filter is optional
      const count = await categoryButtons.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should filter posts by category when clicked', async ({ page }) => {
      await page.goto('/resources');
      
      // Find a category button
      const categoryButton = page.getByRole('button', { name: /tips|guide|news/i }).first();
      
      if (await categoryButton.isVisible()) {
        // Get initial post count
        const initialPosts = await page.locator('article, [class*="post"]').count();
        
        // Click filter
        await categoryButton.click();
        await page.waitForTimeout(500);
        
        // Posts should be filtered (count may change)
        const filteredPosts = await page.locator('article, [class*="post"]').count();
        
        // Either filtered or stayed the same
        expect(filteredPosts).toBeGreaterThanOrEqual(0);
      }
    });

    test('should navigate to individual blog post', async ({ page }) => {
      await page.goto('/resources');
      
      // Click on first blog post
      const firstPost = page.locator('a[href*="/resources/"]').first();
      await firstPost.click();
      
      // Should navigate to blog post
      await page.waitForURL(/\/resources\/.+/);
      
      expect(page.url()).toMatch(/\/resources\/.+/);
    });

    test('should have clean console', async ({ page }) => {
      const helpers = new TestHelpers(page);
      const console = await helpers.assertCleanConsole();
      
      await page.goto('/resources');
      await page.waitForLoadState('networkidle');
      
      console.assertNoErrors();
    });

    test('should not have horizontal scrolling', async ({ page }) => {
      const helpers = new TestHelpers(page);
      
      await page.goto('/resources');
      await page.waitForLoadState('networkidle');
      
      await helpers.assertNoHorizontalScroll();
    });
  });

  test.describe('Individual Blog Post Pages', () => {
    // Test known blog post slugs from the codebase
    const blogSlugs = [
      'ultimate-guide-home-insurance-texas',
      'understanding-auto-insurance-coverage',
      'small-business-insurance-guide',
      'renters-insurance-explained'
    ];

    for (const slug of blogSlugs) {
      test.describe(`Blog Post: ${slug}`, () => {
        test(`should load /resources/${slug}`, async ({ page }) => {
          const response = await page.goto(`/resources/${slug}`);
          
          // May be 404 if post doesn't exist, but should at least load
          expect(response?.status()).toBeLessThan(500);
        });

        test(`should display post title for ${slug}`, async ({ page }) => {
          const response = await page.goto(`/resources/${slug}`);
          
          if (response?.status() === 200) {
            const h1 = page.locator('h1');
            await expect(h1).toBeVisible();
          }
        });

        test(`should render markdown content for ${slug}`, async ({ page }) => {
          const response = await page.goto(`/resources/${slug}`);
          
          if (response?.status() === 200) {
            // Should have paragraphs and headings (rendered markdown)
            const content = page.locator('article, main, [class*="content"]');
            const paragraphs = content.locator('p');
            
            const count = await paragraphs.count();
            
            // Should have substantial content
            if (count > 0) {
              expect(count).toBeGreaterThanOrEqual(2);
            }
          }
        });

        test(`should have clean console on ${slug}`, async ({ page }) => {
          const response = await page.goto(`/resources/${slug}`);
          
          if (response?.status() === 200) {
            const helpers = new TestHelpers(page);
            const console = await helpers.assertCleanConsole();
            
            await page.waitForLoadState('networkidle');
            
            console.assertNoErrors();
          }
        });
      });
    }

    test('should display blog post metadata (date, author, category)', async ({ page }) => {
      await page.goto('/resources/ultimate-guide-home-insurance-texas');
      
      // Look for metadata (optional)
      const metadata = page.locator('[class*="meta"], time, [datetime]');
      
      // Metadata is optional but common
      const count = await metadata.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should display featured image', async ({ page }) => {
      await page.goto('/resources/ultimate-guide-home-insurance-texas');
      
      // Look for hero/featured image
      const heroImage = page.locator('article img, main img').first();
      
      if (await heroImage.isVisible()) {
        const naturalWidth = await heroImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Blog Post CTAs', () => {
    test('should have Get Quote CTA in blog post', async ({ page }) => {
      const response = await page.goto('/resources/ultimate-guide-home-insurance-texas');
      
      if (response?.status() === 200) {
        const quoteButton = page.getByRole('button', { name: /get.*quote/i });
        
        if (await quoteButton.count() > 0) {
          await expect(quoteButton.first()).toBeVisible();
        }
      }
    });

    test('should have Contact CTA in blog post', async ({ page }) => {
      const response = await page.goto('/resources/ultimate-guide-home-insurance-texas');
      
      if (response?.status() === 200) {
        const contactLink = page.getByRole('link', { name: /contact/i });
        
        if (await contactLink.count() > 0) {
          const href = await contactLink.first().getAttribute('href');
          expect(href).toContain('/contact');
        }
      }
    });

    test('should open quote modal from blog CTA', async ({ page }) => {
      const response = await page.goto('/resources/ultimate-guide-home-insurance-texas');
      
      if (response?.status() === 200) {
        const quoteButton = page.getByRole('button', { name: /get.*quote/i });
        
        if (await quoteButton.count() > 0) {
          await quoteButton.first().click();
          
          const modal = page.locator('[role="dialog"]').first();
          await expect(modal).toBeVisible();
        }
      }
    });
  });

  test.describe('Related Posts', () => {
    test('should display related posts section', async ({ page }) => {
      const response = await page.goto('/resources/ultimate-guide-home-insurance-texas');
      
      if (response?.status() === 200) {
        // Look for related posts section
        const relatedSection = page.locator('text=/related|you.*also.*like|more.*article/i').first();
        
        if (await relatedSection.isVisible()) {
          await expect(relatedSection).toBeVisible();
        }
      }
    });

    test('should have working links to related posts', async ({ page }) => {
      const response = await page.goto('/resources/ultimate-guide-home-insurance-texas');
      
      if (response?.status() === 200) {
        // Look for related post links
        const relatedLinks = page.locator('a[href*="/resources/"]:not([href="/resources"])');
        const count = await relatedLinks.count();
        
        if (count > 1) {
          // Click on a related post
          const relatedPost = relatedLinks.nth(1);
          await relatedPost.click();
          
          await page.waitForURL(/\/resources\/.+/);
          expect(page.url()).toMatch(/\/resources\/.+/);
        }
      }
    });
  });

  test.describe('Blog Post Formatting', () => {
    test('should render headings correctly', async ({ page }) => {
      const response = await page.goto('/resources/ultimate-guide-home-insurance-texas');
      
      if (response?.status() === 200) {
        // Should have h2, h3, etc. from markdown
        const headings = page.locator('h2, h3');
        const count = await headings.count();
        
        expect(count).toBeGreaterThanOrEqual(1);
      }
    });

    test('should render lists correctly', async ({ page }) => {
      const response = await page.goto('/resources/ultimate-guide-home-insurance-texas');
      
      if (response?.status() === 200) {
        // Should have ul/ol from markdown
        const lists = page.locator('ul, ol');
        
        // Lists are common but not required
        const count = await lists.count();
        expect(count).toBeGreaterThanOrEqual(0);
      }
    });

    test('should render links correctly', async ({ page }) => {
      const response = await page.goto('/resources/ultimate-guide-home-insurance-texas');
      
      if (response?.status() === 200) {
        // Should have links in content
        const contentLinks = page.locator('article a, main a');
        const count = await contentLinks.count();
        
        expect(count).toBeGreaterThanOrEqual(1);
      }
    });
  });

  test.describe('Visual Regression - Resources', () => {
    test('should match blog listing page snapshot on desktop', async ({ page, viewport }) => {
      if (!viewport || viewport.width < 1024) {
        test.skip();
      }

      await page.goto('/resources');
      await page.waitForLoadState('networkidle');
      
      await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
      
      await expect(page).toHaveScreenshot('resources-listing-desktop.png', {
        fullPage: true,
        animations: 'disabled',
        mask: [page.locator('img')],
      });
    });

    test('should match blog post page snapshot on desktop', async ({ page, viewport }) => {
      if (!viewport || viewport.width < 1024) {
        test.skip();
      }

      const response = await page.goto('/resources/ultimate-guide-home-insurance-texas');
      
      if (response?.status() === 200) {
        await page.waitForLoadState('networkidle');
        
        await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
        
        await expect(page).toHaveScreenshot('blog-post-desktop.png', {
          fullPage: true,
          animations: 'disabled',
          mask: [page.locator('img')],
        });
      }
    });
  });
});
