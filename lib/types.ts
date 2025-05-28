// /lib/types.ts

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
  slug: string;
}

export interface Strategy {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
  includeDiceGame?: boolean; // DiceGame表示の有無（任意）
}

export interface Casino {
  id: string;
  rank: number;
  name: string;
  logo: string;
  banner: string;
  bonus: string;
  rating: number;
  description: string;
  officialLink: string;
  features: string[];
}
