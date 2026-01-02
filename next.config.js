/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["calcasi-lp.vercel.app"],
  },
  // Vercel上のサーバーに data/games フォルダのファイルを保持させる設定
  outputFileTracingIncludes: {
    '/sitemap.xml': ['./data/games/**/*'],
  },
  // 以前の sitemap.xml の rewrite は削除しました（標準機能を使うため）
};

module.exports = nextConfig;