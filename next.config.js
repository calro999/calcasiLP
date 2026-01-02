/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["calcasi-lp.vercel.app"],
  },
  // Vercelにdata/games内の.tsファイルを認識させる
  outputFileTracingIncludes: {
    '/sitemap.xml': ['./data/games/**/*'],
  },
  // 以前の sitemap.xml の rewrite は必ず削除してください
};

module.exports = nextConfig;