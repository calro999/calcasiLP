import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"
import ScrollAnimation from "./animations/scroll-animation"
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <ScrollAnimation variant="fadeInUp" delay={0.1}>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Calcasi Canada</h3>
              <p className="text-gray-400 mb-4">
                Your ultimate resource for the latest online casino information in Canada. From beginner guides to pro strategies, we support your gambling journey.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <Facebook size={20} />, label: "Facebook" },
                  { icon: <Twitter size={20} />, label: "Twitter" },
                  { icon: <Instagram size={20} />, label: "Instagram" },
                  { icon: <Youtube size={20} />, label: "YouTube" },
                ].map((social, index) => (
                  <Link
                    key={social.label}
                    href="#"
                    className="text-gray-400 hover:text-amber-400 transition-colors transform hover:scale-110"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation variant="fadeInUp" delay={0.2}>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { name: "Home", path: "/" },
                  { name: "Latest News", path: "/latest-news" },
                  { name: "Guides", path: "/beginners-guide" },
                  { name: "Strategies", path: "/strategies" },
                  { name: "Ranking", path: "/casino-ranking" },
                ].map((item, index) => (
                  <li
                    key={item.name}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    className="transform hover:translate-x-2 transition-transform"
                  >
                    <Link href={item.path} className="text-gray-400 hover:text-amber-400 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>

          <ScrollAnimation variant="fadeInUp" delay={0.3}>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Categories</h3>
              <ul className="space-y-2">
                {[
                  { name: "Slots", path: "/category/slots" },
                  { name: "Table Games", path: "/category/table-games" },
                  { name: "Live Casino", path: "/category/live-casino" },
                  { name: "Bonuses", path: "/category/bonuses" },
                  { name: "Payment Guide", path: "/category/payment" },
                ].map((category, index) => (
                  <li
                    key={category.name}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    className="transform hover:translate-x-2 transition-transform"
                  >
                    <Link href={category.path} className="text-gray-400 hover:text-amber-400 transition-colors">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>

          <ScrollAnimation variant="fadeInUp" delay={0.4}>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start group">
                  <Mail size={20} className="text-amber-400 mr-3 mt-1 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-400 group-hover:text-amber-300 transition-colors">info@calcasi.com</span>
                </li>
                <li className="flex items-start group">
                  <Twitter size={20} className="text-amber-400 mr-3 mt-1 group-hover:scale-110 transition-transform" />
                  <Link
                    href="https://x.com/Calro_shorts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 group-hover:text-amber-300 transition-colors"
                  >
                    @calro_shorts
                  </Link>
                </li>
              </ul>
              <div className="mt-6">
                <h4 className="font-bold text-white mb-2">Subscribe to Newsletter</h4>
                <form className="flex group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 text-white flex-grow focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2 rounded-r-md transition-colors transform group-hover:scale-105 origin-right"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Calcasi Canada. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Terms of Use", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Responsible Gambling", path: "/responsible-gambling" },
                { name: "FAQ", path: "/faq" }
              ].map((item, index) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-gray-500 hover:text-amber-400 text-sm transition-colors"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-xs">
              This site is for individuals aged 19+ (or legal age in your province). Gambling can be addictive. Please follow Canadian laws and your local regulations. Play responsibly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
