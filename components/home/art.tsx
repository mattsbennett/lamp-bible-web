/**
 * Illustrated screens for the homepage. They borrow the apps' own labels and
 * layout but are drawn, not captured, so they stay sharp, follow the site's
 * light and dark themes, and never show anyone's library. Each is one image to
 * assistive technology, described by its label.
 */
import type { ReactNode } from 'react'
import {
  ChatIcon,
  FolderIcon,
  FootnoteIcon,
  HistoryIcon,
  MicIcon,
  SearchIcon,
  SkillIcon,
  TableIcon,
  TerminalIcon,
} from './icons'

const screen = 'rounded-xl border border-line bg-raised art-shadow'

function Art({ label, className = '', children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div role="img" aria-label={label} className={`select-none ${className}`}>
      {children}
    </div>
  )
}

function VerseNumber({ n }: { n: number }) {
  return <sup className="mr-1 font-sans text-[9px] font-semibold text-accent">{n}</sup>
}

/** Placeholder text: a grey bar standing in for a line of copy. */
function Line({ w, className = '' }: { w: string; className?: string }) {
  return <span className={`block h-1.5 rounded-full bg-[var(--line-strong)] ${className}`} style={{ width: w }} />
}

function Chip({ active = false, children }: { active?: boolean; children: ReactNode }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
        active ? 'bg-accent text-white' : 'border border-line text-muted'
      }`}
    >
      {children}
    </span>
  )
}

export function ReaderArt() {
  return (
    <Art label="The reader at John 1:1 in the KJV with Strong’s numbers, with the lexicon entry for “Word”, G3056 logos, open beneath the verse.">
      <div className={`${screen} mx-auto max-w-lg p-5`}>
        <div className="flex items-center justify-between text-[11px]">
          <span className="rounded-full border border-line px-2.5 py-0.5 font-medium text-muted">
            John 1
          </span>
          <span className="text-faint">KJVs</span>
        </div>
        <p className="mt-4 font-serif text-[15px] leading-7">
          <VerseNumber n={1} />
          In the beginning was the{' '}
          <span className="rounded bg-accent-soft px-0.5 text-accent underline decoration-dotted underline-offset-4">
            Word
          </span>
          , and the Word was with God, and the Word was God. <VerseNumber n={2} />
          The same was in the beginning with God.
        </p>
        <div className="mt-3 rounded-lg border border-line bg-sunken p-3.5">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-[11px] font-semibold text-accent">G3056</span>
            <span className="font-serif text-lg leading-none">λόγος</span>
            <span className="text-xs italic text-muted">logos</span>
            <span className="ml-auto text-[10px] text-faint">N-NSM · noun</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Something said, including the thought; … specially, with the article in John, the
            Divine Expression (i.e. Christ).
          </p>
        </div>
      </div>
    </Art>
  )
}

export function StudyArt() {
  return (
    <Art label="Romans 8 beside the tool panel, which shows cross-references for verse 28 from the Treasury of Scripture Knowledge.">
      <div className={`${screen} grid grid-cols-[1fr_1.15fr] overflow-hidden`}>
        <div className="space-y-2.5 p-3.5">
          <p className="text-[10px] font-medium text-faint">Romans 8</p>
          <Line w="92%" />
          <Line w="78%" />
          <div className="-mx-1.5 rounded-md border-l-2 border-[var(--accent)] bg-accent-soft px-1.5 py-1.5">
            <p className="font-serif text-[11px] leading-snug">
              <VerseNumber n={28} />
              And we know that all things work together for good…
            </p>
          </div>
          <Line w="85%" />
          <Line w="64%" />
        </div>
        <div className="border-l border-line bg-sunken p-3.5">
          <div className="flex gap-1 overflow-hidden">
            <Chip>Notes</Chip>
            <Chip active>Commentary</Chip>
          </div>
          <p className="mt-3 text-[9px] font-semibold uppercase tracking-wider text-faint">
            TSKe · verse 28
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
            <span className="text-ink">all things.</span>{' '}
            <span className="text-accent">Gen 50:20</span> ·{' '}
            <span className="text-accent">Deut 8:16</span> ·{' '}
            <span className="text-accent">Ps 119:71</span> ·{' '}
            <span className="text-accent">2 Cor 4:17</span>
          </p>
          <div className="mt-2.5 space-y-2">
            <Line w="90%" />
            <Line w="70%" />
          </div>
        </div>
      </div>
    </Art>
  )
}

export function PlansArt() {
  const readings = [
    { passage: 'Ezekiel 33', minutes: 6, done: true },
    { passage: 'Psalm 119:1–40', minutes: 7, done: false },
    { passage: '1 Peter 3', minutes: 4, done: false },
  ]
  return (
    <Art label="Today’s readings from The Bible Companion: Ezekiel 33 ticked off, two more to go, about seventeen minutes in all, with a Continue Reading button.">
      <div className={`${screen} p-4`}>
        <div className="flex items-baseline justify-between">
          <p className="font-serif text-base">Today</p>
          <p className="text-[10px] text-faint">17 min</p>
        </div>
        <p className="text-[10px] text-faint">The Bible Companion</p>
        <ul className="mt-3 space-y-2">
          {readings.map((r) => (
            <li key={r.passage} className="flex items-center gap-2.5 text-xs">
              <span
                className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                  r.done ? 'border-[var(--accent)] bg-accent text-white' : 'border-line-strong'
                }`}
              >
                {r.done && (
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="m2.5 6 2.5 2.5 4.5-5" />
                  </svg>
                )}
              </span>
              <span className={r.done ? 'text-faint line-through' : ''}>{r.passage}</span>
              <span className="ml-auto text-[10px] text-faint">{r.minutes} min</span>
            </li>
          ))}
        </ul>
        <span className="mt-4 block rounded-full bg-accent py-1.5 text-center text-[11px] font-medium text-white">
          Continue Reading
        </span>
      </div>
    </Art>
  )
}

