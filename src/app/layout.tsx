import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
})

const SITE_TITLE = 'JAMSAQ STUDIO — Websites, Mobile Apps & AI Systems'
const SITE_DESC = 'JAMSAQ STUDIO is a product design and engineering studio building websites, mobile apps, and AI systems for ambitious teams. Delicate craft. Enduring results.'

export const metadata: Metadata = {
  metadataBase: new URL('https://jamsaq.in'),
  title: {
    default: SITE_TITLE,
    template: '%s — JAMSAQ STUDIO',
  },
  description: SITE_DESC,
  applicationName: 'JAMSAQ STUDIO',
  keywords: [
    'JAMSAQ STUDIO',
    'web development studio India',
    'mobile app development',
    'Next.js development',
    'React Native development',
    'AI systems',
    'product design',
    'web platforms',
    'SaaS development',
  ],
  authors: [{ name: 'JAMSAQ STUDIO', url: 'https://jamsaq.in' }],
  creator: 'JAMSAQ STUDIO',
  publisher: 'JAMSAQ STUDIO',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    type: 'website',
    url: '/',
    siteName: 'JAMSAQ STUDIO',
    locale: 'en_US',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JAMSAQ STUDIO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ['/images/og-image.png'],
  },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'JAMSAQ STUDIO',
  url: 'https://jamsaq.in',
  logo: 'https://jamsaq.in/images/og-image.png',
  description: SITE_DESC,
  email: 'hello@jamsaq.in',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@jamsaq.in',
    contactType: 'customer support',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
