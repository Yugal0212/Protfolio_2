"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface ProjectFilterProps {
  filters: string[]
  selectedFilter: string
  onFilterChange: (filter: string) => void
}

export function ProjectFilter({ filters, selectedFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <motion.div key={filter} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(filter)}
              className={`relative transition-all duration-200 ${
                selectedFilter === filter ? "bg-primary text-primary-foreground" : "bg-transparent hover:bg-muted"
              }`}
            >
              {filter}
              {selectedFilter === filter && (
                <motion.div
                  className="absolute inset-0 bg-primary rounded-md -z-10"
                  layoutId="activeFilter"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
