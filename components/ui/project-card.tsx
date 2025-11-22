"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/site-config"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
      <Card className="glass group h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Project Image */}
        <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
          {project.images && project.images.length > 0 ? (
            <Image
              src={project.images[0]} 
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <motion.div
                className="text-4xl font-serif font-bold text-muted-foreground/50"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {project.title.charAt(0)}
              </motion.div>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Button asChild size="sm" variant="secondary">
              <Link href={project.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link href={project.source} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <CardContent className="p-6 flex-1">
          <div className="space-y-4">
            {/* Title and Tagline */}
            <div>
              <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-primary font-medium mb-3">{project.tagline}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.tech.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{project.tech.length - 4}
                </Badge>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <div className="flex gap-2 w-full">
            <Button asChild size="sm" className="flex-1 group/btn">
              <Link href={`/projects/${project.id}`}>
                View Details
                <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={project.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={project.source} target="_blank" rel="noopener noreferrer">
                <Github className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
