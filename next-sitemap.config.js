module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://calcasi-lp.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calcasi-lp.vercel.app'}/rss.xml`,
    ],
  },
  sitemapSize: 99999, // ← ファイル分割を防ぎ、sitemap.xml一つにまとめる
};
