import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage } from '@/components/docs/DocPage'
import { downloadPaths, isMacAvailable, macRelease, site, plannedPlatforms } from '@/lib/site'

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
        No. There is no sign-in anywhere in the app. Sync, when you turn it on, uses your iCloud
        Drive or your own WebDAV server — never an account with us, because there isn’t one.
      </p>

      <h2>What data do you collect?</h2>
      <p>
        The app collects no personal information and has no analytics or tracking SDK. Optional
        sync connects directly to your iCloud Drive or WebDAV provider.
        {isMacAvailable && (
          <>
            {' '}
            On the Mac, update checks — made only if you allow them — download a small feed from
            this website, which, like any web request, reveals your IP address to its host.
          </>
        )}{' '}
        This website uses Vercel
        Web Analytics and Speed Insights for aggregate traffic and performance measurements. The
        separate app and website disclosures are in the <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2>Does it work offline?</h2>
      <p>
        Completely. Bundled translations, lexicons, cross-references and reading plans — plus any
        modules you install — are on the device. The app connects to the network only for things
        you turn on: cloud sync and handing a passage to another Bible app
        {isMacAvailable && <>, and on the Mac, update checks and AI chat</>}.
      </p>

      <h2>Why isn’t my usual translation there?</h2>
      <p>
        Modern translations are normally protected by copyright and cannot be bundled without
        permission. The audited replacement library uses translations with documented
        public-domain or open distribution terms. The legacy live app&apos;s plain-text BBE is retired
        for the next release. Plain KJV and CrossWire KJV with Strong&apos;s are included outside the
        United Kingdom — see <Link href="/content-licences">Content licences</Link>. If your licence
        permits making a converted copy, the{' '}
        <Link href="/docs/modules">module system</Link> lets you build and install it yourself.
        Sharing that module also requires redistribution rights.
      </p>

      <h2>What is a <code>.lamp</code> file?</h2>
      <p>
        It is a module: a compressed SQLite database holding one translation, commentary, dictionary,
        plan, note collection, devotional or highlight set. The format is documented in{' '}
        <Link href="/docs/modules/authoring">Authoring modules</Link>.
      </p>

      <h2>Can I get my notes out?</h2>
      <p>
        Yes, at any time and without asking. Notes and devotionals export to plain markdown with
        their images and audio; modules export as <code>.lamp</code> packages. See{' '}
        <Link href="/docs/import-export">Import &amp; export</Link>.
      </p>

      <h2>What happens if I stop using the app?</h2>
      <p>
        Export everything to markdown first and you keep ordinary text files that open in any
        editor. That is the point of the format.
      </p>

      <h2>Which devices does it run on?</h2>
      <p>
        iPhone and iPad, from the{' '}
        <a href={site.appStoreUrl} target="_blank" rel="noopener noreferrer">
          App Store
        </a>
        {isMacAvailable ? (
          <>
            , and Mac, as a <Link href={downloadPaths.mac}>direct download</Link> for{' '}
            {macRelease.minimumOS}.
          </>
        ) : (
          '.'
        )}
        {plannedPlatforms.length > 0 && (
          <> A {plannedPlatforms.map((p) => p.name).join(' and ')} version is in development.</>
        )}
      </p>

      <h2>Can I sync between my devices?</h2>
      <p>
        Yes — through iCloud Drive or a WebDAV server. Your imported modules, notes, devotionals,
        highlights and settings travel; the bundled library does not need to, since it is already on
        every install. See <Link href="/docs/sync">Sync &amp; backup</Link>.
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
