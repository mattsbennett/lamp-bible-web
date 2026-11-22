/**
 * Illustrated screens for the homepage, drawn to match the apps rather than
 * captured from them: Apple's system font and colours, the apps' accent and
 * their own surfaces (LampTheme on iPhone, LampColors on the Mac), the reading
 * serif, their SF Symbols (as stand-ins from ./sf), and the layouts and labels
 * in the iOS and Mac source. Drawn, they stay sharp, follow light and dark
 * mode, need no re-shooting when a release moves a pixel, and never show
 * anyone's library. Each is one image to assistive technology, described by
 * its label. The figures come from the bundled library: the KJV with Strong's
 * numbers, and the Bible Companion plan.
 *
 * iPhone screens are drawn at about 0.72 of their point size, so a 17pt body
 * is 12px here.
 */
import type { CSSProperties, ReactNode } from 'react'
import { Sym, type SymbolName } from './sf'

const label2 = 'text-[color:var(--sys-label2)]'
const label3 = 'text-[color:var(--sys-label3)]'
const tint = 'text-[color:var(--sys-tint)]'
/** Core's link blue, which both apps draw links and note marks in. */
const blue = 'text-[color:var(--lamp-link)]'
const sep = 'border-[color:var(--sys-sep)]'
const caption = 'text-[color:var(--lamp-caption)]'
const serif = 'app-serif'
/** A small-capital overline: a book over its chapter, a lexicon's sections. */
const overline = `text-[8.5px] font-semibold uppercase tracking-[0.1em] ${caption}`

/**
 * Symbols the apps use that ./sf has no stand-in for, drawn on its 24-point
 * grid at its weight.
 */
function Glyph({
  name,
  className,
}: {
  name: 'speakerWave2' | 'booksVertical' | 'rectangleStackBadgePlus' | 'characterBookClosed'
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {name === 'speakerWave2' && (
        <>
          <path d="M3.5 9.5h3.5l5-4.5v14l-5-4.5H3.5z" />
          <path d="M15.5 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" />
        </>
      )}
      {name === 'booksVertical' && (
        <>
          <rect x="3.5" y="4" width="4.5" height="16" rx="1" />
          <rect x="9.5" y="4" width="4.5" height="16" rx="1" />
          <path d="m15.5 5.5 3.6-1 2.9 14.6-3.6 1z" />
        </>
      )}
      {name === 'characterBookClosed' && (
        <>
          <path d="M19.5 17.5v-13a2 2 0 0 0-2-2h-11a3 3 0 0 0-3 3v13A3.5 3.5 0 0 0 7 22h12.5v-4.5H7a1.5 1.5 0 0 0 0 3" />
          <path d="m8.8 14 3.2-8 3.2 8M10 11.2h4" strokeWidth={1.7} />
        </>
      )}
      {name === 'rectangleStackBadgePlus' && (
        <>
          <path d="M13 20.5H6a2.5 2.5 0 0 1-2.5-2.5v-6.5A2.5 2.5 0 0 1 6 9h12a2.5 2.5 0 0 1 2.5 2.5V13" />
          <path d="M6 6h12M8.5 3h7M19 15.5v6M16 18.5h6" />
        </>
      )}
    </svg>
  )
}

function Art({ label, className = '', children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div role="img" aria-label={label} className={`select-none ${className}`}>
      {children}
    </div>
  )
}

// ——— iPhone ———————————————————————————————————————————————————————————————

/**
 * An iPhone, cut off by the bottom of its card unless `whole`. The screen is the
 * reader's page; children lay out from the top.
 */
function Phone({
  height = 'h-[330px]',
  whole = false,
  className = '',
  children,
}: {
  /** Height classes, so a phone in a wide card can grow on large screens. */
  height?: string
  whole?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={`app-ui relative mx-auto w-full max-w-[18.5rem] overflow-hidden border-[7px] border-[color:var(--bezel)] bg-[var(--lamp-page)] ${height} ${
        whole ? 'rounded-[2.6rem] art-shadow' : 'rounded-t-[2.6rem] border-b-0'
      } ${className}`}
    >
      <div className="mx-auto mt-[7px] h-[17px] w-[74px] rounded-full bg-black" />
      {children}
    </div>
  )
}

