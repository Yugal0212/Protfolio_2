import { Header } from "@/components/layout/header"
import { AchievementsHero } from "@/components/sections/achievements-hero"
import { AchievementsGrid } from "@/components/sections/achievements-grid"
import { CertificatesSection } from "@/components/sections/certificates-section"

export const metadata = {
  title: "Achievements - Yugal Jakasaniya",
  description:
    "Explore my professional achievements, certifications, and recognition in the field of software development.",
}

export default function AchievementsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <AchievementsHero />
        <AchievementsGrid />
        {/* <CertificatesSection /> */}
      </main>
    </div>
  )
}
