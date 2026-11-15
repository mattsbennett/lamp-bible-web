'use client'

import { useEffect, useState } from 'react'

export type TocItem = { id: string; title: string }

/**
 * The page's sections, beside it on a wide screen. The one being read is marked: the last whose
 * heading has passed the top quarter of the window.
 */
export function OnThisPage({ items }: { items: TocItem[] }) {
  const [current, setCurrent] = useState<string | undefined>(items[0]?.id)

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => heading !== null)
    const update = () => {
      const line = window.innerHeight * 0.25
      let reached: string | undefined = headings[0]?.id
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= line) reached = heading.id
      }
      // At the foot of the page the last section is the one being read, however short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        reached = headings.at(-1)?.id
      }
      setCurrent(reached)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [items])

  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-faint">On this page</p>
      <ul className="space-y-0.5 border-l border-line text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={current === item.id ? 'location' : undefined}
              className={`-ml-px block border-l-2 py-1 pl-3.5 leading-snug transition-colors ${
                current === item.id
                  ? 'border-[var(--accent)] text-ink'
                  : 'border-transparent text-muted hover:border-line-strong hover:text-ink'
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** The same list on a narrow screen, folded under the page's title. */
export function OnThisPageFolded({ items }: { items: TocItem[] }) {
  return (
    <details className="group rounded-xl border border-line bg-raised">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
        On this page
        <svg viewBox="0 0 12 12" className="h-3 w-3 text-faint transition-transform group-open:rotate-180" aria-hidden="true">
          <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </summary>
      <ul className="border-t border-line px-4 py-2.5 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="block py-1.5 text-muted hover:text-ink">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}
