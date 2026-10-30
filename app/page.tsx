import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { AppStoreBadge, MacDownloadButton } from '@/components/DownloadButtons'
import {
  AgentWorkspaceArt,
  AnalysisArt,
  ExternalAppsArt,
  HighlightsArt,
  MacAnalysisArt,
  MacEditorArt,
  NotesArt,
  PhoneWritingArt,
  PlansArt,
  ReaderArt,
  SearchArt,
  SlideArt,
  StudyArt,
  SyncArt,
} from '@/components/home/art'
import {
  AgentIcon,
  AnalysisIcon,
  ChatIcon,
  CompanionIcon,
  FolderIcon,
  FootnoteIcon,
  FullScreenIcon,
  HighlightIcon,
  HistoryIcon,
  type IconComponent,
  MicIcon,
  ModuleIcon,
  NoteIcon,
  PanelIcon,
  PlanIcon,
  PlugIcon,
  ReaderIcon,
  RemoteIcon,
  RenderingIcon,
  SearchIcon,
  ShareIcon,
  SkillIcon,
  SlidesIcon,
  SyncIcon,
  TableIcon,
  TerminalIcon,
  VersesIcon,
  WindowsIcon,
} from '@/components/home/icons'
import { availablePlatforms, isMacAvailable, macRelease, plannedPlatforms, site } from '@/lib/site'

type Feature = {
  title: string
  body: string
  href?: string
  icon: IconComponent
  art: ReactNode
  /** Grid span: `wide` takes two columns and sets the art beside the text on large screens. */
  span?: 'wide' | 'full-small'
  badge?: string
  /** The art runs off the bottom of the card, as an iPhone cut off at the edge. */
  bleed?: boolean
}

const features: Feature[] = [
  {
    title: 'A study-grade reader',
    body: 'Five public-domain and openly licensed translations, most tagged with Strong’s numbers and morphology. Tap a tagged word for its lexicon entry. Red letters, headings, poetry and paragraphs are kept as published.',
    href: '/docs/reader',
    icon: ReaderIcon,
    art: <ReaderArt />,
    bleed: true,
    span: 'wide',
  },
  {
    title: 'Study tools beside the text',
    body: 'Commentary, cross-references, your notes or your own writing in a panel beside the passage, scrolling with the verse you are on.',
    href: '/docs/reader',
    icon: PanelIcon,
    art: <StudyArt />,
    bleed: true,
  },
  {
    title: 'Reading plans that keep up',
    body: 'Three public-domain Companion plans, or your own: tick off each reading, see how long the day will take at your pace, and get a reminder and a widget.',
    href: '/docs/reading-plans',
    icon: PlanIcon,
    art: <PlansArt />,
    bleed: true,
  },
  {
    title: 'Highlights with meaning',
    body: 'Four styles and any colour, kept in sets. Name a colour — “Promises”, “Calling” — and the meaning travels with your highlights.',
    href: '/docs/highlights',
    icon: HighlightIcon,
    art: <HighlightsArt />,
    bleed: true,
  },
  {
    title: 'Notes anchored to verses',
    body: 'Write on a verse, a range or a whole chapter, in formatted text that sits beside the passage and exports as plain markdown.',
    href: '/docs/notes',
    icon: NoteIcon,
    art: <NotesArt />,
    bleed: true,
  },
  // Sync sits before Search so that Search leads straight into the analysis card after the grid.
  {
    title: 'Sync on your terms',
    body: 'Keep everything on the device, sync through iCloud Drive, or use your own WebDAV server. No account, ever.',
    href: '/docs/sync',
    icon: SyncIcon,
    art: <SyncArt />,
    bleed: true,
    span: 'full-small',
  },
  {
    title: 'Search that reaches everything',
    body: 'One index across translations, lexicons, commentaries, books, notes, writing and highlights — by word, phrase or Strong’s number, narrowed by module, tag or highlight colour.',
    href: '/docs/search',
    icon: SearchIcon,
    art: <SearchArt />,
    bleed: true,
    span: 'wide',
  },
]

/** What the Strong's analysis shows, on iPhone, iPad and Mac. */
const analysisParts: Array<{ title: string; body: string; icon: IconComponent }> = [
  {
    title: 'Rendered as',
    body: 'Every English word translators chose for it, commonest first, as a list or a ring.',
    icon: RenderingIcon,
  },
  {
    title: 'By book',
    body: 'Where it falls, with each book marked when it holds more or fewer than its length predicts — by a margin chance would rarely give.',
    icon: ShareIcon,
  },
  {
    title: 'Found with',
    body: 'The words that share its verses, the most certain first. Tap one to study it next.',
    icon: CompanionIcon,
  },
  {
    title: 'Every verse',
    body: 'Tap a rendering or a book to list just those verses, each with the word marked.',
    icon: VersesIcon,
  },
]

