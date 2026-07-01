'use server'

import { neon } from '@neondatabase/serverless'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(200).trim(),
  company: z.string().max(100).trim().optional(),
  service: z.string().max(50).trim().optional(),
  timeline: z.string().max(50).trim().optional(),
  message: z.string().min(10).max(2000).trim(),
})

const sql = neon(process.env.DATABASE_URL!)
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function submitContact(formData: unknown, honeypot?: string) {
  if (honeypot) return { ok: false, error: 'Submission rejected.' }

  const parsed = schema.safeParse(formData)
  if (!parsed.success) {
    return { ok: false, error: 'Please check your inputs and try again.' }
  }

  const { name, email, company, service, timeline, message } = parsed.data
  const firstName = name.split(' ')[0]

  try {
    await sql`
      INSERT INTO inquiries (name, email, company, service, timeline, message)
      VALUES (${name}, ${email}, ${company ?? null}, ${service ?? null}, ${timeline ?? null}, ${message})
    `

    // Notification to the team
    await resend.emails.send({
      from: 'JAMSAQ STUDIO <hello@jamsaq.in>',
      to: process.env.CONTACT_EMAIL!,
      subject: `New inquiry · ${name} · ${service ?? 'General'} · ${timeline ?? 'TBD'}`,
      html: `
        <div style="background:#f4eef7;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(74,21,75,0.10)">
            <div style="background:#4a154b;padding:36px 32px 30px;text-align:center">
              <img src="https://jamsaq.in/images/logo-purple.png" alt="JAMSAQ STUDIO" width="104" height="52" style="display:inline-block;border:0;outline:none" />
              <p style="margin:16px 0 0;color:#e9d6ee;font-size:11px;letter-spacing:2.5px;font-weight:600;text-transform:uppercase">New project inquiry</p>
            </div>
            <div style="padding:36px 34px">
              <table style="width:100%;border-collapse:collapse;margin-bottom:26px">
                <tr style="border-bottom:1px solid #f0ebf2">
                  <td style="padding:12px 0;color:#8a7d90;font-size:12px;letter-spacing:0.4px;width:120px">Name</td>
                  <td style="padding:12px 0;font-weight:600;font-size:15px;color:#1d1d1d">${name}</td>
                </tr>
                <tr style="border-bottom:1px solid #f0ebf2">
                  <td style="padding:12px 0;color:#8a7d90;font-size:12px;letter-spacing:0.4px">Email</td>
                  <td style="padding:12px 0;font-size:15px"><a href="mailto:${email}" style="color:#4a154b;text-decoration:none;font-weight:500">${email}</a></td>
                </tr>
                <tr style="border-bottom:1px solid #f0ebf2">
                  <td style="padding:12px 0;color:#8a7d90;font-size:12px;letter-spacing:0.4px">Company</td>
                  <td style="padding:12px 0;font-size:15px;color:#1d1d1d">${company ?? 'Not provided'}</td>
                </tr>
                <tr style="border-bottom:1px solid #f0ebf2">
                  <td style="padding:12px 0;color:#8a7d90;font-size:12px;letter-spacing:0.4px">Service</td>
                  <td style="padding:12px 0;font-size:15px;color:#1d1d1d">${service ?? 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;color:#8a7d90;font-size:12px;letter-spacing:0.4px">Timeline</td>
                  <td style="padding:12px 0;font-size:15px;color:#1d1d1d">${timeline ?? 'Not provided'}</td>
                </tr>
              </table>
              <div style="background:#faf6fc;border-left:3px solid #4a154b;padding:18px 22px;border-radius:0 10px 10px 0">
                <p style="margin:0 0 8px;color:#8a7d90;font-size:11px;letter-spacing:1.5px;font-weight:600">MESSAGE</p>
                <p style="margin:0;color:#2a2a2a;font-size:15px;line-height:1.75;white-space:pre-wrap">${message}</p>
              </div>
              <div style="margin-top:28px">
                <a href="mailto:${email}?subject=Re: Your inquiry to JAMSAQ STUDIO" style="display:inline-block;background:#4a154b;color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:100px;font-size:14px;font-weight:600">Reply to ${firstName}</a>
              </div>
            </div>
          </div>
        </div>
      `,
    })

    // Auto-reply to client
    await resend.emails.send({
      from: 'JAMSAQ STUDIO <hello@jamsaq.in>',
      to: email,
      replyTo: 'hello@jamsaq.in',
      subject: `Got your message, ${firstName}. We'll be in touch soon.`,
      html: `
        <div style="background:#f4eef7;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(74,21,75,0.10)">
            <div style="background:#4a154b;padding:36px 32px;text-align:center">
              <img src="https://jamsaq.in/images/logo-purple.png" alt="JAMSAQ STUDIO" width="112" height="56" style="display:inline-block;border:0;outline:none" />
            </div>
            <div style="padding:40px 36px">
              <p style="margin:0 0 22px;font-size:22px;font-weight:700;color:#1d1d1d;line-height:1.35;letter-spacing:-0.3px">Hi ${firstName}, thanks for reaching out.</p>
              <p style="margin:0 0 18px;font-size:15px;color:#555;line-height:1.75">We've received your brief and we're looking forward to learning more about what you're building. We'll review the details and get back to you within 24 hours.</p>
              <p style="margin:0 0 30px;font-size:15px;color:#555;line-height:1.75">If anything comes to mind in the meantime, such as additional context, references, or constraints, feel free to reply directly to this email.</p>
              <div style="background:#faf6fc;padding:22px 26px;border-radius:12px;margin-bottom:34px">
                <p style="margin:0 0 8px;font-size:11px;color:#8a7d90;letter-spacing:1.5px;font-weight:600">YOUR ENQUIRY</p>
                <p style="margin:0;font-size:15px;color:#4a154b;font-weight:600">${service ?? 'General enquiry'}</p>
                <p style="margin:5px 0 0;font-size:13px;color:#8a7d90">${timeline ?? 'Timeline to be discussed'}</p>
              </div>
              <div style="border-top:1px solid #f0ebf2;padding-top:26px">
                <p style="margin:0 0 3px;font-size:15px;font-weight:700;color:#1d1d1d">Team JAMSAQ</p>
                <p style="margin:0;font-size:13px;color:#8a7d90">JAMSAQ STUDIO · Websites, apps, and AI systems</p>
                <p style="margin:6px 0 0;font-size:13px"><a href="mailto:hello@jamsaq.in" style="color:#4a154b;text-decoration:none">hello@jamsaq.in</a></p>
              </div>
            </div>
          </div>
        </div>
      `,
    })

    return { ok: true }
  } catch (err) {
    console.error('Contact form error:', err)
    return { ok: false, error: 'Something went wrong. Please try emailing us directly at hello@jamsaq.in' }
  }
}
