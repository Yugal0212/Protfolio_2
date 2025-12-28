"use client"

import { motion } from "framer-motion"
import { Mail, MessageCircle, Coffee } from "lucide-react"
import { FadeIn } from "@/components/motion/fade-in"

export function ContactHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Floating Icons */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 text-primary/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Mail className="h-16 w-16" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/4 text-secondary/20"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <MessageCircle className="h-12 w-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-1/3 text-primary/20"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Coffee className="h-14 w-14" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6">Let's Work Together</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm always excited to discuss new opportunities, collaborate on interesting projects, or just have a
              conversation about technology. Drop me a message!
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
