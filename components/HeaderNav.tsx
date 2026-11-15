'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { downloadPaths } from '@/lib/site'

export type NavItem = { href: string; label: string }

/** Whether a header link names the part of the site this page is in. Section links never do. */
function isCurrent(pathname: string, href: string) {
  return !href.includes('#') && (pathname === href || pathname.startsWith(`${href}/`))
}

export function HeaderNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  return (
    <nav className="ml-auto hidden items-center gap-7 text-sm sm:flex">
      {items.map((item) => {
        const current = isCurrent(pathname, item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? 'page' : undefined}
            className={current ? 'font-medium text-ink' : 'text-muted transition-colors hover:text-ink'}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

/** Goes to the download page rather than one store, so every platform is one click away. */
export function DownloadLink() {
  const pathname = usePathname()
  // On the download pages it marks where you are, outlined, so the page's own buttons lead.
  const current = isCurrent(pathname, downloadPaths.page)
  return (
    <Link
      href={downloadPaths.page}
      aria-current={current ? 'page' : undefined}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-opacity ${
        current
          ? 'border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] text-accent'
          : 'bg-accent text-white hover:opacity-90'
      }`}
    >
      Download
    </Link>
  )
}

/** The header's links on a phone, behind one button, so the header keeps to a single row. */
export function MobileMenu({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  const menu = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    if (menu.current) menu.current.open = false
  }, [pathname])

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (menu.current?.open && !menu.current.contains(event.target as Node)) menu.current.open = false
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  return (
    <details ref={menu} className="group relative sm:hidden">
      <summary
        aria-label="Menu"
        className="grid h-9 w-9 cursor-pointer list-none place-items-center rounded-full text-ink transition-colors hover:bg-sunken [&::-webkit-details-marker]:hidden"
      >
        <svg viewBox="0 0 20 20" className="h-5 w-5 group-open:hidden" aria-hidden="true">
          <path d="M3.5 6.5h13M3.5 13.5h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 20 20" className="hidden h-5 w-5 group-open:block" aria-hidden="true">
          <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </summary>
      <nav className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-line bg-raised p-2 shadow-[0_18px_40px_-16px_rgb(28_18_8/0.35)]">
        {items.map((item) => {
          const current = isCurrent(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={current ? 'page' : undefined}
              className={`block rounded-lg px-3 py-2.5 text-[0.95rem] ${current ? 'bg-sunken font-medium' : 'hover:bg-sunken'}`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </details>
  )
}
