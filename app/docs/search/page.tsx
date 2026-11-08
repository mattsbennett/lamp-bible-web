import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'
import { isMacAvailable } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Search',
  description:
    'Full-text search across translations, lexicons, commentaries, books, notes, devotionals and highlights, with filters for module, tag, Strong’s number and colour, and an analysis of how any Strong’s number is used.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/search"
      title="Search"
      intro="One index over everything installed — the text you read and the text you wrote."
    >
      <h2>Two scopes</h2>
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
            <td>Devotionals</td>
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

      <h2>Filters</h2>
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
          <strong>Devotional tags</strong> — pick from the tags you have actually used.
        </li>
        <li>
          <strong>Highlight colour</strong> — find every passage you marked in a particular colour,
          with no search term at all.
        </li>
      </ul>

      <Callout title="Colour search is the payoff for naming your themes">
        <p>
          If you have named a highlight colour “Promises” in a{' '}
          <Link href="/docs/highlights">highlight theme</Link>, searching by that colour effectively
          gives you a list of every promise you have marked while reading.
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
        A search that names a passage — <code>John 3</code>, <code>Ps 23:1-4</code> — also offers a{' '}
        <strong>Go to</strong> row above the results that opens it in the reader. The search still
        runs, since “John 3” is also a phrase a commentary might contain.
      </p>

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
          Results load a hundred at a time; <strong>Load More Results</strong> extends the list.
        </li>
        <li>
          <strong>Recent Searches</strong> keeps your last twenty searches that found something, in
          both scopes, on this device. Choosing one runs it again with the scope and filters it had.
          They can be cleared.
        </li>
      </ul>

      <h3>Searching by Strong’s number</h3>
      <p>
        A Strong’s search finds every verse in the translation tagged with a number such as{' '}
        <code>H430</code> or <code>G2316</code> — the fastest route from “what does this word mean
        here” to “where else is this word used”. In a tagged translation, type a number in the
        Bible scope and <strong>Search Strong’s</strong> and <strong>Analyse</strong> rows appear
        above the results; the search box does not switch by itself, since a number may be meant as
        text. Its mode menu switches to <strong>Strong’s</strong> outright, and tapping a word’s
        count in a lexicon entry starts a Strong’s search. In the Modules scope,{' '}
        <strong>Strong’s Key</strong> finds the dictionary entries for a number. Zero padding does
        not matter: <code>H07225</code> and <code>H7225</code> are the same word.
      </p>

      <h2 id="analysis">Analysing a Strong’s number</h2>
      <p>
        An analysis gathers everything a translation’s tags say about one Strong’s number. Open it
        with <strong>Analyse</strong> beside the count of a Strong’s search’s results, from the{' '}
        <strong>Analyse</strong> row a typed number offers, or with <strong>Analyse</strong> in a{' '}
        <Link href="/docs/lexicons">lexicon entry</Link>. It shows:
      </p>
      <ul>
        <li>
          <strong>The word</strong> — its lemma, transliteration and a short gloss; how many times it
          occurs, in how many verses and in how many books; a strip of the whole Bible, a column a
          book, showing where it falls; and about how often it comes in every 1,000 tagged words of
          its language.
        </li>
        <li>
          <strong>Rendered As</strong> — the English the translation uses for it, commonest first,
          as a list or a ring. These are the choices translators made, not the range of what the
          word means; for that, read the lexicon.
        </li>
        <li>
          <strong>By Book</strong> — how many times it occurs in each book, as bars or a ring. In
          the bars, an arrow marks a book that holds more (↑) or fewer (↓) than a book of its length
          would, by a margin chance would rarely give.
        </li>
        <li>
          <strong>Found With</strong> — other words that share its verses. The most certain
          association comes first: a word that shares many verses leads one that shares a few,
          however rare it is. Tap one to analyse it in turn.
        </li>
        <li>
          <strong>Verses</strong> — every verse it occurs in, with the word marked as a search marks
          a match. Tap a rendering or a book to narrow the list, and a verse to preview it with a
          button to open it in the reader.
        </li>
      </ul>
      <p>
        Every figure depends on how that translation was tagged, so two translations can count the
        same word differently.
      </p>
      {isMacAvailable && (
        <>
          <h3>On the Mac</h3>
          <p>
            The analysis opens beside a Strong’s search: choose <strong>Scripture</strong> in the
            toolbar and type a number in the Strong’s field of the filter bar beneath it, or choose{' '}
            <strong>Analyse</strong> when you type a number into the search box. The occurrence list
            sits to its left, and anything you click in the analysis narrows it. Its tabs:
          </p>
          <ul>
            <li>
              <strong>Overview</strong> — the renderings with their variants, the original-language
              forms, and the grammar: part of speech, case, number, tense and so on.
            </li>
            <li>
              <strong>Spread</strong> — a chart as bars, columns in Bible order, a grid of every
              chapter, or a share drawn as a ring or a pie; by book, section, rendering or form;
              counting occurrences or occurrences per 1,000 words. Click a bar or a chapter to see
              its verses.
            </li>
            <li>
              <strong>Companions</strong> — the words found with it, how many verses each shares
              and how many times chance that is.
            </li>
            <li>
              <strong>Compare</strong> — the count and leading renderings in every installed
              translation that tags the number.
            </li>
          </ul>
          <p>
            A deck can chart a Strong’s number too; see{' '}
            <Link href="/docs/presenting">Presenting</Link>.
          </p>
        </>
      )}
    </DocPage>
  )
}
