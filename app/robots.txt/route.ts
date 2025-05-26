// /app/robots.txt/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const content = `
User-agent: *
Allow: /

Sitemap: https://calcasi-lp.vercel.app/sitemap.xml
  `.trim();

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
