"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Home, User, FolderOpen, Trophy, Mail, FileText, Github, Linkedin, ExternalLink, Search } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

interface CommandPaletteItem {
  id: string
  title: string
  description?: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  group: string
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const commands: CommandPaletteItem[] = [
    // Navigation
    {
      id: "home",
      title: "Home",
      description: "Go to homepage",
      icon: Home,
      action: () => router.push("/"),
      group: "Navigation",
    },
    {
      id: "about",
      title: "About",
      description: "Learn more about me",
      icon: User,
      action: () => router.push("/about"),
      group: "Navigation",
    },
    {
      id: "projects",
      title: "Projects",
      description: "View my work",
      icon: FolderOpen,
      action: () => router.push("/projects"),
      group: "Navigation",
    },
    {
      id: "achievements",
      title: "Achievements",
      description: "See my accomplishments",
      icon: Trophy,
      action: () => router.push("/achievements"),
      group: "Navigation",
    },
    {
      id: "contact",
      title: "Contact",
      description: "Get in touch",
      icon: Mail,
      action: () => router.push("/contact"),
      group: "Navigation",
    },
    {
      id: "resume",
      title: "Resume",
      description: "View or download my resume",
      icon: FileText,
      action: () => router.push("/resume"),
      group: "Navigation",
    },

    // Projects
    ...siteConfig.projects.map((project) => ({
      id: `project-${project.id}`,
      title: project.title,
      description: project.tagline,
      icon: FolderOpen,
      action: () => router.push(`/projects/${project.id}`),
      group: "Projects",
    })),

    // External Links
    {
      id: "github",
      title: "GitHub Profile",
      description: "View my code repositories",
      icon: Github,
      action: () => window.open(siteConfig.socials.github, "_blank"),
      group: "External",
    },
    {
      id: "linkedin",
      title: "LinkedIn Profile",
      description: "Connect with me professionally",
      icon: Linkedin,
      action: () => window.open(siteConfig.socials.linkedin, "_blank"),
      group: "External",
    },
    {
      id: "email",
      title: "Send Email",
      description: "Contact me directly",
      icon: Mail,
      action: () => (window.location.href = `mailto:${siteConfig.email}`),
      group: "External",
    },
  ]

  const handleSelect = (command: CommandPaletteItem) => {
    setOpen(false)
    command.action()
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:scale-110"
      >
        <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
      </button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Navigation">
              {commands
                .filter((cmd) => cmd.group === "Navigation")
                .map((command) => (
                  <CommandItem key={command.id} onSelect={() => handleSelect(command)}>
                    <command.icon className="mr-2 h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{command.title}</div>
                      {command.description && (
                        <div className="text-xs text-muted-foreground">{command.description}</div>
                      )}
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Projects">
              {commands
                .filter((cmd) => cmd.group === "Projects")
                .slice(0, 5)
                .map((command) => (
                  <CommandItem key={command.id} onSelect={() => handleSelect(command)}>
                    <command.icon className="mr-2 h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{command.title}</div>
                      {command.description && (
                        <div className="text-xs text-muted-foreground">{command.description}</div>
                      )}
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="External Links">
              {commands
                .filter((cmd) => cmd.group === "External")
                .map((command) => (
                  <CommandItem key={command.id} onSelect={() => handleSelect(command)}>
                    <command.icon className="mr-2 h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{command.title}</div>
                      {command.description && (
                        <div className="text-xs text-muted-foreground">{command.description}</div>
                      )}
                    </div>
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>

          {/* Keyboard Hint */}
          <div className="border-t p-2 text-xs text-muted-foreground text-center">
            Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">⌘K</kbd> or{" "}
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+K</kbd> to toggle
          </div>
        </motion.div>
      </CommandDialog>
    </>
  )
}
