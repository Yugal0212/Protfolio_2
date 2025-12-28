"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { siteConfig } from "@/lib/site-config"

const skillLevels = {
  // Languages
  JavaScript: 90,
  Python: 85,
  Java: 80,
  C: 75,

  // Frontend
  React: 95,
  Angular: 85,
  HTML: 95,
  CSS: 90,

  // Backend
  "Node.js": 90,
  "Express.js": 85,
  "Nest.js": 80,

  // Databases
  MongoDB: 85,
  PostgreSQL: 80,

  // Tools
  Git: 90,
  GitHub: 90,
  Vercel: 85,
  Netlify: 80,
}

export function SkillsGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Skills & Expertise</h2>
              <p className="text-lg text-muted-foreground">Technologies I work with and my proficiency levels</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid lg:grid-cols-2 gap-8">
            {Object.entries(siteConfig.skills).map(([category, skills]) => (
              <StaggerItem key={category}>
                <Card className="glass h-full">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl capitalize">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skills.map((skill) => (
                      <motion.div
                        key={skill}
                        className="space-y-2"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{skill}</span>
                          <Badge variant="secondary" className="text-xs">
                            {skillLevels[skill as keyof typeof skillLevels] || 75}%
                          </Badge>
                        </div>
                        <Progress value={skillLevels[skill as keyof typeof skillLevels] || 75} className="h-2" />
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
