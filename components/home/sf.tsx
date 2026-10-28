/**
 * Approximations of the SF Symbols the apps use, for the homepage
 * illustrations. SF Symbols can't be shipped on the web, so these are drawn to
 * the same shapes at the same weight; each is named for the symbol it stands in
 * for.
 */
import type { ReactNode, SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

function S({ children, solid = false, ...props }: Omit<P, 'fill'> & { solid?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={solid ? 'currentColor' : 'none'}
      stroke={solid ? 'none' : 'currentColor'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const sf: Record<string, (p: P) => ReactNode> = {
  arrowBackward: (p) => <S {...p}><path d="M19 12H5M11 5.5 4.5 12l6.5 6.5" /></S>,
  ellipsis: (p) => (
    <S solid {...p}>
      <circle cx="5.5" cy="12" r="1.9" />
      <circle cx="12" cy="12" r="1.9" />
      <circle cx="18.5" cy="12" r="1.9" />
    </S>
  ),
  chevronUpDown: (p) => <S {...p}><path d="m8 9.5 4-4 4 4M8 14.5l4 4 4-4" /></S>,
  chevronLeft: (p) => <S {...p}><path d="M15 4.5 7.5 12l7.5 7.5" /></S>,
  chevronRight: (p) => <S {...p}><path d="m9 4.5 7.5 7.5L9 19.5" /></S>,
  chevronDown: (p) => <S {...p}><path d="m5.5 9 6.5 6.5L18.5 9" /></S>,
  calendar: (p) => (
    <S {...p}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </S>
  ),
  plusCircleFill: (p) => (
    <S {...p}>
      <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />
      <path d="M12 7.5v9M7.5 12h9" stroke="var(--sys-on-tint, #fff)" />
    </S>
  ),
  checkmarkCircleFill: (p) => (
    <S {...p}>
      <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />
      <path d="m7.5 12.3 3 3 6-6.3" stroke="var(--sys-on-tint, #fff)" strokeWidth={2.4} />
    </S>
  ),
  circle: (p) => <S {...p}><circle cx="12" cy="12" r="9.5" strokeWidth={1.8} /></S>,
  bookFill: (p) => (
    <S solid {...p}>
      <path d="M11.3 7.2C9.2 5.2 6.3 4.2 2.5 4v14c3.8.2 6.7 1.1 8.8 3zM12.7 7.2c2.1-2 5-3 8.8-3.2v14c-3.8.2-6.7 1.1-8.8 3z" />
    </S>
  ),
  bookClosed: (p) => (
    <S {...p}>
      <path d="M6 3.5h12v17H6.5A2.5 2.5 0 0 1 4 18V6a2.5 2.5 0 0 1 2-2.5zM4 18a2.5 2.5 0 0 1 2.5-2.5H18" />
    </S>
  ),
  book: (p) => (
    <S {...p}>
      <path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13" />
    </S>
  ),
  magnifyingglass: (p) => (
    <S {...p}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </S>
  ),
  booksVerticalFill: (p) => (
    <S solid {...p}>
      <rect x="3" y="4" width="4.5" height="16" rx="1" />
      <rect x="9" y="4" width="4.5" height="16" rx="1" />
      <path d="m15.2 5.3 3.9-1 4 15.5-3.9 1z" />
    </S>
  ),
  pencilLine: (p) => <S {...p}><path d="M3.5 20.5h7M15 4.5l4.5 4.5L9 19.5H4.5V15z" /></S>,
  gear: (p) => (
    <S {...p}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    </S>
  ),
  highlighter: (p) => <S {...p}><path d="m14 4 6 6-8.5 8.5h-6v-6zM11.5 6.5l6 6M3 21h9" /></S>,
  underline: (p) => <S {...p}><path d="M7 4v7a5 5 0 0 0 10 0V4M5 20.5h14" /></S>,
  underlineDashed: (p) => (
    <S {...p}>
      <path d="M7 4v7a5 5 0 0 0 10 0V4" />
      <path d="M5 20.5h14" strokeDasharray="3.5 2.5" strokeLinecap="butt" />
    </S>
  ),
  underlineDotted: (p) => (
    <S {...p}>
      <path d="M7 4v7a5 5 0 0 0 10 0V4" />
      <path d="M5 20.5h14" strokeDasharray="0.1 3.5" strokeWidth={2.6} />
    </S>
  ),
  number: (p) => <S {...p}><path d="M5 9h15M4 15h15M10.5 3 8.5 21M15.5 3l-2 18" /></S>,
  xmarkCircleFill: (p) => (
    <S {...p}>
      <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />
      <path d="m8.5 8.5 7 7M15.5 8.5l-7 7" stroke="var(--sys-bg2, #fff)" />
    </S>
  ),
  checkmarkIcloudFill: (p) => (
    <S {...p}>
      <path
        d="M7 19.5a5 5 0 0 1-.6-10A6.5 6.5 0 0 1 19 8.6a5.5 5.5 0 0 1-1 10.9z"
        fill="currentColor"
        stroke="none"
      />
      <path d="m9 14 2.2 2.2 4-4.4" stroke="var(--sys-bg, #fff)" strokeWidth={2.2} />
    </S>
  ),
  circlepath: (p) => (
    <S {...p}>
      <path d="M4.5 12a7.5 7.5 0 0 1 13-5M19.5 12a7.5 7.5 0 0 1-13 5" />
      <path d="M17.5 3v4h-4M6.5 21v-4h4" />
    </S>
  ),
  squareAndArrowUp: (p) => <S {...p}><path d="M12 3.5v11M8 7.5l4-4 4 4M7.5 10.5H6v10h12v-10h-1.5" /></S>,
  eye: (p) => (
    <S {...p}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </S>
  ),
  eyeSlashFill: (p) => (
    <S {...p}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" fill="currentColor" stroke="none" />
      <path d="M4 3.5 20 20.5" strokeWidth={2.4} />
    </S>
  ),
  xmark: (p) => <S {...p}><path d="m6 6 12 12M18 6 6 18" /></S>,
  infoCircle: (p) => (
    <S {...p}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 11v6M12 7.5v.2" />
    </S>
  ),
  sparkles: (p) => (
    <S {...p}>
      <path d="M10 3.5 11.6 8l4.4 1.6-4.4 1.6L10 15.5l-1.6-4.3L4 9.6 8.4 8z" />
      <path d="m18 14 .9 2.1 2.1.9-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z" />
    </S>
  ),
  clockArrow: (p) => (
    <S {...p}>
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4.5V8h3.5M12 8v4.5l3 2" />
    </S>
  ),
  docText: (p) => (
    <S {...p}>
      <path d="M6 3h8.5L19 7.5V21H6z" />
      <path d="M14 3v5h5M9 12.5h7M9 16h5" />
    </S>
  ),
  doc: (p) => <S {...p}><path d="M6 3h8.5L19 7.5V21H6zM14 3v5h5" /></S>,
  paperclip: (p) => (
    <S {...p}>
      <path d="M20 11.5 12 19.5a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7L9.5 17.4a1.7 1.7 0 0 1-2.4-2.4l7.4-7.4" />
    </S>
  ),
  wandStars: (p) => (
    <S {...p}>
      <path d="M4 20 14.5 9.5M12.5 7.5l4 4" />
      <path d="M18 3v3M16.5 4.5h3M20 9.5v2M19 10.5h2M9 3.5v2M8 4.5h2" />
    </S>
  ),
  folder: (p) => <S {...p}><path d="M3 6.5a1.5 1.5 0 0 1 1.5-1.5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5V18a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18z" /></S>,
  arrowUp: (p) => <S {...p}><path d="M12 19V5.5M6 11l6-6 6 6" /></S>,
  lockFill: (p) => (
    <S {...p}>
      <rect x="5" y="10.5" width="14" height="10" rx="2" fill="currentColor" stroke="none" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </S>
  ),
  playFill: (p) => <S solid {...p}><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z" /></S>,
  uturnBackward: (p) => <S {...p}><path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11" /></S>,
  uturnForward: (p) => <S {...p}><path d="m15 14 5-5-5-5M20 9H9.5a5.5 5.5 0 0 0 0 11H13" /></S>,
  bubbles: (p) => (
    <S {...p}>
      <path d="M3.5 4.5h11a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1H8.5L5 16v-3H3.5a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z" />
      <path d="M18.5 8.5h2a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H19v3l-3.5-3h-5" />
    </S>
  ),
  terminal: (p) => (
    <S {...p}>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="m6.5 9 3 3-3 3M11.5 15.5h5" />
    </S>
  ),
  mic: (p) => (
    <S {...p}>
      <rect x="9" y="3" width="6" height="11.5" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" />
    </S>
  ),
  noteText: (p) => (
    <S {...p}>
      <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
      <path d="M8 8.5h8M8 12h8M8 15.5h5" />
    </S>
  ),
  photoBadgePlus: (p) => (
    <S {...p}>
      <path d="M14 4.5H5A1.5 1.5 0 0 0 3.5 6v12A1.5 1.5 0 0 0 5 19.5h14a1.5 1.5 0 0 0 1.5-1.5v-7" />
      <path d="m3.5 16.5 5-5 4.5 4.5 2.5-2.5 5 5M19 2.5v6M16 5.5h6" />
    </S>
  ),
  listBullet: (p) => (
    <S {...p}>
      <path d="M9.5 6.5h11M9.5 12h11M9.5 17.5h11" />
      <circle cx="4.5" cy="6.5" r="1.2" fill="currentColor" />
      <circle cx="4.5" cy="12" r="1.2" fill="currentColor" />
      <circle cx="4.5" cy="17.5" r="1.2" fill="currentColor" />
    </S>
  ),
  listNumber: (p) => (
    <S {...p}>
      <path d="M10 6.5h10.5M10 12h10.5M10 17.5h10.5" />
      <path d="M4 5l1.5-1v5M3.5 14h3l-3 4h3" strokeWidth={1.6} />
    </S>
  ),
  textQuote: (p) => <S {...p}><path d="M4 6h16M8 10.5h12M8 15h12M4 19.5h16M4 10.5v4.5" /></S>,
  tablecells: (p) => (
    <S {...p}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M3.5 14.5h17M9.5 4.5v15M15 4.5v15" />
    </S>
  ),
  minusCircle: (p) => (
    <S {...p}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8 12h8" />
    </S>
  ),
  slideDeck: (p) => (
    <S {...p}>
      <rect x="3" y="6" width="15" height="11" rx="2" />
      <path d="M6 3.5h13a2 2 0 0 1 2 2V14" />
      <path d="m9.5 9.5 3.5 2-3.5 2z" fill="currentColor" />
    </S>
  ),
  save: (p) => (
    <S {...p}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 4v5h8V4M8 20v-6h8v6" />
    </S>
  ),
  plus: (p) => <S {...p}><path d="M12 5v14M5 12h14" /></S>,
}

export type SymbolName = keyof typeof sf

/** An SF Symbol stand-in, sized and coloured by its className. */
export function Sym({ name, className }: { name: SymbolName; className?: string }) {
  const Glyph = sf[name]
  return <Glyph className={className} />
}
