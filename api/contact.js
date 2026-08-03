import { Resend } from 'resend'

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('Contact form is missing Resend environment variables.')
    return res
      .status(500)
      .json({ error: 'The contact form is not configured yet. Please email us directly.' })
  }

  const { name, email, phone, vehicle, service, message, website } = req.body ?? {}

  // Honeypot: a filled hidden field means a bot. Accept it so it does not retry.
  if (website) return res.status(200).json({ ok: true })

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in your name, email and message.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'That email address does not look right.' })
  }

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
    ['Vehicle', vehicle || '—'],
    ['Service', service || 'Not specified'],
  ]

  try {
    const resend = new Resend(RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Website enquiry — ${name}${service ? ` (${service})` : ''}`,
      html: `
        <h2 style="font-family:sans-serif">New enquiry from the PSK Cars website</h2>
        <table style="font-family:sans-serif;border-collapse:collapse">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="padding:4px 16px 4px 0;color:#666">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
            )
            .join('')}
        </table>
        <p style="font-family:sans-serif;color:#666;margin-top:24px">Message</p>
        <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    })

    if (error) {
      console.error('Resend rejected the message:', error)
      return res.status(502).json({ error: 'We could not send that just now. Please try again.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Unexpected error sending contact email:', err)
    return res.status(500).json({ error: 'We could not send that just now. Please try again.' })
  }
}
