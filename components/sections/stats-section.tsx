"use client"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { siteConfig } from "@/lib/site-config"

function CountUp({ end, duration = 1 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let rafId: number
    const startCount = 0

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easedProgress * (end - startCount) + startCount))

      if (progress < 1) {
        rafId = requestAnimationFrame(updateCount)
      }
    }

    rafId = requestAnimationFrame(updateCount)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [end, duration, isInView])

  return <span ref={ref}>{count}</span>
}

export function StatsSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const stats = [
    {
      label: "Years of Coding",
      value: siteConfig.stats.yearsOfCoding,
      suffix: "+",
    },
    {
      label: "Projects Shipped",
      value: siteConfig.stats.projectsShipped,
      suffix: "+",
    },
    {
      label: "Technologies Used",
      value: siteConfig.stats.technologiesUsed,
      suffix: "+",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <StaggerItem key={stat.label}>
              <Card className="glass text-center group hover:scale-105 transition-transform duration-200">
                <CardContent className="p-6">
                  <motion.div
                    className="text-3xl lg:text-4xl font-bold font-serif text-primary mb-2"
                    whileHover={!isMobile ? { scale: 1.1 } : undefined}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <CountUp end={stat.value} />
                    {stat.suffix}
                  </motion.div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
