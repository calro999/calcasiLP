import fs from "fs/promises";
import path from "path";
import { escapeXml, SITE_URL, stripHtmlTags } from "@/lib/seo";

type FeedItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export const revalidate = 3600;

async function collectArticleItems(): Promise<FeedItem[]> {
  const dir = path.join(process.cwd(), "contents", "articles");
  const files = await fs.readdir(dir);

  const items = await Promise.all(
    files
      .filter((f) => f.endsWith(".json"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        const article = JSON.parse(raw);
        const slug = article.ogUrl
          ? article.ogUrl.split("/").filter(Boolean).pop()
          : String(article.id);
        const link = `${SITE_URL}/article/${slug}`;
        return {
          title: article.metaTitle || article.title,
          link,
          description:
            article.metaDescription ||
            stripHtmlTags(article.content || "").slice(0, 180),
          pubDate: new Date(article.date || Date.now()).toUTCString(),
        } satisfies FeedItem;
      }),
  );

  return items;
}

async function collectStrategyItems(): Promise<FeedItem[]> {
  const dir = path.join(process.cwd(), "contents", "strategies");
  const files = await fs.readdir(dir);

  const items = await Promise.all(
    files
      .filter((f) => f.endsWith(".json"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        const strategy = JSON.parse(raw);
        const slug = strategy.ogUrl
          ? strategy.ogUrl.split("/").filter(Boolean).pop()
          : String(strategy.id);
        const link = `${SITE_URL}/strategies/${slug}`;
        return {
          title: strategy.metaTitle || strategy.title,
          link,
          description:
            strategy.metaDescription ||
            stripHtmlTags(strategy.content || "").slice(0, 180),
          pubDate: new Date(strategy.date || Date.now()).toUTCString(),
        } satisfies FeedItem;
      }),
  );

  return items;
}

async function collectBlogItems(): Promise<FeedItem[]> {
  const dir = path.join(process.cwd(), "contents", "blog");
  const files = await fs.readdir(dir);

  const items = await Promise.all(
    files
      .filter((f) => f.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        const titleLine = raw.match(/^title:\s*(.+)$/m)?.[1]?.trim() || file;
        const dateLine = raw.match(/^date:\s*(.+)$/m)?.[1]?.trim();
        const descLine = raw.match(/^description:\s*(.+)$/m)?.[1]?.trim();
        const slug = file.replace(/\.md$/, "");
        return {
          title: titleLine,
          link: `${SITE_URL}/blog/${slug}`,
          description: descLine || "Latest casino strategy post.",
          pubDate: new Date(dateLine || Date.now()).toUTCString(),
        } satisfies FeedItem;
      }),
  );

  return items;
}

export async function GET() {
  const [articleItems, strategyItems, blogItems] = await Promise.all([
    collectArticleItems(),
    collectStrategyItems(),
    collectBlogItems(),
  ]);
  const allItems = [...articleItems, ...strategyItems, ...blogItems]
    .sort((a, b) => +new Date(b.pubDate) - +new Date(a.pubDate))
    .slice(0, 100);

  const xmlItems = allItems
    .map(
      (item) => `
        <item>
          <title>${escapeXml(item.title)}</title>
          <link>${escapeXml(item.link)}</link>
          <guid>${escapeXml(item.link)}</guid>
          <description>${escapeXml(item.description)}</description>
          <pubDate>${escapeXml(item.pubDate)}</pubDate>
        </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Calcasi Canada</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>Latest casino rankings, strategies, and blog updates for Canada.</description>
    <language>en-ca</language>
    ${xmlItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
