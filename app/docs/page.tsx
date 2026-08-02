import type { Metadata } from 'next'
import Link from 'next/link'
import { docsNav } from '@/lib/docs-nav'

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Complete documentation for Lamp Bible: the reader, reading plans, notes, devotionals, highlights, search, sync and the module system.',
}

export default function DocsIndex() {
  return (
    <div>
      <header className="border-b border-line pb-8">
        <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">Documentation</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
          Everything Lamp Bible can do, and how the pieces fit together.
        </p>
      </header>

      <div className="doc mt-10">
        <h2>Where to start</h2>
        <p>
          If you have just installed the app, read{' '}
          <Link href="/docs/getting-started">Getting started</Link> — it covers choosing a
          translation and gives you a tour of the five tabs. If you want to understand how Lamp
          Bible is built, start with <Link href="/docs/modules">The module system</Link>: almost
          every other feature is a consequence of that one design decision.
        </p>

        <h2>The short version</h2>
        <p>
          Lamp Bible is an offline Bible reader for close study. It ships with six public-domain
          translations, a set of lexicons, a full cross-reference apparatus and several reading
          plans. On top of that you write your own notes, devotionals and highlights.
        </p>
        <p>
          All of it — the content that ships with the app and the content you create — is stored in
          the same module format. There is no account, no server that belongs to us, and no
          telemetry. You choose whether your work stays on the device, syncs through iCloud Drive,
          or syncs to a WebDAV server you run.
        </p>
      </div>

      <div className="mt-14 space-y-12">
        {docsNav.map((section) => (
          <section key={section.title}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-faint">
              {section.title}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl border border-line bg-raised p-5 transition-colors hover:border-line-strong"
                >
                  <h3 className="font-medium">{link.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{link.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
