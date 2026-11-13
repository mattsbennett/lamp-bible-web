import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'
import { downloadPaths, isMacBeta, macRelease, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'The Mac app',
  description:
    'Lamp Bible on the Mac: the passage field, reader tabs and layouts, the study column, writing with find and replace, books, search, Today and reading plans, building modules, sync and updates.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/mac"
      title="The Mac app"
      intro="The same library and the same modules as iPhone and iPad, laid out for a large screen, a keyboard and a menu bar."
    >
      <p>
        Lamp Bible for Mac is {isMacBeta ? 'in beta, as' : ''} a{' '}
        <Link href={downloadPaths.mac}>direct download</Link> for {macRelease.minimumOS}. It reads the same bundled library, installs the same{' '}
        <code>.lamp</code> modules, and <Link href="/docs/sync">syncs</Link> with your other devices.
        Most of the rest of these docs apply to it as written; this page covers where the Mac
        differs, and what it adds. Slide Studio and AI chat have pages of their own:{' '}
        <Link href="/docs/presenting">Slides &amp; presenting</Link> and{' '}
        <Link href="/docs/ai">AI chat &amp; agents</Link>.
      </p>

      {isMacBeta && (
        <Callout title="A beta">
          <p>
            The Mac app changes from one update to the next, and you may meet a bug. It checks for
            updates if you allow it, and <strong>Lamp Bible → Check for Updates…</strong> looks at
            once. If something goes wrong,{' '}
            <a href={site.issuesUrl} target="_blank" rel="noopener noreferrer">
              open an issue
            </a>{' '}
            or email {site.email}.
          </p>
        </Callout>
      )}

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

      <h2>The reader</h2>
      <p>
        The capsule in the middle of the toolbar shows where you are, with arrows either side for
        the previous and next chapter and, further out, the previous and next book. Click it, or
        press <strong>⌘L</strong>, to go somewhere else: type a reference such as{' '}
        <code>John 3:16</code> and press Return, or choose a translation and a book and click a
        chapter in the grid. To land on a verse, hold or force click a chapter, or press Space, and
        pick from its verses. Words that are not a reference offer a search instead, and a Strong’s
        number offers its{' '}
        <Link href="/docs/search#analysis">analysis</Link>. Tab moves between the field, the books
        and the chapters, and the arrow keys move within them.
      </p>
      <p>
        <strong>Go to Anything…</strong> (⌘K) reaches further: a passage, a Strong’s number to look
        up or analyse, a book, writing, deck, plan or quiz by name, matches across your library, a
        command, a section of the app or a setting. Return opens a passage in the tab you are in,
        ⌘Return in a new tab and ⌥Return in a new window.
      </p>

      <h3>Tabs</h3>
      <p>
        The reader keeps tabs, in a bar beneath the toolbar. <strong>⌘T</strong>, or the{' '}
        <strong>+</strong> at the end of the bar, opens a new tab on a page that chooses its
        passage: type a reference, pick a translation, book and chapter, or click one of the
        chapters under <strong>Recently Read</strong>. Drag a tab to move it, and press ⌃Tab or
        ⌃⇧Tab to step through them; a tab’s close button shows when you point at it. A tab is named
        after its chapter until you right-click it and choose <strong>Rename Tab…</strong>, and then
        keeps that name as you read on; the same menu duplicates or closes it.
      </p>
      <p>
        Each tab keeps its own study column — open or shut, on the tool it was showing — and its
        own Reader Chat. Choosing a tab shows it as you left it, scrolled to the same verse, and
        tabs come back as they were when you relaunch. <strong>Reading History</strong> keeps the
        last hundred places you have been, across launches.
      </p>
      <p>
        <strong>New Reader Window</strong> (⌥⌘N) opens another reader. Each window has its own
        place in scripture, its own tabs and its own back and forward, so two windows can sit on
        different chapters, and each comes back with its own tabs. Notes and highlights are shared:
        one made in either window shows in both at once.
      </p>

      <h3>Layout and text</h3>
      <p>
        The <strong>Reader Appearance</strong> menu chooses how a chapter is laid out —{' '}
        <strong>Continuous Paragraph Flow</strong>, <strong>Verse per Line</strong>, or{' '}
        <strong>Side by Side</strong> — along with typeface, text size and line spacing. The text
        keeps to a comfortable line length, which grows with the text size.
      </p>
      <p>
        Side by Side reads up to three other translations verse by verse beside the one you are
        reading. Turn it on with the <strong>Side by Side</strong> button in the toolbar, or with
        the <strong>+</strong> beside a chapter’s opening, which lists the other translations to
        read beside it, grouped by language with the Hebrew and Greek last, and marks those tagged
        with Strong’s numbers. Each column’s title is a menu that changes its translation, makes it the one
        you are reading, or removes its column; the <strong>+</strong> beside the titles adds another.
        Verses are paired through each translation’s own numbering, so a verse that two
        translations number differently still sits beside its match. Each column shows its own
        highlights and translator’s notes. Where the columns would be too narrow — with the study
        column open, say — the other translations move beneath each verse, labelled with their
        short names.
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
        spoken. Choose the voice and speed in Settings → Reader; <strong>Automatic</strong> uses the
        best voice installed. The same pane’s <strong>Greek Words</strong> chooses how the speaker
        beside a Strong’s word says Greek: <strong>Classroom (Erasmian)</strong> or{' '}
        <strong>Modern Greek</strong>, which needs a Greek voice installed.
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
            <td>Go to a passage, or search</td>
            <td>⌘L</td>
          </tr>
          <tr>
            <td>Go to Anything</td>
            <td>⌘K</td>
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
            <td>Reader Chat, with AI features on</td>
            <td>⇧⌘J</td>
          </tr>
          <tr>
            <td>Link study tool scrolling</td>
            <td>⇧⌘L</td>
          </tr>
          <tr>
            <td>New tab, in the reader or Search</td>
            <td>⌘T</td>
          </tr>
          <tr>
            <td>Next / previous tab</td>
            <td>⌃Tab / ⌃⇧Tab</td>
          </tr>
          <tr>
            <td>New writing</td>
            <td>⇧⌘N</td>
          </tr>
          <tr>
            <td>New presentation deck</td>
            <td>⌥⇧⌘N</td>
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
        dragging. It has four tabs, which become a pop-up menu when the column is narrow:
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
              highlights, a list of the chapter’s highlights to go to, and notes from installed
              notes modules, set out with their pictures and footnotes
            </td>
          </tr>
          <tr>
            <td>Dictionary</td>
            <td>
              Lexicon lookups by word, lemma or Strong’s number, with a speaker to say the word
              aloud and <strong>Analyse</strong>, which opens the word’s{' '}
              <Link href="/docs/search#analysis">analysis</Link> in the column, beside the passage
            </td>
          </tr>
        </tbody>
      </Table>
      <p>
        Commentary and notes follow the reader as you scroll, unless you turn off{' '}
        <strong>Link Study Tool Scrolling</strong>; to read another translation beside the text,
        use Side by Side. A scripture reference anywhere in the column opens a preview, with
        buttons to open it in the current tab or a new one.
      </p>

      <h3>Notes and highlights</h3>
      <p>
        A note has an optional title and formatted text, saved as markdown, and can cover a range of
        verses within the chapter. <strong>Attach Image</strong> in its format bar adds a picture,
        which syncs with the note. Save with <strong>⌘S</strong>; saving an empty note deletes it.
        To highlight part of a verse, use <strong>Highlight Words…</strong>: choose the set, a
        style and a colour, or apply a <Link href="/docs/highlights">theme</Link> — and save a new
        theme from there. It also lists what the verse is already highlighted with, each with a{' '}
        <strong>Remove</strong> button, and <strong>Delete Set…</strong> removes one of your sets
        and every highlight in it, in every translation. <strong>Remove Highlight</strong> in a
        verse’s menu clears all of your own highlights from that verse; a module’s highlights stay.
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
          <strong>Find and replace</strong> — ⌘F, ⌥⌘F — in either mode. <strong>Aa</strong> and{' '}
          <strong>ab</strong> in the find field turn on Match Case and Whole Words, and are filled
          in while they are on.
        </li>
        <li>
          <strong>Details</strong>: title, subtitle, author, date, tags, category, series and
          order, key scriptures, a summary, and footnotes kept in a field of their own.
        </li>
        <li>
          The <strong>Insert</strong> menu in the format bar: <strong>Scripture Link</strong>, for
          the verse selected in the reader; <strong>Footnote</strong>, each edited in a small panel
          beside its marker, with <strong>Remove</strong> taking the marker and note together; and{' '}
          <strong>Image or Audio File…</strong> and <strong>Record Audio…</strong>.
        </li>
        <li>
          <strong>Revision History</strong>, to undo a change or restore an earlier version.
        </li>
        <li>
          Companion files — an outline, research notes — made with{' '}
          <strong>New Markdown File…</strong> in the toolbar’s <strong>Workspace</strong> menu. They
          open as tabs beside the main text; the tab bar appears once there is one.
        </li>
      </ul>
      <p>
        Writing saves itself shortly after you stop typing; ⌘S saves at once. The Writing list
        sorts, groups and filters your collection, and ⌘F finds in the preview of the piece
        selected in it. Above the preview, a strip steps to the previous or next writing, opens the
        piece to edit, shares it as markdown and sets the text’s appearance; the{' '}
        <strong>Hide Writing List</strong> button gives the preview the whole window. Its{' '}
        <strong>Present</strong> button shows the selected piece full screen for
        reading from. Export a piece as a <code>.lamp</code> file from its menu, or a collection as
        markdown from Modules. Deleting a piece also deletes the decks built from it, and the Mac
        names them before it does.
      </p>

      <h2>Books</h2>
      <p>
        <Link href="/docs/books">Books</Link> read in three resizable columns — your books, grouped
        by genre unless you choose otherwise from <strong>Group Books</strong>, the contents, and the
        text — with search within the book, bookmarks, and your own typeface,
        size and spacing. Your place, down to the paragraph, and your bookmarks sync between Macs.{' '}
        <strong>Open in Book Reader</strong> moves a book into a window of its own, and{' '}
        <strong>Share Section</strong> copies a link straight to the section.
      </p>

      <h2>Search</h2>
      <p>
        The Mac’s search covers everything <Link href="/docs/search">Search</Link> describes in one
        list, grouped by kind with Scripture first, and previews the selected result beside it in
        the reader’s own type. Each kind gets a share of the list, and one with more to show offers{' '}
        <strong>More in</strong> it beside its heading. Scripture comes from the translation you are
        reading, noting how many others also match, or from another translation when yours has
        none. A dictionary result shows the whole entry, with <strong>Look Up</strong> and{' '}
        <strong>Analyse</strong>. Typing a reference puts a row to go straight to it above the
        results, and typing a Strong’s number one to analyse it. The filter bar under the toolbar
        narrows the results by kind of content, by module, to the Old or New Testament, by
        Strong’s key or highlight colour, and — for writing — by date, tag and category.
      </p>
      <p>
        Search keeps tabs too, in the same bar as the reader’s, each named after its words. A search
        started from the reader goes to a tab already showing it, or to an empty one, before it
        opens another. Search tabs come back when you relaunch.
      </p>

      <h2>Today and reading plans</h2>
      <p>
        <strong>Today</strong> is the day’s page. It shows each plan you follow with that day’s
        readings, how many are done, and <strong>Start Reading</strong>,{' '}
        <strong>Continue Reading</strong> or <strong>Read Again</strong>; a strip showing how the week stands; and, under{' '}
        <strong>Pick Up Where You Left Off</strong>, the passage open in the reader, the quiz on the
        day’s readings and the writing you last worked on. The arrows and the calendar at the top
        show another day. Each reading shows its estimated time and can be marked complete, opened in
        the reader, or — from its context menu — opened in an{' '}
        <Link href="/docs/reader">external Bible app</Link>.
      </p>
      <p>
        <strong>Reading Plans</strong> chooses which plans appear in Today, and{' '}
        <strong>New Plan…</strong> makes one from the passages you want to read — see{' '}
        <Link href="/docs/reading-plans">Reading plans</Link>. Opening a plan enters plan reading:
        only the day’s passages, a bar to move between readings and mark them complete, and the
        day’s quiz in a panel. Settings → Reading Plans sets the reading speed and a daily reminder.
        The plans you follow and the readings you tick sync with your iPhone and iPad.
      </p>

      <h2 id="make-a-module">Modules, importing and building</h2>
      <p>
        <strong>Modules</strong> in the sidebar shelves everything installed: your own My Writing,
        My Notes and My Highlights first, then a shelf for each kind of module. A module you
        installed or made has a menu on its card to export or remove it — as a <code>.lamp</code>,
        or as markdown for books, writing and notes — and one that came with Lamp says{' '}
        <strong>Built In</strong>. <strong>Import or Create Content</strong> (⇧⌘M) gathers every way
        in:
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
        syncs when it opens, sends your changes a few seconds after you make them, and checks every
        half-minute for changes from your other devices while it is open;{' '}
        <strong>Sync Now</strong> forces a pass. When a note or a piece of writing changed on two
        devices, the Sync pane shows it
        under <strong>Needs Your Decision</strong>, where you compare the versions and keep one.
      </p>
      <p>
        Turning sync <strong>Off</strong> pauses it but keeps the folder, server address, username
        and password, so you can turn it back on without entering them again. To disconnect for
        good — leaving a server, or handing over a shared Mac — choose{' '}
        <strong>Forget Sync Details…</strong>, which removes them and turns sync off. Neither
        deletes anything already synced, on the Mac or on the server.
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
