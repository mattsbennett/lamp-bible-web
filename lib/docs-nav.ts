export type DocLink = {
  title: string
  href: string
  summary: string
}

export type DocSection = {
  title: string
  links: DocLink[]
}

export const docsNav: DocSection[] = [
  {
    title: 'Start here',
    links: [
      {
        title: 'Overview',
        href: '/docs',
        summary: 'An introduction to Lamp Bible and its documentation.',
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
        summary: 'Strong’s, BDB, TBESG and Dodson lookups from any tagged word, and how to order them.',
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
        title: 'Writing',
        href: '/docs/writing',
        summary: 'Long-form writing with footnotes, images, audio, scripture links and present mode.',
      },
      {
        title: 'Slides & presenting',
        href: '/docs/presenting',
        summary: 'Slide Studio decks from your writing, and an iPhone remote with your speaker notes.',
      },
      {
        title: 'AI features',
        href: '/docs/ai',
        summary:
          'Plans from a description with Apple Intelligence, and on the Mac, Reader Chat and writing agents through your own AI account.',
      },
    ],
  },
  {
    title: 'Data & modules',
    links: [
      {
        title: 'The module system',
        href: '/docs/modules',
        summary: 'Install, create, export and manage library modules.',
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
        summary: 'Import and export notes and writing as markdown.',
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

export const allDocLinks: DocLink[] = docsNav.flatMap((s) => s.links)
