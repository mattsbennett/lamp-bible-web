import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import { site } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

const serif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
      <body className="font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
