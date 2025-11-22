"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/lib/site-config"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Achievements", href: "/achievements" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-strong shadow-2xl border-b border-border/20" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 animate-gradient opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="flex items-center space-x-2 font-serif text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-accent transition-all duration-300"
            >
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <span>{siteConfig.name}</span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 rounded-lg hover:bg-primary/10 group"
                >
                  {item.name}
                  <motion.div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-full group-hover:left-0 transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="sm"
                className="font-medium bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                <Link href="/contact" className="flex items-center space-x-2">
                  <span>Get In Touch</span>
                  <Sparkles className="h-3 w-3" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/50 backdrop-blur-sm hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t border-border/20 glass-strong rounded-b-2xl mt-2"
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-xl transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4"
                >
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent shadow-lg transition-all duration-300"
                  >
                    <Link href="/contact" className="flex items-center justify-center space-x-2">
                      <span>Get In Touch</span>
                      <Sparkles className="h-3 w-3" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
