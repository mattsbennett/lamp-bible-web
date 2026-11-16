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
    body: 'Read eleven public-domain and openly licensed texts in English, Spanish, French, Hebrew and Greek, including the Septuagint. In the KJV, BSB, Hebrew and Greek texts, and Greek Septuagint, tap tagged words for lexicon entries. Original headings, poetry, paragraphs and red letters are preserved.',
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
    body: 'Search your library and personal work by word, partial word, phrase or Strong’s number. Filter by book, module, tag or highlight colour.',
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
    body: 'Compare a Greek word’s use in the Old and New Testaments, and see which Hebrew words it translates.',
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
            Open word analysis from a lexicon entry or Strong’s search to see how often a word
            occurs, how it is translated and which words occur alongside it. For example, the
            King James Version translates ἀγάπη as “love” 86 times and “charity” 27 times.
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
        <div className="lg:order-2 lg:pb-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Badge>{macLabel}</Badge>
            <p className="text-sm font-medium">Word analysis on the Mac</p>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            On the Mac, analysis opens beside your search or passage. Compare tagged translations,
            view charts by book, section or chapter, and explore the Septuagint in its own tab.
            Add any figure to a slide.
          </p>
          <div className="mt-6">
            <MacAnalysisArt />
          </div>
        </div>
        {/* Its own heading level with the Mac's, and the phone set on the card's bottom edge, so
            it runs off the card however tall the Mac column is. */}
        <div className="flex flex-col lg:order-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Badge>iPhone &amp; iPad</Badge>
            <p className="text-sm font-medium">Word analysis on iPhone and iPad</p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Analysis opens over your passage, with definitions, word forms and grammar. Tap a word
            form or book to filter the matching verses.
          </p>
          <div className="mt-8 lg:mt-auto lg:pt-8">
            <AnalysisArt />
          </div>
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
    body: 'View decks made on the Mac or control a Mac presentation with speaker notes, a timer and a screen blackout button.',
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
    body: 'Three built-in skills create slides, review claims against scripture and examine the Hebrew or Greek behind a claim. You can add your own instructions.',
    icon: SkillIcon,
  },
]

function Writing() {
  const macWriting: Feature[] = [
    {
      title: 'The Mac editor',
      body: 'Edit visually or in Markdown, use find and replace, and organise drafts by series, tags and key scriptures. Edit footnotes beside their markers, open companion files in tabs and restore earlier versions from Revision History.',
      href: '/docs/writing#on-the-mac',
      icon: HistoryIcon,
      art: <MacEditorArt />,
      badge: macLabel,
    },
    {
      title: 'Slide Studio',
      body: 'Create slides with scripture, quotations and word-analysis charts in eight layouts. Use your manuscript as speaker notes, present full screen, export a PDF and control the presentation from your iPhone.',
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
                Enable <span className="text-ink">Allow other apps to read my library</span>{' '}in Settings
                → AI &amp; Agents. Claude Desktop, Codex, Cursor or OpenCode can then search your library,
                read passages and commentary, analyse words and preview decks.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Enable <span className="text-ink">Allow other apps to change my writings</span> to let
                an agent edit a draft. Lamp imports it when you next open the workspace and protects
                any changes you made in the meantime. <span className="text-ink">Allow other apps to add
                reading plans</span> lets an agent create plans for passages you choose.
              </p>
              <p className="mt-5 text-xs leading-relaxed text-faint">
                Claude Desktop asks for confirmation before installing the connection. Other apps use
                a configuration snippet you paste into their settings. Content they read goes to their
                AI provider. Turning off AI features revokes their access.
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
    body: 'Read in tabs or separate windows, compare up to four translations and open study tools beside the text. Today shows your plans and recent work; the menu bar gives quick access to today’s readings.',
    href: '/docs/reader#on-the-mac',
    icon: WindowsIcon,
  },
  {
    title: 'Reader Chat',
    body: 'Discuss a chapter or selected words using your modules and your Codex, Claude Code or OpenCode account. Choose the model and turn a conversation into a draft. Reader Chat is off until you enable AI features.',
    href: '/docs/ai',
    icon: ChatIcon,
  },
  {
    title: 'Make your own modules',
    body: 'Validate module JSON and build a .lamp file to install or share. All nine module types are supported, with an integrity check before export.',
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
            body="Lamp stores library content and your work as modules. You can install, create and export .lamp files using the documented format."
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
              You can also{' '}
              <Link href="/docs/modules/import-bible" className="text-accent hover:underline">
                Import a Bible
              </Link>{' '}
              from USFM, OSIS, Zefania or SWORD files, including locked SWORD modules with your unlock key. Imported texts support search and, where tagged, word lookups. Long-form{' '}
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
          title="Read offline, without tracking"
          body="Reading needs no account or internet connection. The app has no analytics or tracking. Sync and AI are optional, and the Mac app asks before checking for updates automatically."
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