// Until the Mac app ships, its tools are a preview: badged, and without links into the Mac docs,
// which are hidden until then.
const macBadge = isMacAvailable ? 'Mac' : 'Coming to Mac'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <Writing />
        {isMacAvailable && <MacFeatures />}
        <Modules />
        <Privacy />
        <Download />
      </main>
      <SiteFooter />
    </>
  )
}

function Hero() {
  return (
    <section className="hero-glow border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_auto]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Bible reading companion
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Everything you study,
            <br />
            in one place you own.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Lamp Bible puts translations, lexicons, commentaries, reading plans, your notes,
            devotionals and highlights behind a single reader — working offline, with no account,
            and stored in an open format you can export at any time.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            {isMacAvailable && <MacDownloadButton />}
            <AppStoreBadge priority />
            {!isMacAvailable && (
              <Link
                href="/docs"
                className="rounded-full border border-line-strong px-5 py-3 text-sm font-medium transition-colors hover:bg-sunken"
              >
                Read the docs
              </Link>
            )}
          </div>

          <p className="mt-5 text-sm text-faint">
            {isMacAvailable ? (
              <>
                Free. Mac requires {macRelease.minimumOS}.{' '}
                <Link href="/docs" className="text-muted underline-offset-4 hover:underline">
                  Read the docs →
                </Link>
              </>
            ) : (
              plannedPlatforms.length > 0 &&
              `${plannedPlatforms.map((p) => p.name).join(' and ')} version in development.`
            )}
          </p>
        </div>

        <div className="justify-self-center lg:justify-self-end">
          <Image
            src="/lampicon.png"
            alt="Lamp Bible app icon"
            width={256}
            height={256}
            className="h-56 w-56 rounded-[22%] ring-1 ring-black/10 shadow-[0_30px_70px_-20px_rgba(28,18,8,0.55)] sm:h-64 sm:w-64"
            priority
          />
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Features"
          title="Built for reading closely"
          body="Not a verse-of-the-day app. Lamp Bible is for people who read a passage, look up a word, check a commentary, and write down what they found."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
          <AnalysisCard />
        </div>
      </div>
    </section>
  )
}

