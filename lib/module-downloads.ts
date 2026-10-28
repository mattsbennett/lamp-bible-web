import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const PUBLIC_MODULES = join(process.cwd(), 'public/modules')

export type ModuleTypeId =
  | 'translation'
  | 'dictionary'
  | 'commentary'
  | 'book'
  | 'plan'
  | 'quiz'
  | 'notes'
  | 'devotional'
  | 'highlights'

export type DownloadFile = {
  label: string
  href: string
  /** Human-readable size, resolved from disk at build time. */
  size: string
}

export type ModuleTypeDownloads = {
  id: ModuleTypeId
  name: string
  editable: boolean
  summary: string
  /** What the sample module actually contains. */
  sampleContents: string
  /** The sample's module ID, which is also its file name: the apps require the two to match. */
  sampleId: string
  sample: DownloadFile
  source: DownloadFile
  sql: DownloadFile
  /** Schema files in public/modules/schemas that describe this type. */
  schemas: DownloadFile[]
}

function fileSize(relPath: string): string {
  try {
    const bytes = statSync(join(PUBLIC_MODULES, relPath)).size
    if (bytes < 1024) return `${bytes} B`
    return `${(bytes / 1024).toFixed(1)} KB`
  } catch {
    return '—'
  }
}

function file(label: string, relPath: string): DownloadFile {
  return { label, href: `/modules/${relPath}`, size: fileSize(relPath) }
}

function schema(name: string): DownloadFile {
  return file(name, `schemas/${name}`)
}

const TYPES: Array<
  Omit<ModuleTypeDownloads, 'sample' | 'source' | 'sql' | 'schemas'> & { schemaFiles: string[] }
> = [
  {
    id: 'translation',
    name: 'Translation',
    editable: false,
    summary: 'Verse text with Strong’s tagging, headings, footnotes and poetry markers.',
    sampleContents:
      'Six CC0 Berean Standard Bible verses across Genesis, John and Psalms, with Strong’s annotations, two section headings, a translator footnote and a full-text index.',
    sampleId: 'SAMPLEs',
    schemaFiles: ['translation_schema.json'],
  },
  {
    id: 'dictionary',
    name: 'Dictionary',
    editable: false,
    summary: 'Lexicon entries keyed by Strong’s number or lemma, with numbered senses.',
    sampleContents:
      'Three public-domain Strong’s entries — two Hebrew, one Greek — each with numbered senses, glosses, transliteration and part of speech.',
    sampleId: 'sample-lexicon',
    schemaFiles: ['lexicon_schema.json', 'lexicon_mapping_schema.json'],
  },
  {
    id: 'commentary',
    name: 'Commentary',
    editable: false,
    summary: 'Exposition keyed to verses or pericopae, one book of a series per file.',
    sampleContents:
      'Original notes on the opening of Genesis, showing the section → pericope → verse nesting and both Strong’s and scripture annotations.',
    sampleId: 'sample-commentary',
    schemaFiles: [
      'commentary_schema.json',
      'commentary_series_schema.json',
      'commentary_example.json',
      'commentary_simple_example.json',
    ],
  },
  {
    id: 'book',
    name: 'Book',
    editable: false,
    summary: 'A long-form publication in nested sections, with footnotes shared across the book.',
    sampleContents:
      'An original preface and chapter, with a section nested in the chapter, a book-wide footnote and scripture reference annotations.',
    sampleId: 'sample-book',
    schemaFiles: ['book_schema.json'],
  },
  {
    id: 'plan',
    name: 'Reading plan',
    editable: false,
    summary: 'Dated reading assignments across a cycle.',
    sampleContents: 'A seven-day plan, one reading per day, through the creation account and the prologue of John.',
    sampleId: 'sample-plan',
    schemaFiles: ['plan_schema.json'],
  },
  {
    id: 'quiz',
    name: 'Quiz',
    editable: false,
    summary: 'Age-graded questions tied to a reading plan’s readings.',
    sampleContents:
      'Ten questions on day one of the sample plan — five for each of two age groups — with themes and cross-references.',
    sampleId: 'sample-quiz',
    schemaFiles: ['quiz_schema.json'],
  },
  {
    id: 'notes',
    name: 'Notes',
    editable: true,
    summary: 'Verse-keyed study notes, one book per file.',
    sampleContents: 'A chapter introduction and two notes on John 1, anchored to verses 1 and 14.',
    sampleId: 'sample-notes',
    schemaFiles: ['notes_schema.json'],
  },
  {
    id: 'devotional',
    name: 'Devotional',
    editable: true,
    summary: 'A long-form document, not tied to a single passage.',
    sampleContents: 'One short original reading, with a summary, tags and a key scripture.',
    sampleId: 'sample-devotional',
    schemaFiles: ['devotional_schema.json'],
  },
  {
    id: 'highlights',
    name: 'Highlights',
    editable: true,
    summary: 'Highlight spans and colour themes for one translation.',
    sampleContents:
      'Four highlights against the sample translation — one in each of the four styles, with character offsets that land on real words — and two colour themes.',
    sampleId: 'sample-highlights',
    schemaFiles: ['highlight_schema.json'],
  },
]

export const moduleDownloads: ModuleTypeDownloads[] = TYPES.map((t) => ({
  id: t.id,
  name: t.name,
  editable: t.editable,
  summary: t.summary,
  sampleContents: t.sampleContents,
  sampleId: t.sampleId,
  sample: file(`${t.sampleId}.lamp`, `samples/${t.id}/${t.sampleId}.lamp`),
  source: file(`${t.sampleId}.json`, `samples/${t.id}/${t.sampleId}.json`),
  sql: file(`${t.id}.sql`, `sqlite/${t.id}.sql`),
  schemas: t.schemaFiles.map(schema),
}))

export type ModuleManifest = {
  generatedAt: string
  source: { repo: string; commit: string | null }
  assets: Array<{ path: string; from: string; bytes: number; sha256: string }>
  watched: Array<{ from: string; note: string; sha256: string | null }>
}

export function readManifest(): ModuleManifest | null {
  try {
    return JSON.parse(readFileSync(join(PUBLIC_MODULES, 'manifest.json'), 'utf8'))
  } catch {
    return null
  }
}
