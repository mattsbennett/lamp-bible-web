'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { DocsEntry } from '@/lib/docs-index'
import { revealDevice } from '@/components/docs/DeviceSwitch'

/** Words as the search compares them: no case, no accents, one kind of apostrophe. */
function fold(text: string) {
  return text.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/’/g, "'")
}

/**
 * Every word of the query must appear; a heading or title that starts with it ranks first, then
 * one that contains it, then a match only in the description.
 */
function search(entries: DocsEntry[], query: string) {
  const words = fold(query).split(/\s+/).filter(Boolean)
  if (!words.length) return []
  const phrase = words.join(' ')
  return entries
    .map((entry) => {
      const title = fold(entry.heading ?? entry.page)
      const all = `${title} ${fold(entry.page)} ${fold(entry.detail)} ${fold(entry.section)}`
      if (!words.every((word) => all.includes(word))) return null
      const score =
        (title.startsWith(phrase) ? 6 : title.includes(phrase) ? 4 : 0) +
        words.filter((word) => new RegExp(`(^|[^a-z0-9])${word.replace(/[^a-z0-9]/g, '\\$&')}`).test(title)).length +
        (entry.heading ? 0 : 0.5)
      return { entry, score }
    })
    .filter((result): result is { entry: DocsEntry; score: number } => result !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((result) => result.entry)
}

export function DocsSearch({
  entries,
  size = 'compact',
  shortcut = false,
}: {
  entries: DocsEntry[]
  /** `large` for the top of the docs home; `compact` for the sidebar and the phone menu. */
  size?: 'compact' | 'large'
  /** Whether "/" anywhere on the page focuses this box. One box per page should take it. */
  shortcut?: boolean
}) {
  const router = useRouter()
  const listId = useId()
  const input = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const results = useMemo(() => search(entries, query), [entries, query])

  useEffect(() => {
    if (!shortcut) return
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (event.key !== '/' || target.closest('input, textarea, [contenteditable]')) return
      if (!input.current?.offsetParent) return
      event.preventDefault()
      input.current.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [shortcut])

  const go = (entry: DocsEntry) => {
    // A result in a section the device switch hides would open on nothing.
    revealDevice(entry.only)
    setOpen(false)
    setQuery('')
    input.current?.blur()
    router.push(entry.href)
  }

  const large = size === 'large'
  const showing = open && query.trim().length > 0

  return (
    <div className="relative">
      <label className="sr-only" htmlFor={`${listId}-input`}>
        Search the documentation
      </label>
      <div
        className={`flex items-center gap-2.5 rounded-xl border border-line-strong bg-raised text-ink transition-shadow focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_18%,transparent)] ${
          large ? 'px-4 py-3.5 text-base' : 'px-3 py-2 text-sm'
        }`}
      >
        <svg viewBox="0 0 20 20" className={`shrink-0 text-faint ${large ? 'h-5 w-5' : 'h-4 w-4'}`} aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <input
          ref={input}
          id={`${listId}-input`}
          type="search"
          role="combobox"
          aria-expanded={showing}
          aria-controls={`${listId}-list`}
          aria-activedescendant={showing && results[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
          placeholder="Search the docs"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActive(0)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setActive((i) => Math.min(i + 1, results.length - 1))
            } else if (event.key === 'ArrowUp') {
              event.preventDefault()
              setActive((i) => Math.max(i - 1, 0))
            } else if (event.key === 'Enter' && results[active]) {
              event.preventDefault()
              go(results[active])
            } else if (event.key === 'Escape') {
              setQuery('')
              input.current?.blur()
            }
          }}
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-faint [&::-webkit-search-cancel-button]:hidden"
        />
        {shortcut && !query && (
          <kbd className="hidden rounded border border-line px-1.5 font-sans text-xs text-faint lg:inline">/</kbd>
        )}
      </div>

      {showing && (
        <ul
          id={`${listId}-list`}
          role="listbox"
          className={`absolute z-40 mt-2 max-h-[min(26rem,70vh)] overflow-y-auto rounded-xl border border-line bg-raised p-1.5 shadow-[0_18px_40px_-16px_rgb(28_18_8/0.35)] ${
            large ? 'inset-x-0' : 'left-0 w-[min(22rem,calc(100vw-2.5rem))]'
          }`}
        >
          {results.length === 0 && <li className="px-3 py-2.5 text-sm text-muted">Nothing found for “{query.trim()}”.</li>}
          {results.map((entry, i) => (
            <li
              key={entry.href}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(event) => {
                event.preventDefault()
                go(entry)
              }}
              onMouseEnter={() => setActive(i)}
              className={`cursor-pointer rounded-lg px-3 py-2 ${i === active ? 'bg-sunken' : ''}`}
            >
              <span className="flex items-baseline gap-2 text-sm font-medium text-ink">
                {entry.heading ?? entry.page}
                {entry.only && (
                  <span className="rounded-full border border-line px-1.5 text-[0.65rem] font-medium uppercase tracking-wide text-faint">
                    {entry.only === 'mac' ? 'Mac' : 'iPhone'}
                  </span>
                )}
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted">
                {entry.heading ? `${entry.section} · ${entry.page}` : entry.detail}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
