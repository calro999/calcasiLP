import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ScrollAnimation from "@/components/ScrollAnimation";
import fs from "fs/promises";
import path from "path";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
}

type PageProps = {
  params: {
    id: string;
  };
};

async function getLocalArticleById(id: string): Promise<Article | null> {
  const baseDir = path.join(process.cwd(), "contents", "articles");
  const categories = await fs.readdir(baseDir);

  for (const category of categories) {
    const filePath = path.join(baseDir, category, `${id}.json`);
    try {
      const file = await fs.readFile(filePath, "utf8");
      const article: Article = JSON.parse(file);
      return { ...article, category };
    } catch {
      continue;
    }
  }

  return null;
}

async function getWordPressArticleById(id: string): Promise<Article | null> {
  try {
    const res = await fetch(`https://yourname.epizy.com/wp-json/wp/v2/posts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    const post = await res.json();

    return {
      id: post.id,
      title: post.title.rendered,
      excerpt: post.excerpt?.rendered || "",
      image: "/no-image.jpg", // 画像がない場合の仮画像
      category: post.categories?.[0]?.name || "WordPress",
      date: new Date(post.date).toLocaleDateString("ja-JP"),
      readTime: "約3分",
      author: post.author || "WordPress",
      content: post.content.rendered,
    };
  } catch (e) {
    return null;
  }
}

export default async function Page({ params }: PageProps) {
  const id = parseInt(params.id, 10);

  const article =
    id <= 11
      ? await getLocalArticleById(params.id)
      : await getWordPressArticleById(params.id);

  if (!article) return notFound();

  return (
    <main className="pt-20 pb-20 bg-black">
      <section className="bg-gray-900 py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <ScrollAnimation variant="fadeInUp" delay={0}>
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6 md:p-8">
              <div className="mb-6">
                <Link
                  href="/latest-news"
                  className="text-blue-400 hover:underline text-sm flex items-center mb-4"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  最新情報一覧に戻る
                </Link>
                <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full mb-4">
                  {article.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{article.title}</h1>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span className="mr-4">公開日: {article.date}</span>
                  <span className="mr-4">読了時間: {article.readTime}</span>
                  <span>著者: {article.author}</span>
                </div>
              </div>

              <div className="relative mb-6">
                <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div
                className="prose prose-invert max-w-none text-gray-300"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  );
}
