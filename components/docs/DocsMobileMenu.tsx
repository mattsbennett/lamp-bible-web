'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { allDocLinks } from '@/lib/docs-nav'
import type { DocsEntry } from '@/lib/docs-index'
import { DocsSearch } from '@/components/docs/DocsSearch'
import { DocsSidebar } from '@/components/docs/DocsSidebar'
import { DeviceSwitch } from '@/components/docs/DeviceSwitch'

/**
 * The docs' search and contents on a narrow screen: a bar under the header naming the page you
 * are on, which opens to the whole index. It shuts again when you go to a page.
 */
export function DocsMobileMenu({ entries }: { entries: DocsEntry[] }) {
  const pathname = usePathname()
  const menu = useRef<HTMLDetailsElement>(null)
  const current = allDocLinks.find((link) => link.href === pathname)

  useEffect(() => {
    if (menu.current) menu.current.open = false
  }, [pathname])

  return (
    <details ref={menu} className="group sticky top-14 z-40 border-b border-line bg-canvas-blur backdrop-blur-md sm:top-16 lg:hidden">
      <summary className="mx-auto flex max-w-6xl cursor-pointer list-none items-center gap-2.5 px-5 py-3 text-sm sm:px-8 [&::-webkit-details-marker]:hidden">
        <svg viewBox="0 0 16 16" className="h-4 w-4 text-muted" aria-hidden="true">
          <path d="M2.5 4h11M2.5 8h11M2.5 12h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-muted">Docs</span>
        <span className="text-faint">/</span>
        <span className="min-w-0 truncate font-medium">{current?.title ?? 'Documentation'}</span>
        <svg viewBox="0 0 12 12" className="ml-auto h-3 w-3 shrink-0 text-faint transition-transform group-open:rotate-180" aria-hidden="true">
          <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="mx-auto max-h-[calc(100dvh-8rem)] max-w-6xl overflow-y-auto px-5 pb-8 pt-1 sm:px-8">
        <DocsSearch entries={entries} />
        <DeviceSwitch className="mt-6" />
        <div className="mt-7">
          <DocsSidebar />
        </div>
      </div>
    </details>
  )
}
