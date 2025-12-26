// 型の定義を直接入れることでエラーを回避します
export type Game = {
  slug: string;
  title: string;
  provider: string;
  ratingFun: 1 | 2 | 3 | 4 | 5;
  ratingExplosive: 1 | 2 | 3 | 4 | 5;
  canBuyFS: boolean;
  rtp: string;
  description: string;
  rules: string;
  pros: string[];
  cons: string[];
  seoDescription: string;
};

export const gameData: Game = {
  slug: "gates-of-olympus",
  title: "Gates of Olympus",
  provider: "Pragmatic Play",
  ratingFun: 5,
  ratingExplosive: 5,
  canBuyFS: true,
  rtp: "96.50%",
  description: "ゼウスが雷を落とせばマルチプライヤーが炸裂！不動の人気を誇る爆発台です。",
  rules: "8個以上の同一シンボルが画面上のどこかに止まれば配当。最大500倍のマルチプライヤーが加算されます。",
  pros: ["マルチプライヤーが最大500倍", "フリースピンの購入が可能", "連鎖が続く爽快感"],
  cons: ["ボラティリティが高く、波が激しい", "通常時の配当が低め"],
  seoDescription: "Gates of Olympusの攻略法、フリースピン購入の有無、RTP、面白さを5段階評価で詳しくレビューします。",
};