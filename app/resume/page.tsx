import { ResumeContent } from "@/components/sections/resume-content"
import { ResumeHeader } from "@/components/sections/resume-header"

export const metadata = {
  title: "Resume - Yugal Jakasaniya",
  description: "Download or view my professional resume showcasing my skills, experience, and achievements.",
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white text-black print:bg-white print:text-black">
      <ResumeHeader />
      <ResumeContent />
    </div>
  )
}
