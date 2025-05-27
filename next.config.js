/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["ja", "en"],
    defaultLocale: "ja",
    localeDetection: false,
  },
  images: {
    domains: ["calcasi-lp.vercel.app"],
  },
};

module.exports = nextConfig;
