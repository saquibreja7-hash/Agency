import Link from 'next/link'

export const metadata = { title: 'Terms of Service' }

const sectionStyle = { fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 8 } as const
const paraStyle = { color: '#444', lineHeight: 1.7, marginBottom: 16 } as const

export default function TermsPage() {
  return (
    <main style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', maxWidth: 720, margin: '80px auto', padding: '0 24px 80px', color: '#1d1d1d' }}>
      <Link href="/" style={{ fontSize: 14, color: '#4a154b', textDecoration: 'none' }}>← Back to JAMSAQ STUDIO</Link>
      <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.5px', marginTop: 32, marginBottom: 8 }}>Terms of Service</h1>
      <p style={{ color: '#696969', fontSize: 14, marginBottom: 16 }}>Last updated: July 2026</p>

      <p style={paraStyle}>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the website at jamsaq.in (the &ldquo;Site&rdquo;), operated
        by JAMSAQ STUDIO (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By accessing or using the Site, you agree to be bound by these
        Terms. If you do not agree, please do not use the Site.
      </p>

      <h2 style={sectionStyle}>About us</h2>
      <p style={paraStyle}>
        JAMSAQ STUDIO is a product design and engineering studio based in India that builds websites, mobile apps, and AI systems. These Terms
        relate to your use of this Site and any general enquiry made through it. They do not, by themselves, create a client relationship —
        that is governed by a separate written agreement (see &ldquo;Engagements&rdquo; below).
      </p>

      <h2 style={sectionStyle}>Use of this Site</h2>
      <p style={paraStyle}>
        This Site is provided for general informational purposes. You agree to use it lawfully and not to: misuse, disrupt, or attempt to gain
        unauthorised access to the Site or its systems; submit false, abusive, or unlawful content through the contact form; or reproduce, copy,
        scrape, or redistribute any content without our prior written permission.
      </p>

      <h2 style={sectionStyle}>Enquiries and engagements</h2>
      <p style={paraStyle}>
        Submitting the contact form does not create a contract or any obligation for us to provide services. Any project, quote, scope, timeline,
        deliverable, pricing, and ownership terms are defined exclusively in a separate written agreement (such as a proposal, statement of work,
        or contract) signed by both parties. In the event of any conflict, that signed agreement prevails over these Terms.
      </p>

      <h2 style={sectionStyle}>Intellectual property</h2>
      <p style={paraStyle}>
        All design, copy, branding, and code on this Site are the property of JAMSAQ STUDIO unless otherwise noted, and are protected by
        applicable intellectual property laws. Project work shown is displayed with the understanding of the relevant clients; ownership of
        delivered client work transfers according to the terms of each individual client agreement. Third-party names, logos, and trademarks
        remain the property of their respective owners and are used for identification purposes only.
      </p>

      <h2 style={sectionStyle}>Portfolio and showcase content</h2>
      <p style={paraStyle}>
        Case studies, project descriptions, technology stacks, and outcomes shown on this Site are provided for illustration of our work. They
        may describe work in progress, prototypes, or pre-release products, and are not a warranty of any particular result for future projects.
      </p>

      <h2 style={sectionStyle}>Third-party links</h2>
      <p style={paraStyle}>
        The Site may contain links to third-party websites or app stores. We are not responsible for the content, policies, or practices of those
        external sites, and following such links is at your own risk.
      </p>

      <h2 style={sectionStyle}>Disclaimer of warranties</h2>
      <p style={paraStyle}>
        The Site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind, whether express
        or implied, including but not limited to merchantability, fitness for a particular purpose, accuracy, or non-infringement. We do not
        warrant that the Site will be uninterrupted, error-free, or secure.
      </p>

      <h2 style={sectionStyle}>Limitation of liability</h2>
      <p style={paraStyle}>
        To the maximum extent permitted by law, JAMSAQ STUDIO shall not be liable for any indirect, incidental, special, consequential, or
        punitive damages, or any loss of data, revenue, or profits, arising out of or related to your use of (or inability to use) this Site.
      </p>

      <h2 style={sectionStyle}>Indemnity</h2>
      <p style={paraStyle}>
        You agree to indemnify and hold harmless JAMSAQ STUDIO from any claims, damages, or expenses arising out of your misuse of the Site or
        your violation of these Terms.
      </p>

      <h2 style={sectionStyle}>Governing law and jurisdiction</h2>
      <p style={paraStyle}>
        These Terms are governed by and construed in accordance with the laws of India. Subject to any separate signed agreement, the courts at{' '}
        <strong>New Delhi</strong>, India shall have exclusive jurisdiction over any dispute arising from these Terms or your use of the Site.
      </p>

      <h2 style={sectionStyle}>Changes to these Terms</h2>
      <p style={paraStyle}>
        We may revise these Terms from time to time. The current version is indicated by the &ldquo;Last updated&rdquo; date above. Continued use
        of the Site after changes take effect constitutes acceptance of the revised Terms.
      </p>

      <h2 style={sectionStyle}>Contact</h2>
      <p style={paraStyle}>
        Questions about these Terms? Email us at{' '}
        <a href="mailto:hello@jamsaq.in" style={{ color: '#4a154b' }}>hello@jamsaq.in</a>.
      </p>
    </main>
  )
}
