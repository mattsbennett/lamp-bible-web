import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'
import { isMacAvailable } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Importing a Bible',
  description:
    'Turn a Bible you already own — USFM, OSIS, Zefania, plain XML or a SWORD module, locked or not — into a Lamp Bible translation module.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/modules/import-bible"
      title="Importing a Bible"
      intro="If you already have a Bible as a file — from a publisher, a Bible society or a SWORD library — Lamp Bible can turn it into a translation module you read like any other."
    >
      <h2>Where to start</h2>
      <p>
        Go to Settings → Modules → Manager → <strong>+</strong> → Import Module →{' '}
        <strong>Import a Bible</strong>, and choose a file, a folder or a zip from Files.
        {isMacAvailable && (
          <>
            {' '}On a Mac, open <strong>Import or Create Content</strong> (⇧⌘M) and choose{' '}
            <strong>Import a Bible</strong>.
          </>
        )}{' '}
        Nothing is installed until you have reviewed what was found.
      </p>

      <Callout tone="warn" title="Only Bibles you have the right to use">
        <p>
          Importing makes a converted copy for your own use. Do it only for a Bible you own or
          whose licence permits that copy. Every imported translation is marked as imported by you,
          for personal use, and sharing it with anyone else needs redistribution rights.
        </p>
      </Callout>

      <h2>Formats</h2>
      <Table>
        <thead>
          <tr>
            <th>Format</th>
            <th>What to choose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>USFM</td>
            <td>
              The folder or zip of book files, as Bible societies and Paratext publish them, or a
              single book file
            </td>
          </tr>
          <tr>
            <td>OSIS XML</td>
            <td>The <code>.osis</code> or <code>.xml</code> file</td>
          </tr>
          <tr>
            <td>Zefania XML</td>
            <td>The <code>.xml</code> file</td>
          </tr>
          <tr>
            <td>Plain XML</td>
            <td>
              A <code>&lt;bible&gt;</code> file of books, chapters and verses, such as Beblia’s
            </td>
          </tr>
          <tr>
            <td>SWORD</td>
            <td>The module’s zip, or its whole folder — not the <code>.conf</code> file on its own</td>
          </tr>
        </tbody>
      </Table>

      <p>
        Text is read as UTF-8, falling back to Windows-1252 for older files. If a folder holds
        USFM alongside XML, the USFM is used.
      </p>

      <h3>SWORD modules</h3>
      <p>
        Lamp Bible reads SWORD Bibles stored as <code>zText</code>, <code>zText4</code>,{' '}
        <code>RawText</code> or <code>RawText4</code> with ZIP compression; marked up in OSIS, ThML,
        GBF or plain text; and numbered the KJV or NRSV way. It explains why when a module is
        outside that — a commentary or dictionary rather than a Bible, BZIP2 compression, Synodal
        verse numbering, TEI markup — rather than importing something broken.
      </p>

      <h3>Locked SWORD modules</h3>
      <p>
        Some SWORD Bibles are sold locked, with an unlock key sent on purchase. When you import
        one, the app asks for that key, and shows where to get one if the module says. A wrong key
        is caught and you are asked again. The key is used once to unlock the text and is not
        stored; the result is an ordinary translation module.
      </p>

      <h2>The review</h2>
      <p>Before anything is installed, a review shows:</p>
      <ul>
        <li>
          What was found — <em>66 books, 1,189 chapters and 31,102 verses</em> — and the format it
          came from.
        </li>
        <li>
          The <strong>Name</strong>, <strong>Abbreviation</strong> and <strong>Language</strong>,
          filled in from the file. Change them here.
        </li>
        <li>
          <strong>Not imported as written</strong>: anything left out or changed, such as books
          outside the 66, verses that appear twice, bridged verses kept under their first number,
          and formatting the app does not know, whose words are kept.
        </li>
        <li>The copyright line the file carries.</li>
      </ul>
      <p>
        Nothing in that list blocks an import; it is there so you know exactly what you are
        getting.
      </p>

      <h3>Replacing an earlier import</h3>
      <p>
        Importing a Bible with the same abbreviation as one you imported before replaces it, and
        the button says <strong>Replace</strong>. A bundled translation is never replaced: if your
        abbreviation matches one, the import is installed alongside it.
      </p>

      <h2>What carries over</h2>
      <Table>
        <thead>
          <tr>
            <th>Kept</th>
            <th>Not kept</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Verse text, headings, paragraphs and poetry; words of Christ; supplied words; the
              divine name; Selah; Strong’s numbers and morphology; translators’ footnotes
            </td>
            <td>
              Cross-references; books outside the 66, such as the deuterocanon; introductions and
              other front and back matter
            </td>
          </tr>
        </tbody>
      </Table>
      <p>
        Verse numbers are kept as the file has them, not remapped to another versification. A
        translation with Strong’s numbers supports{' '}
        <Link href="/docs/lexicons">word lookups</Link> and Strong’s search like the bundled ones.
      </p>

      <h2>After import</h2>
      <p>
        The translation appears in the translation picker and in search. It is a module like any
        other you installed, so it syncs to your own storage if sync is on — see{' '}
        <Link href="/docs/sync">Sync &amp; backup</Link>. That copy is not encrypted, even if the
        original module was locked.
      </p>
    </DocPage>
  )
}
