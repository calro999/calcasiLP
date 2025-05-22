// components/layouts/ArticleLayout.tsx

import React from 'react';
import Link from 'next/link';

interface ArticleLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function ArticleLayout({ children, title }: ArticleLayoutProps) {
  return (
    <div className="container mx-auto p-8 pt-20 pb-20 bg-black text-white min-h-screen">
      <Link href="/latest-news" className="text-amber-400 hover:underline mb-8 block text-lg">
        &larr; 最新情報一覧へ戻る
      </Link>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-amber-300">{title}</h1>
      <div className="prose prose-invert max-w-none text-gray-300">
        {children}
      </div>
    </div>
  );
}