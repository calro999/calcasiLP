// app/article-slug/[slug]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ScrollAnimation from "@/components/ScrollAnimation"; // ※なければ削除OK

export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    slug: string;
  };
};

type WPPost = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  author: number;
};

export default async function Page({ params }: PageProps) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/wp-posts?slug=${params.slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Failed to fetch from proxy:", res.status);
      return notFound();
    }

    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) return notFound();

    const post: WPPost = posts[0];
    const formattedDate = new Date(post.date).toLocaleDateString("ja-JP");

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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    最新情報一覧に戻る
                  </Link>
                  <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full mb-4">
                    WordPress
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {post.title.rendered}
                  </h1>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <span className="mr-4">公開日: {formattedDate}</span>
                    <span className="mr-4">読了時間: 約3分</span>
                    <span>著者: {post.author}</span>
                  </div>
                </div>

                <div className="relative mb-6">
                  <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
                    <Image
                      src="/no-image.jpg"
                      alt="記事画像"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div
                  className="prose prose-invert max-w-none text-gray-300"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("WordPress fetch error:", error);
    return notFound();
  }
}