export function HighlightsArt() {
  return (
    <Art label="Romans 8:28 with two highlights: a yellow fill from the theme “Promises” and a blue underline from the theme “Calling”, above the four highlight styles.">
      <div className={`${screen} p-4`}>
        <p className="font-serif text-[13px] leading-6">
          <VerseNumber n={28} />
          And we know that{' '}
          <span className="rounded-sm bg-(--art-yellow) px-0.5">
            all things work together for good
          </span>{' '}
          to them that love God, to them who are the{' '}
          <span className="underline decoration-(--art-blue) decoration-2 underline-offset-[3px]">
            called according to his purpose
          </span>
          .
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-2.5 text-[10px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-(--art-yellow)" />
            Promises
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 bg-(--art-blue)" />
            Calling
          </span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px] text-muted">
          <span className="rounded border border-line px-1.5 py-0.5">
            <span className="bg-(--art-green) px-0.5">Highlight</span>
          </span>
          <span className="rounded border border-line px-1.5 py-0.5">
            <span className="underline decoration-(--art-pink) decoration-2">Underline</span>
          </span>
          <span className="rounded border border-line px-1.5 py-0.5">
            <span className="underline decoration-(--art-blue) decoration-dashed decoration-2">Dashed</span>
          </span>
          <span className="rounded border border-line px-1.5 py-0.5">
            <span className="underline decoration-[var(--accent)] decoration-dotted decoration-2">Dotted</span>
          </span>
        </div>
      </div>
    </Art>
  )
}

export function NotesArt() {
  return (
    <Art label="A note on Romans 8:28–30 in formatted text, with a footnote giving the Greek word for “called”.">
      <div className={`${screen} p-4`}>
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] font-semibold text-accent">Romans 8:28–30</p>
          <p className="text-[10px] text-faint">Note</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed">
          <strong>Called</strong> is the word Paul uses of himself in 1:1.
          <sup className="ml-0.5 text-[9px] font-semibold text-accent">1</sup> Those he called he
          also justified — <em>the chain never breaks</em>.
        </p>
        <p className="mt-3 border-t border-line pt-2 text-[10px] text-faint">
          1. κλητός, G2822 — invited, appointed.
        </p>
        <div className="mt-3 flex gap-1.5">
          <Chip>Markdown</Chip>
          <Chip>.lamp</Chip>
        </div>
      </div>
    </Art>
  )
}

