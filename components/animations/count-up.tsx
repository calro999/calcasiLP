"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export default function CountUp({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const progress = timestamp - startTimeRef.current
      const progressPercent = Math.min(progress / (duration * 1000), 1)

      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progressPercent, 4)

      const currentCount = Math.min(end * easeOutQuart, end)
      countRef.current = currentCount
      setCount(currentCount)

      if (progressPercent < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)

    return () => {
      startTimeRef.current = null
    }
  }, [inView, end, duration])

  const formattedCount = count.toFixed(decimals)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  )
}
