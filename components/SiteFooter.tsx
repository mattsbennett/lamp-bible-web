import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-sunken">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <Image src="/lampflame.svg" alt="" width={13} height={26} />
            <span className="font-serif text-lg">{site.name}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Thy word is a lamp unto my feet, and a light unto my path.
            <span className="mt-1 block text-faint">Psalm 119:105</span>
          </p>
        </div>

        <FooterColumn title="App">
          <FooterLink href="/#features">Features</FooterLink>
          <FooterLink href="/#modules">Module system</FooterLink>
          <FooterLink href={site.appStoreUrl} external>
            App Store
          </FooterLink>
        </FooterColumn>

        <FooterColumn title="Documentation">
          <FooterLink href="/docs/getting-started">Getting started</FooterLink>
          <FooterLink href="/docs/modules">Modules</FooterLink>
          <FooterLink href="/docs/modules/building">Building a .lamp file</FooterLink>
          <FooterLink href="/docs/sync">Sync &amp; backup</FooterLink>
        </FooterColumn>

        <FooterColumn title="Support">
          <FooterLink href={site.issuesUrl} external>
            Report an issue
          </FooterLink>
          <FooterLink href="/docs/modules/downloads">Module downloads</FooterLink>
          <FooterLink href="/privacy">Privacy policy</FooterLink>
        </FooterColumn>
      </div>

      <div className="border-t border-line px-5 py-6 text-center text-xs text-faint sm:px-8">
        © {new Date().getFullYear()} {site.name}. Contact: {site.email}
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  )
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string
  external?: boolean
  children: React.ReactNode
}) {
  return (
    <li>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted transition-colors hover:text-ink"
        >
          {children}
        </a>
      ) : (
        <Link href={href} className="text-muted transition-colors hover:text-ink">
          {children}
        </Link>
      )}
    </li>
  )
}
