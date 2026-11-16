import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/lib/site'
import { EmailLink } from '@/components/EmailLink'
import { OnThisPage, OnThisPageFolded } from '@/components/docs/OnThisPage'

export const metadata: Metadata = {
  title: 'App privacy',
  description: 'Privacy declaration for the Lamp Bible apps.',
}

const sections = [
  { id: 'information-collected-by-lamp-bible', title: 'Information collected by Lamp Bible' },
  { id: 'information-stored-on-your-device', title: 'Information stored on your device' },
  { id: 'optional-sync', title: 'Optional sync' },
  { id: 'presentation-remote', title: 'Presentation remote' },
  { id: 'links-and-external-bible-apps', title: 'Links and external Bible apps' },
  { id: 'apple-intelligence', title: 'Apple Intelligence' },
  { id: 'the-ai-features-switch', title: 'The AI features switch' },
  { id: 'software-updates-on-mac', title: 'Software updates on Mac' },
  { id: 'ai-chat-on-mac', title: 'AI chat on Mac' },
  { id: 'children', title: 'Children' },
  { id: 'contact-and-changes', title: 'Contact and changes' },
]

export default function AppPrivacy() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20 xl:grid xl:grid-cols-[minmax(0,1fr)_12rem] xl:gap-14">
        <div className="min-w-0 max-w-3xl">
        <header className="border-b border-line pb-8">
          <p className="text-sm font-medium text-accent"><Link href="/privacy">Privacy</Link></p>
          <h1 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
            Lamp Bible app privacy
          </h1>
          <p className="mt-3 text-muted">Last updated November 15, 2026.</p>
        </header>

        <section aria-labelledby="at-a-glance" className="mt-8 rounded-2xl border border-line bg-sunken p-6">
          <h2 id="at-a-glance" className="font-serif text-xl tracking-tight">At a glance</h2>
          <ul className="mt-4 space-y-3 text-[0.95rem] leading-relaxed">
            {[
              'No account, advertising, tracking, crash reporting or analytics. Lamp Bible receives nothing about your reading, your library or your notes.',
              'Your library stays on your device. Sync is off unless you choose iCloud Drive or your own WebDAV server, and Lamp Bible runs neither.',
              'AI features are optional and off by default. They run on your device or through an AI provider you sign in to yourself; nothing goes to Lamp Bible.',
              'On a Mac, update checks fetch a small feed from lampbible.com, and the app asks before checking automatically.',
            ].map((point) => (
              <li key={point} className="flex gap-3">
                <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true">
                  <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted">
            Questions or a privacy request?{' '}
            <EmailLink subject="Privacy" className="font-medium text-accent underline-offset-4 hover:underline">
              Email us
            </EmailLink>
            .
          </p>
        </section>

        <div className="mt-8 xl:hidden">
          <OnThisPageFolded items={sections} />
        </div>

        <div className="doc mt-12">
          <h2 id="information-collected-by-lamp-bible">Information collected by Lamp Bible</h2>
          <p>
            The apps have no Lamp Bible account, advertising, tracking SDK, crash-reporting SDK or
            product analytics. Lamp Bible does not receive your reading activity, library, notes,
            searches, identifiers, location, contacts, photos, recordings or credentials.
          </p>

          <h2 id="information-stored-on-your-device">Information stored on your device</h2>
          <p>
            The apps store modules, reading progress, notes, writing, highlights and settings locally.
            They access photos, the camera and recordings when you add media; the camera also scans
            presentation pairing codes. WebDAV passwords and presentation pairings are stored only
            in the device’s Keychain. SWORD unlock keys are used once and not stored. You can delete
            individual content in the app and remove local app data by deleting the app.
          </p>

          <h2 id="optional-sync">Optional sync</h2>
          <p>
            Sync is off unless you choose a backend. With iCloud Drive, imported and user-created
            modules and settings are stored in the Lamp Bible folder in your own iCloud Drive and
            are processed by Apple under your Apple account. With WebDAV, the app connects directly
            to the server address you provide and transfers the same data using the credentials you
            enter. Lamp Bible does not operate or proxy either service and cannot read those stores.
            Your chosen provider&apos;s privacy policy and retention practices apply.
          </p>
          <p>
            Sync includes notes and writing with their media, highlights, reading progress, settings
            and imported modules, including imported Bibles. Lamp Bible compresses these files but
            does not encrypt them; protection depends on your storage provider.
          </p>
          <p>
            You can stop future syncing by choosing Local Only.
            {' '}On a Mac, turning sync off keeps the server details and the password in the
            Keychain until you choose Forget Sync Details in Settings → Sync.{' '}
            Removing cloud copies is done in iCloud Drive or on your WebDAV server.
          </p>

          <h2 id="presentation-remote">Presentation remote</h2>
          <p>
            An iPhone or iPad can control a Mac presentation. The remote requests local-network
            permission and discovers Macs through Bonjour or nearby peer-to-peer discovery, without
            using the internet. Pairing uses a code displayed on the Mac; a key derived from that
            code encrypts the connection.
          </p>
          <p>
            The Mac sends deck titles, current and next slides, and speaker notes. The remote sends
            commands and its device name. No data is sent to Lamp Bible. During presentation, the Mac
            advertises “Lamp Bible on” followed by its computer name on the local network. This
            continues until you quit the app.
          </p>

          <h2 id="links-and-external-bible-apps">Links and external Bible apps</h2>
          <p>
            If you ask Lamp Bible to open a passage in another Bible app or website, the passage
            reference is handed to that service. Its privacy policy applies from that point. Lamp
            Bible does not receive information back about what you do there.
          </p>

          <h2 id="apple-intelligence">Apple Intelligence</h2>
          <p>
            Where Apple Intelligence is available, a new reading plan can start from a description
            you type, such as “the Gospels in a month”. Apple&apos;s on-device model reads the
            description to fill in the plan&apos;s form, which you check before anything is added.
            The description is not sent to Lamp Bible. This is offered only while Show AI Features
            is on in Settings.
          </p>

          <h2 id="the-ai-features-switch">The AI features switch</h2>
          <p>
            <strong>Show AI Features</strong>{' '}controls plan generation, system Writing Tools in Lamp,
            and, on Mac, Reader Chat, writing agents and other apps’ access to Lamp tools. Find it
            in Settings → AI Features on iPhone and iPad, or Settings → AI &amp; Agents on Mac.
            It is off by default, except in libraries already using AI. The setting syncs across
            devices. Turning it off retains chats and drafts.
          </p>

          <h2 id="software-updates-on-mac">Software updates on Mac</h2>
          <p>
            The Mac app is distributed outside the App Store and uses the open-source Sparkle
            framework for updates. It asks before checking automatically; you can change this or
            check manually in Settings → Updates. Checks request a feed from lampbible.com, revealing
            your IP address, app name, app version and Sparkle version, but no library or usage data.
            Vercel processes these requests as described in the{' '}
            <Link href="/privacy/website">website privacy declaration</Link>. Update disk images are
            downloaded from GitHub under GitHub&apos;s privacy statement.
          </p>

          <h2 id="ai-chat-on-mac">AI chat on Mac</h2>
          <p>
            Mac AI features use a provider’s command-line tool that you install and sign in to.
            Lamp starts the tool but does not read or store provider credentials. Messages and module
            content retrieved by the agent go to that provider under its terms and privacy policy.
            Lamp Bible does not operate or proxy the service and does not receive conversations.
          </p>
          <p>
            Reader Chat messages include the current chapter, translation, selected verse and selected
            text. Writing agents receive the active file and selected text. Both use the modules
            allowed by <strong>Module Access</strong>. Personal notes, highlights and other writings
            are shared only if enabled in Settings → AI &amp; Agents. When enabled, Reader Chat also
            sends notes and highlights for the current chapter. A writing agent always has access
            to its document and workspace files, regardless of that setting.
          </p>
          <p>
            Writing-agent workspaces and conversations sync with the library. Reader Chat conversations
            stay on the Mac. Starting a writing from Reader Chat copies the conversation into the
            writing’s workspace, where it syncs.
          </p>
          <p>
            If you connect another AI app, content it reads through Lamp’s tools goes to its provider
            under that app’s and provider’s terms. The same module and personal-content settings apply.
            Editing writings, adding plans and starting writings each require separate permission,
            all off by default.
          </p>

          <h2 id="children">Children</h2>
          <p>
            Lamp Bible does not knowingly collect personal information from children. The apps do
            not contain advertising, accounts or behavioural analytics.
          </p>

          <h2 id="contact-and-changes">Contact and changes</h2>
          <p>
            Questions or privacy requests can be sent to <EmailLink subject="Privacy" />. If this
            declaration changes, the updated version and date will be published here. Material
            changes will also be communicated through the app or its App Store listing where
            appropriate.
          </p>
        </div>
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <OnThisPage items={sections} />
          </div>
        </aside>
      </main>
      <SiteFooter />
    </>
  )
}
