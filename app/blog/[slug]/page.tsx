import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) return notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm mb-6">{post.date}</p>
      <article
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  )
}
