// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // グローバルCSSのインポート
import Header from '@/components/Header'; // Headerをここでインポート
import Footer from '@/components/Footer'; // Footerもここでインポート

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "calcasiどっとこむ",
  description: "オンラインカジノに関する最新情報を提供します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header /> {/* Headerをここで一度だけレンダリング */}
        {children} {/* 各ページの内容 */}
        <Footer /> {/* Footerをここで一度だけレンダリング */}
      </body>
    </html>
  );
}