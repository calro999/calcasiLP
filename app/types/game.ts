export type Game = {
  slug: string;           // URLになる名前 (例: gates-of-olympus)
  title: string;          // ゲーム名
  provider: string;       // プロバイダー名
  ratingFun: 1 | 2 | 3 | 4 | 5; // 面白さ
  ratingExplosive: 1 | 2 | 3 | 4 | 5; // 爆発力
  canBuyFS: boolean;      // FS購入可否
  rtp: string;            // 還元率
  description: string;    // 簡単な紹介文
  rules: string;          // 基本ルール
  pros: string[];         // メリット（SEO対策）
  cons: string[];         // デメリット（信頼性向上）
  seoDescription: string; // 検索用説明文
};