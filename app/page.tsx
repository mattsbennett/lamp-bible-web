import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { availablePlatforms, plannedPlatforms, site } from '@/lib/site'

const features = [
  {
    title: 'A study-grade reader',
    body: 'Six public-domain translations, most tagged with Strong’s numbers and morphology. Tap any tagged word for its lexicon entry. Red-letter text, section headings, poetry and paragraph formatting are preserved.',
    href: '/docs/reader',
  },
  {
    title: 'Split panes and a tool panel',
    body: 'Read two passages side by side, or put commentary, your notes or a devotional beside the text — scroll-linked to the verse you are on.',
    href: '/docs/reader',
  },
  {
    title: 'Reading plans that keep up',
    body: 'The Bible Companion and two graded children’s plans, with per-reading completion, estimated reading time tuned to your pace, a daily reminder and a home-screen widget.',
    href: '/docs/reading-plans',
  },
  {
    title: 'Highlights with meaning',
    body: 'Four styles and any colour you like, organised into sets per translation. Name a colour — “Promises”, “Commands” — and the meaning travels with your highlights.',
    href: '/docs/highlights',
  },
  {
    title: 'Notes anchored to verses',
    body: 'Write on a verse, a verse range, or a whole chapter, with proper footnotes. Notes live beside the passage and export to clean markdown.',
    href: '/docs/notes',
  },
  {
    title: 'Devotionals and sermons',
    body: 'A real editor for long-form writing: headings, quotes, lists, images, recorded audio and linked scripture. Present mode makes it readable from a lectern.',
    href: '/docs/devotionals',
  },
  {
    title: 'Search that reaches everything',
    body: 'One full-text index across translations, lexicons, commentaries, notes, devotionals and highlights — filtered by type, series, tag, Strong’s number or highlight colour.',
    href: '/docs/search',
  },
  {
    title: 'Sync on your terms',
    body: 'Keep everything on device, sync through iCloud Drive, or point the app at your own WebDAV server. No account, ever.',
    href: '/docs/sync',
  },
]

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <Modules />
        <Privacy />
        <Download />
      </main>
      <SiteFooter />
    </>
  )
}

