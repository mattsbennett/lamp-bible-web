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
          <p className="mt-3 text-muted">Last updated November 14, 2026.</p>
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
            The apps store your modules, reading progress, notes, writing, highlights and
            settings locally. Photos, camera images and audio recordings are accessed only when you
            choose to add them to your own content; the camera is also used to scan a presentation
            pairing code. WebDAV passwords and presentation pairings are stored in Apple&apos;s
            Keychain, on that device only. Unlock keys for SWORD modules you import are used once
            and not stored. You can remove individual content in the app and remove local app data
            by deleting the app.
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
            What syncs includes your notes and writing and their media, highlights, reading
            progress, settings, and modules you imported — including Bibles you imported yourself.
            Synced files are compressed but not encrypted by Lamp Bible, so their protection is the
            protection your provider gives them.
          </p>
          <p>
            You can stop future syncing by choosing Local Only.
            {' '}On a Mac, turning sync off keeps the server details and the password in the
            Keychain until you choose Forget Sync Details in Settings → Sync.{' '}
            Removing cloud copies is done in iCloud Drive or on your WebDAV server.
          </p>

          <h2 id="presentation-remote">Presentation remote</h2>
          <p>
            An iPhone or iPad can act as a remote for a presentation running in Lamp Bible on a Mac.
            When you open the remote, the app asks for permission to use the local network, and
            finds presenters with Bonjour on that network or by nearby peer-to-peer discovery. It
            does not connect to the internet for this. After pairing with a code shown on the Mac,
            the connection is encrypted with a key derived from that code. The Mac sends the remote
            the deck&apos;s titles and the current and next slides, including their speaker notes;
            the remote sends its commands and its device name. Nothing is sent to Lamp Bible.
            {' '}While presenting, the Mac advertises itself on the local network as “Lamp Bible
            on” followed by the Mac&apos;s computer name, until you quit the app.
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
            Show AI Features, in Settings → AI Features on iPhone and iPad and in Settings → AI &amp;
            Agents on a Mac, decides whether the apps offer any AI feature at all: plans made from a
            description, the system&apos;s writing tools in Lamp Bible&apos;s text, and on a Mac
            Reader Chat, writing agents and other apps&apos; use of Lamp Bible&apos;s tools. It is
            off unless you turn it on, except in a library that already used these features, where
            it starts on. The choice syncs with your other settings, so it applies on every device
            you sync with. Turning it off keeps your chats and drafts.
          </p>

          <h2 id="software-updates-on-mac">Software updates on Mac</h2>
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

          <h2 id="ai-chat-on-mac">AI chat on Mac</h2>
          <p>
            The Mac app&apos;s AI features work only through an AI provider&apos;s command-line
            tool that you install and sign in to yourself. Lamp Bible starts that tool on your
            Mac; it does not read or store your provider credentials. When you use it, your
            messages are sent to that provider, together with any module content the agent looks
            up. In Reader Chat each message also carries the chapter and translation you are
            reading, the verse you have marked and any text you have selected; in a writing
            agent, the file open in the editor and the text selected in it. Both look only in
            the modules your Module Access setting allows. Your own notes, highlights and other
            writing are sent or looked up only if you allow that in Settings → AI &amp; Agents;
            with it on, Reader Chat sends your notes and highlights on the chapter you are
            reading. A writing agent always has access to the writing it was opened from and the
            files you add to its workspace. The provider&apos;s terms and privacy
            policy apply. Lamp Bible does not operate or proxy these services and does not
            receive your conversations. Writing-agent workspaces, including their
            conversations, sync with your library; Reader Chat conversations stay on the Mac,
            except that starting a writing from one copies that conversation into the
            writing&apos;s workspace, where it syncs with the writing.
          </p>
          <p>
            If you allow other apps to use Lamp Bible&apos;s tools — Claude Desktop, say — what
            they read from your library goes to whichever AI provider that app uses, under that
            app&apos;s and that provider&apos;s terms. The same settings decide what they may
            read. They can change a writing, add a reading plan or start a writing only if you
            allow each separately. All of these are off until you turn them on.
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