/** iOS 26's glass: a translucent circle or capsule with a hairline edge. */
function Glass({ round = false, className = '', children }: { round?: boolean; className?: string; children: ReactNode }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center border-[0.5px] border-[color:var(--sys-glass-edge)] bg-[var(--sys-glass)] shadow-[0_1px_4px_rgb(0_0_0/0.08)] ${
        round ? 'h-[30px] w-[30px] rounded-full' : 'h-[30px] rounded-full px-[11px]'
      } ${className}`}
    >
      {children}
    </span>
  )
}

/** The reader's own header: back, the translation-and-chapter capsule, the ellipsis menu. */
function ReaderHeader({ translation, chapter }: { translation: string; chapter: string }) {
  return (
    <div className="flex items-center gap-2 px-[9px] pb-[6px] pt-[8px]">
      <Glass round>
        <Sym name="arrowBackward" className="h-[13px] w-[13px]" />
      </Glass>
      <div className="flex flex-1 justify-center">
        <Glass className="flex-col !px-[14px] leading-none">
          <span className="text-[10px] font-bold">{translation}</span>
          <span className="mt-[2px] text-[8px]">{chapter}</span>
        </Glass>
      </div>
      <Glass round>
        <Sym name="ellipsis" className="h-[13px] w-[13px]" />
      </Glass>
    </div>
  )
}

/** A verse number: semibold at three quarters of the text, raised off the line, quieter than it. */
function V({ n }: { n: number }) {
  return (
    <span className="mr-[0.3em] align-[0.4em] text-[0.75em] font-semibold leading-none text-[color:var(--lamp-verse)]">
      {n}
    </span>
  )
}

/**
 * A chapter's opening: the book as a small-capital overline over a large
 * numeral, or, at a book's first chapter, the book's name over "Chapter 1".
 */
function ChapterOpening({ book, chapter }: { book: string; chapter: number }) {
  return chapter === 1 ? (
    <div className="pt-[8px] text-center">
      <p className={`${serif} text-[22px] font-semibold leading-tight`}>{book}</p>
      <p className={`mt-[1px] ${overline}`}>Chapter 1</p>
    </div>
  ) : (
    <div className="pt-[8px] text-center">
      <p className={overline}>{book}</p>
      <p className={`${serif} mt-[2px] text-[28px] leading-none`}>{chapter}</p>
    </div>
  )
}

/** Scripture as the reader sets it: the reading serif at a book's leading. */
function Scripture({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <p className={`${serif} text-[13px] leading-[1.5] text-[color:var(--lamp-text)] ${className}`}>{children}</p>
  )
}

/** The study panel under the reader: flat on its own ground, under a hairline and the grabber. */
function ToolPanel({ top, children }: { top: string; children: ReactNode }) {
  return (
    <div
      className={`absolute inset-x-0 bottom-0 border-t-[0.75px] border-[color:var(--sys-sep)] bg-[var(--lamp-panel)] ${top}`}
    >
      <span className="mx-auto mt-[2.5px] block h-[3.6px] w-[26px] rounded-full bg-[var(--sys-gray3)]" />
      {children}
    </div>
  )
}

const highlightFill = (hex: string): CSSProperties => ({
  backgroundColor: `color-mix(in srgb, color-mix(in srgb, ${hex}, white var(--lamp-hl-lift)) var(--lamp-hl-alpha), transparent)`,
  borderRadius: 3,
  boxDecorationBreak: 'clone',
  WebkitBoxDecorationBreak: 'clone',
})

/** A quiet capsule for a lexicon entry's numbers and what can be done with them. */
function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-[3px] rounded-full bg-[var(--lamp-tile)] px-[7px] py-[3px] leading-none">
      {children}
    </span>
  )
}

export function ReaderArt() {
  return (
    <Art label="iPhone reader at John 1, with the lexicon entry for “Word” (G3056, λόγος), pronunciation, verse search and analysis controls.">
      <Phone height="h-[360px] lg:h-[530px]">
        <ReaderHeader translation="KJV" chapter="John 1" />
        <div className="px-[16px]">
          <ChapterOpening book="John" chapter={1} />
          <Scripture className="mt-[12px]">
            <V n={1} />
            In the beginning was the Word, and the Word was with God, and the Word was God.{' '}
            <V n={2} />
            The same was in the beginning with God. <V n={3} />
            All things were made by him; and without him was not any thing made that was made.
          </Scripture>
        </div>
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-x-0 bottom-0 top-[164px] rounded-t-[22px] bg-[var(--lamp-sheet)] shadow-[0_-6px_24px_rgb(0_0_0/0.18)]">
          <span className="mx-auto mt-[5px] block h-[4px] w-[26px] rounded-full bg-[var(--sys-gray3)]" />
          <div className="flex items-center px-[10px] pt-[3px]">
            <Glass round className="!h-[27px] !w-[27px]">
              <Sym name="xmark" className="h-[10px] w-[10px]" />
            </Glass>
            <span className="flex-1 pr-[27px] text-center text-[12px] font-semibold">Word</span>
          </div>
          <div className="px-[14px] pt-[8px]">
            <p className={`text-[8px] uppercase ${label3}`}>Strong’s Greek</p>
            <p className="mt-[2px] flex items-baseline gap-[7px]">
              <span className={`${serif} text-[22px] leading-none`}>λόγος</span>
              <Glyph name="speakerWave2" className={`h-[10px] w-[10px] self-center ${caption}`} />
              <span className={`${serif} text-[10.5px] italic ${caption}`}>lógos</span>
            </p>
            <div className="mt-[7px] flex gap-[5px] text-[9.5px] font-medium">
              <Chip>G3056</Chip>
              <Chip>
                <Sym name="magnifyingglass" className={`h-[8px] w-[8px] ${label2}`} />
                314×
              </Chip>
              <Chip>
                <Sym name="chartBarXaxis" className={`h-[9px] w-[9px] ${label2}`} />
                Analyse
              </Chip>
            </div>
            <p className={`mt-[12px] ${overline}`}>Sense</p>
            <div className="mt-[5px] flex gap-[6px]">
              <span className={`w-[10px] shrink-0 text-right text-[10px] font-semibold ${caption}`}>1</span>
              <div>
                <p className={`${serif} text-[11.5px] leading-[1.6]`}>
                  something said (including the thought); by implication, a topic (subject of
                  discourse), also reasoning (the mental faculty) or motive; by extension, a
                  computation; specially, (with the article in John) the Divine Expression (i.e.
                  Christ)
                </p>
                <p className={`mt-[9px] ${overline}`}>Derivation</p>
                <p className={`${serif} mt-[3px] text-[10.5px]`}>
                  from <span className="text-[color:var(--sys-purple)]">G3004 (λέγω)</span>
                </p>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-[10px] flex justify-center gap-[6px]">
            <span className="h-[6px] w-[15px] rounded-full bg-[var(--sys-label)]" />
            <span className="h-[6px] w-[6px] rounded-full bg-[var(--sys-label2)]" />
          </div>
        </div>
      </Phone>
    </Art>
  )
}

/** The KJV's divine name, in small capitals as the reader sets it apart. */
function Lord() {
  return <span className="text-[0.8em] tracking-[0.05em]">LORD</span>
}

/**
 * The hero's iPhone: the reader at Psalm 119, a verse a line as the KJV's poetry is set, with
 * the verse the site takes its name from highlighted. It rises from the foot of the hero.
 */
export function HeroArt({
  whole = false,
  height = 'h-[380px] sm:h-[440px] lg:h-[500px]',
}: {
  /** The whole phone, bottom and all, where it stands on its own rather than rising from an edge. */
  whole?: boolean
  height?: string
} = {}) {
  const verses: Array<[number, ReactNode]> = [
    [103, 'How sweet are thy words unto my taste! yea, sweeter than honey to my mouth!'],
    [104, 'Through thy precepts I get understanding: therefore I hate every false way.'],
    [105, <span key="105" style={highlightFill('#FFCC00')}>Thy word is a lamp unto my feet, and a light unto my path.</span>],
    [106, 'I have sworn, and I will perform it, that I will keep thy righteous judgments.'],
    [107, <>I am afflicted very much: quicken me, O <Lord />, according unto thy word.</>],
    [108, <>Accept, I beseech thee, the freewill offerings of my mouth, O <Lord />, and teach me thy judgments.</>],
    [109, 'My soul is continually in my hand: yet do I not forget thy law.'],
    [110, 'The wicked have laid a snare for me: yet I erred not from thy precepts.'],
    [111, 'Thy testimonies have I taken as an heritage for ever: for they are the rejoicing of my heart.'],
  ]
  return (
    <Art label="iPhone reader showing Psalm 119 in the KJV, with verse 105 highlighted in yellow.">
      <Phone height={height} whole={whole} className="!max-w-[19.5rem]">
        <ReaderHeader translation="KJV" chapter="Psalm 119" />
        <div className="space-y-[7px] px-[18px] pt-[10px]">
          {verses.map(([n, text]) => (
            <Scripture key={n} className="!text-[14px] !leading-[1.55]">
              <V n={n} />
              {text}
            </Scripture>
          ))}
        </div>
      </Phone>
    </Art>
  )
}

/**
 * The hero on a wide screen: a MacBook with the Mac reader at Psalm 119 — the passage capsule in
 * the toolbar, tabs under it, verse 105 selected, highlighted and noted, and the study column on
 * Notes showing that verse's note in its card and the chapter's highlights under it.
 */
export function HeroLaptopArt() {
  const verses: Array<[number, ReactNode]> = [
    [103, 'How sweet are thy words unto my taste! yea, sweeter than honey to my mouth!'],
    [104, 'Through thy precepts I get understanding: therefore I hate every false way.'],
    [105, <span key="105" style={highlightFill('#FFCC00')}>Thy word is a lamp unto my feet, and a light unto my path.</span>],
    [106, 'I have sworn, and I will perform it, that I will keep thy righteous judgments.'],
    [107, <>I am afflicted very much: quicken me, O <Lord />, according unto thy word.</>],
    [108, <>Accept, I beseech thee, the freewill offerings of my mouth, O <Lord />, and teach me thy judgments.</>],
    [109, 'My soul is continually in my hand: yet do I not forget thy law.'],
    [110, 'The wicked have laid a snare for me: yet I erred not from thy precepts.'],
    [111, 'Thy testimonies have I taken as an heritage for ever: for they are the rejoicing of my heart.'],
    [112, 'I have inclined mine heart to perform thy statutes alway, even unto the end.'],
  ]
  return (
    <Art label="Mac reader at Psalm 119, with John 1 and Romans 8 in other tabs. Verse 105 is highlighted, and the study column’s Notes tab holds its note comparing it to Proverbs 6:23, with the chapter’s highlights listed below.">
      <div className="mx-auto w-full max-w-[44rem]">
        {/* The screen: a black bezel round the window, the camera's notch at its top. */}
        <div className="relative rounded-t-[18px] border-[9px] border-b-[11px] border-[#0c0c0d] bg-[#0c0c0d] shadow-[0_30px_60px_-30px_rgb(28_18_8/0.6)]">
          <span className="absolute left-1/2 top-[-9px] z-10 h-[9px] w-[64px] -translate-x-1/2 rounded-b-[5px] bg-[#0c0c0d]" />
          <MacWindow
            className="!rounded-[6px] !border-0 !shadow-none"
            leading={
              <span className={`hidden items-center gap-[10px] @lg:flex ${label2}`}>
                <Sym name="sidebarLeft" className="h-[12px] w-[12px]" />
                <Sym name="uturnBackward" className="h-[11px] w-[11px]" />
                <Sym name="uturnForward" className={`h-[11px] w-[11px] ${label3}`} />
                <Sym name="clockArrow" className="h-[11px] w-[11px]" />
              </span>
            }
            toolbar={
              <>
                <MacGlass className="!gap-[9px]">
                  <span className="flex">
                    <Sym name="chevronLeft" className="h-[8px] w-[8px]" />
                    <Sym name="chevronLeft" className="-ml-[4px] h-[8px] w-[8px]" />
                  </span>
                  <Sym name="chevronLeft" className="h-[8px] w-[8px]" />
                  <span className="flex items-center gap-[5px] font-medium">
                    <Glyph name="booksVertical" className="h-[10px] w-[10px]" />
                    KJV · Psalms 119
                    <Sym name="chevronDown" className={`h-[6px] w-[6px] ${label2}`} />
                  </span>
                  <Sym name="chevronRight" className="h-[8px] w-[8px]" />
                  <span className="flex">
                    <Sym name="chevronRight" className="h-[8px] w-[8px]" />
                    <Sym name="chevronRight" className="-ml-[4px] h-[8px] w-[8px]" />
                  </span>
                </MacGlass>
                <MacGlass className="hidden !gap-[9px] @lg:flex">
                  <span className="text-[10px] font-medium">Aa</span>
                  <Glyph name="speakerWave2" className="h-[11px] w-[11px]" />
                </MacGlass>
                <MacGlass className="!px-[3px]">
                  <span className="flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[var(--sys-label2)] text-[color:var(--mac-window)]">
                    <Sym name="sidebarLeft" className="h-[11px] w-[11px] -scale-x-100" />
                  </span>
                </MacGlass>
              </>
            }
          >
            <MacTabBar tabs={[{ title: 'Psalms 119', open: true }, { title: 'John 1' }, { title: 'Romans 8' }]} />
            <div className="grid h-[19rem] grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)] @lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
              <div className="overflow-hidden bg-[var(--mac-window)] px-[28px] pt-[16px]">
                <div className="mx-auto max-w-[24rem] space-y-[6px]">
                  {verses.map(([n, text]) => (
                    <div key={n} className="relative">
                      {n === 105 && (
                        <>
                          {/* The selected verse's bar, and its note, in the margin. */}
                          <span className="absolute -left-[14px] bottom-[2px] top-[2px] w-[2.5px] rounded-full bg-[var(--sys-tint)]" />
                          <Sym name="noteText" className="absolute -left-[26px] top-[3px] h-[10px] w-[10px] text-[color:var(--sys-orange)]" />
                        </>
                      )}
                      <Scripture className="!text-[12.5px] !leading-[1.55]">
                        <V n={n} />
                        {text}
                      </Scripture>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`hidden min-h-0 flex-col overflow-hidden border-l ${sep} bg-[var(--mac-inspector)] @lg:flex`}>
                {/* The study tools' underlined tabs, a pane header's 42pt, and the link-scrolling button. */}
                <div className={`flex h-[30px] shrink-0 items-center gap-[10px] border-b ${sep} px-[10px] text-[9px]`}>
                  {['Commentary', 'Verse', 'Notes', 'Dictionary'].map((tab) => (
                    <span
                      key={tab}
                      className={`relative pb-[4px] ${tab === 'Notes' ? 'font-semibold' : 'text-[color:var(--mac-secondary)]'}`}
                    >
                      {tab}
                      {tab === 'Notes' && (
                        <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[var(--sys-tint)]" />
                      )}
                    </span>
                  ))}
                </div>
                <div className="min-h-0 flex-1 space-y-[8px] overflow-hidden px-[10px] py-[8px]">
                  {/* The verse's note, all of it in one card (lampCard). */}
                  <div className="rounded-[9px] border border-[color:var(--mac-card-edge)] bg-[var(--mac-card-fill)] p-[8px]">
                    <p className="text-[12px] font-bold">Psalms 119:105</p>
                    <p className="mt-[7px] flex items-center gap-[4px] text-[7.5px] font-semibold uppercase tracking-[0.06em] text-[color:var(--mac-secondary)]">
                      <Sym name="noteText" className="h-[9px] w-[9px]" />
                      Personal Note
                    </p>
                    <p className="mt-[5px] rounded-[5px] border border-[color:var(--mac-card-edge)] bg-[var(--mac-window)] px-[6px] py-[2px] text-[9px]">
                      A light for the path
                    </p>
                    <div className="mt-[5px] overflow-hidden rounded-[5px] border border-[color:var(--mac-card-edge)] bg-[var(--mac-window)]">
                      <div className={`flex items-center gap-[7px] border-b ${sep} bg-[var(--mac-tab-track)] px-[5px] py-[2.5px] text-[8.5px] ${label2}`}>
                        <span className="font-bold">B</span>
                        <span className="font-serif italic">I</span>
                        <Sym name="listBullet" className="h-[8px] w-[8px]" />
                        <Sym name="listNumber" className="h-[8px] w-[8px]" />
                        <Sym name="textQuote" className="h-[8px] w-[8px]" />
                      </div>
                      <p className="px-[6px] py-[4px] text-[9px] leading-[1.5]">
                        Compare the image of a lamp here with <span className={blue}>Proverbs 6:23</span>.
                      </p>
                    </div>
                    <p className="mt-[7px] flex items-center gap-[5px] text-[8.5px]">
                      <span className="text-[color:var(--mac-secondary)]">Covers</span>
                      <MacCapsule menu className="!h-[15px] !text-[8px]">
                        This verse only
                      </MacCapsule>
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-[4px] whitespace-nowrap text-[7.5px] font-semibold uppercase tracking-[0.04em] text-[color:var(--mac-secondary)]">
                      <Sym name="highlighter" className="h-[9px] w-[9px] shrink-0" />
                      Highlights in Psalms 119
                      <span className={`ml-auto text-[8px] font-normal normal-case tracking-normal ${tint}`}>All Highlights</span>
                    </p>
                    <div className="mt-[5px] flex gap-[6px] rounded-[9px] border border-[color:var(--mac-card-edge)] bg-[var(--mac-card-fill)] px-[7px] py-[5px] text-[8px] leading-[1.4]">
                      <span className="mt-[1px] h-[10px] w-[3px] shrink-0 rounded-[1px] bg-[#FFCC00]" />
                      <span className="shrink-0 font-semibold tabular-nums">119:105</span>
                      <span className="text-[color:var(--mac-secondary)]">
                        Thy word is a lamp unto my feet, and a light unto my path.
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`flex shrink-0 items-center border-t ${sep} px-[10px] py-[5px]`}>
                  <Segmented
                    selected={1}
                    className="!text-[8.5px]"
                    items={[
                      <>
                        <Sym name="book" className="h-[8px] w-[8px]" />
                        Read
                      </>,
                      <>
                        <Sym name="squareAndPencil" className="h-[8px] w-[8px]" />
                        Edit
                      </>,
                    ]}
                  />
                  <MacCapsule menu className="ml-auto !h-[15px] !text-[8px]">
                    Study Data
                  </MacCapsule>
                </div>
              </div>
            </div>
          </MacWindow>
        </div>
        {/* The base: wider than the screen, with the thumb notch in its lip. */}
        <div className="relative -mx-[6%] h-[12px] rounded-b-[12px] bg-gradient-to-b from-[#d9d9dc] to-[#a9a9ae] shadow-[0_14px_24px_-14px_rgb(28_18_8/0.55)] dark:from-[#5a5a5e] dark:to-[#3a3a3e]">
          <span className="absolute left-1/2 top-0 h-[5px] w-[16%] -translate-x-1/2 rounded-b-[6px] bg-[#bdbdc1] dark:bg-[#48484c]" />
        </div>
      </div>
    </Art>
  )
}

/** The Treasury of Scripture Knowledge's notes on Romans 8:28, as the bundled module has them. */
const tskRomans828: Array<[keyword: string, references: string]> = [
  ['we know', 'Rom 8:35-39; Rom 5:3; Rom 5:4; Gen 50:20; Deut 8:2; Deut 8:3; Deut 8:16; Ps 46:1…'],
  ['them', 'Rom 5:5; Exod 20:6; Deut 6:5; Neh 1:5; Ps 69:36; Mark 12:30; 1Cor 2:9…'],
  ['the called', 'Rom 8:30; Rom 1:6; Rom 1:7; Rom 9:11; Rom 9:23; Rom 9:24…'],
]

export function StudyArt() {
  return (
    <Art label="iPhone reader at Romans 8, with Treasury of Scripture Knowledge cross-references below the passage.">
      <Phone>
        <ReaderHeader translation="KJV" chapter="Romans 8" />
        <Scripture className="px-[16px] pt-[2px]">
          <V n={28} />
          And we know that all things work together for good to them that love God, to them who
          are the called according to his purpose.
        </Scripture>
        <ToolPanel top="top-[126px]">
          <div className="flex items-center gap-2 px-[9px] pt-[4px]">
            <Glass className="min-w-0 !h-[26px] !shrink !justify-start gap-[4px] !px-[10px]">
              <span className="truncate text-[10px] font-medium">Treasury of Scripture Knowledge (Enhanced)</span>
              <Sym name="chevronUpDown" className="h-[8px] w-[8px] shrink-0" />
            </Glass>
            <Glass round className="ml-auto !h-[26px] !w-[26px]">
              <Sym name="ellipsis" className="h-[11px] w-[11px]" />
            </Glass>
          </div>
          <div className="px-[14px] pt-[9px]">
            <p className={`${serif} text-[11.5px] font-semibold`}>v. 28</p>
            <div className={`${serif} mt-[3px] space-y-[3px] text-[11px] leading-[1.6]`}>
              {tskRomans828.map(([keyword, references]) => (
                <p key={keyword}>
                  {keyword}: <span className={blue}>{references}</span>
                </p>
              ))}
            </div>
          </div>
        </ToolPanel>
      </Phone>
    </Art>
  )
}

/** The plan's warm ground (HeroBackground in ReadingsView). */
const heroGround: CSSProperties = {
  background:
    'radial-gradient(70% 90% at 100% 0%, rgb(250 158 84 / 0.62), transparent 70%), linear-gradient(135deg, rgb(204 46 69), rgb(133 26 66))',
}

export function PlansArt() {
  // Day 11 of The Bible Companion as the bundled plan has it, timed at 183 words a minute over
  // the KJV's text, as the app times a reading.
  const readings = [
    { passage: 'Genesis 20-21', detail: 'Law · 7 min', read: true },
    { passage: 'Psalms 23-25', detail: 'Wisdom · 4 min', read: false },
    { passage: 'Matthew 13', detail: 'Gospels · 8 min', read: false },
  ]
  return (
    <Art label="Today on iPhone: The Bible Companion at day 11, with one of three readings complete, an estimated nineteen minutes, Psalm 23 up next — “The Lord is my shepherd; I shall not want.” — and a Continue Reading button.">
      <Phone className="!bg-[var(--sys-grouped)]">
        <div className="flex items-center gap-[6px] px-[9px] pb-[6px] pt-[8px]">
          <Glass round>
            <Sym name="chevronLeft" className="h-[12px] w-[12px]" />
          </Glass>
          <Glass className="min-w-0 flex-1 gap-[5px]">
            <Sym name="calendar" className="h-[11px] w-[11px] shrink-0" />
            <span className="truncate text-[11px]">Sunday, January 11</span>
          </Glass>
          <Glass round>
            <Sym name="chevronRight" className="h-[12px] w-[12px]" />
          </Glass>
          <Glass round>
            <Sym name="gear" className="h-[14px] w-[14px]" />
          </Glass>
        </div>
        <div className="px-[11px]">
          <div className="flex items-center justify-between px-[3px] pb-[9px] pt-[6px]">
            <span className="text-[16px] font-bold">Daily Reading</span>
            <span className={`flex items-center gap-[4px] rounded-full bg-[var(--sys-fill)] px-[9px] py-[5px] text-[10.5px] font-semibold ${tint}`}>
              <Sym name="sliderHorizontal3" className="h-[10px] w-[10px]" />
              Manage
            </span>
          </div>
          {/* The day card heads its readings in one card, as a phone draws it. */}
          <div className="overflow-hidden rounded-[14px] bg-[var(--sys-cell)] shadow-[0_4px_10px_rgb(0_0_0/0.08)]">
            <div className="p-[14px] text-white" style={heroGround}>
              <div className="relative">
                <p className="text-[8.5px] font-bold tracking-[0.12em] text-white/90">DAY 11 OF 365</p>
                {/* Laid over the line, as the app does, so the card is no taller for it. */}
                <span className="absolute right-0 top-1/2 flex h-[21px] w-[21px] -translate-y-1/2 items-center justify-center rounded-full bg-white/20">
                  <Sym name="chevronUp" className="h-[8px] w-[8px] text-white" />
                </span>
              </div>
              <p className="mt-[3px] text-[19px] font-bold leading-tight">The Bible Companion</p>
              <div className="mt-[5px] flex justify-between text-[10.5px] text-white/90">
                <span>3 readings · 19 min</span>
                <span className="font-semibold">1 of 3 read</span>
              </div>
              <div className="mt-[9px] flex gap-[4px]">
                <span className="h-[4px] flex-1 rounded-full bg-white" />
                <span className="h-[4px] flex-1 rounded-full bg-white/30" />
                <span className="h-[4px] flex-1 rounded-full bg-white/30" />
              </div>
              <p className="mt-[12px] text-[7.5px] font-bold tracking-[0.1em] text-white/80">UP NEXT · PSALMS 23:1</p>
              <p className={`${serif} mt-[3px] text-[13px] leading-[1.4]`}>
                The Lord is my shepherd; I shall not want.
              </p>
              <span className="mt-[12px] flex items-center justify-center gap-[5px] rounded-full bg-white py-[9px] text-[12px] font-semibold text-[rgb(179_33_61)]">
                <Sym name="bookFill" className="h-[12px] w-[12px]" />
                Continue Reading
              </span>
            </div>
            <div className="divide-y divide-[color:var(--sys-sep)] py-[3px]">
              {readings.map((r) => (
                <div key={r.passage} className="py-[7px] pl-[8px] pr-[10px]">
                  <div className="flex items-center gap-[8px]">
                    <Sym
                      name={r.read ? 'checkmarkCircleFill' : 'circle'}
                      className={`h-[19px] w-[19px] shrink-0 ${tint}`}
                    />
                    <div className="min-w-0 flex-1 leading-tight">
                      <p className={`text-[12px] font-semibold ${r.read ? label2 : ''}`}>{r.passage}</p>
                      <p className={`text-[10px] ${label2}`}>{r.detail}</p>
                    </div>
                    <Sym name="chevronRight" className={`h-[9px] w-[9px] ${label2}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Phone>
    </Art>
  )
}

