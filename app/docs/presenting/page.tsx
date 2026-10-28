import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'
import { isMacAvailable } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Slides & presenting',
  description:
    'Build slide decks from your writing in Slide Studio on the Mac, present them full screen, export PDFs, and drive them from an iPhone or iPad remote with your speaker notes.',
}

export default function Page() {
  if (!isMacAvailable) notFound()

  return (
    <DocPage
      href="/docs/presenting"
      title="Slides & presenting"
      intro="Build a deck from a talk you have written, present it on the Mac, and run it from the phone in your hand with your notes on it."
    >
      <h2>Slide Studio</h2>
      <p>
        Decks are made in <strong>Slide Studio</strong> on the Mac. Build one from a piece of
        writing with <strong>Build Presentation Deck</strong> in the editor’s toolbar or the Writing
        list, or start with <strong>New Presentation Deck</strong> in the File menu. A deck you
        built from a writing stays linked to it.
      </p>
      <p>
        The slide list down the side reorders, duplicates, hides and deletes slides. The inspector
        sets the deck’s aspect ratio (16:9 or 4:3), theme — <strong>Lamp Dark</strong> or{' '}
        <strong>Parchment</strong> — and typeface, and each slide’s layout and content. Decks save
        themselves as you work; the <strong>Undo Edit</strong> and <strong>Redo Edit</strong>{' '}
        toolbar buttons take back a change, a burst of typing at a time. A deck that can’t be saved
        yet — a title cleared to retype it, say — is kept as a draft on the Mac, and comes back when
        you reopen it.
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
        <strong>Choose Scripture</strong> inserts a passage from any installed translation together
        with its citation. Quotation marks and ellipses are set typographically on the slide while
        your text is kept as typed. Words over a background picture are kept legible by blurring
        and tinting behind them, and images take an accessibility description.
      </p>
      <p>
        Slide Studio checks a deck as you go. Errors stop it saving, exporting or playing until
        they are fixed; warnings — low contrast, a crowded slide, a picture without a description,
        content a layout will not show — are listed but do not.
      </p>

      <h3>Speaker notes from your manuscript</h3>
      <p>
        Each slide has <strong>Presenter Notes</strong>. Write them freely, or turn on{' '}
        <strong>Follow the writing</strong> and give each slide the phrase where its part of the
        talk <strong>Begins at</strong>: the linked writing is then split across the slides as your
        notes, and stays in step as you keep editing it. If you change the writing so that a phrase
        is no longer there, the slide says so.
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

      <h2>The iPhone and iPad remote</h2>
      <p>
        Lamp Bible on an iPhone or iPad can run the presentation, with your speaker notes in front of
        you.
      </p>
      <ol>
        <li>
          On the Mac, choose <strong>Pair Remote</strong> in Slide Studio. It shows a QR code and a
          sixteen-letter code.
        </li>
        <li>
          On the phone, tap the remote button at the top of the home screen. The Mac appears under{' '}
          <strong>Nearby</strong>; choose it, then <strong>Scan QR Code</strong> or type the code.
        </li>
        <li>
          From then on, the phone reconnects to that Mac without pairing again. Either side can
          forget the other.
        </li>
      </ol>
      <p>
        The remote shows the current slide and, when there is room, the next one; your presenter
        notes, at a size you choose; the slide number and the time since you started. Tap the slide
        or <strong>Next</strong> to move on, use <strong>Previous</strong> or{' '}
        <strong>Choose slide</strong> to go anywhere, and black the audience screen from the phone.
        Pictures show as placeholders on the remote.
      </p>

      <Callout title="Same network, encrypted">
        <p>
          The phone and the Mac must be on the same local network, or near enough for peer-to-peer
          discovery. Both apps ask for permission to use the local network. The connection is
          encrypted with a key that comes from pairing, and nothing passes through the internet.
          Pair before the projector is on: anyone who sees the code can pair with that Mac.
        </p>
      </Callout>

      <h2>Sharing and printing decks</h2>
      <ul>
        <li>
          <strong>Export PDF</strong> makes a PDF of the slides, one per page, or of each slide above
          its speaker notes for printing. Hidden slides are left out, and the pages are numbered as
          the slides are presented.
        </li>
        <li>
          <strong>Export Deck</strong> saves a <code>.lampdeck</code> file, which another Mac can
          open in Slide Studio. Pictures are not included in the file.
        </li>
        <li>
          Decks sync to your other devices. On iPhone and iPad they appear under{' '}
          <strong>Slide Decks</strong> in the Write library’s menu, and a writing with a deck shows a{' '}
          <strong>Slides</strong> button, for viewing the slides and their notes. Decks are edited
          only on the Mac.
        </li>
      </ul>
    </DocPage>
  )
}
