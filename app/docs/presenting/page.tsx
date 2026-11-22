import type { Metadata } from 'next'
import Link from 'next/link'
import { Platform } from '@/components/docs/Platform'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Slides & presenting',
  description:
    'Create slides in Slide Studio on Mac, export PDFs and present with an iPhone or iPad remote and speaker notes.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/presenting"
      title="Slides & presenting"
      intro="Create slides on the Mac, then present with your iPhone as a remote."
    >
      <p>
        Create and present decks in Slide Studio on the Mac. Use an iPhone or iPad as a remote
        with speaker notes, or view synced decks on either device.
      </p>

      <Platform only="mac">
        <h2>Slide Studio</h2>
        <p>
          Decks are made in <strong>Slide Studio</strong> on the Mac. Build one from a piece of
          writing with <strong>Build Presentation Deck</strong> in the editor’s toolbar or the Writing
          list, or start with <strong>New Presentation Deck</strong> in the File menu. A deck you
          built from a writing stays linked to it.
        </p>
        <p>
          <strong>Presentations</strong> in the sidebar shows every deck as covers or a list. Filter
          by <strong>All</strong>, <strong>From Writing</strong> or <strong>Standalone</strong>,
          search with <strong>Find a deck</strong>, sort by recent change or title, or start one with{' '}
          <strong>New Deck</strong>. A deck’s menu offers <strong>Open in Slide Studio</strong> and,
          for one built from a writing, <strong>Show Writing</strong>.
        </p>
        <p>
          Use the slide list to reorder, duplicate, hide or delete slides. The inspector has two panes:{' '}
          <strong>Slide</strong> contains layout previews, content and <strong>Skip while presenting</strong>;{' '}
          <strong>Deck</strong> sets the title, aspect ratio (16:9 or 4:3), typeface and theme.{' '}
          <strong>Lamp Dark</strong> and <strong>Parchment</strong> preview your first slide.
        </p>
        <p>
          Decks save automatically. <strong>Undo Edit</strong> and <strong>Redo Edit</strong> group
          typing into changes. If a deck cannot be saved, for example while its title is empty,
          Lamp keeps a local draft and restores it when reopened. The <strong>Deck</strong> menu
          also lets you save, import, export and delete decks.
        </p>

        <h3>Layouts and content</h3>
        <Table>
          <thead>
            <tr>
              <th>Layout</th>
              <th>For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Title, Closing</td>
              <td>Opening and closing slides, optionally with passages under the heading</td>
            </tr>
            <tr>
              <td>Title &amp; Body</td>
              <td>A heading with text, bullets or a numbered list</td>
            </tr>
            <tr>
              <td>Scripture</td>
              <td>A passage with its citation</td>
            </tr>
            <tr>
              <td>Quotation</td>
              <td>A quotation from another source, with its citation</td>
            </tr>
            <tr>
              <td>Two Columns</td>
              <td>Two passages or lists to compare, each column with its own heading</td>
            </tr>
            <tr>
              <td>Image</td>
              <td>A picture beside the text, or behind the whole slide</td>
            </tr>
            <tr>
              <td>Blank</td>
              <td>Anything else</td>
            </tr>
          </tbody>
        </Table>
        <p>
          <strong>Choose Scripture</strong> inserts a passage and citation from an installed
          translation. Slides display typographic quotation marks and ellipses while preserving your
          source text. Background images are blurred and tinted behind text for legibility. You can
          add accessibility descriptions to images.
        </p>
        <p>
          To chart a Strong’s number, enter the number and translation. Optionally limit the books
          (such as <code>NT</code> or <code>Matthew-John</code>), rendering, form or grammatical value.
          Group counts by book, section, rendering, form, grammar, translation or associated word.
          Choose bars, columns in Bible order, a chapter grid, proportions, or a headword card above
          book columns. A chart by translation compares every tagged translation; turn on{' '}
          <strong>Include the Hebrew and Greek Texts</strong> in its translation menu to add them.
        </p>
        <p>
          Charts use the same library data as <Link href="/docs/search#analysis">word analysis</Link>{' '}
          and match the slide’s colours. A key marks statistically unusual book frequencies, and a
          caption identifies tags added during module creation. To reuse an analysis figure,
          choose <strong>Add to Deck</strong>: at the end of the tab row for Spread, Compare and
          Companions, or beside the figure in Overview and the Septuagint tab, whose Testaments chart
          counts verses rather than occurrences.
        </p>
        <p>
          Slide Studio checks decks as you edit. Errors prevent saving, exporting and playback.
          Warnings flag low contrast, crowded slides, missing image descriptions and content hidden
          by the layout, but do not block these actions.
        </p>

        <h3>Speaker notes from your manuscript</h3>
        <p>
          Enter <strong>Presenter Notes</strong> for each slide, or enable <strong>Follow the writing</strong>.
          For linked notes, set each slide’s <strong>Begins at</strong> phrase. Lamp divides the manuscript
          at those phrases and updates the notes as you edit. A warning appears if a phrase is removed.
        </p>

        <Callout title="Let an agent draft it">
          <p>
            A writing’s <Link href="/docs/ai">agent workspace</Link> includes a skill that builds a
            deck from the writing, checks it and imports it into Slide Studio, ready to edit.
          </p>
        </Callout>

        <h2>Presenting on the Mac</h2>
        <p>
          <strong>Play</strong> presents the deck full screen — on a second display, if one is
          connected. Hidden slides are skipped.
        </p>
        <Table>
          <thead>
            <tr>
              <th>To</th>
              <th>Press</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Go forward</td>
              <td>→, ↓, Page Down, Space, Return, or click</td>
            </tr>
            <tr>
              <td>Go back</td>
              <td>←, ↑, Page Up, ⇧Space or Delete</td>
            </tr>
            <tr>
              <td>First / last slide</td>
              <td>Home / End</td>
            </tr>
            <tr>
              <td>Black the screen</td>
              <td>B or .</td>
            </tr>
            <tr>
              <td>Stop</td>
              <td>Esc</td>
            </tr>
          </tbody>
        </Table>
        <p>
          The pointer hides itself when it sits still. The Mac shows the audience only the slide;
          your notes, the next slide and the time are on the remote.
        </p>
      </Platform>

      <Platform only="ios">
        <h2>The iPhone and iPad remote</h2>
        <p>
          Lamp Bible on an iPhone or iPad can run the presentation, with your speaker notes in front of
          you.
        </p>
        <ol>
          <li>
            On the Mac, choose <strong>Remote</strong> in Slide Studio’s toolbar. It shows a QR code and a
            sixteen-letter code.
          </li>
          <li>
            On the phone, open <strong>Decks</strong> on the home screen and tap the remote button in
            its toolbar. The Mac appears under{' '}
            <strong>Nearby</strong>; choose it, then <strong>Scan QR Code</strong> or type the code.
          </li>
          <li>
            From then on, the phone reconnects to that Mac without pairing again. Either side can
            forget the other.
          </li>
        </ol>
        <p>
          The remote shows the current slide, next slide when space allows, presenter notes with
          adjustable text size, slide number and elapsed time. Tap the slide or <strong>Next</strong>{' '}
          to advance. Use <strong>Previous</strong> or <strong>Choose slide</strong> to navigate, or
          black out the audience screen. Images appear as placeholders on the remote.
        </p>

        <Callout title="Same network, encrypted">
          <p>
            The phone and the Mac must be on the same local network, or near enough for peer-to-peer
            discovery. Both apps ask for permission to use the local network. The connection is
            encrypted with a key that comes from pairing, and nothing passes through the internet.
            Pair before the projector is on: anyone who sees the code can pair with that Mac.
          </p>
        </Callout>
      </Platform>

      <h2>Sharing and printing decks</h2>
      <p>
        Decks sync to your other devices, and are edited only on the Mac. Deleting a writing deletes
        the decks built from it, on every device; the Mac names them before it does.
      </p>

      <Platform only="mac">
        <ul>
          <li>
            <strong>Export PDF</strong> in the Deck menu makes a PDF of the slides, one per page
            (<strong>Slides Only…</strong>), or of each slide above its speaker notes for printing
            (<strong>Slides with Speaker Notes…</strong>). Hidden slides are left out, and the
            pages are numbered as the slides are presented.
          </li>
          <li>
            <strong>Export Deck…</strong> saves a <code>.lampdeck</code> file, which another Mac can
            open in Slide Studio with <strong>Import Deck…</strong>. Pictures are not included in
            the file.
          </li>
        </ul>
      </Platform>

      <Platform only="ios">
        <p>
          Open <strong>Decks</strong> on the home screen or <strong>Slide Decks</strong> in the Write
          library’s menu, or tap a document’s <strong>Slides</strong> button. Search decks and the
          writings they came from, filter by <strong>From Writing</strong> or{' '}
          <strong>Standalone</strong>, and sort by recent change or title. Decks display full screen, in landscape on iPhone, with
          presenter notes and a slide list for navigation. Hidden slides are skipped.
        </p>
      </Platform>
    </DocPage>
  )
}
