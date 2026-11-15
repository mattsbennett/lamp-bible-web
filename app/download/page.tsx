import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { AppStoreBadge, MacDownloadButton } from '@/components/DownloadButtons'
import { HeroArt, HeroLaptopArt } from '@/components/home/art'
import { AppStoreQR } from '@/components/AppStoreQR'
import { ModuleIcon, ReaderIcon, SyncIcon } from '@/components/home/icons'
import { downloadPaths, hasMacDownload, isMacBeta, macDownloadSize, macRelease, site } from '@/lib/site'
import { formatReleaseDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Download',
  description: `Download ${site.name} for iPhone and iPad${isMacBeta ? ', and the beta for Mac' : ' and Mac'}. Free, with a library included and no account.`,
  alternates: { canonical: '/download' },
}

export default function DownloadPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-glow border-b border-line">
          <div className="mx-auto max-w-4xl px-5 pb-16 pt-12 text-center sm:px-8 sm:py-24">
            <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Download {site.name}</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted sm:mt-5">
              Free, with a library included. No account, no subscription, no advertising.
            </p>
            {/* The one download there is today, before the choice of platforms. */}
            <div className="mt-7 flex flex-col items-center gap-2.5">
              <AppStoreBadge size="lg" priority />
              <p className="text-sm text-muted">For iPhone and iPad{hasMacDownload ? '' : ' · Mac beta coming soon'}</p>
            </div>

            <div className="mt-12 grid gap-5 text-left sm:mt-16 sm:grid-cols-2">
              <PlatformCard
                art={
                  <Stage width="19.5rem" scale={0.42}>
                    <HeroArt whole height="h-[480px]" />
                  </Stage>
                }
                name="iPhone & iPad"
                detail="iOS 18 or iPadOS 18 or later"
                meta={
                  <>
                    Free on the App Store.{' '}
                    <Link href="/docs/getting-started" className="text-accent hover:underline">
                      Getting started →
                    </Link>
                  </>
                }
              >
                <div className="flex items-center gap-5">
                  <AppStoreBadge />
                  {/* For a visitor on a computer: the phone's camera opens the App Store page. */}
                  <div className="hidden items-center gap-3 sm:flex">
                    <AppStoreQR className="h-14 w-14 rounded-md border border-line" />
                    <p className="text-xs leading-snug text-muted">
                      Scan to open
                      <br />
                      on your iPhone
                    </p>
                  </div>
                </div>
              </PlatformCard>
              <MacCard />
            </div>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto grid max-w-4xl gap-10 px-5 py-16 sm:grid-cols-3 sm:px-8 sm:py-20">
            {included.map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-serif text-xl tracking-tight">{title}</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {hasMacDownload && (
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

/** What comes with the app on every platform, so the page says why as well as where. */
const included = [
  {
    icon: ReaderIcon,
    title: 'A library included',
    body: 'Eleven translations, five lexicons, two cross-reference sets and three reading plans, ready offline from the first launch.',
  },
  {
    icon: ModuleIcon,
    title: 'Free to use',
    body: 'No account, subscription, advertising or in-app purchases.',
  },
  {
    icon: SyncIcon,
    title: 'Storage and sync',
    body: 'Keep it on the device, sync through iCloud Drive or your own WebDAV server, and export it as plain files any time.',
  },
]

function MacCard() {
  const detail = `${macRelease.minimumOS} · ${macRelease.architectures}`
  const art = (
    <Stage width="44rem" scale={0.5}>
      <HeroLaptopArt />
    </Stage>
  )
  if (!hasMacDownload) {
    // Not yet posted: the card says so beside its name, and offers the tour where its button would be.
    return (
      <PlatformCard
        art={art}
        name="Mac"
        detail={detail}
        meta="The first beta build is on its way."
        status={isMacBeta ? 'Beta coming soon' : 'Coming soon'}
      >
        <Link
          href="/docs/mac"
          className="inline-flex h-10 items-center rounded-full border border-line-strong px-5 text-sm font-medium transition-colors hover:border-ink"
        >
          Explore the Mac app
        </Link>
      </PlatformCard>
    )
  }

  const released = formatReleaseDate(macRelease.releasedAt)
  const version = `Version ${macRelease.version}${isMacBeta ? ' beta' : ''}`
  return (
    <PlatformCard
      art={art}
      name="Mac"
      detail={detail}
      meta={[version, released, macDownloadSize].filter(Boolean).join(' · ')}
      badge={isMacBeta ? 'Beta' : undefined}
    >
      <MacDownloadButton />
    </PlatformCard>
  )
}

/**
 * A drawing at a fraction of its size, centred at the top of the card's picture, so a whole
 * device fits there however large it is drawn.
 */
function Stage({ width, scale, children }: { width: string; scale: number; children: React.ReactNode }) {
  return (
    <div
      className="absolute left-1/2 top-6 origin-top"
      style={{ width, transform: `translateX(-50%) scale(${scale})` }}
    >
      {children}
    </div>
  )
}

function PlatformCard({
  art,
  name,
  detail,
  meta,
  badge,
  status,
  children,
}: {
  /** The app on that device, drawn whole. */
  art: React.ReactNode
  name: string
  detail: string
  /** Secondary line under the detail, kept above the button so buttons align across cards. */
  meta?: React.ReactNode
  badge?: string
  /** Where the platform's build is not out yet: said beside its name. */
  status?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-raised">
      <div aria-hidden="true" className="relative h-60 overflow-hidden border-b border-line bg-sunken">
        {art}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h2 className="font-serif text-2xl tracking-tight">{name}</h2>
          {badge && (
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">{badge}</span>
          )}
          {status && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sunken px-2.5 py-1 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c98a1b]" />
              {status}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm text-ink">{detail}</p>
        {meta && <p className="mt-1 text-sm text-muted">{meta}</p>}
        {/* The same height in every card, so the actions line up across them. */}
        {children && <div className="mt-auto flex min-h-14 items-center pt-6">{children}</div>}
      </div>
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
