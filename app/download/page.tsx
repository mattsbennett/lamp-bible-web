import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { AppStoreBadge, LaptopIcon, MacDownloadButton } from '@/components/DownloadButtons'
import { downloadPaths, isMacAvailable, macDownloadSize, macRelease, site } from '@/lib/site'
import { formatReleaseDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Download',
  description: `Download ${site.name} for Mac, iPhone and iPad. Free, with the full library included and no account.`,
  alternates: { canonical: '/download' },
}

export default function DownloadPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-glow border-b border-line">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
            <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Download {site.name}</h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Free, with the full library included. No account, no subscription, no advertising.
            </p>

            <div className="mt-14 grid gap-5 text-left sm:grid-cols-2">
              <MacCard />
              <PlatformCard
                icon={<PhoneIcon className="size-7" />}
                name="iPhone & iPad"
                detail="Available on the App Store."
              >
                <AppStoreBadge priority />
              </PlatformCard>
            </div>
          </div>
        </section>

        {isMacAvailable && (
          <section>
            <div className="mx-auto grid max-w-4xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2">
              <div>
                <h2 className="font-serif text-2xl tracking-tight">Mac system requirements</h2>
                <dl className="mt-6 divide-y divide-[var(--line)] text-sm">
                  <Requirement label="macOS">{macRelease.minimumOS}</Requirement>
                  <Requirement label="Processor">{macRelease.architectures}</Requirement>
                  {macDownloadSize && <Requirement label="Download">{macDownloadSize}</Requirement>}
                  <Requirement label="Distribution">
                    Signed with a Developer ID and notarized by Apple
                  </Requirement>
                </dl>
              </div>
              <div>
                <h2 className="font-serif text-2xl tracking-tight">Installing on a Mac</h2>
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  Open the downloaded disk image, drag {site.name} into Applications, and launch it
                  from there. The{' '}
                  <Link href={downloadPaths.mac} className="text-accent hover:underline">
                    Mac download page
                  </Link>{' '}
                  walks through each step and shows how to verify the file.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  )
}

function MacCard() {
  if (!isMacAvailable) {
    return (
      <PlatformCard
        icon={<LaptopIcon className="size-7" />}
        name="Mac"
        detail="A native Mac app is in development."
        badge="Coming soon"
      />
    )
  }

  const released = formatReleaseDate(macRelease.releasedAt)
  return (
    <PlatformCard
      icon={<LaptopIcon className="size-7" />}
      name="Mac"
      detail={`${macRelease.minimumOS} · ${macRelease.architectures}`}
      meta={[`Version ${macRelease.version}`, released, macDownloadSize].filter(Boolean).join(' · ')}
    >
      <MacDownloadButton />
    </PlatformCard>
  )
}

function PlatformCard({
  icon,
  name,
  detail,
  meta,
  badge,
  children,
}: {
  icon: React.ReactNode
  name: string
  detail: string
  /** Secondary line under the detail, kept above the button so buttons align across cards. */
  meta?: string
  badge?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-raised p-7">
      <div className="flex items-center gap-3 text-muted">
        {icon}
        {badge && (
          <span className="ml-auto rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
            {badge}
          </span>
        )}
      </div>
      <h2 className="mt-5 font-serif text-2xl tracking-tight">{name}</h2>
      <p className="mt-1.5 text-sm text-muted">{detail}</p>
      {meta && <p className="mt-1 text-xs text-faint">{meta}</p>}
      {children && <div className="mt-auto pt-7">{children}</div>}
    </div>
  )
}

function Requirement({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 py-3 first:pt-0">
      <dt className="w-28 shrink-0 font-medium">{label}</dt>
      <dd className="text-muted">{children}</dd>
    </div>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </svg>
  )
}
