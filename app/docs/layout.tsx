import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { DocsSidebar } from '@/components/docs/DocsSidebar'
import { DocsSearch } from '@/components/docs/DocsSearch'
import { DocsMobileMenu } from '@/components/docs/DocsMobileMenu'
import { DeviceSwitch } from '@/components/docs/DeviceSwitch'
import { docsIndex } from '@/lib/docs-index'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const entries = docsIndex()
  return (
    <>
      <SiteHeader />
      <DocsMobileMenu entries={entries} />
      <div className="mx-auto flex max-w-6xl gap-12 px-5 sm:px-8">
        <aside className="hidden w-56 shrink-0 pb-14 lg:block">
          {/* Held under the header, the search fixed above a list that scrolls on its own, so the
              list's foot is reachable on a long page and the results are never clipped by it. */}
          <div className="sticky top-16 flex max-h-[calc(100dvh-4rem)] flex-col pt-14">
            <DeviceSwitch className="mb-5 shrink-0" />
            <div className="relative z-10 mb-7 shrink-0">
              <DocsSearch entries={entries} shortcut />
            </div>
            <div className="min-h-0 overflow-y-auto overscroll-contain pb-8 [scrollbar-width:thin]">
              <DocsSidebar />
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 py-10 sm:py-14">{children}</main>
      </div>

      <SiteFooter />
    </>
  )
}
