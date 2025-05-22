"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxProps {
  children: ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export default function Parallax({ children, speed = 0.5, direction = "up", className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const transformUp = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
  const transformDown = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  const transformLeft = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
  const transformRight = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  // Calculate transform based on direction
  const getTransform = () => {
    switch (direction) {
      case "up":
        return transformUp
      case "down":
        return transformDown
      case "left":
        return transformLeft
      case "right":
        return transformRight
      default:
        return transformUp
    }
  }

  const transform = getTransform()
  const isHorizontal = direction === "left" || direction === "right"

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={{
          [isHorizontal ? "x" : "y"]: transform,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
