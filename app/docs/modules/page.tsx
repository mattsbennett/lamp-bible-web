import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'The module system',
  description:
    'Every piece of content in Lamp Bible — translations, lexicons, commentaries, books, plans, quizzes, notes, writing and highlights — is a module in the same open format.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/modules"
      title="The module system"
      intro="Install, export and manage modules for your library and personal work."
    >
      <h2>What is a module?</h2>
      <p>
        A module contains a translation, commentary, reading plan or other content. Your notes,
        writing and highlights are modules too. All use the same file format and module manager.
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
            <td>Writing</td>
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
        The module manager is in Settings → <strong>Module Manager</strong>. It lists what is
        installed: first, under <strong>Personal</strong>, My Writing, My Notes and your
        highlight sets, then each type in turn. It filters by type, or by source —{' '}
        <strong>Built In</strong> or <strong>Yours</strong> — and gives a summary of each: verse
        counts, entry counts, how many books a commentary series covers, how many highlights a set
        holds, how many days a plan runs.
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
          <strong>Writing as markdown</strong> — either a folder of files, one piece each, or a
          single file with several.
        </li>
      </ul>
      <p>
        Books import from the <Link href="/docs/books">Books</Link> library, which also accepts a
        book’s source JSON and compiles it on the device. Other module types install from{' '}
        <code>.lamp</code> files only; to turn JSON into one, see{' '}
        <Link href="/docs/modules/building">Building a .lamp file</Link>. Because{' '}
        <code>.lamp</code> is registered as a document type, you can also open a module from Files,
        Mail or a share sheet and it will be handed to the app. Either way, a banner says what came
        in once it is ready to use.
      </p>

      <h3>Creating</h3>
      <p>
        <strong>+</strong> → <strong>Create New Module</strong> makes an empty notes module,
        writing collection or highlight set. Highlight sets ask which translation they belong
        to, since <Link href="/docs/highlights">highlights are translation-specific</Link>. Modules
        can be renamed and their descriptions edited afterwards.
      </p>

      <h3>Exporting</h3>
      <p>
        Notes and writing modules export as markdown from their menu in the manager, for editing
        elsewhere. A single piece of writing also shares through the system share sheet as a{' '}
        <code>.lamp</code> file that carries its media. See{' '}
        <Link href="/docs/import-export">Import &amp; export</Link>.
      </p>

      <h3>Deleting and resetting</h3>
      <p>
        Modules can be deleted individually. My Notes and My Writing cannot be deleted, but{' '}
        <strong>Reset</strong> clears their contents while keeping the module itself. With sync on,
        a deletion or reset reaches your other devices too.
      </p>

      <Callout tone="warn" title="Delete and reset are destructive">
        <p>
          A deleted module and the entries a reset clears are removed from every synced device.
          Export anything you care about first.
        </p>
      </Callout>

      <h2>Next</h2>
      <ul>
        <li>
          <Link href="/docs/modules/import-bible">Importing a Bible</Link> — turn a Bible you
          already own into a translation module, no JSON required.
        </li>
        <li>
          <Link href="/docs/modules/downloads">Downloads</Link> — an installable sample module of
          every type, with its source JSON, the schemas and the table definitions. Use these as examples for your own modules.
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
