export const dynamic = "force-dynamic";

import React from "react";
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Article {
  id: number;
  title: string;
  content?: string; // JSON記事
  path?: string; // MDX記事
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

// JSON記事を読む
async function getJsonArticle(id: number): Promise<Article | null> {
  const filePath = path.join(
    process.cwd(),
    "contents",
    "articles",
    "ja",
    `${id}.json`
  );

  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

interface Props {
  params: { id: string };
}

export default async function ArticlePage({ params }: Props) {
  const id = parseInt(params.id);

  // JSON読み込み
  const article = await getJsonArticle(id);
  if (!article) return notFound();

  let body = null;

  // 🔵 MDX記事の場合
  if (article.path) {
    const mdxFullPath = path.join(process.cwd(), article.path);
    const mdxText = await fs.readFile(mdxFullPath, "utf8");
    body = (
      <div className="prose prose-invert max-w-none">
        <MDXRemote source={mdxText} />
      </div>
    );
  }

  // 🟢 JSON記事の場合
  if (article.content) {
    body = (
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    );
  }

  return (
    <main className="pt-20 pb-20 bg-black">
      <article className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-300 mb-4">
          {article.title}
        </h1>

        <div className="text-gray-400 text-sm mb-6">
          <span className="mr-4">公開日: {article.date}</span>
          <span className="mr-4">カテゴリ: {article.category}</span>
          <span>著者: {article.author}</span>
        </div>

        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto rounded-lg mb-6"
          />
        )}

        {body}
      </article>
    </main>
  );
}
