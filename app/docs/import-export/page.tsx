import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Import & export',
  description:
    'Markdown round-trips for notes and devotionals, the folder layout, frontmatter fields, footnote handling and embedded media.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/import-export"
      title="Import & export"
      intro="Notes and devotionals round-trip through plain markdown, media included. This is the format."
    >
      <h2>Where files go</h2>
      <p>
        Import and export use the app’s iCloud Documents container, so the folders are visible in
        the Files app and on any Mac signed into the same account.
      </p>

      <pre>
        <code>{`iCloud Drive/Lamp Bible/
├── Import/
│   ├── Notes/
│   │   ├── Matthew.md
│   │   └── media/
│   └── Devotionals/
│       ├── my-devotional.md
│       └── media/
└── Export/
    ├── Notes/
    │   ├── Genesis.md
    │   ├── All_Notes.md
    │   └── media/
    └── Devotionals/
        ├── walking-by-faith.md
        ├── All_Devotionals.md
        └── media/`}</code>
      </pre>

      <p>
        Drop files into the relevant <code>Import/</code> folder and open the app; import runs
        automatically on sync. Files that import successfully are removed from the folder. A file
        that fails to parse is left in place so you can fix it.
      </p>

      <h2>Notes</h2>
      <p>
        Notes use YAML frontmatter followed by headings that encode the passage structure. One file
        can hold one book, or every book.
      </p>

      <pre>
        <code>{`---
id: notes
type: notes
name: "My Notes"
author: "Jane Doe"
book: John
bookNumber: 43
---

# John

## Chapter 1

### Introduction

The Gospel of John opens with...

### 1:1

"In the beginning was the Word" echoes Genesis 1:1.[^1]

### 1:14-18

The Word became flesh.[^2]

---

[^1:1-1]: Greek λόγος — word, reason, plan.

[^1:14-1]: The incarnation.`}</code>
      </pre>

      <h3>Structure</h3>
      <Table>
        <thead>
          <tr>
            <th>Element</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code># Book</code>
            </td>
            <td>Book title, or the collection name in a combined file</td>
          </tr>
          <tr>
            <td>
              <code>## Chapter N</code>
            </td>
            <td>Chapter heading</td>
          </tr>
          <tr>
            <td>
              <code>### Introduction</code>
            </td>
            <td>Chapter-level note</td>
          </tr>
          <tr>
            <td>
              <code>### 1:1</code>
            </td>
            <td>A note on a single verse</td>
          </tr>
          <tr>
            <td>
              <code>### 1:2-5</code>
            </td>
            <td>A note on a verse range</td>
          </tr>
          <tr>
            <td>
              <code>### 1:28-2:3</code>
            </td>
            <td>A range crossing a chapter boundary</td>
          </tr>
        </tbody>
      </Table>

      <p>
        In a combined file each book gets an <code>##</code> heading and the levels below shift down
        by one.
      </p>

      <h3>Footnotes</h3>
      <p>
        Footnotes use standard markdown syntax — <code>[^id]</code> inline,{' '}
        <code>[^id]: text</code> for the definition, with four-space indentation for continuation
        lines. Inside the app footnotes are numbered per note; on export those numbers are rewritten
        into unique identifiers so that a combined file cannot collide with itself.
      </p>

      <Table>
        <thead>
          <tr>
            <th>Context</th>
            <th>In app</th>
            <th>Exported</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Notes, one book</td>
            <td>
              <code>[^1]</code>
            </td>
            <td>
              <code>[^1:5-1]</code>
            </td>
          </tr>
          <tr>
            <td>Notes, all books</td>
            <td>
              <code>[^1]</code>
            </td>
            <td>
              <code>[^Gen-1:5-1]</code>
            </td>
          </tr>
          <tr>
            <td>Devotionals</td>
            <td>
              <code>[^1]</code>
            </td>
            <td>
              <code>[^1]</code>
            </td>
          </tr>
        </tbody>
      </Table>

      <p>
        On import, footnote identifiers are renumbered back to sequential values. A consequence
        worth knowing: re-exporting after an import generates fresh identifiers, so diffing two
        exports of the same notes will show footnote id churn.
      </p>

      <h3>Import behaviour</h3>
      <ul>
        <li>A single-book file creates or updates the notes for that book.</li>
        <li>A combined file imports every book it contains.</li>
        <li>Existing notes are merged by verse reference rather than replaced wholesale.</li>
        <li>
          An unrecognised book name fails the import — use standard names, and note that{' '}
          <code>1 Samuel</code> works where <code>1st Samuel</code> does not.
        </li>
      </ul>

      <h2>Devotionals</h2>
      <p>
        Devotionals use richer frontmatter and ordinary markdown body content. Everything except{' '}
        <code>id</code> and <code>title</code> is optional.
      </p>

      <pre>
        <code>{`---
id: "d4f8a2b1-3c5e-4d7f-9a8b-6c1e2f3d4a5b"
title: "Finding Peace in the Storm"
subtitle: "When life feels overwhelming"
author: "Pastor Michael"
date: "2025-01-15"
tags: ["peace", "trust", "anxiety"]
category: "devotional"
series:
  id: "series-uuid"
  name: "Storms"
  order: 1
keyScriptures:
  - ref: "Mark 4:39"
    sv: 41004039
---

## Summary

Peace comes from trusting the One who commands the wind.

## Content

### The Storm

![Stormy sea](media/storm-sea.jpg)

Life brings unexpected storms...

> "Peace, be still."
> — Mark 4:39

1. Remember His presence
2. Trust His power
3. Rest in His love

[Morning meditation](media/peace-meditation.m4a)`}</code>
      </pre>

      <p>
        <code>category</code> must be one of <code>devotional</code>, <code>sermon</code>,{' '}
        <code>reflection</code>, <code>study</code>, <code>prayer</code>, <code>testimony</code> or{' '}
        <code>other</code>.
      </p>

      <h3>Blocks</h3>
      <p>
        Paragraphs, headings, blockquotes, and bulleted and numbered lists map directly to the
        editor’s block types. Two conventions are worth memorising:
      </p>
      <ul>
        <li>
          <strong>Images</strong> use image syntax — <code>![caption](media/file.jpg)</code>.
        </li>
        <li>
          <strong>Audio</strong> uses link syntax — <code>[caption](media/file.m4a)</code> — not
          image syntax.
        </li>
      </ul>

      <h3>Import behaviour</h3>
      <ul>
        <li>Each file becomes one devotional; a folder of files becomes that many entries.</li>
        <li>
          A single file with entries separated by <code>---</code> imports as multiple entries.
        </li>
        <li>New identifiers are generated on import, so importing twice creates duplicates.</li>
        <li>Media files are copied into the app’s storage.</li>
      </ul>

      <h2>Media</h2>
      <p>
        Media referenced by markdown lives in a <code>media/</code> folder alongside it. Filenames
        are UUID-prefixed on export to avoid collisions when several sources are consolidated.
      </p>

      <Table>
        <thead>
          <tr>
            <th>Kind</th>
            <th>Formats</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Images</td>
            <td>JPEG, PNG, GIF, WebP, HEIC</td>
          </tr>
          <tr>
            <td>Audio</td>
            <td>M4A (recommended), MP3, WAV, AAC, OGG</td>
          </tr>
        </tbody>
      </Table>

      <Callout title="Missing media does not block an import">
        <p>
          If a referenced file is not present, the text still imports and the reference is
          preserved. Add the file and re-import to fill it in.
        </p>
      </Callout>

      <h2>Exporting</h2>
      <ul>
        <li>
          <strong>One book of notes</strong> — from the notes view for that book.
        </li>
        <li>
          <strong>All notes</strong> — from Settings; produces a file per book plus{' '}
          <code>All_Notes.md</code>, with media consolidated.
        </li>
        <li>
          <strong>One devotional</strong> — from the devotional’s share menu.
        </li>
        <li>
          <strong>All devotionals</strong> — from Settings; produces a file each plus{' '}
          <code>All_Devotionals.md</code>.
        </li>
      </ul>

      <p>
        For binary transfer that preserves identifiers and media exactly, export as a{' '}
        <code>.lamp</code> package instead — see{' '}
        <Link href="/docs/modules">The module system</Link>.
      </p>
    </DocPage>
  )
}
