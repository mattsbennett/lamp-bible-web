import type { Metadata } from 'next'
import Link from 'next/link'
import { Platform } from '@/components/docs/Platform'
import { DocPage, Callout } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Notes',
  description:
    'Verse, verse-range and chapter notes, written in markdown in a panel beside the passage, searchable, synced and exportable.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/notes"
      title="Notes"
      intro="Add notes to verses, verse ranges or whole chapters. Search, sync and export them."
    >
      <h2>How notes are organised</h2>
      <p>A note can cover:</p>
      <ul>
        <li>
          <strong>A single verse</strong>.
        </li>
        <li>
          <strong>A verse range</strong> — including ranges that cross a chapter boundary.
        </li>
        <li>
          <strong>The whole chapter</strong> — a general note that sits above the verse notes, for
          context or an outline.
        </li>
      </ul>
      <p>
        Your notes are stored in a <Link href="/docs/modules">module</Link>, called My
        Notes. You can make more notes modules, such as one for a class.
      </p>

      <h2>Formatting and links</h2>
      <p>
        Notes use markdown, displayed with headings, lists, quotes, code, links and inline pictures.
        Pictures sync with their notes. Installed notes modules use the same formatting.
      </p>
      <p>
        Scripture references in a note — <code>John 3:16</code>, <code>[Rom 8:28]</code> or a{' '}
        <code>lampbible://</code> link — become links that open the passage. The note’s own heading
        is a link too, showing the verses it covers in context.
      </p>
      <p>
        On export, footnote markers are rewritten into globally unique identifiers so that
        combining several books into one file cannot produce collisions. See{' '}
        <Link href="/docs/import-export">Import &amp; export</Link>.
      </p>

      <h2>Finding notes again</h2>
      <p>
        Note text, including footnote content, is indexed for{' '}
        <Link href="/docs/search">search</Link> alongside everything else. A result links back to
        the passage the note is attached to.
      </p>

      <h2>Import, export and sync</h2>
      <p>
        Export a notes module as markdown or import markdown into any notes module. Exports
        contain text only, without pictures. See <Link href="/docs/import-export">Import &amp; export</Link>{' '}
        for the format.
      </p>
      <p>
        Notes use your chosen sync method. Changes merge note by note; when a conflict needs your
        input, Lamp asks which version to keep. See <Link href="/docs/sync">Sync &amp; backup</Link>.
      </p>

      <Platform only="ios">
        <h2>On iPhone and iPad</h2>

        <h3>Writing them</h3>
        <p>
          Open the <Link href="/docs/reader">tool panel</Link> and switch it to Notes. The panel
          shows the chapter note followed by verse notes in order. It scrolls with the reader, and
          its title menu switches between notes modules.
        </p>
        <p>
          Above the notes, <strong>Highlights in</strong> the chapter lists its{' '}
          <Link href="/docs/highlights">highlights</Link>, each with its colour, verse, theme and
          words; tap one to go to its verse, or <strong>All Highlights</strong> to see them all in
          Search. Notes synced from another device appear without reopening the app.
        </p>
        <ul>
          <li>
            <strong>Tap a note to edit it.</strong> It opens in place, with the cursor where you
            tapped, and saves a moment after you stop typing.
          </li>
          <li>
            <strong>The + menu</strong> adds a <strong>Note on Verse</strong> for the verse you are
            reading, a <strong>Note on Verses…</strong> for a range you choose, or a{' '}
            <strong>Chapter Note</strong>.
          </li>
          <li>
            <strong>Tap a verse number</strong> in the reader and choose Add Note to go straight to
            that verse’s note.
          </li>
          <li>
            <strong>Each note’s menu</strong> offers <strong>Change Verses…</strong> to move or
            widen its range, and <strong>Delete Note</strong>.
          </li>
        </ul>

        <Callout title="Overlapping ranges">
          <p>
            If you add a range that overlaps an existing note, the app tells you which note it
            collides with and offers to edit that note instead of creating a second overlapping
            entry.
          </p>
        </Callout>

        <h3>The editor</h3>
        <p>
          A formatting bar above the keyboard covers bold, italic, bulleted and numbered lists and
          quotes, and markdown typed directly — <code>#</code> for a heading, <code>**</code> for
          bold — is formatted as you type. The photo button in the formatting bar puts a picture in
          the note at the cursor.
        </p>
        <p>
          Footnotes already in a note — from an earlier version, a Mac or an import — are listed
          beneath it, and each can be edited or deleted on its own.
        </p>

        <h3>Exporting and conflicts</h3>
        <p>
          Export a notes module as markdown from its menu in the module manager. If the same note
          changed on two devices, the Notes panel shows a banner offering to resolve it: keep either
          version, or keep both in one note.
        </p>
      </Platform>

      <Platform only="mac">
        <h2>On the Mac</h2>
        <p>
          Notes are written in the study column’s <strong>Notes</strong> tab. Click a verse number,
          choose <strong>Note</strong> in the bar beside selected words, or right-click a verse for{' '}
          <strong>Add Note</strong> or <strong>Edit Note</strong>. A verse with no note shows{' '}
          <strong>Add a Note</strong>. A note begun from selected words starts with them quoted.
        </p>
        <p>
          A note has an optional title and formatted text stored as markdown. Under{' '}
          <strong>Covers</strong>, choose <strong>This verse only</strong> or a range such as
          Verses 29–31 within the chapter. Use <strong>Attach Image</strong> to add a picture,
          which syncs with the note. Press <strong>⌘S</strong> to save; saving an empty note deletes
          it. Your notes show in the margin as an orange note, and notes from an installed notes
          module as a purple book.
        </p>
        <p>
          The <strong>Read</strong> | <strong>Edit</strong> switch at the foot of the tab chooses
          between reading the chapter’s notes as they read, each with a pencil to edit it, and
          editing them, where the chapter’s other notes show their titles and first lines. Lamp
          remembers the choice. In Edit, <strong>Highlights in</strong> the chapter lists its
          highlights with their themes, and <strong>All Highlights</strong> opens them in Search.
        </p>
        <p>
          The <strong>Study Data</strong> menu at the foot of the Notes tab exports a book’s notes
          as JSON or a <code>.lamp</code> module, and imports study data back. Imported notes merge
          with yours, keeping the newer copy of each. When a note changed on two devices, Settings →
          Sync shows it under <strong>Needs Your Decision</strong>.
        </p>
      </Platform>
    </DocPage>
  )
}
