import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Sync & backup',
  description:
    'Local-only storage, iCloud Drive, or your own WebDAV server — what syncs, how conflicts and deletions are handled, and moving a library from an earlier version.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/sync"
      title="Sync & backup"
      intro="Keep your library on one device or share it across devices using iCloud Drive or WebDAV."
    >
      <h2>The three options</h2>

      <Table>
        <thead>
          <tr>
            <th>Sync Method</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Local Only</td>
            <td>
              The default. Nothing leaves the device and no cloud storage of any kind is used.
            </td>
          </tr>
          <tr>
            <td>iCloud Drive</td>
            <td>
              Your library is stored in a Lamp Bible folder in your own iCloud Drive, visible in the
              Files app.
            </td>
          </tr>
          <tr>
            <td>WebDAV</td>
            <td>
              Your library is stored on a server you run or rent — Nextcloud, ownCloud, Synology, or
              another WebDAV-compatible server.
            </td>
          </tr>
        </tbody>
      </Table>

      <p>
        Choose in Settings under <strong>Sync</strong>. There is no Lamp Bible account and no Lamp
        Bible server. Even with sync switched on, the only parties involved are you and the storage
        you chose.
      </p>
      <p>
        On a Mac, Settings → Sync offers <strong>iCloud Drive or Folder</strong> — choose the same
        Lamp Bible folder in iCloud Drive that your iPhone uses — or WebDAV with the same server
        address. See <Link href="/docs/mac">The Mac app</Link> for how sync differs there.
      </p>

      <h2>What syncs</h2>
      <ul>
        <li>
          Your <Link href="/docs/notes">notes</Link> with their pictures,{' '}
          your <Link href="/docs/writing">writing</Link> with its images and audio, and every{' '}
          <Link href="/docs/highlights">highlight set</Link> with its themes.
        </li>
        <li>Reading plan progress, and which plans you follow.</li>
        <li>
          Your settings: translation and text size, hidden translations and lexicons, lexicon order,
          word hints, highlight colours, reading rate, reminder, how many readers share a plan,
          quiz age group, writing text size, and whether AI features are shown.
        </li>
        <li>
          Modules you imported yourself — translations, dictionaries, commentaries, books, plans and
          quizzes, including Bibles you <Link href="/docs/modules/import-bible">imported</Link> — and
          reading plans you <Link href="/docs/reading-plans#making-a-plan">made</Link>.
        </li>
        <li>Slide decks made on a Mac, which iPhone and iPad receive to view.</li>
        <li>
          Each writing’s agent workspace on the Mac — companion files, context, skills, revisions
          and the agent conversation.
        </li>
      </ul>

      <p>The following stay on each device:</p>
      <ul>
        <li>Bundled modules, which every install already has.</li>
        <li>Your WebDAV password and the choice of sync method.</li>
        <li>
          Search and navigation history, where you are in each book, the active highlight set and
          style, the read-aloud voice and how Greek words are said, the reader’s typeface and line
          spacing, the tool panel’s position, and what a word analysis’s card shows.
        </li>
      </ul>

      <h2>How it runs</h2>
      <p>
        Sync runs when the app opens and each time you return to it, a few seconds after you stop
        editing, and once more as you leave it if anything is waiting to go. While the app is open it
        also checks every half-minute for changes from your other devices. <strong>Sync Now</strong>{' '}
        starts a sync and reports any errors.
      </p>
      <p>
        Sync works file by file. One file that fails — a server timeout, say — is reported, and the
        rest still sync. While you are writing, an icon in the Notes panel header and in the
        writing editor shows whether your latest change has left the device: synced, syncing,
        waiting to sync, or unavailable — or, with sync off, that it is saved on this device alone.
      </p>

      <h3>What is in the folder</h3>
      <p>
        The library is ordinary files, which you can see in the Files app or on your server. Each
        file is a compressed <code>.lamp</code> <Link href="/docs/modules">module</Link>:
      </p>
      <pre>
        <code>{`Lamp Bible/
├── lamp-bible.lampsync      settings, progress, and the list of library files
├── Notes/notes.lamp         My Notes
├── Devotionals/             your writing collections
├── DevotionalMedia/         their images and audio
├── NoteMedia/               pictures in notes, by notes module
├── Highlights/              one file per highlight set
├── Translations/            modules you imported, by type
├── Dictionaries/
├── Commentaries/
├── Books/
├── BookMedia/               images in the books you imported
├── Plans/
├── Quizzes/
└── Workspaces/              slide decks and other Mac workspace files`}</code>
      </pre>
      <Callout tone="warn" title="Leave the folder to the app">
        <p>
          Files are compressed, not encrypted, and the app keeps a list of what belongs. Add modules
          through the app rather than by copying them in, and do not edit the files by hand.
        </p>
      </Callout>

      <h2>Setting up WebDAV</h2>
      <p>
        WebDAV needs a server URL, a username and a password. The folder at that URL must already
        exist. <strong>Test Connection</strong> checks the details before you switch; afterwards,
        Settings shows whether the server is connected. The password is kept in the Keychain and
        never synced.
      </p>
      <p>
        The server must support the standard methods — <code>PROPFIND</code>, <code>GET</code>,{' '}
        <code>HEAD</code>, <code>PUT</code>, <code>DELETE</code> and <code>MKCOL</code> — with
        conditional writes, and Basic authentication. Nextcloud, ownCloud and Synology all do.
        For Synology servers, Lamp waits for uploaded files to appear before retrying.
      </p>

      <Callout title="Use HTTPS">
        <p>
          Your password and your library travel over the connection you configure, and the files on
          the server are not encrypted. Point the app at an HTTPS address on a server you trust.
        </p>
      </Callout>

      <h2>Switching method</h2>
      <p>Changing the sync method asks what to do with what is already on this device:</p>
      <ul>
        <li>
          <strong>Migrate</strong> — keep your library and send it to the new location on the
          first sync there: notes, writing, highlights, their media, and your settings. It is
          merged with any library already there, and nothing on the server is removed. Modules you
          imported earlier stay installed on this device but are not copied across, so import them
          again if your other devices need them. Migrating to Local Only simply keeps your library
          on the device.
        </li>
        <li>
          <strong>Switch Only</strong> — start fresh. After a second confirmation,{' '}
          <strong>Wipe &amp; Switch</strong> deletes your notes, writing and highlights from
          this device, then switches.
        </li>
      </ul>

      <Callout tone="warn" title="Local data will be deleted">
        <p>
          Wipe &amp; Switch deletes local data rather than archiving it, even when the new method is
          Local Only. Export anything you are unsure about first.
        </p>
      </Callout>

      <h2>Conflicts</h2>
      <p>
        Notes and writing merge entry by entry, so editing two different notes on two devices
        never collides. When the same entry changed on both, the newer change wins.
      </p>
      <p>
        If an entry has different text but the same modification time on two devices, Lamp keeps
        the local version and sets the other aside for review. Choose <strong>Resolve</strong>
        in the Notes panel, writing list or Settings → Sync. The writing list opens conflicts
        automatically when they arrive.
      </p>
      <p>
        You can keep either version, keep both, or settle every conflict at once. Both versions of
        a note are kept in the one note; both versions of a piece of writing become two pieces, the
        other device’s marked “[From other device]”. A writing collection with a conflict
        waiting does not upload until you choose.
      </p>
      <p>
        Highlight sets merge individual highlights. Missing highlights are added; only recorded
        deletions remove them. The latest change determines set and theme names. Settings,
        reading completions and followed plans also merge individually, with the latest change
        taking precedence. This includes unmarking a reading or unfollowing a plan.
      </p>

      <h2>Deletions</h2>
      <p>
        Deleting a note, a piece of writing, a highlight set, a single highlight, a theme, or a module
        or plan of your own is recorded, so your other devices delete it too rather than restoring
        it. An entry edited on another
        device after you deleted it survives. A file that simply goes missing from the server is
        never taken as a deletion. Deleted files are remembered for 180 days; a device that has
        been away longer than that brings them back once.
      </p>

      <h2>Upgrading from an earlier version</h2>
      <p>
        Version 1.2 changed how a library is laid out, and earlier versions cannot read the new
        layout. Update Lamp Bible on <strong>every</strong> device that shares a library before
        moving it.
      </p>
      <ul>
        <li>
          <strong>A library only your iPhone or iPad kept</strong> — the app asks{' '}
          <em>Move to the new sync?</em> Choose <strong>Move</strong> once your other devices are
          up to date. Until you do, nothing syncs: the app asks again the next time it opens, and
          Settings → Sync explains why, with a <strong>Move Library</strong> button.
        </li>
        <li>
          <strong>A library a Mac kept</strong> — on the Mac, open Settings → Sync and choose{' '}
          <strong>Move Library</strong>. Your iPhone and iPad sync once it has moved.
        </li>
        <li>
          <strong>A new, empty location</strong> is set up automatically.
        </li>
        <li>
          <strong>A device still on an older version</strong> is noticed, and Settings asks you to
          update it. Until you do, it stops syncing or misses changes made elsewhere.
        </li>
      </ul>

      <h2>Backup strategy</h2>
      <p>Sync propagates deletions as well as edits. Keep separate backups:</p>
      <ul>
        <li>Use iCloud Drive or WebDAV to keep a copy on another device or server.</li>
        <li>
          Back up the sync folder itself — iCloud Drive and most WebDAV servers can keep versions,
          or snapshot the folder on a schedule.
        </li>
        <li>
          Periodically export notes and writing to markdown, which you can read in any text editor.
        </li>
      </ul>
      <p>
        See <Link href="/docs/import-export">Import &amp; export</Link> for the export formats.
      </p>
    </DocPage>
  )
}
