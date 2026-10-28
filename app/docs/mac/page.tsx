import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'
import { downloadPaths, isMacAvailable, macRelease } from '@/lib/site'

export const metadata: Metadata = {
  title: 'The Mac app',
  description:
    'Lamp Bible on the Mac: reader tabs and layouts, the study column, writing with find and replace, books, search, plans, the menu-bar Today, building modules, sync and updates.',
}

export default function Page() {
  if (!isMacAvailable) notFound()

  return (
    <DocPage
      href="/docs/mac"
      title="The Mac app"
      intro="The same library and the same modules as iPhone and iPad, laid out for a large screen, a keyboard and a menu bar."
    >
      <p>
        Lamp Bible for Mac is a <Link href={downloadPaths.mac}>direct download</Link> for{' '}
        {macRelease.minimumOS}. It reads the same bundled library, installs the same{' '}
        <code>.lamp</code> modules, and <Link href="/docs/sync">syncs</Link> with your other devices.
        Most of the rest of these docs apply to it as written; this page covers where the Mac
        differs, and what it adds. Slide Studio and AI chat have pages of their own:{' '}
        <Link href="/docs/presenting">Slides &amp; presenting</Link> and{' '}
        <Link href="/docs/ai">AI chat &amp; agents</Link>.
      </p>

      <h2>Finding your way</h2>
      <p>The sidebar holds everything:</p>
      <ul>
        <li>
          <strong>Study</strong> — Today, Reader, Books, Reading Plans, Writing, Quizzes and Search.
        </li>
        <li>
          <strong>Translations</strong> — one row for each installed translation.
        </li>
        <li>
          <strong>Library</strong> — Modules, and <strong>Import or Create…</strong> at the bottom.
        </li>
      </ul>
      <p>
        A <strong>Lamp Bible</strong> item in the menu bar shows today’s readings from the plans you
        follow; click one to open it in the reader. Settings has its own window, grouped into
        Reading, Content and Services.
      </p>

      <h2>The reader</h2>
      <p>
        The button in the middle of the toolbar shows where you are; click it to choose a
        translation, book and chapter. The reader keeps tabs: <strong>⌘T</strong> or the{' '}
        <strong>+</strong> at the end of the tab row opens a new one, duplicating the current
        passage or at a passage you choose. Tabs, with each one’s translation and chapter, come back
        when you relaunch. <strong>Reading History</strong> keeps the last hundred places you have
        been, across launches.
      </p>

      <h3>Layout and text</h3>
      <p>
        The <strong>Reader Appearance</strong> menu chooses how a chapter is laid out —{' '}
        <strong>Continuous Paragraph Flow</strong>, <strong>Verse per Line</strong>, or{' '}
        <strong>Side by Side</strong>, which reads a <strong>Companion</strong> translation verse by
        verse beside the main one — along with typeface, text size and line spacing.
      </p>

      <h3>Marks in the margin</h3>
      <Table>
        <thead>
          <tr>
            <th>Mark</th>
            <th>Means</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A bar in the margin</td>
            <td>The selected verse</td>
          </tr>
          <tr>
            <td>An orange note in the margin</td>
            <td>Your note on that verse; click to open it</td>
          </tr>
          <tr>
            <td>A purple book in the margin</td>
            <td>Notes from an installed notes module</td>
          </tr>
          <tr>
            <td>A blue letter in the text</td>
            <td>A translator’s note, which opens in place beneath the verse</td>
          </tr>
        </tbody>
      </Table>

      <h3>Verses and words</h3>
      <p>
        Click a verse number to select the verse and open its notes in the study column.
        Right-click a verse to <strong>Copy as Citation</strong> or highlight it. In a
        Strong’s-tagged translation, hovering over a word shows its Strong’s number at the foot of
        the window, and clicking opens it in the Dictionary tab.
      </p>

      <h3>Read aloud</h3>
      <p>
        The toolbar’s <strong>Read Aloud</strong> button reads the current chapter with the system
        voices, from the beginning or from the selected verse, and can follow the verse being
        spoken. Choose the voice and speed in Settings → Reader.
      </p>

      <h3>Keyboard</h3>
      <Table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Keys</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Previous / next chapter (or plan reading)</td>
            <td>⌘[ / ⌘]</td>
          </tr>
          <tr>
            <td>Previous / next book</td>
            <td>⇧⌘[ / ⇧⌘]</td>
          </tr>
          <tr>
            <td>Back / forward in reading history</td>
            <td>⌥⌘[ / ⌥⌘]</td>
          </tr>
          <tr>
            <td>Larger / smaller text</td>
            <td>⌘+ / ⌘−</td>
          </tr>
          <tr>
            <td>Study tools</td>
            <td>⇧⌘I</td>
          </tr>
          <tr>
            <td>Reader Chat</td>
            <td>⇧⌘J</td>
          </tr>
          <tr>
            <td>Link study tool scrolling</td>
            <td>⇧⌘L</td>
          </tr>
          <tr>
            <td>New reader tab</td>
            <td>⌘T</td>
          </tr>
          <tr>
            <td>New writing</td>
            <td>⇧⌘N</td>
          </tr>
          <tr>
            <td>Install module / import personal study data</td>
            <td>⌘O / ⌥⌘O</td>
          </tr>
          <tr>
            <td>Import or Create Content</td>
            <td>⇧⌘M</td>
          </tr>
          <tr>
            <td>Previous / next section in a book</td>
            <td>⌥⌘← / ⌥⌘→</td>
          </tr>
        </tbody>
      </Table>

      <h2>The study column</h2>
      <p>
        <strong>Study Tools</strong> (⇧⌘I) opens a column beside the text, which you can widen by
        dragging. It has four tabs:
      </p>
      <Table>
        <thead>
          <tr>
            <th>Tab</th>
            <th>Shows</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Commentary</td>
            <td>
              The chapter’s commentary, grouped by passage, from the commentary you choose —
              including the cross-reference sets
            </td>
          </tr>
          <tr>
            <td>Verse</td>
            <td>
              The selected verse’s translation notes, its original-language words with Strong’s
              numbers, lemmas and morphology, and its cross-references
            </td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>
              Your notes on the chapter, with the selected verse’s note open to edit, its
              highlights, and notes from installed notes modules
            </td>
          </tr>
          <tr>
            <td>Dictionary</td>
            <td>Lexicon lookups by word, lemma or Strong’s number</td>
          </tr>
        </tbody>
      </Table>
      <p>
        Commentary and notes follow the reader as you scroll, unless you turn off{' '}
        <strong>Link Study Tool Scrolling</strong>. A scripture reference anywhere in the column
        opens a preview, with buttons to open it in the current tab or a new one.
      </p>

      <h3>Notes and highlights</h3>
      <p>
        A note has an optional title and formatted text, saved as markdown, and can cover a range of
        verses within the chapter. Save with <strong>⌘S</strong>; saving an empty note deletes it.
        To highlight part of a verse, use <strong>Highlight Words…</strong>: choose the set, a
        style and a colour, or apply a <Link href="/docs/highlights">theme</Link> — and save a new
        theme from there.
      </p>
      <p>
        The <strong>Study Data</strong> menu at the foot of the Notes tab exports a book’s notes or a
        translation’s highlights as JSON or a <code>.lamp</code> module, and imports study data back.
        Imported notes merge with yours, the newer copy of each winning.
      </p>

      <h2>Writing</h2>
      <p>
        On the Mac, <Link href="/docs/devotionals">devotionals</Link> are called{' '}
        <strong>Writing</strong>, and open in their own editor window. Beyond what the iPhone and iPad
        editor does, the Mac adds:
      </p>
      <ul>
        <li>
          <strong>Visual and Markdown</strong> editing, switchable at any time, with a word count and
          silent and read-aloud reading times in the status bar.
        </li>
        <li>
          <strong>Find and replace</strong> — ⌘F, ⌥⌘F — in either mode, with Match Case and Whole
          Words.
        </li>
        <li>
          <strong>Details</strong>: title, subtitle, author, date, tags, category, series and
          order, key scriptures, a summary, and footnotes kept in a field of their own.
        </li>
        <li>
          <strong>Footnotes</strong> from the toolbar, each edited in a small panel beside its
          marker, with <strong>Remove</strong> taking the marker and note together.
        </li>
        <li>
          <strong>Scripture</strong>, which inserts the verse selected in the reader as a link, and{' '}
          <strong>Media</strong> and <strong>Record</strong> for images and audio.
        </li>
        <li>
          <strong>Revision History</strong>, to undo a change or restore an earlier version.
        </li>
        <li>
          Companion files — an outline, research notes — as tabs beside the main text.
        </li>
      </ul>
      <p>
        Writing saves itself shortly after you stop typing; ⌘S saves at once. The Writing list
        sorts, groups and filters your collection, and its <strong>Present</strong> button shows the
        selected piece full screen for reading from. Export a piece as a <code>.lamp</code> file from
        its menu, or a collection as markdown from Modules.
      </p>

      <h2>Books</h2>
      <p>
        <Link href="/docs/books">Books</Link> read in three resizable columns — your books, the
        contents, and the text — with search within the book, bookmarks, and your own typeface,
        size and spacing. Your place, down to the paragraph, and your bookmarks sync between Macs.{' '}
        <strong>Open in Book Reader</strong> moves a book into a window of its own, and{' '}
        <strong>Share Section</strong> copies a link straight to the section.
      </p>

      <h2>Search</h2>
      <p>
        The Mac’s search covers everything <Link href="/docs/search">Search</Link> describes, plus
        reading plans and quizzes, in one list with a preview beside it. Filters narrow it by kind of
        content, by module, to the Old or New Testament, by Strong’s key or highlight colour, and —
        for writing — by date, tag and category.
      </p>

      <h2>Today and reading plans</h2>
      <p>
        <strong>Reading Plans</strong> chooses which plans appear in <strong>Today</strong>. Each
        reading in Today shows its estimated time and can be marked complete, opened in the reader,
        or opened in an <Link href="/docs/reader">external Bible app</Link>. Opening a plan enters
        plan reading: only the day’s passages, a bar to move between readings and mark them
        complete, and the day’s quiz in a panel. Settings → Reading Plans sets the reading speed and
        a daily reminder.
      </p>
      <Callout title="Plan progress stays on each Mac">
        <p>
          The Mac keeps its own choice of plans and its own record of what you have read; neither
          syncs to your other devices yet.
        </p>
      </Callout>

      <h2 id="make-a-module">Modules, importing and building</h2>
      <p>
        <strong>Modules</strong> in the sidebar lists everything installed, built in or yours, and
        exports any module you made as a <code>.lamp</code> — or as markdown, for books, writing and
        notes. <strong>Import or Create Content</strong> (⇧⌘M) gathers every way in:
      </p>
      <ul>
        <li>
          <strong>Install Module</strong> — one or more <code>.lamp</code> files.
        </li>
        <li>
          <strong>Import a Bible</strong> — a USFM, OSIS, Zefania or XML Bible, or a SWORD module,
          you own. See <Link href="/docs/modules/import-bible">Importing a Bible</Link>.
        </li>
        <li>
          <strong>Create Module</strong> — drop module JSON in, and the app identifies its type,
          validates it against the schema and lists any problems.{' '}
          <strong>Build .lamp</strong> compiles it, checks the result’s integrity and shows its
          SHA-256, ready to show in Finder or install. Every module type can be built, books
          included. See <Link href="/docs/modules/authoring">Authoring modules</Link>.
        </li>
        <li>
          <strong>Import Personal Content</strong> — notes or writing from markdown, or notes and
          highlights from JSON or <code>.lamp</code>.
        </li>
      </ul>
      <p>
        Double-clicking a <code>.lamp</code> or <code>.lampdeck</code> file in Finder opens it in
        Lamp Bible too.
      </p>

      <h2>Sync on the Mac</h2>
      <p>
        Settings → Sync chooses <strong>iCloud Drive or Folder</strong> or{' '}
        <strong>WebDAV</strong>, and connects to the same library as your iPhone and iPad. The Mac
        syncs when it opens and when you press <strong>Sync Now</strong>; it does not sync in the
        background. When a note or a piece of writing changed on two devices, the Sync pane shows it
        under <strong>Needs Your Decision</strong>, where you compare the versions and keep one.
      </p>
      <p>
        The Mac also syncs what only it makes: slide decks and their pictures, and each writing’s
        agent workspace — companion files, context, skills, revisions and agent conversations.
        Reader tabs, history and Reader Chat conversations stay on each Mac.
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
