// /app/rss.xml/route.ts
import { getAllArticles } from "@/lib/getAllArticles";
import { NextResponse } from "next/server";

const BASE_URL = "https://calcasi-lp.vercel.app";
const LOCALES = ["ja", "en"];

function escapeXml(str: string) {
  return str.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return char;
    }
  });
}

export async function GET() {
  let items: string[] = [];

  for (const locale of LOCALES) {
    const articles = await getAllArticles(locale);
    for (const article of articles) {
      items.push(`
        <item>
          <title>${escapeXml(article.title)}</title>
          <link>${BASE_URL}${article.slug}</link>
          <guid>${BASE_URL}${article.slug}</guid>
          <description>${escapeXml(article.excerpt)}</description>
          <pubDate>${new Date(article.date).toUTCString()}</pubDate>
        </item>
      `);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Calcasi Online Casino Articles</title>
    <link>${BASE_URL}</link>
    <description>Latest articles from Calcasi</description>
    ${items.join("\n")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