/** "Aa" as the highlight panel draws a style: on a band of the colour, or over a line of it. */
function StyleSample({ hex, style }: { hex: string; style: 'highlight' | 'solid' | 'dashed' | 'dotted' }) {
  const line =
    style === 'solid'
      ? `linear-gradient(${hex}, ${hex})`
      : style === 'dashed'
        ? `repeating-linear-gradient(90deg, ${hex} 0 2.9px, transparent 2.9px 4.7px)`
        : `radial-gradient(circle, ${hex} 0.9px, transparent 1.1px) 0 0 / 2.9px 1.8px repeat-x`
  return style === 'highlight' ? (
    <span className={`${serif} px-[2px] text-[12px] font-medium`} style={highlightFill(hex)}>
      Aa
    </span>
  ) : (
    <span className={`${serif} relative text-[12px] font-medium`}>
      Aa
      <span className="absolute left-1/2 top-full h-[1.8px] w-[17px] -translate-x-1/2" style={{ background: line }} />
    </span>
  )
}

export function HighlightsArt() {
  const styles = ['highlight', 'solid', 'dashed', 'dotted'] as const
  // The palette a library starts with (LampHighlightPalette.offeredByDefault), yellow chosen.
  const colours = ['#FFCC00', '#34C759', '#007AFF', '#FF2D55']
  const actions: Array<{ icon: SymbolName; name: string; red?: boolean }> = [
    { icon: 'noteTextBadgePlus', name: 'Add Note' },
    { icon: 'quoteOpening', name: 'Copy as Citation' },
    { icon: 'ellipsisCircle', name: 'More' },
    { icon: 'trash', name: 'Remove', red: true },
  ]
  const quiet = 'bg-[color-mix(in_srgb,var(--sys-label2)_12%,transparent)]'
  return (
    <Art label="Romans 8:28 with “all things work together for good” highlighted in yellow. The highlight panel beside the words shows four styles, the colour palette with yellow ticked, the theme Promises, and Add Note, Copy as Citation, More and Remove.">
      <Phone>
        <ReaderHeader translation="KJV" chapter="Romans 8" />
        <Scripture className="px-[16px]">
          <V n={28} />
          And we know that <span style={highlightFill('#FFCC00')}>all things work together for good</span>{' '}
          to them that love God, to them who are the called according to his purpose.
        </Scripture>
        {/* A popover by the words, on a phone too, 304pt wide (HighlightPanel). */}
        <div className="absolute left-1/2 top-[114px] w-[219px] -translate-x-1/2 rounded-[20px] bg-[var(--lamp-menu)] p-[12px] shadow-[0_8px_30px_rgb(0_0_0/0.22)]">
          <span className="absolute -top-[5px] left-1/2 h-[11px] w-[11px] -translate-x-1/2 rotate-45 rounded-[2px] bg-[var(--lamp-menu)]" />
          <div className="relative grid grid-cols-4 gap-[6px]">
            {styles.map((style, i) => (
              <span
                key={style}
                className={`flex h-[29px] items-center justify-center rounded-[6px] pb-[2px] ${quiet} ${
                  i === 0 ? 'shadow-[inset_0_0_0_1.5px_var(--sys-tint)]' : ''
                }`}
              >
                <StyleSample hex={colours[0]} style={style} />
              </span>
            ))}
          </div>
          <div className="mt-[10px] flex items-center gap-[7px]">
            {colours.map((hex, i) => (
              <span key={hex} className="flex h-[23px] w-[23px] items-center justify-center rounded-full" style={{ backgroundColor: hex }}>
                {i === 0 && <Sym name="checkmark" className="h-[9px] w-[9px] text-white" />}
              </span>
            ))}
            {/* The colour well that adds a colour of your own. */}
            <span
              className="flex h-[21px] w-[21px] items-center justify-center rounded-full"
              style={{ background: 'conic-gradient(#ff3b30, #ffcc00, #34c759, #5ac8fa, #007aff, #af52de, #ff3b30)' }}
            >
              <span className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[var(--lamp-menu)]">
                <span className="h-[11px] w-[11px] rounded-full bg-[#FF9500]" />
              </span>
            </span>
          </div>
          <span className={`mt-[10px] inline-flex items-center gap-[4px] rounded-full px-[9px] py-[5px] text-[11px] ${quiet}`}>
            <span className="h-[8.5px] w-[14px] rounded-[2px] bg-[#FFCC00]" />
            Promises
            <Sym name="chevronUpDown" className={`h-[8px] w-[8px] ${label2}`} />
          </span>
          <div className={`mt-[10px] grid grid-cols-4 gap-[4px] border-t ${sep} pt-[10px]`}>
            {actions.map((action) => (
              <span
                key={action.name}
                className={`flex flex-col items-center gap-[3px] text-center text-[8px] leading-[1.15] ${
                  action.red ? 'text-[color:var(--sys-red)]' : ''
                }`}
              >
                <Sym name={action.icon} className="h-[13px] w-[13px]" />
                {action.name}
              </span>
            ))}
          </div>
        </div>
      </Phone>
    </Art>
  )
}

export function NotesArt() {
  return (
    <Art label="iPhone Notes panel with a formatted note on Romans 8:28–30 and a footnote about the Greek word for “called”.">
      <Phone>
        <ReaderHeader translation="KJV" chapter="Romans 8" />
        <Scripture className="px-[16px] pt-[2px]">
          <V n={28} />
          And we know that all things work together for good to them that love God…
        </Scripture>
        <ToolPanel top="top-[104px]">
          <div className="flex items-center gap-[6px] px-[9px] pt-[4px]">
            <Glass className="!h-[26px] gap-[4px] !px-[10px]">
              <span className="text-[10px] font-medium">My Notes</span>
              <Sym name="chevronUpDown" className="h-[8px] w-[8px]" />
            </Glass>
            <Sym name="checkmarkIcloudFill" className="ml-auto h-[15px] w-[15px] text-[color:var(--sys-green)]" />
            <Glass round className="!h-[26px] !w-[26px]">
              <Sym name="plus" className="h-[11px] w-[11px]" />
            </Glass>
            <Glass round className="!h-[26px] !w-[26px]">
              <Sym name="ellipsis" className="h-[11px] w-[11px]" />
            </Glass>
          </div>
          <div className="px-[13px] pt-[10px]">
            <div className="flex items-center justify-between">
              <span className={`text-[10.5px] font-medium ${blue}`}>vv.28-30</span>
              <Sym name="ellipsis" className={`h-[11px] w-[11px] ${label2}`} />
            </div>
            <p className={`${serif} mt-[4px] text-[12px] leading-[1.6]`}>
              <strong>Called</strong> is the word Paul uses of himself in 1:1.
              <sup className={`ml-[1px] text-[0.7em] ${label2}`}>[1]</sup> Those he called he also
              justified — <em>the chain never breaks</em>.
            </p>
            <div className={`mt-[6px] flex gap-[5px] text-[10.5px] ${label2}`}>
              <span className="w-[16px] shrink-0 text-right text-[9.5px]">[1]</span>
              <span className={serif}>κλητός, G2822 — invited, appointed.</span>
            </div>
          </div>
        </ToolPanel>
      </Phone>
    </Art>
  )
}

export function SearchArt() {
  // G3056's first verses in John in the KJV, with the words tagged with it marked.
  const results = [
    { ref: 'John 1:1', parts: ['In the beginning was ', 'the Word', ', and ', 'the Word', ' was with God, and ', 'the Word', ' was God.'] },
    { ref: 'John 1:14', parts: ['And ', 'the Word', ' was made flesh, and dwelt among us, (and we beheld his glory…'] },
    { ref: 'John 2:22', parts: ['…and they believed the scripture, and ', 'the word', ' which Jesus had said.'] },
    { ref: 'John 4:37', parts: ['And herein is that ', 'saying', ' true, One soweth, and another reapeth.'] },
    { ref: 'John 4:39', parts: ['And many of the Samaritans of that city believed on him for ', 'the saying', ' of the woman…'] },
  ]
  return (
    <Art label="iPhone search for G3056 in the KJV’s Gospel of John: 36 results, matching words highlighted and an Analyse button.">
      <Phone height="h-[330px] lg:h-[500px]">
        <div className="flex items-center gap-2 px-[9px] pb-[6px] pt-[8px]">
          <Glass round>
            <Sym name="arrowBackward" className="h-[13px] w-[13px]" />
          </Glass>
          <span className="flex flex-1 items-center justify-center gap-[4px] text-[12px] font-semibold">
            <Sym name="bookClosed" className="h-[12px] w-[12px]" />
            KJV
            <span className={`font-normal ${label2}`}>· John</span>
            <Sym name="chevronDown" className={`h-[8px] w-[8px] ${label2}`} />
          </span>
          <Glass round>
            <Sym name="ellipsis" className="h-[13px] w-[13px]" />
          </Glass>
        </div>
        <div className="mx-[11px] flex items-center gap-[6px] rounded-full bg-[var(--sys-fill)] px-[10px] py-[6px]">
          <span className={`flex items-center gap-[1px] ${label2}`}>
            <Sym name="number" className="h-[12px] w-[12px]" />
            <Sym name="chevronDown" className="h-[7px] w-[7px]" />
          </span>
          <span className="text-[12px]">G3056</span>
          <Sym name="xmarkCircleFill" className={`ml-auto h-[13px] w-[13px] ${label3}`} />
        </div>
        <div className={`mt-[7px] flex items-center justify-between border-t ${sep} px-[13px] pb-[2px] pt-[8px] text-[9.5px]`}>
          <span className={`font-semibold ${caption}`}>36 results</span>
          <span className={`flex items-center gap-[3px] ${tint}`}>
            <Sym name="chartBarXaxis" className="h-[10px] w-[10px]" />
            Analyse
          </span>
        </div>
        <div className={`divide-y divide-[color:var(--sys-sep)] px-[13px]`}>
          {results.map((r) => (
            <div key={r.ref} className="py-[8px]">
              <p className="text-[12px] font-semibold">{r.ref}</p>
              <p className={`${serif} mt-[2px] line-clamp-2 text-[11.5px] leading-[1.4] text-[color:var(--lamp-text)]`}>
                {r.parts.map((part, i) =>
                  i % 2 === 1 ? (
                    <span key={i} className="bg-[var(--lamp-match)] font-semibold text-[color:var(--lamp-on-match)]">
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  ),
                )}
              </p>
            </div>
          ))}
        </div>
      </Phone>
    </Art>
  )
}

