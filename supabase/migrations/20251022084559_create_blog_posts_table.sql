/*
  # Create Blog Posts Table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key) - Unique identifier for each blog post
      - `title` (text) - Post title
      - `slug` (text, unique) - URL-friendly slug for the post
      - `excerpt` (text) - Brief post summary
      - `content` (text) - Full post content (markdown or HTML)
      - `featured_image` (text, optional) - URL to featured image
      - `category` (text) - Post category (e.g., 'Auto Insurance', 'Home Insurance')
      - `tags` (text array) - Array of tags for the post
      - `published` (boolean) - Whether post is published (default: false)
      - `published_at` (timestamptz, optional) - When post was published
      - `author` (text) - Post author name
      - `created_at` (timestamptz) - Timestamp when post was created
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for anyone to read published posts
    - Add policy for authenticated users to manage all posts (for admin/staff access)

  3. Indexes
    - Add index on slug for fast lookups
    - Add index on published status for filtering
    - Add index on category for filtering
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  featured_image text,
  category text NOT NULL,
  tags text[] DEFAULT ARRAY[]::text[],
  published boolean DEFAULT false,
  published_at timestamptz,
  author text DEFAULT 'Texas General Insurance',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts(published);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts(category);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Authenticated users can read all blog posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);
