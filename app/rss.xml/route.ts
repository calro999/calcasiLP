import { getAllArticles } from "@/lib/getAllArticles";
import { NextResponse } from "next/server";

export async function GET() {
  // getAllArticles() を呼び出し（内部でパス修正済み）
  const articles = await getAllArticles();
  const items: string[] = [];

  const BASE_URL = 'https://calcasi-lp.vercel.app';

  for (const article of articles) {
    // lib側で既に "/article/slug" という形式になっているため、ドメインを付けるだけ
    const fullLink = `${BASE_URL}${article.slug}`;

    items.push(`
      <item>
        <title><![CDATA[${article.title}]]></title>
        <link>${fullLink}</link>
        <guid isPermaLink="true">${fullLink}</guid>
        <pubDate>${new Date(article.date).toUTCString()}</pubDate>
        <description><![CDATA[${article.excerpt}]]></description>
      </item>
    `);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>calcasiどっとこむ最新記事</title>
        <link>${BASE_URL}</link>
        <description>オンラインカジノ攻略・ガイド・最新情報</description>
        <language>ja</language>
        <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
        ${items.join("\n")}
      </channel>
    </rss>
  `.trim();

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}