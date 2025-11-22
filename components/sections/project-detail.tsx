"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Zap, Shield, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ImageModal } from "@/components/ui/image-modal"
import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import type { Project } from "@/lib/site-config"

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index)
    setIsModalOpen(true)
  }

  const closeImageModal = () => {
    setIsModalOpen(false)
  }
  // Mock additional project data that would typically come from a CMS or API
  const projectDetails = {
    timeline: "3 months",
    team: "Solo Developer",
    challenges: [
      "Implementing real-time data synchronization",
      "Optimizing database queries for large datasets",
      "Creating responsive UI components",
      "Ensuring cross-browser compatibility",
    ],
    features: [
      "User authentication and authorization",
      "Real-time data updates",
      "Responsive design for all devices",
      "Advanced search and filtering",
      "Data visualization and analytics",
      "Export functionality",
    ],
    metrics: [
      { label: "Performance Score", value: "95/100", icon: Zap },
      { label: "Security Rating", value: "A+", icon: Shield },
      { label: "Users Served", value: "1,000+", icon: Users },
      { label: "Uptime", value: "99.9%", icon: Calendar },
    ],
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Button asChild variant="ghost" className="mb-8 group">
                <Link href="/projects">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Projects
                </Link>
              </Button>

              {/* Project Header */}
              <div className="text-center mb-12">
                <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">{project.title}</h1>
                <p className="text-xl text-primary font-medium mb-6">{project.tagline}</p>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="group">
                    <Link href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      View Live Demo
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group bg-transparent">
                    <Link href={project.source} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      View Source Code
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Project Images Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-2xl font-bold mb-8 text-center">Project Screenshots</h2>
              
              {project.images && project.images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.images.map((image, index) => (
                    <div key={index} className="group cursor-pointer" onClick={() => openImageModal(index)}>
                      <div className="relative aspect-video rounded-2xl overflow-hidden glass-strong hover:shadow-xl transition-all duration-300">
                        <Image
                          src={image} 
                          alt={`${project.title} - Screenshot ${index + 1}`}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-black/50 text-white px-3 py-1 rounded-full flex items-center gap-2">
                            <Expand className="h-4 w-4" />
                            <span className="text-sm">View Fullscreen</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Fallback display
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center glass-strong">
                  <span className="text-6xl font-serif font-bold text-muted-foreground/50">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <FadeIn delay={0.3}>
                  <div>
                    <h2 className="font-serif text-2xl font-bold mb-6">Project Overview</h2>
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        This project demonstrates my expertise in full-stack development, showcasing modern web
                        technologies and best practices. The application was built with scalability, performance, and
                        user experience as top priorities.
                      </p>
                    </div>
                  </div>
                </FadeIn>

                {/* Key Features */}
                <FadeIn delay={0.4}>
                  <div>
                    <h2 className="font-serif text-2xl font-bold mb-6">Key Features</h2>
                    <StaggerContainer className="grid sm:grid-cols-2 gap-4">
                      {projectDetails.features.map((feature, index) => (
                        <StaggerItem key={index}>
                          <div className="flex items-center gap-3 p-4 glass rounded-lg">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </FadeIn>

                {/* Challenges & Solutions */}
                <FadeIn delay={0.5}>
                  <div>
                    <h2 className="font-serif text-2xl font-bold mb-6">Challenges & Solutions</h2>
                    <StaggerContainer className="space-y-4">
                      {projectDetails.challenges.map((challenge, index) => (
                        <StaggerItem key={index}>
                          <Card className="glass">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-xs font-bold text-primary">{index + 1}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{challenge}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </FadeIn>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Tech Stack */}
                <FadeIn delay={0.6}>
                  <Card className="glass">
                    <CardContent className="p-6">
                      <h3 className="font-serif text-lg font-bold mb-4">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>

                {/* Project Info */}
                <FadeIn delay={0.7}>
                  <Card className="glass">
                    <CardContent className="p-6">
                      <h3 className="font-serif text-lg font-bold mb-4">Project Info</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Timeline</span>
                          <span className="text-sm font-medium">{projectDetails.timeline}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Team</span>
                          <span className="text-sm font-medium">{projectDetails.team}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Category</span>
                          <span className="text-sm font-medium">{project.tags[0]}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>

                {/* Performance Metrics */}
                <FadeIn delay={0.8}>
                  <Card className="glass">
                    <CardContent className="p-6">
                      <h3 className="font-serif text-lg font-bold mb-4">Performance</h3>
                      <div className="space-y-4">
                        {projectDetails.metrics.map((metric, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <metric.icon className="h-4 w-4 text-primary" />
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">{metric.label}</span>
                                <span className="text-sm font-medium">{metric.value}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {project.images && project.images.length > 0 && (
        <ImageModal
          images={project.images}
          currentIndex={selectedImageIndex}
          isOpen={isModalOpen}
          onClose={closeImageModal}
          title={project.title}
        />
      )}
    </div>
  )
}
