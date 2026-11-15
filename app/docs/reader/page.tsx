import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Figure, Table } from '@/components/docs/DocPage'
import { ReaderArt } from '@/components/home/art'

export const metadata: Metadata = {
  title: 'The reader',
  description:
    'Translations with Strong’s tagging, the tool panel, cross-references, read aloud, navigation history and external Bible app handoff.',
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
        morphology codes.
      </p>

      <h3>Word lookups</h3>
      <p>
        In a Strong’s-tagged translation, tapping a word opens its lexicon entry. Which lexicon
        appears first depends on your configured order — see{' '}
        <Link href="/docs/lexicons">Lexicons</Link>. Turn on <strong>Show Word Hints</strong>{' '}in
        Settings → Translations &amp; Lexicons to underline every tagged word, to show which words have lexicon entries.
      </p>

      <Figure caption="Tapping “Word” in John 1:1 opens its Strong’s entry, with buttons to search its verses and analyse it.">
        <ReaderArt />
      </Figure>

      <h3>Verse actions</h3>
      <p>
        Tap a verse number to highlight the whole verse or to open its note in the{' '}
        <Link href="/docs/notes">Notes panel</Link>. Select any span of text to highlight it,
        remove a highlight from it, or search for it; the usual Copy, Look Up and Share actions are
        there too. Highlights are character-precise rather than whole-verse, and they are stored per
        translation — see <Link href="/docs/highlights">Highlights</Link>.
      </p>

      <h2>The tool panel</h2>
      <p>
        Choose <strong>Show Tools</strong> to open a panel below the passage. On iPad, choose
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
              Your notes for this chapter, edited in place: a chapter note first, then each verse or
              verse-range note. See <Link href="/docs/notes">Notes</Link>.
            </td>
          </tr>
          <tr>
            <td>Commentary</td>
            <td>
              Exposition for the current chapter from a chosen commentary series, including the two
              bundled cross-reference sets.
            </td>
          </tr>
          <tr>
            <td>Your writing</td>
            <td>
              A writing collection, listed by its name — My Writing or another — for reading a piece
              beside the passage it discusses.
            </td>
          </tr>
        </tbody>
      </Table>

      <p>
        For notes and commentary the panel’s scroll is linked to the reader both ways, so moving
        through the chapter moves the panel with you, and the panel moves on as each verse reaches
        the top. <strong>Unlink Scroll</strong> lets you read the two independently. Scripture
        references in commentary open a preview you can page through, with a button to go to the
        passage.
      </p>

      <Callout title="When a series has no volume for a book">
        <p>
          Commentary series rarely cover all 66 books. If the selected series has no volume for the
          current book, the panel shows a message. Pick a different
          series from the panel’s title menu.
        </p>
      </Callout>

      <h3>Cross-references</h3>
      <p>
        The bundled cross-references are two commentary series: the Treasury of Scripture
        Knowledge, Enhanced, and the OpenBible.info cross-reference set. Choose either in the tool
        panel to see the references for each verse of the chapter, each one a link you can preview
        or follow. References inside lexicon entries and your own notes are links too.
      </p>

      <h2>Read aloud</h2>
      <p>
        For plan readings, the speaker button reads the passage using system voices. It announces
        the reading and each chapter, then reads the verses without headings or verse numbers.
        Pause, skip between verses or scrub through the reading. <strong>Follow Along</strong>
        highlights the current verse and keeps it visible.
      </p>
      <p>
        Non-English translations use a voice for their language and omit the English reading name.
        Chapters use the translation’s book names. Where only English names are available,
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
        analysis, <strong>Greek Words</strong> offers <strong>Classroom (Erasmian)</strong> or
        <strong>Modern Greek</strong>; the latter requires an installed Greek voice. Hebrew words
        use Strong’s pronunciation respelling. Single-word playback briefly lowers other audio.
      </p>

      <h2>Getting around</h2>
      <ul>
        <li>
          <strong>Tap the title</strong> — the translation and chapter at the top of the reader — to
          choose a book and chapter. The books are grouped by testament and by kind — Law, History
          and so on — and a book’s chapters are a grid of numbers, with a{' '}
          <strong>Contents</strong> list of each chapter’s first heading where the translation has
          headings. Touch and hold a chapter to choose one of its verses. The translation menu at
          the top switches translation; translations are grouped by language, the Hebrew and Greek
          last under <strong>Biblical Languages</strong>, and those tagged with Strong’s numbers
          say so. In each language the whole Bibles come first, and below a divider the texts of
          only part of the Bible, such as Brenton’s English Septuagint.
        </li>
        <li>
          The picker lists only the books the translation has, so the Septuagint offers no New
          Testament. Switching translation keeps your place where the new one has it, and otherwise
          opens its first book in the same testament. A link, search result or plan reading in a
          book the translation lacks says so — “Brenton English Septuagint doesn’t include
          Matthew.” — and offers to read it in a translation that has it.
        </li>
        <li>
          A translation in another language names its books as it does — <em>Génesis</em> in the
          Reina-Valera, <em>Genèse</em> in the Segond — in the reader’s title, the book picker, the
          chapter headings and History. Notes, cross-references, commentary and search keep
          the app’s English names.
        </li>
        <li>
          <strong>Pull past the top or bottom</strong> of a chapter to go to the previous or next
          chapter, or the previous or next reading in a plan.
        </li>
        <li>
          The menu in the bottom toolbar switches between a <strong>search</strong> field,{' '}
          <strong>History</strong>, chapter and book stepping, and — on a day with plan readings —{' '}
          <strong>Readings</strong>, which steps through the day’s readings with their verse
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

      <h2>Handing off to another Bible app</h2>
      <p>
        If you own a study Bible on another platform, Lamp Bible can open a passage there instead
        of in its own reader. Supported targets are Accordance, e-Sword LT, Logos, Olive Tree and
        YouVersion. This is a deep link — the other app must be installed, and those that are not
        are named beneath the list rather than offered. Choose one in Settings under{' '}
        <strong>Open Readings In</strong>; plan readings then get a button that opens them there.
        See{' '}
        <Link href="/docs/reading-plans">Reading plans</Link>.
      </p>

      <h2>Appearance</h2>
      <ul>
        <li>
          <strong>View Options</strong> in the reader’s menu sets the typeface — serif, the
          default, or sans — the text size, and the <strong>Line Spacing</strong>, in points. The
          reader’s size is set independently of the tool panel’s and of your writing’s.
        </li>
        <li>Light and dark rendering follows the system appearance.</li>
      </ul>
    </DocPage>
  )
}
