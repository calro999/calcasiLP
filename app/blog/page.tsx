// app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">
      <h1 className="text-4xl font-bold mb-10 text-white">ブログ記事一覧</h1>
      <div className="flex flex-col gap-10">
        {posts.map((post) => (
          <div key={post.slug} className="border-b border-gray-700 pb-6">
            <Link
              href={`/blog/${post.slug}`}
              className="text-amber-400 hover:underline text-2xl font-semibold"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-400 mt-1">{post.date}</p>
            <p className="text-gray-300 mt-3 text-base leading-relaxed">
              {post.excerpt || "この記事の内容を表示するにはクリックしてください。"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
