import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout } from '@/components/docs/DocPage'
import { DownloadList } from '@/components/docs/DownloadList'
import { moduleDownloads, readManifest } from '@/lib/module-downloads'

export const metadata: Metadata = {
  title: 'Downloads',
  description:
    'Installable sample modules of every type, their source JSON, the JSON Schemas, and the SQLite table definitions.',
}

export default function Page() {
  const manifest = readManifest()
  const schemaFiles = Array.from(
    new Map(moduleDownloads.flatMap((m) => m.schemas).map((s) => [s.href, s])).values()
  ).sort((a, b) => a.label.localeCompare(b.label))
  const sqlFiles = moduleDownloads.map((m) => m.sql)

  return (
    <DocPage
      href="/docs/modules/downloads"
      title="Downloads"
      intro="Everything you need to build a module: a working example of each type, the schemas they validate against, and the table definitions the app reads."
    >
      <h2>Sample modules</h2>
      <p>
        Each of these is a real, installable <code>.lamp</code> file. They are deliberately tiny —
        a few verses or entries each — so you can decompress one, open it in any SQLite browser,
        and see the whole thing at once. Download one to your device and open it to watch the
        import work.
      </p>

      <Callout title="What is in them">
        <p>
          Verse text is the King James Version and the lexicon glosses are Strong’s, both public
          domain. Commentary, notes, devotional and quiz content was written for these samples.
          Nothing here reproduces licensed material, so you can use any of it as a starting point.
        </p>
      </Callout>

      {moduleDownloads.map((m) => (
        <section key={m.id}>
          <h3>
            {m.name}
            {m.editable && <span className="ml-2 text-sm font-normal text-accent">you edit</span>}
          </h3>
          <p>{m.summary}</p>
          <p className="text-muted">{m.sampleContents}</p>
          <DownloadList files={[m.sample, m.source, m.sql, ...m.schemas]} />
        </section>
      ))}

      <h2>JSON Schemas</h2>
      <p>
        The schemas every module source document validates against. They share common definitions
        for annotations, verse references, metadata and media. Two commentary examples are included
        alongside them — a full one and a minimal one.
      </p>
      <DownloadList files={schemaFiles} />

      <h2>SQLite table definitions</h2>
      <p>
        The tables the app expects inside a decompressed <code>.lamp</code>, one file per module
        type. Run them with <code>executescript()</code> or <code>sqlite3 &lt; file.sql</code>{' '}
        before inserting rows.
      </p>
      <DownloadList files={sqlFiles} />

      {manifest && (
        <>
          <h2>Provenance</h2>
          <p>
            The JSON Schemas here are copies, kept in step with the module tooling by a sync script
            that records the source revision and a SHA-256 for every file. These copies were taken
            on <strong>{manifest.generatedAt}</strong>
            {manifest.source.commit && (
              <>
                {' '}
                from revision <code>{manifest.source.commit.slice(0, 12)}</code>
              </>
            )}
            .
          </p>
          <p>
            <a href="/modules/manifest.json" download>
              manifest.json
            </a>{' '}
            lists every file with its hash, so you can confirm a download arrived intact.
          </p>
        </>
      )}

      <h2>Where to go next</h2>
      <ul>
        <li>
          <Link href="/docs/modules/building">Building a .lamp file</Link> — the mechanics, step by
          step, with the compression details and the mistakes to avoid.
        </li>
        <li>
          <Link href="/docs/modules/authoring">Authoring modules</Link> — verse reference encoding,
          annotation types, and the JSON shape of each module type.
        </li>
        <li>
          <Link href="/docs/modules">The module system</Link> — how modules fit into the app.
        </li>
      </ul>
    </DocPage>
  )
}
