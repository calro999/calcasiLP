// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 出力形式が `export`（静的）であれば、明示しておく
  // output: 'export', ← 必要に応じて追加（通常は不要）

  // 将来的に画像最適化が必要ならここも設定できます
  images: {
    domains: ['your-domain.com'], // 画像をCDNで配信する場合
  },
};

module.exports = nextConfig;
