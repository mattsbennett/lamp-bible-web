import Link from 'next/link'
import { allDocLinks } from '@/lib/docs-nav'

/**
 * Shared shell for a documentation page: title block, prose body, and
 * previous/next links derived from the sidebar order.
 */
export function DocPage({
  title,
  intro,
  href,
  children,
}: {
  title: string
  intro: string
  /** This page's own path, used to work out the prev/next links. */
  href: string
  children: React.ReactNode
}) {
  const index = allDocLinks.findIndex((l) => l.href === href)
  const prev = index > 0 ? allDocLinks[index - 1] : undefined
  const next = index >= 0 && index < allDocLinks.length - 1 ? allDocLinks[index + 1] : undefined

  return (
    <article>
      <header className="mb-10 border-b border-line pb-8">
        <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
      </header>

      <div className="doc">{children}</div>

      {(prev || next) && (
        <nav className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
          {prev ? <AdjacentLink direction="Previous" link={prev} /> : <span />}
          {next && <AdjacentLink direction="Next" link={next} align="right" />}
        </nav>
      )}
    </article>
  )
}

function AdjacentLink({
  direction,
  link,
  align = 'left',
}: {
  direction: string
  link: { title: string; href: string }
  align?: 'left' | 'right'
}) {
  return (
    <Link
      href={link.href}
      className={`rounded-xl border border-line bg-raised px-4 py-3.5 transition-colors hover:border-line-strong ${
        align === 'right' ? 'sm:text-right' : ''
      }`}
    >
      <span className="block text-xs uppercase tracking-wider text-faint">{direction}</span>
      <span className="mt-1 block font-medium">{link.title}</span>
    </Link>
  )
}

/** Highlighted aside for tips, limits and gotchas. */
export function Callout({
  title,
  tone = 'note',
  children,
}: {
  title?: string
  tone?: 'note' | 'warn'
  children: React.ReactNode
}) {
  return (
    <aside
      className={`rounded-xl border px-4 py-3.5 text-sm leading-relaxed ${
        tone === 'warn'
          ? 'border-[color-mix(in_srgb,var(--accent)_40%,transparent)] bg-accent-soft'
          : 'border-line bg-sunken'
      }`}
    >
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div className="[&>*+*]:mt-2 [&_p]:text-muted">{children}</div>
    </aside>
  )
}

/** Wraps a table so wide content scrolls inside its own container. */
export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="table-wrap">
      <table>{children}</table>
    </div>
  )
}
