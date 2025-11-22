import { notFound } from "next/navigation"
import { ProjectDetail } from "@/components/sections/project-detail"
import { Header } from "@/components/layout/header"
import { siteConfig } from "@/lib/site-config"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  return siteConfig.projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params
  const project = siteConfig.projects.find((p) => p.id === id)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} - Yugal Jakasaniya`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = siteConfig.projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <ProjectDetail project={project} />
      </main>
    </div>
  )
}
