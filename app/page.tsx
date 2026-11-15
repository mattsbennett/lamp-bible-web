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
  HeroArt,
  HeroLaptopArt,
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
  FormsIcon,
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
  SeptuagintIcon,
  ShareIcon,
  SkillIcon,
  SlidesIcon,
  SyncIcon,
  TableIcon,
  TerminalIcon,
  VersesIcon,
  WindowsIcon,
} from '@/components/home/icons'
import { hasMacDownload, isMacBeta, macLabel, macRelease, site } from '@/lib/site'

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
    title: 'Read and study',
    body: 'Eleven public-domain and openly licensed texts — English, Spanish and French translations, the Hebrew and Greek, and the Septuagint in Greek and English. The KJV, the BSB, the Hebrew and Greek, and the Greek Septuagint are tagged with Strong’s numbers: tap a tagged word for its lexicon entry. Red letters, headings, poetry and paragraphs are kept as published.',
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
    title: 'Reading plans',
    body: 'Follow one of three Companion plans or make your own. Track your progress, estimate reading time, and use reminders and a Home Screen widget.',
    href: '/docs/reading-plans',
    icon: PlanIcon,
    art: <PlansArt />,
    bleed: true,
  },
  {
    title: 'Named highlights',
    body: 'Highlight in four styles and any colour. Organise highlights into sets and name colours by topic, such as “Promises” or “Calling”.',
    href: '/docs/highlights',
    icon: HighlightIcon,
    art: <HighlightsArt />,
    bleed: true,
  },
  {
    title: 'Verse and chapter notes',
    body: 'Write on a verse, a range or a whole chapter, in formatted text that sits beside the passage and exports as plain markdown.',
    href: '/docs/notes',
    icon: NoteIcon,
    art: <NotesArt />,
    bleed: true,
  },
  // Sync sits before Search so that Search leads straight into the analysis card after the grid.
  {
    title: 'Optional sync',
    body: 'Keep your library on one device or sync through iCloud Drive or your own WebDAV server. No Lamp Bible account required.',
    href: '/docs/sync',
    icon: SyncIcon,
    art: <SyncArt />,
    bleed: true,
    span: 'full-small',
  },
  {
    title: 'Search your library',
    body: 'One index across translations, lexicons, commentaries, books, notes, writing, plans, quizzes and highlights — by word, part of a word, phrase or Strong’s number, narrowed by book, module, tag or highlight colour.',
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
    title: 'Translated as',
    body: 'Compare English renderings by frequency in a chart or list.',
    icon: RenderingIcon,
  },
  {
    title: 'Forms and grammar',
    body: 'See the Hebrew or Greek forms and their grammatical parsing.',
    icon: FormsIcon,
  },
  {
    title: 'By book',
    body: 'Compare occurrences by book, with statistically unusual frequencies marked.',
    icon: ShareIcon,
  },
  {
    title: 'Found with',
    body: 'Find words that occur in the same verses, ranked by statistical confidence. Tap a word to study it.',
    icon: CompanionIcon,
  },
  {
    title: 'Every verse',
    body: 'Tap a translation or a book to list just those verses, each with the word marked.',
    icon: VersesIcon,
  },
  {
    title: 'In the Septuagint',
    body: 'For a Greek word, its verses in the Greek Old Testament beside the New Testament’s, and the Hebrew words it renders there.',
    icon: SeptuagintIcon,
  },
]

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <Writing />
        <MacFeatures />
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
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10 lg:py-24">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/lampicon.png"
              alt=""
              width={96}
              height={96}
              className="h-10 w-10 rounded-[22%] ring-1 ring-black/10 shadow-[0_8px_18px_-8px_rgba(28,18,8,0.5)]"
              priority
            />
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
              Bible reading companion
            </p>
          </div>
          <h1 className="mt-6 font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-[2.6rem] xl:text-[3rem]">
            Read, study and write
            {/* Broken only where the line is long enough to hold each half whole. */}
            <br className="hidden sm:block" /> with Lamp Bible.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Read the Bible alongside lexicons and commentaries. Follow a reading plan, take notes
            and draft a talk. Your library works offline, needs no account and can be exported.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <AppStoreBadge priority />
            {hasMacDownload && <MacDownloadButton />}
            {!hasMacDownload && (
              <Link
                href="/docs"
                className="rounded-full border border-line-strong px-5 py-3 text-sm font-medium transition-colors hover:bg-sunken"
              >
                Read the docs
              </Link>
            )}
          </div>

          <p className="mt-5 text-sm text-faint">
            {hasMacDownload ? (
              <>
                Free. {isMacBeta ? 'The Mac app is in beta and requires' : 'Mac requires'}{' '}
                {macRelease.minimumOS}.{' '}
                <Link href="/docs" className="text-muted underline-offset-4 hover:underline">
                  Read the docs →
                </Link>
              </>
            ) : (
              'Free. A Mac beta is on its way.'
            )}
          </p>
        </div>

        {/* On a phone or tablet, the phone, rising from the hero's bottom edge as the feature
            cards' phones do; on a wide screen, the Mac. */}
        <div className="self-end lg:hidden">
          <HeroArt />
        </div>
        <div className="hidden lg:block">
          <HeroLaptopArt />
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
          title="Tools for Bible study"
          body="Look up words, compare commentary and take notes alongside the passage."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
          <AnalysisCard />
        </div>

        {/* Halfway down a long page, the way in again, rather than only at the foot. */}
        <div className="mt-12 flex flex-col items-start gap-5 rounded-2xl border border-line bg-sunken px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="font-serif text-xl tracking-tight">Free, with no account required.</p>
            <p className="mt-1 text-sm text-muted">On iPhone and iPad today{hasMacDownload ? ', and on the Mac in beta' : ''}.</p>
          </div>
          <AppStoreBadge />
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
            that word across the translation: how often it occurs, how it is translated, which books use it
            and which words occur alongside it. The King James translates ἀγάπη as “love” 86
            times — and as “charity” 27.
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
            <Badge>{macLabel}</Badge>
            <p className="text-sm font-medium">Word analysis on the Mac</p>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            The same analysis — every translation that tags the word, charts by book, section or
            chapter, and the Septuagint in a tab of its own — opens beside a Strong’s search or
            beside the passage you are reading, and any of its figures goes on a slide.
          </p>
          <div className="mt-6">
            <MacAnalysisArt />
          </div>
        </div>
        {/* Set on the card's bottom edge, so the phone runs off it however tall the Mac column is. */}
        <div className="lg:order-1 lg:self-end">
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
        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{body}</p>
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
    title: 'Automatic footnote numbering',
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
    title: 'Presentation remote',
    body: 'Open decks made on the Mac, and run a Mac presentation as its remote, with speaker notes, a timer and black-out.',
    icon: RemoteIcon,
  },
]

