import Link from "next/link"
import { getAllPosts } from "@/lib/blog"

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ブログ記事一覧</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-amber-400 hover:underline text-xl"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-400">{post.date}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
