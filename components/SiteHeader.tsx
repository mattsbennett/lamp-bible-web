import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/lib/site'

const nav = [
  { href: '/#features', label: 'Features' },
  { href: '/#modules', label: 'Modules' },
  { href: '/docs', label: 'Docs' },
  { href: '/privacy', label: 'Privacy' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas-blur backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image src="/lampflame.svg" alt="" width={14} height={28} priority />
          <span className="font-serif text-lg tracking-tight">{site.name}</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 text-sm text-muted sm:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={site.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:ml-0"
        >
          Download
        </a>
      </div>

      {/* Compact nav row for narrow screens — no JS, just a scrollable strip. */}
      <nav className="flex gap-5 overflow-x-auto border-t border-line px-5 py-2.5 text-sm text-muted sm:hidden">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
