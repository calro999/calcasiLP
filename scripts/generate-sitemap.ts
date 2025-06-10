import fs from "fs";
import path from "path";
import { getAllArticles } from "../lib/getAllArticles";
import { getAllStrategies } from "../lib/getStrategyData";
import { getAllCasinos } from "../lib/getAllCasinos";

const BASE_URL = "https://calcasi-lp.vercel.app";

async function generateSitemap() {
  const urls: string[] = [];

  // 🔹 静的ページ
  const staticPaths = [
    "", // /
    "/strategies",
    "/casino-ranking",
    "/beginners-guide",
    "/latest-news",
    "/tools",
    "/blog",
    "/terms",
    "/privacy",
    "/faq"
  ];

  for (const pathItem of staticPaths) {
    urls.push(
      `<url><loc>${BASE_URL}${pathItem}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`
    );
  }

  // 🔹 Markdown / CMS 記事
  const articles = await getAllArticles();
  for (const article of articles) {
    if (article.slug && article.date) {
      urls.push(
        `<url><loc>${BASE_URL}${article.slug}</loc><lastmod>${article.date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
      );
    }
  }

  // 🔹 ストラテジー（JSON等）
  const strategies = getAllStrategies();
  for (const strategy of strategies) {
    const slug = strategy.slug || `/strategies/${strategy.id}`;
    if (slug && strategy.date) {
      urls.push(
        `<url><loc>${BASE_URL}${slug}</loc><lastmod>${strategy.date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
      );
    }
  }

  // 🔹 カジノ詳細ページ
  const casinos = await getAllCasinos("ja");
  for (const casino of casinos) {
    const slug = `/casino-${casino.id}`;
    urls.push(
      `<url><loc>${BASE_URL}${slug}</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`
    );
  }

  // 🔹 XML 全体生成
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  // 🔹 public/sitemap.xml に出力
  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml, "utf-8");
  console.log("✅ sitemap.xml を public/ に生成しました。");
}

generateSitemap();
