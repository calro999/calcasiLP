import { GetStaticPaths, GetStaticProps } from 'next';

export default function PostPage({ post }: { post: any }) {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </main>
  );
}

// 全記事一覧を取得して、静的生成する記事を決定
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://calacasi-lp.ct.ws/wp-json/wp/v2/posts');
  const posts = await res.json();

  const paths = posts.map((post: any) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
};

// 各記事ページのデータ取得
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://calacasi-lp.ct.ws/wp-json/wp/v2/posts/${params?.id}`);
  const post = await res.json();

  return { props: { post } };
};
