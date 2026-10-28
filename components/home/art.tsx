/**
 * Illustrated screens for the homepage, drawn to match the apps rather than
 * captured from them: Apple's system font and colours, the apps' accent, their
 * SF Symbols (as stand-ins from ./sf), and the layouts and labels in the
 * iOS and Mac source. Drawn, they stay sharp, follow light and dark mode, need
 * no re-shooting when a release moves a pixel, and never show anyone's
 * library. Each is one image to assistive technology, described by its label.
 *
 * iPhone screens are drawn at about 0.72 of their point size, so a 17pt body
 * is 12px here.
 */
import type { CSSProperties, ReactNode } from 'react'
import { Sym, type SymbolName } from './sf'

const label2 = 'text-[color:var(--sys-label2)]'
const label3 = 'text-[color:var(--sys-label3)]'
const tint = 'text-[color:var(--sys-tint)]'
const blue = 'text-[color:var(--sys-blue)]'
const sep = 'border-[color:var(--sys-sep)]'

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
 * system background; children lay out from the top.
 */
function Phone({
  height = 'h-[290px]',
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
      className={`app-ui relative mx-auto w-full max-w-[18.5rem] overflow-hidden border-[7px] border-[color:var(--bezel)] bg-[var(--sys-bg)] ${height} ${
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
          <span className={`mt-[2px] text-[8px] ${label2}`}>{chapter}</span>
        </Glass>
      </div>
      <Glass round>
        <Sym name="ellipsis" className="h-[13px] w-[13px]" />
      </Glass>
    </div>
  )
}

/** A verse number: superscript, three-quarters size, secondary label colour. */
function V({ n }: { n: number }) {
  return <sup className={`mr-[0.25em] text-[0.75em] ${label2}`}>{n}</sup>
}

/** The split between the reader and the tool panel: a hairline and a grab pill. */
function PanelDivider() {
  return (
    <div className="relative my-[6px] h-[8px]">
      <span className="absolute inset-x-0 top-1/2 h-px bg-[var(--sys-sep)]" />
      <span className="absolute left-1/2 top-1/2 h-[3.5px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--sys-gray3)]" />
    </div>
  )
}

const highlightFill = (hex: string): CSSProperties => ({
  backgroundColor: `${hex}66`,
  borderRadius: 3,
  boxDecorationBreak: 'clone',
  WebkitBoxDecorationBreak: 'clone',
})

export function ReaderArt() {
  return (
    <Art label="Lamp Bible on iPhone at John 1 in the KJV, with the Strong’s entry for “Word” — G3056, λόγος — open in a sheet over the text.">
      <Phone height="h-[360px] lg:h-[530px]">
        <ReaderHeader translation="KJVs" chapter="John 1" />
        <div className="px-[11px]">
          <p className="mt-[4px] text-center text-[14.5px] font-bold">John 1</p>
          <p className="mt-[8px] text-[13px] leading-[1.8]">
            <V n={1} />
            In the beginning was the Word, and the Word was with God, and the Word was God.{' '}
            <V n={2} />
            The same was in the beginning with God. <V n={3} />
            All things were made by him; and without him was not any thing made that was made.
          </p>
        </div>
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-x-0 bottom-0 top-[158px] rounded-t-[14px] bg-[var(--sys-sheet)] shadow-[0_-6px_24px_rgb(0_0_0/0.18)]">
          <div className="flex items-center px-[10px] pt-[9px]">
            <Glass round className="!h-[26px] !w-[26px]">
              <Sym name="xmark" className="h-[10px] w-[10px]" />
            </Glass>
            <span className="flex-1 pr-[26px] text-center text-[12px] font-semibold">Word</span>
          </div>
          <div className="px-[14px] pt-[10px]">
            <div className="flex flex-wrap items-center gap-x-[7px] gap-y-1">
              <span className="text-[17px] leading-none">λόγος</span>
              <span className={`rounded-full bg-[var(--sys-fill)] px-[7px] py-[2px] text-[9.5px] ${label2}`}>
                G3056
              </span>
              <span className={`flex items-center gap-[3px] text-[10px] ${tint}`}>
                <Sym name="magnifyingglass" className="h-[10px] w-[10px]" />
                330x
              </span>
            </div>
            <p className={`mt-[5px] text-[8px] ${label3}`}>Strong’s Greek</p>
            <p className={`mt-[3px] text-[10.5px] italic ${label2}`}>logos · noun</p>
            <p className="mt-[7px] text-[11px] leading-[1.55]">
              something said (including the thought); by implication a topic (subject of
              discourse), also reasoning (the mental faculty) or motive; … specially, (with the
              article in John) the Divine Expression (i.e. Christ).
            </p>
            <p className={`mt-[8px] text-[9px] ${label2}`}>KJV Usage</p>
            <p className="text-[9.5px] leading-[1.45]">
              account, cause, communication, doctrine, matter, preaching, reason, saying, speech,
              talk, thing, utterance, word, work…
            </p>
            <p className={`mt-[8px] text-[9px] ${label2}`}>Morphology</p>
            <p className="font-mono text-[9px]">N-NSM</p>
            <div className="mt-[10px] flex justify-center gap-[4px]">
              <span className="h-[5px] w-[13px] rounded-full bg-[var(--sys-label)]" />
              <span className="h-[5px] w-[5px] rounded-full bg-[var(--sys-label2)]" />
            </div>
          </div>
        </div>
      </Phone>
    </Art>
  )
}

export function StudyArt() {
  return (
    <Art label="Lamp Bible on iPhone at Romans 8, with the tool panel below the text showing the Treasury of Scripture Knowledge’s cross-references for verse 28 as blue links.">
      <Phone>
        <ReaderHeader translation="KJVs" chapter="Romans 8" />
        <p className="px-[11px] text-[12.5px] leading-[1.75]">
          <V n={28} />
          And we know that all things work together for good to them that love God, to them who
          are the called according to his purpose.
        </p>
        <PanelDivider />
        <div className="flex items-center gap-2 px-[9px]">
          <Glass className="min-w-0 !justify-start gap-[5px]">
            <span className="truncate text-[10.5px] font-medium">
              Treasury of Scripture Knowledge (Enhanced)
            </span>
            <Sym name="chevronUpDown" className={`h-[9px] w-[9px] shrink-0 ${label2}`} />
          </Glass>
          <Glass round className="ml-auto">
            <Sym name="ellipsis" className="h-[13px] w-[13px]" />
          </Glass>
        </div>
        <div className="px-[13px] pt-[9px]">
          <p className={`text-[9.5px] font-semibold ${label2}`}>v. 28</p>
          <p className="mt-[3px] text-[11.5px] leading-[1.6]">
            we know. <span className={blue}>Rom 8:22; 2 Cor 5:1.</span> all things.{' '}
            <span className={blue}>Gen 50:20; Deut 8:16; Ps 119:71; 2 Cor 4:17.</span> the called.{' '}
            <span className={blue}>Rom 1:6; 9:24; 2 Tim 1:9.</span>
          </p>
        </div>
      </Phone>
    </Art>
  )
}

export function PlansArt() {
  const readings = [
    { passage: 'Ezekiel 33', detail: 'Prophecy · 6 min', read: true },
    { passage: 'Psalm 119:1–40', detail: 'Poetry · 7 min', read: false },
    { passage: '1 Peter 3', detail: 'Epistle · 4 min', read: false },
  ]
  return (
    <Art label="The Today screen on iPhone: The Bible Companion’s three readings for the day, one ticked, about seventeen minutes in all, under a Continue Reading button.">
      <Phone>
        <div className="flex items-center gap-2 px-[9px] pb-[6px] pt-[8px]">
          <Glass round>
            <Sym name="chevronLeft" className="h-[12px] w-[12px]" />
          </Glass>
          <div className="flex flex-1 justify-center">
            <Glass className="gap-[5px]">
              <Sym name="calendar" className={`h-[12px] w-[12px] ${tint}`} />
              <span className="text-[11.5px]">Wed, Oct 28</span>
            </Glass>
          </div>
          <Glass round>
            <Sym name="chevronRight" className="h-[12px] w-[12px]" />
          </Glass>
        </div>
        <div className="px-[14px]">
          <div className={`flex items-center justify-between border-b ${sep} pb-[5px] pt-[4px]`}>
            <span className={`text-[11px] font-semibold ${label2}`}>Plans</span>
            <span className={`flex items-center gap-[3px] text-[11px] ${tint}`}>
              <Sym name="plusCircleFill" className="h-[11px] w-[11px]" />
              Add
            </span>
          </div>
          <p className="mt-[9px] text-[16px] font-black leading-tight">The Bible Companion</p>
          <div className={`mt-[3px] flex justify-between text-[10.5px] ${label2}`}>
            <span>3 readings · 17 min</span>
            <span>1 of 3 read</span>
          </div>
          <span className="mt-[8px] flex items-center justify-center gap-[5px] rounded-full bg-[var(--sys-tint)] py-[8px] text-[12px] font-semibold text-white">
            <Sym name="bookFill" className="h-[12px] w-[12px]" />
            Continue Reading
          </span>
          <div className="mt-[9px] space-y-[6px]">
            {readings.map((r) => (
              <div
                key={r.passage}
                className="flex items-center gap-[9px] rounded-[11px] border-[1.2px] border-[rgb(142_142_147/0.3)] px-[10px] py-[6px]"
              >
                <Sym
                  name={r.read ? 'checkmarkCircleFill' : 'circle'}
                  className={`h-[19px] w-[19px] shrink-0 ${tint}`}
                />
                <div className="min-w-0 flex-1 leading-tight">
                  <p className={`text-[12px] font-semibold ${r.read ? label2 : ''}`}>{r.passage}</p>
                  <p className={`text-[9px] ${label2}`}>{r.detail}</p>
                </div>
                <Sym name="chevronRight" className={`h-[9px] w-[9px] ${label3}`} />
              </div>
            ))}
          </div>
        </div>
      </Phone>
    </Art>
  )
}

export function HighlightsArt() {
  const styles: SymbolName[] = ['highlighter', 'underline', 'underlineDashed', 'underlineDotted']
  const colours = [
    { hex: '#FFCC00', theme: 'Promises', on: true },
    { hex: '#34C759' },
    { hex: '#007AFF', theme: 'Calling' },
    { hex: '#FF2D55' },
  ]
  return (
    <Art label="Romans 8:28 on iPhone with a yellow highlight and a blue underline, and the reader’s menu open on the highlight picker: four styles, and colours named Promises and Calling.">
      <Phone>
        <ReaderHeader translation="KJVs" chapter="Romans 8" />
        <p className="px-[11px] text-[13px] leading-[1.8]">
          <V n={28} />
          And we know that <span style={highlightFill('#FFCC00')}>all things work together for good</span>{' '}
          to them that love God, to them who are the{' '}
          <span className="underline decoration-[#007AFF] decoration-[1.5px] underline-offset-[3px]">
            called according to his purpose
          </span>
          .
        </p>
        <div className="absolute right-[8px] top-[150px] w-[196px] rounded-[14px] bg-[var(--sys-bg2)] p-[7px] shadow-[0_10px_30px_rgb(0_0_0/0.22)]">
          <div className="rounded-[11px] bg-[var(--sys-cell-elev)] p-[7px]">
            <div className="grid grid-cols-4 gap-[3px]">
              {styles.map((s, i) => (
                <span
                  key={s}
                  className={`flex h-[24px] items-center justify-center rounded-[5px] ${
                    i === 0 ? 'bg-[var(--sys-fill)]' : ''
                  }`}
                >
                  <Sym name={s} className="h-[13px] w-[13px]" />
                </span>
              ))}
            </div>
            <div className="mt-[7px] flex items-start gap-[7px]">
              {colours.map((c) => (
                <span key={c.hex} className="flex w-[26px] flex-col items-center">
                  <span
                    className="h-[20px] w-[20px] rounded-full"
                    style={{
                      backgroundColor: c.hex,
                      boxShadow: c.on ? '0 0 0 2px var(--sys-cell-elev), 0 0 0 4px var(--sys-label)' : undefined,
                    }}
                  />
                  {c.theme && <span className={`mt-[3px] text-[6.5px] font-medium ${label2}`}>{c.theme}</span>}
                </span>
              ))}
              <span className={`flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[var(--sys-fill)] ${label2}`}>
                <Sym name="plus" className="h-[10px] w-[10px]" />
              </span>
            </div>
          </div>
          <div className="mt-[6px] flex items-center gap-[6px] rounded-[11px] bg-[var(--sys-cell-elev)] px-[9px] py-[7px] text-[10.5px]">
            <Sym name="folder" className={`h-[11px] w-[11px] ${tint}`} />
            My Highlights
            <Sym name="chevronUpDown" className={`ml-auto h-[9px] w-[9px] ${label2}`} />
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
        <ReaderHeader translation="KJVs" chapter="Romans 8" />
        <p className="px-[11px] text-[12.5px] leading-[1.75]">
          <V n={28} />
          And we know that all things work together for good to them that love God…
        </p>
        <PanelDivider />
        <div className="flex items-center gap-[6px] px-[9px]">
          <Glass className="gap-[5px]">
            <span className="text-[10.5px] font-medium">My Notes</span>
            <Sym name="chevronUpDown" className={`h-[9px] w-[9px] ${label2}`} />
          </Glass>
          <Sym name="checkmarkIcloudFill" className="ml-auto h-[15px] w-[15px] text-[color:var(--sys-green)]" />
          <Glass round>
            <Sym name="plus" className="h-[12px] w-[12px]" />
          </Glass>
          <Glass round>
            <Sym name="ellipsis" className="h-[13px] w-[13px]" />
          </Glass>
        </div>
        <div className="px-[13px] pt-[10px]">
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-medium ${blue}`}>vv.28-30</span>
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
      </Phone>
    </Art>
  )
}

