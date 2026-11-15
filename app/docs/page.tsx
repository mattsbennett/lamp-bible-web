import type { Metadata } from 'next'
import Link from 'next/link'
import { docsNav } from '@/lib/docs-nav'
import { docsIndex } from '@/lib/docs-index'
import { site } from '@/lib/site'
import { DocsSearch } from '@/components/docs/DocsSearch'
import {
  BooksIcon,
  ChatIcon,
  CompassIcon,
  DownloadIcon,
  ExportIcon,
  FolderIcon,
  HighlightIcon,
  type IconComponent,
  ModuleIcon,
  NoteIcon,
  PackageIcon,
  PenIcon,
  PlanIcon,
  QuestionIcon,
  ReaderIcon,
  RenderingIcon,
  SearchIcon,
  SeptuagintIcon,
  SlidesIcon,
  SyncIcon,
  TerminalIcon,
  WindowsIcon,
} from '@/components/home/icons'

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Complete documentation for Lamp Bible: the reader, reading plans, notes, writing, highlights, search, sync and the module system.',
}

const icons: Record<string, IconComponent> = {
  '/docs/getting-started': CompassIcon,
  '/docs/mac': WindowsIcon,
  '/docs/reader': ReaderIcon,
  '/docs/reading-plans': PlanIcon,
  '/docs/search': SearchIcon,
  '/docs/books': BooksIcon,
  '/docs/lexicons': RenderingIcon,
  '/docs/highlights': HighlightIcon,
  '/docs/notes': NoteIcon,
  '/docs/writing': PenIcon,
  '/docs/presenting': SlidesIcon,
  '/docs/ai': ChatIcon,
  '/docs/modules': ModuleIcon,
  '/docs/modules/import-bible': FolderIcon,
  '/docs/modules/authoring': TerminalIcon,
  '/docs/modules/building': PackageIcon,
  '/docs/modules/downloads': DownloadIcon,
  '/docs/import-export': ExportIcon,
  '/docs/sync': SyncIcon,
  '/docs/included-content': SeptuagintIcon,
  '/docs/faq': QuestionIcon,
}

function Chip({ href, large = false }: { href: string; large?: boolean }) {
  const Icon = icons[href] ?? ReaderIcon
  return (
    <span
      className={`grid shrink-0 place-items-center bg-accent-soft text-accent ${
        large ? 'h-11 w-11 rounded-xl' : 'h-9 w-9 rounded-lg'
      }`}
    >
      <Icon className={large ? 'h-[22px] w-[22px]' : 'h-[18px] w-[18px]'} />
    </span>
  )
}

export default function DocsIndex() {
  const [start, ...sections] = docsNav
  // This page is the overview, so it isn't offered as a card on itself.
  const starting = start.links.filter((link) => link.href !== '/docs')

  return (
    <div>
      <header className="border-b border-line pb-10">
        <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">Documentation</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
          Everything Lamp Bible can do, and how the pieces fit together.
        </p>
        <div className="mt-7">
          <DocsSearch entries={docsIndex()} size="large" />
          <p className="mt-2.5 hidden text-sm text-faint sm:block">
            Try “highlights”, “WebDAV” or “Strong’s”.
          </p>
        </div>
      </header>

      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-faint">{start.title}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {starting.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col rounded-2xl border border-line bg-raised p-5 transition-colors hover:border-line-strong sm:p-6"
            >
              <Chip href={link.href} large />
              <h3 className="mt-4 font-serif text-xl tracking-tight sm:mt-5">{link.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{link.summary}</p>
              <span className="mt-4 hidden text-sm font-medium text-accent sm:block">
                Read <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {sections.map((section) => (
        <section key={section.title} className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-faint">{section.title}</h2>
          {/* One list a section: any number of topics fits it without leaving a gap. */}
          <ul className="mt-4 divide-y divide-[color:var(--line)] overflow-hidden rounded-2xl border border-line bg-raised">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-sunken"
                >
                  <Chip href={link.href} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{link.title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-muted">{link.summary}</span>
                  </span>
                  <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-faint transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                    <path d="m4.5 2.5 3.5 3.5-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="doc mt-14 border-t border-line pt-10">
        <h2>How it fits together</h2>
        <p>
          Lamp Bible is an offline Bible reader for close study. It ships with translations under
          documented public-domain and open terms, a set of lexicons and a full cross-reference
          apparatus — the terms for each are on the <Link href="/content-licences">Content
          licences</Link> page — and on top of that you write your own notes, writing and
          highlights.
        </p>
        <p>
          All of it, the bundled library and your own work, is stored in the same{' '}
          <Link href="/docs/modules">module format</Link>. There is no account, no server that
          belongs to us, and no telemetry: your work stays on the device, syncs through iCloud Drive,
          or syncs to a WebDAV server you run.
        </p>
      </section>

      <section className="mt-12 flex flex-col gap-5 rounded-2xl border border-line bg-sunken p-6 sm:flex-row sm:items-center sm:p-7">
        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-xl tracking-tight">Still need help?</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Check the FAQ, or tell us what went wrong and we’ll take a look. You can also write to{' '}
            {site.email}.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href="/docs/faq"
            className="rounded-full border border-line-strong bg-raised px-4 py-2 text-sm font-medium transition-colors hover:border-ink"
          >
            Read the FAQ
          </Link>
          <a
            href={site.issuesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Report an issue
          </a>
        </div>
      </section>
    </div>
  )
}
