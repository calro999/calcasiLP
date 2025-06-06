// scripts/generate-sitemap.ts
import fs from "fs";
import path from "path";
import { getAllArticles } from "../lib/getAllArticles";
import { getAllStrategies } from "../lib/getStrategyData";

const BASE_URL = "https://calcasi-lp.vercel.app";

async function generateSitemap() {
  const urls: string[] = [];

  // 静的ページ
  const staticPaths = [
    "", "/strategies", "/casino-ranking", "/beginners-guide", "/latest-news"
  ];
  for (const path of staticPaths) {
    urls.push(`<url><loc>${BASE_URL}${path}</loc><changefreq>daily</changefreq><priority>0.7</priority></url>`);
  }

  // 記事（Markdown）
  const articles = await getAllArticles();
  for (const article of articles) {
    if (article.slug && article.date) {
      urls.push(`<url><loc>${BASE_URL}${article.slug}</loc><lastmod>${article.date}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>`);
    }
  }

  // 戦略記事（JSON）
  const strategies = getAllStrategies();
  for (const strategy of strategies) {
    const slug = strategy.slug || `/strategies/${strategy.id}`;
    if (slug && strategy.date) {
      urls.push(`<url><loc>${BASE_URL}${slug}</loc><lastmod>${strategy.date}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap-0.xml"), xml, "utf-8");
  console.log("✅ sitemap-0.xml を public/ に生成しました。");
}

generateSitemap();
