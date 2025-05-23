"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Shimmer from "./animations/shimmer"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const navbarVariants = {
    initial: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(0px)",
      borderBottom: "1px solid rgba(255, 215, 0, 0)",
    },
    scrolled: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid rgba(255, 215, 0, 0.2)",
    },
  }

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial="initial"
      animate={scrolled ? "scrolled" : "initial"}
      variants={navbarVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Shimmer interval={5000}>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
                calcasiどっとこむ
              </span>
            </Shimmer>
          </Link>

          {/* PCナビゲーション */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "ホーム", path: "/" },
              { name: "最新情報", path: "/latest-news" },
              { name: "初心者ガイド", path: "/beginners-guide" },
              { name: "攻略法", path: "/strategies" },
              { name: "カジノランキング", path: "/casino-ranking" },
            ].map((item, i) => (
              <motion.div key={item.name} custom={i} variants={menuItemVariants} initial="hidden" animate="visible">
                <Link href={item.path} className="text-white hover:text-amber-300 transition-colors relative group">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* PC用 お問い合わせボタン */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold px-6 py-2 rounded-md transition-all duration-300 shadow-lg shadow-amber-500/20 transform hover:scale-105 active:scale-95"
            >
              お問い合わせ
            </Link>
          </motion.div>

          {/* モバイル メニュー開閉ボタン */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* モバイルメニュー本体 */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden pt-4 pb-2 overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <nav className="flex flex-col space-y-4">
                {[
                  { name: "ホーム", path: "/" },
                  { name: "最新情報", path: "/latest-news" },
                  { name: "初心者ガイド", path: "/beginners-guide" },
                  { name: "攻略法", path: "/strategies" },
                  { name: "カジノランキング", path: "/casino-ranking" },
                ].map((item) => (
                  <motion.div key={item.name} variants={mobileMenuItemVariants}>
                    <Link
                      href={item.path}
                      className="text-white hover:text-amber-300 transition-colors block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={mobileMenuItemVariants}>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold px-6 py-2 rounded-md transition-all duration-300 shadow-lg shadow-amber-500/20 text-center block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    お問い合わせ
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
