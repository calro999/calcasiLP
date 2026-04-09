import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import { Metadata } from "next";
import Script from "next/script";
import { SITE_URL, stripHtmlTags, buildSupplementalSection } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description || stripHtmlTags(post.contentHtml).slice(0, 155),
    alternates: {
      canonical: `${SITE_URL}/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description || stripHtmlTags(post.contentHtml).slice(0, 155),
      images: [post.thumbnail || "/top.webp"],
      type: "article",
      url: `${SITE_URL}/blog/${params.slug}`,
    },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) return notFound()

  const plainTextLength = stripHtmlTags(post.contentHtml).length;
  const enrichedContent =
    plainTextLength < 4500
      ? `${post.contentHtml}${buildSupplementalSection(post.title, "blog strategy")}`
      : post.contentHtml;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || stripHtmlTags(post.contentHtml).slice(0, 155),
    image: [`${SITE_URL}${post.thumbnail || "/top.webp"}`],
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `${SITE_URL}/blog/${params.slug}`,
    publisher: { "@type": "Organization", name: "Calcasi Canada" },
  };

  return (
    <main className="max-w-3xl mx-auto px-4 pt-24 pb-16">
      <Script
        id={`blog-jsonld-${params.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm mb-6">{post.date}</p>
      <article
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: enrichedContent }}
      />
    </main>
  )
}
