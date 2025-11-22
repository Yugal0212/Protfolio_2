"use client"

import { motion } from "framer-motion"
import { Code, Coffee, Lightbulb, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"

const personalValues = [
  {
    icon: Code,
    title: "Clean Code",
    description: "I believe in writing code that is not just functional, but also readable and maintainable.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Always exploring new technologies and approaches to solve problems more effectively.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Great software is built by great teams. I value communication and teamwork.",
  },
  {
    icon: Coffee,
    title: "Continuous Learning",
    description: "The tech world evolves rapidly, and I'm committed to growing with it every day.",
  },
]

const funFacts = [
  "Started coding at age 18",
  "Built my first web app in college",
  "Love participating in hackathons",
  "Enjoy mentoring junior developers",
  "Always learning new frameworks",
  "Coffee enthusiast ☕",
]

export function PersonalSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Values */}
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">My Values</h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide my approach to development and life
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {personalValues.map((value, index) => (
              <StaggerItem key={value.title}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                  <Card className="glass h-full text-center group">
                    <CardContent className="p-6">
                      <motion.div
                        className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <value.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <h3 className="font-serif text-lg font-bold mb-3">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Fun Facts */}
          <FadeIn delay={0.4}>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Fun Facts</h2>
              <p className="text-lg text-muted-foreground">A few things that make me who I am</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {funFacts.map((fact, index) => (
              <StaggerItem key={index}>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                  <Card className="glass group">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-sm">{fact}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
