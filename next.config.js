/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['your-domain.com'],
  },

  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname); // ✅ 追加
    return config;
  },
};

module.exports = nextConfig;
