'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { docsNav, type DocLink } from '@/lib/docs-nav'

export function DocsSidebar() {
  const pathname = usePathname()
  const nav = useRef<HTMLElement>(null)

  // Where the sidebar scrolls on its own, open it at the current page's link rather than at the
  // top, so a page near the foot of the list is shown as the one you are on.
  useEffect(() => {
    const scroller = nav.current?.parentElement
    const active = nav.current?.querySelector<HTMLElement>('[aria-current="page"]')
    if (!scroller || !active || scroller.scrollHeight <= scroller.clientHeight) return
    const top = active.offsetTop
    const visible = top >= scroller.scrollTop && top + active.offsetHeight <= scroller.scrollTop + scroller.clientHeight
    if (!visible) scroller.scrollTop = top - scroller.clientHeight / 2
  }, [pathname])

  return (
    <nav ref={nav} aria-label="Documentation">
      <ul className="space-y-7">
        {docsNav.map((section) => (
          <li key={section.title}>
            <h2 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-faint">
              {section.title}
            </h2>
            <ul className="space-y-0.5 border-l border-line">
              {section.links.map((link) => {
                const active = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={
                        active
                          ? '-ml-px block border-l-2 border-[var(--accent)] py-1.5 pl-3.5 text-sm font-medium text-accent'
                          : '-ml-px block border-l-2 border-transparent py-1.5 pl-3.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-ink'
                      }
                    >
                      {link.title}
                      <DeviceTag link={link} />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * Marks a page that is about one app only, unless its title already says which, as "Get started
 * on Mac" does.
 */
export function DeviceTag({ link }: { link: DocLink }) {
  if (!link.only) return null
  const name = link.only === 'mac' ? 'Mac' : 'iPhone'
  if (link.title.includes(name)) return null
  return (
    <span className="ml-2 rounded-full border border-line px-1.5 py-px align-[1px] text-[0.65rem] font-medium uppercase tracking-wide text-faint">
      {name}
    </span>
  )
}
