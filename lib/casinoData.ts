// カジノデータの型定義（TypeScriptのエラーを防ぐために重要です）
export interface Casino {
  id: string;
  rank: number;
  name: string;
  logo: string;
  banner: string;
  bonus: string;
  rating: number; // ★ ここに各カジノの星の数値を設定します
  description: string;
  officialLink: string;
  features: string[];
}

export const casinoData: Casino[] = [
  {
    id: "goldenpanda",
    rank: 1,
    name: "ゴールデンパンダ",
    logo: "/goldenpanda_top.jpg",
    banner: "/goldenpanda_top.jpg",
    bonus: "初回入金100%ボーナス＋大型スロットキャンペーン開催中",
    rating: 5.0, // 1位: 星5.0
    description: "破壊力の高いスロットが多数揃う新進気鋭のオンラインカジノ。豪華ボーナスと高確率ジャックポットが魅力で、日本人プレイヤーからの支持も急増中。",
    officialLink: "https://record.discasinoaffiliates.com/_R757TaLb9LkdIqIeVhNpQ2Nd7ZgqdRLk/1/?pg=0",
    features: ["高爆発スロット", "新台が豊富", "日本語サポート"]
  },
  {
    id: "stake",
    rank: 2,
    name: "Stakeカジノ",
    logo: "/stake_logo.png",
    banner: "/stake_logo.png",
    bonus: "初回入金200%ボーナス（最大$2,000）＋入金不要ボーナス$14",
    rating: 4.5, // 2位: 星4.5
    description: "世界トップクラスの仮想通貨カジノ。高速出金・独自ゲーム・VIP待遇を備え、ビットコインユーザーから圧倒的な支持を獲得している。",
    officialLink: "https://stake.com/?c=411c9bbd82&offer=calro",
    features: ["仮想通貨特化", "VIP制度", "即時出金"]
  },
  {
    id: "k8",
    rank: 3,
    name: "K8カジノ",
    logo: "/k8_logo.png",
    banner: "/k8_logo.png",
    bonus: "初回入金100%ボーナス（最大$800）＋288回のフリースピン",
    rating: 4.3, // 3位: 星4.3
    description: "ハイローラーから絶大な人気を得ているオンラインカジノ。旧式パチスロや高還元スロットが豊富で、ベットの自由度の高さも魅力。",
    officialLink: "https://k8.io/?invite=calron",
    features: ["旧式パチスロあり", "高額ベット対応", "高速出金"]
  },
  {
    id: "duelbits",
    rank: 4,
    name: "デュエルビッツ",
    logo: "/duelbits_logo.png",
    banner: "/duelbits_logo.png",
    bonus: "最大$1000のウェルカムパッケージ",
    rating: 4.0, // 4位以降は一律 4.0
    description: "仮想通貨に特化した次世代型カジノ。独自のクラッシュ系などのオリジナルゲームと、ユーザーに寄り添ったVIP特典が魅力。",
    officialLink: "https://affiliates.duelbits.com/visit/?bta=35925&nci=5768",
    features: ["仮想通貨対応", "独自ゲーム", "VIP制度あり"]
  },
  {
    id: "kachiwin",
    rank: 5,
    name: "勝win",
    logo: "/katsu.jpg",
    banner: "/katsu.jpg",
    bonus: "最大$1000のウェルカムボーナス",
    rating: 4.0,
    description: "日本人向けの設計が魅力のカジノ＆スポーツ総合プラットフォーム。多彩な決済方法や使いやすさが高評価。",
    officialLink: "https://tracker.katsuwinaffiliates.ai/link?btag=90306436_414265",
    features: ["日本特化", "スポーツ＆カジノ", "多彩な決済方法"]
  },
  {
    id: "wonder",
    rank: 6,
    name: "ワンダーカジノ",
    logo: "/wondercasino_logo.png",
    banner: "/wondercasino_logo.png",
    bonus: "登録ボーナス$30！初回入金100%ボーナス（最大$500）",
    rating: 4.0,
    description: "初心者にも優しい日本語サポートと、安心の運営体制が魅力の高評価オンラインカジノ。登録ボーナスがあるため、初めての人にも人気。",
    officialLink: "https://tracker-pm2.casino-wonder.com/link?btag=96420424_437635",
    features: ["日本語サポート", "豊富なゲーム数", "高速出金"]
  },
  {
    id: "1xbet",
    rank: 7,
    name: "1xBet",
    logo: "/1xbet_top.jpg",
    banner: "/1xbet_top.jpg",
    bonus: "初回入金最大78,000円＋その他豊富なキャンペーン",
    rating: 4.0,
    description: "世界最大級のブックメーカーとして有名。スポーツベットとカジノを同時に楽しめ、プロモコード『CALRO777』でお得に始められる。",
    officialLink: "https://affpa.top/L?tag=d_4455915m_1236c_&site=4455915&ad=1236",
    features: ["日本語対応", "高額ボーナス", "仮想通貨対応"]
  }
];