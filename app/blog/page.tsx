import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-6xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-4xl font-bold mb-10 text-white">ブログ記事一覧</h1>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-[#111] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-48">
              <Image
                src={post.thumbnail}
                alt={`${post.title}のサムネイル画像`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-amber-400 group-hover:underline">{post.title}</h2>
              <p className="text-sm text-gray-400 mt-1">{post.date}</p>
              <p className="text-gray-300 mt-2 text-sm leading-relaxed">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
