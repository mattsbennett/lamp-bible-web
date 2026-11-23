import type { Metadata } from 'next'
import Link from 'next/link'
import { Platform } from '@/components/docs/Platform'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Long-form writing in Lamp Bible: a visual and markdown editor with scripture quotes, footnotes, tables, images and recorded audio, plus present mode, sharing and markdown export.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/writing"
      title="Writing"
      intro="Write devotionals, studies, prayers and talks with scripture links, footnotes and media."
    >
      <h2>Writing versus notes</h2>
      <p>
        <Link href="/docs/notes">Notes</Link> attach to verses or chapters. Writing is for standalone
        documents with linked scripture references.
      </p>

      <h2>Metadata</h2>
      <p>Use these fields to organise and find your writing:</p>
      <ul>
        <li>
          <strong>Title and subtitle</strong>, and an author name.
        </li>
        <li>
          <strong>Date</strong> — the date you assign it, not just when the file was written.
        </li>
        <li>
          <strong>Category</strong> — one to a piece. Choose Devotional, Exhortation, Reflection,
          Study or Prayer, or one you have used before, or name your own — on iPhone and iPad with{' '}
          <strong>Custom…</strong> at the end of the list.
        </li>
        <li>
          <strong>Tags</strong>, which become filters in the library and in{' '}
          <Link href="/docs/search">search</Link>.
        </li>
        <li>
          <strong>Series</strong> and <strong>key scriptures</strong> — the passages the piece is
          built on, stored as real verse references and shown at the top. These come from a markdown
          or file import, or from the Mac, which edits them.
        </li>
      </ul>

      <h2>Footnotes</h2>
      <p>
        Footnotes are numbered in order of first reference. Markdown labels such as{' '}
        <code>[^1]</code>, <code>[^lewis]</code> and <code>[^2a]</code> are preserved; only the
        displayed numbers change. Repeated markers link to the same note.
      </p>

      <Platform only="ios">
        <h2>On iPhone and iPad</h2>

        <h3>The library</h3>
        <p>
          Open <strong>Write</strong> on the home screen. Search a collection by title, subtitle
          or tag, and sort by date, title or last change. The menu offers filters for tag, category
          and date, <strong>Slide Decks</strong>, export and <strong>Import Writing</strong>, which
          takes markdown files or whole folders, shown for{' '}
          <Link href="/docs/import-export#writing-import">review</Link> before anything changes, or{' '}
          <code>.lamp</code> files. Pull down the list to sync.
        </p>
        <p>
          A collection is a <Link href="/docs/modules">module</Link>. You start with My Writing;
          create more in the module manager and switch collections from the library’s title menu.
        </p>

        <h3>The editor</h3>
        <p>
          A piece has five modes, chosen from the button at the bottom of the screen, which
          shows the mode you are in:
        </p>
        <Table>
          <thead>
            <tr>
              <th>Mode</th>
              <th>For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Read</td>
              <td>Reading it back, with its own text size; web and email addresses are links</td>
            </tr>
            <tr>
              <td>Visual Edit</td>
              <td>Writing with a formatting toolbar</td>
            </tr>
            <tr>
              <td>Markdown Edit</td>
              <td>Typing the markdown directly</td>
            </tr>
            <tr>
              <td>Present</td>
              <td>Delivering it — see below</td>
            </tr>
            <tr>
              <td>Edit Metadata</td>
              <td>Title, author, date, category and tags</td>
            </tr>
          </tbody>
        </Table>
        <p>
          The editor stores your original markdown and preserves it when you switch editing modes. Edits save a few seconds after you stop typing,
          and an icon in the toolbar shows when they have synced. The app never saves over a newer
          copy: if the piece changed on another device or by the assistant while you were editing,
          your edits are kept as a separate piece, “<em>title</em> (your edits)”.
        </p>

        <h3>Other files</h3>
        <p>
          A piece written on the Mac can keep other files beside it, such as an outline, notes or
          sources. They sync to iPhone and iPad, where the <strong>Files</strong> button in the
          bottom bar opens them in any mode. A Markdown file opens in the piece’s own editor, so it
          reads exactly as the piece does, with its links, footnotes and pictures; tap{' '}
          <strong>Edit</strong> to change it, or <strong>More</strong> →{' '}
          <strong>Edit Markdown Source</strong> to edit it as written. A file you open and leave is never rewritten, and if it
          changes on another device while you edit, you can keep yours as a copy. A plain-text file
          opens in its own reader. <strong>Add File</strong> creates one; deleting one deletes it on
          your other devices too.
        </p>

        <h3>Asking the assistant</h3>
        <p>
          With AI features on and an iPhone or iPad{' '}
          <Link href="/docs/ai#paired-devices">paired with your Mac</Link>, the speech-bubble button
          in a piece’s bottom bar opens <strong>Ask the Assistant</strong>. The assistant works on the
          piece in Lamp Bible on your Mac, with any words you selected. Your latest edits are sent
          first, and what it changes arrives with your library’s next sync. The row over the field
          names who answers; tap it to choose the provider, model and effort.
        </p>
        <p>
          With <strong>Mark the assistant’s changes for review</strong> on in Settings → AI
          Features, the passages it changed stay marked until you have read them. Tap ✓ beside a
          paragraph to clear its marks. The bottom bar counts what is left, with{' '}
          <strong>Mark Selection as Reviewed</strong>, <strong>Mark All as Reviewed</strong>,{' '}
          <strong>Next Change</strong>, <strong>Previous Change</strong> and{' '}
          <strong>Restore Original Wording</strong>, which shows the original before putting it
          back. Marks are drawn while you edit, in Visual Edit and in a piece’s other files;
          reading shows the piece as it reads. If some changes can’t be shown, the count says so;
          they are still counted, and Mark All as Reviewed clears them too. See{' '}
          <Link href="/docs/ai#review">Reviewing the assistant’s changes</Link>.
        </p>

        <h3>What the visual editor offers</h3>
        <Table>
          <thead>
            <tr>
              <th>Element</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Paragraphs and headings</td>
              <td>Three heading levels, for structuring a talk</td>
            </tr>
            <tr>
              <td>Bold and italic</td>
              <td>Strikethrough and inline code by markdown shortcut</td>
            </tr>
            <tr>
              <td>Lists</td>
              <td>Bulleted or numbered, with indent and outdent for nesting</td>
            </tr>
            <tr>
              <td>Scripture quote</td>
              <td>A passage from a chosen translation, with its citation</td>
            </tr>
            <tr>
              <td>Regular quote</td>
              <td>An ordinary blockquote for other sources</td>
            </tr>
            <tr>
              <td>Divider</td>
              <td>A break between sections</td>
            </tr>
            <tr>
              <td>Table</td>
              <td>Up to ten rows and six columns, with an optional header row</td>
            </tr>
            <tr>
              <td>Link</td>
              <td>A web address, a scripture reference, or a Strong’s number</td>
            </tr>
            <tr>
              <td>Footnote</td>
              <td>Inserted at the cursor — see below</td>
            </tr>
            <tr>
              <td>Image</td>
              <td>From your photo library, the camera, or Files</td>
            </tr>
            <tr>
              <td>Audio</td>
              <td>Recorded in the app, or imported from Files</td>
            </tr>
          </tbody>
        </Table>
        <p>
          The formatting bar groups text styles, headings, indentation, bold and italic, lists,
          quotes and links. Use <strong>+</strong> to insert footnotes, dividers, tables, images or audio.
        </p>

        <h3>Inserting scripture</h3>
        <p>
          Choose <strong>Scripture Quote</strong>, then select a translation, book, chapter and
          verse range. Choose whether to include verse numbers and preview the quotation before
          inserting it with its citation. To cite a passage without quoting it, insert a scripture{' '}
          <strong>Link</strong>. In Read and Present modes, the link opens a passage preview.
        </p>

        <h3>Footnotes</h3>
        <p>
          <strong>Footnote…</strong> adds a marker at the cursor and its note in one step, so a single
          Undo removes both. While editing, tap a marker to jump to its note, and tap the note’s
          number to return. Notes can run to several lines and carry bold, italic and links.
        </p>

        <h3>Images and audio</h3>
        <p>
          Images retain their full resolution; tap one to view it full screen. Choose{' '}
          <strong>Record Audio</strong> to record with a timer and live waveform. Recordings use AAC;
          imports support M4A, MP3, WAV and AAC. Tap an audio block to play or pause.
        </p>

        <h3>Present mode</h3>
        <p>
          Present mode enlarges the text by a multiplier you choose, adds line spacing and hides
          footnotes and links. Reading and presenting text sizes are independent of the Bible reader’s.
        </p>
        <Callout title="Slides">
          <p>
            After a Mac-created deck syncs, its writing shows a <strong>Slides</strong> button on
            iPhone and iPad. Tap it to view the deck. See{' '}
            <Link href="/docs/presenting">Slides &amp; presenting</Link>.
          </p>
        </Callout>

        <h3>Sharing</h3>
        <p>
          <strong>Share Writing File</strong> sends a piece through the system share sheet as
          a <code>.lamp</code> file. There are two forms, chosen automatically:
        </p>
        <ul>
          <li>
            <strong>Plain</strong> — a single JSON document, for a piece with no media.
          </li>
          <li>
            <strong>Bundled</strong> — a ZIP package carrying the document and its images and audio
            together.
          </li>
        </ul>
        <p>
          <strong>Share as Markdown</strong> sends text only. Open a shared <code>.lamp</code> file
          to preview it in Lamp and choose a destination collection. If the file contains a collection,
          all entries are imported.
        </p>

        <Callout title="Also plain markdown">
          <p>
            Collections export to markdown, one file per piece or a single combined file, with
            media in an accompanying folder. See{' '}
            <Link href="/docs/import-export">Import &amp; export</Link>.
          </p>
        </Callout>

        <h3>Reading them beside the text</h3>
        <p>
          The reader’s tool panel lists your writing collections by name, My Writing first, so a
          piece you wrote — or one someone shared with you — can sit alongside the passage it
          discusses.
        </p>
      </Platform>

      <Platform only="mac">
        <h2>On the Mac</h2>
        <p>
          On the Mac, <strong>Edit</strong> (⇧⌘E) opens a writing in place in the main window, and
          the sidebar folds away while you work; <strong>Done</strong> at the end of the toolbar, or
          ⇧⌘E again, returns to the list. The list stays beside the editor until the Assistant opens,
          then folds behind <strong>List</strong>. A new writing (⇧⌘N) opens the same way, or in a
          window of its own when no library window is in front. Beyond what the iPhone and iPad
          editor does, the Mac editor adds:
        </p>
        <ul>
          <li>
            <strong>Visual and Markdown</strong> editing, switchable at any time, with a word count
            and silent and read-aloud reading times in the status bar.
          </li>
          <li>
            <strong>Find and replace</strong> — ⌘F, ⌥⌘F — in either mode. <strong>Aa</strong> and{' '}
            <strong>ab</strong> in the find field turn on Match Case and Whole Words, and are filled
            in while they are on.
          </li>
          <li>
            <strong>Details</strong>: title, subtitle, author, date, tags, category, series and
            order, key scriptures, a summary, and footnotes kept in a field of their own.
          </li>
          <li>
            The <strong>Insert</strong> menu in the format bar: <strong>Scripture Link</strong>, for
            the verse selected in the reader; <strong>Footnote</strong>, each edited in a small
            panel beside its marker, with <strong>Remove</strong> taking the marker and note
            together; and <strong>Image or Audio File…</strong> and <strong>Record Audio…</strong>.
          </li>
          <li>
            <strong>Revision History</strong>, to undo a change or restore an earlier version.
          </li>
          <li>
            Create companion files, such as outlines or research notes, with{' '}
            <strong>Workspace → New Markdown File…</strong> or <strong>+</strong> in the tab bar.
            They open beside <strong>Main Prose</strong>, which is always first. The tab bar appears
            when you add a file. A dot marks unsaved changes; files you opened can be closed from their tabs.
          </li>
          <li>
            The <strong>Assistant</strong>, an AI agent beside the draft once AI features are on, with
            the passages it changed
            marked until you have read them — see <Link href="/docs/ai">AI features</Link> and{' '}
            <Link href="/docs/ai#review">Reviewing the assistant’s changes</Link>.
          </li>
        </ul>
        <p>
          Writing saves automatically after you stop typing; File → Save (⌘S) saves immediately. The
          Writing list has a search field, category chips with counts and{' '}
          <strong>Sort and Group</strong>; each row shows an excerpt, the date and the reading time.
          The preview shows a writing in the editor’s own page, read-only, so it reads exactly as it
          does while you write it, with footnotes where they stand and web and email addresses as
          links. A line above the title gives the category, author, date and reading time, and a
          menu of the writing’s files: choose <strong>Main Prose</strong>, the outline, the notes or
          another file to read it in place. Press ⌘F to search what the preview shows. Controls
          above the preview navigate between documents, open the editor, share markdown and change
          text appearance. <strong>Hide Writing List</strong> expands the preview;{' '}
          <strong>Present</strong> displays it full screen.
        </p>
        <p>
          If a newer version arrives from another device while a writing is open, it is shown at once
          unless you have typed since. If you have, your edits are kept as a separate writing, “
          <em>title</em> (your edits)”, and <strong>Open Your Edits</strong> in the status bar opens
          it.
        </p>
        <p>
          Export one document as a <code>.lamp</code> file from its menu, or a collection as
          markdown from Modules. Deleting a document also deletes its linked decks; Lamp lists them
          before confirming deletion.
        </p>
      </Platform>
    </DocPage>
  )
}
