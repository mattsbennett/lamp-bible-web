import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Search',
  description:
    'Full-text search across translations, lexicons, commentaries, notes, devotionals and highlights, with filters for type, series, tag, Strong’s number and colour.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/search"
      title="Search"
      intro="One index over everything installed — the text you read and the text you wrote."
    >
      <h2>What gets searched</h2>
      <p>
        Search covers six module types at once. Reading plans and quizzes are excluded because they
        have their own interfaces.
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
            <td>Definitions, glosses and usage — or directly by key or lemma</td>
          </tr>
          <tr>
            <td>Commentaries</td>
            <td>Commentary text, resolved back to the section or pericope it belongs to</td>
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

      <h2>Filters</h2>
      <p>Results are grouped by type and can be narrowed before or after searching:</p>
      <ul>
        <li>
          <strong>Module type</strong> — restrict to translations only, notes only, and so on.
        </li>
        <li>
          <strong>Specific modules</strong> — search one commentary series or one dictionary rather
          than all of them.
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
          <Link href="/docs/highlights">highlight theme</Link>, filtering by that colour effectively
          gives you a list of every promise you have marked while reading.
        </p>
      </Callout>

      <h2>Query behaviour</h2>
      <ul>
        <li>
          Queries run against SQLite full-text indexes, so multi-word searches match on all terms.
        </li>
        <li>
          Results carry a snippet with the match in context; the amount of surrounding context is
          adjustable from a preview control.
        </li>
        <li>
          Results load in pages — a <strong>Load more</strong> control extends the list rather than
          fetching thousands of rows at once.
        </li>
        <li>Recent searches are kept for quick reuse, and can be cleared.</li>
      </ul>

      <h3>Searching by Strong’s number</h3>
      <p>
        Entering a Strong’s number searches two ways: it finds the dictionary entries for that
        number, and it finds every verse in the current translation tagged with it. That is the
        fastest route from “what does this word mean here” to “where else is this word used”.
      </p>
    </DocPage>
  )
}
