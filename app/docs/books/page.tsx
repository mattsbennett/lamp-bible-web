import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout } from '@/components/docs/DocPage'
import { isMacAvailable } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Books',
  description:
    'Read long-form books in Lamp Bible — studies, expositions and reference works with contents, footnotes, scripture links, images and audio.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/books"
      title="Books"
      intro="Studies, expositions and reference works: long-form books with their own contents, footnotes and live scripture links."
    >
      <h2>What a book is</h2>
      <p>
        A book is a <Link href="/docs/modules">module</Link> like a translation or a commentary,
        but organised the way a book is — front matter, parts, chapters, sections and appendices —
        rather than by verse. Its text can carry headings, quotations, lists, tables, images and
        audio, and its scripture references and Strong’s numbers are links.
      </p>
      <p>
        No books ship with the app. You add the ones you have: a <code>.lamp</code> book module
        someone gave you, or one you built from the{' '}
        <Link href="/docs/modules/authoring">book schema</Link>.
      </p>

      <h2>The library</h2>
      <p>
        <strong>Books</strong> on the home screen lists what is installed, with covers, and
        searches by title, author or tag. A book you have started shows{' '}
        <strong>Continue reading</strong>. To add one, choose <strong>Import Book</strong> and pick
        a <code>.lamp</code> file — or the book’s source JSON, which the app compiles on the
        device. Opening a book file from Files, Mail or AirDrop works too.
      </p>

      <h2>Reading</h2>
      <ul>
        <li>
          <strong>Contents</strong> shows the book’s outline, and searches within the book.
        </li>
        <li>
          Each section can name the passages it is about; tap one to open it in the{' '}
          <Link href="/docs/reader">reader</Link>.
        </li>
        <li>
          Scripture references open the passage, Strong’s numbers open the lexicon, and footnote
          markers open their note.
        </li>
        <li>Images open full screen; audio plays in place, with a seekable waveform.</li>
        <li>Previous and next buttons at the foot of each section step through the book.</li>
        <li>
          <strong>Book Details</strong> shows the publication record, tags and rights statement.
        </li>
        <li>Books written right to left are laid out right to left.</li>
      </ul>
      <p>
        The app remembers the last section you read in each book, on that device.
      </p>

      {isMacAvailable && (
        <Callout title="On a Mac">
          <p>
            The Mac reads books in three panes — contents, text and details — with bookmarks, its
            own text settings, and a reading position that syncs between Macs.
          </p>
        </Callout>
      )}

      <h2>Finding things in books</h2>
      <p>
        Every installed book is in the full-text index. Search across your modules and book
        sections appear alongside commentary and notes; a result opens the book at that section.
        See <Link href="/docs/search">Search</Link>.
      </p>

      <Callout tone="warn" title="Licensing">
        <p>
          Most books are under copyright, and a <code>.lamp</code> file grants no rights of its
          own. Install a book only if you wrote it, it is public domain where you live, or its
          licence permits the copy; share it only with redistribution rights.
        </p>
      </Callout>
    </DocPage>
  )
}
