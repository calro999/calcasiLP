export type Game = {
  slug: string;
  title: string;
  provider: string;
  imageUrl: string;       // 画像用
  ratingFun: 1 | 2 | 3 | 4 | 5;
  ratingExplosive: 1 | 2 | 3 | 4 | 5;
  canBuyFS: boolean;
  rtp: string;
  maxWin: string;         // 最大配当（追加）
  volatility: string;     // 変動率（追加）
  description: string;
  rules: string;
  features: string;       // ゲームの特徴（詳細用）
  strategy: string;       // 攻略のコツ（SEO用）
  pros: string[];
  cons: string[];
  seoDescription: string;
  affiliateUrl: string;   // 外部リンク用
};