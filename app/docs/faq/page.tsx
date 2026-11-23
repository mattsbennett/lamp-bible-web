import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage } from '@/components/docs/DocPage'
import { downloadPaths, isMacBeta, macRelease, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Common questions about Lamp Bible: pricing, accounts, privacy, offline use, copyrighted translations, platforms and data portability.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/faq"
      title="FAQ"
      intro="Short answers to the questions that come up most often."
    >
      <h2>Is it free?</h2>
      <p>
        Yes. The app is a free download and the bundled library is included. There is no
        subscription, no in-app purchase and no paid tier.
      </p>

      <h2>Do I need an account?</h2>
      <p>
        No Lamp Bible account is needed. Optional sync uses your iCloud Drive or WebDAV account.
        The Mac’s optional <Link href="/docs/ai">AI chat</Link> uses your own AI provider account
        and is hidden until you enable <strong>Show AI Features</strong>.
      </p>

      <h2>What data do you collect?</h2>
      <p>
        The app collects no personal information and has no analytics or tracking SDK. Optional
        sync connects directly to your iCloud Drive or WebDAV provider.
        On the Mac, update checks — made only if you allow them — download a small feed from this
        website, which, like any web request, reveals your IP address to its host. This website
        uses Vercel Web Analytics and Speed Insights for aggregate traffic and performance
        measurements. The separate app and website disclosures are in the{' '}
        <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2>Does it work offline?</h2>
      <p>
        Yes. Bundled and installed content is stored on the device. Optional features use a
        connection: cloud sync, external links, Mac update checks and AI chat. The presentation
        remote uses only the local network, and chats from an iPhone or iPad go only to your Mac,
        over the local network or Tailscale.
      </p>

      <h2>Why isn’t my usual translation there?</h2>
      <p>
        Modern translations are normally protected by copyright and cannot be bundled without
        permission. The bundled library uses translations with documented public-domain or open
        distribution terms — see <Link href="/content-licences">Content licences</Link>. If you
        already own a Bible in USFM, OSIS, Zefania or SWORD form, you can import it as your own
        translation module; see <Link href="/docs/modules">The module system</Link>. Sharing that
        module with anyone else requires redistribution rights.
      </p>

      <h2>What is a <code>.lamp</code> file?</h2>
      <p>
        It is a module: a compressed SQLite database holding one translation, dictionary,
        commentary, book, reading plan, quiz, notes collection, writing collection or highlight
        set. The format is documented in{' '}
        <Link href="/docs/modules/authoring">Authoring modules</Link>.
      </p>

      <h2>Can I get my notes out?</h2>
      <p>
        Yes. Notes and writing export as markdown. Writing exports can also include images and
        audio; modules export as <code>.lamp</code> files. See{' '}
        <Link href="/docs/import-export">Import &amp; export</Link>.
      </p>

      <h2>What happens if I stop using the app?</h2>
      <p>
        Export your notes and writing as markdown before leaving. The files open in any text editor.
      </p>

      <h2>Which devices does it run on?</h2>
      <p>
        iPhone and iPad, from the{' '}
        <a href={site.appStoreUrl} target="_blank" rel="noopener noreferrer">
          App Store
        </a>
        , and Mac, as a <Link href={downloadPaths.mac}>direct download</Link> for{' '}
        {macRelease.minimumOS}.{isMacBeta && ' The Mac app is in beta.'}
      </p>

      <h2>Can I use AI chat on iPhone or iPad?</h2>
      <p>
        Yes, through your Mac. Pair the iPhone or iPad with Lamp Bible on the Mac, and the reader’s
        Chat panel can read, continue and start the Mac’s chats, choose who answers and ask a
        writing’s assistant, at home or over Tailscale. The chats run on
        the Mac, with the provider you sign in to there. See{' '}
        <Link href="/docs/ai#paired-devices">Chats from iPhone and iPad</Link>.
      </p>

      <h2>Can I sync between my devices?</h2>
      <p>
        Yes — through iCloud Drive or a WebDAV server. Your imported modules, notes, writing,
        highlights, reading progress and settings sync; the bundled library does not need to,
        since it is already on every install. Keep every device that shares a library up to date,
        since an older version stops syncing when the library moves to a newer layout. See <Link href="/docs/sync">Sync &amp; backup</Link>.
      </p>

      <h2>How do I report a bug or ask for a feature?</h2>
      <p>
        Open an issue on the{' '}
        <a href={site.issuesUrl} target="_blank" rel="noopener noreferrer">
          issue tracker
        </a>
        , or email {site.email}.
      </p>
    </DocPage>
  )
}
