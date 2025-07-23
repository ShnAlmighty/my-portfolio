/**
 * Next.js configuration with bundle analyzer
 */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js configuration
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['shantanupatnaik.dev'],
    formats: ['image/avif', 'image/webp'],
  },
  // Add any other configuration options here
};

module.exports = withBundleAnalyzer(nextConfig);