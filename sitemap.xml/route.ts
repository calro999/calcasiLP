// /app/sitemap.xml/route.ts
import { getAllArticles } from "@/lib/getAllArticles";
import { NextResponse } from "next/server";

const BASE_URL = "https://calcasi-lp.vercel.app";

export async function GET() {
  const articles = await getAllArticles();

  const staticPages = [
    "",
    "/latest-news",
    "/beginners-guide",
    "/strategies",
    "/casino-ranking",
  ];

  const urls = [
    ...staticPages.map(path => `
      <url>
        <loc>${BASE_URL}${path}</loc>
        <changefreq>weekly</changefreq>
      </url>
    `),

    ...articles.map(article => `
      <url>
        <loc>${BASE_URL}${article.slug}</loc>
        <lastmod>${article.date}</lastmod>
        <changefreq>monthly</changefreq>
      </url>
    `),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("\n")}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
