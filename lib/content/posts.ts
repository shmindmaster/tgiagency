import fs from 'fs';
import path from 'path';
import type { BlogCategory, Post, PostFrontMatter, PostMeta } from './types';

// Directory containing markdown source (currently under docs)
const BLOG_DIR = path.join(process.cwd(), 'docs', 'content', 'blogs');
let _cache: PostMeta[] | null = null;
let _fullCache: Record<string, Post> = {};

function safeReadDir(dir: string): string[] {
  try { return fs.readdirSync(dir); } catch { return []; }
}

function parseFrontMatter(source: string): { fm: Partial<PostFrontMatter>; body: string } {
  if (!source.startsWith('---')) { return { fm: {}, body: source }; }
  const end = source.indexOf('\n---', 3);
  if (end === -1) { return { fm: {}, body: source }; }
  const raw = source.substring(3, end).trim();
  const body = source.substring(end + 4).trim();
  const fm: Record<string, any> = {};
  raw.split(/\r?\n/).forEach(line => {
    const idx = line.indexOf(':');
    if (idx === -1) { return; }
    const key = line.substring(0, idx).trim();
    let value = line.substring(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1).trim();
      fm[key] = inner ? inner.split(',').map(v => v.trim().replace(/^['"]|['"]$/g, '')) : [];
    } else if (value === 'true' || value === 'false') {
      fm[key] = value === 'true';
    } else {
      fm[key] = value;
    }
  });
  return { fm: fm as Partial<PostFrontMatter>, body };
}

function markdownToHtml(md: string): string {
  // Lightweight markdown transformer (supports: headings, lists, blockquotes, bold, italic, code, links, hr)
  const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let html = '';
  const lines = md.split(/\r?\n/);
  let inList = false;
  let inCodeFence: { lang: string | null; lines: string[] } | null = null;
  const flushList = () => { if (inList) { html += '</ul>'; inList = false; } };
  const flushCode = () => {
    if (inCodeFence) {
      html += `<pre><code${inCodeFence.lang ? ` class="language-${inCodeFence.lang}"` : ''}>${escape(inCodeFence.lines.join('\n'))}</code></pre>`;
      inCodeFence = null;
    }
  };
  for (let rawLine of lines) {
    const line = rawLine; // preserve indentation for code
    if (inCodeFence) {
      if (/^```/.test(line.trim())) { flushCode(); continue; }
      inCodeFence.lines.push(line); continue;
    }
    if (/^```/.test(line.trim())) {
      flushList();
      const lang = line.trim().slice(3).trim() || null;
      inCodeFence = { lang, lines: [] };
      continue;
    }
    const trimmed = line.trimEnd();
    if (!trimmed.trim()) { flushList(); continue; }
    // headings
    if (/^######\s+/.test(trimmed)) { flushList(); html += `<h6>${trimmed.replace(/^######\s+/, '')}</h6>`; continue; }
    if (/^#####\s+/.test(trimmed)) { flushList(); html += `<h5>${trimmed.replace(/^#####\s+/, '')}</h5>`; continue; }
    if (/^####\s+/.test(trimmed)) { flushList(); html += `<h4>${trimmed.replace(/^####\s+/, '')}</h4>`; continue; }
    if (/^###\s+/.test(trimmed)) { flushList(); html += `<h3>${trimmed.replace(/^###\s+/, '')}</h3>`; continue; }
    if (/^##\s+/.test(trimmed)) { flushList(); html += `<h2>${trimmed.replace(/^##\s+/, '')}</h2>`; continue; }
    if (/^#\s+/.test(trimmed)) { flushList(); html += `<h1>${trimmed.replace(/^#\s+/, '')}</h1>`; continue; }
    // blockquote
    if (/^>\s?/.test(trimmed)) { flushList(); html += `<blockquote>${trimmed.replace(/^>\s?/, '')}</blockquote>`; continue; }
    // list item
    if (/^[*-]\s+/.test(trimmed)) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${trimmed.replace(/^[*-]\s+/, '')}</li>`; continue;
    }
    // horizontal rule
    if (/^---+$/.test(trimmed)) { flushList(); html += '<hr />'; continue; }
    // paragraph
    flushList();
    let content = escape(trimmed)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[(.+?)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    html += `<p>${content}</p>`;
  }
  flushCode();
  flushList();
  return html;
}

function computeReadTime(words: number): number {
  return Math.max(1, Math.round(words / 200));
}

function deriveExcerpt(body: string): string {
  const withoutHeadings = body.replace(/^[#>].*$/gm, '').trim();
  const para = withoutHeadings.split(/\n\n+/).find(p => p.trim().length > 60) || '';
  return para.replace(/\n/g, ' ').slice(0, 240).trim() + (para.length > 240 ? '…' : '');
}

function normalizeSlug(slug: string): string {
  return slug.replace(/^\/resources\//, '').replace(/^\//, '');
}

export function getAllPosts(): PostMeta[] {
  if (_cache) { return _cache; }
  const files = safeReadDir(BLOG_DIR).filter(f => f.endsWith('.md'));
  const metas: PostMeta[] = [];
  files.forEach(file => {
    const full = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    const { fm, body } = parseFrontMatter(full);
    if (!fm.title || !fm.slug || !fm.category || !fm.publishedDate) { return; }
    const words = body.split(/\s+/).filter(Boolean).length;
    const meta: PostMeta = {
      title: fm.title,
      description: fm.description,
      publishedDate: fm.publishedDate,
      updatedDate: fm.updatedDate || fm.publishedDate,
      author: fm.author || 'TGI Agency Team',
      category: fm.category as BlogCategory,
      tags: fm.tags || [],
      slug: normalizeSlug(fm.slug),
      image: fm.image,
      imageAlt: fm.imageAlt,
      featured: fm.featured ?? false,
      schema: fm.schema ?? true,
      excerpt: deriveExcerpt(body),
      wordCount: words,
      readTimeMinutes: computeReadTime(words)
    };
    metas.push(meta);
  });
  // sort newest first
  metas.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
  _cache = metas;
  return metas;
}

export function getPostBySlug(slug: string): Post | null {
  const s = normalizeSlug(slug);
  if (_fullCache[s]) { return _fullCache[s]; }
  const meta = getAllPosts().find(p => p.slug === s);
  if (!meta) { return null; }
  const fileName = safeReadDir(BLOG_DIR).find(f => fs.readFileSync(path.join(BLOG_DIR, f), 'utf8').includes(`slug: "/resources/${s}"`));
  if (!fileName) { return null; }
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf8');
  const { body } = parseFrontMatter(raw);
  const html = markdownToHtml(body);
  const post: Post = { ...meta, raw: body, html };
  _fullCache[s] = post;
  return post;
}

export function getPostsByCategory(cat?: BlogCategory): PostMeta[] {
  const all = getAllPosts();
  return cat ? all.filter(p => p.category === cat) : all;
}

export function getRelatedPosts(slug: string, count = 3): PostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) { return []; }
  return getAllPosts()
    .filter(p => p.slug !== current.slug && p.category === current.category)
    .slice(0, count);
}

export function generateStaticPostParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}
