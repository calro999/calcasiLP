/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["calcasi-lp.vercel.app"],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap", // App Router の /app/sitemap/route.ts に対応
      },
    ];
  },
};

module.exports = nextConfig;
