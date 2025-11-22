"use client"

import { useEffect, useState } from "react"

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

export function AnimatedBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Create floating elements
    const createElements = () => {
      const newElements: FloatingElement[] = []
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 60 + 20,
          speed: Math.random() * 0.5 + 0.2,
          direction: Math.random() * Math.PI * 2,
          opacity: Math.random() * 0.3 + 0.1,
          type: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as "circle" | "square" | "triangle",
        })
      }
      setElements(newElements)
    }

    createElements()

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Animation loop
    const animateElements = () => {
      setElements((prev) =>
        prev.map((element) => {
          let newX = element.x + Math.cos(element.direction) * element.speed
          let newY = element.y + Math.sin(element.direction) * element.speed

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

    window.addEventListener("mousemove", handleMouseMove)
    const interval = setInterval(animateElements, 50)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-pink-950/30 animate-gradient-shift" />

        {/* Moving gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-reverse" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/15 to-blue-400/15 rounded-full blur-2xl animate-pulse-slow" />

        {/* Animated mesh pattern */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mesh" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="currentColor" className="text-blue-400/40 animate-pulse">
                  <animate attributeName="r" values="1;2;1" dur="4s" repeatCount="indefinite" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mesh)" />
          </svg>
        </div>
      </div>

      {/* Floating elements */}
      <div className="fixed inset-0 -z-40 pointer-events-none overflow-hidden">
        {elements.map((element) => {
          const distanceFromMouse = Math.sqrt(
            Math.pow(element.x - mousePosition.x, 2) + Math.pow(element.y - mousePosition.y, 2),
          )
          const mouseInfluence = Math.max(0, 1 - distanceFromMouse / 200)
          const scale = 1 + mouseInfluence * 0.5

          return (
            <div
              key={element.id}
              className={`absolute transition-transform duration-300 ${
                element.type === "circle" ? "rounded-full" : element.type === "square" ? "rounded-lg" : "rounded-none"
              }`}
              style={{
                left: element.x,
                top: element.y,
                width: element.size,
                height: element.size,
                opacity: element.opacity + mouseInfluence * 0.3,
                transform: `scale(${scale}) ${element.type === "triangle" ? "rotate(45deg)" : ""}`,
                background:
                  element.type === "circle"
                    ? "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 100%)"
                    : element.type === "square"
                      ? "linear-gradient(45deg, rgba(147, 51, 234, 0.3) 0%, rgba(236, 72, 153, 0.2) 100%)"
                      : "linear-gradient(135deg, rgba(236, 72, 153, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%)",
                boxShadow: `0 0 ${20 + mouseInfluence * 20}px rgba(59, 130, 246, ${0.2 + mouseInfluence * 0.3})`,
                filter: "blur(1px)",
              }}
            />
          )
        })}
      </div>

      {/* Animated shadows */}
      <div className="fixed inset-0 -z-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 dark:opacity-30"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                width: `${60 + i * 20}px`,
                height: `${60 + i * 20}px`,
                background: `radial-gradient(circle, rgba(${i % 2 ? "59, 130, 246" : "147, 51, 234"}, 0.4) 0%, transparent 70%)`,
                animation: `float-${i % 3} ${8 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
