// /next.config.js
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-domain.com'],
  },
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    localeDetection: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;
