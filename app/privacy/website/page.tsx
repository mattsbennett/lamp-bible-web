import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Website privacy',
  description: 'Privacy declaration for the lampbible.com website.',
}

export default function WebsitePrivacy() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <header className="border-b border-line pb-8">
          <p className="text-sm font-medium text-accent"><Link href="/privacy">Privacy</Link></p>
          <h1 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
            lampbible.com website privacy
          </h1>
          <p className="mt-3 text-muted">Last updated August 8, 2026.</p>
        </header>

        <div className="doc mt-10">
          <h2>Hosting and analytics</h2>
          <p>
            This website is hosted by Vercel and uses Vercel Web Analytics and Speed Insights to
            understand aggregate page use and performance. Vercel says these services do not use
            cookies or persistent visitor identifiers. They process information such as the page
            URL, time of the request, referrer, approximate location, browser, operating system,
            device type and web-performance measurements. Lamp Bible uses this information only to
            maintain and improve the website.
          </p>
          <p>
            Read Vercel&apos;s{' '}
            <a
              href="https://vercel.com/docs/analytics/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web Analytics privacy documentation
            </a>{' '}
            and{' '}
            <a
              href="https://vercel.com/docs/speed-insights/metrics"
              target="_blank"
              rel="noopener noreferrer"
            >
              Speed Insights data documentation
            </a>
            .
          </p>

          <h2>What this website does not collect</h2>
          <p>
            The website has no Lamp Bible account, advertising, contact form or payment system.
            Lamp Bible does not combine the website&apos;s aggregate analytics with data from the apps.
            If you follow a link to the App Store, GitHub or another website, that site&apos;s privacy
            policy applies.
          </p>

          <h2>Children</h2>
          <p>
            Lamp Bible does not knowingly collect personal information from children. This website
            has no accounts, advertising or behavioural profiles.
          </p>

          <h2>Contact and changes</h2>
          <p>
            Questions or privacy requests can be sent to {site.email}. Changes will be published
            here with a revised date.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
