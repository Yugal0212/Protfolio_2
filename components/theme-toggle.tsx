"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
        <Sun className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const isDark = theme === "dark"

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      data-theme-toggle
      className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/50 backdrop-blur-sm hover:from-primary/20 hover:to-secondary/20 transition-colors duration-75 shadow-lg hover:shadow-xl active:scale-95"
    >
      {isDark ? (
        <Moon className="h-5 w-5 text-primary" />
      ) : (
        <Sun className="h-5 w-5 text-secondary" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
