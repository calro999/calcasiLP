// このファイルだけで完結するように設定しました
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
  slug: "gates-of-olympus",
  title: "Gates of Olympus",
  provider: "Pragmatic Play",
  // 画像は仮のものです。お手持ちの画像URLがあれば差し替えてください
  imageUrl: "/gates-of-olympus.jpg",
  ratingFun: 5,
  ratingExplosive: 5,
  canBuyFS: true,
  rtp: "96.50%",
  maxWin: "5,000倍",
  volatility: "High (高い)",
  description: "ギリシャ神話のゼウスがテーマの超人気スロット。シンボルがどこでも8個以上揃えば配当が発生する革新的なシステム「ペイ・エニウェア」を採用しています。最大500倍のマルチプライヤーが絡み合う爆発力は、全スロットの中でもトップクラスです。",
  rules: "【基本配当】\n・6×5の画面上に、同じシンボルが合計8個以上現れると配当獲得。\n・配当があったシンボルは消え、新しいシンボルが降ってくる「タンブル（連鎖）」機能。\n\n【マルチプライヤー（倍率）】\n・ゼウスがランダムに放つ「雷」によって、2倍〜500倍のマルチプライヤーが出現。\n・1回のスピンで複数のマルチプライヤーが出た場合、それらは合算されます。\n\n【フリースピン】\n・スキャッター（ゼウスの顔）が4つ以上で15回のフリースピン。\n・フリースピン中にマルチプライヤーを含んだ配当が出ると、その倍率は「総マルチプライヤー」として画面左側に蓄積され、以降の配当すべてに適用されます。これが爆発の鍵です。",
  features: "最大の魅力はフリースピン中の「倍率の蓄積」です。後半になればなるほど、小さな配当でも「蓄積された100倍、200倍」といったマルチプライヤーが乗るため、一撃で数千倍の配当が飛び出すポテンシャルを秘めています。",
  strategy: "1. アンティベット（ベット額25%増）をONにすることを推奨。フリースピン突入率が2倍になります。\n2. フリースピン購入（ベット額の100倍）は、ボラティリティが非常に高いため、資金に余裕がある時に勝負をかける手法として有効です。\n3. 高配当シンボル（王冠や時計）の連鎖を待つゲーム性なので、短期間のマイナスに一喜一憂せず、長期戦を見据えた資金管理が重要です。",
  pros: ["最大500倍のマルチプライヤーが強烈", "フリースピン中の倍率蓄積でカンストが狙える", "連鎖が続くので通常時も退屈しない"],
  cons: ["ハイボラティリティのため、資金の減りが速いこともある", "フリースピン中にマルチプライヤーが出ないと伸び悩む"],
  seoDescription: "Gates of Olympus（ゲートオブオリンパス）の徹底攻略。勝てる確率を上げるコツ、フリースピン購入の是非、RTPやボラティリティ情報をプロが詳しく解説。",
  affiliateUrl: "https://record.discasinoaffiliates.com/_R757TaLb9LkdIqIeVhNpQ2Nd7ZgqdRLk/1/?pg=0",
};