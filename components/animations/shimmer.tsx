"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ShimmerProps {
  children: React.ReactNode
  className?: string
  interval?: number
  color?: string
}

export default function Shimmer({
  children,
  className = "",
  interval = 3000,
  color = "rgba(255, 215, 0, 0.5)",
}: ShimmerProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true)
      const reset = setTimeout(() => setIsAnimating(false), 1000)
      return () => clearTimeout(reset)
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      {isAnimating && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "100%", opacity: [0, 1, 0] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
        />
      )}
    </div>
  )
}
