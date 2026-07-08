"use client"

import { useState } from "react"
import Image from "next/image"

const testimonials = [
  {
    quote: "The people who are crazy enough to think they can change the world are the ones who do.",
    name: "Steve Jobs",
    role: "Co-founder of Apple",
    image: "/jobs.jpg",
  },
  {
    quote: "All our dreams can come true, if we have the courage to pursue them.",
    name: "Walt Disney",
    role: "Founder of Disney",
    image: "/disney.jpg",
  },
  {
    quote: "See it. Want it. Add it to Iwish. Work hard and make it yours.",
    name: "Bedirhan Elçik",
    role: "Founder of Iwish",
    image: "/bedirhan.jpeg",
  },
]

export function TestimonialsMinimal() {
  const [active, setActive] = useState(0)

  return (
    <div className="w-full max-w-md px-0 py-4 -mt-1">
      {/* Quote */}
      <div className="relative min-h-[80px] mb-4">
        {testimonials.map((t, i) => (
          <p
            key={i}
            className={`
              absolute inset-0 text-lg md:text-xl font-light leading-relaxed text-foreground
              transition-all duration-500 ease-out
              ${
                active === i
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 translate-y-4 blur-sm pointer-events-none"
              }
            `}
          >
            "{t.quote}"
          </p>
        ))}
      </div>

      {/* Author Row */}
      <div className="flex items-center gap-6 mt2">
        {/* Avatars */}
        <div className="flex -space-x-2">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`
                relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-background
                transition-all duration-300 ease-out
                ${active === i ? "z-10 scale-110" : "grayscale hover:grayscale-0 hover:scale-105"}
              `}
            >
              <Image src={t.image || "/placeholder.svg"} alt={t.name} fill className="object-cover" />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-border" />

        {/* Active Author Info */}
        <div className="relative flex-1 min-h-[44px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`
                absolute inset-0 flex flex-col justify-center 
                transition-all duration-400 ease-out
                ${active === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
              `}
            >
              <span className="text-sm font-medium text-foreground">{t.name}</span>
              <span className="text-xs text-muted-foreground">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
