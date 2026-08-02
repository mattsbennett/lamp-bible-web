import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'
import { DownloadList } from '@/components/docs/DownloadList'
import { moduleDownloads } from '@/lib/module-downloads'

export const metadata: Metadata = {
  title: 'Authoring modules',
  description:
    'The JSON schemas for each module type, BBCCCVVV verse references, and the offset-based annotation model shared across all of them.',
}

export default function Page() {
  const schemaFiles = Array.from(
    new Map(moduleDownloads.flatMap((m) => m.schemas).map((s) => [s.href, s])).values()
  ).sort((a, b) => a.label.localeCompare(b.label))

  return (
    <DocPage
      href="/docs/modules/authoring"
      title="Authoring modules"
      intro="The data model: how a module document is shaped, how verses are referenced, and how annotations attach to text. For the mechanics of producing the file, see Building a .lamp file."
    >
      <h2>The pipeline</h2>
      <p>
        A module is authored as JSON against a published schema, then converted to SQLite and
        compressed. This page covers the first step — the shape of the JSON. The conversion is on{' '}
        <Link href="/docs/modules/building">Building a .lamp file</Link>.
      </p>

      <pre>
        <code>{`source text  →  module JSON  →  SQLite  →  raw DEFLATE  →  module.lamp
                └── this page ──┘  └──────── building a .lamp ───────┘`}</code>
      </pre>

      <h2>The container, briefly</h2>
      <p>
        A <code>.lamp</code> file is a SQLite database compressed with raw DEFLATE (zlib level 9,{' '}
        <code>wbits=-15</code>). One file holds one module — one translation, one commentary series,
        one highlight set. Compression is typically 95% or better.
      </p>
      <p>
        The library bundled inside the app uses the same structure in a single multi-module
        database. The practical difference is that bundled tables carry an extra identifier column
        to separate co-resident modules, which a standalone <code>.lamp</code> does not need.
      </p>

      <Callout title="Devotionals are a special case">
        <p>
          A shared devotional may instead be a plain JSON document, or a ZIP bundle containing the
          document plus its images and audio. All three forms use the <code>.lamp</code> extension;
          the app detects which it is on open and previews the contents before importing.
        </p>
      </Callout>

      <h2>Verse references</h2>
      <p>
        Every reference in every schema uses a single integer format, <strong>BBCCCVVV</strong>: two
        digits of book number, three of chapter, three of verse.
      </p>

      <Table>
        <thead>
          <tr>
            <th>Reference</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Genesis 1:1</td>
            <td>
              <code>1001001</code>
            </td>
          </tr>
          <tr>
            <td>Matthew 1:1</td>
            <td>
              <code>40001001</code>
            </td>
          </tr>
          <tr>
            <td>Ephesians 2:8</td>
            <td>
              <code>49002008</code>
            </td>
          </tr>
        </tbody>
      </Table>

      <p>
        Ranges are expressed as a start and end pair, conventionally <code>sv</code> and{' '}
        <code>ev</code>. Because the encoding sorts correctly as an integer, range queries and
        ordering come free.
      </p>

      <h2>Annotated text</h2>
      <p>
        Text fields are either a plain string or an object carrying the string plus offset-based
        annotations. Keeping annotations out of the text — rather than wrapping it in markup — means
        the plain text stays clean for search, display and speech.
      </p>

      <pre>
        <code>{`{
  "text": "In the beginning God created the heaven and the earth.",
  "annotations": [
    {
      "type": "strongs",
      "start": 7,
      "end": 16,
      "text": "beginning",
      "data": { "strongs": "H7225" }
    },
    {
      "type": "strongs",
      "start": 17,
      "end": 20,
      "text": "God",
      "data": { "strongs": "H430", "lemma": "אֱלֹהִים" }
    }
  ]
}`}</code>
      </pre>

      <p>
        <code>start</code> is inclusive and <code>end</code> exclusive, so{' '}
        <code>text[start:end]</code> must equal the annotation’s own <code>text</code> field. That
        redundancy is deliberate — it is what lets a validator catch a bad offset.
      </p>

      <Callout tone="warn" title="Never count offsets by hand">
        <p>
          Compute them: <code>start = text.find(phrase)</code>. A wrong offset produces a file that
          imports cleanly and tags the wrong words, which is far harder to notice than a file that
          fails outright.
        </p>
      </Callout>

      <p>Annotation types vary a little by schema; the common ones are:</p>

      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Carries</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>strongs</code>
            </td>
            <td>Strong’s number, optional lemma and morphology code</td>
          </tr>
          <tr>
            <td>
              <code>scripture</code>
            </td>
            <td>
              <code>sv</code>, optional <code>ev</code>, or a list of refs
            </td>
          </tr>
          <tr>
            <td>
              <code>red-letter</code>
            </td>
            <td>Words of Christ</td>
          </tr>
          <tr>
            <td>
              <code>greek</code> / <code>hebrew</code>
            </td>
            <td>Original-language text, optionally with a Strong’s number</td>
          </tr>
          <tr>
            <td>
              <code>lexicon-ref</code>
            </td>
            <td>Cross-reference to another lexicon entry</td>
          </tr>
          <tr>
            <td>
              <code>link</code>
            </td>
            <td>External URL</td>
          </tr>
          <tr>
            <td>
              <code>emphasis</code>
            </td>
            <td>Bold, italic or underline</td>
          </tr>
        </tbody>
      </Table>

      <h2>The schemas</h2>
      <p>
        Each module type has a JSON Schema, all sharing common definitions for annotations,
        references, metadata and media. Every one is downloadable here, along with a worked sample
        module that validates against it.
      </p>

      <DownloadList files={schemaFiles} />

      <Table>
        <thead>
          <tr>
            <th>Schema</th>
            <th>Shape</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>translation_schema.json</code>
            </td>
            <td>
              Metadata, then books → chapters → verses. Chapters carry section headings; verses
              carry content, footnotes, and paragraph and poetry markers.
            </td>
          </tr>
          <tr>
            <td>
              <code>lexicon_schema.json</code>
            </td>
            <td>
              Entries keyed by identifier, with lemma, transliteration, pronunciation, definition,
              numbered senses, usage and references.
            </td>
          </tr>
          <tr>
            <td>
              <code>lexicon_mapping_schema.json</code>
            </td>
            <td>
              A map from one keying system to another — Strong’s to BDB, for example, where one key
              may map to several entries.
            </td>
          </tr>
          <tr>
            <td>
              <code>commentary_schema.json</code>
            </td>
            <td>
              One file per book: chapters → sections → pericopae → verse commentary, with footnotes
              and an abbreviations list.
            </td>
          </tr>
          <tr>
            <td>
              <code>commentary_series_schema.json</code>
            </td>
            <td>
              Series-level metadata: editor, publisher, preface, abbreviations, bibliography and the
              volume list.
            </td>
          </tr>
          <tr>
            <td>
              <code>notes_schema.json</code>
            </td>
            <td>
              A simplified commentary: one file per book, chapters with an introduction and verse
              notes keyed by <code>sv</code>/<code>ev</code>.
            </td>
          </tr>
          <tr>
            <td>
              <code>devotional_schema.json</code>
            </td>
            <td>
              Metadata, summary, and content either as a flat block array or as
              introduction/sections/conclusion, plus footnotes.
            </td>
          </tr>
          <tr>
            <td>
              <code>highlight_schema.json</code>
            </td>
            <td>
              Verses, each with highlight spans carrying start and end character offsets, a style
              and a colour.
            </td>
          </tr>
          <tr>
            <td>
              <code>plan_schema.json</code>
            </td>
            <td>Reading assignments by day.</td>
          </tr>
          <tr>
            <td>
              <code>quiz_schema.json</code>
            </td>
            <td>Questions and answers per reading, graded by age group.</td>
          </tr>
        </tbody>
      </Table>

      <h2>Worked example: a translation</h2>
      <pre>
        <code>{`{
  "meta": {
    "id": "KJVs",
    "type": "translation",
    "name": "King James Version",
    "abbreviation": "KJV",
    "language": "en",
    "textDirection": "ltr",
    "translationPhilosophy": "formal",
    "versification": "kjv",
    "features": { "strongs": true, "morphology": true }
  },
  "books": [
    {
      "id": "Gen",
      "name": "Genesis",
      "number": 1,
      "testament": "OT",
      "chapters": [
        {
          "chapter": 1,
          "headings": [{ "text": "The Creation", "beforeVerse": 1, "level": 1 }],
          "verses": [
            {
              "v": 1,
              "ref": 1001001,
              "content": { "text": "In the beginning...", "annotations": [] },
              "paragraph": true
            }
          ]
        }
      ]
    }
  ]
}`}</code>
      </pre>

      <h3>Translation identifiers</h3>
      <p>
        By convention a trailing <code>s</code> marks a Strong’s-tagged edition — <code>KJVs</code>{' '}
        is the tagged King James, <code>KJV</code> the plain one. The identifier must be unique
        across installed modules, since it is what highlights and settings refer to.
      </p>

      <h2>Worked example: highlights</h2>
      <p>
        This one marks the words <em>God created</em> in Genesis 1:1, which in the KJV wording
        begins at character 17 and ends at 28.
      </p>
      <pre>
        <code>{`{
  "meta": {
    "schemaVersion": "1.0",
    "id": "my_highlights_kjv",
    "type": "highlights",
    "name": "My Highlights",
    "translationId": "KJVs"
  },
  "verses": [
    {
      "ref": 1001001,
      "highlights": [
        { "sc": 17, "ec": 28, "style": 0, "color": "#FFE066" }
      ]
    }
  ]
}`}</code>
      </pre>
      <p>
        <code>sc</code> and <code>ec</code> are character offsets within the verse text of the named
        translation, start inclusive and end exclusive. <code>style</code> is 0 for a filled
        highlight, 1 for a solid underline, 2 for dashed and 3 for dotted.
      </p>

      <Callout tone="warn" title="Offsets are tied to exact wording">
        <p>
          A highlight module is only meaningful against the translation it names, and against the
          same edition of it. This is why highlight sets are per translation rather than global.
        </p>
      </Callout>

      <h2>Media</h2>
      <p>
        Notes, devotionals, commentaries and lexicons can reference images and audio. In markdown
        interchange these live in a <code>media/</code> folder beside the document, with
        UUID-prefixed filenames to avoid collisions; in a shared package they travel inside the ZIP.
        Supported formats are JPEG, PNG, GIF, WebP and HEIC for images, and M4A, MP3, WAV, AAC and
        OGG for audio — M4A being the recommended choice.
      </p>

      <h2>Building and installing</h2>
      <p>
        Once the JSON is right, turning it into an installable file is four steps: create the
        tables, insert your rows, compress with raw DEFLATE, verify. That is covered in full — with
        the table definitions for every type and a complete reference implementation — on{' '}
        <Link href="/docs/modules/building">Building a .lamp file</Link>.
      </p>
      <p>
        A working sample module of each type, with its source JSON, is on{' '}
        <Link href="/docs/modules/downloads">Downloads</Link>. Starting from one of those is usually
        faster than starting from the schema.
      </p>

      <Callout tone="warn" title="Rights">
        <p>
          The format makes almost any text importable. That is not permission to redistribute one.
          The content bundled with the app is public domain for exactly this reason; keep modules
          built from licensed material to yourself.
        </p>
      </Callout>
    </DocPage>
  )
}
