import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Notes',
  description:
    'Verse, verse-range and chapter notes with real footnotes, written in a panel beside the passage and exportable as markdown.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/notes"
      title="Notes"
      intro="Study notes anchored to the text — written where you are reading, and yours to take with you."
    >
      <h2>How notes are organised</h2>
      <p>Notes are verse-keyed. Within a book, a note attaches to one of three things:</p>
      <ul>
        <li>
          <strong>A single verse</strong> — the common case.
        </li>
        <li>
          <strong>A verse range</strong> — including ranges that cross a chapter boundary.
        </li>
        <li>
          <strong>A whole chapter</strong> — a general note that sits above the verse notes, for
          context or an outline.
        </li>
      </ul>
      <p>
        Notes for a book are stored together as a notes module, one module per book. That is what
        makes a book’s notes exportable as a single markdown file.
      </p>

      <h2>Writing them</h2>
      <p>
        Open the <Link href="/docs/reader">tool panel</Link> and switch it to Notes. The panel shows
        every note for the current chapter in verse order, and — because its scroll is linked to the
        reader — keeps pace with the passage as you move through it.
      </p>
      <p>
        Verses with no note yet are offered as gaps you can fill: the panel suggests “add note for
        verse 7” at the right position, so you write in sequence rather than hunting for a button.
        Notes save as you write.
      </p>

      <Callout title="Overlapping ranges">
        <p>
          If you create a note whose range overlaps an existing one, the app tells you which note it
          collides with and offers to edit that note instead of creating a second overlapping entry.
        </p>
      </Callout>

      <h2>Footnotes</h2>
      <p>
        Notes support real footnotes, not just inline parentheses. While writing you can create a
        new footnote, or insert a reference to a footnote that already exists in the same note — so
        one long citation can be cited from several places. Footnotes are numbered per note and are
        editable and deletable on their own.
      </p>
      <p>
        On export, local footnote numbers are rewritten into globally unique identifiers so that
        combining several books into one file cannot produce collisions. See{' '}
        <Link href="/docs/import-export">Import &amp; export</Link>.
      </p>

      <h2>Finding notes again</h2>
      <p>
        Note text, including footnote content, is indexed for{' '}
        <Link href="/docs/search">search</Link> alongside everything else. A result links back to
        the passage the note is attached to.
      </p>

      <h2>Getting notes in and out</h2>
      <p>
        Notes round-trip through markdown with YAML frontmatter — one file per book, or a single
        combined file for everything. Images and recorded audio referenced by a note travel in a{' '}
        <code>media/</code> folder beside the markdown. The format is documented in full on the{' '}
        <Link href="/docs/import-export">Import &amp; export</Link> page.
      </p>
      <p>
        This is the deliberate escape hatch: your notes are ordinary markdown files, readable in any
        text editor, whether or not you keep using this app.
      </p>

      <h2>Sync</h2>
      <p>
        Notes are one of the editable module types, so they are covered by whichever sync method you
        chose. Because they can be edited on more than one device, they are also subject to conflict
        resolution — if the same note changed in two places, the app presents both versions and asks
        which to keep. See <Link href="/docs/sync">Sync &amp; backup</Link>.
      </p>
    </DocPage>
  )
}
