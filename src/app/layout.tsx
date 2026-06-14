import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Jamsaq Agency — Websites, Mobile Apps & Web Platforms',
  description: 'Jamsaq partners with ambitious teams to craft exceptional websites, mobile apps, and web platforms. Delicate craft. Enduring results.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
