import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const PUBLIC_MODULES = join(process.cwd(), 'public/modules')

export type ModuleTypeId =
  | 'translation'
  | 'dictionary'
  | 'commentary'
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
      'Six KJV verses across Genesis, John and Psalms, with Strong’s annotations, two section headings, a translator footnote and a full-text index.',
    schemaFiles: ['translation_schema.json'],
  },
  {
    id: 'dictionary',
    name: 'Dictionary',
    editable: false,
    summary: 'Lexicon entries keyed by Strong’s number or lemma, with numbered senses.',
    sampleContents:
      'Three public-domain Strong’s entries — two Hebrew, one Greek — each with senses, transliteration and part of speech.',
    schemaFiles: ['lexicon_schema.json', 'lexicon_mapping_schema.json'],
  },
  {
    id: 'commentary',
    name: 'Commentary',
    editable: false,
    summary: 'Exposition keyed to verses or pericopae, nested inside sections and series.',
    sampleContents:
      'Original notes on Genesis 1:1 and John 1:1, showing the section → pericope → verse nesting and both Strong’s and scripture annotations.',
    schemaFiles: [
      'commentary_schema.json',
      'commentary_series_schema.json',
      'commentary_example.json',
      'commentary_simple_example.json',
    ],
  },
  {
    id: 'plan',
    name: 'Reading plan',
    editable: false,
    summary: 'Dated reading assignments across a cycle.',
    sampleContents: 'A seven-day plan, one reading per day, through the creation account and the prologue of John.',
    schemaFiles: ['plan_schema.json'],
  },
  {
    id: 'quiz',
    name: 'Quiz',
    editable: false,
    summary: 'Age-graded questions tied to a reading plan’s readings.',
    sampleContents:
      'Four questions against the sample plan, covering two age groups, with themes and cross-references.',
    schemaFiles: ['quiz_schema.json'],
  },
  {
    id: 'notes',
    name: 'Notes',
    editable: true,
    summary: 'Verse-keyed study notes.',
    sampleContents: 'Three sample notes anchored to Genesis 1:1, John 1:1 and John 1:14.',
    schemaFiles: ['notes_schema.json'],
  },
  {
    id: 'devotional',
    name: 'Devotional',
    editable: true,
    summary: 'Long-form documents, not tied to a single passage.',
    sampleContents: 'Two short original readings keyed by month and day, with tags and key scriptures.',
    schemaFiles: ['devotional_schema.json'],
  },
  {
    id: 'highlights',
    name: 'Highlights',
    editable: true,
    summary: 'Highlight spans and colour themes for one translation.',
    sampleContents:
      'Four highlights against the sample translation — one in each of the four styles, with character offsets that land on real words.',
    schemaFiles: ['highlight_schema.json'],
  },
]

export const moduleDownloads: ModuleTypeDownloads[] = TYPES.map((t) => ({
  id: t.id,
  name: t.name,
  editable: t.editable,
  summary: t.summary,
  sampleContents: t.sampleContents,
  sample: file(
    `lamp-sample-${t.id}.lamp`,
    `samples/${t.id}/lamp-sample-${t.id}.lamp`
  ),
  source: file(
    `lamp-sample-${t.id}.json`,
    `samples/${t.id}/lamp-sample-${t.id}.json`
  ),
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
