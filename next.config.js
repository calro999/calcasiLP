/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["calcasi-lp.vercel.app"],
  },
  // サーバーサイドでfsを使うための設定
  outputFileTracingIncludes: {
    '/sitemap.xml': ['./contents/**/*', './data/games/**/*'],
  },
}
module.exports = nextConfig