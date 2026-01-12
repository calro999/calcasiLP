import { Metadata } from "next";

export const metadata: Metadata = {
  title: "【2026年最新】オンラインカジノおすすめランキング｜プロが選ぶ優良サイト",
  description: "2026年最新のオンラインカジノランキングを公開！安全性、出金スピード、ボーナスの豪華さを徹底比較。初心者でも安心して遊べる日本向け優良オンカジTOP10を紹介します。",
  openGraph: {
    title: "2026年最新オンラインカジノランキングTOP10",
    description: "プロ厳選の優良カジノをランキング形式で紹介。限定ボーナス情報も満載！",
    url: "https://calcasi-lp.vercel.app/casino-ranking",
    images: ["/top.png"], // ランキング用のイメージ画像
    type: "website",
  },
};

export default function CasinoRankingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
