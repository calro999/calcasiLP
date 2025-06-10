import { getAllArticles } from "@/lib/getAllArticles";
import { getAllStrategies } from "@/lib/getStrategyData";
import { getAllCasinos } from "@/lib/getAllCasinos";
import { NextResponse } from "next/server";

const BASE_URL = "https://calcasi-lp.vercel.app";

export async function GET() {
  const urls: string[] = [];

  // 🔹 静的パス（全ページ）
  const staticPaths = [
    "", "/strategies", "/casino-ranking", "/beginners-guide", "/latest-news",
    "/tools", "/blog", "/terms", "/privacy", "/faq"
  ];

  for (const path of staticPaths) {
    urls.push(
      `<url><loc>${BASE_URL}${path}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`
    );
  }

  // 🔹 記事（Markdown or CMS）
  const articles = await getAllArticles();
  for (const a of articles) {
    if (a.slug && a.date) {
      urls.push(
        `<url><loc>${BASE_URL}${a.slug}</loc><lastmod>${a.date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
      );
    }
  }

  // 🔹 ストラテジー記事（JSONなど）
  const strategies = getAllStrategies();
  for (const s of strategies) {
    if (s.slug && s.date) {
      urls.push(
        `<url><loc>${BASE_URL}${s.slug}</loc><lastmod>${s.date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
      );
    }
  }

  // 🔹 カジノ詳細ページ
  const casinos = await getAllCasinos("ja");
  for (const c of casinos) {
    const slug = `/casino-${c.id}`;
    urls.push(
      `<url><loc>${BASE_URL}${slug}</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`
    );
  }

  // 🔹 XML生成
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
