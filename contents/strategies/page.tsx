import DiceGame from "@/components/DiceGame"; 
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  const filePath = path.join(process.cwd(), `contents/strategies/${params.id}.json`);
  if (!fs.existsSync(filePath)) notFound();

  const article = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const showDiceGame = article.includeDiceGame === true;

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-2">著者：{article.author} ／ 投稿日：{article.date}</p>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {showDiceGame && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-2">🎲 実際に遊んでみよう！</h2>
          <DiceGame />
        </div>
      )}
    </main>
  );
}
