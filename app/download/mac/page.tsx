import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { AutoDownload } from '@/components/download/AutoDownload'
import { downloadPaths, isMacAvailable, macDownloadSize, macRelease, site } from '@/lib/site'
import { formatReleaseDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Download for Mac',
  description: `Download ${site.name} for Mac — ${macRelease.minimumOS}, ${macRelease.architectures}.`,
  alternates: { canonical: downloadPaths.mac },
}

const steps = [
  {
    title: 'Open the disk image',
    body: 'Double-click the downloaded .dmg in your Downloads folder, or click it in Safari’s downloads list.',
  },
  {
    title: `Drag ${site.name} into Applications`,
    body: 'Drop the app icon onto the Applications folder shortcut in the window that opens.',
  },
  {
    title: 'Launch it',
    body: `Open ${site.name} from Applications or Spotlight. The first launch unpacks the bundled library, which takes a few seconds.`,
  },
  {
    title: 'Eject the disk image',
    body: 'Once the app is running, eject the disk image in Finder and delete the .dmg if you like.',
  },
]

export default function MacDownloadPage() {
  if (!isMacAvailable) redirect(downloadPaths.page)

  const released = formatReleaseDate(macRelease.releasedAt)

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-glow border-b border-line">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-24">
            <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">
              {site.name} for Mac
            </h1>
            <AutoDownload href={downloadPaths.macLatest} appStoreUrl={site.appStoreUrl} />

            <a
              href={downloadPaths.macLatest}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors hover:bg-sunken"
            >
              Download {site.name} {macRelease.version} (.dmg)
            </a>
            <p className="mt-3 text-xs text-faint">
              {[macRelease.minimumOS, macRelease.architectures, macDownloadSize, released]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
            <h2 className="font-serif text-3xl tracking-tight">Installing</h2>
            <ol className="mt-8 space-y-6">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 rounded-xl border border-line bg-sunken px-5 py-4 text-sm leading-relaxed text-muted">
              {site.name} is signed with a Developer ID and notarized by Apple, so macOS opens it
              without warnings. If macOS ever says the app is damaged or from an unidentified
              developer, delete it and download it again from this page.
            </p>
          </div>
        </section>

        {macRelease.sha256 && (
          <section className="border-b border-line">
            <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
              <h2 className="font-serif text-3xl tracking-tight">Verifying the download</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Optional. In Terminal, run the command below and compare its output with this
                release&apos;s SHA-256 checksum.
              </p>
              <pre className="mt-5 overflow-x-auto rounded-xl border border-line bg-sunken px-5 py-4 text-[0.82rem] leading-relaxed">
                <code>shasum -a 256 ~/Downloads/{fileNameFromUrl(macRelease.url)}</code>
              </pre>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-faint">
                SHA-256 for version {macRelease.version}
              </p>
              <p className="mt-2 break-all font-mono text-[0.82rem]">{macRelease.sha256}</p>
            </div>
          </section>
        )}

        <section>
          <div className="mx-auto max-w-3xl px-5 py-16 text-center text-sm text-muted sm:px-8">
            New to {site.name}?{' '}
            <Link href="/docs/getting-started" className="text-accent hover:underline">
              Start with the getting-started guide
            </Link>
            . Other devices are on the{' '}
            <Link href={downloadPaths.page} className="text-accent hover:underline">
              download page
            </Link>
            .
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

function fileNameFromUrl(url: string | null): string {
  const name = url ? decodeURIComponent(new URL(url).pathname.split('/').pop() ?? '') : ''
  return name.endsWith('.dmg') ? name : 'Lamp-Bible.dmg'
}
