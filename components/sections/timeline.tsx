"use client"

import { motion } from "framer-motion"
import { GraduationCap, Code, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"

const timelineEvents = [
  {
    year: "2023",
    title: "Started B.Sc. Computer Science",
    description: "Began my formal journey in computer science at Darshan University",
    icon: GraduationCap,
    type: "education",
  },
  {
    year: "2024",
    title: "First Full-Stack Project",
    description: "Built Masterpiece Ceramic - my first professional ERP-style application",
    icon: Code,
    type: "project",
  },
  {
    year: "2024",
    title: "Open House Showcase",
    description: "Presented my work at Karnavati University's Open House event",
    icon: Trophy,
    type: "achievement",
  },
  {
    year: "2025",
    title: "Hackathon Finalist",
    description: "Reached finals in CodeArena 1.0 with AI Language Learning prototype",
    icon: Trophy,
    type: "achievement",
  },
]

export function Timeline() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">My Journey</h2>
              <p className="text-lg text-muted-foreground">Key milestones in my development career</p>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

            <StaggerContainer className="space-y-8">
              {timelineEvents.map((event, index) => (
                <StaggerItem key={index}>
                  <div className="relative flex items-start gap-6">
                    {/* Timeline Dot */}
                    <motion.div
                      className="relative z-10 w-16 h-16 bg-background border-4 border-primary rounded-full flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <event.icon className="h-6 w-6 text-primary" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className="flex-1 pb-8"
                      whileHover={{ x: 8 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Card className="glass">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm font-bold text-primary bg-primary/20 px-2 py-1 rounded">
                              {event.year}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                event.type === "education"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                  : event.type === "project"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                              }`}
                            >
                              {event.type}
                            </span>
                          </div>
                          <h3 className="font-serif text-lg font-bold mb-2">{event.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
