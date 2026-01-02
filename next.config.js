/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["calcasi-lp.vercel.app"],
  },
  // Vercel上のサーバーに data/games フォルダのファイルを保持させる設定
  outputFileTracingIncludes: {
    '/sitemap.xml': ['./data/games/**/*'],
  },
  // 【重要】rewrites セクションを削除しました
};

module.exports = nextConfig;