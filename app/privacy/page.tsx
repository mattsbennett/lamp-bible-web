import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Choose the privacy declaration for the Lamp Bible apps or this website.',
}

export default function PrivacyIndex() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <header className="border-b border-line pb-8">
          <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">Privacy</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
            The installed apps and lampbible.com have different data practices and separate
            declarations.
          </p>
        </header>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link
            href="/privacy/apps"
            className="rounded-2xl border border-line bg-raised p-6 transition-colors hover:border-line-strong"
          >
            <h2 className="font-serif text-2xl tracking-tight">Lamp Bible apps</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Local data, optional iCloud Drive or WebDAV sync, device permissions and external
              Bible-app handoff.
            </p>
            <span className="mt-5 inline-block text-sm font-medium text-accent">Read app privacy →</span>
          </Link>
          <Link
            href="/privacy/website"
            className="rounded-2xl border border-line bg-raised p-6 transition-colors hover:border-line-strong"
          >
            <h2 className="font-serif text-2xl tracking-tight">lampbible.com</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Website hosting, aggregate Vercel analytics and performance measurements.
            </p>
            <span className="mt-5 inline-block text-sm font-medium text-accent">Read website privacy →</span>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
