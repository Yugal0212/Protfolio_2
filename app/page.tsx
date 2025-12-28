import { Hero } from "@/components/sections/hero"
import { StatsSection } from "@/components/sections/stats-section"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { TechMarquee } from "@/components/sections/tech-marquee"
import { Header } from "@/components/layout/header"

export const metadata = {
  title: "Yugal Jakasaniya - Full Stack Developer Portfolio",
  description: "Portfolio of Yugal Jakasaniya - MERN/MEAN Stack Developer and UI-centric Engineer",
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <FeaturedProjects />
        <TechMarquee />
      </main>
    </div>
  )
}
