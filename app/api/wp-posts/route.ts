// app/api/wp-posts/route.ts

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    const wpRes = await fetch(`https://calacasi-lp.ct.ws/wp-json/wp/v2/posts?slug=${slug}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await wpRes.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("WP fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
