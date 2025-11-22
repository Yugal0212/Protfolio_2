import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate the data
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create transporter using Gmail SMTP with optimizations
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      // Speed optimizations
      pool: true, // Use connection pooling
      maxConnections: 5, // Maximum connections
      maxMessages: 100, // Messages per connection
      rateLimit: 14, // Max 14 messages per second
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
    })

    // Email content for you (receiving the message) - Optimized for speed
    const receiveMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `🚀 Portfolio Contact: ${subject} - from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #667eea; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h2 style="margin: 0;">💼 New Portfolio Inquiry</h2>
            <p style="margin: 5px 0 0 0;">Someone is interested in your work!</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">👤 Contact Details</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: white; padding: 20px; border: 2px solid #e5e5e5; border-radius: 8px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">💬 Message</h3>
            <p style="line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; color: #2d5a2d;"><strong>Reply to:</strong> ${email}</p>
          </div>
        </div>
      `
    }

    // Confirmation email for the sender - Optimized for speed
    const confirmationMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `✅ Message Received - Thank You ${name}! | Portfolio Contact`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #10b981; color: white; padding: 25px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 24px;">✨ Thank You for Reaching Out!</h1>
            <p style="margin: 10px 0 0 0;">Your message has been successfully received</p>
          </div>
          
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #333;">Hi <span style="color: #10b981;">${name}</span>! 👋</h2>
          </div>
          
          <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; border-left: 5px solid #10b981; margin-bottom: 20px;">
            <h3 style="margin: 0 0 10px 0; color: #065f46;">🎯 What happens next?</h3>
            <ul style="color: #047857; margin: 0; padding-left: 20px;">
              <li><strong>Response Time:</strong> I'll get back to you within 24-48 hours</li>
              <li><strong>Professional Review:</strong> Your inquiry will receive my personal attention</li>
              <li><strong>Detailed Response:</strong> Expect a comprehensive reply addressing your needs</li>
            </ul>
          </div>
          
          <div style="background: #fafafa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">📋 Your Message Summary</h3>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 5px 0;"><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #059669; font-weight: 600;">✅ Delivered Successfully</span></p>
          </div>
          
          <div style="background: white; padding: 20px; border: 2px solid #e5e5e5; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="margin: 0 0 10px 0; color: #333;">💬 Your Original Message:</h4>
            <div style="background: #f9fafb; padding: 15px; border-radius: 6px; border-left: 3px solid #10b981;">
              <p style="line-height: 1.6; margin: 0; color: #333; font-style: italic; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; background: #f8fafc; border-radius: 8px;">
            <p style="margin: 0; color: #666;">Best regards,<br><strong style="color: #333;">Yugal Jakasaniya</strong></p>
            <p style="margin: 8px 0 0 0; color: #999; font-size: 12px;">This is an automated confirmation. Your message is important and will receive a personal response soon.</p>
          </div>
        </div>
      `
    }

    // Send both emails in parallel for speed
    const [notificationResult, confirmationResult] = await Promise.all([
      transporter.sendMail(receiveMailOptions),
      transporter.sendMail(confirmationMailOptions)
    ])

    // Close the transporter to free up resources
    transporter.close()

    console.log('Contact form submission sent successfully:', {
      name,
      email,
      subject,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      { 
        success: true, 
        message: '🎉 Message sent successfully! Thank you for your interest in my work. I\'ll review your message and respond within 24-48 hours. Check your email for a confirmation!' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again later or contact me directly.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}