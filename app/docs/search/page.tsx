import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Search',
  description:
    'Full-text search across translations, lexicons, commentaries, books, notes, devotionals and highlights, with filters for module, tag, Strong’s number and colour.',
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
    </DocPage>
  )
}
