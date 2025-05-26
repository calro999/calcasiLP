// /app/sitemap.xml/route.ts
import { getAllArticles } from "@/lib/getAllArticles";
import { NextResponse } from "next/server";

const BASE_URL = "https://calcasi-lp.vercel.app";
const LOCALES = ["ja", "en"];

const STATIC_PATHS = [
  "", // /
  "/strategies",
  "/casino-ranking",
  "/beginners-guide",
  "/latest-news",
];

// ヘルパー：全ロケールでのURLを返す
function generateHreflangLinks(path: string): string {
  return LOCALES.map((locale) => {
    const prefix = locale === "ja" ? "" : `/${locale}`;
    return `<xhtml:link rel="alternate" hreflang="${locale}" href="${BASE_URL}${prefix}${path}" />`;
  }).join("\n");
}

export async function GET() {
  let urls: string[] = [];

  // 🔹 静的ページのURLとhreflang対応
  for (const path of STATIC_PATHS) {
    const loc = `${BASE_URL}${path}`;
    urls.push(`
      <url>
        <loc>${loc}</loc>
        ${generateHreflangLinks(path)}
        <changefreq>weekly</changefreq>
      </url>
    `);
  }

  // 🔹 動的記事（IDベース）を処理
  const allArticles: { [slug: string]: { [locale: string]: any } } = {};

  for (const locale of LOCALES) {
    const articles = await getAllArticles(locale);
    for (const article of articles) {
      const key = `${article.category}/${article.id}`;
      if (!allArticles[key]) {
        allArticles[key] = {};
      }
      allArticles[key][locale] = article;
    }
  }

  // 🔹 各記事グループごとに <url> 要素を生成（多言語対応）
  for (const key in allArticles) {
    const articleGroup = allArticles[key];
    const defaultArticle = articleGroup["ja"] || Object.values(articleGroup)[0];
    const loc = `${BASE_URL}${defaultArticle.slug}`;

    const hreflangs = Object.entries(articleGroup)
      .map(([locale, article]) => {
        return `<xhtml:link rel="alternate" hreflang="${locale}" href="${BASE_URL}${article.slug}" />`;
      })
      .join("\n");

    urls.push(`
      <url>
        <loc>${loc}</loc>
        ${hreflangs}
        <lastmod>${defaultArticle.date}</lastmod>
        <changefreq>monthly</changefreq>
      </url>
    `);
  }

  // 🔹 XML生成
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
