"use client"

import { useState, useEffect, useRef, RefCallback } from "react"
import { useInView } from "react-intersection-observer"

interface TypingProps {
  text: string
  speed?: number
  delay?: number
  className?: string
}

export default function Typing({ text, speed = 50, delay = 0, className = "" }: TypingProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const typingRef = useRef<HTMLSpanElement | null>(null)
  const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (!inView) return

    let currentIndex = 0
    let typingTimer: NodeJS.Timeout | null = null

    const startTyping = () => {
      setDisplayText("")
      currentIndex = 0

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1))
          currentIndex++
          typingTimer = setTimeout(typeNextChar, speed)
        } else {
          setIsTypingComplete(true)
          if (typingTimer) clearTimeout(typingTimer)
        }
      }

      setTimeout(typeNextChar, delay)
    }

    startTyping()

    return () => {
      if (typingTimer) clearTimeout(typingTimer)
    }
  }, [inView, text, speed, delay])

  // ✅ 複数の ref を安全にマージするユーティリティ
  const setRefs: RefCallback<HTMLSpanElement> = (node) => {
    typingRef.current = node
    inViewRef(node)
  }

  return (
    <span
      ref={setRefs}
      className={`${className} inline-block`}
      style={{
        position: "relative",
        maxWidth: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {displayText}
      {!isTypingComplete && (
        <span
          className="animate-pulse"
          style={{
            display: "inline-block",
            verticalAlign: "middle",
          }}
        >
          |
        </span>
      )}
    </span>
  )
}
