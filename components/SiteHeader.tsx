import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/lib/site'
import { DownloadLink, HeaderNav, MobileMenu, type NavItem } from '@/components/HeaderNav'

const nav: NavItem[] = [
  { href: '/#features', label: 'Features' },
  { href: '/#modules', label: 'Modules' },
  { href: '/docs', label: 'Docs' },
  { href: '/privacy', label: 'Privacy' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas-blur backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-5 sm:h-16 sm:gap-6 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image src="/lampflame.svg" alt="" width={14} height={28} priority />
          <span className="font-serif text-lg tracking-tight">{site.name}</span>
        </Link>
        <HeaderNav items={nav} />
        <div className="ml-auto flex items-center gap-3 sm:ml-0">
          <DownloadLink />
          <MobileMenu items={nav} />
        </div>
      </div>
    </header>
  )
}
