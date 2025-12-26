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
  slug: "starlight-princess",
  title: "Starlight Princess",
  provider: "Pragmatic Play",
  imageUrl: "/starlight-princess.jpg",
  ratingFun: 5,
  ratingExplosive: 5,
  canBuyFS: true,
  rtp: "96.50%",
  maxWin: "5,000倍",
  volatility: "High (高い)",
  description: "空に浮かぶお城を舞台に、魔法の杖を振る王女様がマルチプライヤーを届けてくれる大人気スロット。どこでも配当システムを採用しており、一撃5,000倍のカンストを目指す連鎖が最大の魅力です。",
  rules: "【基本システム】\n・8個以上の同一シンボルが出現すれば配当確定。\n・配当シンボルが消え、新しいシンボルが降ってくる「タンブル機能」。\n\n【フリースピン】\n・スキャッター4つ以上で15回のフリースピン。\n・配当が発生したスピンでマルチプライヤーが出現すると、その倍率がトータルマルチプライヤーに蓄積されます。",
  features: "フリースピン中のマルチプライヤーの蓄積が勝負。一度上がった倍率は終了までリセットされないため、終盤に高配当シンボルと高倍率が絡んだ時の破壊力は圧巻です。",
  strategy: "アンティベット（25%追加）をONにしてスキャッター出現率を高めるのが王道。ボーナス購入も100倍で可能ですが、マルチプライヤーの育ち具合に左右されるため、資金に余裕を持って挑みましょう。",
  pros: ["マルチプライヤーが蓄積されるため後半の期待感がすごい", "キャラクターと演出が非常に華やか", "フリースピン購入が可能"],
  cons: ["マルチプライヤーが育たないと配当が伸び悩む", "ボラティリティが高く、通常時の削りが早い"],
  seoDescription: "Starlight Princess（スタプリ）の攻略・フリースピンの仕組み・RTPを徹底解説。マルチプライヤーを溜めて5000倍を狙うコツ。",
  affiliateUrl: "https://record.discasinoaffiliates.com/_R757TaLb9LkdIqIeVhNpQ2Nd7ZgqdRLk/1/?pg=0",
};