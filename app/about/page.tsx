import { Header } from "@/components/layout/header"
import { AboutHero } from "@/components/sections/about-hero"
import { Timeline } from "@/components/sections/timeline"
import { SkillsGrid } from "@/components/sections/skills-grid"
import { ToolboxSection } from "@/components/sections/toolbox-section"
import { PersonalSection } from "@/components/sections/personal-section"

export const metadata = {
  title: "About - Yugal Jakasaniya",
  description:
    "Learn more about my journey as a full-stack developer, my skills, and what drives my passion for technology.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <AboutHero />
        <PersonalSection />
        <Timeline />
        <SkillsGrid />
        <ToolboxSection />
      </main>
    </div>
  )
}
