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
  // ❌ これがあったら削除すること！
  // output: "export", ← これが入っていたらビルド失敗します
};

module.exports = nextConfig;
