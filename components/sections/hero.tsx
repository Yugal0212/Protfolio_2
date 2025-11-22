"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Download, Github, Linkedin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/motion/fade-in"
import { siteConfig } from "@/lib/site-config"

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const shouldAnimate = !shouldReduceMotion && !isMobile

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background via-50% to-secondary/8" />

        {/* Floating geometric shapes - only on desktop for performance */}
        {shouldAnimate && (
          <>
            <motion.div
              className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl"
              animate={{
                x: [0, 50, -30, 0],
                y: [0, -30, 20, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ willChange: "transform" }}
            />

            <motion.div
              className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-accent/25 to-primary/15 rounded-full blur-xl"
              animate={{
                x: [0, -40, 60, 0],
                y: [0, 40, -20, 0],
                scale: [1, 0.7, 1.3, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ willChange: "transform" }}
            />

            <motion.div
              className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br from-secondary/15 to-accent/20 rounded-full blur-3xl"
              animate={{
                x: [0, 80, -50, 0],
                y: [0, -60, 40, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ willChange: "transform" }}
            />
          </>
        )}

        {/* Professional grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(var(--foreground-rgb), 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--foreground-rgb), 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Subtle noise texture for professional finish */}
        <div className="absolute inset-0 opacity-30 mix-blend-soft-light">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {shouldAnimate && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/15 to-secondary/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -50, 30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: "transform" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-secondary/12 to-accent/8 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 80, 0],
              y: [0, 50, -30, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: "transform" }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Greeting */}
          <FadeIn delay={0.2}>
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              whileHover={shouldAnimate ? { scale: 1.05 } : undefined}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.span
                className="text-2xl"
                animate={shouldAnimate ? { rotate: [0, 14, -8, 14, -4, 10, 0] } : undefined}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              >
                👋
              </motion.span>
              <span className="text-muted-foreground">Hello, I'm</span>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <h1 className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent ${shouldAnimate ? 'animate-gradient bg-[length:200%_200%]' : ''}`}>
              {siteConfig.name}
            </h1>
          </FadeIn>

          {/* Role Badges */}
          <FadeIn delay={0.6}>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {siteConfig.tagline.split(" • ").map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`text-sm px-3 py-1 glass ${shouldAnimate ? 'animate-float' : ''}`}
                  style={shouldAnimate ? { animationDelay: `${index * 0.2}s` } : undefined}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </FadeIn>

          {/* Summary */}
          <FadeIn delay={0.8}>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {siteConfig.summary}
            </p>
          </FadeIn>

          <FadeIn delay={1.0}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="group glow-primary hover:glow-secondary transition-all duration-300">
                <Link href="/projects">
                  View My Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group glass hover:glass-strong transition-all duration-300 bg-transparent"
              >
                <Link href="/resume">
                  <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  Download CV
                </Link>
              </Button>
            </div>
          </FadeIn>

          {/* Social Links */}
          <FadeIn delay={1.2}>
            <div className="flex justify-center gap-4">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform glass hover:glow-primary"
              >
                <Link href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform glass hover:glow-primary"
              >
                <Link href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform glass hover:glow-primary"
              >
                <Link href={`mailto:${siteConfig.email}`}>
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform glass hover:glow-primary"
              >
                <Link href={`tel:${siteConfig.phone}`}>
                  <Phone className="h-5 w-5" />
                  <span className="sr-only">Phone</span>
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center glass">
          <div className="w-1 h-3 bg-gradient-to-b from-primary to-secondary rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}
