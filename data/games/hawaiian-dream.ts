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
  slug: "hawaiian-dream",
  title: "Hawaiian Dream",
  provider: "Win Fast",
  imageUrl: "/hawaiian-dream.jpg",
  ratingFun: 5,
  ratingExplosive: 3,
  canBuyFS: false,
  rtp: "97.00%",
  maxWin: "1,400倍",
  volatility: "Medium (中)",
  description: "日本のパチスロを彷彿とさせる3×3リールのスロット。青い空と海、美しい美女たちが彩るハワイが舞台です。ハイビスカスが光ればボーナス確定というシンプルながら奥深いゲーム性が、多くの日本人プレイヤーを虜にしています。",
  rules: "【基本ルール】\n・3×3リール、5ラインのシンプルな構成。\n・「RESPIN」シンボルが揃うと再始動。4連続で揃うとラッシュ（フリースピン）確定です。\n\n【ボーナスラッシュ】\n・青7（Hibiscus Rush）：継続率約65%。\n・赤7（Hibiscus Rush Super）：継続率約85%。\n・金7（Ultimate Rush）：図柄が揃い続ける限り配当が続く特化ゾーン。\n\n【サンセットボーナス】\n・通常時にランダムで突入。ルーレットで配当や各ラッシュを獲得できるチャンスです。",
  features: "最大の魅力は、パチスロさながらの「継続率管理」です。ラッシュ終了時、画面上のハイビスカスが光れば継続確定。この時の告知音やエフェクトの心地よさは他のスロットでは味わえません。",
  strategy: "1. リスピンの連鎖を待つ：基本はリスピン待ちです。3連目から画面の色が変わり期待度が跳ね上がります。\n2. サンセットボーナスの引き：通常時の救済措置的な側面もあり、ここから高継続ラッシュに入るルートが重要です。\n3. 長期プレイ向き：RTPが97.00%と非常に高く、資金持ちが良いため、長く遊んで一撃を待つスタイルが適しています。",
  pros: ["パチスロ経験者ならすぐに理解できるルール", "RTPが97%と非常に高く、安定感がある", "告知演出がとにかく気持ちいい"],
  cons: ["爆発力は他のハイボラ機に比べると控えめ", "フリースピン購入機能がない"],
  seoDescription: "Hawaiian Dream（ハワイアンドリーム）のスペック、継続率、リスピンの仕組みを解説。パチスロ風スロットで勝つためのポイントとは？",
  affiliateUrl: "https://record.discasinoaffiliates.com/_R757TaLb9LkdIqIeVhNpQ2Nd7ZgqdRLk/1/?pg=0",
};