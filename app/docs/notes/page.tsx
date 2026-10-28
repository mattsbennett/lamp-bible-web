import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout } from '@/components/docs/DocPage'
import { isMacAvailable } from '@/lib/site'

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
      intro="Study notes anchored to the text — written where you are reading, and yours to take with you."
    >
      <h2>How notes are organised</h2>
      <p>Notes are verse-keyed. Within a chapter, a note attaches to one of three things:</p>
      <ul>
        <li>
          <strong>A single verse</strong> — the common case.
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
        Your notes live together in one notes <Link href="/docs/modules">module</Link>, called My
        Notes. You can create more notes modules in the module manager — one for a class you teach,
        say — and switch between them from the Notes panel’s title menu.
      </p>

      <h2>Writing them</h2>
      <p>
        Open the <Link href="/docs/reader">tool panel</Link> and switch it to Notes. The panel
        shows the chapter note and then every verse note in order, and — because its scroll is
        linked to the reader — keeps pace with the passage as you move through it.
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
          <strong>Each note’s menu</strong> offers <strong>Change Verses…</strong> to move or widen
          its range, and <strong>Delete Note</strong>.
        </li>
      </ul>

      {isMacAvailable && (
        <p>
          On the Mac, notes are written in the Notes tab of the study column: click a verse number
          to open its note. See <Link href="/docs/mac">The Mac app</Link>.
        </p>
      )}

      <Callout title="Overlapping ranges">
        <p>
          If you add a range that overlaps an existing note, the app tells you which note it
          collides with and offers to edit that note instead of creating a second overlapping entry.
        </p>
      </Callout>

      <h3>Formatting</h3>
      <p>
        Notes are markdown. A formatting bar above the keyboard covers bold, italic, bulleted and
        numbered lists and quotes, and markdown typed directly — <code>#</code> for a heading,{' '}
        <code>**</code> for bold — is formatted as you type. Outside the editor a note is shown
        formatted, with headings, nested lists, quotes, code and links.
      </p>
      <p>
        Scripture references in a note — <code>John 3:16</code>, <code>[Rom 8:28]</code> or a{' '}
        <code>lampbible://</code> link — become links that open the passage. The note’s own heading
        is a link too, showing the verses it covers in context.
      </p>

      <h3>Footnotes</h3>
      <p>
        Footnotes already in a note — from an earlier version, a Mac or an import — are listed
        beneath it, and each can be edited or deleted on its own. On export, footnote markers are
        rewritten into globally unique identifiers so that combining several books into one file
        cannot produce collisions. See <Link href="/docs/import-export">Import &amp; export</Link>.
      </p>

      <h2>Finding notes again</h2>
      <p>
        Note text, including footnote content, is indexed for{' '}
        <Link href="/docs/search">search</Link> alongside everything else. A result links back to
        the passage the note is attached to.
      </p>

      <h2>Getting notes in and out</h2>
      <p>
        Notes round-trip through markdown: export a whole notes module from the module manager, and
        import a markdown file of notes into any notes module. The format is documented in full on
        the <Link href="/docs/import-export">Import &amp; export</Link> page.
      </p>
      <p>
        This is the deliberate escape hatch: your notes are ordinary markdown files, readable in any
        text editor, whether or not you keep using this app.
      </p>

      <h2>Sync</h2>
      <p>
        Notes are covered by whichever sync method you chose. Edits merge note by note, so working
        on different notes on two devices never collides. If the very same note changed on both,
        the Notes panel shows a banner offering to resolve it: keep either version, or keep both in
        one note. See <Link href="/docs/sync">Sync &amp; backup</Link>.
      </p>
    </DocPage>
  )
}
