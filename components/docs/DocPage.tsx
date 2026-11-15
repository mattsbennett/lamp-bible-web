import { Children, Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import Link from 'next/link'
import { allDocLinks } from '@/lib/docs-nav'
import { uniqueSlugger } from '@/lib/slug'
import { OnThisPage, OnThisPageFolded, type TocItem } from '@/components/docs/OnThisPage'

/** An element's words, as a heading's anchor and its contents entry read them. */
function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement(node)) return textOf((node.props as { children?: ReactNode }).children)
  return ''
}

/**
 * Gives each heading in the body an id, by the rule the docs search links with, and lists the
 * sections for the page's contents. Headings sit directly in the body, or in a fragment there.
 */
function withAnchors(children: ReactNode) {
  const slug = uniqueSlugger()
  const toc: TocItem[] = []
  const walk = (nodes: ReactNode): ReactNode =>
    Children.map(nodes, (node) => {
      if (!isValidElement(node)) return node
      const element = node as ReactElement<{ id?: string; children?: ReactNode }>
      if (element.type === Fragment) return <Fragment>{walk(element.props.children)}</Fragment>
      if (element.type !== 'h2' && element.type !== 'h3') return element
      const title = textOf(element.props.children)
      const id = slug(title, element.props.id)
      if (element.type === 'h2') toc.push({ id, title })
      return cloneElement(element, { id })
    })
  const content = walk(children)
  return { content, toc }
}

/**
 * Shared shell for a documentation page: title block, prose body, the page's contents, and
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
  const { content, toc } = withAnchors(children)
  // A page of one or two sections is its own contents.
  const hasContents = toc.length > 2

  return (
    <div className={hasContents ? 'xl:grid xl:grid-cols-[minmax(0,1fr)_12rem] xl:gap-12' : ''}>
      <article className="min-w-0">
        <header className="mb-8 border-b border-line pb-8">
          <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
        </header>

        {hasContents && (
          <div className="mb-10 xl:hidden">
            <OnThisPageFolded items={toc} />
          </div>
        )}

        <div className="doc">{content}</div>

        {(prev || next) && (
          <nav className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
            {prev ? <AdjacentLink direction="Previous" link={prev} /> : <span />}
            {next && <AdjacentLink direction="Next" link={next} align="right" />}
          </nav>
        )}
      </article>

      {hasContents && (
        <aside className="hidden xl:block">
          <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pb-8 [scrollbar-width:thin]">
            <OnThisPage items={toc} />
          </div>
        </aside>
      )}
    </div>
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

/**
 * One of the site's drawings of the app, set in a docs page: the device rising from the foot of
 * a quiet panel, with a caption under it.
 */
export function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line">
      <div className="h-72 overflow-hidden bg-sunken px-6 pt-7 sm:h-80">{children}</div>
      <figcaption className="border-t border-line bg-raised px-4 py-2.5 text-sm text-muted">{caption}</figcaption>
    </figure>
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

type Cell = ReactElement<{ children?: ReactNode }>

/**
 * Wraps a table so wide content scrolls inside its own container. On a phone each row stacks
 * into a card, every cell after the first labelled with its column's heading, which is copied
 * onto the cell here.
 */
export function Table({ children }: { children: ReactNode }) {
  let labels: string[] = []
  Children.forEach(children, (section) => {
    if (!isValidElement(section) || section.type !== 'thead') return
    const row = Children.toArray((section as Cell).props.children).find(isValidElement) as Cell | undefined
    if (!row) return
    labels = Children.toArray(row.props.children)
      .filter(isValidElement)
      .map((cell) => textOf((cell as Cell).props.children))
  })
  const labelled = Children.map(children, (section) => {
    if (!isValidElement(section) || section.type !== 'tbody') return section
    const body = section as Cell
    return cloneElement(
      body,
      {},
      Children.map(body.props.children, (row) => {
        if (!isValidElement(row)) return row
        let column = 0
        return cloneElement(
          row as Cell,
          {},
          Children.map((row as Cell).props.children, (cell) =>
            isValidElement(cell) ? cloneElement(cell as Cell, { 'data-label': labels[column++] } as object) : cell,
          ),
        )
      }),
    )
  })
  return (
    <div className="table-wrap">
      <table className="stack">{labelled}</table>
    </div>
  )
}
