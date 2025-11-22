"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResumeHeader() {
  const [isPrintMode, setIsPrintMode] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("print")
    setIsPrintMode(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setIsPrintMode(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real implementation, this would generate and download a PDF
    // fallback: open print dialog for printing to PDF
    window.print()
  }

  if (isPrintMode) {
    return null
  }

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 print:hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Button asChild variant="ghost" className="group">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <Button onClick={handlePrint} variant="outline" size="sm" className="group bg-transparent">
              <Printer className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Print
            </Button>
            {/* View PDF in a new tab */}
            <Button asChild size="sm" variant="outline" className="group">
              <a href="/Yugal_jakasaniya_resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                View PDF
              </a>
            </Button>

            {/* Download PDF directly */}
            <Button asChild size="sm" className="group">
              <a href="/Yugal_jakasaniya_resume.pdf" download>
                <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Download PDF
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
