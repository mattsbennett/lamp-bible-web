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
    <Art label="Lamp Bible on iPhone at John 1 in the KJV, set in a serif with the book’s name over “Chapter 1”. The Strong’s entry for “Word” — G3056, λόγος — is open in a sheet over the text, with a button to say it aloud, and buttons to search its 314 verses and to analyse it.">
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
              <span className={`text-[10.5px] italic ${caption}`}>lógos</span>
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
                <p className="text-[11.5px] leading-[1.5]">
                  something said (including the thought); by implication, a topic (subject of
                  discourse), also reasoning (the mental faculty) or motive; by extension, a
                  computation; specially, (with the article in John) the Divine Expression (i.e.
                  Christ)
                </p>
                <p className={`mt-[9px] ${overline}`}>Derivation</p>
                <p className="mt-[3px] text-[10.5px]">
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

/** The Treasury of Scripture Knowledge's notes on Romans 8:28, as the bundled module has them. */
const tskRomans828: Array<[keyword: string, references: string]> = [
  ['we know', 'Rom 8:35-39; Rom 5:3; Rom 5:4; Gen 50:20; Deut 8:2; Deut 8:3; Deut 8:16; Ps 46:1…'],
  ['them', 'Rom 5:5; Exod 20:6; Deut 6:5; Neh 1:5; Ps 69:36; Mark 12:30; 1Cor 2:9…'],
  ['the called', 'Rom 8:30; Rom 1:6; Rom 1:7; Rom 9:11; Rom 9:23; Rom 9:24…'],
]

