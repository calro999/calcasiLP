/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["calcasi-lp.vercel.app"],
  },
  // ✅ i18n 完全削除済み
};
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap", // 実際のroute.tsの場所
      },
    ];
  },
};


module.exports = nextConfig;
