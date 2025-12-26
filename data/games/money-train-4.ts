export type Game = {
  slug: string;
  title: string;
  provider: string;
  imageUrl: string;
  ratingFun: 1 | 2 | 3 | 4 | 5;
  ratingExplosive: 1 | 2 | 3 | 4 | 5;
  canBuyFS: boolean;
  rtp: string;
  maxWin: string;
  volatility: string;
  description: string;
  rules: string;
  features: string;
  strategy: string;
  pros: string[];
  cons: string[];
  seoDescription: string;
  affiliateUrl: string;
};

export const gameData: Game = {
  slug: "money-train-4",
  title: "Money Train 4",
  provider: "Relax Gaming",
  imageUrl: "/money-train-4.jpg",
  ratingFun: 5,
  ratingExplosive: 5,
  canBuyFS: true,
  rtp: "96.10%",
  maxWin: "150,000倍",
  volatility: "Extreme (極高)",
  description: "Relax Gamingの伝説的シリーズ最終章。最大配当は驚異の15万倍を誇り、20種類以上の特殊シンボルが絡み合うボーナスゲームは、オンラインカジノ史上最強クラスの爆発力を持っています。",
  rules: "【ボーナスゲーム】\n・スキャッター3つ以上で突入。3回のスピン中に新しいシンボルが止まれば回数がリセット。\n・列がシンボルで埋まると新しい行が拡張（最大4回）されます。\n\n【特殊シンボル】\n・コレクター：全倍率を回収。\n・パイヤー：全シンボルに倍率を加算。\n・ネクロマンサー：使用済みの特殊キャラを復活させるなど、多岐にわたります。",
  features: "「持続型（Persistent）」シンボルを引けるかが運命の分かれ目。毎スピン効果を発揮し続ける持続型パイヤーやコレクターが出現すれば、15万倍のカンストが現実味を帯びます。",
  strategy: "通常時を回すよりボーナス購入が効率的。100倍の通常購入に加え、持続型シンボルが1つ確定する500倍購入も選択可能。非常に波が荒いため、余剰資金での勝負を推奨します。",
  pros: ["シリーズ最高、世界トップクラスの15万倍配当", "特殊キャラの組み合わせによる無限のゲーム性", "演出とサウンドのクオリティが極めて高い"],
  cons: ["ボーナスが全く伸びない時の喪失感が大きい", "500倍購入はリスクが非常に高い"],
  seoDescription: "Money Train 4（マネトレ4）の全特殊シンボル解説と攻略。15万倍カンストを狙うためのボーナス購入戦略。",
  affiliateUrl: "https://record.discasinoaffiliates.com/_R757TaLb9LkdIqIeVhNpQ2Nd7ZgqdRLk/1/?pg=0",
};