const agentParts: Array<{ title: string; body: string; icon: IconComponent }> = [
  {
    title: 'Chat',
    body: 'Ask an agent to draft, shorten or review your writing. Choose the model and effort for each chat. Edits are saved in Revisions and can be undone.',
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
    body: 'Instructions it can follow. Three come built in: one turns the writing into slides, one checks what scripture establishes against what the writing infers, and one examines the Hebrew and Greek behind a claim.',
    icon: SkillIcon,
  },
]

function Writing() {
  const macWriting: Feature[] = [
    {
      title: 'The Mac editor',
      body: 'Visual and Markdown editing, find and replace, a Details pane for series, tags and key scriptures, footnotes edited beside their marker, companion files as tabs, and a Revision History for every change.',
      href: '/docs/writing#on-the-mac',
      icon: HistoryIcon,
      art: <MacEditorArt />,
      badge: macLabel,
    },
    {
      title: 'Slide Studio',
      body: 'Build a deck from the writing — scripture, quotations, charts of how a word is used, and speaker notes drawn from the manuscript — in eight layouts. Present full screen, export a PDF, and drive it from your iPhone.',
      href: '/docs/presenting',
      icon: SlidesIcon,
      art: <SlideArt />,
      badge: macLabel,
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
              body="Write devotionals, sermons and studies, then create slides in the Mac app."
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
              href="/docs/writing"
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
                <Badge>{macLabel}</Badge>
              </div>
              <h3 className="mt-5 font-serif text-2xl tracking-tight sm:text-3xl">
                Write with an AI agent
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Open a workspace beside any piece of writing and work on it with the AI you already
                use — Codex, Claude Code or OpenCode, signed in with your own account. It works on
                the same text you do, and looks things up in your library through read-only tools.
              </p>
              <p className="mt-5 text-xs leading-relaxed text-faint">
                AI features are off until you turn on Show AI Features in Settings → AI &amp; Agents.
                The workspace syncs with your library, so it follows the writing to your other
                Macs. Your messages go to the provider you choose, never to Lamp Bible.
              </p>
              <Link
                href="/docs/ai"
                className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
              >
                How agents work →
              </Link>
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
                Connect your AI app
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                With AI features on, turn on{' '}
                <span className="text-ink">Allow other apps to read my library</span> in Settings,
                and Claude Desktop, Codex, Cursor or opencode can search your library, read
                passages and commentary, analyse a word, and check and draw a deck — the same
                read-only tools a workspace agent has.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Turn on <span className="text-ink">Allow other apps to change my writings</span> as
                well, and an agent there can rewrite a writing’s draft too. Lamp takes the new draft
                in when you next open that writing’s workspace, and never lets it overwrite an edit of
                yours it hadn’t seen. With <span className="text-ink">Allow other apps to add reading
                plans</span>, it can make you a plan over the passages you name.
              </p>
              <p className="mt-5 text-xs leading-relaxed text-faint">
                Claude Desktop installs Lamp in one step and asks first; the others take a snippet
                you paste. What those apps read goes to the AI provider they use. Turning AI
                features off withdraws their access too.
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
    body: 'Tabs and separate windows, a Today page with your plans and where you left off, a study column with commentary, verse notes, original language and dictionary, up to three other translations side by side, and today’s readings in the menu bar.',
    href: '/docs/reader#on-the-mac',
    icon: WindowsIcon,
  },
  {
    title: 'Reader Chat',
    body: 'Ask about the chapter in front of you, or the words you have selected, and start a writing from the conversation when you want to develop an idea. Answers come from your own modules, through your own Codex, Claude Code or OpenCode account, on the model you choose. Off until you turn AI features on.',
    href: '/docs/ai',
    icon: ChatIcon,
  },
  {
    title: 'Make your own modules',
    body: 'Drop in module JSON, see it validated, and build an integrity-checked .lamp of any of the nine types, ready to install or share.',
    href: '/docs/modules#on-the-mac',
    icon: ModuleIcon,
  },
]

function MacFeatures() {
  return (
    <section id="mac" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="On the Mac"
          title="Lamp Bible for Mac"
          body={`The Mac app${isMacBeta ? ', now in beta,' : ''} syncs with your iPhone and iPad and adds desktop editing and presentation tools.`}
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
            body="Translations, dictionaries, commentaries, books, reading plans, quizzes, highlights, notes and writing all use the same container: a compressed SQLite package with a .lamp extension. The app treats what ships with it and what you make yourself exactly the same way."
          />

          <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted">
            <p>
              Export your notes as a module or edit them as markdown. You can also export
              highlights with their colour names, and back up both to your own server.
            </p>
            <p>
              Build a <code className="rounded border border-line bg-canvas px-1.5 py-0.5 text-[0.85em]">.lamp</code>{' '}
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
              ['Writing', 'Your long-form documents, with media', 'You edit'],
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
          body="The app has no sign-in and collects nothing about you. Bundled content is on the device after install, so the whole library works in airplane mode. The Mac app checks for updates only if you allow it."
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
          <Point title="Export your work">
            Notes and writing round-trip through plain markdown. Modules export as{' '}
            <code className="rounded border border-line bg-sunken px-1.5 py-0.5 text-[0.85em]">
              .lamp
            </code>{' '}
            packages.
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
          Free, with a library included. iPhone and iPad{isMacBeta ? ', and Mac in beta.' : ' and Mac.'}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <AppStoreBadge size="lg" />
          {hasMacDownload && <MacDownloadButton size="lg" />}
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
