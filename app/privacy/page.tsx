import type { Metadata } from 'next'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'Lamp Bible collects no personal information, uses no tracking or analytics, and shares nothing with third parties.',
}

export default function Privacy() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <header className="border-b border-line pb-8">
          <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">Privacy policy</h1>
          <p className="mt-3 text-muted">Last updated January 13, 2024.</p>
        </header>

        <div className="doc mt-10">
          <h2>Information collection and use</h2>
          <p>
            Lamp Bible does not collect any personal information or user data. We do not gather,
            use, or share any information about your device, location, or activities within the app.
          </p>

          <h2>User tracking</h2>
          <p>
            We do not employ any user tracking or analytics tools within Lamp Bible. Your usage of
            the app is not monitored, and no data is collected for the purpose of tracking your
            behaviour.
          </p>

          <h2>Third-party services</h2>
          <p>
            Lamp Bible does not integrate with any third-party services that collect user data. We
            do not share any information with external parties.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have any questions about our privacy policy, please contact us at {site.email}.
          </p>

          <h2>Changes to this privacy policy</h2>
          <p>
            Lamp Bible reserves the right to make changes to this privacy policy. Any updates will
            be communicated within the app or on our website.
          </p>
          <p>
            By using Lamp Bible, you agree to the terms of this privacy policy. If you do not agree
            with these terms, please do not use the app.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
