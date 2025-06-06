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
    urls.push(`<url><loc>${BASE_URL}${path}</loc><changefreq>weekly</changefreq></url>`);
  }

  // 記事（Markdown）
  const articles = await getAllArticles();
  for (const article of articles) {
    if (article.slug && article.date) {
      urls.push(`<url><loc>${BASE_URL}${article.slug}</loc><lastmod>${article.date}</lastmod><changefreq>monthly</changefreq></url>`);
    }
  }

  // 戦略記事（JSON）
  const strategies = getAllStrategies();
  for (const strategy of strategies) {
    if (strategy.slug && strategy.date) {
      urls.push(`<url><loc>${BASE_URL}${strategy.slug}</loc><lastmod>${strategy.date}</lastmod><changefreq>monthly</changefreq></url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml, "utf-8");
  console.log("✅ sitemap.xml を public/ に生成しました。");
}

generateSitemap();
