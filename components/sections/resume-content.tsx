"use client"

import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function ResumeContent() {
  return (
    <div className="max-w-4xl mx-auto p-8 print:p-6 print:max-w-none bg-white text-black">
      {/* Header */}
      <header className="text-center mb-8 print:mb-6">
        <h1 className="text-4xl print:text-3xl font-bold text-gray-900 mb-2">{siteConfig.name}</h1>
        <p className="text-xl print:text-lg text-gray-600 mb-4">{siteConfig.role}</p>
        <p className="text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">{siteConfig.summary}</p>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            {siteConfig.email}
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {siteConfig.location}
          </div>
          <div className="flex items-center gap-1">
            <Github className="h-4 w-4" />
            GitHub: Yugal0212
          </div>
          <div className="flex items-center gap-1">
            <Linkedin className="h-4 w-4" />
            LinkedIn Profile
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 print:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 print:space-y-6">
          {/* Experience / Projects */}
          <section>
            <h2 className="text-2xl print:text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Key Projects
            </h2>
            <div className="space-y-6 print:space-y-4">
              {siteConfig.projects.slice(0, 4).map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg print:text-base font-semibold text-gray-900">{project.title}</h3>
                    <span className="text-sm text-gray-500">2024</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{project.tagline}</p>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border print:border-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-2xl print:text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {siteConfig.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg print:text-base font-semibold text-gray-900">{edu.program}</h3>
                    <span className="text-sm text-gray-500">{edu.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{edu.school}</p>
                  {edu.location && <p className="text-gray-500 text-sm">{edu.location}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-2xl print:text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Achievements
            </h2>
            <div className="space-y-3">
              {siteConfig.achievements.map((achievement, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-base print:text-sm font-semibold text-gray-900">{achievement.title}</h3>
                    <span className="text-sm text-gray-500">{achievement.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{achievement.org}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8 print:space-y-6">
          {/* Skills */}
          <section>
            <h2 className="text-xl print:text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Technical Skills
            </h2>
            <div className="space-y-4">
              {Object.entries(siteConfig.skills).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-base print:text-sm font-semibold text-gray-900 mb-2 capitalize">{category}</h3>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border print:border-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section>
            <h2 className="text-xl print:text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Quick Stats
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Years of Coding</span>
                <span className="text-sm font-semibold">{siteConfig.stats.yearsOfCoding}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Projects Completed</span>
                <span className="text-sm font-semibold">{siteConfig.stats.projectsShipped}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Technologies</span>
                <span className="text-sm font-semibold">{siteConfig.stats.technologiesUsed}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Hackathons Won</span>
                <span className="text-sm font-semibold">{siteConfig.stats.hackathonsWon}</span>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-xl print:text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              Certifications
            </h2>
            <div className="space-y-2">
              <div className="text-sm">
                <p className="font-medium text-gray-900">Web Development</p>
                <p className="text-gray-600">Professional Certification</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Cloud Deployment</p>
                <p className="text-gray-600">Cloud Platforms</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Database Systems</p>
                <p className="text-gray-600">SQL & NoSQL</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 print:mt-6 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          This resume was generated from my portfolio website. Visit{" "}
          <span className="font-medium">yugal-portfolio.vercel.app</span> for the interactive version.
        </p>
      </footer>
    </div>
  )
}
