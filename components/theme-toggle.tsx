"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { motion, AnimatePresence } from "framer-motion"

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

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/50 backdrop-blur-sm hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <div className="relative w-5 h-5">
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Moon className="h-5 w-5 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sun className="h-5 w-5 text-secondary" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>

      <motion.div
        className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-sm -z-10"
        animate={{
          opacity: isDark ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}
