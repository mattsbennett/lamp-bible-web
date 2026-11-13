import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { DocsSidebar } from '@/components/docs/DocsSidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-6xl gap-12 px-5 sm:px-8">
        <aside className="hidden w-56 shrink-0 pb-14 lg:block">
          {/* Held under the header and scrolled on its own, so its foot is reachable on a long page. */}
          <div className="sticky top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain pb-8 pt-14 [scrollbar-width:thin]">
            <DocsSidebar />
          </div>
        </aside>

        <main className="min-w-0 flex-1 py-14 lg:max-w-3xl">{children}</main>
      </div>

      {/* On narrow screens the sidebar becomes a full index below the content. */}
      <div className="border-t border-line bg-sunken lg:hidden">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <DocsSidebar />
        </div>
      </div>

      <SiteFooter />
    </>
  )
}
