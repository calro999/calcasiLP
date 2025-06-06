import { getAllArticles } from "@/lib/getAllArticles";
import { getAllStrategies } from "@/lib/getStrategyData";
import { NextResponse } from "next/server";

const BASE_URL = "https://calcasi-lp.vercel.app";

export async function GET() {
  const urls: string[] = [];

  const staticPaths = [
    "", "/strategies", "/casino-ranking", "/beginners-guide", "/latest-news",
  ];

  for (const path of staticPaths) {
    urls.push(`<url><loc>${BASE_URL}${path}</loc><changefreq>weekly</changefreq></url>`);
  }

  const articles = await getAllArticles();
  for (const a of articles) {
    if (a.slug && a.date) {
      urls.push(`<url><loc>${BASE_URL}${a.slug}</loc><lastmod>${a.date}</lastmod><changefreq>monthly</changefreq></url>`);
    }
  }

  const strategies = getAllStrategies();
  for (const s of strategies) {
    if (s.slug && s.date) {
      urls.push(`<url><loc>${BASE_URL}${s.slug}</loc><lastmod>${s.date}</lastmod><changefreq>monthly</changefreq></url>`);
    }
  }

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
