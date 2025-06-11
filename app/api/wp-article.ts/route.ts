import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');

  let apiUrl = '';

  if (id) {
    apiUrl = `https://calacasi-lp.ct.ws/wp-json/wp/v2/posts/${id}`;
  } else if (slug) {
    apiUrl = `https://calacasi-lp.ct.ws/wp-json/wp/v2/posts?slug=${slug}`;
  } else {
    return NextResponse.json({ error: 'Missing id or slug' }, { status: 400 });
  }

  try {
    const wpRes = await fetch(apiUrl);
    const data = await wpRes.json();

    if (!wpRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch from WP' }, { status: wpRes.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Fetch error', detail: (error as Error).message }, { status: 500 });
  }
}
