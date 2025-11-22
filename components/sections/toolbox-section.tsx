"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wrench, Code, Database, Cloud, Palette, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/motion/fade-in"

const toolCategories = {
  Development: {
    icon: Code,
    tools: ["VS Code", "WebStorm", "Postman", "Chrome DevTools", "React DevTools"],
  },
  Database: {
    icon: Database,
    tools: ["MongoDB Compass", "pgAdmin", "Redis CLI", "Prisma Studio"],
  },
  Deployment: {
    icon: Cloud,
    tools: ["Vercel", "Netlify", "Heroku", "Docker", "GitHub Actions"],
  },
  Design: {
    icon: Palette,
    tools: ["Figma", "Adobe XD", "Canva", "Tailwind CSS", "Framer Motion"],
  },
  Terminal: {
    icon: Terminal,
    tools: ["Git", "npm/yarn", "Bash", "PowerShell", "Oh My Zsh"],
  },
}

export function ToolboxSection() {
  const [selectedCategory, setSelectedCategory] = useState("Development")

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">My Toolbox</h2>
              <p className="text-lg text-muted-foreground">The tools and software that power my development workflow</p>
            </div>
          </FadeIn>

          <div className="space-y-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(toolCategories).map(([category, { icon: Icon }]) => (
                <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {category}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Tools Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {toolCategories[selectedCategory as keyof typeof toolCategories].tools.map((tool, index) => (
                    <motion.div
                      key={tool}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <Card className="glass text-center group hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/30 transition-colors">
                            <Wrench className="h-5 w-5 text-primary" />
                          </div>
                          <p className="text-sm font-medium">{tool}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
