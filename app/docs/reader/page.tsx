import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'The reader',
  description:
    'Translations with Strong’s tagging, the tool panel, split reading panes, read aloud, navigation history and external Bible app handoff.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/reader"
      title="The reader"
      intro="The passage view, and the tools that sit around it: word lookups, commentary, notes, split panes, read aloud and navigation."
    >
      <h2>The text</h2>
      <p>
        Verse text is rendered from the translation module, which carries more than plain strings.
        Depending on the translation, a verse can include section headings, paragraph breaks, poetry
        indentation, translator footnotes, red-letter marking for the words of Christ, and per-word
        Strong’s numbers with morphology codes.
      </p>
      <p>
        A <strong>simplified text</strong> option strips that formatting back to unadorned verses
        when you want to read without the apparatus in the way.
      </p>

      <h3>Word lookups</h3>
      <p>
        In a Strong’s-tagged translation, tapping a word opens its lexicon entry. Which lexicon
        appears first depends on your configured order — see{' '}
        <Link href="/docs/lexicons">Lexicons</Link>. There is also a hint option that marks tagged
        words visually so you can see at a glance which words have entries behind them.
      </p>

      <h3>Cross-references</h3>
      <p>
        The app bundles an enhanced Treasury of Scripture Knowledge, giving cross-references for
        effectively every verse in the Bible. References are reachable from the verse you are
        reading and can be sorted by relevance or in canonical order.
      </p>

      <h2>Highlighting</h2>
      <p>
        Select any span of text — a word, a phrase, several verses — and apply a highlight from the
        inline colour strip. Highlights are character-precise rather than whole-verse, and they are
        stored per translation. See <Link href="/docs/highlights">Highlights</Link> for styles,
        sets and colour themes.
      </p>

      <h2>The tool panel</h2>
      <p>
        The reader can split to show a second panel alongside or beneath the text. That panel has
        three modes:
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
            <td>Commentary</td>
            <td>
              Exposition for the current chapter from a chosen commentary series, following the
              verse you are on.
            </td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>
              Your own notes for this chapter, editable in place, including chapter-level notes and
              per-verse or verse-range entries.
            </td>
          </tr>
          <tr>
            <td>Devotionals</td>
            <td>Your long-form writing, for reading beside the passage it discusses.</td>
          </tr>
        </tbody>
      </Table>

      <p>
        The panel can sit to the <strong>right</strong> of the text or <strong>below</strong> it,
        set in Settings. Its scroll position is linked to the reader by default, so moving through
        the chapter moves the commentary or notes with you; the link can be switched off if you want
        to read the two independently.
      </p>

      <Callout title="When a series has no volume for a book">
        <p>
          Commentary series rarely cover all 66 books. If the selected series has no volume for the
          book you are in, the panel says so rather than showing an empty pane — pick a different
          series from the panel’s own selector.
        </p>
      </Callout>

      <h2>Split reading</h2>
      <p>
        Separately from the tool panel, the reader can be split into two passage panes. Use it to
        compare translations of the same passage, to hold a cross-reference open beside the verse
        that pointed to it, or to read a Gospel parallel. Each pane keeps its own book, chapter and
        translation.
      </p>

      <h2>Read aloud</h2>
      <p>
        The reader can speak the passage using the system speech voices. You choose the voice, and a{' '}
        <strong>follow along</strong> option keeps the text scrolled to the verse currently being
        read, so you can listen and read together.
      </p>

      <h2>Getting around</h2>
      <ul>
        <li>
          <strong>Book and chapter pickers</strong> in the bottom toolbar for direct navigation.
        </li>
        <li>
          <strong>Portion</strong> mode, which jumps straight to a reading from today’s plan and
          shows its verse count and estimated time.
        </li>
        <li>
          <strong>History</strong>, a running list of where you have been, so following a chain of
          cross-references is reversible.
        </li>
        <li>
          <strong>Hide toolbars</strong> for a full-screen page of text; the header also collapses
          as you scroll.
        </li>
      </ul>

      <h2>Handing off to another Bible app</h2>
      <p>
        If you own a study Bible on another platform, Lamp Bible can open the current passage there
        instead of in its own reader. Supported targets are Accordance, e-Sword LT, Logos, Olive
        Tree and YouVersion. This is a deep link — the other app must be installed. Set it in
        Settings under reading plan behaviour, where you can also decide whether plan readings open
        in the in-app reader or the external one.
      </p>

      <h2>Appearance</h2>
      <ul>
        <li>Adjustable text size for the reader, set independently of devotional text size.</li>
        <li>Light and dark rendering follows the system appearance.</li>
        <li>Toolbars and the tool panel header collapse on scroll to maximise reading area.</li>
      </ul>
    </DocPage>
  )
}
