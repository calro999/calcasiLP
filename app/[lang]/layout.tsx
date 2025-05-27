// app/[lang]/layout.tsx
import "../globals.css"
import type { ReactNode } from "react"

export default function LangLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
