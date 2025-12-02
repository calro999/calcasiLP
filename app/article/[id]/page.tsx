// app/article/[id]/page.tsx
export const dynamic = "force-dynamic";

import React from "react";
import { notFound } from "next/navigation";
import { articles } from "@/contents/articles/ja/meta";

interface Props {
  params: { id: string };
}
interface ArticleMapItem {
  id: number;
  title: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  component: any; // or React.ComponentType
}

export default function ArticlePage({ params }: Props) {
  const idStr = params.id; // URL の id は文字列
  const article: ArticleMapItem | undefined = articles[idStr];

  if (!article) {
    return notFound();
  }

  const ArticleComponent = article.component;

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
          // Next.js Image を使うなら width/height が必要。ここではシンプルに img を使用しています
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto rounded-lg mb-6"
          />
        )}

        <div className="prose prose-invert max-w-none">
          {/* MDXコンポーネントを直接レンダリング */}
          <ArticleComponent />
        </div>
      </article>
    </main>
  );
}
