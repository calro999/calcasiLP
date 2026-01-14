import Article14 from "/14.mdx";

interface ArticleMapItem {
  id: number;
  title: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  component: any;
}

interface ArticleMap {
  [key: string]: ArticleMapItem;
}