/**
 * G26, ἀγάπη, as the KJV tags it — the figures core's analysis gives, so the
 * drawings agree with the apps and with each other.
 */
const agapeRenderings = [
  { text: 'love', count: 86 },
  { text: 'charity', count: 27 },
  { text: 'charitably', count: 1 },
  { text: 'dear', count: 1 },
  { text: 'feasts of charity', count: 1 },
  { text: 'the', count: 1 },
]

/** G26's occurrences per New Testament book in the KJV, and which core marks beyond chance. */
const agapeByBook: Array<[name: string, count: number, standing?: 'more' | 'fewer']> = [
  ['Matthew', 1, 'fewer'], ['Mark', 0, 'fewer'], ['Luke', 1, 'fewer'], ['John', 7], ['Acts', 0, 'fewer'],
  ['Romans', 9], ['1 Corinthians', 14], ['2 Corinthians', 9], ['Galatians', 3], ['Ephesians', 10, 'more'],
  ['Philippians', 5], ['Colossians', 5], ['1 Thessalonians', 5], ['2 Thessalonians', 3], ['1 Timothy', 5],
  ['2 Timothy', 4], ['Titus', 1], ['Philemon', 3], ['Hebrews', 2], ['James', 0], ['1 Peter', 3],
  ['2 Peter', 1], ['1 John', 18, 'more'], ['2 John', 2], ['3 John', 1], ['Jude', 3], ['Revelation', 2],
]

/** The canon's divisions under the iPhone's book chart, as runs of the books above. */
const ntDivisions: Array<[name: string, books: number]> = [
  ['Gospels', 4], ['', 1], ['Paul’s Letters', 13], ['General Letters', 8], ['', 1],
]

/** A share as core prints it (LampStrongsSpread.percent): whole, or "<1%". */
const percent = (fraction: number) => (Math.round(fraction * 100) < 1 ? '<1%' : `${Math.round(fraction * 100)}%`)

/**
 * One of a share's shades of the accent, at `strength` from 0 to 1, as the
 * phone's ring and its key draw them.
 */
const shade = (strength: number) =>
  `color-mix(in srgb, var(--sys-tint) calc(100% - ${Math.round((1 - strength) * 100)}% * var(--lamp-shade-reach)), var(--lamp-shade-toward))`

/** A ring of shares, the commonest first from the top, with its total in the hole. */
function ShareRing({ values, size }: { values: number[]; size: number }) {
  const total = values.reduce((a, b) => a + b, 0)
  const r = 50
  const hole = r * 0.55
  const angle = (before: number) => -Math.PI / 2 + (2 * Math.PI * before) / total
  const point = (radius: number, at: number) => `${50 + radius * Math.cos(at)} ${50 + radius * Math.sin(at)}`
  return (
    <span className="relative block" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0" aria-hidden="true">
        {values.map((value, i) => {
          const before = values.slice(0, i).reduce((a, b) => a + b, 0)
          const start = angle(before)
          const end = angle(before + value)
          const large = value / total > 0.5 ? 1 : 0
          const d = `M${point(r, start)}A${r} ${r} 0 ${large} 1 ${point(r, end)}L${point(hole, end)}A${hole} ${hole} 0 ${large} 0 ${point(hole, start)}Z`
          return (
            <path
              key={i}
              d={d}
              style={{ fill: shade(1 - (0.75 * i) / (values.length - 1)), stroke: 'var(--sys-cell)' }}
              strokeWidth={1.2}
            />
          )
        })}
        {/* Each slice of 5% or more carries its share, in black, which reads on every shade. */}
        {values.map((value, i) => {
          if (value / total < 0.05) return null
          const before = values.slice(0, i).reduce((a, b) => a + b, 0)
          const middle = angle(before + value / 2)
          const at = (r + hole) / 2
          return (
            <text
              key={i}
              x={50 + at * Math.cos(middle)}
              y={50 + at * Math.sin(middle)}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#000"
              fontSize={8}
              fontWeight={600}
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {percent(value / total)}
            </text>
          )
        })}
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center leading-tight">
        <span className="text-[14px] font-semibold tabular-nums">{total}</span>
        <span className={`text-[8px] ${label2}`}>in all</span>
      </span>
    </span>
  )
}

/**
 * The Strong's analysis sheet on iPhone: the headword card and its chart, the
 * way to the whole entry, then how the word is translated, on its ring.
 */
