import type { Metadata } from 'next'
import Link from 'next/link'
import { Platform } from '@/components/docs/Platform'
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
      intro="Look up Hebrew and Greek words and choose which lexicon opens first."
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
        All five lexicons are included. Strong’s, BDB and Dodson use public-domain sources.
        STEPBible publishes TBESG under CC BY 4.0, with definitions mostly from Abbott-Smith’s{' '}
        <em>Manual Greek Lexicon of the New Testament</em>. It covers both New Testament and
        Septuagint Greek. See <Link href="/content-licences">Content licences</Link> for sources and terms.
      </p>
      <p>
        A mapping table links Hebrew Strong’s numbers to BDB entries. One number may link to
        several entries for different words or homographs. The mapping uses the Open Scriptures
        Hebrew Bible Project’s pairs, matched by machine to the bundled BDB.
      </p>

      <h2>What an entry holds</h2>
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
          BDB entries link to other entries and scripture passages. Use the reader’s{' '}
          <Link href="/docs/reader">history list</Link> to return to earlier passages.
        </p>
      </Callout>

      <Platform only="ios">
        <h2>On iPhone and iPad</h2>

        <h3>Looking a word up</h3>
        <p>
          Tap a tagged word in the reader, commentary or a book to open its lexicon entry. The
          lexicon’s name appears above the word; swipe to compare other lexicons. Tap the occurrence
          count to find its verses, or <strong>Analyse</strong> for{' '}
          <Link href="/docs/search#analysis">definitions, renderings, forms, grammar and usage statistics</Link>.
        </p>
        <p>
          Tap the speaker to hear the headword. Greek pronunciation follows the{' '}
          <strong>Greek Words</strong> setting; Hebrew uses Strong’s respelling. See{' '}
          <Link href="/docs/reader">The reader</Link>. Press and select text to look up, copy or share
          it, or tap a link to follow it.
        </p>
        <h3>Ordering and hiding</h3>
        <p>
          Hebrew and Greek each have their own lexicon order, set in Settings → Translations &amp;
          Lexicons.
          The default puts Strong’s first, followed by BDB for Hebrew, and by TBESG and then Dodson for Greek. Drag them
          to put your preferred dictionary first. Swipe to hide a lexicon from lookups; it stays
          installed and searchable.
        </p>
      </Platform>

      <Platform only="mac">
        <h2>On the Mac</h2>
        <p>
          Hover over a tagged word to see its Strong’s number at the bottom of the window. Click
          to open the Dictionary tab, where you can also search by word, lemma or Strong’s number.
          Use the speaker for pronunciation or <strong>Analyse</strong> for{' '}
          <Link href="/docs/search#analysis">word analysis</Link> beside the passage. Lexicon order
          and visibility sync with iPhone and iPad. See{' '}
          <Link href="/docs/reader#on-the-mac">The reader on the Mac</Link>.
        </p>
      </Platform>

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
