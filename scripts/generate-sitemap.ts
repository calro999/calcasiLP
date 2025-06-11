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

  // 🔹 記事ページ（/article/10）
  const articles = await getAllArticles("ja");
  for (const article of articles) {
    const slug = `/article/${article.id}`;

    let imageTag = "";
    if (article.image) {
      const imageUrl = article.image.startsWith("http")
        ? article.image
        : `${BASE_URL}${article.image}`;
      imageTag = `
  <image:image>
    <image:loc>${imageUrl}</image:loc>
    <image:title>${escapeXml(article.title)}</image:title>
  </image:image>`;
    }

    urls.push(
      `<url>
  <loc>${BASE_URL}${slug}</loc>
  <lastmod>${article.date}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>${imageTag}
</url>`
    );
  }

  // 🔹 ストラテジー記事
  const strategies = getAllStrategies();
  for (const strategy of strategies) {
    const slug = strategy.slug || `/strategies/${strategy.id}`;
    let imageTag = "";

    if (strategy.image) {
      const imageUrl = strategy.image.startsWith("http")
        ? strategy.image
        : `${BASE_URL}${strategy.image}`;
      imageTag = `
  <image:image>
    <image:loc>${imageUrl}</image:loc>
    <image:title>${escapeXml(strategy.title)}</image:title>
  </image:image>`;
    }

    urls.push(
      `<url>
  <loc>${BASE_URL}${slug}</loc>
  <lastmod>${strategy.date}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>${imageTag}
</url>`
    );
  }

  // 🔹 カジノ詳細ページ
  const casinos = await getAllCasinos("ja");
  for (const casino of casinos) {
    const slug = `/casino-${casino.id}`;
    urls.push(
      `<url>
  <loc>${BASE_URL}${slug}</loc>
  <changefreq>weekly</changefreq>
  <priority>0.6</priority>
</url>`
    );
  }

  // 🔹 sitemap を保存
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap-fixed.xml"), xml, "utf-8");
  console.log("✅ sitemap-fixed.xml を public/ に生成しました。");
}

// 🔹 XMLエスケープ
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

generateSitemap();