function Hero() {
  return (
    <section className="hero-glow border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_auto]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Bible reading companion
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Everything you study,
            <br />
            in one place you own.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Lamp Bible puts translations, lexicons, commentaries, reading plans, your notes,
            devotionals and highlights behind a single reader — working offline, with no account,
            and stored in an open format you can export at any time.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href={site.appStoreUrl} target="_blank" rel="noopener noreferrer">
              <Image
                src="/appstore.svg"
                alt="Download on the App Store"
                width={160}
                height={53}
                priority
              />
            </a>
            <Link
              href="/docs"
              className="rounded-full border border-line-strong px-5 py-3 text-sm font-medium transition-colors hover:bg-sunken"
            >
              Read the docs
            </Link>
          </div>

          {plannedPlatforms.length > 0 && (
            <p className="mt-5 text-sm text-faint">
              {plannedPlatforms.map((p) => p.name).join(' and ')} version in development.
            </p>
          )}
        </div>

        <div className="justify-self-center lg:justify-self-end">
          <Image
            src="/lampicon.png"
            alt="Lamp Bible app icon"
            width={224}
            height={224}
            className="rounded-[3rem] shadow-2xl shadow-black/20"
            priority
          />
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Features"
          title="Built for reading closely"
          body="Not a verse-of-the-day app. Lamp Bible is for people who read a passage, look up a word, check a commentary, and write down what they found."
        />

        <div className="mt-14 grid gap-x-10 gap-y-11 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title}>
              <h3 className="font-serif text-xl tracking-tight">{feature.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{feature.body}</p>
              <Link
                href={feature.href}
                className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Modules() {
  return (
    <section id="modules" className="border-b border-line bg-sunken">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="The module system"
            title="Every piece of content is a module"
            body="Translations, dictionaries, commentaries, reading plans, quizzes, highlights, notes and devotionals all use the same container: a compressed SQLite package with a .lamp extension. The app treats what ships with it and what you make yourself exactly the same way."
          />

          <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted">
            <p>
              That has a practical consequence. Your notes are not rows locked inside an app
              database — they are a module you can export, edit as markdown, back up to your own
              server, and import somewhere else. So are your highlights, with the colour meanings
              you gave them.
            </p>
            <p>
              It also means the library is extensible. Build a <code className="rounded border border-line bg-canvas px-1.5 py-0.5 text-[0.85em]">.lamp</code>{' '}
              file from the published JSON schemas and the app will install it, index it for search
              and show it in the reader beside everything else.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/docs/modules"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              How modules work
            </Link>
            <Link
              href="/docs/modules/authoring"
              className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors hover:bg-canvas"
            >
              Authoring reference
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-canvas p-7">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            Module types
          </h3>
          <dl className="mt-5 divide-y divide-[var(--line)]">
            {[
              ['Translation', 'Verse text with Strong’s, morphology, headings and footnotes', 'Read-only'],
              ['Dictionary', 'Lexicon entries keyed by Strong’s number or lemma', 'Read-only'],
              ['Commentary', 'Verse- or pericope-keyed exposition, grouped into series', 'Read-only'],
              ['Plan', 'Dated reading assignments across the year', 'Read-only'],
              ['Quiz', 'Age-graded questions tied to a plan’s readings', 'Read-only'],
              ['Notes', 'Your verse-anchored study notes', 'You edit'],
              ['Devotional', 'Your long-form writing, with media', 'You edit'],
              ['Highlights', 'Your highlight spans and colour themes', 'You edit'],
            ].map(([name, desc, mode]) => (
              <div key={name} className="flex items-baseline gap-4 py-3 first:pt-0 last:pb-0">
                <dt className="w-24 shrink-0 text-sm font-medium">{name}</dt>
                <dd className="flex-1 text-sm text-muted">{desc}</dd>
                <dd
                  className={`shrink-0 text-xs ${
                    mode === 'You edit' ? 'text-accent' : 'text-faint'
                  }`}
                >
                  {mode}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Privacy() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Your data"
          title="No account. No tracking. No network required."
          body="The app has no sign-in, collects nothing about you, and does not phone home. Bundled content is on the device after install, so the whole library works in airplane mode."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <Point title="Offline by default">
            Translations, lexicons, cross-references, commentaries and plans ship inside the app.
            Nothing you read requires a connection.
          </Point>
          <Point title="Sync you control">
            Choose local-only storage, iCloud Drive — where your files stay visible in the Files app
            — or your own WebDAV server such as Nextcloud or Synology.
          </Point>
          <Point title="Exit at any time">
            Notes and devotionals round-trip through plain markdown. Modules export as{' '}
            <code className="rounded border border-line bg-sunken px-1.5 py-0.5 text-[0.85em]">
              .lamp
            </code>{' '}
            packages. Nothing is trapped.
          </Point>
        </div>
      </div>
    </section>
  )
}

function Download() {
  return (
    <section className="hero-glow">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">Start reading</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Free, with the full library included. {availablePlatforms.map((p) => p.name).join(', ')}.
        </p>

        <div className="mt-9 flex justify-center">
          <a href={site.appStoreUrl} target="_blank" rel="noopener noreferrer">
            <Image src="/appstore.svg" alt="Download on the App Store" width={172} height={57} />
          </a>
        </div>

        <p className="mt-10 text-sm text-muted">
          Questions or a feature request?{' '}
          <a
            href={site.issuesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Open an issue
          </a>{' '}
          or email {site.email}.
        </p>
      </div>
    </section>
  )
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-muted">{body}</p>
    </div>
  )
}

function Point({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-raised p-6">
      <h3 className="font-serif text-lg tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
    </div>
  )
}
