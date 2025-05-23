// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://calcasi-lp.vercel.app/',
  generateRobotsTxt: true, // ← robots.txt も作る
  generateIndexSitemap: false, // インデックス用sitemapは不要ならfalse
};
