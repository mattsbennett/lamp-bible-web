import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'The module system',
  description:
    'Every piece of content in Lamp Bible — translations, lexicons, commentaries, books, plans, quizzes, notes, devotionals and highlights — is a module in the same open format.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/modules"
      title="The module system"
      intro="One container format for everything the app reads and everything you write. This page covers the concepts and day-to-day management; the format itself is documented separately."
    >
      <h2>The idea</h2>
      <p>
        Most Bible apps draw a hard line between <em>their</em> content and <em>your</em> content.
        The translations are library data; your notes are rows in a private database. The two are
        handled by different code, exported by different means, and one of them is usually not
        exportable at all.
      </p>
      <p>
        Lamp Bible does not draw that line. A translation is a module. Your notes are a module. A
        commentary series, a reading plan, a set of highlights, a devotional you wrote last Tuesday —
        all modules, all in the same container, all managed in the same place.
      </p>

      <h2>The nine types</h2>

      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Contains</th>
            <th>Editable</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Translation</td>
            <td>
              Verse text with optional Strong’s numbers, morphology, section headings, footnotes and
              red-letter marking
            </td>
            <td>No</td>
          </tr>
          <tr>
            <td>Dictionary</td>
            <td>Lexicon entries keyed by Strong’s number or lemma, with senses and usage</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Commentary</td>
            <td>
              Exposition keyed to verses or pericopae, grouped into a series with front matter and
              bibliography
            </td>
            <td>No</td>
          </tr>
          <tr>
            <td>Book</td>
            <td>
              A long-form publication in parts, chapters and sections, with footnotes and media —
              see <Link href="/docs/books">Books</Link>
            </td>
            <td>No</td>
          </tr>
          <tr>
            <td>Plan</td>
            <td>Reading assignments across a cycle, with per-day readings</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Quiz</td>
            <td>Age-graded questions tied to a plan’s readings</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>Your verse-keyed study notes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Devotional</td>
            <td>Your long-form documents, with media</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Highlights</td>
            <td>Your highlight spans and colour themes for one translation</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </Table>

      <p>
        Both read-only and editable modules <Link href="/docs/sync">sync</Link>. Conflict resolution
        applies to editable types, since those are the modules the app can change. Read-only types
        are library content — installed, indexed, and otherwise left alone.
      </p>

      <h2>Bundled and installed modules</h2>
      <p>
        Content that ships with the app lives in a single bundled database, unpacked on first
        launch. Everything else — modules you import, modules you create — is a separate{' '}
        <code>.lamp</code> file in the app’s storage. The reader does not distinguish between them:
        a commentary you built yourself appears in the tool panel’s series list next to the ones
        that came with the app. A module you install with the same identifier as a bundled one
        takes its place.
      </p>

      <h2>Managing modules</h2>
      <p>
        The module manager is in Settings → Modules → <strong>Manager</strong>. It lists what is
        installed, grouped by type and filterable by type or by source — bundled or your own — with
        a summary of each: verse counts, entry counts, how many books a commentary series covers,
        how many highlights a set holds, how many days a plan runs.
      </p>

      <h3>Importing</h3>
      <p>
        <strong>+</strong> → <strong>Import Module</strong> accepts four kinds of import:
      </p>
      <ul>
        <li>
          <strong>A <code>.lamp</code> package</strong> — any module type. Its integrity is checked
          first, and if a module with the same identifier is already installed you are asked
          whether to overwrite it.
        </li>
        <li>
          <strong>A Bible you own</strong>, as USFM, OSIS, Zefania, plain XML or a SWORD module —
          see <Link href="/docs/modules/import-bible">Importing a Bible</Link>.
        </li>
        <li>
          <strong>Notes as markdown</strong> — verse-linked study notes, from a single file or a
          folder.
        </li>
        <li>
          <strong>Devotionals as markdown</strong> — either a folder of files, one entry each, or a
          single file with several entries.
        </li>
      </ul>
      <p>
        Books import from the <Link href="/docs/books">Books</Link> library, which also accepts a
        book’s source JSON and compiles it on the device. Other module types install from{' '}
        <code>.lamp</code> files only; to turn JSON into one, see{' '}
        <Link href="/docs/modules/building">Building a .lamp file</Link>. Because{' '}
        <code>.lamp</code> is registered as a document type, you can also open a module from Files,
        Mail or a share sheet and it will be handed to the app.
      </p>

      <h3>Creating</h3>
      <p>
        <strong>+</strong> → <strong>Create New Module</strong> makes an empty notes module,
        devotional collection or highlight set. Highlight sets ask which translation they belong
        to, since <Link href="/docs/highlights">highlights are translation-specific</Link>. Modules
        can be renamed and their descriptions edited afterwards.
      </p>

      <h3>Exporting</h3>
      <p>
        Notes and devotional modules export as markdown from their menu in the manager, for editing
        elsewhere. A single devotional also shares through the system share sheet as a{' '}
        <code>.lamp</code> file that carries its media. See{' '}
        <Link href="/docs/import-export">Import &amp; export</Link>.
      </p>

      <h3>Deleting and resetting</h3>
      <p>
        Modules can be deleted individually. My Notes and My Devotionals cannot be deleted, but{' '}
        <strong>Reset</strong> clears their contents while keeping the module itself. With sync on,
        a deletion or reset reaches your other devices too.
      </p>

      <Callout tone="warn" title="Delete and reset are destructive">
        <p>
          A deleted module and the entries a reset clears are removed from every synced device.
          Export anything you care about first.
        </p>
      </Callout>

      <h2>Why this matters in practice</h2>
      <ul>
        <li>
          <strong>Nothing is trapped.</strong> Everything you write can leave the app as markdown or
          as a package, at any time, without asking anyone.
        </li>
        <li>
          <strong>Content is shareable.</strong> A set of study notes for a book, a highlight scheme
          for a class, a devotional series — each is a file you can send to someone.
        </li>
        <li>
          <strong>The library is extensible.</strong> Anything you have the rights to use can be
          converted into a module and used exactly like built-in content.
        </li>
        <li>
          <strong>Search covers everything.</strong> Because all modules land in the same indexes,
          one query reaches library content and your own writing together.
        </li>
      </ul>

      <h2>Next</h2>
      <ul>
        <li>
          <Link href="/docs/modules/import-bible">Importing a Bible</Link> — turn a Bible you
          already own into a translation module, no JSON required.
        </li>
        <li>
          <Link href="/docs/modules/downloads">Downloads</Link> — an installable sample module of
          every type, with its source JSON, the schemas and the table definitions. The quickest way
          in is to take one apart.
        </li>
        <li>
          <Link href="/docs/modules/building">Building a .lamp file</Link> — the mechanics:
          tables, compression, verification and installation.
        </li>
        <li>
          <Link href="/docs/modules/authoring">Authoring modules</Link> — the data model: verse
          reference encoding, annotations, and the JSON shape of each type.
        </li>
      </ul>
    </DocPage>
  )
}
