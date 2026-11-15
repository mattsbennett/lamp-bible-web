import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'
import { downloadPaths, isMacBeta, macRelease, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Get started on Mac',
  description:
    'Install Lamp Bible for Mac and find your way around: the sidebar, the passage field, reader tabs, the study column, Go to Anything, and where each feature lives.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/mac"
      title="Get started on Mac"
      intro="The same library and the same modules as iPhone and iPad, laid out for a large screen, a keyboard and a menu bar."
    >
      <p>
        Lamp Bible for Mac is {isMacBeta ? 'in beta, as' : ''} a{' '}
        <Link href={downloadPaths.mac}>direct download</Link> for {macRelease.minimumOS}. It reads
        the same bundled library, installs the same <code>.lamp</code> modules, and{' '}
        <Link href="/docs/sync">syncs</Link> with your other devices. Each topic in these docs
        covers both apps, with an <strong>On the Mac</strong> section for what is different here;
        choose <strong>Mac</strong> under <strong>Show instructions for</strong> to see only the
        Mac’s.
      </p>

      {isMacBeta && (
        <Callout title="A beta">
          <p>
            The Mac beta may contain bugs. It checks for
            updates if you allow it, and <strong>Lamp Bible → Check for Updates…</strong> looks at
            once. If something goes wrong,{' '}
            <a href={site.issuesUrl} target="_blank" rel="noopener noreferrer">
              open an issue
            </a>{' '}
            or email {site.email}.
          </p>
        </Callout>
      )}

      <h2>Install</h2>
      <p>
        Download the disk image from the <Link href={downloadPaths.mac}>Mac download page</Link>,
        open it, and drag Lamp Bible into Applications. The first launch unpacks the bundled
        library, which takes a few seconds; after that everything works offline. To use the
        library you already have on iPhone or iPad, turn on the same sync in Settings → Sync — see{' '}
        <Link href="/docs/sync#on-the-mac">Sync on the Mac</Link>.
      </p>

      <h2>Finding your way</h2>
      <p>The sidebar holds everything:</p>
      <ul>
        <li>
          <strong>Study</strong> — Today, Reader, Books, Reading Plans, Writing, Quizzes and Search.
        </li>
        <li>
          <strong>Library</strong> — Modules, and <strong>Import or Create…</strong> at the bottom.
        </li>
      </ul>
      <p>
        A <strong>Lamp Bible</strong> item in the menu bar shows today’s readings from the plans you
        follow; click one to open it in the reader. Settings has its own window, grouped into
        Reading, Content and Services; its Reader pane shows a few verses set as you choose the
        typeface, size and spacing.
      </p>
      <p>
        <strong>Go to Anything…</strong> (⌘K) reaches further: a passage, a Strong’s number to look
        up or analyse, a book, writing, deck, plan or quiz by name, matches across your library, a
        command, a section of the app or a setting. Return opens a passage in the tab you are in,
        ⌘Return in a new tab and ⌥Return in a new window.
      </p>

      <h2>The reader’s window</h2>
      <ul>
        <li>
          <strong>The passage in the toolbar</strong> — click it, or press ⌘L, to go somewhere
          else; the arrows either side step through chapters and books. See{' '}
          <Link href="/docs/reader#on-the-mac">The reader on the Mac</Link>.
        </li>
        <li>
          <strong>Tabs</strong> under the toolbar, and separate windows, each with its own place in
          scripture.
        </li>
        <li>
          <strong>The study column</strong> (⇧⌘I) beside the text: commentary, the selected verse’s
          notes and original language, your notes and highlights, and the dictionary.
        </li>
        <li>
          <strong>Reader Chat</strong> (⇧⌘J), once AI features are on — see{' '}
          <Link href="/docs/ai">AI features</Link>.
        </li>
      </ul>

      <h2>Where things are</h2>
      <Table>
        <thead>
          <tr>
            <th>To</th>
            <th>On the Mac</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Follow a <Link href="/docs/reading-plans#on-the-mac">reading plan</Link>
            </td>
            <td>Today, and Reading Plans in the sidebar</td>
          </tr>
          <tr>
            <td>
              Write a <Link href="/docs/notes#on-the-mac">note</Link> or{' '}
              <Link href="/docs/highlights#on-the-mac">highlight</Link>
            </td>
            <td>The study column’s Notes tab, or right-click a verse</td>
          </tr>
          <tr>
            <td>
              Work on your <Link href="/docs/writing#on-the-mac">writing</Link>
            </td>
            <td>Writing in the sidebar, ⇧⌘N for a new piece</td>
          </tr>
          <tr>
            <td>
              Read a <Link href="/docs/books#on-the-mac">book</Link>
            </td>
            <td>Books in the sidebar</td>
          </tr>
          <tr>
            <td>
              <Link href="/docs/search#on-the-mac">Search</Link>, or analyse a Strong’s number
            </td>
            <td>Search in the sidebar, or a number in Go to Anything</td>
          </tr>
          <tr>
            <td>
              Build <Link href="/docs/presenting">slides</Link>
            </td>
            <td>Slide Studio: File → New Presentation Deck, or Build Presentation Deck</td>
          </tr>
          <tr>
            <td>
              Install, import or build <Link href="/docs/modules#on-the-mac">modules</Link>
            </td>
            <td>Modules in the sidebar, and Import or Create… (⇧⌘M)</td>
          </tr>
          <tr>
            <td>
              Sync with your other <Link href="/docs/sync#on-the-mac">devices</Link>
            </td>
            <td>Settings → Sync</td>
          </tr>
        </tbody>
      </Table>
      <p>
        Every shortcut is listed under <Link href="/docs/mac/keyboard">Keyboard shortcuts</Link>.
      </p>

      <h2>Updates</h2>
      <p>
        The Mac app updates itself. It asks before checking automatically; change that, or check
        by hand, in Settings → Updates or with <strong>Check for Updates…</strong> in the app menu.
        A check downloads a small feed from this website and sends nothing about you or your
        library — see the <Link href="/privacy/apps">app privacy declaration</Link>.
      </p>
    </DocPage>
  )
}