export function AnalysisArt() {
  const most = Math.max(...agapeByBook.map(([, count]) => count))
  const colour = (standing?: 'more' | 'fewer') =>
    standing === 'more' ? 'var(--sys-tint)' : standing === 'fewer' ? 'var(--lamp-bar-neutral)' : 'var(--lamp-bar-expected)'
  const total = agapeRenderings.reduce((sum, r) => sum + r.count, 0)
  const chart = 58
  return (
    <Art label="iPhone analysis of G26, ἀγάπη (love), in the KJV: 117 occurrences in 106 verses across 24 books. Charts show book frequencies and renderings, including “love” 86 times and “charity” 27 times.">
      <Phone height="h-[440px] lg:h-[480px]" className="!bg-[var(--sys-grouped)]">
        <div className={`flex items-center gap-2 border-b ${sep} px-[9px] pb-[6px] pt-[8px]`}>
          <Glass round>
            <Sym name="xmark" className="h-[11px] w-[11px]" />
          </Glass>
          <span className="flex-1 text-center text-[12px] font-semibold">Word Analysis</span>
          <Glass round>
            <Glyph name="booksVertical" className="h-[12px] w-[12px]" />
          </Glass>
        </div>
        <div
          className="mx-[11px] mt-[8px] rounded-[14px] px-[12px] pb-[10px] pt-[10px]"
          style={{
            background:
              'radial-gradient(80% 70% at 100% 0%, color-mix(in srgb, var(--sys-tint) 15%, transparent), transparent), var(--lamp-hero)',
          }}
        >
          <p className="flex items-center gap-[7px]">
            <span className={`${serif} text-[30px] font-semibold leading-none`}>ἀγάπη</span>{' '}
            <span className="rounded-full bg-[var(--lamp-tile)] px-[6px] py-[2px] text-[9.5px] font-semibold opacity-80">G26</span>
            <Glyph name="speakerWave2" className={`h-[12px] w-[12px] ${caption}`} />
            <Sym name="sliderHorizontal3" className={`ml-auto h-[13px] w-[13px] ${tint}`} />
          </p>
          <p className="mt-[3px] flex items-baseline gap-[6px]">
            <span className={`${serif} text-[13px] italic opacity-80`}>agápē</span>{' '}
            <span className="text-[13px] font-medium">love</span>
          </p>
          <div className="mt-[11px] grid grid-cols-3">
            {[
              ['Occurrences', '117', ''],
              ['Verses', '106', ''],
              ['Books', '24', 'of 27'],
            ].map(([name, value, unit]) => (
              <div key={name}>
                <p className={`text-[9px] font-medium ${caption}`}>{name}</p>
                <p className="flex items-baseline gap-[3px]">
                  <span className="font-[ui-rounded,system-ui] text-[22px] font-bold leading-tight tabular-nums">{value}</span>
                  {unit && <span className={`text-[9.5px] font-semibold ${label2}`}>{unit}</span>}
                </p>
              </div>
            ))}
          </div>
          <div className="relative mt-[10px]" style={{ height: chart + 14 }}>
            <span className={`absolute left-0 top-0 text-[7.5px] font-semibold tabular-nums ${caption}`}>{most} times</span>
            <span className="absolute inset-x-0 top-[12px] border-t border-dashed border-[color:var(--lamp-rule)]" />
            <span className="absolute inset-x-0 bottom-0 h-px bg-[color-mix(in_srgb,var(--lamp-caption)_50%,transparent)]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end gap-[2px]" style={{ height: chart }}>
              {agapeByBook.map(([name, count, standing]) => (
                <span
                  key={name}
                  className="relative flex-1 rounded-[1.5px]"
                  style={{
                    height: count > 0 ? Math.max(4, (chart * count) / most) : 1.5,
                    backgroundColor: count > 0 ? colour(standing) : 'var(--lamp-rule)',
                  }}
                >
                  {name === '1 John' && (
                    <span className={`absolute bottom-full left-1/2 mb-[2px] -translate-x-1/2 whitespace-nowrap text-[7.5px] font-bold ${tint}`}>
                      1 John
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-[3px] flex gap-[2px]">
            {agapeByBook.map(([name, , standing]) => (
              <span key={name} className="flex flex-1 justify-center">
                {standing && (
                  <svg viewBox="0 0 10 8" className="h-[4px] w-[5px]" aria-hidden="true">
                    <path d={standing === 'more' ? 'M5 0 10 8H0z' : 'M0 0h10L5 8z'} fill={colour(standing)} />
                  </svg>
                )}
              </span>
            ))}
          </div>
          <div className="mt-[4px] flex gap-[2px]">
            {ntDivisions.map(([name, books], i) => (
              <span key={i} className="flex flex-col items-center gap-[2px]" style={{ flex: books }}>
                <span className="h-[1.5px] w-full rounded-full bg-[var(--lamp-rule)]" />
                <span className={`whitespace-nowrap text-[7px] font-medium ${caption}`}>{name}</span>
              </span>
            ))}
          </div>
          <div className={`mt-[6px] flex flex-wrap gap-x-[10px] text-[8px] font-medium ${label2}`}>
            {(
              [
                ['More ↑', 'more'],
                ['As expected', undefined],
                ['Fewer ↓', 'fewer'],
              ] as const
            ).map(([name, standing]) => (
              <span key={name} className="flex items-center gap-[3px]">
                <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: colour(standing) }} />
                {name}
              </span>
            ))}
          </div>
        </div>
        <div className="mx-[11px] mt-[14px] flex items-center gap-[9px] rounded-[14px] bg-[var(--sys-cell)] px-[12px] py-[9px]">
          <Glyph name="characterBookClosed" className={`h-[14px] w-[14px] shrink-0 ${tint}`} />
          <p className="min-w-0 flex-1 text-[12px] leading-tight">Definition</p>
          <Sym name="chevronRight" className={`h-[9px] w-[9px] shrink-0 ${label3}`} />
        </div>
        <p className="px-[22px] pb-[5px] pt-[11px] text-[14px] font-bold">Translated As</p>
        <div className="mx-[11px] rounded-[14px] bg-[var(--sys-cell)] px-[12px] pb-[4px] pt-[8px]">
          <PhoneSegmented items={['List', 'Ring']} selected={1} />
          <div className="flex justify-center py-[8px]">
            <ShareRing values={agapeRenderings.map((r) => r.count)} size={89} />
          </div>
          {agapeRenderings.map((r, i) => (
            <div key={r.text} className={`flex items-center gap-[6px] border-t ${sep} py-[6px] text-[11px]`}>
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-[1.5px]"
                style={{ backgroundColor: shade(1 - (0.75 * i) / (agapeRenderings.length - 1)) }}
              />
              <span className="flex-1 truncate">{r.text}</span>
              <span className="tabular-nums">{r.count}</span>
              <span className={`w-[29px] text-right tabular-nums ${caption}`}>{percent(r.count / total)}</span>
            </div>
          ))}
        </div>
      </Phone>
    </Art>
  )
}

/** An iOS segmented control, capsule-shaped as iOS 26 draws it. */
function PhoneSegmented({ items, selected = 0 }: { items: string[]; selected?: number }) {
  return (
    <span className="flex rounded-full bg-[var(--sys-fill)] p-[2px] text-[10px] font-medium">
      {items.map((item, i) => (
        <span
          key={item}
          className={`flex-1 rounded-full py-[3px] text-center ${
            i === selected ? 'bg-[var(--sys-cell-elev)] shadow-[0_1px_3px_rgb(0_0_0/0.12)]' : ''
          }`}
        >
          {item}
        </span>
      ))}
    </span>
  )
}

/** A Settings row's mark: a white glyph on a coloured rounded square. */
function IconTile({ name, colour }: { name: SymbolName; colour: string }) {
  return (
    <span
      className="flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-[6px] text-white"
      style={{ background: `linear-gradient(to bottom, color-mix(in srgb, ${colour} 82%, white), ${colour})` }}
    >
      <Sym name={name} className="h-[11px] w-[11px]" />
    </span>
  )
}

export function SyncArt() {
  const sectionHeader = 'px-[22px] pb-[5px] pt-[12px] text-[10.5px] font-semibold opacity-75'
  return (
    <Art label="iPhone sync settings with iCloud Drive connected, sixteen modules synced and a Sync Now button.">
      <Phone className="!bg-[var(--sys-grouped)]">
        <div className="flex items-center gap-2 px-[9px] pb-[6px] pt-[8px]">
          <Glass round>
            <Sym name="arrowBackward" className="h-[13px] w-[13px]" />
          </Glass>
          <span className="flex-1 pr-[30px] text-center text-[12px] font-semibold">Settings</span>
        </div>
        <div className="mx-[11px] mt-[4px] flex items-center gap-[10px] rounded-[14px] bg-[var(--sys-cell)] px-[12px] py-[9px]">
          <span className="relative h-[32px] w-[32px] shrink-0 overflow-hidden rounded-[8px] bg-gradient-to-b from-[#d42a33] to-[#9e1219]">
            <span className="absolute inset-y-0 left-0 w-[7px] bg-[#5a0d10]" />
            <svg viewBox="0 0 24 24" className="absolute left-[11px] top-[7px] h-[18px] w-[14px]" aria-hidden="true">
              <path d="M12 2c3 5 6 7.5 6 12a6 6 0 0 1-12 0c0-3 2-5 3-7 0 3 1.5 4 3 4-1-3 0-6 0-9z" fill="#ffe3e0" />
            </svg>
          </span>
          <div className="min-w-0 leading-tight">
            <p className="text-[12px] font-semibold">Lamp Bible</p>
            <p className={`truncate text-[9.5px] ${caption}`}>16 modules · Syncs with iCloud Drive</p>
          </div>
        </div>
        <p className={sectionHeader}>Sync</p>
        <div className="mx-[11px] overflow-hidden rounded-[14px] bg-[var(--sys-cell)] text-[12px]">
          <div className="flex items-center gap-[9px] px-[12px] py-[7px]">
            <IconTile name="circlepath" colour="#007aff" />
            Sync Method
            <span className={`ml-auto flex items-center gap-[3px] text-[11px] ${label2}`}>
              iCloud Drive
              <Sym name="chevronUpDown" className="h-[9px] w-[9px]" />
            </span>
          </div>
          {[
            ['Status', 'Connected', <Sym key="s" name="checkmarkIcloudFill" className="h-[13px] w-[13px] text-[color:var(--sys-green)]" />],
            ['Modules', '16 modules', <Sym key="m" name="checkmarkCircleFill" className="h-[11px] w-[11px] text-[color:var(--sys-green)]" />],
          ].map(([name, value, mark]) => (
            <div key={name as string} className={`ml-[12px] flex items-center border-t ${sep} py-[8px] pr-[12px]`}>
              {name}
              <span className={`ml-auto flex items-center gap-[4px] text-[11px] ${label2}`}>
                {value}
                {mark}
              </span>
            </div>
          ))}
          <div className={`ml-[12px] flex items-center border-t ${sep} py-[8px] pr-[12px] ${tint}`}>
            Sync Now
            <Sym name="circlepath" className="ml-auto h-[12px] w-[12px]" />
          </div>
        </div>
        <p className={`px-[22px] pt-[5px] text-[9px] ${label2}`}>Modules sync via iCloud Drive.</p>
      </Phone>
    </Art>
  )
}

/** The iPhone writing editor in Visual Edit, with its formatting bar. */
export function PhoneWritingArt() {
  const bar: Array<SymbolName | 'Aa' | 'B' | 'I' | '|'> = [
    'Aa', '|', 'B', 'I', '|', 'listBullet', 'listNumber', '|', 'textQuote', 'link', 'plusCircle',
  ]
  return (
    <Art label="iPhone editor showing “Abide in the Vine” with a John 15:5 quotation, footnote, table, audio recording and formatting controls.">
      <Phone height="h-[560px]" whole className="!bg-[var(--ed-page)]">
        <div className="flex items-center gap-2 px-[9px] pb-[6px] pt-[8px]">
          <Glass round>
            <Sym name="chevronLeft" className="h-[12px] w-[12px]" />
          </Glass>
          <Glass className="ml-auto gap-[11px]">
            <span className="text-[10px] font-semibold">
              A<span className="text-[13px]">A</span>
            </span>
            <Sym name="checkmarkIcloud" className="h-[14px] w-[14px]" />
            <Sym name="squareAndArrowUp" className="h-[13px] w-[13px]" />
          </Glass>
        </div>
        <div className="px-[15px] pt-[4px] text-[color:var(--ed-text)]">
          <p className={overline}>Devotional · November 7, 2026</p>
          <p className={`${serif} mt-[4px] text-[23px] font-bold leading-tight text-[color:var(--ed-heading)]`}>
            Abide in the Vine
          </p>
          <p className={`mt-[5px] flex items-center gap-[4px] text-[9px] ${label2}`}>
            <Sym name="book" className="h-[9px] w-[9px]" />
            John 15:1–8
          </p>
          <div className="mt-[9px] border-t border-[color:var(--ed-rule)]" />
          <div className={`${serif} text-[13px] leading-[1.6]`}>
            <div className="mt-[10px] rounded-r-[8px] border-l-[3px] border-[color-mix(in_srgb,var(--sys-tint)_55%,transparent)] bg-[var(--ed-wash)] px-[10px] py-[7px]">
              <p className="text-[12.5px] leading-[1.5]">
                I am the vine, ye are the branches: He that abideth in me, and I in him, the same
                bringeth forth much fruit.
              </p>
              <p className="text-[11.5px] italic text-[color:var(--ed-muted)]">John 15:5</p>
            </div>
            <p className="mt-[9px]">
              Jesus connects bearing fruit with remaining in him.
              <sup className={`ml-[1px] font-sans text-[0.7em] font-semibold ${blue}`}>[1]</sup>
            </p>
            <div className="mt-[9px] grid grid-cols-2 overflow-hidden rounded-[2px] border border-[color:var(--ed-rule)] text-[11px]">
              <span className="border-b border-r border-[color:var(--ed-rule)] bg-[var(--ed-wash)] px-[8px] py-[4px] font-semibold">Abide</span>
              <span className="border-b border-[color:var(--ed-rule)] bg-[var(--ed-wash)] px-[8px] py-[4px] font-semibold">Bear fruit</span>
              <span className="border-r border-[color:var(--ed-rule)] px-[8px] py-[4px]">v. 4</span>
              <span className="px-[8px] py-[4px]">vv. 5, 8</span>
            </div>
            <div className="mt-[9px] flex items-center gap-[8px] rounded-[10px] border border-[color:var(--ed-rule)] bg-[var(--ed-wash)] px-[10px] py-[6px] font-sans">
              <span className="text-[17px] leading-none">🎵</span>
              <span className="text-[11px] text-[color:var(--ed-muted)]">Audio</span>
            </div>
            <div className="mt-[10px] border-t border-[color:var(--ed-rule)] pt-[5px] text-[11px] text-[color:var(--ed-muted)]">
              <span className={`font-sans font-semibold ${blue}`}>1.</span> Compare 1 John 2:6.
            </div>
          </div>
        </div>
        <div className="absolute inset-x-[9px] bottom-[50px] flex items-center justify-between rounded-full border-[0.5px] border-[color:var(--sys-glass-edge)] bg-[var(--sys-glass)] px-[6px] py-[5px] shadow-[0_2px_8px_rgb(0_0_0/0.1)]">
          {bar.map((item, i) =>
            item === '|' ? (
              <span key={i} className="h-[14px] w-px shrink-0 bg-[color-mix(in_srgb,var(--sys-label)_12%,transparent)]" />
            ) : (
              <span key={i} className="flex h-[22px] w-[20px] shrink-0 items-center justify-center text-[12px]">
                {item === 'Aa' ? (
                  <span className="font-medium">Aa</span>
                ) : item === 'B' ? (
                  <span className="font-bold">B</span>
                ) : item === 'I' ? (
                  <span className="font-serif italic">I</span>
                ) : (
                  <Sym name={item} className="h-[12px] w-[12px]" />
                )}
              </span>
            ),
          )}
        </div>
        <div className="absolute bottom-[10px] right-[10px]">
          <Glass round>
            <Sym name="pencil" className="h-[12px] w-[12px]" />
          </Glass>
        </div>
      </Phone>
    </Art>
  )
}

// ——— Mac ——————————————————————————————————————————————————————————————————

function TrafficLights() {
  return (
    <span className="flex shrink-0 gap-[6px]">
      <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
      <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
      <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
    </span>
  )
}

/**
 * A Mac window as macOS 26 draws it: no title bar of its own, the traffic
 * lights, title and toolbar's glass capsules laid over the top of the page.
 */
function MacWindow({
  title,
  leading,
  toolbar,
  className = '',
  children,
}: {
  title?: string
  leading?: ReactNode
  toolbar?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={`app-ui @container overflow-hidden rounded-[12px] border border-[color:var(--mac-card-edge)] bg-[var(--mac-window)] art-shadow ${className}`}
    >
      <div className="flex items-center gap-[8px] px-[10px] py-[7px]">
        <TrafficLights />
        {leading}
        {title && <p className="min-w-0 truncate text-[11px] font-semibold">{title}</p>}
        <div className="ml-auto flex shrink-0 items-center gap-[6px]">{toolbar}</div>
      </div>
      {children}
    </div>
  )
}

/** A capsule of toolbar glass, holding one control or a group of them. */
function MacGlass({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={`flex h-[22px] shrink-0 items-center gap-[7px] rounded-full border-[0.5px] border-[color:var(--mac-glass-edge)] bg-[var(--mac-glass)] px-[7px] text-[9.5px] shadow-[0_1px_3px_rgb(0_0_0/0.1)] ${className}`}
    >
      {children}
    </span>
  )
}

/** A toolbar symbol; `on` for a pane that is showing, drawn in a filled circle. */
function ToolIcon({ name, on = false, dim = false }: { name: SymbolName; on?: boolean; dim?: boolean }) {
  return on ? (
    <span className="flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[var(--sys-label2)] text-[color:var(--mac-window)]">
      <Sym name={name} className="h-[11px] w-[11px]" />
    </span>
  ) : (
    <Sym name={name} className={`h-[12px] w-[12px] ${dim ? label3 : ''}`} />
  )
}

function Segmented({
  items,
  selected = 0,
  className = '',
}: {
  items: ReactNode[]
  selected?: number
  className?: string
}) {
  return (
    <span className={`flex rounded-full bg-[var(--sys-fill)] p-[2px] text-[9.5px] ${className}`}>
      {items.map((item, i) => (
        <span
          key={i}
          className={`flex items-center justify-center gap-[3px] rounded-full px-[8px] py-[2px] ${
            i === selected ? 'bg-[var(--mac-control)] shadow-[0_1px_2px_rgb(0_0_0/0.14)]' : ''
          }`}
        >
          {item}
        </span>
      ))}
    </span>
  )
}

/**
 * Lamp's own button at the small size: a capsule on the neutral tile fill, or in the muted accent
 * for the one action a surface is for; a menu adds the chevron that says it opens one
 * (LampSecondaryButtonStyle, LampProminentButtonStyle, LampMenuButtonStyle).
 */
function MacCapsule({
  prominent = false,
  menu = false,
  className = '',
  children,
}: {
  prominent?: boolean
  menu?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={`flex h-[17px] shrink-0 items-center gap-[4px] rounded-full px-[7px] text-[9px] font-medium ${
        prominent ? 'bg-[var(--mac-accent-muted)] text-white' : 'bg-[var(--mac-tile)]'
      } ${className}`}
    >
      {children}
      {menu && <Sym name="chevronDown" className="h-[6px] w-[6px] text-[color:var(--mac-secondary)]" />}
    </span>
  )
}

/** A bordered macOS button, as a Settings form still draws one. */
function MacButton({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`flex h-[19px] shrink-0 items-center gap-[4px] rounded-[6px] border ${sep} bg-[var(--mac-control)] px-[7px] text-[9.5px] shadow-[0_1px_1px_rgb(0_0_0/0.05)] ${className}`}
    >
      {children}
    </span>
  )
}

/** A macOS pop-up button, as a Settings form still draws one: the current choice and the up-down chevrons. */
function MacPopUp({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`flex h-[19px] shrink-0 items-center gap-[6px] rounded-[6px] bg-[var(--mac-popup)] px-[7px] text-[9.5px] ${className}`}>
      {children}
      <Sym name="chevronUpDown" className="ml-auto h-[7px] w-[7px]" />
    </span>
  )
}

/** A macOS switch, on in the muted accent the app tints its switches with. */
function MacSwitch({ on = false }: { on?: boolean }) {
  return (
    <span
      className={`flex h-[14px] w-[26px] shrink-0 items-center rounded-full p-[1.5px] ${
        on ? 'justify-end bg-[var(--mac-accent-muted)]' : 'bg-[var(--sys-fill)]'
      }`}
    >
      <span className="h-[11px] w-[15px] rounded-full bg-white shadow-[0_1px_2px_rgb(0_0_0/0.25)]" />
    </span>
  )
}

/**
 * The writing editor's toolbar (DevotionalEditorView.editorToolbar): the writing list, History and
 * the Workspace menu, the title; then the surface, Details and Assistant together, the deck, and
 * Done in a group of its own. Names show only from 1,120pt, wider than these windows are drawn.
 */
function editorToolbar({
  details = false,
  agent = false,
  review = false,
}: {
  details?: boolean
  agent?: boolean
  /** The "N to Review" menu, shown while the assistant's changes are marked; its icon alone at this width. */
  review?: boolean
}) {
  return {
    leading: (
      <>
        <MacGlass className="hidden @md:flex">
          <ToolIcon name="sidebarLeft" />
        </MacGlass>
        <MacGlass className="hidden gap-[8px] @md:flex">
          <ToolIcon name="clockArrow" />
          <span className="flex items-center gap-[2px]">
            <ToolIcon name="folder" />
            <Sym name="chevronDown" className="h-[7px] w-[7px]" />
          </span>
        </MacGlass>
      </>
    ),
    toolbar: (
      <>
        <MacGlass className="hidden !px-[2px] @lg:flex">
          <Segmented items={['Visual', 'Markdown']} className="!bg-transparent !p-0" />
        </MacGlass>
        <MacGlass className="gap-[8px]">
          <ToolIcon name="infoCircle" on={details} />
          <ToolIcon name="sparkles" on={agent} />
        </MacGlass>
        {review && (
          <MacGlass className="hidden @sm:flex">
            <ToolIcon name="checkmarkCircle" />
          </MacGlass>
        )}
        <MacGlass className="hidden @sm:flex">
          <ToolIcon name="slideDeck" />
        </MacGlass>
        <MacGlass className="font-medium">Done</MacGlass>
      </>
    ),
  }
}

/** The Visual editor's formatting bar, one quiet row a pane header high: style, emphasis, lists, blocks, Insert, size. */
function FormatBar() {
  const rule = <span className="h-[12px] w-px shrink-0 bg-[var(--sys-sep)]" />
  const icon = 'h-[11px] w-[11px] shrink-0'
  const small = `h-[7px] w-[7px] shrink-0 ${label2}`
  return (
    <div className={`flex h-[30px] shrink-0 items-center justify-center gap-[8px] overflow-hidden whitespace-nowrap border-b ${sep} px-[10px] text-[9.5px]`}>
      <span className="flex items-center gap-[6px]">
        Body <Sym name="chevronDown" className={small} />
      </span>
      {rule}
      <span className="font-bold">B</span>
      <span className="font-serif italic">I</span>
      {rule}
      <Sym name="listBullet" className={icon} />
      <Sym name="listNumber" className={icon} />
      <span className="hidden gap-[8px] @sm:flex">
        <Sym name="decreaseIndent" className={icon} />
        <Sym name="increaseIndent" className={icon} />
      </span>
      {rule}
      <span className="hidden gap-[8px] @md:flex">
        <Sym name="textQuote" className={icon} />
        <Sym name="minus" className={icon} />
        <Sym name="tablecells" className={icon} />
        {rule}
      </span>
      <span className="flex items-center gap-[3px]">
        <Sym name="plus" className="h-[9px] w-[9px] shrink-0" />
        Insert
        <Sym name="chevronDown" className={small} />
      </span>
      <span className="hidden items-center gap-[6px] @lg:flex">
        {rule}
        <span className={`text-[8px] ${label2}`}>
          A<span className="text-[10px]">A</span>
        </span>
        <Sym name="minus" className="h-[9px] w-[9px] shrink-0" />
        15 pt
        <Sym name="plus" className="h-[9px] w-[9px] shrink-0" />
      </span>
    </div>
  )
}

/** The editor's status line: whether it is saved, and how long the piece is. */
function EditorStatus() {
  return (
    <div className={`flex justify-between border-t ${sep} px-[10px] py-[4px] text-[9px] ${label2}`}>
      <span>Up to date</span>
      <span>642 words · 4 min read</span>
    </div>
  )
}

/** The Mac writing editor with its agent workspace open beside it. */
export function AgentWorkspaceArt() {
  const { leading, toolbar } = editorToolbar({ agent: true, review: true })
  return (
    <Art
      className="@container"
      label="Mac editor with a draft and companion-file tabs beside the assistant’s workspace, connected to Claude. The sentence the assistant rewrote is marked for review, with buttons to clear the mark or restore the original wording. The setup shows the provider and model menus, context, skills and a chat about the edit."
    >
      <MacWindow title="Abide in the Vine" leading={leading} toolbar={toolbar}>
        <div className="grid grid-cols-[minmax(0,1fr)] @xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col">
            <MacTabBar tabs={[{ title: 'Main Prose', open: true }, { title: 'Outline' }, { title: 'Research Notes' }]} />
            <FormatBar />
            <div className="flex-1 px-[22px] py-[14px] text-[11.5px] leading-[1.6]">
              <p className={`${serif} text-[18px] font-bold leading-tight`}>Abide in the Vine</p>
              {/* The assistant's rewrite, marked for review as TipTapEditorView draws it: the ✓ hung
                  in the margin to clear it, ↺ to put the original back, then the washed passage. */}
              <p className={`${serif} mt-[7px]`}>
                <span className="-ml-[22px] mr-[6px] inline-flex h-[16px] w-[16px] items-center justify-center align-middle font-sans text-[10px] leading-none text-[color:var(--mac-review-ink)]">
                  ✓
                </span>
                <span className="-ml-[6px] mr-[6px] inline-flex h-[16px] w-[16px] items-center justify-center align-middle font-sans text-[10px] leading-none text-[color:var(--mac-review-ink)]">
                  ↺
                </span>
                <span className="border-b border-dotted border-[color:var(--mac-review-rule)] bg-[var(--mac-review-wash)]">
                  Jesus connects bearing fruit with remaining in him.
                  <sup className={`ml-[1px] font-sans text-[0.75em] font-semibold ${blue}`}>[1]</sup>
                </span>
              </p>
              <div className="mt-[8px] space-y-[7px]">
                <span className="block h-[5px] w-[94%] rounded-full bg-[var(--sys-fill)]" />
                <span className="block h-[5px] w-[88%] rounded-full bg-[var(--sys-fill)]" />
                <span className="block h-[5px] w-[56%] rounded-full bg-[var(--sys-fill)]" />
              </div>
              <p className={`mt-[10px] border-t ${sep} pt-[5px] text-[9.5px] ${label2}`}>
                <span className={`font-semibold ${blue}`}>1</span> Compare 1 John 2:6.
              </p>
            </div>
            <EditorStatus />
          </div>

          <div className={`flex flex-col border-0 ${sep} bg-[var(--mac-inspector)] @xl:border-l`}>
            {/* The setup's one row, a pane header's 42pt: the agent, its model when one is chosen,
                the writing, and whether it is connected. Open, the setup shows beneath it. */}
            <div className={`flex h-[30px] shrink-0 items-center gap-[5px] border-y ${sep} px-[9px] text-[9px]`}>
              <Sym name="chevronRight" className={`h-[7px] w-[7px] rotate-90 ${label2}`} />
              <Sym name="sparkles" className={`h-[10px] w-[10px] ${label2}`} />
              <span className="truncate font-medium">Claude · Abide in the Vine</span>
              <span className="flex shrink-0 items-center gap-[3px] text-[color:var(--sys-green)]">
                <Sym name="checkmarkCircleFill" className="h-[9px] w-[9px]" />
                Connected
              </span>
            </div>
            <div className={`space-y-[6px] border-b ${sep} px-[9px] py-[7px] text-[9px]`}>
              <div className="flex items-center gap-[8px]">
                <MacCapsule menu>Claude</MacCapsule>
                {['Default model', 'Default effort'].map((choice) => (
                  <span key={choice} className={`flex items-center gap-[3px] ${label2}`}>
                    {choice}
                    <Sym name="chevronDown" className={`h-[6px] w-[6px] ${label3}`} />
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-[6px]">
                <Segmented
                  items={[
                    <>
                      <Sym name="bubbles" className="h-[10px] w-[10px]" />
                      Chat
                    </>,
                    <>
                      <Sym name="terminal" className="h-[10px] w-[10px]" />
                      Terminal
                    </>,
                  ]}
                />
                <Sym name="folder" className={`ml-auto h-[12px] w-[12px] ${label2}`} />
              </div>
            </div>
            <div className="space-y-[8px] px-[10px] py-[8px] text-[10px]">
              <div>
                <p className="flex items-center gap-[4px] font-semibold">
                  <Sym name="docText" className="h-[11px] w-[11px]" />
                  Draft
                </p>
                <div className="mt-[3px] flex items-center gap-[4px]">
                  <Sym name="checkmarkCircleFill" className="h-[10px] w-[10px] text-[color:var(--sys-green)]" />
                  <span className={`text-[9px] ${label2}`}>Live sync is active</span>
                  <MacCapsule className="ml-auto !h-[16px] !text-[8.5px]">
                    <Sym name="clockArrow" className="h-[9px] w-[9px]" />
                    Revisions (3)
                  </MacCapsule>
                </div>
              </div>
              <div>
                <p className="flex items-center gap-[4px] font-semibold">
                  <Sym name="paperclip" className="h-[11px] w-[11px]" />
                  Context
                </p>
                <p className="mt-[3px] flex items-center gap-[4px] text-[9.5px]">
                  <Sym name="doc" className={`h-[10px] w-[10px] ${label2}`} />
                  earlier-talk.md{' '}
                  <span className={`text-[8px] ${label3}`}>12 KB</span>
                </p>
              </div>
              <div>
                <p className="flex items-center gap-[4px] font-semibold">
                  <Sym name="wandStars" className="h-[11px] w-[11px]" />
                  Workspace Skills
                </p>
                {['build-lamp-deck', 'original-languages', 'sola-scriptura'].map((skill) => (
                  <p key={skill} className="mt-[3px] flex items-center gap-[5px] text-[9.5px] font-medium">
                    {skill}
                    <span className={`flex items-center gap-[2px] text-[8px] font-normal ${label2}`}>
                      <Sym name="lockFill" className="h-[7px] w-[7px]" />
                      Built-in
                    </span>
                  </p>
                ))}
              </div>
            </div>
            <div className={`flex flex-1 flex-col gap-[7px] border-t ${sep} px-[10px] py-[7px] text-[10px] leading-[1.45]`}>
              {/* The chat's own header: its identity is the setup row's, so only New Chat is left. */}
              <Sym name="squareAndPencil" className={`-mb-[2px] ml-auto h-[10px] w-[10px] shrink-0 ${label2}`} />
              <p className="ml-auto w-fit max-w-[86%] rounded-[12px] rounded-tr-[4px] bg-[color-mix(in_srgb,var(--sys-tint)_16%,transparent)] px-[9px] py-[5px]">
                Tighten the opening, and find where else John uses “abide”.
              </p>
              <div className="max-w-[96%]">
                <p>Shortened the first sentence. The cross-references tie verse 4 to 1 John 2:6, so I added it as a footnote.</p>
                <div className={`mt-[5px] overflow-hidden rounded-[7px] border ${sep}`}>
                  <div className={`flex justify-between bg-[var(--sys-primary-a)] px-[7px] py-[2px] text-[8px] ${label2}`}>
                    <span>diff</span>
                    <span>Copy</span>
                  </div>
                  <p className="truncate bg-[rgb(255_59_48/0.14)] px-[7px] font-mono text-[8.5px] text-[color:var(--sys-red)]">
                    - Jesus says a great deal in this chapter about fruit.
                  </p>
                  <p className="truncate bg-[rgb(52_199_89/0.14)] px-[7px] font-mono text-[8.5px] text-[color:var(--sys-green)]">
                    + Jesus connects bearing fruit with remaining in him.
                  </p>
                </div>
              </div>
              <div className="mt-auto flex items-center gap-[6px] rounded-[14px] border border-[color-mix(in_srgb,var(--sys-label)_13%,transparent)] py-[4px] pl-[10px] pr-[4px]">
                <span className={label3}>Message Claude</span>
                <span className="ml-auto flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[var(--sys-fill)] text-[color:var(--sys-label2)]">
                  <Sym name="arrowUp" className="h-[9px] w-[9px]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </MacWindow>
    </Art>
  )
}

/** One field of the editor's Details pane, under its own small label. */
function InspectorField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="mb-[3px] text-[9px] font-medium text-[color:var(--mac-secondary)]">{label}</p>
      <div className={`flex h-[19px] items-center rounded-[6px] border ${sep} bg-[var(--mac-control)] px-[6px] text-[9.5px]`}>
        {children}
      </div>
    </div>
  )
}

/** The writing editor finding and replacing, with its Details pane open. */
export function MacEditorArt() {
  const match = 'rounded-[2px] bg-[var(--mac-match)] text-[color:var(--mac-on-match)]'
  const { leading, toolbar } = editorToolbar({ details: true })
  const heading = `text-[8px] font-semibold uppercase tracking-[0.08em] text-[color:var(--mac-secondary)]`
  return (
    <Art
      className="@container"
      label="Mac editor replacing “abide” with “remain”, with matches highlighted and document details beside the draft."
    >
      <MacWindow title="Abide in the Vine" leading={leading} toolbar={toolbar}>
        <div className="grid grid-cols-[minmax(0,1fr)] @md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div className="flex flex-col">
            <div className={`space-y-[4px] border-y ${sep} bg-[var(--mac-control)] px-[8px] py-[6px] text-[9.5px]`}>
              <div className="flex items-center gap-[4px]">
                <MacPopUp className="!bg-transparent !px-[2px]">Replace</MacPopUp>
                <span className="flex h-[19px] min-w-0 flex-1 items-center gap-[4px] rounded-[6px] border-2 border-[color-mix(in_srgb,var(--sys-tint)_70%,transparent)] bg-[var(--mac-control)] px-[5px]">
                  <Sym name="magnifyingglass" className={`h-[9px] w-[9px] ${label2}`} />
                  abide
                  <span className={`ml-auto font-[ui-rounded,system-ui] text-[8px] font-semibold ${label2}`}>
                    Aa <span className="underline">ab</span>
                  </span>
                  <span className={`text-[8.5px] tabular-nums ${label2}`}>2 of 4</span>
                </span>
                <span className="hidden @sm:flex">
                  <MacButton className="!px-[4px]">
                    <Sym name="chevronLeft" className="h-[8px] w-[8px]" />
                    <Sym name="chevronRight" className="h-[8px] w-[8px]" />
                  </MacButton>
                </span>
                <MacCapsule>Done</MacCapsule>
              </div>
              <div className="flex items-center gap-[4px] pl-[50px]">
                <span className={`flex h-[19px] min-w-0 flex-1 items-center rounded-[6px] border ${sep} bg-[var(--mac-control)] px-[6px]`}>
                  remain
                </span>
                <MacCapsule>Replace</MacCapsule>
                <MacCapsule>Replace All</MacCapsule>
              </div>
            </div>
            <div className={`${serif} flex-1 px-[18px] py-[12px] text-[11.5px] leading-[1.65]`}>
              A branch bears fruit only while it <span className={match}>abide</span>s in the vine.{' '}
              <span className="rounded-[2px] bg-[#ffcc00] text-black">Abide</span> in me, he says,
              and the fruit takes care of itself. To <span className={match}>abide</span> is to
              stay.
            </div>
            <EditorStatus />
          </div>
          <div className={`space-y-[8px] border-t ${sep} bg-[var(--mac-inspector)] px-[10px] py-[9px] @md:border-l @md:border-t-0`}>
            <p className={heading}>Details</p>
            <InspectorField label="Title">Abide in the Vine</InspectorField>
            <div className="grid grid-cols-2 gap-[8px]">
              <InspectorField label="Date">2026-11-07</InspectorField>
              <InspectorField label="Category">
                Exhortation
                <Sym name="chevronUpDown" className="ml-auto h-[7px] w-[7px]" />
              </InspectorField>
            </div>
            <InspectorField label="Tags">fruit, abiding</InspectorField>
            {[
              ['Series', 'Studies in John'],
              ['Key Scripture', 'John 15:1–8'],
            ].map(([group, held]) => (
              <div key={group} className={`flex items-center gap-[5px] border-t ${sep} pt-[7px]`}>
                <Sym name="chevronRight" className={`h-[7px] w-[7px] ${label2}`} />
                <span className={heading}>{group}</span>
                <span className="ml-auto truncate text-[9px] text-[color:var(--mac-secondary)]">{held}</span>
              </div>
            ))}
          </div>
        </div>
      </MacWindow>
    </Art>
  )
}

/** Slide Studio: the deck's slides, a Scripture slide in the Lamp Dark theme, and its notes. */
export function SlideArt() {
  const thumbs = [{ n: 1 }, { n: 2, on: true }, { n: 3 }]
  const rounded: CSSProperties = { fontFamily: "ui-rounded, 'SF Pro Rounded', system-ui, sans-serif" }
  return (
    <Art
      className="@container"
      label="Mac Slide Studio with a John 15:5 scripture slide, a slide list and speaker notes linked to the manuscript."
    >
      <MacWindow
        title="Abide in the Vine"
        toolbar={
          <>
            <MacGlass className="hidden gap-[9px] @sm:flex">
              <ToolIcon name="uturnBackward" />
              <ToolIcon name="uturnForward" />
            </MacGlass>
            <MacGlass className="hidden gap-[4px] @md:flex">
              <ToolIcon name="rectangleStack" />
              Deck
              <Sym name="chevronDown" className="h-[7px] w-[7px]" />
            </MacGlass>
            <MacGlass className="hidden gap-[4px] @lg:flex">
              <ToolIcon name="qrcode" />
              Remote
            </MacGlass>
            <span className="flex h-[22px] items-center gap-[4px] rounded-full bg-[var(--mac-accent-muted)] px-[10px] text-[9.5px] font-medium text-white">
              <Sym name="playFill" className="h-[8px] w-[8px]" />
              Play
            </span>
          </>
        }
      >
        <div className="grid grid-cols-[92px_minmax(0,1fr)]">
          <div className={`flex flex-col border-r ${sep} bg-[var(--mac-sidebar)]`}>
            <div className={`border-b ${sep} px-[8px] pb-[6px] pt-[2px] leading-tight`}>
              <p className="flex items-center text-[9.5px] font-semibold">
                <span className="truncate">Abide in the Vine</span>
                <Sym name="chevronUpDown" className={`ml-auto h-[7px] w-[7px] shrink-0 ${label2}`} />
              </p>
              <p className={`text-[8px] ${label2}`}>6 slides</p>
            </div>
            <div className="space-y-[4px] p-[5px]">
              {thumbs.map((t) => (
                <div
                  key={t.n}
                  className={`flex gap-[4px] rounded-[6px] p-[3px] ${t.on ? 'bg-[color-mix(in_srgb,var(--sys-label)_8%,transparent)]' : ''}`}
                >
                  <span className={`w-[8px] pt-[1px] text-right text-[7.5px] ${label2}`}>{t.n}</span>
                  <div className="relative aspect-video flex-1 rounded-[3px] bg-[#111827] p-[4px] ring-1 ring-[color:var(--sys-sep)]">
                    <span className="block h-[2.5px] w-[70%] rounded-full bg-[#F9FAFB]/70" />
                    <span className="mt-[2.5px] block h-[2.5px] w-[50%] rounded-full bg-[#F9FAFB]/50" />
                    <span className="mt-[2.5px] block h-[2px] w-[30%] rounded-full bg-[#F59E0B]" />
                  </div>
                </div>
              ))}
            </div>
            <p className={`mt-auto flex items-center gap-[3px] border-t ${sep} px-[7px] py-[5px] text-[8.5px]`}>
              <Sym name="plus" className="h-[8px] w-[8px]" />
              Add Slide
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-1 items-center bg-[var(--mac-canvas)] px-[18px] py-[14px]">
              <div className="flex aspect-video w-full items-center bg-[#111827] px-[8%] shadow-[0_6px_14px_rgb(0_0_0/0.22)]" style={rounded}>
                <div className="flex gap-[6%]">
                  <span className="w-[3px] shrink-0 rounded-full bg-[#F59E0B]" />
                  <div>
                    <p className="text-[12px] leading-[1.35] text-[#F9FAFB] sm:text-[13px]">
                      “I am the vine, ye are the branches: He that abideth in me, and I in him, the
                      same bringeth forth much fruit…”
                    </p>
                    <p className="mt-[6px] text-[8.5px] font-medium text-[#F59E0B]">John 15:5</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`border-t ${sep} px-[10px] py-[6px] text-[9px]`}>
              <div className="flex items-center gap-[5px]">
                <Sym name="personCropRectangle" className="h-[11px] w-[11px]" />
                <span className="font-semibold">Presenter Notes</span>
                <span className="ml-auto hidden items-center gap-[5px] @sm:flex">
                  Follow the writing
                  <MacSwitch on />
                </span>
              </div>
              <p className={`mt-[3px] text-[8.5px] ${label2}`}>Begins at “I am the vine”</p>
              <p className={`mt-[3px] rounded-[6px] border ${sep} bg-[var(--mac-control)] px-[7px] py-[4px] leading-[1.45]`}>
                <span className="underline decoration-[color:var(--sys-tint)]">I am the vine</span> introduces the image of Jesus as the vine and his disciples as branches.
              </p>
            </div>
            <div className={`flex items-center gap-[4px] border-t ${sep} px-[10px] py-[4px] text-[8.5px] ${label2}`}>
              <Sym name="checkmarkCircleFill" className="h-[9px] w-[9px] text-[color:var(--sys-green)]" />
              Saved
            </div>
          </div>
        </div>
      </MacWindow>
    </Art>
  )
}

/**
 * The Mac's tab rank, shared by the reader, Search and a writing's documents (LibraryTabBar): a
 * pane header's 42pt, under the rule that closes the panes off below the toolbar; the tabs split
 * the bar, the open one a raised 26pt tab with a 6pt gap at the ends, and + at the trailing edge.
 */
function MacTabBar({ tabs }: { tabs: Array<{ title: string; open?: boolean }> }) {
  return (
    <div className={`flex h-[30px] border-y ${sep} bg-[var(--mac-tab-track)] px-[4px]`}>
      {tabs.map((tab, i) => (
        <span key={tab.title} className="relative flex min-w-0 flex-1">
          <span
            className={`mx-[1px] my-[5.5px] flex min-w-0 flex-1 items-center justify-center rounded-[5px] px-[16px] text-[8px] ${
              tab.open
                ? 'border-[0.5px] border-[color:var(--mac-tab-edge)] bg-[var(--mac-tab-open)] shadow-[0_0.5px_1px_var(--mac-tab-shadow)]'
                : label2
            }`}
          >
            <span className="truncate">{tab.title}</span>
          </span>
          {/* A hairline only between two tabs at rest: beside the raised one it would cut into it. */}
          {i < tabs.length - 1 && !tab.open && !tabs[i + 1].open && (
            <span className="absolute inset-y-[10px] right-0 w-px bg-[var(--sys-sep)]" />
          )}
        </span>
      ))}
      <span className="flex w-[22px] shrink-0 items-center justify-center">
        <Sym name="plus" className={`h-[9px] w-[9px] ${label2}`} />
      </span>
    </div>
  )
}

export function MacAnalysisArt() {
  const most = Math.max(...agapeByBook.map(([, count]) => count))
  const total = agapeByBook.reduce((sum, [, count]) => sum + count, 0)
  const occurrences = [
    { ref: '1 John 2:5', before: 'But whoso keepeth his word, in him verily is ', word: 'the love', after: ' of God perfected: hereby know we that we are in him.' },
    { ref: '1 John 2:15', before: '…If any man love the world, ', word: 'the love', after: ' of the Father is not in him.' },
    { ref: '1 John 3:1', before: 'Behold, what manner of ', word: 'love', after: ' the Father hath bestowed upon us, that we should be called the sons of God…' },
    { ref: '1 John 3:16', before: 'Hereby perceive we ', word: 'the love', after: ' of God, because he laid down his life for us…' },
    { ref: '1 John 4:7', before: 'Beloved, let us love one another: for ', word: 'love', after: ' is of God; and every one that loveth is born of God…' },
    { ref: '1 John 4:8', before: 'He that loveth not knoweth not God; for God is ', word: 'love', after: '.' },
  ]
  const fill = (standing?: 'more' | 'fewer') =>
    standing === 'more' ? 'var(--sys-tint)' : standing === 'fewer' ? 'var(--mac-bar-fewer)' : 'var(--mac-bar-expected)'
  const strip = 39
  return (
    <Art
      className="@container"
      label="Mac Search analysing G26 in the KJV: 117 occurrences in 106 verses across 24 books. The word’s analysis leads on the left, its Spread tab charting occurrences by book; beside it the verses, narrowed to eighteen occurrences in 1 John."
    >
      <MacWindow
        title="Search"
        toolbar={
          <>
            {/* Content and Module, Lamp menus with one chevron, then the search field. */}
            <MacGlass className="hidden !px-[8px] @lg:flex">
              Scripture
              <Sym name="chevronDown" className={`h-[6px] w-[6px] ${label2}`} />
            </MacGlass>
            <MacGlass className="hidden w-[108px] !px-[8px] @2xl:flex">
              All Modules
              <Sym name="chevronDown" className={`ml-auto h-[6px] w-[6px] ${label2}`} />
            </MacGlass>
            <MacGlass className={`hidden w-[128px] @xl:flex ${label3}`}>
              <Sym name="magnifyingglass" className="h-[9px] w-[9px] shrink-0" />
              <span className="truncate">Search Library</span>
            </MacGlass>
          </>
        }
      >
        <MacTabBar tabs={[{ title: 'G26', open: true }]} />
        {/* The filters that refine Scripture, as soft chips under the toolbar. */}
        <div className={`flex gap-[6px] border-b ${sep} px-[10px] py-[5px] text-[9px]`}>
          <span className="hidden h-[22px] items-center gap-[4px] rounded-full border border-[color:var(--mac-card-edge)] bg-[var(--mac-tile)] px-[8px] @md:flex">
            <Sym name="book" className="h-[9px] w-[9px]" />
            All Books
            <Sym name="chevronDown" className={`h-[6px] w-[6px] ${label2}`} />
          </span>
          <span className="flex h-[22px] items-center gap-[4px] rounded-full border border-[color:var(--mac-card-edge)] bg-[var(--mac-tile)] pl-[8px] pr-[5px]">
            <span className="flex items-center gap-[3px] text-[color:var(--mac-secondary)]">
              <Sym name="number" className="h-[9px] w-[9px]" />
              Strong’s
            </span>
            <span className={`flex h-[15px] w-[86px] items-center rounded-[4px] border ${sep} bg-[var(--mac-control)] px-[4px]`}>G26</span>
            <Sym name="xmarkCircleFill" className="h-[10px] w-[10px] text-[color:var(--mac-secondary)]" />
          </span>
        </div>
        <div className="grid h-[400px] grid-cols-[minmax(0,1fr)] overflow-hidden @xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          {/* The word leads, on the left; the verses it narrows are on the right. */}
          <div className="min-w-0">
            <p className={`flex items-center gap-[3px] px-[11px] pt-[7px] text-[9px] ${tint}`}>
              <Sym name="chevronLeft" className="h-[8px] w-[8px]" />
              Back to Search
            </p>
            <div
              className="mx-[10px] mt-[5px] rounded-[9px] p-[11px]"
              style={{
                background:
                  'radial-gradient(90% 80% at 100% 0%, color-mix(in srgb, var(--sys-tint) 15%, transparent), transparent), var(--mac-card)',
              }}
            >
              <p className="flex items-center gap-[7px]">
                <span className={`${serif} text-[22px] font-semibold leading-none`}>ἀγάπη</span>{' '}
                <span className="rounded-full bg-[var(--sys-fill)] px-[6px] py-[1px] text-[9px] font-semibold tabular-nums opacity-80">G26</span>
                <Glyph name="speakerWave2" className={`h-[11px] w-[11px] ${label2}`} />
                <span className={`ml-auto flex items-center gap-[9px] ${label2}`}>
                  <Sym name="sliderHorizontal3" className="h-[11px] w-[11px]" />
                  <Glyph name="rectangleStackBadgePlus" className="h-[11px] w-[11px]" />
                </span>
              </p>
              <p className="mt-[3px] flex items-baseline gap-[6px] text-[10.5px]">
                <span className={`${serif} italic ${label2}`}>agápē</span>{' '}
                <span className="font-medium">love</span>
              </p>
              <div className="mt-[9px] grid grid-cols-3 gap-[9px]">
                {[
                  ['Occurrences', '117', ''],
                  ['Verses', '106', ''],
                  ['Books', '24', 'of 27'],
                ].map(([name, value, unit]) => (
                  <div key={name}>
                    <p className={`text-[8.5px] font-medium ${label2}`}>{name}</p>
                    <p className="flex items-baseline gap-[3px]">
                      <span className="font-[ui-rounded,system-ui] text-[19px] font-bold leading-tight tabular-nums">{value}</span>
                      {unit && <span className={`text-[9px] font-semibold ${label2}`}>{unit}</span>}
                    </p>
                  </div>
                ))}
              </div>
              <div className="relative mt-[9px]" style={{ height: strip + 12 }}>
                <span className={`absolute left-0 top-0 text-[8px] font-semibold tabular-nums ${label2}`}>{most} times</span>
                <span className="absolute inset-x-0 top-[11.5px] border-t border-dashed border-[color:color-mix(in_srgb,var(--sys-label)_15%,transparent)]" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-[color-mix(in_srgb,var(--sys-label)_25%,transparent)]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end gap-[2px]" style={{ height: strip }}>
                  {agapeByBook.map(([name, count, standing]) => (
                    <span
                      key={name}
                      className="relative flex-1 rounded-[1.5px]"
                      style={{
                        height: count > 0 ? Math.max(3.6, (strip * count) / most) : 1.5,
                        backgroundColor: count > 0 ? fill(standing) : 'color-mix(in srgb, var(--sys-label) 12%, transparent)',
                      }}
                    >
                      {name === '1 John' && (
                        <span className={`absolute bottom-full left-1/2 mb-[2px] -translate-x-1/2 whitespace-nowrap text-[8px] font-bold ${tint}`}>
                          1 John
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-[4px] flex gap-[2px]">
                {ntDivisions.map(([name, books], i) => (
                  <span key={i} className="flex flex-col items-center gap-[2px]" style={{ flex: books }}>
                    <span className="h-[1.5px] w-full rounded-full bg-[color-mix(in_srgb,var(--sys-label)_15%,transparent)]" />
                    <span className={`whitespace-nowrap text-[7.5px] font-medium ${label2}`}>{name}</span>
                  </span>
                ))}
              </div>
              <p className={`mt-[7px] text-[9px] ${label2}`}>0.85 per 1,000 tagged words · KJV</p>
            </div>

            <div className={`flex items-end gap-[10px] border-b ${sep} px-[10px] pt-[9px] text-[9.5px]`}>
              {/* ἀγάπη stands in the Septuagint, so it has that tab too. */}
              {['Definition', 'Overview', 'Spread', 'Companions', 'Compare', 'Septuagint'].map((section) => (
                <span
                  key={section}
                  className={`border-b-[2px] pb-[4px] ${
                    section === 'Spread'
                      ? 'border-[color:var(--sys-tint)] font-semibold'
                      : `border-transparent text-[color:var(--mac-secondary)]`
                  }`}
                >
                  {section}
                </span>
              ))}
              {/* Spread charts one figure, so its Add to Deck sits at the end of the tabs. */}
              <Glyph name="rectangleStackBadgePlus" className={`mb-[5px] ml-auto h-[11px] w-[11px] shrink-0 ${label2}`} />
            </div>
            <div className="px-[10px] py-[9px]">
              <div className="flex items-center gap-[7px]">
                <MacCapsule menu>Books</MacCapsule>
                <MacCapsule menu>Occurrences</MacCapsule>
              </div>
              <div className="mt-[10px] space-y-[5px]">
                {agapeByBook.map(([name, count, standing]) => (
                  <div key={name} className="flex items-center gap-[6px] text-[9px]">
                    <span className="w-[62px] shrink-0 truncate text-right">{name}</span>
                    <span className="relative h-[11px] flex-1 rounded-[3px] bg-[var(--mac-bar-track)]">
                      {count > 0 && (
                        <span
                          className="absolute inset-y-0 left-0 rounded-[3px]"
                          style={{ width: `${Math.max(4, (100 * count) / most)}%`, backgroundColor: fill(standing) }}
                        />
                      )}
                    </span>
                    <span className="w-[16px] shrink-0 text-right font-medium tabular-nums">{count}</span>
                    <span className={`w-[22px] shrink-0 text-right tabular-nums ${label2}`}>
                      {count > 0 ? percent(count / total) : ''}
                    </span>
                    <span className={`w-[9px] shrink-0 text-center font-bold ${standing === 'more' ? tint : label2}`}>
                      {standing === 'more' ? '↑' : standing === 'fewer' ? '↓' : ''}
                    </span>
                  </div>
                ))}
              </div>
              {/* The key under the bars it reads, and what it means. */}
              <div className={`mt-[10px] flex gap-[10px] text-[8.5px] ${label2}`}>
                {(
                  [
                    ['More', 'more', '↑'],
                    ['As expected', undefined, ''],
                    ['Fewer', 'fewer', '↓'],
                  ] as const
                ).map(([name, standing, arrow]) => (
                  <span key={name} className="flex items-center gap-[4px]">
                    <span className="h-[6.5px] w-[10px] rounded-[2px]" style={{ backgroundColor: fill(standing) }} />
                    {name}
                    {arrow && <span className={`font-bold ${standing === 'more' ? tint : ''}`}>{arrow}</span>}
                  </span>
                ))}
              </div>
              <p className={`mt-[3px] text-[8px] ${label2}`}>
                “More” and “fewer” mean beyond chance, not simply above or below average.
              </p>
            </div>
          </div>

          <div className={`hidden flex-col border-l ${sep} @xl:flex`}>
            <div className={`flex items-center gap-[5px] border-b ${sep} px-[9px] py-[5px] text-[9px] ${label2}`}>
              <span className="whitespace-nowrap">18 of 117 occurrences</span>
              <span className="inline-flex items-center gap-[3px] whitespace-nowrap rounded-full bg-[color-mix(in_srgb,var(--sys-tint)_22%,transparent)] px-[6px] py-[1.5px] font-medium text-[color:var(--sys-label)]">
                in 1 John
                <Sym name="xmarkCircleFill" className="h-[8px] w-[8px]" />
              </span>
              <span className="ml-auto text-[8px]">KJV</span>
            </div>
            <div className={`divide-y divide-[color:var(--sys-sep)] px-[9px]`}>
              {occurrences.map((o) => (
                <div key={o.ref} className="py-[5px]">
                  <p className="flex items-baseline justify-between text-[10px] font-bold">
                    {o.ref}
                    <span className={`text-[8.5px] font-normal ${label2}`}>ἀγάπη</span>
                  </p>
                  {/* Scripture in the reader's serif and the text's own colour, under its reference. */}
                  <p className={`${serif} mt-[2px] line-clamp-3 text-[10px] leading-[1.4]`}>
                    {o.before}
                    <span className="rounded-[2px] bg-[var(--mac-match)] font-semibold text-[color:var(--mac-on-match)]">{o.word}</span>
                    {o.after}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MacWindow>
    </Art>
  )
}

/** Settings → AI & Agents on the Mac, at Use Lamp in Other Apps. */
export function ExternalAppsArt() {
  const sidebar: Array<{ section: string; items: Array<{ icon: ReactNode; label: string; on?: boolean }> }> = [
    {
      section: 'Reading',
      items: [
        { icon: <Sym name="book" className="h-full w-full" />, label: 'Reader' },
        { icon: <Glyph name="booksVertical" className="h-full w-full" />, label: 'Books' },
        { icon: <Sym name="sidebarLeft" className="h-full w-full -scale-x-100" />, label: 'Study Sidebar' },
        { icon: <Sym name="calendar" className="h-full w-full" />, label: 'Reading Plans' },
      ],
    },
    {
      section: 'Content',
      items: [
        { icon: <Sym name="shippingbox" className="h-full w-full" />, label: 'Modules' },
        { icon: <Sym name="squareAndPencil" className="h-full w-full" />, label: 'Writing' },
        { icon: <Sym name="questionmarkBubble" className="h-full w-full" />, label: 'Quizzes' },
      ],
    },
    {
      section: 'Services',
      items: [
        { icon: <Sym name="sparkles" className="h-full w-full" />, label: 'AI & Agents', on: true },
        { icon: <Sym name="circlepath" className="h-full w-full" />, label: 'Sync' },
        { icon: <Sym name="arrowDownCircle" className="h-full w-full" />, label: 'Updates' },
      ],
    },
  ]
  const pasteable = [
    { name: 'opencode', path: '~/.config/opencode/opencode.json' },
    { name: 'Codex', path: '~/.codex/config.toml' },
    { name: 'Cursor', path: '~/.cursor/mcp.json' },
  ]
  const note = `text-[8.5px] leading-[1.4] ${label2}`
  const switches = [
    {
      name: 'Allow other apps to read my library',
      note: 'Separate from writing: these apps can read, and nothing more. What they read goes to whichever AI provider that app uses, not to Lamp’s.',
    },
    {
      name: 'Allow other apps to change my writings',
      note: 'An agent in another app can rewrite a writing’s draft, which Lamp takes in when you next open that writing’s agent workspace. It cannot write over an edit of yours it had not seen. Your draft is sent to that app’s AI provider.',
    },
    {
      name: 'Allow other apps to add reading plans',
      note: 'An agent in another app can ask for a reading plan over the passages you name, which Lamp lays out and adds when it next reads its library. It adds plans and nothing else: it cannot change or remove anything already in your library.',
    },
  ]
  return (
    <Art
      className="@container"
      label="Mac AI settings with external-app permissions for library access, draft edits and reading plans, plus setup controls for Claude Desktop, OpenCode, Codex and Cursor."
    >
      <div className="app-ui @container overflow-hidden rounded-[12px] border border-[color:var(--mac-card-edge)] bg-[var(--mac-window)] art-shadow">
        <div className="grid grid-cols-[minmax(0,1fr)] @lg:grid-cols-[112px_minmax(0,1fr)]">
          <div className="hidden bg-[var(--mac-sidebar)] px-[6px] pb-[10px] pt-[9px] @lg:block">
            <TrafficLights />
            <div className="mt-[12px] space-y-[8px]">
              {sidebar.map((group) => (
                <div key={group.section}>
                  <p className={`px-[6px] pb-[2px] text-[8px] font-semibold ${label2}`}>{group.section}</p>
                  {group.items.map((item) => (
                    <p
                      key={item.label}
                      className={`flex items-center gap-[5px] rounded-[6px] px-[6px] py-[3px] text-[9.5px] ${
                        item.on ? 'bg-[var(--sys-tint)] font-medium text-white' : ''
                      }`}
                    >
                      <span className={`h-[10px] w-[10px] shrink-0 ${item.on ? '' : tint}`}>{item.icon}</span>
                      {item.label}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className={`flex items-center gap-[8px] border-b ${sep} px-[10px] py-[7px]`}>
              <span className="@lg:hidden">
                <TrafficLights />
              </span>
              <p className={`text-[11px] font-semibold ${label2}`}>AI & Agents</p>
            </div>
            <div className="px-[12px] py-[10px] text-[9.5px]">
              <p className="mb-[4px] px-[2px] text-[10px] font-semibold">Use Lamp in Other Apps</p>
              <div className="divide-y divide-[color:var(--sys-sep)] rounded-[9px] bg-[var(--mac-card)] [&>*]:px-[9px] [&>*]:py-[5px]">
                {switches.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between gap-2">
                      {s.name}
                      <MacSwitch on />
                    </div>
                    <p className={`mt-[2px] ${note}`}>{s.note}</p>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-2">
                  Claude Desktop
                  <MacButton>
                    <Sym name="squareAndArrowDown" className="h-[9px] w-[9px]" />
                    Add to Claude Desktop…
                  </MacButton>
                </div>
                {pasteable.map((app) => (
                  <div key={app.name} className="flex items-center justify-between gap-2">
                    <span className="min-w-0 leading-tight">
                      {app.name}
                      <span className={`block truncate text-[8px] ${label2}`}>{app.path}</span>
                    </span>
                    <MacButton>
                      <Sym name="docOnDoc" className="h-[9px] w-[9px]" />
                      Copy
                    </MacButton>
                  </div>
                ))}
                <p className={note}>Paste each one into that app’s own configuration file yourself.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Art>
  )
}
