import type { Metadata } from 'next'
import Link from 'next/link'
import { Platform } from '@/components/docs/Platform'
import { DocPage, Callout, Figure, Table } from '@/components/docs/DocPage'
import { SlideFiguresArt, SlideStudioMapArt, SlideStudioThemesArt } from '@/components/home/art'

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
          <strong>Slide</strong> contains layout previews, the slide’s form,{' '}
          <strong>Skip while presenting</strong>, how it is revealed, its background and its content;{' '}
          <strong>Deck</strong> sets the title, aspect ratio (16:9 or 4:3), transition, theme and
          typefaces.
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
              <td>
                Opening and closing slides, optionally with passages under the heading. As a{' '}
                <strong>Statement</strong>, the heading is as large as the slide allows; as a{' '}
                <strong>Word</strong>, a Hebrew or Greek word is set large over its transliteration
                and gloss
              </td>
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
              <td>Columns</td>
              <td>
                Up to four passages or lists to compare, each with its own heading.{' '}
                <strong>Mark where the columns differ</strong> draws the words one column has and
                the others lack in the accent
              </td>
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
          source text. Background images are blurred and tinted behind text for legibility; click a
          background picture’s subject to set its <strong>Focus</strong>, which the crop keeps in
          view, or <strong>Centre</strong> to reset it. <strong>Tint</strong> draws a picture in the
          theme’s colours: <strong>Duotone</strong> in its accent and ground, or{' '}
          <strong>Muted</strong>, quieted toward the ground. You can add accessibility descriptions
          to images.
        </p>
        <p>
          A picture can also move while its slide is presented. Set its <strong>Motion</strong> to{' '}
          <strong>Drift</strong> and it closes in by 3% over a minute and back, too slowly to see
          it move. <strong>Choose Video…</strong> sets a short clip to play in the picture’s place,
          silent and looping, and makes its first frame the picture. Lamp plays .mp4, .mov and
          .m4v files up to 100 MB, and offers to save a smaller copy of a larger one, silent and at
          most 1080p, leaving your original as it is. A slide plays one video, and{' '}
          <strong>Remove Video</strong> keeps the picture. Thumbnails, Slide Studio, PDFs, the
          iPhone and iPad, and Reduce Motion show the picture still. The words over a drifting
          picture read wherever it moves; over a video they are coloured for its first frame, so
          choose a clip that stays quiet behind them.
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

        <h3>Themes and backgrounds</h3>
        <p>
          Seven themes, <strong>Lamp Dark</strong>, <strong>Parchment</strong>,{' '}
          <strong>Olive Grove</strong>, <strong>Linen</strong>, <strong>Harbour</strong>,{' '}
          <strong>Vespers</strong> and <strong>Nocturne</strong>, are each shown drawn on your first
          slide. Applying one keeps your typefaces and highlight names, and recolours each highlight
          in the hue it had. <strong>Headings</strong> can take their own typeface, apart from{' '}
          <strong>Body</strong>. A slide’s <strong>Background</strong> can be the theme’s, its{' '}
          <strong>Accent</strong>, <strong>Inverse</strong> or any other colour, for a section
          break; Slide Studio says when the words would be hard to read on it.
        </p>
        <Figure
          whole
          caption="The Deck pane draws the deck’s first slide in each theme. This deck is in Parchment, with its headings in System Serif."
        >
          <SlideStudioThemesArt />
        </Figure>

        <h3>Timelines, structures and maps</h3>
        <p>
          A list’s <strong>Figure</strong> draws its lines another way:
        </p>
        <ul>
          <li>
            <strong>Timeline</strong>: one event per line, a date, a spaced dash and what happened,
            such as “c. 1000 BC — David king in Jerusalem”. Turn on{' '}
            <strong>Zoom in a few events at a time</strong> for a long one: the slide shows the
            whole timeline, each click moves in and along it, and the last click zooms back out.
          </li>
          <li>
            <strong>Chiasm</strong>: one member per line, lettered A, B … B′, A′ and stepped in
            toward the centre.
          </li>
          <li>
            <strong>Parallel</strong>: lines in pairs, each answered by the line set beneath it.
          </li>
          <li>
            <strong>Map</strong>: one place per line, as OpenBible.info names it, with what the map
            should call it after a dash, such as “Antioch 2 — Pisidian Antioch”. Each line shows
            whether the place was found, with the first verse naming it, is uncertain, or was not
            found, so a name that won’t draw is caught while you write.
          </li>
        </ul>
        <Figure
          whole
          caption="A timeline in Olive Grove, a chiasm in Linen and parallel lines in Nocturne, each written one entry to a line."
        >
          <SlideFiguresArt />
        </Figure>
        <p>
          A map draws the land around its places in the deck’s colours, with lakes, rivers and
          shaded relief, each place marked and named and an uncertain site as an open ring.{' '}
          <strong>Join the places as a route</strong> draws a line from each place to the next, as
          for a journey. Coastlines are today’s. Maps cover Europe and Russia to the Pacific, North
          Africa, the Near East, Arabia and Persia, and credit OpenBible.info and Natural Earth on
          their face; see <Link href="/software-licences">Software licences</Link>. Figures are
          drawn on the text layouts; on a title or in a column the lines stay a list.
        </p>
        <Figure
          whole
          caption="Paul’s first journey as a map, joined as a route. Each line names a place, and the inspector shows the verse that first names it."
        >
          <SlideStudioMapArt />
        </Figure>

        <h3>Revealing a slide</h3>
        <p>
          <strong>Reveal one part at a time</strong> brings in each passage, list item or column on
          a click, and a timeline or map one event or place at a time.{' '}
          <strong>Light up emphasis last</strong> gives emphasised words their colour on a click of
          their own. The inspector says how many clicks the slide takes. Parts still to come are
          laid out in place, so nothing moves as each arrives. The deck’s{' '}
          <strong>Transition</strong> dissolves between slides or cuts, and with Reduce Motion on
          nothing animates.
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
            deck from the writing, checks it and imports it into Slide Studio, ready to edit. For a
            map, it looks up which places will draw, and never invents a location. Where a picture
            cannot carry a moment, such as a model turning or a route being traced, it can write
            an animation, which Lamp draws a frame at a time into a looping video and a still for
            a picture. Nothing the agent wrote runs while you present.
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
              <td>Next part or slide</td>
              <td>→, ↓, Page Down, Space, Return, or click</td>
            </tr>
            <tr>
              <td>Previous slide, complete</td>
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
          The remote shows the current slide as far into its reveal as the room has seen, the next
          slide when space allows, presenter notes with
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
          presenter notes and a slide list for navigation. A swipe brings a slide’s next part or the
          next slide, swiping back returns to the previous slide complete, and slides dissolve as
          they do on the Mac. Hidden slides are skipped.
        </p>
      </Platform>
    </DocPage>
  )
}
