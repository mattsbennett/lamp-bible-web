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
            <td>Commentary text, resolved back to the section or pericope it belongs to</td>
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
        </tbody>
      </Table>
      <p>Reading plans and quizzes are left out because they have their own screens.</p>

      <h2>Filters</h2>
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
            <td>Words starting with it — love, loved, lovingkindness</td>
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
        There are no operators: <code>AND</code>, <code>OR</code> and <code>NOT</code> are searched
        as ordinary words. Bible searches run when you press Search and need at least two
        characters.
      </p>

      <h3>Results</h3>
      <ul>
        <li>Text results are ranked by relevance, with the match highlighted in a snippet.</li>
        <li>
          Tap a result to preview it. The preview’s context — one verse, three, or the whole
          chapter — is adjustable, and a button takes you to the passage.
        </li>
        <li>
          Results load a hundred at a time; <strong>Load More Results</strong> extends the list.
        </li>
        <li>
          <strong>Recent Searches</strong> keeps your last twenty searches that found something, for
          each scope, on this device. They can be cleared.
        </li>
      </ul>

      <h3>Searching by Strong’s number</h3>
      <p>
        Type a number such as <code>H430</code> or <code>G2316</code> in the Bible scope and the
        search switches to Strong’s, finding every verse in the translation tagged with it — the
        fastest route from “what does this word mean here” to “where else is this word used”. In the
        Modules scope, <strong>Strong’s Key</strong> finds the dictionary entries for a number. Zero
        padding does not matter: <code>H07225</code> and <code>H7225</code> are the same word.
      </p>

      <h2 id="analysis">Analysing a Strong’s number</h2>
      <p>
        An analysis gathers everything a translation’s tags say about one Strong’s number. Open it
        with <strong>Analyse</strong> beside the count of a Strong’s search’s results, or with the
        chart button beside the occurrence count in a{' '}
        <Link href="/docs/lexicons">lexicon entry</Link>. It shows:
      </p>
      <ul>
        <li>
          <strong>The word</strong> — its lemma, transliteration and a short gloss, how many times it
          occurs in how many verses, and how often per 1,000 tagged words of its language.
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
            The analysis opens beside a Strong’s search: choose <strong>Scripture</strong> and type
            a number in the <strong>Strong’s key</strong> field in the toolbar, or choose{' '}
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
