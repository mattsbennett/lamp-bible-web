import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Lexicons',
  description:
    'Strong’s Hebrew and Greek, Brown-Driver-Briggs, STEPBible’s TBESG and Dodson lookups from any tagged word, plus how to order and hide lexicons.',
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
            <td>~5,500</td>
          </tr>
          <tr>
            <td>Translators Brief Lexicon of Extended Strong’s for Greek (TBESG)</td>
            <td>Greek</td>
            <td>~10,800</td>
          </tr>
          <tr>
            <td>Brown-Driver-Briggs (unabridged)</td>
            <td>Hebrew</td>
            <td>~10,000</td>
          </tr>
          <tr>
            <td>Dodson Greek Lexicon</td>
            <td>Greek</td>
            <td>~5,400</td>
          </tr>
        </tbody>
      </Table>

      <p>
        All five ship inside the app. Strong’s, BDB and Dodson have public-domain source records;
        TBESG is STEPBible’s, under CC BY 4.0, with definitions mostly from Abbott-Smith’s{' '}
        <em>Manual Greek Lexicon of the New Testament</em>, and it covers the Septuagint’s Greek as
        well as the New Testament’s. The exact source and rights basis for each is listed under{' '}
        <Link href="/content-licences">Content licences</Link>.
        A mapping table connects Strong’s Hebrew numbers to their BDB entries, since the two systems
        do not correspond one-to-one — a single Strong’s number can resolve to several BDB entries
        for different words or homographs.
      </p>

      <h2>Looking a word up</h2>
      <p>
        In a Strong’s-tagged translation, tap a word — in the reader, in a commentary or in a book.
        The lexicon view opens on the entry for that word’s Strong’s number, named above the word
        by the lexicon it comes from; swipe to see the same word in each of your other lexicons. A
        count beside the number shows how often it occurs, and tapping it searches for every verse
        that uses it. <strong>Analyse</strong> beside that opens an{' '}
        <Link href="/docs/search#analysis">analysis</Link> of the word: its definition in each
        dictionary, how it is translated, its forms and grammar, where it gathers, the words found
        with it, and how other translations count it.
      </p>
      <p>
        The speaker beside the headword says the word aloud — Greek in the way{' '}
        <strong>Greek Words</strong> in Settings sets, Hebrew from Strong’s own respelling; see{' '}
        <Link href="/docs/reader">The reader</Link>. An entry’s text can be pressed and selected, to
        look up, copy or share a word; a tap on a link still follows it.
      </p>
      <p>An entry can include:</p>
      <ul>
        <li>The lemma in its original script, with transliteration and pronunciation.</li>
        <li>A definition, and for BDB a full article with numbered senses.</li>
        <li>Part of speech, and the word’s morphology code.</li>
        <li>KJV usage — the range of English words used to render it.</li>
        <li>Derivation notes.</li>
        <li>
          Scripture references, which open a preview you can page through, and cross-references to
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
        Hebrew and Greek each have their own lexicon order, set in Settings → Translations &amp;
        Lexicons.
        The default puts Strong’s first, followed by BDB for Hebrew, and by TBESG and then Dodson for Greek. Drag them
        so that the dictionary you actually trust appears first, and swipe to hide the ones you
        never read — hidden lexicons stay installed and searchable, they just stop appearing in
        lookups.
      </p>

      <h2>Adding your own</h2>
      <p>
        Lexicons are dictionary modules. Any dictionary keyed by Strong’s number or by lemma can be
        packaged as a <code>.lamp</code> file and installed alongside the bundled ones; it will then
        appear in the lookup order and in search. The schema, including support for senses and
        annotations, is documented in{' '}
        <Link href="/docs/modules/authoring">Authoring modules</Link>.
      </p>

      <Callout tone="warn" title="Licensing">
        <p>
          The bundled lexicons are public domain, apart from TBESG, which STEPBible publishes under
          CC BY 4.0. Other well-known dictionaries are under copyright, and the module format does
          not grant copying rights. Create a module only when you made the
          content, it is public domain where you use it, or its licence permits the conversion.
          Share it only if you also have redistribution rights.
        </p>
      </Callout>
    </DocPage>
  )
}
