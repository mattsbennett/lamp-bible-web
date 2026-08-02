import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Lexicons',
  description:
    'Strong’s Hebrew and Greek, Brown-Driver-Briggs and Dodson lookups from any tagged word, plus how to order and hide lexicons.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/lexicons"
      title="Lexicons"
      intro="Word-level lookups from tagged translations, and how to control which dictionary answers first."
    >
      <h2>What is included</h2>

      <Table>
        <thead>
          <tr>
            <th>Lexicon</th>
            <th>Language</th>
            <th>Entries</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Strong’s Hebrew Dictionary</td>
            <td>Hebrew</td>
            <td>~8,700</td>
          </tr>
          <tr>
            <td>Strong’s Greek Dictionary</td>
            <td>Greek</td>
            <td>~5,600</td>
          </tr>
          <tr>
            <td>Brown-Driver-Briggs (unabridged)</td>
            <td>Hebrew</td>
            <td>~10,000</td>
          </tr>
          <tr>
            <td>Dodson Greek Lexicon</td>
            <td>Greek</td>
            <td>~5,500</td>
          </tr>
        </tbody>
      </Table>

      <p>
        All four are public domain and ship inside the app. A mapping table connects Strong’s Hebrew
        numbers to their BDB entries, since the two systems do not correspond one-to-one — a single
        Strong’s number can resolve to several BDB entries for different words or homographs.
      </p>

      <h2>Looking a word up</h2>
      <p>
        In a Strong’s-tagged translation, tap a word. The lexicon view opens on the entry for that
        word’s Strong’s number, and you can page through the other entries reachable from the same
        passage without going back to the text.
      </p>
      <p>An entry can include:</p>
      <ul>
        <li>The lemma in its original script, with transliteration and pronunciation.</li>
        <li>A definition, and for BDB a full article with numbered senses.</li>
        <li>Part of speech and morphology.</li>
        <li>KJV usage — the range of English words used to render it.</li>
        <li>Derivation notes.</li>
        <li>
          Scripture references, which are live links back into the reader, and cross-references to
          other lexicon entries.
        </li>
      </ul>

      <Callout title="Following a chain">
        <p>
          BDB definitions cross-reference other BDB entries, and those entries cite verses. Because
          both are links, a lookup can turn into a chain of entries and passages — the reader’s{' '}
          <Link href="/docs/reader">history list</Link> is how you get back.
        </p>
      </Callout>

      <h2>Ordering and hiding</h2>
      <p>
        Hebrew and Greek each have their own lexicon order, set in Settings. The default puts
        Strong’s first, followed by BDB for Hebrew and Dodson for Greek. Reorder them so that the
        dictionary you actually trust appears first, and hide the ones you never read — hidden
        lexicons stay installed and searchable, they just stop appearing in lookups.
      </p>

      <h2>Adding your own</h2>
      <p>
        Lexicons are dictionary modules. Any dictionary keyed by Strong’s number or by lemma can be
        packaged as a <code>.lamp</code> file and installed alongside the bundled ones; it will then
        appear in the lookup order and in search. The schema, including support for senses,
        annotations and inline media, is documented in{' '}
        <Link href="/docs/modules/authoring">Authoring modules</Link>.
      </p>

      <Callout tone="warn" title="Licensing">
        <p>
          The bundled lexicons are public domain. Other well-known dictionaries are not, and
          redistributing them is not something the module format makes lawful — build private
          modules for texts you have the right to use.
        </p>
      </Callout>
    </DocPage>
  )
}
