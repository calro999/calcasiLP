import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "calcasiどっとこむ | オンカジ最新ニュース情報局",
  description:
    "オンカジの「今」を知るならカルカジ！最速で情報をお届け。初心者からベテランまで役立つオンラインカジノ情報サイト。",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} disableTransitionOnChange={true}>
          <Navbar />
          <div className="flex-grow pt-16">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
