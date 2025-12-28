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

    // Enhanced email validation - More strict validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Additional validation: Check for common typos
    const emailLower = email.toLowerCase()
    if (emailLower.includes('..') || emailLower.startsWith('.') || emailLower.endsWith('.')) {
      return NextResponse.json(
        { error: 'Invalid email format detected' },
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

    // Professional email template for owner
    const receiveMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: email, // Allow direct reply to sender
      subject: `📧 New Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 40px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">New Contact Form Submission</h1>
                      <p style="margin: 10px 0 0 0; color: #f0f0f0; font-size: 14px;">Portfolio Website</p>
                    </td>
                  </tr>
                  
                  <!-- Sender Info -->
                  <tr>
                    <td style="padding: 30px 40px; background-color: #f8f9fa;">
                      <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td style="padding: 15px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #667eea;">
                            <h2 style="margin: 0 0 15px 0; color: #333333; font-size: 20px; font-weight: 600;">Sender Details</h2>
                            <p style="margin: 8px 0; color: #555555; font-size: 15px;"><strong style="color: #667eea;">Name:</strong> ${name}</p>
                            <p style="margin: 8px 0; color: #555555; font-size: 15px;"><strong style="color: #667eea;">Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
                            <p style="margin: 8px 0; color: #555555; font-size: 15px;"><strong style="color: #667eea;">Subject:</strong> ${subject}</p>
                            <p style="margin: 8px 0; color: #999999; font-size: 13px;"><strong>Received:</strong> ${new Date().toLocaleString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric', 
                              hour: '2-digit', 
                              minute: '2-digit'
                            })}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Message Content -->
                  <tr>
                    <td style="padding: 0 40px 30px 40px;">
                      <div style="background-color: #ffffff; padding: 25px; border: 2px solid #e5e5e5; border-radius: 8px;">
                        <h3 style="margin: 0 0 15px 0; color: #333333; font-size: 18px; font-weight: 600;">Message:</h3>
                        <div style="padding: 15px; background-color: #f9f9f9; border-radius: 6px; border-left: 3px solid #667eea;">
                          <p style="margin: 0; line-height: 1.8; color: #333333; font-size: 15px; white-space: pre-wrap; word-wrap: break-word;">${message}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Quick Reply Button -->
                  <tr>
                    <td style="padding: 0 40px 30px 40px; text-align: center;">
                      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; padding: 14px 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">Reply to ${name}</a>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 20px 40px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e5e5e5;">
                      <p style="margin: 0; color: #999999; font-size: 13px;">This email was sent from your portfolio contact form</p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    }

    // Auto-reply email template for sender
    const autoReplyOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Thank you for contacting me! - ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
                      <div style="width: 60px; height: 60px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 30px;">✓</span>
                      </div>
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Message Received!</h1>
                      <p style="margin: 10px 0 0 0; color: #f0f0f0; font-size: 16px;">Thank you for reaching out</p>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
                      
                      <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">Thank you for contacting me through my portfolio! I have successfully received your message and I will review your inquiry as soon as possible.</p>
                      
                      <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; border-left: 4px solid #667eea; margin: 25px 0;">
                        <h3 style="margin: 0 0 15px 0; color: #667eea; font-size: 18px; font-weight: 600;">⏱️ Expected Response Time</h3>
                        <p style="margin: 0; color: #555555; font-size: 15px; line-height: 1.6;">I typically respond within <strong>24-48 hours</strong> during business days. If your inquiry is urgent, please mention it in your message.</p>
                      </div>
                      
                      <div style="background-color: #fff8e6; padding: 20px; border-radius: 8px; border: 1px solid #ffd966; margin: 25px 0;">
                        <h4 style="margin: 0 0 10px 0; color: #d97706; font-size: 16px; font-weight: 600;">📋 Your Message Summary:</h4>
                        <p style="margin: 5px 0; color: #555555; font-size: 14px;"><strong>Subject:</strong> ${subject}</p>
                        <p style="margin: 5px 0; color: #999999; font-size: 13px;"><strong>Sent:</strong> ${new Date().toLocaleString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit'
                        })}</p>
                      </div>
                      
                      <p style="margin: 25px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6;">Best regards,<br><strong>Yugal Jakasaniya</strong></p>
                    </td>
                  </tr>
                  
                  <!-- Call to Action -->
                  <tr>
                    <td style="padding: 0 40px 40px 40px; text-align: center;">
                      <p style="margin: 0 0 20px 0; color: #666666; font-size: 14px;">In the meantime, feel free to explore:</p>
                      <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td align="center" style="padding: 10px;">
                            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/projects" style="display: inline-block; padding: 12px 25px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">View My Projects</a>
                          </td>
                          <td align="center" style="padding: 10px;">
                            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/resume" style="display: inline-block; padding: 12px 25px; background-color: #764ba2; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">View My Resume</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 25px 40px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e5e5e5;">
                      <p style="margin: 0 0 10px 0; color: #999999; font-size: 13px;">This is an automated confirmation email</p>
                      <p style="margin: 0; color: #999999; font-size: 13px;">Please do not reply directly to this email</p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    }

    // Send both emails in parallel for faster delivery
    await Promise.all([
      transporter.sendMail(receiveMailOptions),
      transporter.sendMail(autoReplyOptions)
    ])

    // Close the transporter to free up resources
    transporter.close()

    console.log('Contact form submission sent successfully:', {
      name,
      email,
      subject,
      timestamp: new Date().toISOString(),
      autoReplyStatus: 'sent'
    })

    return NextResponse.json(
      { 
        success: true, 
        message: '✅ Message sent successfully! Check your email for a confirmation. I will respond to your inquiry as soon as possible.' 
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
