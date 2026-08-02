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
        summary: 'What Lamp Bible is, how it is put together, and where to go next.',
      },
      {
        title: 'Getting started',
        href: '/docs/getting-started',
        summary: 'Install the app, pick a translation, and find your way around the five tabs.',
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
          'Translations, Strong’s numbers, split panes, the tool panel, read aloud, and navigation.',
      },
      {
        title: 'Reading plans',
        href: '/docs/reading-plans',
        summary: 'Daily plans, progress, reminders, reading-time estimates, quizzes and the widget.',
      },
      {
        title: 'Search',
        href: '/docs/search',
        summary: 'Full-text search across every module, with filters for type, series, tag and colour.',
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
        summary: 'Verse and chapter notes with footnotes, written beside the text you are reading.',
      },
      {
        title: 'Devotionals',
        href: '/docs/devotionals',
        summary: 'Long-form writing with images, audio, scripture links, present mode and sharing.',
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
        summary: 'Markdown round-trips for notes and devotionals, including embedded media.',
      },
      {
        title: 'Sync & backup',
        href: '/docs/sync',
        summary: 'Local-only, iCloud Drive, or your own WebDAV server. Conflicts and migration.',
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
