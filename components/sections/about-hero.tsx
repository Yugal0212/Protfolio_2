"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/fade-in"
import { siteConfig } from "@/lib/site-config"

export function AboutHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6">About Me</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Passionate about creating digital solutions that make a difference
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <FadeIn delay={0.2}>
              <div className="relative">
                <motion.div
                  className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl glass-strong flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <span className="text-8xl font-serif font-bold text-muted-foreground/50">
                    {siteConfig.name.charAt(0)}
                  </span>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full blur-xl"
                  animate={{
                    y: [0, 10, 0],
                    scale: [1, 0.9, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </FadeIn>

            {/* About Content */}
            <FadeIn delay={0.4}>
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-4">Hello, I'm {siteConfig.name}</h2>
                  <p className="text-muted-foreground leading-relaxed">{siteConfig.summary}</p>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold mb-3">What Drives Me</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I believe in the power of technology to solve real-world problems. Every line of code I write is
                    aimed at creating meaningful experiences and efficient solutions. My journey in software development
                    is fueled by curiosity, continuous learning, and the desire to build products that matter.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold mb-3">Beyond Code</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When I'm not coding, you'll find me exploring new technologies, participating in hackathons, or
                    contributing to open-source projects. I enjoy staying up-to-date with the latest trends in web
                    development and sharing knowledge with the developer community.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
