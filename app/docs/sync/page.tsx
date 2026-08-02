import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Sync & backup',
  description:
    'Local-only storage, iCloud Drive, or your own WebDAV server — with conflict resolution and migration between backends.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/sync"
      title="Sync & backup"
      intro="Three options, no account in any of them. Pick where your work lives; change your mind later if you need to."
    >
      <h2>The three backends</h2>

      <Table>
        <thead>
          <tr>
            <th>Method</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Local Only</td>
            <td>
              Nothing leaves the device. No cloud storage of any kind is used.
            </td>
          </tr>
          <tr>
            <td>iCloud Drive</td>
            <td>
              Modules sync through your own iCloud Drive. The files stay visible in the Files app,
              which is also how markdown import and export work.
            </td>
          </tr>
          <tr>
            <td>WebDAV</td>
            <td>
              Modules sync to a server you run or rent — Nextcloud, ownCloud, Synology, or anything
              else speaking WebDAV.
            </td>
          </tr>
        </tbody>
      </Table>

      <p>
        There is no Lamp Bible account and no Lamp Bible server. Even with sync switched on, the
        only parties involved are you and the storage you chose.
      </p>

      <h2>What syncs</h2>
      <p>
        Sync covers the editable module types — <Link href="/docs/notes">notes</Link>,{' '}
        <Link href="/docs/devotionals">devotionals</Link> and{' '}
        <Link href="/docs/highlights">highlights</Link> — along with your user settings, so a second
        device picks up your translation, lexicon order and highlight palette too.
      </p>
      <p>
        Read-only library content is not synced. Bundled content is already on every install, and
        modules you imported yourself can be re-imported; there is no value in copying a hundred
        megabytes of commentary between devices.
      </p>

      <h2>Setting up WebDAV</h2>
      <p>
        WebDAV needs a server URL and credentials. The settings screen includes a{' '}
        <strong>Test Connection</strong> action that verifies the details before you commit to them,
        and afterwards shows connection status and the time of the last successful sync. Sync
        normally runs on its own; <strong>Sync Now</strong> forces a pass.
      </p>

      <Callout title="Use HTTPS">
        <p>
          Credentials and your notes travel over the connection you configure. Point the app at an
          HTTPS endpoint.
        </p>
      </Callout>

      <h2>Switching backends</h2>
      <p>
        Changing the sync method offers to bring your existing data with you. Three choices are
        presented:
      </p>
      <ul>
        <li>
          <strong>Migrate &amp; Switch</strong> — copy every module from the current backend to the
          new one, then switch. Progress is reported file by file, and any files that fail are
          listed by name so you know exactly what did not make it.
        </li>
        <li>
          <strong>Switch Only</strong> — change the backend and leave existing data where it is.
        </li>
        <li>
          <strong>Wipe &amp; Switch</strong> — start clean on the new backend, discarding the local
          copy.
        </li>
      </ul>

      <Callout tone="warn" title="Wipe means wipe">
        <p>
          Wipe &amp; Switch deletes local data rather than archiving it. Take a markdown export
          first if there is any doubt.
        </p>
      </Callout>

      <h2>Conflicts</h2>
      <p>
        Editable content can change in two places between syncs — a note written on a phone while a
        laptop had an older copy open. When that happens the app does not silently pick a winner. It
        surfaces the conflict and shows both versions so you can choose which to keep. Notes and
        devotionals each have their own conflict view.
      </p>
      <p>
        While you are writing, the tool panel shows sync state inline — syncing, waiting to sync,
        synced to the named backend, or sync unavailable — so you can tell at a glance whether the
        last few minutes of work has left the device.
      </p>

      <h2>Backup strategy</h2>
      <p>Sync is not the same thing as backup. A reasonable belt-and-braces routine:</p>
      <ul>
        <li>Use iCloud Drive or WebDAV so a lost device is not a lost library.</li>
        <li>
          Periodically export all notes and all devotionals to markdown — plain files that will
          outlive any app, this one included.
        </li>
        <li>
          Export highlight sets as <code>.lamp</code> packages before making sweeping changes to a
          colour scheme.
        </li>
      </ul>
      <p>
        See <Link href="/docs/import-export">Import &amp; export</Link> for the export formats.
      </p>
    </DocPage>
  )
}
