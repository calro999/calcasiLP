// app/latest-news/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';

export default function LatestNews() {
  // 注目記事データ
  const featuredArticles = [
    {
      id: 1,
      title: "2025年最新！おすすめオンラインカジノランキングTOP10",
      excerpt: "オンラインカジノ業界は常に進化しており、新しいカジノの登場や既存サイトのサービス改善が日々行われています。この記事では、2025年版の最新情報を基に、当サイトが厳選したおすすめオンラインカジノTOP10を徹底解説します。",
      image: "/placeholder.svg", // 画像パスはplaceholder.svgを使用
      category: "ランキング",
      date: "2023-05-15",
      readTime: "10分",
    },
    {
      id: 2,
      title: "初心者必見！オンラインカジノの始め方完全ガイド",
      excerpt: "オンラインカジノに興味はあるけれど、どうやって始めたらいいかわからない…という方も多いのではないでしょうか。この記事では、オンラインカジノを始めるためのステップを、初心者の方にも分かりやすく解説します。",
      image: "/placeholder.svg", // 画像パスはplaceholder.svgを使用
      category: "初心者ガイド",
      date: "2023-05-10",
      readTime: "8分",
    },
    {
      id: 3,
      title: "勝率アップ！バカラの必勝法と攻略テクニック",
      excerpt: "カジノの王様とも呼ばれるバカラは、シンプルながら奥深いゲームで、世界中のプレイヤーを魅了しています。この記事では、バカラで勝率を上げるための基本的な知識から、実践的な必勝法や攻略テクニックまでを詳しく解説します。",
      image: "/placeholder.svg", // 画像パスはplaceholder.svgを使用
      category: "攻略法",
      date: "2023-05-08",
      readTime: "12分",
    },
  ];

  // 最新記事データ
  const latestArticles = [
    {
      id: 4,
      title: "ワンダーカジノのサイトがリニューアルしました！", // タイトルを修正
      excerpt: "ワンダーカジノで、期間限定の超お得なボーナスキャンペーンがスタート！初回入金ボーナスやキャッシュバックが大幅にアップし、既存プレイヤーにも嬉しい特典が満載です。", // 説明文を修正
      image: "/placeholder.svg", // 画像パスはplaceholder.svgを使用
      category: "ボーナス情報",
      date: "2023-05-01",
      readTime: "5分",
    },
    {
      id: 5,
      title: "仮想通貨対応カジノのメリット・デメリット徹底比較",
      excerpt: "近年、オンラインカジノでの仮想通貨利用が急速に拡大しています。匿名性や高速な入出金が魅力ですが、変動リスクなどのデメリットも存在します。主要な仮想通貨対応カジノを比較し、それぞれの特徴を解説。",
      image: "/placeholder.svg", // 画像パスはplaceholder.svgを使用
      category: "決済方法",
      date: "2023-04-28",
      readTime: "7分",
    },
    {
      id: 6,
      title: "ライブカジノでディーラーと交流！おすすめゲーム5選",
      excerpt: "臨場感あふれるライブカジノは、まるで本物のカジノにいるかのような体験ができます。美人ディーラーとのチャットも可能！ブラックジャック、ルーレット、バカラなど、人気のライブカジノゲームを紹介します。",
      image: "/placeholder.svg", // 画像パスはplaceholder.svgを使用
      category: "ゲーム紹介",
      date: "2023-04-25",
      readTime: "9分",
    },
  ];

  return (
    <main className="pt-20 pb-20 bg-black">
      <Header />
      <section className="bg-gray-900 py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <ScrollAnimation variant="fadeInUp" delay={0}>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-300 mb-12">
              最新情報
            </h2>
          </ScrollAnimation>

          {/* 注目記事セクション */}
          <ScrollAnimation variant="fadeInUp" delay={0.2}>
            <h3 className="text-3xl font-bold text-white mb-8 border-l-4 border-amber-500 pl-4">
              注目記事
            </h3>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featuredArticles.map((article, index) => (
              <ScrollAnimation key={article.id} variant="fadeInUp" delay={index * 0.1}>
                {/* ここを静的なパスに変更 */}
                <Link href={`/article/${article.id}`} className="block h-full">
                  <div className="bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:translate-y-[-5px]">
                    <div className="relative">
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-gray-500 text-xs">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>

          {/* 最新記事セクション */}
          <ScrollAnimation variant="fadeInUp" delay={0.3}>
            <h3 className="text-3xl font-bold text-white mb-8 border-l-4 border-amber-500 pl-4">
              最新記事
            </h3>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article, index) => (
              <ScrollAnimation key={article.id} variant="fadeInUp" delay={index * 0.1}>
                {/* ここを静的なパスに変更 */}
                <Link href={`/article/${article.id}`} className="block h-full">
                  <div className="bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:translate-y-[-5px]">
                    <div className="relative">
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-gray-500 text-xs">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}