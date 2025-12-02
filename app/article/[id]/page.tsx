export const dynamic = "force-dynamic";

import React from "react";
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

interface Article {
  id: number;
  title: string;
  path: string;      // MDXファイルパス
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

async function getLocalArticle(id: number): Promise<Article | null> {
  const lang = "ja";
  const filePath = path.join(process.cwd(), "contents", "articles", lang, `${id}.json`);
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch {
    return null;
  }
}

interface Props {
  params: { id: string };
}

export default async function ArticlePage({ params }: Props) {
  const id = parseInt(params.id);
  const article = await getLocalArticle(id);

  if (!article) return notFound();

  // MDXファイルを読み込む
  const mdxPath = path.join(process.cwd(), article.path);
  const mdxSource = await fs.readFile(mdxPath, "utf8");
  const mdxContent = await serialize(mdxSource);

  return (
    <main className="pt-20 pb-20 bg-black">
      <article className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-300 mb-4">{article.title}</h1>
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
        <div className="prose prose-invert max-w-none">
          <MDXRemote {...mdxContent} />
        </div>
      </article>
    </main>
  );
}
