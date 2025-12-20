// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // titleオブジェクトを使うことで、各ページで「記事タイトル | カジノ比較ならCalcasi！」と自動表示されます
  title: {
    default: "カジノ比較ならCalcasi！",
    template: "%s | カジノ比較ならCalcasi！",
  },
  description: "人気オンラインカジノのランキング・ゲーム紹介・初心者ガイドを提供するカジノ比較サイトです。",
  // Googleにサイト名を直接伝える設定
  openGraph: {
    siteName: "カジノ比較ならCalcasi！",
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: "https://calcasi-lp.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <head>
        {/* ✅ Googleアナリティクス */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-D4M7BJXJWJ"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D4M7BJXJWJ');
          `}
        </Script>

        {/* ✅ Google Search Console */}
        <meta name="google-site-verification" content="DkCMrOjpxPVzY0T8G34bKQQDsDP9Biu83kk2wfz5hz4" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <Header />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}