import { getAllArticles } from "@/lib/getAllArticles";
import { NextResponse } from "next/server";

export async function GET() {
  const LOCALES = ["ja", "en"];
  const items: string[] = [];

  for (const locale of LOCALES) {
    const articles = await getAllArticles(locale as "ja" | "en");
    for (const article of articles) {
      items.push(`
        <item>
          <title>${article.title}</title>
          <link>https://calcasi-lp.vercel.app${article.slug}</link>
          <guid isPermaLink="true">https://calcasi-lp.vercel.app${article.slug}</guid>
          <pubDate>${new Date(article.date).toUTCString()}</pubDate>
          <description><![CDATA[${article.excerpt}]]></description>
        </item>
      `);
    }
  }

  const xml = `
    <rss version="2.0">
      <channel>
        <title>calcasiどっとこむ最新記事</title>
        <link>https://calcasi-lp.vercel.app</link>
        <description>カジノ攻略・ガイド・最新情報</description>
        ${items.join("\n")}
      </channel>
    </rss>
  `.trim();

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