/** The Strong's analysis, across the grid's full width: the phone's sheet, and the Mac's charts. */
function AnalysisCard() {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-raised sm:col-span-2 lg:col-span-3">
      <div className="grid gap-10 p-6 sm:p-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14 lg:p-10">
        <div>
          <IconChip icon={AnalysisIcon} />
          <h3 className="mt-5 font-serif text-xl tracking-tight sm:text-2xl">
            See how a word is used
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-base">
            Open the analysis from a word’s lexicon entry or a Strong’s search, and Lamp Bible counts
            that word across the translation: how often it occurs, how translators rendered it, where
            it gathers and what it keeps company with. The King James renders ἀγάπη “love” 86 times
            — and “charity” 27.
          </p>
          <Link
            href="/docs/search#analysis"
            className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
          >
            Learn more →
          </Link>
        </div>
        <ul className="grid content-start gap-x-8 gap-y-6 sm:grid-cols-2">
          {analysisParts.map((part) => (
            <li key={part.title} className="flex gap-3.5">
              <IconChip icon={part.icon} size="sm" />
              <div>
                <p className="text-sm font-medium">{part.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{part.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-10 border-t border-line bg-sunken px-5 pt-8 sm:px-10 lg:grid-cols-[18.5rem_minmax(0,1fr)] lg:gap-12 lg:pt-10">
        <div className="lg:order-2 lg:self-center lg:pb-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Badge>{macBadge}</Badge>
            <p className="text-sm font-medium">More room for it on the Mac</p>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Beside a Strong’s search: compare every translation that tags the word, read its forms
            and grammar, chart it by book, section or chapter, and put the chart on a slide.
          </p>
          <div className="mt-6">
            <MacAnalysisArt />
          </div>
        </div>
        <div className="lg:order-1">
          <AnalysisArt />
        </div>
      </div>
    </article>
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  const { title, body, href, icon, art, span, badge, bleed } = feature
  const wide = span === 'wide'
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border border-line bg-raised ${
        wide
          ? 'sm:col-span-2 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'
          : span === 'full-small'
            ? 'sm:col-span-2 lg:col-span-1'
            : ''
      }`}
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <IconChip icon={icon} />
          {badge && <Badge>{badge}</Badge>}
        </div>
        <h3 className="mt-5 font-serif text-xl tracking-tight">{title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">{body}</p>
        {href && (
          <Link
            href={href}
            className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
          >
            Learn more →
          </Link>
        )}
      </div>
      <div
        className={`mt-auto border-t border-line bg-sunken ${
          bleed ? 'px-5 pt-7 sm:px-6' : 'p-5 sm:p-6'
        } ${
          wide
            ? `lg:mt-0 lg:flex lg:flex-col lg:border-l lg:border-t-0 ${
                bleed ? 'lg:justify-end lg:pt-10' : 'lg:justify-center'
              }`
            : ''
        }`}
      >
        {art}
      </div>
    </article>
  )
}

/** What writing on iPhone and iPad already does, shown beside the phone editor. */
const phoneWriting: Array<{ title: string; body: string; icon: IconComponent }> = [
  {
    title: 'Footnotes that keep count',
    body: 'Numbered in order of first mention, with any label you like. Tap a marker to reach its note.',
    icon: FootnoteIcon,
  },
  {
    title: 'Tables and scripture',
    body: 'Quote a passage, link a reference, and lay a comparison out in a table.',
    icon: TableIcon,
  },
  {
    title: 'Pictures and recordings',
    body: 'Add photos, or record audio straight into the piece.',
    icon: MicIcon,
  },
  {
    title: 'Present mode',
    body: 'Full screen, at a size you can read from a lectern.',
    icon: FullScreenIcon,
  },
  {
    title: 'Slides in your pocket',
    body: 'Open decks made on the Mac, and run a Mac presentation as its remote, with speaker notes, a timer and black-out.',
    icon: RemoteIcon,
  },
]

const agentParts: Array<{ title: string; body: string; icon: IconComponent }> = [
  {
    title: 'Chat',
    body: 'Ask for a draft, a cut or a check. Its edits go straight into the draft, and every one lands in Revisions, where you can undo it.',
    icon: ChatIcon,
  },
  {
    title: 'Terminal',
    body: 'Your provider’s own tool, continuing the same session.',
    icon: TerminalIcon,
  },
  {
    title: 'Context',
    body: 'Sources, an earlier talk, research notes — read-only copies for the agent to work from.',
    icon: FolderIcon,
  },
  {
    title: 'Workspace Skills',
    body: 'Instructions it can follow. Build Lamp Deck, built in, turns the writing into slides.',
    icon: SkillIcon,
  },
]

function Writing() {
  const macWriting: Feature[] = [
    {
      title: 'A writing desk on the Mac',
      body: 'Visual and Markdown editing, find and replace, a Details pane for series, tags and key scriptures, footnotes edited beside their marker, companion files as tabs, and a Revision History for every change.',
      href: isMacAvailable ? '/docs/mac' : undefined,
      icon: HistoryIcon,
      art: <MacEditorArt />,
      badge: macBadge,
    },
    {
      title: 'Slide Studio',
      body: 'Build a deck from the writing — scripture, quotations, charts of how a word is used, and speaker notes drawn from the manuscript — in eight layouts. Present full screen, export a PDF, and drive it from your iPhone.',
      href: isMacAvailable ? '/docs/presenting' : undefined,
      icon: SlidesIcon,
      art: <SlideArt />,
      badge: macBadge,
    },
  ]

  return (
    <section id="writing" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)]">
          <div>
            <SectionHeading
              eyebrow="Writing"
              title="Write, then present"
              body="Devotionals, sermons and studies get a proper editor rather than a notes field, and go from manuscript to slides without leaving Lamp Bible."
            />
            <p className="mt-10 text-xs font-semibold uppercase tracking-wider text-faint">
              On iPhone and iPad
            </p>
            <ul className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {phoneWriting.map((item) => (
                <li key={item.title} className="flex gap-3.5">
                  <IconChip icon={item.icon} size="sm" />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/docs/devotionals"
              className="mt-8 inline-block text-sm font-medium text-accent hover:underline"
            >
              Writing on iPhone and iPad →
            </Link>
          </div>
          <PhoneWritingArt />
        </div>

        <div className="mt-20 overflow-hidden rounded-3xl border border-line bg-raised">
          <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <div>
              <div className="flex items-center justify-between gap-3">
                <IconChip icon={AgentIcon} />
                <Badge>{macBadge}</Badge>
              </div>
              <h3 className="mt-5 font-serif text-2xl tracking-tight sm:text-3xl">
                An agent at your writing desk
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Open a workspace beside any piece of writing and work on it with the AI you already
                use — Codex, Claude Code or OpenCode, signed in with your own account. It works on
                the same text you do, and looks things up in your library through read-only tools.
              </p>
              <p className="mt-5 text-xs leading-relaxed text-faint">
                The workspace syncs with your library, so it follows the writing to your other
                Macs. Your messages go to the provider you choose, never to Lamp Bible.
              </p>
              {isMacAvailable && (
                <Link
                  href="/docs/ai"
                  className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
                >
                  How agents work →
                </Link>
              )}
            </div>
            <ul className="grid content-start gap-x-8 gap-y-6 sm:grid-cols-2">
              {agentParts.map((part) => (
                <li key={part.title} className="flex gap-3.5">
                  <IconChip icon={part.icon} size="sm" />
                  <div>
                    <p className="text-sm font-medium">{part.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{part.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-line bg-sunken px-5 py-8 sm:px-10 sm:py-10">
            <div className="mx-auto max-w-3xl">
              <AgentWorkspaceArt />
            </div>
          </div>
          <div className="grid items-center gap-10 border-t border-line p-7 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <div>
              <IconChip icon={PlugIcon} size="sm" />
              <h4 className="mt-5 font-serif text-xl tracking-tight sm:text-2xl">
                Or bring Lamp to the AI app you already use
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Turn on <span className="text-ink">Use Lamp in Other Apps</span>, and Claude Desktop,
                Codex, Cursor or opencode can search your library, read passages and commentary,
                analyse a word, and check and draw a deck — the same read-only tools a workspace
                agent has.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Allow it, and an agent there can rewrite a writing’s draft too. Lamp takes the new
                draft in when you next open that writing’s workspace, and never lets it overwrite an
                edit of yours it hadn’t seen.
              </p>
              <p className="mt-5 text-xs leading-relaxed text-faint">
                Claude Desktop installs Lamp in one step and asks first; the others take a snippet
                you paste. What those apps read goes to the AI provider they use.
              </p>
            </div>
            <ExternalAppsArt />
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {macWriting.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

const macFeatures: Array<{ title: string; body: string; href: string; icon: IconComponent }> = [
  {
    title: 'A reader built for the Mac',
    body: 'Tabs and separate windows, a study column with commentary, verse notes, original language and dictionary, up to three other translations side by side, and today’s readings in the menu bar.',
    href: '/docs/mac',
    icon: WindowsIcon,
  },
  {
    title: 'Reader Chat',
    body: 'Ask about the chapter in front of you. Answers come from your own modules, through your own Codex, Claude Code or OpenCode account.',
    href: '/docs/ai',
    icon: ChatIcon,
  },
  {
    title: 'Make your own modules',
    body: 'Drop in module JSON, see it validated, and build an integrity-checked .lamp of any of the nine types, ready to install or share.',
    href: '/docs/mac#make-a-module',
    icon: ModuleIcon,
  },
]

function MacFeatures() {
  return (
    <section id="mac" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="On the Mac"
          title="Study with room to spread out"
          body="The Mac app reads the same library and syncs with your iPhone and iPad, and adds the tools that want a bigger screen and a keyboard."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {macFeatures.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-line bg-raised p-6 sm:p-7">
              <IconChip icon={feature.icon} />
              <h3 className="mt-5 font-serif text-xl tracking-tight">{feature.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{feature.body}</p>
              <Link
                href={feature.href}
                className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function IconChip({ icon: Icon, size = 'md' }: { icon: IconComponent; size?: 'sm' | 'md' }) {
  return (
    <span
      className={`grid shrink-0 place-items-center bg-accent-soft text-accent ${
        size === 'sm' ? 'h-9 w-9 rounded-lg' : 'h-11 w-11 rounded-xl'
      }`}
    >
      <Icon className={size === 'sm' ? 'h-[18px] w-[18px]' : 'h-[22px] w-[22px]'} />
    </span>
  )
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-xs font-medium text-muted">
      {children}
    </span>
  )
}

function Modules() {
  return (
    <section id="modules" className="border-b border-line bg-sunken">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="The module system"
            title="Every piece of content is a module"
            body="Translations, dictionaries, commentaries, books, reading plans, quizzes, highlights, notes and devotionals all use the same container: a compressed SQLite package with a .lamp extension. The app treats what ships with it and what you make yourself exactly the same way."
          />

          <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted">
            <p>
              That has a practical consequence. Your notes are not rows locked inside an app
              database — they are a module you can export, edit as markdown, back up to your own
              server, and import somewhere else. So are your highlights, with the colour meanings
              you gave them.
            </p>
            <p>
              It also means the library is extensible. Build a <code className="rounded border border-line bg-canvas px-1.5 py-0.5 text-[0.85em]">.lamp</code>{' '}
              file from the published JSON schemas and the app will install it, index it for search
              and show it in the reader beside everything else.
            </p>
            <p>
              Or bring what you already own.{' '}
              <Link href="/docs/modules/import-bible" className="text-accent hover:underline">
                Import a Bible
              </Link>{' '}
              as USFM, OSIS, Zefania or a SWORD module — locked ones included — and it gets the same
              word lookups and search as the bundled translations. Long-form{' '}
              <Link href="/docs/books" className="text-accent hover:underline">
                books
              </Link>{' '}
              install the same way, with their contents, footnotes and live scripture references.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/docs/modules"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              How modules work
            </Link>
            <Link
              href="/docs/modules/authoring"
              className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors hover:bg-canvas"
            >
              Authoring reference
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-canvas p-7">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            Module types
          </h3>
          <dl className="mt-5 divide-y divide-[var(--line)]">
            {[
              ['Translation', 'Verse text with Strong’s, morphology, headings and footnotes', 'Read-only'],
              ['Dictionary', 'Lexicon entries keyed by Strong’s number or lemma', 'Read-only'],
              ['Commentary', 'Verse- or pericope-keyed exposition, grouped into series', 'Read-only'],
              ['Book', 'Long-form publications in chapters and sections', 'Read-only'],
              ['Plan', 'Dated reading assignments across the year', 'Read-only'],
              ['Quiz', 'Age-graded questions tied to a plan’s readings', 'Read-only'],
              ['Notes', 'Your verse-anchored study notes', 'You edit'],
              ['Devotional', 'Your long-form writing, with media', 'You edit'],
              ['Highlights', 'Your highlight spans and colour themes', 'You edit'],
            ].map(([name, desc, mode]) => (
              <div key={name} className="flex items-baseline gap-4 py-3 first:pt-0 last:pb-0">
                <dt className="w-24 shrink-0 text-sm font-medium">{name}</dt>
                <dd className="flex-1 text-sm text-muted">{desc}</dd>
                <dd
                  className={`shrink-0 text-xs ${
                    mode === 'You edit' ? 'text-accent' : 'text-faint'
                  }`}
                >
                  {mode}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Privacy() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Your data"
          title="No account. No tracking. No network required."
          body={`The app has no sign-in and collects nothing about you. Bundled content is on the device after install, so the whole library works in airplane mode.${
            isMacAvailable ? ' The Mac app checks for updates only if you allow it.' : ''
          }`}
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <Point title="Offline by default">
            Translations, lexicons, cross-references, commentaries and plans ship inside the app.
            Nothing you read requires a connection.
          </Point>
          <Point title="Sync you control">
            Choose local-only storage, iCloud Drive — where your files stay visible in the Files app
            — or your own WebDAV server such as Nextcloud or Synology.
          </Point>
          <Point title="Exit at any time">
            Notes and devotionals round-trip through plain markdown. Modules export as{' '}
            <code className="rounded border border-line bg-sunken px-1.5 py-0.5 text-[0.85em]">
              .lamp
            </code>{' '}
            packages. Nothing is trapped.
          </Point>
        </div>
      </div>
    </section>
  )
}

function Download() {
  return (
    <section className="hero-glow">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">Start reading</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Free, with a library included. {availablePlatforms.map((p) => p.name).join(', ')}.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          {isMacAvailable && <MacDownloadButton size="lg" />}
          <AppStoreBadge size="lg" />
        </div>

        <p className="mt-10 text-sm text-muted">
          Questions or a feature request?{' '}
          <a
            href={site.issuesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Open an issue
          </a>{' '}
          or email {site.email}.
        </p>
      </div>
    </section>
  )
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-muted">{body}</p>
    </div>
  )
}

function Point({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-raised p-6">
      <h3 className="font-serif text-lg tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
    </div>
  )
}
