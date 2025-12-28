"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Trophy, Award, ExternalLink, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { siteConfig } from "@/lib/site-config"

// Extended achievements with more details
const extendedAchievements = [
  {
    ...siteConfig.achievements[0],
    description:
      "Reached the finals of CodeArena 1.0 hackathon with an innovative AI Language Learning prototype using LLaMA technology.",
    icon: Trophy,
    color: "from-yellow-400 to-orange-500",
    category: "Hackathon",
  },
  {
    ...siteConfig.achievements[1],
    description:
      "Selected to showcase my projects at Karnavati University's prestigious Open House event, demonstrating technical excellence.",
    icon: Award,
    color: "from-blue-400 to-purple-500",
    category: "Showcase",
  },
  {
    title: "Full-Stack Development Mastery",
    org: "Self-Directed Learning",
    link: "#",
    date: "2024",
    description:
      "Achieved proficiency in modern full-stack development with MERN and MEAN stacks, building 5+ production-ready applications.",
    icon: Award,
    color: "from-green-400 to-teal-500",
    category: "Skill",
  },
  {
    title: "Open Source Contributor",
    org: "GitHub Community",
    link: siteConfig.socials.github,
    date: "Ongoing",
    description:
      "Active contributor to open-source projects, sharing knowledge and collaborating with the developer community.",
    icon: Award,
    color: "from-purple-400 to-pink-500",
    category: "Community",
  },
]

export function AchievementsGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {extendedAchievements.map((achievement, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onHoverStart={() => {
                    // Subtle confetti effect on hover
                    if (typeof window !== "undefined") {
                      // This would integrate with a confetti library in a real implementation
                      console.log("Confetti effect triggered for:", achievement.title)
                    }
                  }}
                >
                  <Card className="glass h-full group overflow-hidden relative">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                    />

                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <motion.div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center flex-shrink-0`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <achievement.icon className="h-6 w-6 text-white" />
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-serif text-lg font-bold group-hover:text-primary transition-colors">
                                {achievement.title}
                              </h3>
                              <p className="text-sm text-muted-foreground font-medium">{achievement.org}</p>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {achievement.category}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {achievement.date}
                            </div>
                          </div>

                          {achievement.link !== "#" && (
                            <Button asChild size="sm" variant="outline" className="group/btn bg-transparent">
                              <Link href={achievement.link} target="_blank" rel="noopener noreferrer">
                                View Details
                                <ExternalLink className="ml-2 h-3 w-3 group-hover/btn:scale-110 transition-transform" />
                              </Link>
                            </Button>
                          )}
                        </div>
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
