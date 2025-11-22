"use client"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container"
import { siteConfig } from "@/lib/site-config"

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const startCount = 0

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * (end - startCount) + startCount))

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [end, duration, isInView])

  return <span ref={ref}>{count}</span>
}

export function StatsSection() {
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
    {
      label: "Hackathons Won",
      value: siteConfig.stats.hackathonsWon,
      suffix: "",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StaggerItem key={stat.label}>
              <Card className="glass text-center group hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6">
                  <motion.div
                    className="text-3xl lg:text-4xl font-bold font-serif text-primary mb-2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
