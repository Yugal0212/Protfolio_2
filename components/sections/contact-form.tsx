"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Send, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { FadeIn } from "@/components/motion/fade-in"
import { siteConfig } from "@/lib/site-config"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Call our internal API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      toast({
        title: "Message Sent!",
        description: result.message || "Thank you for your message. I'll get back to you soon!",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setErrors({})
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again or use the email link below.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <FadeIn>
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Send me a message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={errors.name ? "border-destructive" : ""}
                placeholder="Your full name"
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive flex items-center gap-1"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.name}
                </motion.p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive flex items-center gap-1"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className={errors.subject ? "border-destructive" : ""}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive flex items-center gap-1"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.subject}
                </motion.p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className={`min-h-32 ${errors.message ? "border-destructive" : ""}`}
                placeholder="Tell me about your project, idea, or just say hello..."
              />
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive flex items-center gap-1"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.message}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <motion.div
                    className="mr-2 h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </>
              )}
            </Button>

            {/* Fallback */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Having trouble with the form?{" "}
                <a
                  href={`mailto:${siteConfig.email}?subject=Hello from your portfolio`}
                  className="text-primary hover:underline"
                >
                  Send me an email directly
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </FadeIn>
  )
}
