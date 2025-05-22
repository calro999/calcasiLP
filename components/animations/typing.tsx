"use client"

import { useState, useEffect, useRef } from "react"
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
  const typingRef = useRef<HTMLSpanElement>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // 完全にリセットして新しいロジックで実装
  useEffect(() => {
    if (!inView) return

    let currentIndex = 0
    let typingTimer: NodeJS.Timeout | null = null

    const startTyping = () => {
      // 初期状態をクリア
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

      // 遅延後にタイピングを開始
      setTimeout(typeNextChar, delay)
    }

    startTyping()

    // クリーンアップ関数
    return () => {
      if (typingTimer) clearTimeout(typingTimer)
    }
  }, [inView, text, speed, delay])

  return (
    <span
      ref={(node) => {
        // 両方の参照を設定
        typingRef.current = node
        if (typeof ref === "function") ref(node)
      }}
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
