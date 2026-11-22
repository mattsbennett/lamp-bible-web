import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Figure, Table } from '@/components/docs/DocPage'
import { Platform } from '@/components/docs/Platform'
import { AnalysisArt } from '@/components/home/art'

export const metadata: Metadata = {
  title: 'Search',
  description:
    'Search translations and study materials by text, Strong’s number, tag or highlight. Analyse word usage across your library.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/search"
      title="Search"
      intro="Search all installed content, including your notes and writing."
    >
      <h2>What search covers</h2>
      <p>
        Search covers everything you have installed and everything you write, in both apps:
      </p>
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Matches on</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Translations</td>
            <td>Verse text, and separately by Strong’s number</td>
          </tr>
          <tr>
            <td>Dictionaries</td>
            <td>
              Definitions, glosses, transliterations and usage — or directly by Strong’s or BDB key.
              Entries are ranked by their glosses, so <em>grace</em> leads with χάρις and חֵן
            </td>
          </tr>
          <tr>
            <td>Commentaries</td>
            <td>
              Commentary text and its footnotes, resolved back to the section or pericope it belongs
              to
            </td>
          </tr>
          <tr>
            <td>Books</td>
            <td>Section titles and text, opening the book at that section</td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>Your note text, including footnotes</td>
          </tr>
          <tr>
            <td>Writing</td>
            <td>Title, summary and body content</td>
          </tr>
          <tr>
            <td>Highlights</td>
            <td>
              The verse text under a highlight, narrowed by theme, colour or style, or every highlight
              with nothing typed
            </td>
          </tr>
          <tr>
            <td>Reading plans</td>
            <td>A plan’s name, author and description, opening it with a switch to follow it</td>
          </tr>
          <tr>
            <td>Quizzes</td>
            <td>A question’s words, opening it with its answer and passage</td>
          </tr>
        </tbody>
      </Table>

      <Callout title="Search by highlight theme">
        <p>
          Name a colour “Promises” in a <Link href="/docs/highlights">highlight theme</Link>,
          then search by that theme to find the passages you marked.
        </p>
      </Callout>

      <h2>Writing a query</h2>
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Finds</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>love neighbour</code>
            </td>
            <td>Results containing every word</td>
          </tr>
          <tr>
            <td>
              <code>lov</code>
            </td>
            <td>Words starting with it — love, loved, lovingkindness, but not beloved</td>
          </tr>
          <tr>
            <td>
              <code>*faith</code>
            </td>
            <td>The letters anywhere in a word — unfaithful as well as faithful</td>
          </tr>
          <tr>
            <td>
              <code>&quot;faith&quot;</code>
            </td>
            <td>The whole word only</td>
          </tr>
          <tr>
            <td>
              <code>&quot;faith works&quot;</code>
            </td>
            <td>The exact phrase</td>
          </tr>
          <tr>
            <td>
              <code>self-control</code>
            </td>
            <td>The hyphenated word</td>
          </tr>
        </tbody>
      </Table>
      <p>
        Case and accents make no difference, nor does the shape of an apostrophe:{' '}
        <code>Lord&apos;s</code> finds “Lord’s”, and <code>λογος</code> finds λόγος. There are no
        operators:{' '}
        <code>AND</code>, <code>OR</code> and <code>NOT</code> are searched as ordinary words. Bible
        searches run when you press Search and need at least two characters.
      </p>
      <p>
        Enter a reference such as <code>John 3</code> or <code>Ps 23:1-4</code> to see a{' '}
        <strong>Go to</strong> shortcut above the text results. Search also checks for the reference
        in commentary and other content. References accept English or your translation’s book names,
        with or without accents: in Reina-Valera, <code>Juan 3:16</code> offers{' '}
        <strong>Go to Juan 3:16</strong>.
      </p>

      <Platform only="ios">
        <h2>On iPhone and iPad</h2>

        <h3>Three scopes</h3>
        <p>
          Search opens from the home screen, from the search field in the reader’s toolbar, from{' '}
          <strong>Search</strong> on selected text, and from the occurrence count in a{' '}
          <Link href="/docs/lexicons">lexicon entry</Link>. Its menu switches between three scopes:
        </p>
        <ul>
          <li>
            <strong>Bible</strong> searches the verses of one translation, by text or by Strong’s
            number.
          </li>
          <li>
            <strong>Modules</strong> searches everything else you have installed or written.
          </li>
          <li>
            <strong>Highlights</strong> lists every highlight, and searches the words of the verses
            they mark. <strong>Marked as</strong> narrows them to any themes, colours and styles you
            pick. Swipe a result to remove that highlight.
          </li>
        </ul>

        <h3>Filters</h3>
        <p>
          In any scope, the scope menu also narrows a search to the Old or New Testament, or to{' '}
          <strong>One Book</strong>: the verses searched in the Bible scope, the verses among the
          modules, and the highlights.
        </p>
        <p>In the Modules scope, results are grouped by type and can be narrowed:</p>
        <ul>
          <li>
            <strong>Specific modules</strong> — every dictionary, one commentary series, one notes
            module, and so on.
          </li>
          <li>
            <strong>Translation</strong> — which translation verse results come from.
          </li>
          <li>
            <strong>Tags</strong> — pick from the tags you have given your writing.
          </li>
        </ul>

        <h3>Results</h3>
        <ul>
          <li>
            Text results are ranked by relevance, with the match highlighted in a snippet. For a
            search of several words, results that hold them together come first.
          </li>
          <li>
            Tap a result to preview it. The preview’s context — one verse, three, or the whole
            chapter — is adjustable, and a button takes you to the passage.
          </li>
          <li>
            Bible results load a hundred at a time; <strong>Load More Results</strong> extends the
            list. Module results open on thirty, shared among the types that matched; a type with
            more to show has <strong>More</strong> in its heading, which lists that type alone, a
            hundred at a time.
          </li>
          <li>
            <strong>Recent Searches</strong> keeps your last twenty searches that found something, in
            every scope, on this device. Choosing one runs it again with the scope and filters it had.
            They can be cleared.
          </li>
        </ul>

        <h3>Searching by Strong’s number</h3>
        <p>
          A Strong’s search finds verses tagged with a number such as <code>H430</code> or{' '}
          <code>G2316</code>. In the Bible scope, enter the number and choose <strong>Search Strong’s</strong>{' '}
          or <strong>Analyse</strong> above the results. Entering a number does not change the search
          mode automatically. You can also select <strong>Strong’s</strong> from the mode menu or tap
          the occurrence count in a lexicon entry.
        </p>
        <p>
          In the Modules scope, use <strong>Strong’s Key</strong> to find dictionary entries.
          Leading zeros are ignored: <code>H07225</code> and <code>H7225</code> identify the same word.
        </p>

      </Platform>

      <Platform only="mac">
        <h2>On the Mac</h2>
        <p>
          <strong>Search</strong> in the sidebar opens on <strong>Search Your Library</strong>: your{' '}
          <strong>Recent Searches</strong>, which <strong>Clear</strong> empties, a few searches to{' '}
          <strong>Try</strong>, and <strong>Search In</strong> tiles for each kind of content.
        </p>
        <p>
          Results are grouped by content type, with Scripture first and a preview beside the list;{' '}
          <strong>Found in</strong> above them jumps to each type. Each type gets a share of the
          results: <strong>More in</strong> beside a heading lists that type alone, and{' '}
          <strong>All Results</strong> goes back. Scripture results use your current translation and
          show how many others match. If it has no matches, another translation is used. Click a
          result to preview it, and set how many verses around it to show with the{' '}
          <strong>Context</strong> stepper. Dictionary and commentary results mark the words you
          searched for, and dictionary results show the full entry with <strong>Look Up</strong>{' '}
          and <strong>Analyse</strong>.
        </p>
        <p>
          Enter a passage reference to open it directly, or a Strong’s number to analyse it. The{' '}
          <strong>Content</strong> and <strong>Module</strong> menus in the toolbar narrow results
          by type and module. Beneath them, a row narrows one type further: <strong>Books</strong>{' '}
          and a <strong>Strong’s</strong> field for Scripture, the Strong’s field for dictionaries,
          and for highlights a menu that picks any themes, colours and styles. Writing can also be
          filtered by date, tag and category.
        </p>
        <p>
          When nothing matches, <strong>Did you mean</strong> suggests other spellings, and buttons
          lift each filter that narrowed the search.
        </p>
        <p>
          Searches open in tabs named after the query and restore when you relaunch. Searches
          started from the reader reuse a matching or empty tab before opening a new one.
        </p>
      </Platform>

      <h2 id="analysis">Analysing a Strong’s number</h2>
      <p>
        Word analysis summarises a translation’s tags for one Strong’s number. The summary card
        shows the word, transliteration, definition and pronunciation button. By default, it counts
        occurrences, verses and books, with a chart by book. Use the sliders button to choose
        three of nine figures or change or hide the chart. Options include the number of renderings
        and frequency per 1,000 tagged words, scaled to 10,000 or more for rare words.
      </p>
      <Figure caption="The analysis of G26, ἀγάπη, in the KJV: its counts, its distribution by book, and how it is translated.">
        <AnalysisArt />
      </Figure>
      <p>
        Every figure depends on how that translation was tagged, so two translations can count the
        same word differently.
      </p>
      <p>
        For a Greek word, the Septuagint’s results highlight the Greek word in each verse. Enable <strong>Greek under each verse</strong>{' '}
        to show the Greek text below it. A row whose Hebrew–Greek match is in doubt says{' '}
        <strong>Uncertain match</strong>; open it to see why. If you imported a Strong’s-tagged
        English Septuagint, such as the Apostolic Bible Polyglot, <strong>English from</strong>{' '}
        switches between it and your selected Bible. <strong>How this is counted</strong> explains
        the figures, including that the bundled Septuagint’s machine-generated tags are less
        reliable for case, number and gender than for which word it is.
      </p>
      <p>
        A number that no installed translation tags says so — “No Tags for H0” — rather than
        showing zeros.
      </p>
      <Platform only="ios">
        <h3>Analysis on iPhone and iPad</h3>
        <p>
          Choose <strong>Analyse</strong> beside a Strong’s search count, above the results when
          you enter a number, or in a <Link href="/docs/lexicons">lexicon entry</Link>.
          The <strong>Books</strong> menu filters by testament, part of the canon or <strong>One Book</strong>,
          and <strong>Jump To</strong> at the right of the bottom bar lists the page’s sections.
          Below the summary card are:
        </p>
        <ul>
          <li>
            <strong>Definition</strong> — the whole entry, in each dictionary that has the word.
          </li>
          <li>
            <strong>Translated As</strong> — the English the translation uses for it, commonest first,
            as a ring or a list; each slice of the ring with room for it is labelled with its share.
            These are the choices translators made, not the range of what the word means; for that,
            read the definition.
          </li>
          <li>
            <strong>Forms</strong> — original-language spellings, with transliteration and grammatical function. Where some occurrences are tagged without a spelling, the
            ring counts the rest and a line under it says how many are left out. Where a
            translation’s tags give no spellings at all, Forms says what they leave out and offers{' '}
            <strong>Open in TAGNT</strong> or <strong>Open in TAHOT</strong>, whose tags give each
            spelling and its grammar.
          </li>
          <li>
            <strong>Grammar</strong> — how it is parsed where it occurs.
          </li>
          <li>
            <strong>By Book</strong>, <strong>By Section</strong> or <strong>By Chapter</strong> —
            occurrences shown as bars for books and sections, or a grid for chapters. Bars show
            totals or counts per 1,000 words. Arrows mark statistically unusual frequencies, with a
            key beneath the bars: <strong>More ↑</strong>, <strong>As expected</strong> and{' '}
            <strong>Fewer ↓</strong>. Darker chapter squares indicate higher frequencies.
          </li>
          <li>
            <strong>Found With</strong> — other words that share its verses. The multiple beside
            each is how many times more often the two share a verse than they would by chance; the
            bar also counts how many verses they share and sets the order, so a big multiple from a
            few verses can rank below a smaller one from many. Tap one to analyse it in turn.
          </li>
          <li>
            <strong>Compare</strong> — the count in every installed translation that tags the
            number; tap one for its own analysis. The Hebrew and Greek texts are folded away at the
            bottom under <strong>The original-language texts</strong>, since their count is not a
            translator’s choice.
          </li>
          <li>
            <strong>Verses</strong> — every verse it occurs in, with the word marked as a search
            marks a match. The heading gives the count, such as “106 Verses”, and what a tap above
            narrowed it to, such as “12 Verses · translated ‘love’”. Ten show to begin with, and{' '}
            <strong>Show All</strong> beside the heading shows the rest. Tap a rendering, a form, a
            parsing, a book or a chapter above to narrow the list, and a verse to preview it with a
            button to open it in the reader.
          </li>
          <li>
            <strong>In the Septuagint</strong> — for Greek words, open after Verses. If the
            Septuagint is tagged, as the bundled <code>LXX</code> is,{' '}
            <strong>Verses in each Testament</strong> sets the New Testament’s verse count beside the
            Septuagint’s, without adding them together. Below it, bars give every book’s occurrences
            or occurrences per 1,000 words, with ↑ and ↓ where a book uses the word more or less than
            chance would. Tap a book to narrow the lists below to it; <strong>Show Every Book</strong>{' '}
            undoes it.
            <p>
              Under <strong>Hebrew It Translates</strong> are <strong>English from</strong>,{' '}
              <strong>Greek under each verse</strong> and <strong>Which verses are listed</strong>.
              Each Hebrew word then has its own card, headed like “ʼahăbâh ‘love’ (H160) · 14 of 35
              verses using ἀγάπη”, with ten of its verses, <strong>Show 10 More</strong>, and a link
              to its own analysis. For untagged Septuagint texts, only Hebrew It Translates appears.
            </p>
          </li>
        </ul>
      </Platform>

      <Platform only="mac">
        <h3>Analysis on the Mac</h3>
        <p>
          To analyse a Strong’s number, choose <strong>Scripture</strong> in the Content menu and
          enter it in the <strong>Strong’s</strong> field, or enter it in the search box and choose{' '}
          <strong>Analyse</strong>. The analysis appears beside full verses with the word
          highlighted, under a <strong>Back to</strong> row that returns to your results or the word
          you came from. Click an analysis figure to filter those verses. From a dictionary entry, <strong>Analyse</strong> opens in the study
          column beside your passage. Both views show the summary card and these tabs:
        </p>
        <ul>
          <li>
            <strong>Definition</strong> — the whole entry, beside a search only.
          </li>
          <li>
            <strong>Overview</strong> — how it is translated, its forms, its grammar — part of
            speech, case, number, tense and so on.
          </li>
          <li>
            <strong>Spread</strong> — by books, sections or chapters: bars counting occurrences or
            occurrences per 1,000 words, or a grid of every chapter, with the More, As expected and
            Fewer key beneath. Click a bar or a chapter to see its verses.
          </li>
          <li>
            <strong>Companions</strong> — the words found with it, how many verses each shares
            and the ratio to the count expected by chance.
          </li>
          <li>
            <strong>Compare</strong> — the count and the commonest English in every installed
            translation that tags the number, with the Hebrew and Greek texts folded away below
            them.
          </li>
          <li>
            <strong>Verses</strong> — the verse list when analysis is open in the study column.
          </li>
          <li>
            <strong>Septuagint</strong> — last, for a Greek word the Septuagint uses, and only then:{' '}
            <strong>Verses in each Testament</strong> and the word’s use in each book, then{' '}
            <strong>How this is counted</strong> and <strong>Hebrew It Translates</strong>, with a
            list of verses for each Hebrew word it renders. Click a book’s bar to narrow the verses to
            it.
          </li>
        </ul>
        <p>
          <strong>Add to Deck</strong> puts a figure on a slide. Spread, Companions and Compare chart
          one figure each, so theirs is at the end of the tab row; Overview and Septuagint have one
          beside each figure, including the Testaments and per-book charts.
        </p>
        <p>
          A deck can chart a Strong’s number too; see{' '}
          <Link href="/docs/presenting">Presenting</Link>.
        </p>
      </Platform>
    </DocPage>
  )
}
