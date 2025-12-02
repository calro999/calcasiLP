import Article14 from "/14.mdx";

interface ArticleMapItem {
  id: number;
  title: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  component: any;
}

interface ArticleMap {
  [key: string]: ArticleMapItem;
}

export const articles: ArticleMap = {
  "14": {
    id: 14,
    title: "仮記事MDXテスト",
    date: "2025-12-02",
    readTime: "5分",
    category: "テスト",
    author: "テスト太郎",
    image: "/placeholder.jpg",
    component: Article14,
  },
};
