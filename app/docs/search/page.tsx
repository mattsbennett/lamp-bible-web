import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Figure, Table } from '@/components/docs/DocPage'
import { Platform } from '@/components/docs/Platform'
import { AnalysisArt } from '@/components/home/art'

export const metadata: Metadata = {
  title: 'Search',
  description:
    'Search translations and study materials by text, Strong’s number, tag or highlight colour. Analyse word usage across your library.',
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
            <td>Definitions, glosses and usage — or directly by Strong’s or BDB key</td>
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
            <td>The verse text under a highlight, or every highlight of a given colour</td>
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

      <Callout title="Search by highlight colour">
        <p>
          Name a colour “Promises” in a <Link href="/docs/highlights">highlight theme</Link>,
          then search by that colour to find the passages you marked.
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

        <h3>Two scopes</h3>
        <p>
          Search opens from the home screen, from the search field in the reader’s toolbar, from{' '}
          <strong>Search</strong> on selected text, and from the occurrence count in a{' '}
          <Link href="/docs/lexicons">lexicon entry</Link>. Its menu switches between two scopes:
        </p>
        <ul>
          <li>
            <strong>Bible</strong> searches the verses of one translation, by text or by Strong’s
            number.
          </li>
          <li>
            <strong>Modules</strong> searches everything else you have installed or written.
          </li>
        </ul>

        <h3>Filters</h3>
        <p>
          In either scope, the scope menu also narrows a search to the Old or New Testament, or to{' '}
          <strong>One Book</strong>: the verses searched in the Bible scope, and the verses and
          highlights among the modules.
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
          <li>
            <strong>Highlight colour</strong> — find every passage you marked in a particular colour,
            with no search term at all.
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
            both scopes, on this device. Choosing one runs it again with the scope and filters it had.
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
          <strong>Search</strong> in the sidebar groups results by content type,
          with Scripture first and a preview beside the list. Each type gets a share of the results;
          use <strong>More in</strong> beside a heading to expand it. Scripture results use your
          current translation and show how many others match. If it has no matches, another
          translation is used. Dictionary results show the full entry with <strong>Look Up</strong>{' '}
          and <strong>Analyse</strong>.
        </p>
        <p>
          Enter a passage reference to open it directly, or a Strong’s number to analyse it.
          The filter bar narrows results by content type, module, testament, Strong’s key or
          highlight colour. Writing can also be filtered by date, tag and category.
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
        For a Greek word, the Septuagint’s results highlight the Greek word in each verse. Enable <strong>Greek</strong>{' '}
        to show the Greek text below it. Rows identify uncertain Hebrew–Greek matches; the warning
        disappears where word positions resolve the match. If you imported a Strong’s-tagged
        English Septuagint, such as the Apostolic Bible Polyglot, <strong>English from</strong>{' '}
        switches between it and your selected Bible. <strong>How this is counted</strong> explains
        the figures. A caption notes that the bundled Septuagint’s machine-generated tags are less
        reliable for case, number and gender than for word identification.
      </p>
      <Platform only="ios">
        <h3>Analysis on iPhone and iPad</h3>
        <p>
          Choose <strong>Analyse</strong> beside a Strong’s search count, above the results when
          you enter a number, or in a <Link href="/docs/lexicons">lexicon entry</Link>.
          The <strong>Books</strong> menu filters by testament, part of the canon or <strong>One Book</strong>.
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
            ring counts the rest and a line under it says how many are left out.
          </li>
          <li>
            <strong>Grammar</strong> — how it is parsed where it occurs.
          </li>
          <li>
            <strong>By Book</strong>, <strong>By Section</strong> or <strong>By Chapter</strong> —
            occurrences shown as bars for books and sections, or a grid for chapters. Bars show
            totals or counts per 1,000 words. Arrows mark statistically unusual frequencies (↑ or ↓);
            darker chapter squares indicate higher frequencies.
          </li>
          <li>
            <strong>Found With</strong> — other words that share its verses, with a bar for the
            strength of each association. A word that shares many verses leads one that shares a
            few, however rare it is. Tap one to analyse it in turn.
          </li>
          <li>
            <strong>Compare</strong> — the count in every installed translation that tags the
            number; tap one for its own analysis.
          </li>
          <li>
            <strong>Verses</strong> — every verse it occurs in, ten to begin with and{' '}
            <strong>Show All</strong> for the rest, with the word marked as a search marks a match.
            Tap a rendering, a form, a parsing, a book or a chapter above to narrow the list, and a
            verse to preview it with a button to open it in the reader.
          </li>
          <li>
            <strong>In the Septuagint</strong> — expand this section for Greek words. If the Septuagint
            is tagged, as the bundled <code>LXX</code> is, separate bars compare Old and New Testament
            verse counts and relative frequencies, with a breakdown by book. The counts are not combined.
            The section also lists Hebrew words translated by this Greek word, with links to their
            analysis and matching verses in groups of ten. Tap a book to filter the verses. For untagged
            Septuagint texts, only <strong>Hebrew It Translates</strong> appears.
          </li>
        </ul>
      </Platform>

      <Platform only="mac">
        <h3>Analysis on the Mac</h3>
        <p>
          To analyse a Strong’s number, select <strong>Scripture</strong> and enter it in the filter
          bar’s Strong’s field, or enter it in the search box and choose <strong>Analyse</strong>.
          The analysis appears beside full verses with the word highlighted. Click an analysis figure
          to filter those verses. From a dictionary entry, <strong>Analyse</strong> opens in the study
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
            occurrences per 1,000 words, or a grid of every chapter. Click a bar or a chapter to see
            its verses.
          </li>
          <li>
            <strong>Companions</strong> — the words found with it, how many verses each shares
            and the ratio to the count expected by chance.
          </li>
          <li>
            <strong>Compare</strong> — the count and the commonest English in every installed
            translation that tags the number.
          </li>
          <li>
            <strong>Septuagint</strong> — for a Greek word the Septuagint uses, and only then: the
            word in the Greek Old Testament beside the New Testament, and the Hebrew words it renders,
            each opening on its first ten verses. Click a book’s bar to narrow the verses to it.
          </li>
          <li>
            <strong>Verses</strong> — the verse list when analysis is open in the study column.
          </li>
        </ul>
        <p>
          Every figure has <strong>Add to Deck</strong>, which puts it on a slide.
        </p>
        <p>
          A deck can chart a Strong’s number too; see{' '}
          <Link href="/docs/presenting">Presenting</Link>.
        </p>
      </Platform>
    </DocPage>
  )
}
