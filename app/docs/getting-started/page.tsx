import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Get started on iPhone & iPad',
  description:
    'Install Lamp Bible on iPhone or iPad, choose a translation, and find your way around the home screen, the reader, search, books, writing and settings.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/getting-started"
      title="Get started on iPhone & iPad"
      intro="Install Lamp Bible, choose a translation and learn the main controls."
    >
      <h2>Install</h2>
      <p>
        Download Lamp Bible free from the{' '}
        <a href={site.appStoreUrl} target="_blank" rel="noopener noreferrer">App Store</a>{' '}
        for iPhone and iPad. No account or purchase is required. The first launch takes a few
        seconds to prepare the included library, which then works offline.
      </p>

      <Callout title="Included content">
        <p>
          Eleven translations, five lexicons, two cross-reference sets, three public-domain reading
          plans and a quiz module are included in the install. See{' '}
          <Link href="/docs/included-content">Bundled content</Link> for the full list and rights
          status.
        </p>
      </Callout>

      <h2>The home screen</h2>
      <p>
        The home screen shows today’s readings from your followed plans. Use the date at the top
        to change days and the buttons along the bottom to open other features.
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
              Your writing — devotionals, studies, reflections and talks. See{' '}
              <Link href="/docs/writing">Writing</Link>.
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
        See <Link href="/docs/reading-plans">Reading plans</Link>.
        {' '}For Mac setup, see <Link href="/docs/mac">Get started on Mac</Link>. Connect both apps to the same sync location to share a library.
      </p>

      <h2>Choose your translation</h2>
      <p>
        The reader opens on the Berean Standard Bible (BSB) by default. To switch, tap the title at the top of the reader and use the translation menu
        above the list of books; to change the default, go to Settings → Translations &amp;
        Lexicons.
      </p>
      <p>
        The Berean Standard Bible and the King James Version carry Strong’s numbers on individual
        words, as do <code>TAHOT</code> and <code>TAGNT</code>, the Hebrew and Greek texts, and{' '}
        <code>LXX</code>, the Greek Septuagint. In those translations you can tap a word to open its
        lexicon entry. Other translations have no word-level lookups.
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

      <h2>Choose storage and sync</h2>
      <p>
        Choose Local Only, iCloud Drive or WebDAV in Settings. You can switch later and move
        your library to the new location. See <Link href="/docs/sync">Sync &amp; backup</Link>.
      </p>

      <Callout tone="warn" title="Back up local-only data">
        <p>
          With sync set to Local Only, nothing leaves the device — including to a backup. If the
          device is lost, so is your work. Use{' '}
          <Link href="/docs/import-export">markdown export</Link> periodically if you stay local.
        </p>
      </Callout>

      <h2>A first pass through the app</h2>
      <ol>
        <li>
          On the home screen, tap <strong>Reading Plan</strong> — or <strong>Manage</strong>, once
          you follow one — and <strong>Follow</strong> a plan.
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
          Select a phrase and choose Highlight. Long-press a colour to name it by topic.
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
