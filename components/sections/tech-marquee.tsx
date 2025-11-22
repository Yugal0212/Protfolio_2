"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/fade-in"

const technologies = [
  { name: "React", color: "#61DAFB" },
  { name: "Node.js", color: "#339933" },
  { name: "MongoDB", color: "#47A248" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Next.js", color: "#000000" },
  { name: "Angular", color: "#DD0031" },
  { name: "Express.js", color: "#000000" },
  { name: "Nest.js", color: "#E0234E" },
  { name: "Vercel", color: "#000000" },
  { name: "GitHub", color: "#181717" },
  { name: "Tailwind CSS", color: "#06B6D4" },
]

export function TechMarquee() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Technologies I Work With</h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Marquee */}
          <motion.div
            className="flex gap-8 py-4"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate the array to create seamless loop */}
            {[...technologies, ...technologies].map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex-shrink-0 flex items-center gap-3 glass px-6 py-3 rounded-full group hover:scale-105 transition-transform"
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tech.color }} />
                <span className="font-medium text-sm whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
