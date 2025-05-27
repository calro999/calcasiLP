import { getAllArticles } from "@/lib/getAllArticles";
import { NextResponse } from "next/server";

const BASE_URL = "https://calcasi-lp.vercel.app";

const STATIC_PATHS = [
  "", // /
  "/strategies",
  "/casino-ranking",
  "/beginners-guide",
  "/latest-news",
];

export async function GET() {
  let urls: string[] = [];

  // 🔹 静的ページのURL
  for (const path of STATIC_PATHS) {
    const loc = `${BASE_URL}${path}`;
    urls.push(`
      <url>
        <loc>${loc}</loc>
        <changefreq>weekly</changefreq>
      </url>
    `);
  }

  // 🔹 記事を処理
  const articles = await getAllArticles();
  for (const article of articles) {
    urls.push(`
      <url>
        <loc>${BASE_URL}${article.slug}</loc>
        <lastmod>${article.date}</lastmod>
        <changefreq>monthly</changefreq>
      </url>
    `);
  }

  // 🔹 XML生成
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
