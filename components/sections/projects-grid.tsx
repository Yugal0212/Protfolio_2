"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectCard } from "@/components/ui/project-card"
import { ProjectFilter } from "@/components/ui/project-filter"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { siteConfig } from "@/lib/site-config"

export function ProjectsGrid() {
  const [selectedFilter, setSelectedFilter] = useState("All")

  // Get all unique tags from projects
  const allTags = Array.from(new Set(siteConfig.projects.flatMap((project) => project.tags))).sort()

  const filters = ["All", ...allTags]

  // Filter projects based on selected filter
  const filteredProjects =
    selectedFilter === "All"
      ? siteConfig.projects
      : siteConfig.projects.filter((project) => project.tags.includes(selectedFilter))

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <ProjectFilter filters={filters} selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <StaggerItem key={project.id}>
                  <ProjectCard project={project} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              No projects found for "{selectedFilter}". Try a different filter.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
