import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'
import { isMacAvailable } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Devotionals',
  description:
    'Long-form writing in Lamp Bible: a visual and markdown editor with scripture quotes, footnotes, tables, images and recorded audio, plus present mode, sharing and markdown export.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/devotionals"
      title="Devotionals"
      intro="For writing that is not tied to a single verse — devotionals, exhortations, studies, reflections and prayers."
    >
      <h2>Devotionals versus notes</h2>
      <p>
        <Link href="/docs/notes">Notes</Link> are verse-keyed: they hang off a passage. A devotional
        is a standalone document. It may cite scripture heavily, and those citations are live links,
        but the document is organised by its own argument rather than by chapter and verse.
        Devotionals live behind the <strong>Write</strong> button on the home screen.
        {isMacAvailable && (
          <>
            {' '}On the Mac they are called <strong>Writing</strong>, and the editor adds find and
            replace, revision history and an AI agent — see{' '}
            <Link href="/docs/mac">The Mac app</Link>.
          </>
        )}
      </p>

      <h2>The library</h2>
      <p>
        The library lists every devotional in a collection, searchable by title, subtitle and tag,
        and sortable by date, title or last change. Its menu filters by tag, category and date,
        exports, and imports a devotional someone sent you. A collection is a{' '}
        <Link href="/docs/modules">module</Link>: you start with My Devotionals, and can create
        more in the module manager and switch between them from the library’s title.
      </p>

      <h2>The editor</h2>
      <p>A devotional has five modes, chosen from the menu in its bottom toolbar:</p>
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
        What you write is stored as the markdown you wrote, so switching between the visual and
        markdown editors never rewrites your text. Edits save a few seconds after you stop typing,
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
            <td>Horizontal rule</td>
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

      <h3>Inserting scripture</h3>
      <p>
        Rather than typing a reference and hoping you got it right, <strong>Scripture Quote</strong>{' '}
        lets you pick translation, book, chapter, and start and end verse, choose whether to keep
        the verse numbers, and preview the text before inserting it with its citation. For a
        reference in running text, add a scripture <strong>Link</strong>: in Read and Present modes
        it opens the passage in a preview.
      </p>

      <h3>Footnotes</h3>
      <p>
        <strong>Footnote</strong> adds a marker at the cursor and its note in one step, so a single
        Undo removes both. While editing, tap a marker to jump to its note, and tap the note’s
        number to return. Notes can run to several lines and carry bold, italic and links.
      </p>
      <p>
        Footnotes are numbered 1, 2, 3 in the order they are first referred to, wherever they were
        written. In the markdown a marker can have any label — <code>[^1]</code>,{' '}
        <code>[^lewis]</code>, <code>[^2a]</code> — and the label you chose is kept; only the
        numbering shown to a reader is worked out. A marker used twice shares one note.
      </p>

      <h3>Images and audio</h3>
      <p>
        Images are kept at full resolution; tap one to view it full screen. To record, choose{' '}
        <strong>Record Audio</strong> — a spoken meditation, or the talk as delivered — with a
        timer and a live waveform while you record. Recordings are AAC; imported audio can be M4A,
        MP3, WAV or AAC. Tap an audio block to play or pause it.
      </p>

      <h2>Metadata</h2>
      <p>Each devotional carries fields that make a growing collection navigable:</p>
      <ul>
        <li>
          <strong>Title and subtitle</strong>, and an author name.
        </li>
        <li>
          <strong>Date</strong> — the date you assign it, not just when the file was written.
        </li>
        <li>
          <strong>Category</strong> — devotional, exhortation, reflection, study, prayer or other.
        </li>
        <li>
          <strong>Tags</strong>, which become filters in the library and in{' '}
          <Link href="/docs/search">search</Link>.
        </li>
        <li>
          <strong>Series</strong> and <strong>key scriptures</strong> — the passages the piece is
          built on, stored as real verse references and shown at the top. These come from a markdown
          or file import{isMacAvailable && ', or from the Mac, which edits them'}.
        </li>
      </ul>

      <h2>Present mode</h2>
      <p>
        Present mode reformats a devotional for delivery from a lectern: text scaled up by a
        multiplier you set, with extra line spacing so you can find your place while looking up,
        and footnotes and links set aside. Text size for reading and presenting is set independently
        of the Bible reader’s.
      </p>
      {isMacAvailable && (
        <Callout title="Slides">
          <p>
            A devotional turned into a slide deck in Slide Studio on a Mac shows a{' '}
            <strong>Slides</strong> button once the deck has synced, and its deck opens on iPhone and
            iPad to view. See <Link href="/docs/presenting">Slides &amp; presenting</Link>.
          </p>
        </Callout>
      )}

      <h2>Sharing</h2>
      <p>
        <strong>Share Devotional File</strong> sends a devotional through the system share sheet as
        a <code>.lamp</code> file. There are two forms, chosen automatically:
      </p>
      <ul>
        <li>
          <strong>Plain</strong> — a single JSON document, for devotionals with no media.
        </li>
        <li>
          <strong>Bundled</strong> — a ZIP package carrying the document and its images and audio
          together, so nothing breaks in transit.
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
          Collections export to markdown, one file per devotional or a single combined file, with
          media in an accompanying folder. See{' '}
          <Link href="/docs/import-export">Import &amp; export</Link>.
        </p>
      </Callout>

      <h2>Reading them beside the text</h2>
      <p>
        The reader’s tool panel has a Devotionals mode, so a piece you wrote — or one someone shared
        with you — can sit alongside the passage it discusses.
      </p>
    </DocPage>
  )
}
