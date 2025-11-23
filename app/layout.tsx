import type React from "react"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import { CommandPalette } from "@/components/global/command-palette"
import { AnimatedBackground } from "@/components/global/animated-background"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
})

export const metadata: Metadata = {
  title: {
    default: "Yugal Jakasaniya - Full-Stack Developer",
    template: "%s | Yugal Jakasaniya",
  },
  description:
    "Proactive and adaptable full-stack developer building scalable apps, hackathon prototypes, and industry-focused solutions.",
  keywords: [
    "Full-Stack Developer",
    "MERN Stack",
    "MEAN Stack",
    "React Developer",
    "Node.js Developer",
    "MongoDB",
    "PostgreSQL",
    "Web Development",
    "Software Engineer",
    "Yugal Jakasaniya",
  ],
  authors: [{ name: "Yugal Jakasaniya", url: "https://yugal-portfolio.vercel.app" }],
  creator: "Yugal Jakasaniya",
  publisher: "Yugal Jakasaniya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yugal-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yugal-portfolio.vercel.app",
    title: "Yugal Jakasaniya - Full-Stack Developer",
    description:
      "Proactive and adaptable full-stack developer building scalable apps, hackathon prototypes, and industry-focused solutions.",
    siteName: "Yugal Jakasaniya Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yugal Jakasaniya - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yugal Jakasaniya - Full-Stack Developer",
    description:
      "Proactive and adaptable full-stack developer building scalable apps, hackathon prototypes, and industry-focused solutions.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isProduction = process.env.NODE_ENV === 'production'
  
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider defaultTheme="system" storageKey="yugal-portfolio-theme">
          <AnimatedBackground />
          {children}
          <Footer />
          <CommandPalette />
          <Toaster />
          {isProduction && <Analytics />}
          {isProduction && <SpeedInsights />}
        </ThemeProvider>
      </body>
    </html>
  )
}
