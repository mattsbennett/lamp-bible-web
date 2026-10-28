import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'
import { downloadPaths, isMacAvailable, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Getting started',
  description:
    'Install Lamp Bible, choose a translation, and find your way around the home screen, the reader, search, books, writing and settings.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/getting-started"
      title="Getting started"
      intro="Install the app, pick a translation, and learn what lives behind each button on the home screen."
    >
      <h2>Install</h2>
      <p>
        Lamp Bible is a free download on the{' '}
        <a href={site.appStoreUrl} target="_blank" rel="noopener noreferrer">
          App Store
        </a>
        {isMacAvailable && (
          <>
            {' '}for iPhone and iPad, and a <Link href={downloadPaths.mac}>direct download</Link>{' '}
            for Mac
          </>
        )}
        . There is nothing to sign up for and nothing to buy. The first launch unpacks the bundled
        module database onto the device, which takes a few seconds; after that the entire library
        works with no network connection.
      </p>

      <Callout title="What you get on day one">
        <p>
          Five translations, four lexicons, two cross-reference sets, three public-domain reading
          plans and a quiz module are included in the install. See{' '}
          <Link href="/docs/included-content">Bundled content</Link> for the full list and rights
          status.
        </p>
      </Callout>

      <h2>The home screen</h2>
      <p>
        Lamp Bible opens on today: the readings from the plans you follow, with a date at the top
        to step through the days. Everything else is a button along the bottom of the screen.
      </p>

      <Table>
        <thead>
          <tr>
            <th>Button</th>
            <th>What it is for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Read</td>
            <td>
              The reader itself — passage text, highlighting, the tool panel and word lookups. See{' '}
              <Link href="/docs/reader">The reader</Link>.
            </td>
          </tr>
          <tr>
            <td>Search</td>
            <td>
              One search box across every installed module. See <Link href="/docs/search">Search</Link>.
            </td>
          </tr>
          <tr>
            <td>Books</td>
            <td>
              Long-form books you have installed. See <Link href="/docs/books">Books</Link>.
            </td>
          </tr>
          <tr>
            <td>Write</td>
            <td>
              Your devotionals, studies and reflections. See{' '}
              <Link href="/docs/devotionals">Devotionals</Link>.
            </td>
          </tr>
          <tr>
            <td>Settings</td>
            <td>
              Sync, the module manager, translation and lexicon preferences, reading rate, read
              aloud and reminders.
            </td>
          </tr>
        </tbody>
      </Table>
      <p>
        The readings themselves are covered in <Link href="/docs/reading-plans">Reading plans</Link>.
        {isMacAvailable && (
          <>
            {' '}On a Mac, the sidebar takes the place of the home screen — see{' '}
            <Link href="/docs/mac">The Mac app</Link>.
          </>
        )}
      </p>

      <h2>Choose your translation</h2>
      <p>
        The reader opens on the Berean Standard Bible with Strong’s tagging (<code>BSBs</code>) by
        default. To switch, tap the title at the top of the reader and use the translation menu
        above the list of books; to change the default, go to Settings → Modules → Settings.
      </p>
      <p>
        Translations whose identifier ends in <code>s</code> — <code>BSBs</code>, <code>ASVs</code>,{' '}
        <code>WEBs</code> and <code>KJVs</code> — carry Strong’s numbers on individual words. In
        those translations you can tap a word to open its lexicon entry. Translations without
        tagging read perfectly well but have no word-level lookups.
      </p>
      <p>
        If you never use some of the bundled translations, hide them in the same settings screen
        rather than deleting anything. Hidden translations disappear from the picker but stay
        installed. If you own another Bible as a file, you can{' '}
        <Link href="/docs/modules/import-bible">import it</Link>.
      </p>

      <h2>Set your reading pace</h2>
      <p>
        Reading plans estimate how long today’s portion will take. That estimate comes from a
        words-per-minute figure in Settings, which defaults to 183 wpm — roughly the average adult
        rate for reading aloud. A preset sets the silent-reading average instead, or you can set the
        number yourself. The same figure sets the pace of read aloud.
      </p>

      <h2>Decide where your work lives</h2>
      <p>
        Before you write much, go to Settings and choose a sync method. The options are local-only,
        iCloud Drive, or a WebDAV server of your own. Switching later is supported and the app will
        offer to bring your library with it, but making the choice up front saves a step. See{' '}
        <Link href="/docs/sync">Sync &amp; backup</Link>.
      </p>

      <Callout tone="warn" title="Local-only means local-only">
        <p>
          With sync set to Local Only, nothing leaves the device — including to a backup. If the
          device is lost, so is your work. Use{' '}
          <Link href="/docs/import-export">markdown export</Link> periodically if you stay local.
        </p>
      </Callout>

      <h2>A first pass through the app</h2>
      <ol>
        <li>
          On the home screen, tap <strong>Add</strong> under Plans and choose a reading plan.
        </li>
        <li>
          Tap <strong>Start Reading</strong>, or open <strong>Read</strong> and tap the title to
          choose a book and chapter.
        </li>
        <li>
          Tap a word with a Strong’s number to see the lexicon entry, then swipe to the same word in
          the other lexicons.
        </li>
        <li>
          Select a phrase and choose Highlight. Long-press a colour to give it a name, so it means
          something later.
        </li>
        <li>
          Choose <strong>Show Tools</strong> from the reader’s menu, switch the panel to{' '}
          <strong>Notes</strong>, and write a note on the verse you are looking at.
        </li>
        <li>
          Add the <strong>Today’s Readings</strong> widget to your Home Screen so today’s portion
          is one tap away.
        </li>
      </ol>
    </DocPage>
  )
}
