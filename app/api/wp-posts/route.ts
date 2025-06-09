// app/api/wp-posts/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
  }

  const wpApiUrl = `https://calacasi-lp.ct.ws/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}`;

  try {
    const wpRes = await fetch(wpApiUrl, { cache: "no-store" });

    if (!wpRes.ok) {
      return NextResponse.json({ error: "WordPress fetch failed" }, { status: wpRes.status });
    }

    const data = await wpRes.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch WordPress data" }, { status: 500 });
  }
}
