import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Long-form writing in Lamp Bible: a visual and markdown editor with scripture quotes, footnotes, tables, images and recorded audio, plus present mode, sharing and markdown export.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/writing"
      title="Writing"
      intro="Write devotionals, studies, prayers and talks with scripture links, footnotes and media."
    >
      <h2>Writing versus notes</h2>
      <p>
        <Link href="/docs/notes">Notes</Link> attach to verses or chapters. Writing is for standalone
        documents with linked scripture references. Open <strong>Write</strong> on the home screen.
        The Mac editor also has find and replace, revision history and an optional AI agent.
        See <Link href="/docs/mac">The Mac app</Link>.
      </p>

      <h2>The library</h2>
      <p>
        The library lists every piece in a collection, searchable by title, subtitle and tag, and
        sortable by date, title or last change. Its menu filters by tag, category and date, exports,
        and imports a piece someone sent you with <strong>Import Writing</strong>. A collection is
        a <Link href="/docs/modules">module</Link>: you start with My Writing, and can create more
        in the module manager and switch between them from the library’s title.
      </p>

      <h2>The editor</h2>
      <p>
        A piece has five modes, chosen from the button at the bottom of the screen, which
        shows the mode you are in:
      </p>
      <Table>
        <thead>
          <tr>
            <th>Mode</th>
            <th>For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Read</td>
            <td>Reading it back, with its own text size</td>
          </tr>
          <tr>
            <td>Visual Edit</td>
            <td>Writing with a formatting toolbar</td>
          </tr>
          <tr>
            <td>Markdown Edit</td>
            <td>Typing the markdown directly</td>
          </tr>
          <tr>
            <td>Present</td>
            <td>Delivering it — see below</td>
          </tr>
          <tr>
            <td>Edit Metadata</td>
            <td>Title, author, date, category and tags</td>
          </tr>
        </tbody>
      </Table>
      <p>
        The editor stores your original markdown and preserves it when you switch editing modes. Edits save a few seconds after you stop typing,
        and an icon in the toolbar shows when they have synced.
      </p>

      <h3>What the visual editor offers</h3>
      <Table>
        <thead>
          <tr>
            <th>Element</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Paragraphs and headings</td>
            <td>Three heading levels, for structuring a talk</td>
          </tr>
          <tr>
            <td>Bold and italic</td>
            <td>Strikethrough and inline code by markdown shortcut</td>
          </tr>
          <tr>
            <td>Lists</td>
            <td>Bulleted or numbered, with indent and outdent for nesting</td>
          </tr>
          <tr>
            <td>Scripture quote</td>
            <td>A passage from a chosen translation, with its citation</td>
          </tr>
          <tr>
            <td>Regular quote</td>
            <td>An ordinary blockquote for other sources</td>
          </tr>
          <tr>
            <td>Divider</td>
            <td>A break between sections</td>
          </tr>
          <tr>
            <td>Table</td>
            <td>Up to ten rows and six columns, with an optional header row</td>
          </tr>
          <tr>
            <td>Link</td>
            <td>A web address, a scripture reference, or a Strong’s number</td>
          </tr>
          <tr>
            <td>Footnote</td>
            <td>Inserted at the cursor — see below</td>
          </tr>
          <tr>
            <td>Image</td>
            <td>From your photo library, the camera, or Files</td>
          </tr>
          <tr>
            <td>Audio</td>
            <td>Recorded in the app, or imported from Files</td>
          </tr>
        </tbody>
      </Table>
      <p>
        The formatting bar keeps them in groups: text style, with the heading levels and indenting;
        bold and italic; the two kinds of list; quotes; links; and the <strong>+</strong> menu for
        everything placed in the text — footnotes, dividers, tables, images and audio.
      </p>

      <h3>Inserting scripture</h3>
      <p>
        Choose <strong>Scripture Quote</strong>, then select a translation, book, chapter and
        verse range. Choose whether to include verse numbers and preview the quotation before
        inserting it with its citation. To cite a passage without quoting it, insert a scripture
        <strong>Link</strong>. In Read and Present modes, the link opens a passage preview.
      </p>

      <h3>Footnotes</h3>
      <p>
        <strong>Footnote…</strong> adds a marker at the cursor and its note in one step, so a single
        Undo removes both. While editing, tap a marker to jump to its note, and tap the note’s
        number to return. Notes can run to several lines and carry bold, italic and links.
      </p>
      <p>
        Footnotes are numbered in order of first reference. Markdown labels such as{' '}
        <code>[^1]</code>, <code>[^lewis]</code> and <code>[^2a]</code> are preserved; only the
        displayed numbers change. Repeated markers link to the same note.
      </p>

      <h3>Images and audio</h3>
      <p>
        Images are kept at full resolution; tap one to view it full screen. To record, choose{' '}
        <strong>Record Audio</strong> — a spoken meditation, or the talk as delivered — with a
        timer and a live waveform while you record. Recordings are AAC; imported audio can be M4A,
        MP3, WAV or AAC. Tap an audio block to play or pause it.
      </p>

      <h2>Metadata</h2>
      <p>Use these fields to organise and find your writing:</p>
      <ul>
        <li>
          <strong>Title and subtitle</strong>, and an author name.
        </li>
        <li>
          <strong>Date</strong> — the date you assign it, not just when the file was written.
        </li>
        <li>
          <strong>Category</strong> — one to a piece. Choose Devotional, Exhortation, Reflection,
          Study or Prayer, or one you have used before, or name your own — on iPhone and iPad with{' '}
          <strong>Custom…</strong> at the end of the list.
        </li>
        <li>
          <strong>Tags</strong>, which become filters in the library and in{' '}
          <Link href="/docs/search">search</Link>.
        </li>
        <li>
          <strong>Series</strong> and <strong>key scriptures</strong> — the passages the piece is
          built on, stored as real verse references and shown at the top. These come from a markdown
          or file import, or from the Mac, which edits them.
        </li>
      </ul>

      <h2>Present mode</h2>
      <p>
        Present mode reformats a piece for delivery from a lectern: text scaled up by a
        multiplier you set, with extra line spacing so you can find your place while looking up,
        and footnotes and links set aside. Text size for reading and presenting is set independently
        of the Bible reader’s.
      </p>
      <Callout title="Slides">
        <p>
          A piece turned into a slide deck in Slide Studio on a Mac shows a{' '}
          <strong>Slides</strong> button once the deck has synced, and its deck opens on iPhone and
          iPad to view. See <Link href="/docs/presenting">Slides &amp; presenting</Link>.
        </p>
      </Callout>

      <h2>Sharing</h2>
      <p>
        <strong>Share Writing File</strong> sends a piece through the system share sheet as
        a <code>.lamp</code> file. There are two forms, chosen automatically:
      </p>
      <ul>
        <li>
          <strong>Plain</strong> — a single JSON document, for a piece with no media.
        </li>
        <li>
          <strong>Bundled</strong> — a ZIP package carrying the document and its images and audio
          together.
        </li>
      </ul>
      <p>
        <strong>Share as Markdown</strong> sends the text alone. Because <code>.lamp</code> is a
        registered document type, a file someone sends you opens in Lamp Bible directly. Before
        anything is imported you get a preview of what the file contains and choose which
        collection it goes into; importing a file holding a whole collection brings in every entry
        rather than just the first.
      </p>

      <Callout title="Also plain markdown">
        <p>
          Collections export to markdown, one file per piece or a single combined file, with
          media in an accompanying folder. See{' '}
          <Link href="/docs/import-export">Import &amp; export</Link>.
        </p>
      </Callout>

      <h2>Reading them beside the text</h2>
      <p>
        The reader’s tool panel lists your writing collections by name, My Writing first, so a
        piece you wrote — or one someone shared with you — can sit alongside the passage it
        discusses.
      </p>
    </DocPage>
  )
}
