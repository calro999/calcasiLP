export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), { status: 400 });
  }

  try {
    const wpRes = await fetch(`https://calacasi-lp.ct.ws/wp-json/wp/v2/posts?slug=${slug}`, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
      },
    });

    if (!wpRes.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch from WordPress", status: wpRes.status }), {
        status: wpRes.status,
      });
    }

    const data = await wpRes.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Fetch failed", details: err }), {
      status: 500,
    });
  }
}
