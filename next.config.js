/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Removed deprecated eslint configuration (Next.js 16 no longer supports eslint key here)
  images: { unoptimized: true },
};

module.exports = nextConfig;
