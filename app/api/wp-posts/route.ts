// /app/api/wp-posts/route.ts
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  const wpRes = await fetch(`https://calacasi-lp.ct.ws/wp-json/wp/v2/posts?slug=${slug}`);
  const data = await wpRes.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
