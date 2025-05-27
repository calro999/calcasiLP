"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Shimmer from "./animations/shimmer";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "ja";

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

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
  };

  const menuItems = [
    { name: "ホーム", path: "/" },
    { name: "最新情報", path: "/latest-news" },
    { name: "初心者ガイド", path: "/beginners-guide" },
    { name: "攻略法", path: "/[lang]/strategies" },
    { name: "カジノランキング", path: "/[lang]/casino-ranking" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur shadow-md"
      initial="initial"
      animate={scrolled ? "scrolled" : "initial"}
      variants={navbarVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-3 relative flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center">
          <Shimmer interval={5000}>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-300 to-yellow-500 text-transparent bg-clip-text">
              calcasiどっとこむ
            </span>
          </Shimmer>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={`/${locale}${item.path}`}
              className="text-white text-sm md:text-base hover:text-amber-300 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="https://x.com/Calro_kuzumaru"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold px-4 py-1.5 rounded-md text-sm md:text-base transition-all duration-300 shadow-lg shadow-amber-500/20"
          >
            お問い合わせ
          </Link>
        </nav>

        <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur shadow-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col space-y-3 p-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={`/${locale}${item.path}`}
                    className="text-white text-sm hover:text-amber-300 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="https://x.com/Calro_kuzumaru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold px-4 py-2 rounded-md text-sm transition-all duration-300 shadow-lg shadow-amber-500/20 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  お問い合わせ
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
