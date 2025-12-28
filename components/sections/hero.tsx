"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Download, Github, Linkedin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Professional animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background via-50% to-secondary/10" />

        {shouldAnimate && (
          <>
            <motion.div
              className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/15 to-secondary/15 rounded-full blur-3xl will-change-transform"
              animate={{
                x: [0, 40, -25, 0],
                y: [0, -25, 15, 0],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute bottom-32 right-32 w-40 h-40 bg-gradient-to-br from-secondary/12 to-accent/15 rounded-full blur-3xl will-change-transform"
              animate={{
                x: [0, -60, 40, 0],
                y: [0, 45, -30, 0],
              }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </>
        )}

        {/* Grid pattern overlay */}
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
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
          {/* Greeting */}
          <FadeIn delay={0.1}>
            <motion.div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <motion.span
                className="text-xl sm:text-2xl"
                animate={shouldAnimate ? { rotate: [0, 12, -6, 12, 0] } : undefined}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              >
                👋
              </motion.span>
              <span className="text-base sm:text-lg text-muted-foreground">Hello, I'm</span>
            </motion.div>
          </FadeIn>

          {/* Main Name - Better mobile sizing */}
          <FadeIn delay={0.2}>
            <h1
              className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight ${shouldAnimate ? "animate-gradient bg-[length:200%_200%]" : ""}`}
            >
              {siteConfig.name}
            </h1>
          </FadeIn>

          {/* Role Badges - Better mobile spacing */}
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold backdrop-blur-sm">
                MERN/MEAN
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-xs sm:text-sm font-semibold backdrop-blur-sm">
                UI-centric Engineer
              </span>
            </div>
          </FadeIn>

          {/* Description - Better mobile readability */}
          <FadeIn delay={0.4}>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-2xl leading-relaxed px-2">
              {siteConfig.summary}
            </p>
          </FadeIn>

          {/* CTA Buttons - Better mobile layout */}
          <FadeIn delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 w-full sm:w-auto px-4 sm:px-0">
              <Button
                asChild
                size="lg"
                className="group glow-primary hover:glow-secondary transition-all duration-200 w-full sm:w-auto"
              >
                <Link href="/projects">
                  View My Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group glass hover:glass-strong transition-all duration-200 bg-transparent w-full sm:w-auto"
              >
                <a href="/Yugal_jakasaniya_resume.pdf" download>
                  <Download className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  Download CV
                </a>
              </Button>
            </div>
          </FadeIn>

          {/* Social Links - Better mobile touch targets */}
          <FadeIn delay={0.6}>
            <div className="flex gap-2 sm:gap-3">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform duration-200 glass hover:glow-primary h-10 w-10 sm:h-11 sm:w-11"
              >
                <Link href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform duration-200 glass hover:glow-primary h-10 w-10 sm:h-11 sm:w-11"
              >
                <Link href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform duration-200 glass hover:glow-primary h-10 w-10 sm:h-11 sm:w-11"
              >
                <Link href={`mailto:${siteConfig.email}`}>
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform duration-200 glass hover:glow-primary h-10 w-10 sm:h-11 sm:w-11"
              >
                <Link href={`tel:${siteConfig.phone}`}>
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Phone</span>
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator - hidden on small mobile */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center glass">
          <div className="w-1 h-3 bg-gradient-to-b from-primary to-secondary rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}
