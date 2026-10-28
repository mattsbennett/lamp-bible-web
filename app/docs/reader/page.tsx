import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

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
      intro="The passage view, and the tools that sit around it: word lookups, commentary, notes, read aloud and navigation."
    >
      <h2>The text</h2>
      <p>
        Verse text is rendered from the translation module, which carries more than plain strings.
        Depending on the translation, a chapter can include section headings, paragraph breaks,
        poetry and stanza layout, superscriptions, italic supplied words, the divine name set
        apart, red-letter marking for the words of Christ, and per-word Strong’s numbers with
        morphology codes.
      </p>

      <h3>Word lookups</h3>
      <p>
        In a Strong’s-tagged translation, tapping a word opens its lexicon entry. Which lexicon
        appears first depends on your configured order — see{' '}
        <Link href="/docs/lexicons">Lexicons</Link>. Turn on <strong>Show Word Hints</strong> in
        Settings → Modules → Settings to underline every tagged word, so you can see at a glance
        which words have entries behind them.
      </p>

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
        <strong>Show Tools</strong> splits the reader to show a panel beneath the text. On an iPad
        it can sit to the right instead — choose <strong>Split Right</strong> from the panel’s menu,
        or set the panel position in Settings. Drag the divider to resize it. The panel’s title
        menu chooses what it shows:
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
            <td>Devotionals</td>
            <td>Your long-form writing, for reading beside the passage it discusses.</td>
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
          book you are in, the panel says so rather than showing an empty pane — pick a different
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
        When you open a plan reading, a speaker button in the reader’s header reads the passage
        aloud with the system voices: the reading’s name, each chapter as it starts, then the verse
        text, skipping headings and verse numbers. You can pause, skip a verse back or forward, and
        scrub through the reading. <strong>Follow Along</strong> marks the verse being read and
        keeps it in view.
      </p>
      <p>
        Reading carries on with the screen locked, with controls on the Lock Screen. It speaks at
        your reading rate, so the plan’s time estimates and the voice agree. Choose the voice in
        Settings under Read Aloud; if no voice is installed for the translation’s language, the app
        tells you where to add one.
      </p>

      <h2>Getting around</h2>
      <ul>
        <li>
          <strong>Tap the title</strong> — the translation and chapter at the top of the reader — to
          choose a book and chapter. The translation menu at the top of that list switches
          translation.
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
          away as you scroll down, leaving a small title you tap to bring them back.
        </li>
      </ul>

      <h2>Handing off to another Bible app</h2>
      <p>
        If you own a study Bible on another platform, Lamp Bible can open a passage there instead
        of in its own reader. Supported targets are Accordance, e-Sword LT, Logos, Olive Tree and
        YouVersion. This is a deep link — the other app must be installed, and apps that are not
        installed are greyed out. Choose one in Settings under <strong>External Bible</strong>; plan
        readings then get a button that opens them there. See{' '}
        <Link href="/docs/reading-plans">Reading plans</Link>.
      </p>

      <h2>Appearance</h2>
      <ul>
        <li>
          Text size for the reader is in its menu, and is set independently of the tool panel’s and
          of devotional text.
        </li>
        <li>Light and dark rendering follows the system appearance.</li>
      </ul>
    </DocPage>
  )
}
