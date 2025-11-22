"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { siteConfig } from "@/lib/site-config"

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    description: "Best for detailed discussions",
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
    description: "For quick conversations",
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location,
    href: "#",
    description: "Based in Gujarat, India",
  },
]

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: siteConfig.socials.github || "#",
    description: "Check out my code",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: siteConfig.socials.linkedin || "#",
    description: "Let's connect professionally",
  },
 
].filter(social => social.href !== "#")

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <FadeIn delay={0.2}>
        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <StaggerContainer className="space-y-4">
              {contactMethods.map((method) => (
                <StaggerItem key={method.label}>
                  <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                    <Link
                      href={method.href}
                      className="flex items-center gap-4 p-4 rounded-lg glass hover:bg-muted/50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <method.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium group-hover:text-primary transition-colors">{method.label}</p>
                        <p className="text-sm text-muted-foreground">{method.value}</p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Social Links */}
      <FadeIn delay={0.4}>
        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Find me online</CardTitle>
          </CardHeader>
          <CardContent>
            <StaggerContainer className="space-y-3">
              {socialLinks.map((social) => (
                <StaggerItem key={social.label}>
                  <Button asChild variant="outline" className="w-full justify-start group bg-transparent">
                    <Link href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                      <div className="text-left flex-1">
                        <div className="font-medium">{social.label}</div>
                        <div className="text-xs text-muted-foreground">{social.description}</div>
                      </div>
                      <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </Button>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Availability */}
      <FadeIn delay={0.6}>
        <Card className="glass">
          <CardContent className="p-6">
            <div className="text-center space-y-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto animate-pulse" />
              <div>
                <p className="font-medium text-green-600 dark:text-green-400">Available for new opportunities</p>
                <p className="text-sm text-muted-foreground">
                  I'm currently open to full-time positions and interesting freelance projects
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  )
}