export function SearchArt() {
  const results = [
    {
      ref: 'John 1:1',
      parts: ['In the beginning was the ', 'Word', ', and the ', 'Word', ' was with God, and the ', 'Word', ' was God.'],
    },
    { ref: 'John 1:14', parts: ['And the ', 'Word', ' was made flesh, and dwelt among us, (and we beheld his glory…'] },
    { ref: 'Hebrews 4:12', parts: ['For the ', 'word', ' of God is quick, and powerful, and sharper than any twoedged sword…'] },
    { ref: '1 John 1:1', parts: ['That which was from the beginning, … which our hands have handled, of the ', 'Word', ' of life;'] },
    { ref: 'Revelation 19:13', parts: ['And he was clothed with a vesture dipped in blood: and his name is called The ', 'Word', ' of God.'] },
  ]
  return (
    <Art label="Search on iPhone for Strong’s number G3056 in the KJV, listing John 1:1, John 1:14 and Hebrews 4:12 with each match highlighted.">
      <Phone height="h-[330px] lg:h-[500px]">
        <div className="flex items-center gap-2 px-[9px] pb-[6px] pt-[8px]">
          <Glass round>
            <Sym name="arrowBackward" className="h-[13px] w-[13px]" />
          </Glass>
          <span className="flex flex-1 items-center justify-center gap-[4px] text-[12px] font-semibold">
            <Sym name="bookClosed" className="h-[12px] w-[12px]" />
            KJVs
            <Sym name="chevronDown" className={`h-[8px] w-[8px] ${label2}`} />
          </span>
          <Glass round>
            <Sym name="ellipsis" className="h-[13px] w-[13px]" />
          </Glass>
        </div>
        <div className="mx-[11px] flex items-center gap-[6px] rounded-[9px] bg-[var(--sys-bg2)] px-[9px] py-[6px]">
          <Sym name="number" className={`h-[12px] w-[12px] ${tint}`} />
          <span className="text-[12px]">G3056</span>
          <Sym name="xmarkCircleFill" className={`ml-auto h-[13px] w-[13px] ${label3}`} />
        </div>
        <p className={`px-[13px] pb-[3px] pt-[10px] text-[9.5px] ${label2}`}>330 results</p>
        <div className={`divide-y divide-[color:var(--sys-sep)] ${sep} border-t ${sep} pl-[13px]`}>
          {results.map((r) => (
            <div key={r.ref} className="py-[7px] pr-[13px]">
              <p className="text-[12.5px] font-semibold">{r.ref}</p>
              <p className={`mt-[2px] line-clamp-2 text-[10.5px] leading-[1.45] ${label2}`}>
                {r.parts.map((part, i) =>
                  i % 2 === 1 ? (
                    <span key={i} className="rounded-[2px] bg-[rgb(255_204_0/0.4)] font-semibold text-[color:var(--sys-label)]">
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

export function SyncArt() {
  const rows: Array<{ label: ReactNode; value: ReactNode }> = [
    {
      label: 'Sync Method',
      value: (
        <span className={`flex items-center gap-[4px] ${label2}`}>
          iCloud Drive
          <Sym name="chevronUpDown" className="h-[9px] w-[9px]" />
        </span>
      ),
    },
    {
      label: 'Status',
      value: (
        <span className={`flex items-center gap-[4px] ${label2}`}>
          <Sym name="checkmarkIcloudFill" className="h-[13px] w-[13px] text-[color:var(--sys-green)]" />
          Connected
        </span>
      ),
    },
    {
      label: 'Modules',
      value: (
        <span className={`flex items-center gap-[4px] ${label2}`}>
          4 modules
          <Sym name="checkmarkCircleFill" className="h-[11px] w-[11px] text-[color:var(--sys-green)]" />
        </span>
      ),
    },
    {
      label: (
        <span className={`flex items-center gap-[5px] ${tint}`}>
          <Sym name="circlepath" className="h-[12px] w-[12px]" />
          Sync Now
        </span>
      ),
      value: null,
    },
  ]
  return (
    <Art label="Lamp Bible’s Sync settings on iPhone: iCloud Drive chosen as the sync method, connected, with four modules synced and a Sync Now button.">
      <Phone className="!bg-[var(--sys-grouped)]">
        <div className="flex items-center gap-2 px-[9px] pb-[6px] pt-[8px]">
          <Glass round>
            <Sym name="arrowBackward" className="h-[13px] w-[13px]" />
          </Glass>
          <span className="flex-1 pr-[30px] text-center text-[12px] font-semibold">Settings</span>
        </div>
        <p className={`px-[22px] pb-[4px] pt-[8px] text-[9px] uppercase ${label2}`}>Sync</p>
        <div className="mx-[11px] overflow-hidden rounded-[11px] bg-[var(--sys-cell)]">
          {rows.map((row, i) => (
            <div key={i} className={`flex items-center px-[12px] py-[8px] text-[12px] ${i > 0 ? `border-t ${sep}` : ''}`}>
              {row.label}
              <span className="ml-auto text-[11px]">{row.value}</span>
            </div>
          ))}
        </div>
        <p className={`px-[22px] pt-[5px] text-[9px] ${label2}`}>Modules sync via iCloud Drive.</p>
        <p className={`px-[22px] pb-[4px] pt-[14px] text-[9px] uppercase ${label2}`}>Reading Plan Settings</p>
        <div className="mx-[11px] rounded-[11px] bg-[var(--sys-cell)] px-[12px] py-[8px] text-[12px]">
          Reading Rate (WPM)
        </div>
      </Phone>
    </Art>
  )
}

/** The iPhone writing editor in Visual Edit, with its formatting bar. */
export function PhoneWritingArt() {
  const bar: Array<SymbolName | 'Aa' | 'B' | 'I' | '|'> = [
    'Aa', 'B', 'I', '|', 'listBullet', 'listNumber', '|', 'textQuote', '|', 'tablecells', '|', 'noteText', 'photoBadgePlus',
  ]
  return (
    <Art label="The writing editor on iPhone: a piece called Abide in the Vine with a scripture quotation of John 15:5, a footnote, a table and an audio recording, above the formatting bar.">
      <Phone height="h-[560px]" whole>
        <div className="flex items-center gap-2 px-[9px] pb-[6px] pt-[8px]">
          <Glass round>
            <Sym name="chevronLeft" className="h-[12px] w-[12px]" />
          </Glass>
          <span className="min-w-0 flex-1 truncate text-center text-[12px] font-semibold">
            Abide in the Vine
          </span>
          <Glass className="gap-[10px]">
            <Sym name="checkmarkIcloudFill" className="h-[14px] w-[14px] text-[color:var(--sys-green)]" />
            <Sym name="squareAndArrowUp" className="h-[13px] w-[13px]" />
          </Glass>
        </div>
        <div className="px-[14px] pt-[6px] text-[13px] leading-[1.6]">
          <p className="text-[22px] font-bold leading-tight">Abide in the Vine</p>
          <div className="mt-[9px] rounded-r-[6px] border-l-[3px] border-[color:var(--ed-rule)] bg-[var(--ed-wash)] px-[9px] py-[6px]">
            <p className="text-[12px] italic text-[color:var(--ed-muted)]">John 15:5</p>
            <p className="text-[12.5px] leading-[1.5]">
              I am the vine, ye are the branches: He that abideth in me, and I in him, the same
              bringeth forth much fruit.
            </p>
          </div>
          <p className="mt-[9px]">
            Fruit is never the branch’s own work; it is what the vine does through it.
            <sup className={`ml-[1px] text-[0.75em] font-semibold ${blue}`}>[1]</sup>
          </p>
          <div className="mt-[9px] grid grid-cols-2 overflow-hidden rounded-[2px] border border-[color:var(--ed-rule)] text-[11px]">
            <span className="border-b border-r border-[color:var(--ed-rule)] bg-[var(--ed-wash)] px-[8px] py-[4px] font-semibold">Abide</span>
            <span className="border-b border-[color:var(--ed-rule)] bg-[var(--ed-wash)] px-[8px] py-[4px] font-semibold">Bear fruit</span>
            <span className="border-r border-[color:var(--ed-rule)] px-[8px] py-[4px]">v. 4</span>
            <span className="px-[8px] py-[4px]">vv. 5, 8</span>
          </div>
          <div className="mt-[9px] flex items-center gap-[8px] rounded-[10px] border border-[color:var(--ed-rule)] bg-[var(--ed-wash)] px-[10px] py-[6px]">
            <span className="text-[17px] leading-none">🎵</span>
            <span className="text-[11px] text-[color:var(--ed-muted)]">Audio</span>
          </div>
          <div className="mt-[10px] border-t border-[color:var(--ed-rule)] pt-[5px] text-[11px] text-[color:var(--ed-muted)]">
            <span className={`font-semibold ${blue}`}>1.</span> Compare 1 John 2:6.
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-[44px] flex items-center gap-[4px] overflow-hidden bg-[var(--sys-bg2)] px-[6px] py-[6px] [mask-image:linear-gradient(to_right,black_85%,transparent)]">
          {bar.map((item, i) =>
            item === '|' ? (
              <span key={i} className="mx-[2px] h-[17px] w-px shrink-0 bg-[var(--sys-sep)]" />
            ) : (
              <span
                key={i}
                className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[5px] bg-[var(--sys-bg)] text-[11px]"
              >
                {item === 'Aa' ? (
                  <span className="font-medium">Aa</span>
                ) : item === 'B' ? (
                  <span className="font-bold">B</span>
                ) : item === 'I' ? (
                  <span className="italic">I</span>
                ) : (
                  <Sym name={item} className="h-[12px] w-[12px]" />
                )}
              </span>
            ),
          )}
        </div>
        <div className="absolute bottom-[8px] right-[10px]">
          <Glass round>
            <Sym name="eye" className="h-[13px] w-[13px]" />
          </Glass>
        </div>
      </Phone>
    </Art>
  )
}

// ——— Mac ——————————————————————————————————————————————————————————————————

/** A Mac window: traffic lights, a title with its subtitle, and toolbar items. */
function MacWindow({
  title,
  subtitle,
  toolbar,
  className = '',
  children,
}: {
  title: string
  subtitle?: string
  toolbar?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`app-ui @container overflow-hidden rounded-[10px] border ${sep} bg-[var(--mac-window)] art-shadow ${className}`}>
      <div className={`flex items-center gap-3 border-b ${sep} bg-[var(--mac-bar)] px-[10px] py-[7px]`}>
        <span className="flex shrink-0 gap-[6px]">
          <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[11px] font-semibold">{title}</p>
          {subtitle && <p className={`text-[9px] ${label2}`}>{subtitle}</p>}
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-[6px]">{toolbar}</div>
      </div>
      {children}
    </div>
  )
}

function ToolButton({ name, on = false }: { name: SymbolName; on?: boolean }) {
  return (
    <span
      className={`flex h-[22px] w-[24px] items-center justify-center rounded-[6px] ${
        on ? `bg-[var(--sys-fill)] ${tint}` : label2
      }`}
    >
      <Sym name={name} className="h-[13px] w-[13px]" />
    </span>
  )
}

function Segmented({ items }: { items: ReactNode[] }) {
  return (
    <span className="flex rounded-[6px] bg-[var(--sys-fill)] p-[2px] text-[9.5px]">
      {items.map((item, i) => (
        <span
          key={i}
          className={`flex items-center gap-[3px] rounded-[4.5px] px-[7px] py-[2px] ${
            i === 0 ? 'bg-[var(--mac-control)] shadow-[0_1px_1px_rgb(0_0_0/0.12)]' : label2
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
      className={`flex h-[19px] shrink-0 items-center gap-[4px] rounded-[5px] border ${sep} bg-[var(--mac-control)] px-[7px] text-[9.5px] shadow-[0_1px_1px_rgb(0_0_0/0.05)] ${className}`}
    >
      {children}
    </span>
  )
}

/** The writing editor's toolbar: Revision History, Visual | Markdown, Details, Agent, the deck. */
function EditorToolbar({ details = false, agent = false }: { details?: boolean; agent?: boolean }) {
  return (
    <>
      <ToolButton name="clockArrow" />
      <span className="hidden @sm:flex">
        <Segmented items={['Visual', 'Markdown']} />
      </span>
      <ToolButton name="infoCircle" on={details} />
      <ToolButton name="sparkles" on={agent} />
      <span className="hidden @sm:flex">
        <ToolButton name="slideDeck" />
      </span>
    </>
  )
}

/** The Mac writing editor with its agent workspace open beside it. */
export function AgentWorkspaceArt() {
  return (
    <Art
      className="@container"
      label="The Mac writing editor with the agent workspace open beside it: the draft on the left; on the right the workspace’s draft status, context file and skills, and a chat in which the agent describes its edit with a diff."
    >
      <MacWindow title="Abide in the Vine" subtitle="Saved" toolbar={<EditorToolbar agent />}>
        <div className="grid grid-cols-[minmax(0,1fr)] @xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col">
            <div className={`flex h-[24px] items-stretch border-b ${sep} bg-[var(--mac-bar)] text-[10px]`}>
              <span className="flex items-center gap-[4px] border-b-2 border-[color:var(--sys-tint)] bg-[var(--mac-window)] px-[10px]">
                <Sym name="docText" className="h-[11px] w-[11px]" />
                Main Prose
              </span>
              <span className={`flex items-center px-[9px] ${label2}`}>
                <Sym name="plus" className="h-[10px] w-[10px]" />
              </span>
            </div>
            <div className="flex gap-[10px] overflow-hidden bg-[var(--mac-control)] px-[10px] py-[6px] [mask-image:linear-gradient(to_right,black_85%,transparent)]">
              {[
                { group: 'Style', items: [<MacButton key="s">Body <Sym name="chevronDown" className="h-[7px] w-[7px]" /></MacButton>] },
                { group: 'Text', items: [<MacButton key="b"><span className="font-bold">B</span></MacButton>, <MacButton key="i"><span className="italic">I</span></MacButton>] },
                {
                  group: 'Insert',
                  items: [
                    <MacButton key="sc"><Sym name="book" className="h-[10px] w-[10px]" />Scripture</MacButton>,
                    <MacButton key="fn">Footnote</MacButton>,
                    <MacButton key="md"><Sym name="paperclip" className="h-[10px] w-[10px]" />Media</MacButton>,
                  ],
                },
              ].map((g) => (
                <div key={g.group} className="shrink-0">
                  <p className={`mb-[3px] text-[7px] font-semibold uppercase ${label2}`}>{g.group}</p>
                  <div className="flex gap-[3px]">{g.items}</div>
                </div>
              ))}
            </div>
            <div className="flex-1 px-[14px] py-[12px] text-[11px] leading-[1.6]">
              <p className="text-[18px] font-bold leading-tight">Abide in the Vine</p>
              <p className="mt-[7px]">
                Fruit is never the branch’s own work. It is what the vine does through a branch
                that stays.
                <sup className={`ml-[1px] text-[0.75em] font-semibold ${blue}`}>[1]</sup>
              </p>
              <div className="mt-[8px] space-y-[6px]">
                <span className="block h-[5px] w-[94%] rounded-full bg-[var(--sys-fill)]" />
                <span className="block h-[5px] w-[88%] rounded-full bg-[var(--sys-fill)]" />
                <span className="block h-[5px] w-[56%] rounded-full bg-[var(--sys-fill)]" />
              </div>
              <p className={`mt-[10px] border-t ${sep} pt-[5px] text-[9.5px] ${label2}`}>
                <span className={`font-semibold ${blue}`}>1</span> Compare 1 John 2:6.
              </p>
            </div>
            <div className={`flex justify-between border-t ${sep} bg-[var(--mac-control)] px-[10px] py-[4px] text-[9px] ${label2}`}>
              <span>Saved</span>
              <span>642 words · 4 min read</span>
            </div>
          </div>

          <div className={`flex flex-col border-t ${sep} @xl:border-l @xl:border-t-0`}>
            <div className={`flex items-center gap-[6px] border-b ${sep} px-[9px] py-[6px]`}>
              <MacButton>
                Claude <Sym name="chevronUpDown" className="h-[7px] w-[7px]" />
              </MacButton>
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
                <p className="mt-[3px] flex items-center gap-[5px] text-[9.5px] font-medium">
                  Build Lamp Deck
                  <span className={`flex items-center gap-[2px] text-[8px] font-normal ${label2}`}>
                    <Sym name="lockFill" className="h-[7px] w-[7px]" />
                    Built-in
                  </span>
                </p>
              </div>
            </div>
            <div className={`flex-1 space-y-[6px] border-t ${sep} bg-[var(--mac-control)] px-[10px] py-[8px] text-[10px] leading-[1.45]`}>
              <div className="flex items-center gap-[6px]">
                <span className="flex items-center gap-[4px] font-semibold">
                  <Sym name="sparkles" className="h-[10px] w-[10px]" />
                  Claude
                </span>
                <span className="flex items-center gap-[3px] text-[8.5px] text-[color:var(--sys-green)]">
                  <Sym name="checkmarkCircleFill" className="h-[8px] w-[8px]" />
                  Connected
                </span>
              </div>
              <p className="ml-auto w-fit max-w-[88%] rounded-[12px] rounded-tr-none border border-[color-mix(in_srgb,var(--sys-tint)_38%,transparent)] bg-[color-mix(in_srgb,var(--sys-tint)_16%,transparent)] px-[9px] py-[5px]">
                Tighten the opening, and find where else John uses “abide”.
              </p>
              <div className="max-w-[94%] rounded-[12px] rounded-tl-none border border-[color:var(--sys-primary-b)] bg-[var(--sys-primary-a)] px-[9px] py-[6px]">
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
              <div className={`flex items-center gap-[6px] rounded-[10px] border ${sep} px-[9px] py-[5px]`}>
                <span className={label3}>Message Claude</span>
                <span className="ml-auto flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[var(--sys-tint)] text-white">
                  <Sym name="arrowUp" className="h-[10px] w-[10px]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </MacWindow>
    </Art>
  )
}

/** The writing editor finding and replacing, with its Details pane open. */
export function MacEditorArt() {
  const match = 'rounded-[2px] bg-[rgb(255_204_0/0.4)]'
  return (
    <Art
      className="@container"
      label="The Mac writing editor replacing “abide” with “remain”, its matches highlighted in yellow, beside the Details pane: the piece’s title, category, series and key scripture."
    >
      <MacWindow title="Abide in the Vine" subtitle="Saved" toolbar={<EditorToolbar details />}>
        <div className="grid grid-cols-[minmax(0,1fr)] @md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <div className={`space-y-[4px] border-b ${sep} bg-[var(--mac-control)] px-[8px] py-[6px] text-[9.5px]`}>
              <div className="flex items-center gap-[4px]">
                <MacButton>
                  Replace <Sym name="chevronUpDown" className="h-[7px] w-[7px]" />
                </MacButton>
                <span className="flex h-[19px] min-w-0 flex-1 items-center gap-[4px] rounded-[5px] border-2 border-[color-mix(in_srgb,var(--sys-tint)_70%,transparent)] bg-[var(--mac-control)] px-[5px]">
                  <Sym name="magnifyingglass" className={`h-[9px] w-[9px] ${label2}`} />
                  abide
                  <span className={`ml-auto font-mono text-[8.5px] ${label2}`}>2 of 4</span>
                </span>
                <MacButton>Done</MacButton>
              </div>
              <div className="flex items-center gap-[4px]">
                <span className={`flex h-[19px] min-w-0 flex-1 items-center rounded-[5px] border ${sep} bg-[var(--mac-control)] px-[6px]`}>
                  remain
                </span>
                <MacButton>Replace</MacButton>
                <MacButton>Replace All</MacButton>
              </div>
            </div>
            <div className="px-[12px] py-[10px] text-[11px] leading-[1.65]">
              A branch bears fruit only while it <span className={match}>abide</span>s in the vine.{' '}
              <span className="rounded-[2px] bg-[#ffcc00] text-black">Abide</span> in me, he says,
              and the fruit takes care of itself. To <span className={match}>abide</span> is to
              stay.
            </div>
          </div>
          <div className={`space-y-[8px] border-t ${sep} px-[9px] py-[8px] text-[9.5px] @md:border-l @md:border-t-0`}>
            {[
              {
                section: 'Details',
                rows: [
                  ['Title', 'Abide in the Vine'],
                  ['Category', <span key="c" className="flex items-center gap-[3px]">Exhortation <Sym name="chevronUpDown" className="h-[7px] w-[7px]" /></span>],
                ],
              },
              {
                section: 'Series',
                rows: [
                  ['Series', 'Studies in John'],
                  ['Order: 4', <span key="o" className={`rounded-[4px] border ${sep} px-[5px]`}>− +</span>],
                ],
              },
              {
                section: 'Key Scripture',
                rows: [['John 15:1–8', <Sym key="m" name="minusCircle" className={`h-[10px] w-[10px] ${label2}`} />]],
              },
            ].map((s) => (
              <div key={s.section}>
                <p className={`mb-[3px] px-[2px] text-[9px] font-semibold ${label2}`}>{s.section}</p>
                <div className={`divide-y divide-[color:var(--sys-sep)] ${sep} rounded-[7px] border ${sep} bg-[var(--mac-control)]`}>
                  {s.rows.map(([k, v], i) => (
                    <div key={i} className="flex items-center justify-between gap-2 px-[7px] py-[4px]">
                      <span>{k}</span>
                      <span className={`truncate ${label2}`}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </MacWindow>
    </Art>
  )
}

/** Slide Studio: the slide list, and a Scripture slide in the Lamp Dark theme. */
export function SlideArt() {
  const thumbs = [
    { caption: '1. Abide in the Vine' },
    { caption: '2. John 15:5', on: true },
    { caption: '3. Fruit', hidden: true },
  ]
  const rounded: CSSProperties = { fontFamily: "ui-rounded, 'SF Pro Rounded', system-ui, sans-serif" }
  return (
    <Art label="Slide Studio on the Mac: the slide list, with one slide hidden, beside a Scripture slide in the Lamp Dark theme quoting John 15:5 with an amber citation.">
      <MacWindow
        title="Abide in the Vine"
        toolbar={
          <>
            <ToolButton name="uturnBackward" />
            <ToolButton name="uturnForward" />
            <span className="flex h-[20px] items-center gap-[4px] rounded-[6px] bg-[var(--sys-tint)] px-[8px] text-[9.5px] font-medium text-white">
              <Sym name="playFill" className="h-[8px] w-[8px]" />
              Play
            </span>
          </>
        }
      >
        <div className="grid grid-cols-[86px_minmax(0,1fr)]">
          <div className={`space-y-[7px] border-r ${sep} bg-[var(--mac-bar)] p-[7px]`}>
            {thumbs.map((t) => (
              <div key={t.caption}>
                <div
                  className={`relative aspect-video rounded-[4px] bg-[#111827] p-[5px] ${
                    t.on ? 'ring-2 ring-[color:var(--sys-tint)]' : 'ring-1 ring-[color:var(--sys-label3)]'
                  }`}
                >
                  <span className="block h-[3px] w-[70%] rounded-full bg-[#F9FAFB]/70" />
                  <span className="mt-[3px] block h-[3px] w-[50%] rounded-full bg-[#F9FAFB]/50" />
                  <span className="mt-[3px] block h-[2px] w-[30%] rounded-full bg-[#F59E0B]" />
                  {t.hidden && (
                    <span className="absolute right-[2px] top-[2px] flex h-[11px] w-[11px] items-center justify-center rounded-full bg-[var(--sys-glass)]">
                      <Sym name="eyeSlashFill" className="h-[7px] w-[7px]" />
                    </span>
                  )}
                </div>
                <p className={`mt-[2px] truncate text-[7.5px] ${label2}`}>{t.caption}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-1 items-center bg-[var(--mac-under)] p-[14px]">
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
            <div className={`flex items-center gap-[4px] border-t ${sep} bg-[var(--mac-bar)] px-[8px] py-[4px] text-[8.5px] ${label2}`}>
              <Sym name="checkmarkCircleFill" className="h-[9px] w-[9px] text-[color:var(--sys-green)]" />
              Saved
              <span className="ml-auto">6 slides</span>
            </div>
          </div>
        </div>
      </MacWindow>
    </Art>
  )
}
