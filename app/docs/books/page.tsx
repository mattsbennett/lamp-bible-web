import type { Metadata } from 'next'
import Link from 'next/link'
import { Platform } from '@/components/docs/Platform'
import { DocPage, Callout } from '@/components/docs/DocPage'

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
        A book <Link href="/docs/modules">module</Link> has front matter, parts, chapters,
        sections and appendices. It can include headings, quotations, lists, tables, images and
        audio, with links for scripture references and Strong’s numbers.
      </p>
      <p>
        No books ship with the app. You add the ones you have: a <code>.lamp</code> book module
        someone gave you, or one you built from the{' '}
        <Link href="/docs/modules/authoring">book schema</Link>.
      </p>

      <h2>Finding things in books</h2>
      <p>
        Every installed book is in the full-text index. Search across your modules and book
        sections appear alongside commentary and notes; a result opens the book at that section.
        See <Link href="/docs/search">Search</Link>.
      </p>

      <Platform only="ios">
        <h2>On iPhone and iPad</h2>

        <h3>The library</h3>
        <p>
          Open <strong>Books</strong> on the home screen to browse installed books by cover.
          Started books appear under <strong>Continue Reading</strong>. The rest are grouped by
          genre, with uncategorised titles under <strong>Other Books</strong>. Choose{' '}
          <strong>Group By</strong> → <strong>None</strong> for a single shelf, or search by title,
          author or tag. To add a book, choose <strong>Import Book</strong> and select a{' '}
          <code>.lamp</code> file or source JSON, which Lamp compiles on the device. You can also
          open book files from Files, Mail or AirDrop.
        </p>

        <h3>Reading</h3>
        <ul>
          <li>
            <strong>Contents</strong> shows the book’s outline, with your bookmarks above it, and
            searches within the book. <strong>Bookmark Section</strong> in the toolbar marks the
            section you are in.
          </li>
          <li>
            <strong>Text Settings</strong> sets the book’s typeface, text size and line spacing.
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
            The book’s own row at the top of Contents opens its <strong>Details</strong>: the
            publication record, tags and rights statement.
          </li>
          <li>Books written right to left are laid out right to left.</li>
        </ul>
        <p>
          The app remembers the last section you read in each book, on that device.
        </p>
      </Platform>

      <Platform only="mac">
        <h2>On the Mac</h2>
        <p>
          Open <strong>Books</strong> in the sidebar for the shelf, with <strong>Continue Reading</strong>{' '}
          naming the section you left each book in. <strong>Group</strong> in the toolbar changes
          how the shelf is grouped, and <strong>Add Book</strong> installs one. The search field
          matches title, author, editor, publisher, description, edition, ISBN, year, tag or genre,
          with your words free to fall in different fields.
        </p>
        <p>
          Choose a book to read it with its contents beside the page; <strong>All Books</strong>{' '}
          goes back to the shelf. You can search within a book, bookmark sections and set the
          typeface, size and spacing. Bookmarks and your position within a paragraph sync between
          Macs. A book’s menu on the shelf offers <strong>Book Information</strong>, and{' '}
          <strong>Remove Book…</strong> for books you added.
        </p>
        <p>
          <strong>Open in Window</strong> opens the book in a separate window.{' '}
          <strong>Share Section</strong> copies a section link. Use ⌥⌘← and ⌥⌘→ to move between
          sections.
        </p>
      </Platform>

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
