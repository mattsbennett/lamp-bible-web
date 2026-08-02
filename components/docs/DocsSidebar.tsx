'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { docsNav } from '@/lib/docs-nav'

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <nav aria-label="Documentation">
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
