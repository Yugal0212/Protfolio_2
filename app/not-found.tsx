"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated 404 */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
            className="mb-8"
          >
            <div className="relative">
              <motion.h1
                className="text-9xl font-bold text-primary/20 select-none"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                404
              </motion.h1>

              {/* Floating Elements */}
              <motion.div
                className="absolute top-1/2 left-1/4 w-4 h-4 bg-secondary/30 rounded-full"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-1/3 right-1/4 w-3 h-3 bg-primary/30 rounded-full"
                animate={{
                  y: [0, 15, 0],
                  x: [0, -15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass mb-8">
              <CardContent className="p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Search className="h-8 w-8 text-primary" />
                </motion.div>

                <h2 className="font-serif text-3xl font-bold mb-4">Page Not Found</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Oops! The page you're looking for seems to have wandered off into the digital void. Don't worry, it
                  happens to the best of us.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="group">
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      Go Home
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group bg-transparent">
                    <Link href="/projects">
                      <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                      View Projects
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm text-muted-foreground"
          >
            <p className="mb-2">Looking for something specific? Try these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/projects" className="hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href="/achievements" className="hover:text-primary transition-colors">
                Achievements
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
