/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["calcasi-lp.vercel.app"],
  },
  // Vercel上のサーバーにフォルダを保持させる魔法の設定
  outputFileTracingIncludes: {
    '/sitemap.xml': [
      './contents/**/*',
      './data/games/**/*'
    ],
  },
};

module.exports = nextConfig;