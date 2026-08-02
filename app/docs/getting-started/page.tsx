import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Getting started',
  description:
    'Install Lamp Bible, choose a translation, and find your way around the reader, plans, search, writing and settings tabs.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/getting-started"
      title="Getting started"
      intro="Install the app, pick a translation, and learn what lives behind each of the five tabs."
    >
      <h2>Install</h2>
      <p>
        Lamp Bible is a free download on the{' '}
        <a href={site.appStoreUrl} target="_blank" rel="noopener noreferrer">
          App Store
        </a>
        . There is nothing to sign up for and nothing to buy. The first launch unpacks the bundled
        module database onto the device, which takes a few seconds; after that the entire library
        works with no network connection.
      </p>

      <Callout title="What you get on day one">
        <p>
          Six translations, four lexicons, a complete cross-reference set and three reading plans
          are included in the install. See{' '}
          <Link href="/docs/included-content">What ships in the app</Link> for the full list.
        </p>
      </Callout>

      <h2>The five tabs</h2>
      <p>
        Everything in the app hangs off a tab bar at the bottom of the screen. Most of your time is
        spent in the first two.
      </p>

      <Table>
        <thead>
          <tr>
            <th>Tab</th>
            <th>What it is for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Read</td>
            <td>
              The reader itself — passage text, highlighting, the tool panel, split panes and read
              aloud. See <Link href="/docs/reader">The reader</Link>.
            </td>
          </tr>
          <tr>
            <td>Plans</td>
            <td>
              Today’s readings from whichever plans you follow, with completion tracking and
              reminders. See <Link href="/docs/reading-plans">Reading plans</Link>.
            </td>
          </tr>
          <tr>
            <td>Search</td>
            <td>
              One search box across every installed module. See <Link href="/docs/search">Search</Link>.
            </td>
          </tr>
          <tr>
            <td>Write</td>
            <td>
              Your devotionals, sermons and reflections. See{' '}
              <Link href="/docs/devotionals">Devotionals</Link>.
            </td>
          </tr>
          <tr>
            <td>Settings</td>
            <td>
              Translation preferences, lexicon order, highlight colours, sync, and the module
              manager.
            </td>
          </tr>
        </tbody>
      </Table>

      <h2>Choose your translation</h2>
      <p>
        The reader opens on the Berean Standard Bible with Strong’s tagging (<code>BSBs</code>) by
        default. Change it from the translation control in the reader, or in Settings.
      </p>
      <p>
        Translations whose identifier ends in <code>s</code> — <code>BSBs</code>, <code>KJVs</code>,{' '}
        <code>ASVs</code>, <code>WEBs</code> — carry Strong’s numbers on individual words. In those
        translations you can tap a word to open its lexicon entry. Translations without tagging read
        perfectly well but have no word-level lookups.
      </p>
      <p>
        If you never use some of the bundled translations, hide them in Settings rather than
        deleting anything. Hidden translations disappear from the picker but stay installed.
      </p>

      <h2>Set your reading pace</h2>
      <p>
        Reading plans estimate how long today’s portion will take. That estimate comes from a
        words-per-minute figure in Settings, which defaults to 183 wpm — roughly the average adult
        silent reading rate. Presets are provided for silent reading and reading aloud, or you can
        set the number yourself. It only affects the time estimates.
      </p>

      <h2>Decide where your work lives</h2>
      <p>
        Before you write much, go to Settings and choose a sync method. The options are local-only,
        iCloud Drive, or a WebDAV server of your own. Switching later is supported and the app will
        offer to migrate your existing data, but making the choice up front saves a step. See{' '}
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
        <li>Open <strong>Read</strong> and navigate to a passage using the book and chapter controls.</li>
        <li>
          Tap a word with a Strong’s number to see the lexicon entry, then swipe through the related
          entries.
        </li>
        <li>
          Select a phrase and apply a highlight; give the colour a name in Settings so it means
          something later.
        </li>
        <li>
          Open the tool panel and switch it to <strong>Notes</strong>, then write a note on the
          verse you are looking at.
        </li>
        <li>
          Go to <strong>Plans</strong>, pick a reading plan, and add the widget to your home screen
          so today’s portion is one tap away.
        </li>
      </ol>
    </DocPage>
  )
}
