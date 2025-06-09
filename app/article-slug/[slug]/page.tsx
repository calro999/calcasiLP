// app/article-slug/[slug]/page.tsx

export const dynamic = "force-dynamic";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div style={{ padding: "60px", color: "white", fontSize: "20px" }}>
      スラッグ: <strong>{params.slug}</strong>
    </div>
  );
}
