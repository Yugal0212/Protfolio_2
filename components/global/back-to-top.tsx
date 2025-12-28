"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    
    const toggleVisibility = () => {
      // Debounce for better performance
      if (timeoutId) clearTimeout(timeoutId)
      
      timeoutId = setTimeout(() => {
        // Show button only when scrolled down at least 400px
        if (window.scrollY > 400) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }, 100)
    }

    // Check initial scroll position
    toggleVisibility()

    // Add scroll event listener with passive for better performance
    window.addEventListener("scroll", toggleVisibility, { passive: true })

    // Clean up
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div
      className={`fixed bottom-8 left-8 z-50 transition-all duration-300 ease-out ${
        isVisible 
          ? "translate-x-0 opacity-100 scale-100 rotate-0" 
          : "-translate-x-20 opacity-0 scale-75 -rotate-45 pointer-events-none"
      }`}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="h-14 w-14 rounded-full bg-gradient-to-br from-primary via-primary/90 to-secondary shadow-2xl hover:shadow-primary/60 hover:scale-110 hover:rotate-[-5deg] active:scale-95 active:rotate-0 transition-all duration-200 group border-2 border-border/50 backdrop-blur-sm will-change-transform animate-pulse hover:animate-none"
        aria-label="Back to top"
      >
        <ArrowUp className="h-6 w-6 text-primary-foreground transition-all duration-200 group-hover:-translate-y-1 group-hover:scale-110" />
      </Button>
    </div>
  )
}
