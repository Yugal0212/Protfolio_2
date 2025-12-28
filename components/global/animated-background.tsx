"use client"

import { useEffect, useState, useMemo, memo } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  speed: number
  direction: number
  opacity: number
  type: "circle" | "square" | "triangle"
}

export const AnimatedBackground = memo(function AnimatedBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  const elementCount = useMemo(() => (isMobile ? 0 : 4), [isMobile])

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    if (isMobile) {
      return () => window.removeEventListener("resize", checkMobile)
    }

    // Create floating elements
    const createElements = () => {
      const newElements: FloatingElement[] = []
      for (let i = 0; i < elementCount; i++) {
        newElements.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 60 + 20,
          speed: Math.random() * 0.3 + 0.1,
          direction: Math.random() * Math.PI * 2,
          opacity: Math.random() * 0.2 + 0.05,
          type: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as "circle" | "square" | "triangle",
        })
      }
      setElements(newElements)
    }

    createElements()

    let rafId: number
    let lastUpdate = 0
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate < 80) return
      lastUpdate = now

      if (rafId) return
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
        rafId = 0
      })
    }

    const animateElements = () => {
      setElements((prev) =>
        prev.map((element) => {
          let newX = element.x + Math.cos(element.direction) * element.speed * 1.2
          let newY = element.y + Math.sin(element.direction) * element.speed * 1.2

          // Bounce off edges
          if (newX < 0 || newX > window.innerWidth) {
            element.direction = Math.PI - element.direction
            newX = Math.max(0, Math.min(window.innerWidth, newX))
          }
          if (newY < 0 || newY > window.innerHeight) {
            element.direction = -element.direction
            newY = Math.max(0, Math.min(window.innerHeight, newY))
          }

          return {
            ...element,
            x: newX,
            y: newY,
          }
        }),
      )
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    const interval = setInterval(animateElements, 80)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(interval)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [elementCount, isMobile])

  if (isMobile) {
    return (
      <div className="fixed inset-0 -z-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-pink-950/30" />
      </div>
    )
  }

  return (
    <>
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-pink-950/30" />

        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl"
          style={{ animation: "float-slow 6s ease-in-out infinite" }}
        />
        <div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl"
          style={{ animation: "float-reverse 8s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-blue-400/10 rounded-full blur-2xl"
          style={{ animation: "pulse-slow 4s ease-in-out infinite" }}
        />
      </div>

      {/* Floating elements */}
      <div className="fixed inset-0 -z-40 pointer-events-none overflow-hidden">
        {elements.map((element) => {
          const distanceFromMouse = Math.sqrt(
            Math.pow(element.x - mousePosition.x, 2) + Math.pow(element.y - mousePosition.y, 2),
          )
          const mouseInfluence = Math.max(0, 1 - distanceFromMouse / 300)
          const scale = 1 + mouseInfluence * 0.3

          return (
            <div
              key={element.id}
              className={`absolute will-change-transform ${
                element.type === "circle" ? "rounded-full" : element.type === "square" ? "rounded-lg" : "rounded-none"
              }`}
              style={{
                left: element.x,
                top: element.y,
                width: element.size,
                height: element.size,
                opacity: element.opacity + mouseInfluence * 0.2,
                transform: `translate3d(0, 0, 0) scale(${scale}) ${element.type === "triangle" ? "rotate(45deg)" : ""}`,
                transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
                background:
                  element.type === "circle"
                    ? "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.1) 100%)"
                    : element.type === "square"
                      ? "linear-gradient(45deg, rgba(147, 51, 234, 0.2) 0%, rgba(236, 72, 153, 0.1) 100%)"
                      : "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)",
                boxShadow: `0 0 ${15 + mouseInfluence * 15}px rgba(59, 130, 246, ${0.15 + mouseInfluence * 0.2})`,
                filter: "blur(1px)",
              }}
            />
          )
        })}
      </div>

      <div className="fixed inset-0 -z-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-15 dark:opacity-25 will-change-transform"
              style={{
                left: `${10 + i * 18}%`,
                top: `${20 + (i % 3) * 25}%`,
                width: `${60 + i * 20}px`,
                height: `${60 + i * 20}px`,
                background: `radial-gradient(circle, rgba(${i % 2 ? "59, 130, 246" : "147, 51, 234"}, 0.3) 0%, transparent 70%)`,
                animation: `float-${i % 3} ${6 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
})
