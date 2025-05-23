import Link from "next/link"
import { getAllPosts } from "@/lib/blog"

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10">ブログ記事一覧</h1>
      <div className="space-y-10">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="border-b border-gray-700 pb-6"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="text-amber-400 hover:underline text-2xl font-semibold"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-400 mt-1">{post.date}</p>
            {/* 本文プレビュー（最初の1行を切り出す） */}
            <p className="text-gray-300 mt-3 text-sm leading-relaxed">
              {post.excerpt || "この記事の内容を表示するにはクリックしてください。"}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
