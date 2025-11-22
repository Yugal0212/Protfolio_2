"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const footerLinks = {
  Navigation: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Achievements", href: "/achievements" },
    { name: "Contact", href: "/contact" },
    { name: "Resume", href: "/resume" },
  ],
  Projects: siteConfig.projects.slice(0, 4).map((project) => ({
    name: project.title,
    href: `/projects/${project.id}`,
  })),
  Connect: [
    { name: "GitHub", href: siteConfig.socials.github, external: true },
    { name: "LinkedIn", href: siteConfig.socials.linkedin, external: true },
    { name: "Email", href: `mailto:${siteConfig.email}` },
    { name: "Phone", href: `tel:${siteConfig.phone}` },
  ],
}

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Link
                href="/"
                className="font-serif text-2xl font-bold text-foreground hover:text-primary transition-colors"
              >
                {siteConfig.name}
              </Link>
            </motion.div>
            <p className="text-muted-foreground mt-4 leading-relaxed">{siteConfig.tagline}</p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {siteConfig.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {siteConfig.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <motion.a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-4 w-4" />
              </motion.a>
              <motion.a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-4 w-4" />
              </motion.a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-serif text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-red-500" /> using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
