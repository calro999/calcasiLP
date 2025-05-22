"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FloatingProps {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
  delay?: number
}

export default function Floating({ children, className = "", amplitude = 10, duration = 3, delay = 0 }: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0, amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