export function SearchArt() {
  const results = [
    { group: 'Translations', ref: 'John 1:1', text: 'In the beginning was the Word…', note: 'KJVs' },
    { group: 'Lexicons', ref: 'G3056 λόγος', text: 'Something said, including the thought…', note: 'Strong’s' },
    { group: 'Your notes', ref: 'John 1:14', text: 'The Word became flesh — the same logos…', note: 'Note' },
  ]
  return (
    <Art label="Search for Strong’s number G3056 returning a verse, a lexicon entry and one of your own notes, with filter chips for each kind of content.">
      <div className={`${screen} p-4`}>
        <div className="flex items-center gap-2 rounded-lg border border-line bg-sunken px-3 py-2">
          <SearchIcon className="h-3.5 w-3.5 text-faint" />
          <span className="text-xs">G3056</span>
        </div>
        <div className="mt-2.5 flex gap-1.5 overflow-hidden [mask-image:linear-gradient(to_right,black_80%,transparent)]">
          <Chip active>All</Chip>
          <Chip>Translations</Chip>
          <Chip>Lexicons</Chip>
          <Chip>Notes</Chip>
          <Chip>Books</Chip>
          <Chip>Commentaries</Chip>
        </div>
        <ul className="mt-3 divide-y divide-[var(--line)]">
          {results.map((r) => (
            <li key={r.ref} className="flex items-baseline gap-3 py-2 first:pt-0 last:pb-0">
              <span className="w-20 shrink-0 text-[9px] font-semibold uppercase tracking-wider text-faint">
                {r.group}
              </span>
              <span className="min-w-0 flex-1 truncate text-xs">
                <span className="font-medium text-accent">{r.ref}</span>{' '}
                <span className="text-muted">{r.text}</span>
              </span>
              <span className="hidden shrink-0 text-[10px] text-faint sm:inline">{r.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </Art>
  )
}

export function SyncArt() {
  const options = [
    { name: 'Local Only', detail: 'Nothing leaves this device' },
    { name: 'iCloud Drive', detail: 'Synced just now', on: true },
    { name: 'WebDAV', detail: 'Your own server' },
  ]
  return (
    <Art label="Sync settings with three choices — Local Only, iCloud Drive and WebDAV — and iCloud Drive chosen and synced just now.">
      <div className={`${screen} divide-y divide-[var(--line)]`}>
        {options.map((o) => (
          <div key={o.name} className="flex items-center gap-3 px-4 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium">{o.name}</p>
              <p className="text-[10px] text-faint">{o.detail}</p>
            </div>
            {o.on && (
              <svg viewBox="0 0 12 12" className="h-3 w-3 text-accent" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="m2.5 6 2.5 2.5 4.5-5" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </Art>
  )
}

/** The iPhone writing editor: a sermon with a footnote, a table and a recording. */
export function PhoneWritingArt() {
  return (
    <Art label="The writing editor on iPhone: a piece called Abide in the Vine with a scripture quotation, a footnote marker, a small table and an audio recording, above the formatting bar.">
      <div className="mx-auto w-full max-w-[17rem] rounded-[2.2rem] border-[7px] border-[var(--line-strong)] bg-raised p-4 art-shadow">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-medium text-accent">Done</span>
          <span className="text-faint">Synced</span>
        </div>
        <p className="mt-4 font-serif text-lg leading-tight">Abide in the Vine</p>
        <p className="mt-0.5 text-[10px] text-faint">Exhortation · John 15</p>
        <blockquote className="mt-3 border-l-2 border-[var(--accent)] pl-2.5 font-serif text-[12px] italic leading-snug text-muted">
          “I am the vine, ye are the branches.”{' '}
          <span className="not-italic text-accent">John 15:5</span>
        </blockquote>
        <p className="mt-3 text-[11px] leading-relaxed">
          Fruit is never the branch’s own work; it is what the vine does through it.
          <sup className="ml-0.5 text-[9px] font-semibold text-accent">1</sup>
        </p>
        <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-md border border-line text-[10px]">
          <span className="border-b border-r border-line bg-sunken px-2 py-1 font-medium">Abide</span>
          <span className="border-b border-line bg-sunken px-2 py-1 font-medium">Bear fruit</span>
          <span className="border-r border-line px-2 py-1 text-muted">v. 4</span>
          <span className="px-2 py-1 text-muted">v. 5, 8</span>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-full border border-line px-2.5 py-1.5">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-accent">
            <span className="ml-px h-0 w-0 border-y-[3px] border-l-[5px] border-y-transparent border-l-white" />
          </span>
          <span className="flex h-3 flex-1 items-center gap-[2px]">
            {[3, 6, 9, 5, 11, 7, 4, 8, 12, 6, 3, 7, 10, 5, 8, 4, 6, 9, 5, 3].map((h, i) => (
              <span key={i} className="w-[2px] rounded-full bg-[var(--line-strong)]" style={{ height: h }} />
            ))}
          </span>
          <span className="text-[9px] text-faint">0:42</span>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-sunken px-3 py-2 text-muted">
          <span className="text-[11px] font-bold">B</span>
          <span className="font-serif text-[11px] italic">I</span>
          <span className="text-[11px] font-semibold">H</span>
          <FootnoteIcon className="h-3.5 w-3.5" />
          <TableIcon className="h-3.5 w-3.5" />
          <MicIcon className="h-3.5 w-3.5" />
          <span className="text-sm leading-none">+</span>
        </div>
      </div>
    </Art>
  )
}

/** The Mac writing editor with an agent workspace open beside it. */
export function AgentWorkspaceArt() {
  return (
    <Art
      className="@container"
      label="A Mac window with a piece of writing on the left and the agent workspace on the right: a request to tighten the opening, the agent’s reply, the edit it made shown as a difference, and the workspace’s revisions, context files and skills."
    >
      <div className={`${screen} overflow-hidden`}>
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line-strong)]" />
          <span className="flex-1 truncate text-center text-[11px] text-faint">Abide in the Vine</span>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)] @lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="p-4">
            <div className="flex flex-wrap gap-1.5">
              <span className="flex overflow-hidden rounded-md border border-line text-[10px]">
                <span className="bg-sunken px-2 py-0.5 font-medium">Visual</span>
                <span className="px-2 py-0.5 text-muted">Markdown</span>
              </span>
              <Chip>Footnote</Chip>
              <Chip>Scripture</Chip>
              <Chip active>Agent</Chip>
            </div>
            <p className="mt-4 font-serif text-lg leading-tight">Abide in the Vine</p>
            <p className="mt-2 text-[11px] leading-relaxed">
              <span className="rounded-sm bg-(--art-add) px-0.5">
                Fruit is never the branch’s own work.
              </span>{' '}
              It is what the vine does through a branch that stays.
              <sup className="ml-0.5 text-[9px] font-semibold text-accent">1</sup>
            </p>
            <div className="mt-2.5 space-y-2">
              <Line w="94%" />
              <Line w="88%" />
              <Line w="52%" />
            </div>
            <p className="mt-3 border-t border-line pt-2 text-[10px] text-faint">
              1. Compare 1 John 2:6.
            </p>
            <p className="mt-3 text-[10px] text-faint">642 words · 4 min read · 5 min aloud</p>
          </div>
          <div className="border-t border-line bg-sunken p-4 @lg:border-l @lg:border-t-0">
            <span className="flex w-fit overflow-hidden rounded-md border border-line text-[10px]">
              <span className="flex items-center gap-1 bg-raised px-2 py-0.5 font-medium">
                <ChatIcon className="h-3 w-3" />
                Chat
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 text-muted">
                <TerminalIcon className="h-3 w-3" />
                Terminal
              </span>
            </span>
            <p className="mt-3 ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-accent px-2.5 py-1.5 text-[11px] leading-snug text-white">
              Tighten the opening, and find where else John uses “abide”.
            </p>
            <p className="mt-2 max-w-[92%] rounded-xl rounded-bl-sm border border-line bg-raised px-2.5 py-1.5 text-[11px] leading-snug">
              Shortened the first sentence. The cross-references tie verse 4 to 1 John 2:6 — added
              it as a footnote.
            </p>
            <div className="mt-2 overflow-hidden rounded-lg border border-line bg-raised font-mono text-[10px] leading-relaxed">
              <p className="truncate bg-(--art-del) px-2 py-0.5 text-(--art-del-text)">
                − Jesus says a great deal in this chapter about fruit.
              </p>
              <p className="truncate bg-(--art-add) px-2 py-0.5 text-(--art-add-text)">
                + Fruit is never the branch’s own work.
              </p>
            </div>
            <div className="mt-3 space-y-1 border-t border-line pt-2.5 text-[10px] text-faint">
              <p className="flex items-center gap-1.5">
                <HistoryIcon className="h-3 w-3" />
                Revisions · 3 changes
              </p>
              <p className="flex items-center gap-1.5">
                <FolderIcon className="h-3 w-3" />
                Context · earlier-talk.md, sources.pdf
              </p>
              <p className="flex items-center gap-1.5">
                <SkillIcon className="h-3 w-3" />
                Workspace Skills · Build Lamp Deck
              </p>
            </div>
          </div>
        </div>
      </div>
    </Art>
  )
}

/** Find and replace above the revision history, from the Mac writing editor. */
export function MacEditorArt() {
  const revisions = [
    { when: 'Today, 9:41', who: 'You' },
    { when: 'Today, 9:38', who: 'Agent' },
    { when: 'Yesterday, 21:02', who: 'You' },
  ]
  return (
    <Art label="The Mac writing editor: the Details of a piece in a series, its find and replace bar replacing “abide” with “remain”, and a revision history listing changes by you and by the agent.">
      <div className={`${screen} p-4`}>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-b border-line pb-3 text-[11px]">
          <dt className="text-faint">Series</dt>
          <dd>Studies in John · part 4</dd>
          <dt className="text-faint">Key scriptures</dt>
          <dd className="text-accent">John 15:1–8</dd>
          <dt className="text-faint">Tags</dt>
          <dd className="text-muted">abide, fruit</dd>
        </dl>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
          <span className="rounded-md border border-line bg-sunken px-2 py-1">abide</span>
          <span className="text-faint">→</span>
          <span className="rounded-md border border-line bg-sunken px-2 py-1">remain</span>
          <span className="text-[10px] text-faint">4 matches</span>
          <span className="ml-auto rounded-md bg-accent px-2 py-1 text-[10px] font-medium text-white">
            Replace All
          </span>
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider text-faint">
          <HistoryIcon className="h-3 w-3" />
          Revision History
        </p>
        <ul className="mt-1.5 divide-y divide-[var(--line)] text-[11px]">
          {revisions.map((r) => (
            <li key={r.when} className="flex items-center justify-between py-1.5">
              <span>{r.when}</span>
              <span className={r.who === 'Agent' ? 'text-accent' : 'text-faint'}>{r.who}</span>
            </li>
          ))}
        </ul>
      </div>
    </Art>
  )
}

/** A Scripture slide in Slide Studio, with the slide list beneath it. */
export function SlideArt() {
  return (
    <Art label="A dark Scripture slide quoting John 15:5, above a strip of slide thumbnails, one of them hidden.">
      <div className={`${screen} mx-auto max-w-sm p-3`}>
        <div className="flex aspect-video flex-col justify-center rounded-lg bg-[#1d1714] px-6 text-[#f2ece6]">
          <p className="font-serif text-[15px] leading-snug sm:text-lg">
            “I am the vine, ye are the branches: He that abideth in me, and I in him, the same
            bringeth forth much fruit.”
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#e8646f]">John 15:5</p>
        </div>
        <div className="mt-2.5 grid grid-cols-5 gap-1.5">
          {['Title', 'Scripture', 'Body', 'Quote', 'Closing'].map((name, i) => (
            <span
              key={name}
              className={`grid aspect-video place-items-center rounded border text-[8px] ${
                i === 1
                  ? 'border-[var(--accent)] bg-[#1d1714] text-[#f2ece6]'
                  : i === 3
                    ? 'border-dashed border-line-strong text-faint opacity-60'
                    : 'border-line bg-sunken text-faint'
              }`}
            >
              {i === 3 ? 'Hidden' : name}
            </span>
          ))}
        </div>
      </div>
    </Art>
  )
}
