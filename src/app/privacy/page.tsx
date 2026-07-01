import Link from 'next/link'

export const metadata = { title: 'Privacy Policy' }

const sectionStyle = { fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 8 } as const
const paraStyle = { color: '#444', lineHeight: 1.7, marginBottom: 16 } as const
const liStyle = { color: '#444', lineHeight: 1.7, marginBottom: 8 } as const

export default function PrivacyPage() {
  return (
    <main style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', maxWidth: 720, margin: '80px auto', padding: '0 24px 80px', color: '#1d1d1d' }}>
      <Link href="/" style={{ fontSize: 14, color: '#4a154b', textDecoration: 'none' }}>← Back to JAMSAQ STUDIO</Link>
      <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.5px', marginTop: 32, marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: '#696969', fontSize: 14, marginBottom: 16 }}>Last updated: July 2026</p>

      <p style={paraStyle}>
        This Privacy Policy explains how JAMSAQ STUDIO (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, stores, and
        protects your personal data when you visit jamsaq.in (the &ldquo;Site&rdquo;) or contact us through it. We are committed to handling your
        information lawfully, fairly, and transparently in line with India&rsquo;s Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;)
        and, where applicable, the EU General Data Protection Regulation (&ldquo;GDPR&rdquo;).
      </p>

      <h2 style={sectionStyle}>Who we are</h2>
      <p style={paraStyle}>
        JAMSAQ STUDIO is a product design and engineering studio based in India. For the purposes of data protection law, we act as the
        data controller (fiduciary) for personal data collected through this Site. Our registered details are:{' '}
        <strong>JAMSAQ STUDIO</strong>, New Delhi, India.
      </p>

      <h2 style={sectionStyle}>Information we collect</h2>
      <p style={paraStyle}>When you submit the contact form, we collect the information you choose to provide, which may include:</p>
      <ul style={{ paddingLeft: 22, marginBottom: 16 }}>
        <li style={liStyle}>Your name</li>
        <li style={liStyle}>Your email address</li>
        <li style={liStyle}>Your company or organisation name (optional)</li>
        <li style={liStyle}>The service you are interested in and your indicative timeline (optional)</li>
        <li style={liStyle}>The contents of your enquiry message</li>
      </ul>
      <p style={paraStyle}>
        We do not knowingly collect sensitive personal data, and we ask that you do not include it in your message. We do not use advertising
        cookies or third-party analytics or tracking pixels on this Site. Standard server and security logs may be retained by our hosting
        provider for operational and security purposes.
      </p>

      <h2 style={sectionStyle}>Why we use it and our legal basis</h2>
      <p style={paraStyle}>
        We use your information solely to respond to your enquiry, evaluate a potential engagement, and communicate with you about working
        together. Our legal basis is your consent (which you give by submitting the form) and our legitimate interest in responding to
        business enquiries. We do not sell, rent, or share your data with third parties for marketing purposes, and we do not use it for
        automated decision-making or profiling.
      </p>

      <h2 style={sectionStyle}>Service providers and data processors</h2>
      <p style={paraStyle}>To operate this Site and respond to enquiries, we rely on the following processors, each of which handles data under its own privacy policy:</p>
      <ul style={{ paddingLeft: 22, marginBottom: 16 }}>
        <li style={liStyle}><strong>Neon</strong>, a managed PostgreSQL database used to store enquiry submissions.</li>
        <li style={liStyle}><strong>Resend</strong>, an email delivery service used to send notification and acknowledgement emails.</li>
        <li style={liStyle}><strong>Vercel</strong>, hosting and content delivery for the Site.</li>
      </ul>
      <p style={paraStyle}>
        Some of these providers may process or store data outside India, including in regions such as the United States or the European Union.
        Where data is transferred internationally, we rely on the providers&rsquo; own safeguards and contractual commitments for such transfers.
      </p>

      <h2 style={sectionStyle}>Data retention</h2>
      <p style={paraStyle}>
        We keep enquiry data only for as long as needed to respond to and follow up on your enquiry, and for a reasonable period afterwards to
        maintain a record of our communications. When it is no longer needed, we delete it or anonymise it. You can ask us to delete your data
        sooner at any time (see &ldquo;Your rights&rdquo; below).
      </p>

      <h2 style={sectionStyle}>How we protect your data</h2>
      <p style={paraStyle}>
        Data is transmitted over encrypted (HTTPS) connections and stored with reputable providers that maintain industry-standard security
        controls. Access to enquiry data is limited to those who need it to respond to you. No method of transmission or storage is completely
        secure, but we take reasonable technical and organisational measures to protect your information.
      </p>

      <h2 style={sectionStyle}>Your rights</h2>
      <p style={paraStyle}>
        Depending on your location, you may have the right to access, correct, update, or delete your personal data; to withdraw consent; to
        object to or restrict certain processing; to data portability; and to lodge a complaint with a supervisory or data protection authority.
        Under the DPDP Act, you also have the right to nominate another person to exercise your rights in the event of death or incapacity. To
        exercise any of these rights, email{' '}
        <a href="mailto:hello@jamsaq.in" style={{ color: '#4a154b' }}>hello@jamsaq.in</a> and we will respond within a reasonable timeframe.
      </p>

      <h2 style={sectionStyle}>Children</h2>
      <p style={paraStyle}>
        This Site is intended for a business audience and is not directed at children. We do not knowingly collect personal data from children.
      </p>

      <h2 style={sectionStyle}>Grievance / Data Protection contact</h2>
      <p style={paraStyle}>
        If you have questions or concerns about this policy or how your data is handled, or wish to raise a grievance, you can contact our
        designated point of contact at{' '}
        <a href="mailto:hello@jamsaq.in" style={{ color: '#4a154b' }}>hello@jamsaq.in</a>. We will acknowledge and address grievances in
        accordance with applicable law.
      </p>

      <h2 style={sectionStyle}>Changes to this policy</h2>
      <p style={paraStyle}>
        We may update this Privacy Policy from time to time. Material changes will be reflected by updating the &ldquo;Last updated&rdquo; date at
        the top of this page. Your continued use of the Site after changes take effect constitutes acceptance of the revised policy.
      </p>

      <h2 style={sectionStyle}>Contact</h2>
      <p style={paraStyle}>
        JAMSAQ STUDIO · <a href="mailto:hello@jamsaq.in" style={{ color: '#4a154b' }}>hello@jamsaq.in</a>
      </p>
    </main>
  )
}
