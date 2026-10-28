import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Import & export',
  description:
    'Markdown round-trips for notes and devotionals: where to export and import, the file layout, frontmatter fields, footnote handling and embedded media.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/import-export"
      title="Import & export"
      intro="Notes and devotionals round-trip through plain markdown, media included. This is where to find it, and the format."
    >
      <h2>Where to find it</h2>
      <Table>
        <thead>
          <tr>
            <th>To</th>
            <th>Go to</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Export a notes or devotional collection</td>
            <td>
              Settings → Modules → Manager, then the collection’s menu → <strong>Export
              (Markdown)</strong>. One combined file.
            </td>
          </tr>
          <tr>
            <td>Export devotionals file by file</td>
            <td>
              The devotional library’s menu → <strong>Export All</strong> (one file each, with
              media) or <strong>Export to Single File</strong>. Both write to{' '}
              <code>iCloud Drive/Lamp Bible/Export/Devotionals/</code>, so they need iCloud Drive
              sync.
            </td>
          </tr>
          <tr>
            <td>Share one devotional</td>
            <td>
              The devotional’s share menu → <strong>Share as Markdown</strong>, or{' '}
              <strong>Share Devotional File</strong> for a <code>.lamp</code> that keeps its media.
            </td>
          </tr>
          <tr>
            <td>Import notes or devotionals</td>
            <td>
              Settings → Modules → Manager → <strong>+</strong> → Import Module →{' '}
              <strong>Import Notes from Markdown</strong> or{' '}
              <strong>Import Devotionals from Markdown</strong>. Choose one file or a folder of
              files, then the collection it goes into, or a new one.
            </td>
          </tr>
          <tr>
            <td>Import a devotional file someone sent</td>
            <td>
              Open it from Files, Mail or AirDrop, or use the devotional library’s menu →{' '}
              <strong>Import Devotional</strong>. You see a preview before anything is added.
            </td>
          </tr>
        </tbody>
      </Table>

      <h2>Notes</h2>
      <p>
        An exported notes collection is one file: the collection’s name, then a heading for each
        book, each chapter, and each note. Footnotes are gathered at the end.
      </p>

      <pre>
        <code>{`# My Notes

---

## John

### Chapter 1

#### Introduction

The Gospel of John opens with...

#### 1:1

"In the beginning was the Word" echoes Genesis 1:1.[^John-1:1-1]

#### 1:14-18

The Word became flesh.

---

[^John-1:1-1]: Greek λόγος — word, reason, plan.`}</code>
      </pre>

      <h3>What the importer reads</h3>
      <p>
        Import is more forgiving than export. It reads the layout above, a file holding one book,
        and the layout earlier versions exported, which starts with YAML frontmatter naming the
        book:
      </p>

      <pre>
        <code>{`---
type: notes
book: John
bookNumber: 43
---

# John

## Chapter 3

### 3:16

For God so loved the world...`}</code>
      </pre>

      <Table>
        <thead>
          <tr>
            <th>Heading</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>John</code>
            </td>
            <td>A book. Use standard names — <code>1 Samuel</code>, not <code>1st Samuel</code></td>
          </tr>
          <tr>
            <td>
              <code>Chapter 3</code>
            </td>
            <td>A chapter</td>
          </tr>
          <tr>
            <td>
              <code>Introduction</code>
            </td>
            <td>The chapter note</td>
          </tr>
          <tr>
            <td>
              <code>3:16</code>
            </td>
            <td>A note on a single verse</td>
          </tr>
          <tr>
            <td>
              <code>3:16-18</code>
            </td>
            <td>A note on a verse range</td>
          </tr>
          <tr>
            <td>
              <code>1:28-2:3</code>
            </td>
            <td>A range crossing a chapter boundary</td>
          </tr>
          <tr>
            <td>
              <code>John 3:16</code>
            </td>
            <td>A full reference, which sets the book and chapter as well</td>
          </tr>
        </tbody>
      </Table>

      <p>
        Heading levels do not matter, so a single book’s notes and a combined file both work. A
        heading that looks like a reference but is not a real verse fails the import with the
        heading named, rather than guessing.
      </p>

      <h3>Footnotes</h3>
      <p>
        Footnotes use standard markdown syntax — <code>[^id]</code> inline,{' '}
        <code>[^id]: text</code> for the definition, with four-space indentation for continuation
        lines. On export each marker is rewritten into an identifier made from the book, verse and
        footnote, so that a combined file cannot collide with itself. Import also reads definitions
        written directly under a note, and Obsidian-style <code>&gt; [!footnote]</code> callouts.
      </p>

      <h3>Import behaviour</h3>
      <ul>
        <li>Every book in the file is imported.</li>
        <li>
          An imported note replaces the note that starts at the same verse; other notes in the
          collection are left alone.
        </li>
        <li>Markdown inside code blocks is never mistaken for a heading or a footnote.</li>
      </ul>

      <h2>Devotionals</h2>
      <p>
        A single devotional is ordinary markdown with YAML frontmatter. Everything except{' '}
        <code>title</code> is optional.
      </p>

      <pre>
        <code>{`---
title: "Finding Peace in the Storm"
subtitle: "When life feels overwhelming"
author: "Pastor Michael"
date: "2025-01-15"
tags: ["peace", "trust", "anxiety"]
category: "devotional"
series:
  name: "Storms"
  order: 1
keyScriptures:
  - ref: "Mark 4:39"
    sv: 41004039
---

## Summary

Peace comes from trusting the One who commands the wind.

### The Storm

![Stormy sea](media/storm-sea.jpg)

Life brings unexpected storms...[^wind]

> "Peace, be still."
> — Mark 4:39

1. Remember His presence
2. Trust His power
3. Rest in His love

[Morning meditation](media/peace-meditation.m4a)

[^wind]: The Sea of Galilee is known for sudden squalls.`}</code>
      </pre>

      <p>
        <code>category</code> is one of <code>devotional</code>, <code>exhortation</code>,{' '}
        <code>reflection</code>, <code>study</code>, <code>prayer</code> or <code>other</code>; an
        older file’s <code>sermon</code> is read as <code>exhortation</code>. A{' '}
        <code>## Summary</code> section at the top becomes the devotional’s summary.
      </p>

      <h3>Several devotionals in one file</h3>
      <p>
        <strong>Export to Single File</strong> and a collection’s markdown export write each
        devotional as a <code>##</code> heading, with its details on one line beneath it, and the
        importer reads the same layout back:
      </p>
      <pre>
        <code>{`## Finding Peace in the Storm

*When life feels overwhelming*

**Author:** Pastor Michael | **Date:** 2025-01-15 | **Tags:** peace, trust | **Category:** devotional

Life brings unexpected storms...`}</code>
      </pre>
      <p>
        Entries can also be separated by a <code>---</code> line. In an export, each
        devotional’s footnotes are numbered 1, 2, 3 in reading order under a{' '}
        <code>### Footnotes</code> heading.
      </p>

      <h3>Blocks</h3>
      <p>
        Paragraphs, headings, blockquotes, tables, and bulleted and numbered lists map directly to
        the editor. Two conventions are worth memorising:
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
        <li>Imports always add new devotionals, so importing twice creates duplicates.</li>
        <li>Media files are copied into the app’s storage.</li>
      </ul>

      <h2>Media</h2>
      <p>
        Media referenced by markdown lives in a <code>media/</code> folder alongside it, and the
        markdown links to each file by name.
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

      <Callout title="Markdown shared alone carries no media">
        <p>
          Share as Markdown sends the text without its images and audio, so their links will not
          resolve elsewhere. Use Share Devotional File, or an export with its media folder, when
          the media matters.
        </p>
      </Callout>

      <p>
        For transfer that preserves identifiers and media exactly, use a <code>.lamp</code> package
        instead — see <Link href="/docs/modules">The module system</Link>.
      </p>
    </DocPage>
  )
}
