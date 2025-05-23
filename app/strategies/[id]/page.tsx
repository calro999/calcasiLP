// /workspaces/calcasiLP/app/article/[id]/page.tsx
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Calendar, User, Clock, Tag } from "lucide-react";
import Shimmer from "@/components/animations/shimmer"; // 必要に応じてパスを調整
import ScrollAnimation from "@/components/animations/scroll-animation"; // 必要に応じてパスを調整
import Particles from "@/components/animations/particles"; // 必要に応じてパスを調整

// 動的なセグメントを生成するための関数 (SSGの場合)
export async function generateStaticParams() {
  const articlesDirectory = path.join(process.cwd(), 'contents/articles');
  try {
    const filenames = fs.readdirSync(articlesDirectory);
    return filenames.map(filename => ({
      id: filename.replace(/\.json$/, ''),
    }));
  } catch (error) {
    console.error("Error reading articles directory:", error);
    return []; // ディレクトリがない場合は空の配列を返す
  }
}

// 各記事の詳細ページコンポーネント
export default async function ArticleDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const filePath = path.join(process.cwd(), 'contents/articles', `${id}.json`);

  let article;
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    article = JSON.parse(fileContents);
  } catch (error) {
    // ファイルが見つからないか、JSONパースエラーの場合は404ページを表示
    notFound();
  }

  if (!article) {
    notFound();
  }

  return (
    <main className="pt-20 pb-20 bg-black text-white relative overflow-hidden">
      <Particles className="absolute inset-0 z-0" count={100} color="rgba(255, 215, 0, 0.2)" />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation variant="fadeInDown">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <Shimmer>
                <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                  {article.title}
                </span>
              </Shimmer>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {article.description}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation variant="fadeInUp" delay={0.2}>
          <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 md:p-8 mb-10 shadow-lg">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-6">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-gray-300">
              <div className="flex items-center">
                <Calendar size={20} className="mr-2 text-amber-400" />
                公開日: {article.publishedDate || "N/A"}
              </div>
              <div className="flex items-center">
                <User size={20} className="mr-2 text-amber-400" />
                著者: {article.author || "N/A"}
              </div>
              <div className="flex items-center">
                <Clock size={20} className="mr-2 text-amber-400" />
                読了時間: {article.readTime || "N/A"}分
              </div>
              <div className="flex items-center">
                <Tag size={20} className="mr-2 text-amber-400" />
                カテゴリ: {article.category || "N/A"}
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-gray-300">
              {/* ここに記事の詳細コンテンツをレンダリングします */}
              <div dangerouslySetInnerHTML={{ __html: article.contentHtml || `<p><span class="math-inline">\{article\.description\}</p\><p\>ここに</span>{article.title}の詳細コンテンツが入ります。</p>` }} />
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation variant="fadeInUp" delay={0.3}>
          <div className="text-center mt-10">
            <Link
              href="/article"
              className="inline-flex items-center justify-center px-6 py-3 border border-amber-500 text-amber-500 rounded-full hover:bg-amber-500 hover:text-black transition-colors duration-300 shadow-lg hover:shadow-amber-500/30"
            >
              <ChevronLeft size={20} className="mr-2" />
              記事一覧に戻る
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </main>
  );
}