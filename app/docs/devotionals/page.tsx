import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Devotionals',
  description:
    'Long-form writing in Lamp Bible: a block editor with images, recorded audio and linked scripture, plus present mode, sharing and markdown export.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/devotionals"
      title="Devotionals"
      intro="For writing that is not tied to a single verse — devotionals, sermons, talks, reflections and prayers."
    >
      <h2>Devotionals versus notes</h2>
      <p>
        <Link href="/docs/notes">Notes</Link> are verse-keyed: they hang off a passage. A devotional
        is a standalone document. It may cite scripture heavily, and those citations are live links,
        but the document is organised by its own argument rather than by chapter and verse. They
        live in the <strong>Write</strong> tab.
      </p>

      <h2>The editor</h2>
      <p>
        Devotionals are written in a rich editor with two modes you can switch between at any time:
        a visual editor, and direct markdown editing for when you would rather type the syntax
        yourself.
      </p>

      <h3>Content blocks</h3>
      <Table>
        <thead>
          <tr>
            <th>Block</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Paragraph</td>
            <td>Body text, with inline annotations</td>
          </tr>
          <tr>
            <td>Heading</td>
            <td>Three levels, for structuring a talk</td>
          </tr>
          <tr>
            <td>Scripture quote</td>
            <td>A quotation pulled from a chosen translation, book, chapter and verse range</td>
          </tr>
          <tr>
            <td>Regular quote</td>
            <td>An ordinary blockquote for other sources</td>
          </tr>
          <tr>
            <td>Lists</td>
            <td>Bulleted or numbered, with nesting</td>
          </tr>
          <tr>
            <td>Image</td>
            <td>From your photo library, with a caption</td>
          </tr>
          <tr>
            <td>Audio</td>
            <td>Recorded in the app or imported, shown with a waveform and player</td>
          </tr>
        </tbody>
      </Table>

      <h3>Inserting scripture</h3>
      <p>
        Rather than typing a reference and hoping you got it right, the scripture quote inserter
        lets you pick translation, book, chapter, and start and end verse, then preview the text
        before inserting it. The inserted quote keeps a structured reference, so it remains a link
        back to the passage.
      </p>
      <p>
        Text can also carry inline annotations: scripture references, Strong’s numbers, Greek and
        Hebrew words, external links and emphasis.
      </p>

      <h3>Audio</h3>
      <p>
        You can record audio directly into a devotional — a spoken meditation, or a recording of the
        talk as delivered — with a live waveform while recording and a scrubbable player on
        playback. Existing audio files can be imported instead.
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
          <strong>Category</strong> — devotional, sermon, reflection, study, prayer, testimony or
          other.
        </li>
        <li>
          <strong>Tags</strong>, which become filters in <Link href="/docs/search">search</Link>.
        </li>
        <li>
          <strong>Series</strong> — a name and position, for a sequence of talks.
        </li>
        <li>
          <strong>Key scriptures</strong> — the passages the piece is built on, stored as real verse
          references.
        </li>
      </ul>

      <h2>Present mode</h2>
      <p>
        Present mode reformats a devotional for delivery: text scaled up by a configurable
        multiplier, with extra line spacing so you can find your place while looking up. Text size
        and spacing for both reading and presenting are set independently of the Bible reader’s.
      </p>

      <h2>Sharing</h2>
      <p>
        A devotional can be shared through the system share sheet as a <code>.lamp</code> file.
        There are two forms, chosen automatically:
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
        Because <code>.lamp</code> is a registered document type, a file someone sends you opens in
        Lamp Bible directly. Before anything is imported you get a preview of what the file
        contains, and importing a file holding a whole collection brings in every entry rather than
        just the first.
      </p>

      <Callout title="Also plain markdown">
        <p>
          Devotionals export to markdown with YAML frontmatter as well, individually or all at once,
          with media in an accompanying folder. See{' '}
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
