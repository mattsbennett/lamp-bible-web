import type { Metadata } from 'next'
import Link from 'next/link'
import { Platform } from '@/components/docs/Platform'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Import & export',
  description:
    'Import and export notes and writing as markdown, with file layouts, metadata, footnote syntax and media handling.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/import-export"
      title="Import & export"
      intro="Import and export notes and writing as markdown. Writing exports can include attached media."
    >
      <Platform only="ios">
        <h2>Where to find it on iPhone and iPad</h2>
        <Table>
          <thead>
            <tr>
              <th>To</th>
              <th>Go to</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Export a notes or writing collection</td>
              <td>
                Settings → <strong>Module Manager</strong>, then the collection’s menu →{' '}
                <strong>Export (Markdown)</strong>. One combined file.
              </td>
            </tr>
            <tr>
              <td>Export writing file by file</td>
              <td>
                The writing library’s menu → <strong>Export</strong> → <strong>Export All</strong>{' '}
                (one file each, with media) or <strong>Export to Single File</strong>. Both write to{' '}
                <code>iCloud Drive/Lamp Bible/Export/Devotionals/</code>, so they need iCloud Drive
                sync.
              </td>
            </tr>
            <tr>
              <td>Share one piece of writing</td>
              <td>
                The piece’s share menu → <strong>Share as Markdown</strong>, or{' '}
                <strong>Share Writing File</strong> for a <code>.lamp</code> that keeps its media.
              </td>
            </tr>
            <tr>
              <td>Import notes or writing</td>
              <td>
                Settings → <strong>Module Manager</strong> → <strong>+</strong> → Import Module →{' '}
                <strong>Import Notes from Markdown</strong> or{' '}
                <strong>Import Writing from Markdown</strong>. Choose one file or a folder of
                files, then the collection it goes into, or a new one.
              </td>
            </tr>
            <tr>
              <td>Import a writing file someone sent</td>
              <td>
                Open it from Files, Mail or AirDrop, or use the writing library’s menu →{' '}
                <strong>Import Writing</strong>. You see a preview before anything is added.
              </td>
            </tr>
          </tbody>
        </Table>
      </Platform>

      <Platform only="mac">
        <h2>Where to find it on the Mac</h2>
        <Table>
          <thead>
            <tr>
              <th>To</th>
              <th>Go to</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Export a notes, writing or book collection as markdown</td>
              <td>
                <strong>Modules</strong> in the sidebar, then the collection’s menu.
              </td>
            </tr>
            <tr>
              <td>Export one piece of writing</td>
              <td>
                Its menu in Writing exports a <code>.lamp</code> file that keeps its media; the
                preview’s controls share it as markdown.
              </td>
            </tr>
            <tr>
              <td>Export a book’s notes or a translation’s highlights</td>
              <td>
                The <strong>Study Data</strong> menu at the foot of the study column’s Notes tab, as
                JSON or a <code>.lamp</code> module.
              </td>
            </tr>
            <tr>
              <td>Import notes or writing</td>
              <td>
                <strong>Import or Create Content</strong> (⇧⌘M) → <strong>Import Personal
                Content</strong>: notes or writing from markdown, or notes and highlights from JSON
                or <code>.lamp</code>.
              </td>
            </tr>
            <tr>
              <td>Bring in Word, Pages or notes-app documents</td>
              <td>
                With AI on, <strong>Import or Create Content</strong> → <strong>Or have an agent
                prepare the files</strong>. Copy its prompt into an app you have{' '}
                <Link href="/docs/ai#other-apps">allowed to read your library</Link>, such as Claude
                Code or Codex, with the folder they are in. The agent converts them and sends them
                back for the same review before anything is imported. It needs{' '}
                <strong>Allow agents to start a writing</strong>.
              </td>
            </tr>
          </tbody>
        </Table>
      </Platform>

      <h2>Notes</h2>
      <p>
        An exported notes collection is one file: the collection’s name, then a heading for each
        book, each chapter, and each note. Footnotes are gathered at the end. Pictures in notes
        are not exported; the file carries the text alone.
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
        Import accepts the layout above, a file holding one book,
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
        Heading levels can vary. Both single-book and combined files are accepted. An invalid
        verse reference stops the import, and the error identifies the heading.
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

      <h2>Writing</h2>
      <p>
        A single piece of writing is ordinary markdown with YAML frontmatter, and every field is
        optional. Without a <code>title</code>, the opening <code>#</code> heading or the file name
        is used.
      </p>

      <pre>
        <code>{`---
id: "finding-peace"
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
        <code>category</code> takes any value. The editors suggest <code>devotional</code>,{' '}
        <code>exhortation</code>, <code>reflection</code>, <code>study</code> and{' '}
        <code>prayer</code>; anything else is kept as written, and values that differ only in case
        count as one. An older file’s <code>sermon</code> is read as <code>exhortation</code>. Each piece has one category and any number of <code>tags</code>. A{' '}
        <code>## Summary</code> section at the top becomes the piece’s summary. A key scripture
        needs only its <code>ref</code>.
      </p>
      <p>
        <code>id</code> is what lets a later import find the same piece. Without one, the piece
        takes an id from its place in the folder you import, so importing that folder again still
        finds it. Each id must be unique.
      </p>

      <h3>Several pieces in one file</h3>
      <p>
        <strong>Export to Single File</strong> and a collection’s markdown export write each
        piece as a <code>##</code> heading, with its details on one line beneath it, and the
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
        piece’s footnotes are numbered 1, 2, 3 in reading order under a{' '}
        <code>### Footnotes</code> heading.
      </p>

      <h3>Blocks</h3>
      <p>
        Paragraphs, headings, blockquotes, tables, and bulleted and numbered lists map directly to
        the editor. Use these two conventions:
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

      <h3 id="writing-import">Import behaviour</h3>
      <p>
        Nothing changes until you confirm. The import first lists what it will do with each piece:
      </p>
      <ul>
        <li>
          <strong>New</strong> and <strong>updated</strong> pieces are ticked; a file you have not
          changed since the last import is left as it is.
        </li>
        <li>
          A <strong>conflict</strong>, where the piece was edited in Lamp after the file was saved,
          waits for you to tick it.
        </li>
        <li>
          A file that cannot be imported is listed with the reason: a repeated or invalid id, no
          text, a missing picture or recording, or text that is not UTF-8. Raw HTML, unknown
          frontmatter fields and footnotes with no text are imported with a warning.
        </li>
      </ul>
      <p>
        Each file becomes one piece, and a Lamp export of several pieces becomes that many. A folder
        imports every markdown file inside it, unless it holds a <code>lamp-import.json</code>{' '}
        naming the ones to take: <code>{'{"writings": [{"file": "talk.md"}]}'}</code>. Pictures and
        recordings are found by their links within the folder and copied into the app’s storage.
        On the Mac, a <code>talk.lampdeck</code> beside <code>talk.md</code> becomes that piece’s
        slide deck, and <strong>Undo Last Writing Import</strong> reverses an import.
      </p>

      <h2>Media</h2>
      <p>
        Media referenced by markdown is stored in a <code>media/</code> folder alongside it, and the
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
            <td>JPEG, PNG, GIF, WebP, HEIC, HEIF, TIFF, BMP</td>
          </tr>
          <tr>
            <td>Audio</td>
            <td>M4A (recommended), MP3, WAV, AAC, AIFF, CAF, FLAC</td>
          </tr>
        </tbody>
      </Table>

      <Callout title="Markdown shared alone carries no media">
        <p>
          Share as Markdown sends the text without its images and audio, so their links will not
          resolve elsewhere. Use Share Writing File, or an export with its media folder, to include media.
        </p>
      </Callout>

      <p>
        For transfer that preserves identifiers and media exactly, use a <code>.lamp</code> package
        instead — see <Link href="/docs/modules">The module system</Link>.
      </p>
    </DocPage>
  )
}
