"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"

const certificates = [
  {
    title: "Full-Stack Web Development",
    issuer: "Online Learning Platform",
    date: "2024",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    verified: true,
    link: "#",
  },
  {
    title: "Cloud Deployment & DevOps",
    issuer: "Cloud Academy",
    date: "2024",
    skills: ["AWS", "Docker", "CI/CD", "Kubernetes"],
    verified: true,
    link: "#",
  },
  {
    title: "Database Design & Management",
    issuer: "Database Institute",
    date: "2023",
    skills: ["PostgreSQL", "MongoDB", "Database Design", "Query Optimization"],
    verified: true,
    link: "#",
  },
  {
    title: "Modern JavaScript & TypeScript",
    issuer: "JavaScript Academy",
    date: "2023",
    skills: ["ES6+", "TypeScript", "Async Programming", "Testing"],
    verified: true,
    link: "#",
  },
]

export function CertificatesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Professional Certifications</h2>
              <p className="text-lg text-muted-foreground">
                Continuous learning and skill validation through industry-recognized certifications
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <StaggerItem key={index}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                  <Card className="glass group h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Certificate Icon */}
                        <motion.div
                          className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Award className="h-6 w-6 text-primary" />
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-serif text-lg font-bold group-hover:text-primary transition-colors">
                                {cert.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                            </div>
                            {cert.verified && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              >
                                Verified
                              </Badge>
                            )}
                          </div>

                          <div className="text-xs text-muted-foreground">Issued: {cert.date}</div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-1.5">
                            {cert.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline" className="group/btn bg-transparent">
                              <ExternalLink className="mr-2 h-3 w-3 group-hover/btn:scale-110 transition-transform" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="group/btn bg-transparent">
                              <Download className="mr-2 h-3 w-3 group-hover/btn:scale-110 transition-transform" />
                              Download
                            </Button>
                          </div>
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
