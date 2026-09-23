import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { isMacAvailable, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'App privacy',
  description: 'Privacy declaration for the Lamp Bible apps.',
}

export default function AppPrivacy() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <header className="border-b border-line pb-8">
          <p className="text-sm font-medium text-accent"><Link href="/privacy">Privacy</Link></p>
          <h1 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
            Lamp Bible app privacy
          </h1>
          <p className="mt-3 text-muted">Last updated August 8, 2026.</p>
        </header>

        <div className="doc mt-10">
          <h2>Information collected by Lamp Bible</h2>
          <p>
            The apps have no Lamp Bible account, advertising, tracking SDK, crash-reporting SDK or
            product analytics. Lamp Bible does not receive your reading activity, library, notes,
            searches, identifiers, location, contacts, photos, recordings or credentials.
          </p>

          <h2>Information stored on your device</h2>
          <p>
            The apps store your modules, reading progress, notes, devotionals, highlights and
            settings locally. Photos, camera images and audio recordings are accessed only when you
            choose to add them to your own content. WebDAV passwords are stored in Apple&apos;s
            Keychain. You can remove individual content in the app and remove local app data by
            deleting the app.
          </p>

          <h2>Optional sync</h2>
          <p>
            Sync is off unless you choose a backend. With iCloud Drive, imported and user-created
            modules and settings are stored in the Lamp Bible folder in your own iCloud Drive and
            are processed by Apple under your Apple account. With WebDAV, the app connects directly
            to the server address you provide and transfers the same data using the credentials you
            enter. Lamp Bible does not operate or proxy either service and cannot read those stores.
            Your chosen provider&apos;s privacy policy and retention practices apply.
          </p>
          <p>
            You can stop future syncing by choosing Local Only. Removing cloud copies is done in
            iCloud Drive or on your WebDAV server.
          </p>

          <h2>Links and external Bible apps</h2>
          <p>
            If you ask Lamp Bible to open a passage in another Bible app or website, the passage
            reference is handed to that service. Its privacy policy applies from that point. Lamp
            Bible does not receive information back about what you do there.
          </p>

          {isMacAvailable && (
            <>
              <h2>Software updates on Mac</h2>
              <p>
                The Mac app is distributed outside the App Store and updates itself with the
                open-source Sparkle framework. It asks before checking for updates automatically,
                and you can change that or check by hand in Settings → Updates. A check downloads a
                small update feed from lampbible.com. Like any web request, it reveals your IP
                address, and it identifies the app, its version and the Sparkle version. It contains
                nothing from your library and nothing about how you use the app. The website&apos;s
                host, Vercel, processes these requests as described in the{' '}
                <Link href="/privacy/website">website privacy declaration</Link>. If you install an
                update, the disk image is downloaded from GitHub, under GitHub&apos;s privacy
                statement.
              </p>

              <h2>AI chat on Mac</h2>
              <p>
                The Mac app&apos;s AI chat works only with an AI provider account you sign in to.
                When you use it, your messages are sent to that provider, together with any module
                content the agent looks up. Your own notes, highlights and devotionals are included
                only if you allow that in Settings → AI &amp; Agents. The provider&apos;s terms and
                privacy policy apply. Lamp Bible does not operate or proxy these services and does
                not receive your conversations.
              </p>
            </>
          )}

          <h2>Children</h2>
          <p>
            Lamp Bible does not knowingly collect personal information from children. The apps do
            not contain advertising, accounts or behavioural analytics.
          </p>

          <h2>Contact and changes</h2>
          <p>
            Questions or privacy requests can be sent to {site.email}. If this declaration changes,
            the updated version and date will be published here. Material changes will also be
            communicated through the app or its App Store listing where appropriate.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