export function StudyArt() {
  return (
    <Art label="Lamp Bible on iPhone at Romans 8, with the study panel under the text showing the Treasury of Scripture Knowledge’s cross-references for verse 28 as blue links.">
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
            <p className="text-[11px] font-semibold">v. 28</p>
            <div className="mt-[3px] space-y-[3px] text-[10.5px] leading-[1.5]">
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
  const readings = [
    { passage: '2 Chronicles 35', detail: 'History · 5 min', read: true },
    { passage: 'Hosea 3', detail: 'Prophets · 1 min', read: false },
    { passage: 'Acts 18-19', detail: 'Acts · 9 min', read: false },
  ]
  return (
    <Art label="The Today screen on iPhone: under Daily Reading, a crimson card for The Bible Companion — day 310 of 365, three readings, fifteen minutes, one read — with the opening words of Hosea 3:1 up next and a Continue Reading button, above the list of the day’s readings.">
      <Phone className="!bg-[var(--sys-grouped)]">
        <div className="flex items-center gap-[6px] px-[9px] pb-[6px] pt-[8px]">
          <Glass round>
            <Sym name="chevronLeft" className="h-[12px] w-[12px]" />
          </Glass>
          <Glass className="min-w-0 flex-1 gap-[5px]">
            <Sym name="calendar" className="h-[11px] w-[11px] shrink-0" />
            <span className="truncate text-[11px]">Friday, November 6</span>
          </Glass>
          <Glass round>
            <Sym name="chevronRight" className="h-[12px] w-[12px]" />
          </Glass>
          <Glass round>
            <Sym name="playRectangleOnRectangle" className="h-[13px] w-[13px]" />
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
          <div className="rounded-[14px] p-[14px] text-white shadow-[0_6px_14px_rgb(140_26_51/0.22)]" style={heroGround}>
            <div className="relative">
              <p className="text-[8.5px] font-bold tracking-[0.12em] text-white/90">DAY 310 OF 365</p>
              {/* Laid over the line, as the app does, so the card is no taller for it. */}
              <span className="absolute right-0 top-1/2 flex h-[21px] w-[21px] -translate-y-1/2 items-center justify-center rounded-full bg-white/20">
                <Sym name="chevronUp" className="h-[8px] w-[8px] text-white" />
              </span>
            </div>
            <p className="mt-[3px] text-[19px] font-bold leading-tight">The Bible Companion</p>
            <div className="mt-[5px] flex justify-between text-[10.5px] text-white/90">
              <span>3 readings · 15 min</span>
              <span className="font-semibold">1 of 3 read</span>
            </div>
            <div className="mt-[9px] flex gap-[4px]">
              <span className="h-[4px] flex-1 rounded-full bg-white" />
              <span className="h-[4px] flex-1 rounded-full bg-white/30" />
              <span className="h-[4px] flex-1 rounded-full bg-white/30" />
            </div>
            <p className="mt-[12px] text-[7.5px] font-bold tracking-[0.1em] text-white/80">UP NEXT · HOSEA 3:1</p>
            <p className={`${serif} mt-[3px] text-[13px] leading-[1.4]`}>
              Then said the Lord unto me, Go yet, love a woman beloved of her friend, yet an
              adulteress…
            </p>
            <span className="mt-[12px] flex items-center justify-center gap-[5px] rounded-full bg-white py-[9px] text-[12px] font-semibold text-[rgb(179_33_61)]">
              <Sym name="bookFill" className="h-[12px] w-[12px]" />
              Continue Reading
            </span>
          </div>
          <p className="px-[4px] pb-[6px] pt-[14px] text-[10.5px] font-semibold opacity-75">3 Readings</p>
          <div className="divide-y divide-[color:var(--sys-sep)] rounded-[11px] bg-[var(--sys-cell)]">
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
      </Phone>
    </Art>
  )
}

export function HighlightsArt() {
  const styles: Array<{ icon: SymbolName; name: string }> = [
    { icon: 'highlighter', name: 'Highlight' },
    { icon: 'underline', name: 'Underline' },
    { icon: 'underlineDashed', name: 'Dashed' },
    { icon: 'underlineDotted', name: 'Dotted' },
  ]
  const colours = [
    { hex: '#FFCC00', theme: 'Promises', on: true },
    { hex: '#34C759' },
    { hex: '#007AFF', theme: 'Calling' },
    { hex: '#FF2D55' },
  ]
  return (
    <Art label="Romans 8:28 on iPhone with a yellow highlight and a blue underline, and the reader’s menu open on Highlights: four styles, colours named Promises and Calling, the highlight set, and Hide Highlights.">
      <Phone>
        <ReaderHeader translation="KJV" chapter="Romans 8" />
        <Scripture className="px-[16px]">
          <V n={28} />
          And we know that <span style={highlightFill('#FFCC00')}>all things work together for good</span>{' '}
          to them that love God, to them who are the{' '}
          <span className="underline decoration-[#007AFF] decoration-[1.5px] underline-offset-[3px]">
            called according to his purpose
          </span>
          .
        </Scripture>
        <div className="absolute right-[8px] top-[64px] w-[204px] rounded-[16px] bg-[var(--lamp-menu)] p-[7px] shadow-[0_10px_30px_rgb(0_0_0/0.22)]">
          <p className={`px-[4px] pb-[4px] text-[9.5px] font-semibold ${caption}`}>Highlights</p>
          <div className="rounded-[11px] bg-[var(--lamp-menu-card)]">
            <div className="grid grid-cols-4 gap-[2px] px-[5px] pt-[5px]">
              {styles.map((s, i) => (
                <span
                  key={s.name}
                  className={`flex h-[34px] flex-col items-center justify-center gap-[2px] rounded-[7px] ${
                    i === 0
                      ? 'border border-[color-mix(in_srgb,var(--sys-label)_40%,transparent)] bg-[color-mix(in_srgb,var(--sys-label)_10%,transparent)]'
                      : caption
                  }`}
                >
                  <Sym name={s.icon} className="h-[12px] w-[12px]" />
                  <span className={`text-[7px] ${i === 0 ? 'font-semibold' : ''}`}>{s.name}</span>
                </span>
              ))}
            </div>
            <div className="flex items-start justify-center gap-[7px] px-[9px] pb-[8px] pt-[7px]">
              {colours.map((c) => (
                <span key={c.hex} className="flex w-[25px] flex-col items-center">
                  <span
                    className="h-[19px] w-[19px] rounded-full border-[2px]"
                    style={{
                      borderColor: c.hex,
                      backgroundColor: `color-mix(in srgb, ${c.hex} var(--lamp-swatch), var(--lamp-page))`,
                      boxShadow: c.on ? '0 0 0 2px var(--lamp-menu-card), 0 0 0 3.5px var(--sys-label)' : undefined,
                    }}
                  />
                  {c.theme && <span className={`mt-[3px] text-[6px] font-medium ${label2}`}>{c.theme}</span>}
                </span>
              ))}
              <span
                className="h-[19px] w-[19px] rounded-full"
                style={{ background: 'conic-gradient(#ff3b30, #ffcc00, #34c759, #007aff, #af52de, #ff3b30)' }}
              />
            </div>
            <div className={`flex items-center gap-[8px] border-t ${sep} mx-[9px] py-[7px] text-[10.5px]`}>
              <Sym name="folder" className="h-[12px] w-[12px]" />
              My Highlights
              <Sym name="chevronUpDown" className={`ml-auto h-[9px] w-[9px] ${label2}`} />
            </div>
            <div className={`ml-[29px] flex items-center gap-[8px] border-t ${sep} py-[7px] text-[10.5px]`}>
              <Sym name="highlighterSlash" className="-ml-[20px] h-[12px] w-[12px]" />
              Hide Highlights
            </div>
          </div>
          <div className="mt-[6px] rounded-[11px] bg-[var(--lamp-menu-card)]">
            <div className="grid grid-cols-2 gap-[5px] p-[5px]">
              {[
                { icon: 'eyeSlash' as const, name: 'Hide Toolbars' },
                { icon: 'panelBottom' as const, name: 'Show Tools' },
              ].map((tile) => (
                <span key={tile.name} className="flex h-[38px] flex-col items-center justify-center gap-[3px] rounded-[7px] bg-[var(--lamp-menu)] text-[8px] font-medium">
                  <Sym name={tile.icon} className="h-[12px] w-[12px]" />
                  {tile.name}
                </span>
              ))}
            </div>
            <div className={`mx-[9px] flex items-center gap-[8px] border-t ${sep} py-[7px] text-[10.5px]`}>
              <span className="w-[12px] text-[9px] font-semibold">
                A<span className="text-[11px]">A</span>
              </span>
              View Options
              <Sym name="chevronRight" className={`ml-auto h-[8px] w-[8px] ${label3}`} />
            </div>
          </div>
        </div>
      </Phone>
    </Art>
  )
}

export function NotesArt() {
  return (
    <Art label="The Notes panel on iPhone below Romans 8: a note on verses 28 to 30 in formatted text, with its footnote giving the Greek word for “called”.">
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
            <p className="mt-[4px] text-[12px] leading-[1.55]">
              <strong>Called</strong> is the word Paul uses of himself in 1:1.
              <sup className={`ml-[1px] text-[0.7em] ${label2}`}>[1]</sup> Those he called he also
              justified — <em>the chain never breaks</em>.
            </p>
            <div className={`mt-[6px] flex gap-[5px] text-[10.5px] ${label2}`}>
              <span className="w-[16px] shrink-0 text-right text-[9.5px]">[1]</span>
              <span>κλητός, G2822 — invited, appointed.</span>
            </div>
          </div>
        </ToolPanel>
      </Phone>
    </Art>
  )
}

export function SearchArt() {
  // G3056's first verses in John in the KJVs, with the words tagged with it marked.
  const results = [
    { ref: 'John 1:1', parts: ['In the beginning was ', 'the Word', ', and ', 'the Word', ' was with God, and ', 'the Word', ' was God.'] },
    { ref: 'John 1:14', parts: ['And ', 'the Word', ' was made flesh, and dwelt among us, (and we beheld his glory…'] },
    { ref: 'John 2:22', parts: ['…and they believed the scripture, and ', 'the word', ' which Jesus had said.'] },
    { ref: 'John 4:37', parts: ['And herein is that ', 'saying', ' true, One soweth, and another reapeth.'] },
    { ref: 'John 4:39', parts: ['And many of the Samaritans of that city believed on him for ', 'the saying', ' of the woman…'] },
  ]
  return (
    <Art label="Search on iPhone for Strong’s number G3056 in the KJV, narrowed to John: 36 results with an Analyse button, listing John 1:1, 1:14, 2:22, 4:37 and 4:39 with the words for it marked — “the Word”, “the word”, “saying”.">
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
 * G26, ἀγάπη, as the KJVs tags it — the figures core's analysis gives, so the
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

/** G26's occurrences per New Testament book in the KJVs, and which core marks beyond chance. */
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
  const hole = r * 0.6
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
    <Art label="The word analysis on iPhone for G26, ἀγάπη (agápē, love): 117 occurrences in 106 verses of the KJV, in 24 of 27 books, with a column for each book — 1 John and Ephesians in the accent colour as more than expected, Matthew, Mark, Luke and Acts in grey as fewer. Below, a way to the whole definition, and how it is translated, on a ring: love 86 times, charity 27, and four once each.">
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
            <span className={`${serif} text-[30px] font-semibold leading-none`}>ἀγάπη</span>
            <span className="rounded-full bg-[var(--lamp-tile)] px-[6px] py-[2px] text-[9.5px] font-semibold opacity-80">G26</span>
            <Glyph name="speakerWave2" className={`h-[12px] w-[12px] ${caption}`} />
            <Sym name="sliderHorizontal3" className={`ml-auto h-[13px] w-[13px] ${tint}`} />
          </p>
          <p className="mt-[3px] flex items-baseline gap-[6px]">
            <span className={`${serif} text-[13px] italic opacity-80`}>agápē</span>
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
        <p className={`px-[22px] pt-[5px] text-[8.5px] leading-[1.35] ${label2}`}>
          About 0.8 in every 1,000 tagged Greek words of the KJV.
        </p>
        <div className="mx-[11px] mt-[10px] flex items-center gap-[9px] rounded-[14px] bg-[var(--sys-cell)] px-[12px] py-[7px]">
          <Glyph name="characterBookClosed" className={`h-[14px] w-[14px] shrink-0 ${tint}`} />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-[12px]">Definition</p>
            <p className={`truncate text-[9.5px] ${label2}`}>The whole entry, in each dictionary that has the word</p>
          </div>
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
    <Art label="Lamp Bible’s Settings on iPhone: the app’s card saying it syncs with iCloud Drive, then Sync — iCloud Drive chosen as the sync method, connected, with sixteen modules synced and a Sync Now button.">
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
    <Art label="The writing editor on iPhone: a devotional called Abide in the Vine, its kind and date over the title, set in a serif with a scripture quotation of John 15:5, a footnote, a table and an audio recording, above the formatting bar.">
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
              Fruit is never the branch’s own work; it is what the vine does through it.
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

/** A bordered macOS button. */
function MacButton({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`flex h-[19px] shrink-0 items-center gap-[4px] rounded-[6px] border ${sep} bg-[var(--mac-control)] px-[7px] text-[9.5px] shadow-[0_1px_1px_rgb(0_0_0/0.05)] ${className}`}
    >
      {children}
    </span>
  )
}

/** A macOS pop-up button: the current choice and the up-down chevrons. */
function MacPopUp({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`flex h-[19px] shrink-0 items-center gap-[6px] rounded-[6px] bg-[var(--mac-popup)] px-[7px] text-[9.5px] ${className}`}>
      {children}
      <Sym name="chevronUpDown" className="ml-auto h-[7px] w-[7px]" />
    </span>
  )
}

/** A macOS switch, on in the accent colour. */
function MacSwitch({ on = false }: { on?: boolean }) {
  return (
    <span
      className={`flex h-[14px] w-[26px] shrink-0 items-center rounded-full p-[1.5px] ${
        on ? 'justify-end bg-[var(--sys-tint)]' : 'bg-[var(--sys-fill)]'
      }`}
    >
      <span className="h-[11px] w-[15px] rounded-full bg-white shadow-[0_1px_2px_rgb(0_0_0/0.25)]" />
    </span>
  )
}

/** The writing editor's toolbar: save and history, the Workspace menu, the title; then the panes. */
function editorToolbar({ details = false, agent = false }: { details?: boolean; agent?: boolean }) {
  return {
    leading: (
      <>
        <MacGlass className="hidden @md:flex">
          <ToolIcon name="save" dim />
          <ToolIcon name="clockArrow" />
        </MacGlass>
        <MacGlass className="hidden gap-[2px] @md:flex">
          <ToolIcon name="folder" />
          <Sym name="chevronDown" className="h-[7px] w-[7px]" />
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
          <ToolIcon name="slideDeck" />
        </MacGlass>
      </>
    ),
  }
}

/** The Visual editor's formatting bar, one quiet row: style, emphasis, lists, blocks, Insert, size. */
function FormatBar() {
  const rule = <span className="h-[12px] w-px shrink-0 bg-[var(--sys-sep)]" />
  const icon = 'h-[11px] w-[11px] shrink-0'
  const small = `h-[7px] w-[7px] shrink-0 ${label2}`
  return (
    <div className={`flex items-center justify-center gap-[8px] overflow-hidden whitespace-nowrap border-b ${sep} px-[10px] pb-[6px] pt-[2px] text-[9.5px]`}>
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
  const { leading, toolbar } = editorToolbar({ agent: true })
  return (
    <Art
      className="@container"
      label="The Mac writing editor with the agent workspace open beside it: the draft on the left, set in a serif; on the right the chat’s provider, model and effort, the workspace’s draft status, a context file, the three built-in skills, and a chat in which the agent describes its edit with a diff."
    >
      <MacWindow title="Abide in the Vine" leading={leading} toolbar={toolbar}>
        <div className="grid grid-cols-[minmax(0,1fr)] @xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col">
            <div className={`flex h-[22px] items-stretch border-b ${sep} text-[9.5px]`}>
              <span className="flex items-center gap-[4px] border-b-2 border-[color:var(--sys-tint)] px-[10px]">
                <Sym name="docText" className="h-[10px] w-[10px]" />
                Main Prose
              </span>
              <span className={`flex items-center gap-[4px] px-[10px] ${label2}`}>
                <Sym name="doc" className="h-[10px] w-[10px]" />
                outline.md
              </span>
            </div>
            <FormatBar />
            <div className="flex-1 px-[22px] py-[14px] text-[11.5px] leading-[1.6]">
              <p className={`${serif} text-[18px] font-bold leading-tight`}>Abide in the Vine</p>
              <p className={`${serif} mt-[7px]`}>
                Fruit is never the branch’s own work. It is what the vine does through a branch
                that stays.
                <sup className={`ml-[1px] font-sans text-[0.75em] font-semibold ${blue}`}>[1]</sup>
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

          <div className={`flex flex-col border-t ${sep} bg-[var(--mac-inspector)] @xl:border-l @xl:border-t-0`}>
            <div className={`space-y-[5px] border-b ${sep} px-[9px] py-[6px] text-[9.5px]`}>
              <div className="flex items-center gap-[6px]">
                <MacPopUp>Claude</MacPopUp>
                {['Default model', 'Default effort'].map((choice) => (
                  <span key={choice} className="flex items-center gap-[3px] font-medium">
                    {choice}
                    <Sym name="chevronDown" className={`h-[6px] w-[6px] ${label2}`} />
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
                  <MacButton className="ml-auto !h-[17px] !text-[8.5px]">
                    <Sym name="clockArrow" className="h-[9px] w-[9px]" />
                    Revisions (3)
                  </MacButton>
                </div>
              </div>
              <div>
                <p className="flex items-center gap-[4px] font-semibold">
                  <Sym name="paperclip" className="h-[11px] w-[11px]" />
                  Context
                </p>
                <p className="mt-[3px] flex items-center gap-[4px] text-[9.5px]">
                  <Sym name="doc" className={`h-[10px] w-[10px] ${label2}`} />
                  earlier-talk.md
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
            <div className={`flex flex-1 flex-col gap-[7px] border-t ${sep} bg-[var(--mac-control)] px-[10px] py-[7px] text-[10px] leading-[1.45]`}>
              <div className={`flex min-w-0 items-center gap-[6px] text-[8.5px] ${label2}`}>
                <span className="flex shrink-0 items-center gap-[3px] font-semibold">
                  <Sym name="sparkles" className="h-[8px] w-[8px]" />
                  Claude
                </span>
                {/* The folder it reads and edits, named after the writing's ID and cut in the middle. */}
                <span className="flex min-w-0 items-center gap-[3px]">
                  <Sym name="squareAndPencil" className="h-[8px] w-[8px] shrink-0" />
                  <span className="truncate">8C1F2B6E-3A4D…7d2e9a1b</span>
                </span>
                <span className="flex shrink-0 items-center gap-[3px] text-[color:var(--sys-green)]">
                  <Sym name="checkmarkCircleFill" className="h-[8px] w-[8px]" />
                  Connected
                </span>
              </div>
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
                    + Fruit is never the branch’s own work.
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
      label="The Mac writing editor replacing “abide” with “remain”, its matches marked in yellow, beside the Details pane: the piece’s title, date, category, tags, and its series and key scripture folded."
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
                <MacButton>Done</MacButton>
              </div>
              <div className="flex items-center gap-[4px] pl-[50px]">
                <span className={`flex h-[19px] min-w-0 flex-1 items-center rounded-[6px] border ${sep} bg-[var(--mac-control)] px-[6px]`}>
                  remain
                </span>
                <MacButton>Replace</MacButton>
                <MacButton>Replace All</MacButton>
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
      label="Slide Studio on the Mac: the deck’s slides down the side beside a Scripture slide in the Lamp Dark theme quoting John 15:5 with an amber citation, with the presenter notes following the writing below it."
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
            <MacGlass className="hidden @lg:flex">
              <ToolIcon name="qrcode" />
            </MacGlass>
            <span className="flex h-[22px] items-center gap-[4px] rounded-full bg-[var(--sys-tint)] px-[10px] text-[9.5px] font-semibold text-white">
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
                <span className="underline decoration-[color:var(--sys-tint)]">I am the vine</span>, he says, and we
                are the branches — not the gardener, and not the fruit.
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
 * The Reader and Search tab bar (LibraryTabBar), with one tab open: a track a
 * shade down from the window under the toolbar, the open tab a raised page,
 * and + at the end. A lone tab has no close button.
 */
function MacTabBar({ title }: { title: string }) {
  return (
    <div className={`flex h-[23px] border-b ${sep} bg-[var(--mac-tab-track)] pl-[2px]`}>
      <span className="mx-[1px] my-[2px] flex min-w-0 flex-1 items-center justify-center rounded-[5px] border-[0.5px] border-[color:var(--mac-tab-edge)] bg-[var(--mac-tab-open)] px-[16px] text-[8px] shadow-[0_0.5px_1px_var(--mac-tab-shadow)]">
        <span className="truncate">{title}</span>
      </span>
      <span className="flex w-[22px] shrink-0 items-center justify-center">
        <Sym name="plus" className={`h-[9px] w-[9px] ${label2}`} />
      </span>
    </div>
  )
}

/**
 * Mac search on a Strong's key, in its tab: the occurrences narrowed to 1 John
 * beside the analysis's card, on its Spread.
 */
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
      label="Search on the Mac for Strong’s G26 in the KJV, in a tab named G26. The analysis’s card gives ἀγάπη, agápē, love: 117 occurrences in 106 verses, in 24 of 27 books, over a column for each New Testament book, with 1 John named in the accent colour as the book it stands out in. Under the card the Spread tab is open, listing the books with a bar each and a key to the shades. The occurrence list beside it is narrowed to the 18 in 1 John."
    >
      <MacWindow
        title="Search"
        toolbar={
          <>
            <MacGlass className="hidden !px-[8px] @lg:flex">
              Scripture
              <Sym name="chevronUpDown" className="h-[7px] w-[7px]" />
            </MacGlass>
            <MacGlass className="hidden !px-[8px] @2xl:flex">
              All Modules
              <Sym name="chevronUpDown" className="h-[7px] w-[7px]" />
            </MacGlass>
            <MacGlass className={`hidden w-[128px] @xl:flex ${label3}`}>
              <Sym name="magnifyingglass" className="h-[9px] w-[9px] shrink-0" />
              <span className="truncate">Search Library</span>
            </MacGlass>
          </>
        }
      >
        <MacTabBar title="G26" />
        <div className={`flex gap-[6px] border-b ${sep} px-[10px] py-[6px]`}>
          <span className="hidden h-[19px] items-center gap-[4px] rounded-full bg-[var(--sys-fill)] px-[8px] text-[9px] @md:flex">
            <Sym name="book" className="h-[9px] w-[9px]" />
            All Books
            <Sym name="chevronDown" className="h-[6px] w-[6px]" />
          </span>
          <span className="flex h-[19px] w-[150px] items-center gap-[5px] rounded-full bg-[var(--sys-fill)] px-[8px] text-[9.5px]">
            <Sym name="number" className={`h-[9px] w-[9px] ${label2}`} />
            G26
            <Sym name="xmarkCircleFill" className={`ml-auto h-[10px] w-[10px] ${label2}`} />
          </span>
        </div>
        <div className="grid h-[400px] grid-cols-[minmax(0,1fr)] overflow-hidden @xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className={`hidden flex-col border-r ${sep} @xl:flex`}>
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
                  <p className="flex items-baseline justify-between text-[10px] font-semibold">
                    {o.ref}
                    <span className={`text-[8.5px] font-normal ${label2}`}>ἀγάπη</span>
                  </p>
                  <p className={`mt-[1px] line-clamp-2 text-[9px] leading-[1.4] ${label2}`}>
                    {o.before}
                    <span className="rounded-[2px] bg-[var(--mac-match)] font-semibold text-[color:var(--mac-on-match)]">{o.word}</span>
                    {o.after}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <div
              className="mx-[10px] mt-[9px] rounded-[9px] p-[11px]"
              style={{
                background:
                  'radial-gradient(90% 80% at 100% 0%, color-mix(in srgb, var(--sys-tint) 15%, transparent), transparent), var(--mac-card)',
              }}
            >
              <p className="flex items-center gap-[7px]">
                <span className={`${serif} text-[22px] font-semibold leading-none`}>ἀγάπη</span>
                <span className="rounded-full bg-[var(--sys-fill)] px-[6px] py-[1px] text-[9px] font-semibold tabular-nums opacity-80">G26</span>
                <Glyph name="speakerWave2" className={`h-[11px] w-[11px] ${label2}`} />
                <span className={`ml-auto flex items-center gap-[9px] ${label2}`}>
                  <Sym name="sliderHorizontal3" className="h-[11px] w-[11px]" />
                  <Glyph name="rectangleStackBadgePlus" className="h-[11px] w-[11px]" />
                </span>
              </p>
              <p className="mt-[3px] flex items-baseline gap-[6px] text-[10.5px]">
                <span className={`${serif} italic ${label2}`}>agápē</span>
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

            <div className={`flex gap-[10px] border-b ${sep} px-[10px] pt-[9px] text-[9.5px]`}>
              {['Definition', 'Overview', 'Spread', 'Companions', 'Compare'].map((section) => (
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
            </div>
            <div className="px-[10px] py-[9px]">
              <div className="flex items-center gap-[7px]">
                <MacPopUp>Books</MacPopUp>
                <MacPopUp>Occurrences</MacPopUp>
                <Glyph name="rectangleStackBadgePlus" className={`ml-auto h-[11px] w-[11px] ${label2}`} />
              </div>
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
              <div className="mt-[9px] space-y-[5px]">
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
            </div>
          </div>
        </div>
      </MacWindow>
    </Art>
  )
}

/** Settings → AI & Agents on the Mac, at Use Lamp in Other Apps. */
export function ExternalAppsArt() {
  const sidebar: Array<{ section: string; items: Array<{ icon: SymbolName; label: string; on?: boolean }> }> = [
    {
      section: 'Content',
      items: [
        { icon: 'shippingbox', label: 'Modules' },
        { icon: 'squareAndPencil', label: 'Writing' },
      ],
    },
    {
      section: 'Services',
      items: [
        { icon: 'sparkles', label: 'AI & Agents', on: true },
        { icon: 'circlepath', label: 'Sync' },
        { icon: 'arrowDownCircle', label: 'Updates' },
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
      note: 'An agent in another app can rewrite a writing’s draft, which Lamp takes in when you next open that writing’s agent workspace. It cannot write over an edit of yours it had not seen.',
    },
    {
      name: 'Allow other apps to add reading plans',
      note: 'An agent in another app can ask for a reading plan over the passages you name, which Lamp lays out and adds when it next reads its library.',
    },
  ]
  return (
    <Art
      className="@container"
      label="Lamp Bible’s Settings on the Mac, at AI & Agents: under Use Lamp in Other Apps, switches allowing other apps to read the library, to change writings and to add reading plans are on, with an Add to Claude Desktop button and Copy buttons for opencode, Codex and Cursor."
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
                      <Sym name={item.icon} className={`h-[10px] w-[10px] shrink-0 ${item.on ? '' : tint}`} />
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
