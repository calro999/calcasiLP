const fs = require('fs');
const path = require('path');

module.exports = {
  siteUrl: 'https://calcasi-lp.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  additionalPaths: async (config) => {
    const result = [];

    // ✅ strategies/*.json → /strategies/[id]
    const strategiesDir = path.join(__dirname, 'contents', 'strategies');
    if (fs.existsSync(strategiesDir)) {
      const strategyFiles = fs.readdirSync(strategiesDir);
      strategyFiles.forEach((file) => {
        const id = path.parse(file).name;
        result.push({
          loc: `/strategies/${id}`,
          changefreq: 'daily',
          priority: 0.7,
        });
      });
    }

    // ✅ articles/*.json → /article/[id]
    const articlesDir = path.join(__dirname, 'contents', 'articles');
    if (fs.existsSync(articlesDir)) {
      const articleFiles = fs.readdirSync(articlesDir);
      articleFiles.forEach((file) => {
        const id = path.parse(file).name;
        result.push({
          loc: `/article/${id}`,
          changefreq: 'daily',
          priority: 0.7,
        });
      });
    }

    // ✅ blog/*.md → /blog/[slug]
    const blogDir = path.join(__dirname, 'contents', 'blog');
    if (fs.existsSync(blogDir)) {
      const blogFiles = fs.readdirSync(blogDir);
      blogFiles.forEach((file) => {
        const match = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
        if (match) {
          const [, date, slug] = match;
          result.push({
            loc: `/blog/${slug}`,
            changefreq: 'daily',
            priority: 0.7,
          });
        }
      });
    }

    return result;
  },
};
