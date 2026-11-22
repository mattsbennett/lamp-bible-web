import type { Metadata } from 'next'
import Link from 'next/link'
import { Platform } from '@/components/docs/Platform'
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
        Bundled content is unpacked into one database on first launch. Imported and created
        modules are separate <code>.lamp</code> files. Both appear together in the reader and study
        tools. Installing a module with a bundled module’s identifier replaces that module.
      </p>

      <Platform only="ios">
        <h2>On iPhone and iPad</h2>
        <p>
          Open Settings → <strong>Module Manager</strong>. Personal content appears first:
          My Writing, My Notes and highlight sets, followed by other module types. Filter by type
          or source (<strong>Built In</strong> or <strong>Yours</strong>). Each module shows relevant
          counts, such as verses, entries, commentary books, highlights or plan days, and its menu’s{' '}
          <strong>Info</strong> shows its kind, language, licence, contents and source, with its
          identifier, file and hash under <strong>Developer Details</strong>.
        </p>
        <p>
          With sync on, a module your library lists but the server does not have is marked{' '}
          <strong>Not in Your Library</strong>, with an option to delete it. One the app could not
          check is marked <strong>Could Not Be Checked</strong> or{' '}
          <strong>Not Checked Just Now</strong>. Nothing is deleted without you.
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
          The <Link href="/docs/books">Books</Link> library imports <code>.lamp</code> files and
          compiles book JSON on the device. Other module types require <code>.lamp</code> files;
          see <Link href="/docs/modules/building">Building a .lamp file</Link> to compile JSON.
          You can also open modules from Files, Mail or a share sheet. A banner confirms the import.
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
      </Platform>

      <Platform only="mac">
        <h2>On the Mac</h2>
        <p>
          Open <strong>Modules</strong> in the sidebar to see installed content. My Writing, My Notes
          and My Highlights appear first, followed by other module types; the chips under the title
          show one kind at a time. Every module’s menu has <strong>Get Info</strong>, which opens its
          details with a <strong>Technical Details</strong> section, and modules you added also have{' '}
          <strong>Export Module…</strong> and <strong>Remove Module…</strong>. With sync on, a module
          missing from the server is marked <strong>Not in Your Library</strong>, and{' '}
          <strong>Delete…</strong> is offered only when Lamp knows it is gone. Export formats include <code>.lamp</code> and, for books,
          writing and notes, markdown. Bundled modules are labelled <strong>Built In</strong>.{' '}
          <strong>Import or Create Content</strong> (⇧⌘M) offers:
        </p>
        <ul>
          <li>
            <strong>Install Module</strong> — one or more <code>.lamp</code> files.
          </li>
          <li>
            <strong>Import a Bible</strong> — a USFM, OSIS, Zefania or XML Bible, or a SWORD module,
            you own. See <Link href="/docs/modules/import-bible">Importing a Bible</Link>.
          </li>
          <li>
            <strong>Create Module</strong> — drop module JSON in, and the app identifies its type,
            validates it against the schema and lists any problems. <strong>Build .lamp</strong>{' '}
            compiles it, checks the result’s integrity and shows its SHA-256, ready to show in
            Finder or install. Every module type can be built, books included. See{' '}
            <Link href="/docs/modules/authoring">Authoring modules</Link>.
          </li>
          <li>
            <strong>Import Personal Content</strong> — notes or writing from markdown, or notes and
            highlights from JSON or <code>.lamp</code>.
          </li>
        </ul>
        <p>
          Double-clicking a <code>.lamp</code> or <code>.lampdeck</code> file in Finder opens it in
          Lamp Bible too.
        </p>
      </Platform>

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
