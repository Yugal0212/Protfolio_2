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
      className={`fixed bottom-6 left-6 z-50 transition-all duration-300 ease-out ${
        isVisible 
          ? "translate-y-0 opacity-100 scale-100" 
          : "translate-y-20 opacity-0 scale-75 pointer-events-none"
      }`}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="h-14 w-14 rounded-full bg-gradient-to-br from-primary via-primary/90 to-secondary shadow-2xl hover:shadow-primary/50 hover:scale-110 active:scale-95 transition-all duration-200 group border-2 border-background/20 backdrop-blur-md will-change-transform"
        aria-label="Back to top"
      >
        <ArrowUp className="h-6 w-6 text-primary-foreground transition-all duration-200 group-hover:-translate-y-1 group-hover:scale-110" />
      </Button>
    </div>
  )
}
