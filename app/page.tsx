// /app/[lang]/page.tsx

import Hero from "@/components/hero"
import Features from "@/components/features"
import Testimonials from "@/components/off_testimonials"
import CTA from "@/components/cta"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
    </main>
  )
}
