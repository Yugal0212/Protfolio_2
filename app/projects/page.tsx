import { ProjectsGrid } from "@/components/sections/projects-grid"
import { Header } from "@/components/layout/header"
import { FadeIn } from "@/components/motion/fade-in"

export const metadata = {
  title: "Projects - Yugal Jakasaniya",
  description: "Explore my portfolio of full-stack applications, from ERP systems to real-time chat applications.",
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6">My Projects</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A collection of full-stack applications showcasing my expertise in modern web technologies, from
                  enterprise solutions to innovative prototypes.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Projects Grid */}
        <ProjectsGrid />
      </main>
    </div>
  )
}
