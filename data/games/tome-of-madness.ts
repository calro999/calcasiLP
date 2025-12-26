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
  slug: "tome-of-madness",
  title: "Tome of Madness",
  provider: "Play'n GO",
  imageUrl: "/tome-of-madness.jpg",
  ratingFun: 5,
  ratingExplosive: 3,
  canBuyFS: false,
  rtp: "96.59%",
  maxWin: "2,000倍",
  volatility: "High (高い)",
  description: "人気キャラクター『リッチ・ワイルド』がクトゥルフ神話の謎に挑む、連鎖消滅型（グリッド）スロット。配当が続くことでポータルがチャージされ、様々な特殊効果が発動する、中毒性の高いゲーム性が魅力です。",
  rules: "【基本ルール】\n・5×5のグリッドを使用。縦横に4個以上の同一シンボルが並ぶと配当発生。\n・配当があったシンボルは消え、新しいシンボルが降ってくる連鎖システム。\n\n【ポータルチャージ】\n・シンボルが消えた数に応じてポータルがチャージされます。\n・7個：2つの特殊ワイルドが追加。\n・14個：さらに2つの特殊ワイルドが追加され、アビス（列消去）などが発動。\n・27個：2つの特殊ワイルドが追加。さらに特殊効果が強力に。\n・42個：フリーラウンド『Other World Free Round』へ突入！\n\n【メガワイルド】\n・フリーラウンド中にグリッド上の全ての『目』を開放すると、特大のメガワイルド（クトゥルフ）が出現し、画面を下に向かって移動しながら高額配当を誘発します。",
  features: "最大の醍醐味は、フリーラウンド突入後の『クトゥルフ召喚』です。2,000倍という最大配当は控えめに見えますが、連鎖が続く爽快感と、演出の完成度は全スロットの中でもトップクラス。安定して楽しめる1台です。",
  strategy: "1. 目の開放を優先：フリーラウンド中は、指定された場所で配当を出して『目』を開けることに集中しましょう。これを開けないとメガワイルドは出現しません。\n2. コイン持ちの良さを活用：一撃万倍を狙う台ではないため、少しずつ資金を増やしながら楽しむのに向いています。\n3. 連鎖の勢いを見守る：一度波に乗るとポータルが次々と発動するため、少額ベットでも十分に楽しむことが可能です。",
  pros: ["演出が非常に美しく、世界観に没入できる", "少額配当が続きやすく、長く遊べる", "メガワイルドが出現した時の爆発力と爽快感"],
  cons: ["最大配当が2,000倍と、他のハイボラ機に比べると低い", "フリースピン購入ができない"],
  seoDescription: "Tome of Madness（トムオブマッドネス）の攻略法。クトゥルフを召喚する条件やポータルの仕組み、RTPを詳しく解説。",
  affiliateUrl: "https://record.discasinoaffiliates.com/_R757TaLb9LkdIqIeVhNpQ2Nd7ZgqdRLk/1/?pg=0",
};