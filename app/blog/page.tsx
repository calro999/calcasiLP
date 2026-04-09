import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Casino Strategy Blog for Canada",
  description: "Read practical, experience-based casino strategy articles for Canadian players, including bonus optimization and bankroll control.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-6xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-4xl font-bold mb-10 text-white">Casino Blog Articles</h1>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-[#111] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-48">
              <Image
                src={post.thumbnail}
                alt={`${post.title} thumbnail`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
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
