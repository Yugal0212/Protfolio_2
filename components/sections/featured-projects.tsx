"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/motion/fade-in"
import { siteConfig } from "@/lib/site-config"

export function FeaturedProjects() {
  const featuredProjects = siteConfig.projects?.filter((project) => project.featured) || []
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || featuredProjects.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [featuredProjects.length, isAutoPlaying])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  if (featuredProjects.length === 0) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-lg text-muted-foreground">Loading featured projects...</p>
            </div>
          </FadeIn>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Showcasing some of my best work in full-stack development, from ERP systems to real-time applications.
            </p>
          </div>
        </FadeIn>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div
            className="relative overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: [0.25, 0.25, 0, 1] }}
              >
                <Card className="glass-strong border-0">
                  <CardContent className="p-8 lg:p-12">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      {/* Project Image */}
                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl overflow-hidden">
                          {featuredProjects[currentIndex]?.images && featuredProjects[currentIndex]?.images[0] ? (
                            <Image
                              src={featuredProjects[currentIndex].images[0]}
                              alt={featuredProjects[currentIndex].title}
                              width={600}
                              height={400}
                              className="w-full h-full object-cover"
                              priority
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-4xl font-serif font-bold text-muted-foreground/50">
                                {featuredProjects[currentIndex]?.title?.charAt(0) || "P"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-2">
                            {featuredProjects[currentIndex]?.title || "Project Title"}
                          </h3>
                          <p className="text-lg text-primary font-medium mb-4">
                            {featuredProjects[currentIndex]?.tagline || "Project tagline"}
                          </p>
                          <p className="text-muted-foreground leading-relaxed">
                            {featuredProjects[currentIndex]?.description || "Project description"}
                          </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {featuredProjects[currentIndex]?.tech?.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          )) || []}
                        </div>

                        {/* Highlights */}
                        <ul className="space-y-2">
                          {featuredProjects[currentIndex]?.highlights?.map((highlight, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {highlight}
                            </li>
                          )) || []}
                        </ul>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button asChild size="sm" className="group">
                            <Link href={featuredProjects[currentIndex]?.live || "#"}>
                              <ExternalLink className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                              Live Demo
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="sm">
                            <Link href={featuredProjects[currentIndex]?.source || "#"}>
                              <Github className="mr-2 h-4 w-4" />
                              Source
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 glass h-10 w-10 hover:scale-110 transition-transform"
              onClick={prevProject}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 glass h-10 w-10 hover:scale-110 transition-transform"
              onClick={nextProject}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* View All Projects */}
        <FadeIn delay={0.4}>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="group bg-transparent">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
