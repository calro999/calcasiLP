"use client"

import { useEffect, type ReactNode } from "react"
import { motion, useAnimation, type Variant } from "framer-motion"
import { useInView } from "react-intersection-observer"

type AnimationVariant = "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "zoomIn" | "flip"

interface ScrollAnimationProps {
  children: ReactNode
  variant?: AnimationVariant
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  once?: boolean
}

const variants = {
  hidden: {
    opacity: 0,
    y: 0,
    x: 0,
    scale: 1,
    rotateY: 0,
  },
  fadeIn: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotateY: 0,
  },
  fadeInUp: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotateY: 0,
  },
  fadeInDown: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotateY: 0,
  },
  fadeInLeft: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotateY: 0,
  },
  fadeInRight: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotateY: 0,
  },
  zoomIn: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotateY: 0,
  },
  flip: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotateY: 0,
  },
}

const getInitialState = (variant: AnimationVariant): Variant => {
  switch (variant) {
    case "fadeInUp":
      return { ...variants.hidden, y: 50 }
    case "fadeInDown":
      return { ...variants.hidden, y: -50 }
    case "fadeInLeft":
      return { ...variants.hidden, x: -50 }
    case "fadeInRight":
      return { ...variants.hidden, x: 50 }
    case "zoomIn":
      return { ...variants.hidden, scale: 0.8 }
    case "flip":
      return { ...variants.hidden, rotateY: 180 }
    case "fadeIn":
    default:
      return variants.hidden
  }
}

export default function ScrollAnimation({
  children,
  variant = "fadeIn",
  delay = 0,
  duration = 0.5,
  className = "",
  threshold = 0.1,
  once = true,
}: ScrollAnimationProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: once,
  })

  useEffect(() => {
    if (inView) {
      controls.start(variant)
    } else if (!once) {
      controls.start(getInitialState(variant))
    }
  }, [controls, inView, variant, once])

  return (
    <motion.div
      ref={ref}
      initial={getInitialState(variant)}
      animate={controls}
      variants={variants}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
