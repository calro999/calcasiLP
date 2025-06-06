/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["calcasi-lp.vercel.app"],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap", // /app/sitemap/route.ts
      },
    ];
  },
};

module.exports = nextConfig;
