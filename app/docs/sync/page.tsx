import type { Metadata } from 'next'
import Link from 'next/link'
import { Platform } from '@/components/docs/Platform'
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
        Choose a method in Settings → <strong>Sync</strong>. The app connects directly to your
        chosen storage provider. Lamp Bible has no sync server or account.
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
          quiz age group, writing text size, default commentary, whether AI features are shown, and
          whether an assistant’s changes are marked for review.
        </li>
        <li>
          Modules you imported yourself — translations, dictionaries, commentaries, books, plans and
          quizzes, including Bibles you <Link href="/docs/modules/import-bible">imported</Link> — and
          reading plans you <Link href="/docs/reading-plans#making-a-plan">made</Link>.
        </li>
        <li>Slide decks made on a Mac, which iPhone and iPad receive to view.</li>
        <li>
          Each writing’s agent workspace on the Mac — companion files, context, skills, revisions
          and the agent conversation. Its documents, such as an outline or notes, also reach iPhone
          and iPad, where you can read and edit them.
        </li>
        <li>
          Review marks on an assistant’s changes to your writing, and which ones you have cleared.
        </li>
      </ul>

      <p>The following stay on each device:</p>
      <ul>
        <li>Bundled modules, which every install already has.</li>
        <li>Your WebDAV password and the choice of sync method.</li>
        <li>
          Search and navigation history, where you are in each book, the active highlight set and
          style, the read-aloud voice and how Greek words are said, the reader’s and the tool panel’s
          typeface and line spacing, the tool panel’s position, and what a word analysis’s card
          shows.
        </li>
      </ul>

      <h2>How it runs</h2>
      <p>
        Sync runs when the app opens and each time you return to it, a few seconds after you stop
        editing, and once more as you leave it if anything is waiting to go. While the app is open it
        also checks every half-minute for changes from your other devices. <strong>Sync Now</strong>{' '}
        starts a sync and reports any errors. On iPhone and iPad, pulling down the writing list,
        Books, the module manager or Slide Decks syncs first.
      </p>
      <p>
        Sync processes files separately, reporting failed transfers while continuing with the rest.
        An icon in the Notes panel and writing editor shows the status: synced, syncing, waiting,
        unavailable or, when sync is off, saved on this device only.
      </p>

      <h3>What is in the folder</h3>
      <p>
        You can view the library folder in Files or on your server. Content is stored as compressed{' '}
        <code>.lamp</code> <Link href="/docs/modules">modules</Link>, alongside settings and media:
      </p>
      <pre>
        <code>{`Lamp Bible/
├── lamp-bible.lampsync      settings, progress, and the list of library files
├── Notes/notes.lamp         My Notes
├── Writing/                 your writing collections
├── WritingMedia/            their images and audio
├── WritingReview/           review marks on an assistant’s changes
├── NoteMedia/               pictures in notes, by notes module
├── Highlights/              one file per highlight set
├── Translations/            modules you imported, by type
├── Dictionaries/
├── Commentaries/
├── Books/
├── BookMedia/               images in the books you imported
├── Plans/
├── Quizzes/
└── Workspaces/              slide decks, and each writing’s Mac workspace and documents`}</code>
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

      <Platform only="ios">
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
      </Platform>

      <h2>Conflicts</h2>
      <p>
        Notes and writing merge entry by entry, so editing two different notes on two devices
        never collides. When the same entry changed on both, the newer change wins.
      </p>
      <p>
        If an entry has different text but the same modification time on two devices, Lamp keeps
        the local version and sets the other aside for review. Choose <strong>Resolve</strong>{' '}
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
        A document in a writing’s workspace syncs as its own file. If two devices changed it, the
        server’s copy keeps the name and this device’s edits are kept beside it as{' '}
        <code>name (edits from device, date).md</code>. A piece of writing that changes elsewhere
        while you are typing in it is never saved over: your edits are kept as a separate piece,
        “<em>title</em> (your edits)”.
      </p>
      <p>
        Highlight sets merge individual highlights. Missing highlights are added; only recorded
        deletions remove them. The latest change determines set and theme names. Settings,
        reading completions and followed plans also merge individually, with the latest change
        taking precedence. This includes unmarking a reading or unfollowing a plan.
      </p>

      <h2>Deletions</h2>
      <p>
        Deletions of notes, writings, highlights, themes and your modules or plans sync to other
        devices, as do deleted documents in a writing’s workspace; deleting a writing deletes its
        documents and review marks too. An entry edited elsewhere after deletion is kept. A file
        missing from the server is not treated as deleted: the module manager marks the module{' '}
        <strong>Not in Your Library</strong> rather than removing it, and offers to delete it. Deletion records last 180 days; a device offline for longer can
        restore those files when it reconnects.
      </p>

      <h2>Upgrading from an earlier version</h2>
      <p>
        The current version moves your writing into new folders, <code>Writing/</code> and{' '}
        <code>WritingMedia/</code>.
        The first updated device to sync moves the library itself, with nothing to choose, and
        leaves the old folders in place. A device that has not been updated stops syncing and asks
        to be updated; its edits wait on it and go up once it is.
      </p>
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

      <Platform only="mac">
        <h2>On the Mac</h2>
        <p>
          In Settings → Sync, choose <strong>iCloud Drive or Folder</strong> and select the Lamp Bible
          folder used by your iPhone or iPad, or choose <strong>WebDAV</strong> with the same server address.
          The Mac syncs on launch, shortly after edits and every 30 seconds while open. Use{' '}
          <strong>Sync Now</strong> to start a sync manually. Conflicting notes or writings appear
          under <strong>Needs Your Decision</strong>, where you compare versions and choose one.
        </p>
        <p>
          Turning sync <strong>Off</strong> pauses it and retains your folder, server address,
          username and password for reconnection. <strong>Forget Sync Details…</strong> removes those
          details and turns sync off. Neither action deletes files on the Mac or server.
        </p>
        <p>
          The Mac also syncs slide decks and their pictures, and each writing’s agent workspace —
          companion files, context, skills, revisions and agent conversations. Its documents and
          review marks reach iPhone and iPad too. Reader tabs, history and Reader Chat conversations
          stay on each Mac.
        </p>
      </Platform>

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
