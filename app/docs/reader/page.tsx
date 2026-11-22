import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Figure, Table } from '@/components/docs/DocPage'
import { Platform } from '@/components/docs/Platform'
import { ReaderArt } from '@/components/home/art'

export const metadata: Metadata = {
  title: 'The reader',
  description:
    'Read and compare translations, look up words, use study tools and listen to passages on iPhone, iPad and Mac.',
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
        Translations are grouped by language, with Hebrew and Greek under <strong>Biblical Languages</strong>{' '}
        at the end. Complete Bibles appear before partial texts, such as Brenton’s English Septuagint.
        Strong’s-tagged translations are marked.
      </p>
      <p>
        The picker lists only books included in the translation. Switching translations keeps
        your place if possible; otherwise, it opens the first book in the same testament. If a link,
        search result or plan reading refers to a missing book, Lamp offers another translation,
        preferring one in the same language.
      </p>
      <p>
        Book names follow the translation’s language, such as <em>Génesis</em> in Reina-Valera
        and <em>Genèse</em> in Segond. You can enter references using these names or English names,
        with or without accents. Notes, cross-references, commentary and analysis use English names.
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
          Tap a tagged word to open its lexicon entry. A word you have highlighted opens its
          highlight panel instead, where <strong>More</strong> → <strong>Look Up</strong> still
          opens the entry. Turn on <strong>Show Word Hints</strong>{' '}in Settings → Translations
          &amp; Lexicons to underline every tagged word, to show which words have lexicon entries.
        </p>

        <Figure caption="Tapping “Word” in John 1:1 opens its Strong’s entry, with buttons to search its verses and analyse it.">
          <ReaderArt />
        </Figure>

        <h3>Verse actions</h3>
        <p>
          Tap a verse number for <strong>Highlight</strong> and <strong>Add Note</strong>, which
          opens its note in the <Link href="/docs/notes">Notes panel</Link>. Select any span of
          text for <strong>Highlight</strong> and <strong>Search</strong>, beside the usual Copy,
          Look Up and Share. Highlight opens a panel beside the words; tap a highlight to open it
          again and change or remove it. Highlights are character-precise rather than whole-verse,
          and they are stored per translation — see <Link href="/docs/highlights">Highlights</Link>.
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
                or verse-range note, after a list of the chapter’s highlights. See{' '}
                <Link href="/docs/notes">Notes</Link>.
              </td>
            </tr>
            <tr>
              <td>Commentary</td>
              <td>
                Exposition for the current chapter from a chosen commentary series, including the
                two bundled cross-reference sets. <strong>Default Commentary</strong>{' '}in Settings
                → Translations &amp; Lexicons sets the series opened when none is open on this device.
              </td>
            </tr>
            <tr>
              <td>Your writing</td>
              <td>
                A writing collection, listed by its name — My Writing or another — for reading a
                piece beside the passage it discusses.
              </td>
            </tr>
            <tr>
              <td>Chat</td>
              <td>
                While AI features are on, the reader chats of a Mac you have paired, to follow and
                carry on — see <Link href="/docs/ai#paired-devices">Chats from iPhone and iPad</Link>.
              </td>
            </tr>
          </tbody>
        </Table>

        <p>
          Notes and commentary scroll with the passage. Choose <strong>Unlink Scroll</strong> to
          read them independently. Scripture references in commentary open a preview with controls
          to browse nearby verses or open the passage.
        </p>

        <Callout title="When a series has no volume for a book">
          <p>
            If the selected series has no volume for
            the current book, the panel shows a message. Pick a different series from the panel’s
            title menu.
          </p>
        </Callout>

        <h3>Read aloud</h3>
        <p>
          In plan mode, the speaker button beside the reader’s menu reads the passage using system
          voices. It
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
          Playback continues with the screen locked and pauses other audio. Lock Screen controls
          let you manage playback. The voice uses your reading-rate setting, matching plan time estimates.
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
            — <strong>Readings (Today)</strong>, which starts plan mode.
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

        <h3>Plan mode</h3>
        <p>
          Plan mode reads the day’s readings in order. The bottom toolbar steps aside, and the title
          shows a checklist mark and your place, such as “· 2 of 3”. Tap the title for the plan’s
          sheet:
        </p>
        <ul>
          <li>
            The day’s card, with how many readings and minutes there are and how many you have read.
            If you follow more than one plan with readings that day, the plan’s name is a menu of them.
          </li>
          <li>
            Each reading, which opens in place to show its length, estimated time and kind, the
            readers’ split if a plan is shared, a <strong>Quiz</strong> chip on the one you are
            reading, and <strong>Read</strong> on the others.
          </li>
          <li>
            <strong>Choose Passage</strong> and <strong>Exit Plan Mode</strong> at the foot.
            Choosing another passage, here or in the book picker, leaves plan mode.
          </li>
        </ul>
        <p>
          Each reading ends with <strong>Previous Reading</strong> and <strong>Next Reading</strong>{' '}
          buttons naming them. The last ends with <strong>End of the day’s readings</strong>:{' '}
          <strong>Done</strong> leaves plan mode, and <strong>Keep Reading</strong> goes on from
          where the reading stopped.
        </p>

        <h3>Handing off to another Bible app</h3>
        <p>
          To open plan readings in another app, choose it under <strong>Open Readings In</strong>{' '}
          in Settings. Lamp supports Accordance, e-Sword LT, Logos, Olive Tree and YouVersion.
          Only installed apps can be selected; others are listed below. Each plan reading then
          has a button to open it there. See <Link href="/docs/reading-plans">Reading plans</Link>.
        </p>

        <h3>Appearance</h3>
        <p>
          <strong>View Options</strong> in the reader’s menu sets the typeface — serif, the
          default, or sans — the text size, and the <strong>Line Spacing</strong>, in points (9 by
          default). The tool panel has its own typeface, size and line spacing (serif and 7 by
          default), set from the panel’s menu, or under <strong>Tool Panel</strong> in View Options
          when it is beside the passage. Every sheet a reference or word opens — verse previews,
          dictionary entries, commentary footnotes — follows the panel’s settings. Your writing’s
          size is set separately. Light and dark rendering follows the system appearance.
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
          books and chapters, and arrow keys within each. <strong>Go to Anything…</strong> (⌘K) also finds library content and commands — see <Link href="/docs/mac">Get started on Mac</Link>.
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
          The <strong>Appearance</strong> button chooses how a chapter is laid out —{' '}
          <strong>Continuous Paragraph Flow</strong>, <strong>Verse per Line</strong>, or{' '}
          <strong>Side by Side</strong> — along with typeface, text size and line spacing. The text
          keeps to a comfortable line length, which grows with the text size. When the window is
          wide enough, the toolbar’s buttons show their names: <strong>History</strong>,{' '}
          <strong>Appearance</strong>, <strong>Read Aloud</strong>, <strong>Chat</strong> and{' '}
          <strong>Study</strong>.
        </p>
        <p>
          Choose <strong>+</strong> beside a chapter’s opening, or <strong>Side by Side</strong>{' '}
          in Appearance, to compare up to three additional translations. Use a column’s title
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
          Click a verse number to select the verse. If the study column is on Notes or Verse, it
          stays there; otherwise it opens the verse’s notes, or its Verse tab. A note marker always
          opens Notes. Select words, or click a highlight, for a bar beside them to{' '}
          <Link href="/docs/highlights#on-the-mac">highlight</Link> them, add a note or{' '}
          <strong>Copy as Citation</strong>. Right-click a verse to highlight it, add or edit its
          note, copy it as a citation or show the study tools. In a Strong’s-tagged translation,
          hovering over a word shows its Strong’s number at the foot of the window, and clicking
          opens it in the Dictionary tab.
        </p>

        <h3>The study column</h3>
        <p>
          <strong>Study</strong> (⇧⌘I) opens a column beside the text, which you can widen by
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
                numbers, lemmas and morphology, and its cross-references. Click a Strong’s number
                for its entry in a popover, with <strong>Open in Dictionary</strong>
              </td>
            </tr>
            <tr>
              <td>Notes</td>
              <td>
                Chapter notes, the selected verse’s note, the chapter’s highlights with{' '}
                <strong>All Highlights</strong> to search them, and installed notes with their
                pictures and footnotes
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
          Commentary and notes follow the reader’s position; scrolling commentary also moves the
          reader. Disable <strong>Link Study Tool Scrolling</strong> to scroll independently.
          Hover over a shortened commentary outline path to see it in full. Scripture references
          open a preview with buttons for the current tab or a new tab.
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
