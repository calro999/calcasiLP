"use client"

import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"

interface CardFlipProps {
  front: ReactNode
  back: ReactNode
  className?: string
  flipOnHover?: boolean
  flipOnClick?: boolean
}

export default function CardFlip({
  front,
  back,
  className = "",
  flipOnHover = false,
  flipOnClick = true,
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    if (flipOnClick) {
      setIsFlipped(!isFlipped)
    }
  }

  const handleHover = () => {
    if (flipOnHover) {
      setIsFlipped(true)
    }
  }

  const handleHoverEnd = () => {
    if (flipOnHover) {
      setIsFlipped(false)
    }
  }

  return (
    <div
      className={`relative ${className} perspective-1000`}
      onClick={handleFlip}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="absolute w-full h-full backface-hidden">{front}</div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">{back}</div>
      </motion.div>
    </div>
  )
}
