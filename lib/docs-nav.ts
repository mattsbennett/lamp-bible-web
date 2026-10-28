import { isMacAvailable } from '@/lib/site'

export type DocLink = {
  title: string
  href: string
  summary: string
  /** Mac-only pages stay out of the docs until the Mac app is released (see lib/site.ts). */
  mac?: boolean
}

export type DocSection = {
  title: string
  links: DocLink[]
}

const allSections: DocSection[] = [
  {
    title: 'Start here',
    links: [
      {
        title: 'Overview',
        href: '/docs',
        summary: 'What Lamp Bible is, how it is put together, and where to go next.',
      },
      {
        title: 'Getting started',
        href: '/docs/getting-started',
        summary: 'Install the app, pick a translation, and find your way around the home screen.',
      },
      {
        title: 'The Mac app',
        href: '/docs/mac',
        summary: 'Tabs, layouts, the study column, writing, building modules and sync on the Mac.',
        mac: true,
      },
    ],
  },
  {
    title: 'Reading',
    links: [
      {
        title: 'The reader',
        href: '/docs/reader',
        summary:
          'Translations, Strong’s numbers, the tool panel, cross-references, read aloud and navigation.',
      },
      {
        title: 'Reading plans',
        href: '/docs/reading-plans',
        summary: 'Daily plans, progress, reminders, reading-time estimates, quizzes and the widget.',
      },
      {
        title: 'Search',
        href: '/docs/search',
        summary: 'Full-text search across every module, with filters for module, tag and colour.',
      },
      {
        title: 'Books',
        href: '/docs/books',
        summary: 'Long-form studies and reference works, with contents, footnotes and live references.',
      },
      {
        title: 'Lexicons',
        href: '/docs/lexicons',
        summary: 'Strong’s, BDB and Dodson lookups from any tagged word, and how to order them.',
      },
    ],
  },
  {
    title: 'Your own work',
    links: [
      {
        title: 'Highlights',
        href: '/docs/highlights',
        summary: 'Four styles, custom colours, multiple sets, and named themes for what a colour means.',
      },
      {
        title: 'Notes',
        href: '/docs/notes',
        summary: 'Verse and chapter notes in markdown, written beside the text you are reading.',
      },
      {
        title: 'Devotionals',
        href: '/docs/devotionals',
        summary: 'Long-form writing with footnotes, images, audio, scripture links and present mode.',
      },
      {
        title: 'Slides & presenting',
        href: '/docs/presenting',
        summary: 'Slide Studio decks from your writing, and an iPhone remote with your speaker notes.',
        mac: true,
      },
      {
        title: 'AI chat & agents',
        href: '/docs/ai',
        summary: 'Reader Chat and writing agents through your own AI account, with read-only access.',
        mac: true,
      },
    ],
  },
  {
    title: 'Data & modules',
    links: [
      {
        title: 'The module system',
        href: '/docs/modules',
        summary: 'Everything in the app is a module. What that means and how to manage them.',
      },
      {
        title: 'Importing a Bible',
        href: '/docs/modules/import-bible',
        summary: 'Turn a USFM, OSIS, Zefania or SWORD Bible you own into a translation module.',
      },
      {
        title: 'Authoring modules',
        href: '/docs/modules/authoring',
        summary: 'JSON schemas, verse reference encoding and the annotation model.',
      },
      {
        title: 'Building a .lamp file',
        href: '/docs/modules/building',
        summary: 'Turn module JSON into a compressed SQLite package the app will install.',
      },
      {
        title: 'Downloads',
        href: '/docs/modules/downloads',
        summary: 'Sample modules of every type, JSON schemas, and SQLite table definitions.',
      },
      {
        title: 'Import & export',
        href: '/docs/import-export',
        summary: 'Markdown round-trips for notes and devotionals, and where to find them.',
      },
      {
        title: 'Sync & backup',
        href: '/docs/sync',
        summary: 'Local-only, iCloud Drive, or your own WebDAV server. What syncs, conflicts and upgrading.',
      },
    ],
  },
  {
    title: 'Reference',
    links: [
      {
        title: 'What ships in the app',
        href: '/docs/included-content',
        summary: 'The translations, lexicons, cross-references and plans bundled with a fresh install.',
      },
      {
        title: 'FAQ',
        href: '/docs/faq',
        summary: 'Accounts, pricing, privacy, copyrighted texts and other common questions.',
      },
    ],
  },
]

export const docsNav: DocSection[] = allSections
  .map((section) => ({
    ...section,
    links: section.links.filter((link) => isMacAvailable || !link.mac),
  }))
  .filter((section) => section.links.length > 0)

export const allDocLinks: DocLink[] = docsNav.flatMap((s) => s.links)
