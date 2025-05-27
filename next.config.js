/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["ja", "en"],
    defaultLocale: "ja",
    localeDetection: false, // 手動で /ja にリダイレクトするので false
  },
  images: {
    domains: ["calcasi-lp.vercel.app"],
  },
  // ✅ output: "export" は削除
  // ✅ 必要に応じて experimental 機能や compiler 設定を追加してもOK
};

module.exports = nextConfig;
