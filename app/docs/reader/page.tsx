import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Figure, Table } from '@/components/docs/DocPage'
import { Platform } from '@/components/docs/Platform'
import { ReaderArt } from '@/components/home/art'

export const metadata: Metadata = {
  title: 'The reader',
  description:
    'Translations with Strong’s tagging, word lookups, commentary and cross-references beside the text, read aloud and navigation — on iPhone and iPad, and on the Mac with tabs, Side by Side and the study column.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/reader"
      title="The reader"
      intro="Read passages, look up words, view commentary and notes, and listen to readings."
    >
      <h2>The text</h2>
      <p>
        The reader preserves the formatting supplied by each translation module.
        Depending on the translation, a chapter can include section headings, paragraph breaks,
        poetry and stanza layout, superscriptions, italic supplied words, the divine name set
        apart, red-letter marking for the words of Christ, and per-word Strong’s numbers with
        morphology codes. In a Strong’s-tagged translation each tagged word leads to its lexicon
        entry; which lexicon comes first depends on your order — see{' '}
        <Link href="/docs/lexicons">Lexicons</Link>.
      </p>

      <h2>Translations</h2>
      <p>
        Translation pickers group translations by language, with the Hebrew and Greek last under{' '}
        <strong>Biblical Languages</strong>, and mark those tagged with Strong’s numbers. In each
        language the whole Bibles come first, and below a divider the texts of only part of the
        Bible, such as Brenton’s English Septuagint.
      </p>
      <p>
        Only the books a translation has are offered, so the Septuagint has no New Testament.
        Switching translation keeps your place where the new one has it, and otherwise opens its
        first book in the same testament. A link, search result or plan reading in a book the
        translation lacks says so — “Brenton English Septuagint doesn’t include Matthew.” — and
        offers it in a translation that has it, one in the same language first.
      </p>
      <p>
        A translation in another language names its books as it does — <em>Génesis</em> in the
        Reina-Valera, <em>Genèse</em> in the Segond — wherever its passage is named, and a passage
        can be typed in those names or in English, with or without accents. Notes,
        cross-references, commentary and the analysis keep the app’s English names.
      </p>

      <h2>Cross-references</h2>
      <p>
        The bundled cross-references are two commentary series: the Treasury of Scripture
        Knowledge, Enhanced, and the OpenBible.info cross-reference set. Choose either as the
        commentary beside the text to see the references for each verse of the chapter, each one a
        link you can preview or follow. References inside lexicon entries and your own notes are
        links too.
      </p>

      <Platform only="ios">
        <h2>On iPhone and iPad</h2>

        <h3>Word lookups</h3>
        <p>
          Tap a tagged word to open its lexicon entry. Turn on <strong>Show Word Hints</strong>{' '}in
          Settings → Translations &amp; Lexicons to underline every tagged word, to show which
          words have lexicon entries.
        </p>

        <Figure caption="Tapping “Word” in John 1:1 opens its Strong’s entry, with buttons to search its verses and analyse it.">
          <ReaderArt />
        </Figure>

        <h3>Verse actions</h3>
        <p>
          Tap a verse number to highlight the whole verse or to open its note in the{' '}
          <Link href="/docs/notes">Notes panel</Link>. Select any span of text to highlight it,
          remove a highlight from it, or search for it; the usual Copy, Look Up and Share actions
          are there too. Highlights are character-precise rather than whole-verse, and they are
          stored per translation — see <Link href="/docs/highlights">Highlights</Link>.
        </p>

        <h3>The tool panel</h3>
        <p>
          Choose <strong>Show Tools</strong> to open a panel below the passage. On iPad, choose{' '}
          <strong>Split Right</strong> from the panel menu, or change its position in Settings,
          to place it beside the passage under a shared header. Drag the divider to resize it;
          drag well past its minimum size and release to close it. Choose the content from the
          panel’s title menu:
        </p>

        <Table>
          <thead>
            <tr>
              <th>Mode</th>
              <th>Shows</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Notes</td>
              <td>
                Your notes for this chapter, edited in place: a chapter note first, then each verse
                or verse-range note. See <Link href="/docs/notes">Notes</Link>.
              </td>
            </tr>
            <tr>
              <td>Commentary</td>
              <td>
                Exposition for the current chapter from a chosen commentary series, including the
                two bundled cross-reference sets.
              </td>
            </tr>
            <tr>
              <td>Your writing</td>
              <td>
                A writing collection, listed by its name — My Writing or another — for reading a
                piece beside the passage it discusses.
              </td>
            </tr>
          </tbody>
        </Table>

        <p>
          For notes and commentary the panel’s scroll is linked to the reader both ways, so moving
          through the chapter moves the panel with you, and the panel moves on as each verse
          reaches the top. <strong>Unlink Scroll</strong> lets you read the two independently.
          Scripture references in commentary open a preview you can page through, with a button to
          go to the passage.
        </p>

        <Callout title="When a series has no volume for a book">
          <p>
            Commentary series rarely cover all 66 books. If the selected series has no volume for
            the current book, the panel shows a message. Pick a different series from the panel’s
            title menu.
          </p>
        </Callout>

        <h3>Read aloud</h3>
        <p>
          For plan readings, the speaker button reads the passage using system voices. It
          announces the reading and each chapter, then reads the verses without headings or verse
          numbers. Pause, skip between verses or scrub through the reading.{' '}
          <strong>Follow Along</strong> highlights the current verse and keeps it visible.
        </p>
        <p>
          Non-English translations use a voice for their language and omit the English reading
          name. Chapters use the translation’s book names. Where only English names are available,
          including the Hebrew and Greek texts, only the chapter number is announced.
        </p>
        <p>
          Reading carries on with the screen locked, with controls on the Lock Screen, and pauses
          anything else playing, such as a podcast, rather than talking over it. It speaks at your
          reading rate, so the plan’s time estimates and the voice agree.
        </p>
        <p>
          Choose a voice in Settings → Read Aloud. <strong>Automatic</strong> selects the best
          installed voice for the translation’s language. If only a basic voice is available, or
          none, Lamp explains how to download one. For individual Greek words in lexicons and
          analysis, <strong>Greek Words</strong> offers <strong>Classroom (Erasmian)</strong> or{' '}
          <strong>Modern Greek</strong>; the latter requires an installed Greek voice. Hebrew words
          use Strong’s pronunciation respelling. Single-word playback briefly lowers other audio.
        </p>

        <h3>Getting around</h3>
        <ul>
          <li>
            <strong>Tap the title</strong> — the translation and chapter at the top of the reader —
            to choose a book and chapter. The books are grouped by testament and by kind — Law,
            History and so on — and a book’s chapters are a grid of numbers, with a{' '}
            <strong>Contents</strong> list of each chapter’s first heading where the translation
            has headings. Touch and hold a chapter to choose one of its verses. The translation
            menu at the top switches translation.
          </li>
          <li>
            <strong>Pull past the top or bottom</strong> of a chapter to go to the previous or next
            chapter, or the previous or next reading in a plan.
          </li>
          <li>
            The menu in the bottom toolbar switches between a <strong>search</strong> field,{' '}
            <strong>History</strong>, chapter and book stepping, and — on a day with plan readings
            — <strong>Readings</strong>, which steps through the day’s readings with their verse
            counts, estimated time and any quiz.
          </li>
          <li>
            <strong>History</strong> keeps the last 50 chapters you visited, with back and forward
            buttons, so following a chain of cross-references is reversible.
          </li>
          <li>
            <strong>Hide Toolbars</strong> gives a full-screen page of text. The toolbars also tuck
            away as you scroll down, leaving a small title; tap it, scroll back up a few lines, or
            reach the top of the chapter to bring them back.
          </li>
        </ul>

        <h3>Handing off to another Bible app</h3>
        <p>
          If you own a study Bible on another platform, Lamp Bible can open a passage there instead
          of in its own reader. Supported targets are Accordance, e-Sword LT, Logos, Olive Tree and
          YouVersion. This is a deep link — the other app must be installed, and those that are not
          are named beneath the list rather than offered. Choose one in Settings under{' '}
          <strong>Open Readings In</strong>; plan readings then get a button that opens them there.
          See <Link href="/docs/reading-plans">Reading plans</Link>.
        </p>

        <h3>Appearance</h3>
        <p>
          <strong>View Options</strong> in the reader’s menu sets the typeface — serif, the
          default, or sans — the text size, and the <strong>Line Spacing</strong>, in points. The
          reader’s size is set independently of the tool panel’s and of your writing’s. Light and
          dark rendering follows the system appearance.
        </p>
      </Platform>

      <Platform only="mac">
        <h2>On the Mac</h2>

        <h3>Finding a passage</h3>
        <p>
          The toolbar shows the current passage. The inner arrows move between chapters; the outer
          arrows move between books. Click the passage or press <strong>⌘L</strong> to navigate.
          Type a reference such as <code>John 3:16</code> and press Return, or choose a translation,
          book and chapter. Hold or force-click a chapter, or press Space, to choose a verse.
        </p>
        <p>
          Text that is not a reference offers a search; a Strong’s number offers its{' '}
          <Link href="/docs/search#analysis">analysis</Link>. Use Tab to move between the field,
          books and chapters, and arrow keys within each. <strong>Go to Anything…</strong> (⌘K)
          reaches further — see <Link href="/docs/mac">Get started on Mac</Link>.
        </p>

        <h3>Tabs and windows</h3>
        <p>
          Press <strong>⌘T</strong> or the <strong>+</strong> below the toolbar to open a reader
          tab. Enter a reference, choose a translation and chapter, or select{' '}
          <strong>Recently Read</strong>. Drag tabs to reorder them; use ⌃Tab and ⌃⇧Tab to switch
          tabs. Hover to show a tab’s close button. Tabs are named after their chapter. Right-click
          for <strong>Rename Tab…</strong>, Duplicate or Close. A custom name stays as you navigate.
        </p>
        <p>
          Each tab remembers its verse, study column state and Reader Chat across launches.{' '}
          <strong>Reading History</strong> retains the last 100 locations.
        </p>
        <p>
          <strong>New Reader Window</strong> (⌥⌘N) opens an independent reader with its own tabs,
          passage and navigation history. Windows restore their tabs on relaunch. Notes and
          highlights are shared and appear immediately in all windows.
        </p>

        <h3>Layout and text</h3>
        <p>
          The <strong>Reader Appearance</strong> menu chooses how a chapter is laid out —{' '}
          <strong>Continuous Paragraph Flow</strong>, <strong>Verse per Line</strong>, or{' '}
          <strong>Side by Side</strong> — along with typeface, text size and line spacing. The text
          keeps to a comfortable line length, which grows with the text size.
        </p>
        <p>
          Choose <strong>Side by Side</strong> in the toolbar or <strong>+</strong> beside a
          chapter’s opening to compare up to three additional translations. Use a column’s title
          menu to change its translation, make it the primary translation or remove it. The{' '}
          <strong>+</strong> beside the titles adds a column. Verses align even when translations
          number them differently. Each column retains its own highlights and translator’s notes.
          When space is limited, additional translations appear beneath each verse, labelled with
          their abbreviations.
        </p>

        <h3>Marks in the margin</h3>
        <Table>
          <thead>
            <tr>
              <th>Mark</th>
              <th>Means</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A bar in the margin</td>
              <td>The selected verse</td>
            </tr>
            <tr>
              <td>An orange note in the margin</td>
              <td>Your note on that verse; click to open it</td>
            </tr>
            <tr>
              <td>A purple book in the margin</td>
              <td>Notes from an installed notes module</td>
            </tr>
            <tr>
              <td>A blue letter in the text</td>
              <td>A translator’s note, which opens in place beneath the verse</td>
            </tr>
          </tbody>
        </Table>

        <h3>Verses and words</h3>
        <p>
          Click a verse number to select the verse and open its notes in the study column.
          Right-click a verse to <strong>Copy as Citation</strong> or highlight it. In a
          Strong’s-tagged translation, hovering over a word shows its Strong’s number at the foot of
          the window, and clicking opens it in the Dictionary tab.
        </p>

        <h3>The study column</h3>
        <p>
          <strong>Study Tools</strong> (⇧⌘I) opens a column beside the text, which you can widen by
          dragging. It has four tabs, which become a pop-up menu when the column is narrow:
        </p>
        <Table>
          <thead>
            <tr>
              <th>Tab</th>
              <th>Shows</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Commentary</td>
              <td>
                The chapter’s commentary, grouped by passage, from the commentary you choose —
                including the cross-reference sets
              </td>
            </tr>
            <tr>
              <td>Verse</td>
              <td>
                The selected verse’s translation notes, its original-language words with Strong’s
                numbers, lemmas and morphology, and its cross-references
              </td>
            </tr>
            <tr>
              <td>Notes</td>
              <td>
                Your notes on the chapter, with the selected verse’s note open to edit, its
                highlights, a list of the chapter’s highlights to go to, and notes from installed
                notes modules, set out with their pictures and footnotes
              </td>
            </tr>
            <tr>
              <td>Dictionary</td>
              <td>
                Lexicon lookups by word, lemma or Strong’s number, with a speaker to say the word
                aloud and <strong>Analyse</strong>, which opens the word’s{' '}
                <Link href="/docs/search#analysis">analysis</Link> in the column, beside the passage
              </td>
            </tr>
          </tbody>
        </Table>
        <p>
          Commentary and notes follow the reader as you scroll, and scrolling the commentary takes
          the reader along with it, unless you turn off{' '}
          <strong>Link Study Tool Scrolling</strong>. Pointing at a commentary’s shortened outline
          path shows it in full. To read another translation beside the text, use Side by Side. A
          scripture reference anywhere in the column opens a preview, with buttons to open it in the
          current tab or a new one.
        </p>

        <h3>Read aloud</h3>
        <p>
          Choose <strong>Read Aloud</strong> in the toolbar to hear the chapter from the beginning
          or selected verse, with optional verse tracking. The system reads each translation in its
          language; non-English verses are announced by number alone. Set speed and language voices
          in Settings → Reader. <strong>Automatic</strong> selects the best installed voice. If no
          voice supports the language, including biblical Hebrew and Koine Greek, the button is
          disabled with an explanation.
        </p>
        <p>
          For individual Greek words, <strong>Greek Words</strong> in the same settings pane offers{' '}
          <strong>Classroom (Erasmian)</strong> or <strong>Modern Greek</strong>. Modern Greek
          requires an installed Greek voice.
        </p>
      </Platform>
    </DocPage>
  )
}
