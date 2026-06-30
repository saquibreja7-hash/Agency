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

    // Notification to Saquib
    await resend.emails.send({
      from: 'Jamsaq Studio <hello@jamsaq.in>',
      to: process.env.CONTACT_EMAIL!,
      subject: `New inquiry — ${name} · ${service ?? 'General'} · ${timeline ?? 'TBD'}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:580px;margin:0 auto;background:#ffffff">
          <div style="background:#4a154b;padding:28px 32px;border-radius:12px 12px 0 0">
            <p style="margin:0;color:#d9bdde;font-size:11px;letter-spacing:2px;font-weight:600">JAMSAQ STUDIO</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700">New project inquiry</h1>
          </div>
          <div style="padding:32px;border:1px solid #e6e6e6;border-top:none;border-radius:0 0 12px 12px">
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr style="border-bottom:1px solid #f0f0f0">
                <td style="padding:10px 0;color:#696969;font-size:13px;width:110px">Name</td>
                <td style="padding:10px 0;font-weight:600;font-size:14px;color:#1d1d1d">${name}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f0">
                <td style="padding:10px 0;color:#696969;font-size:13px">Email</td>
                <td style="padding:10px 0;font-size:14px"><a href="mailto:${email}" style="color:#4a154b;text-decoration:none;font-weight:500">${email}</a></td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f0">
                <td style="padding:10px 0;color:#696969;font-size:13px">Company</td>
                <td style="padding:10px 0;font-size:14px;color:#1d1d1d">${company ?? '—'}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f0">
                <td style="padding:10px 0;color:#696969;font-size:13px">Service</td>
                <td style="padding:10px 0;font-size:14px;color:#1d1d1d">${service ?? '—'}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#696969;font-size:13px">Timeline</td>
                <td style="padding:10px 0;font-size:14px;color:#1d1d1d">${timeline ?? '—'}</td>
              </tr>
            </table>
            <div style="background:#f9f5ff;border-left:3px solid #4a154b;padding:16px 20px;border-radius:0 8px 8px 0">
              <p style="margin:0 0 6px;color:#696969;font-size:11px;letter-spacing:1.5px;font-weight:600">MESSAGE</p>
              <p style="margin:0;color:#1d1d1d;font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</p>
            </div>
            <div style="margin-top:24px;padding-top:20px;border-top:1px solid #f0f0f0">
              <a href="mailto:${email}?subject=Re: Your inquiry to Jamsaq Studio" style="display:inline-block;background:#4a154b;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:100px;font-size:14px;font-weight:600">Reply to ${firstName}</a>
            </div>
          </div>
        </div>
      `,
    })

    // Auto-reply to client
    await resend.emails.send({
      from: 'Saquib, Founder JAMSAQ STUDIO <hello@jamsaq.in>',
      to: email,
      replyTo: 'hello@jamsaq.in',
      subject: `Got your message, ${firstName} — I'll be in touch soon`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:580px;margin:0 auto;background:#ffffff">
          <div style="background:#4a154b;padding:28px 32px;border-radius:12px 12px 0 0">
            <p style="margin:0;color:#d9bdde;font-size:11px;letter-spacing:2px;font-weight:600">JAMSAQ STUDIO</p>
          </div>
          <div style="padding:36px 32px;border:1px solid #e6e6e6;border-top:none;border-radius:0 0 12px 12px">
            <p style="margin:0 0 20px;font-size:20px;font-weight:700;color:#1d1d1d;line-height:1.4">Hi ${firstName}, thanks for reaching out.</p>
            <p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">I've received your brief and I'm looking forward to learning more about what you're building. I'll review the details and get back to you within 24 hours.</p>
            <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.7">If anything comes to mind in the meantime — additional context, references, or constraints — feel free to reply directly to this email.</p>
            <div style="background:#f9f5ff;padding:20px 24px;border-radius:10px;margin-bottom:32px">
              <p style="margin:0 0 6px;font-size:11px;color:#696969;letter-spacing:1.5px;font-weight:600">YOUR ENQUIRY</p>
              <p style="margin:0;font-size:14px;color:#4a154b;font-weight:600">${service ?? 'General enquiry'}</p>
              <p style="margin:4px 0 0;font-size:13px;color:#696969">${timeline ?? 'Timeline to be discussed'}</p>
            </div>
            <div style="border-top:1px solid #f0f0f0;padding-top:24px">
              <p style="margin:0 0 2px;font-size:15px;font-weight:700;color:#1d1d1d">Saquib</p>
              <p style="margin:0;font-size:13px;color:#696969">Founder, JAMSAQ STUDIO</p>
              <p style="margin:4px 0 0;font-size:13px"><a href="mailto:hello@jamsaq.in" style="color:#4a154b;text-decoration:none">hello@jamsaq.in</a></p>
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
