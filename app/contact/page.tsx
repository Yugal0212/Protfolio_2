import { Header } from "@/components/layout/header"
import { ContactHero } from "@/components/sections/contact-hero"
import { ContactForm } from "@/components/sections/contact-form"
import { ContactInfo } from "@/components/sections/contact-info"

export const metadata = {
  title: "Contact - Yugal Jakasaniya",
  description: "Get in touch with me for collaboration opportunities, project discussions, or just to say hello.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <ContactHero />
        <div className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                <ContactForm />
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
