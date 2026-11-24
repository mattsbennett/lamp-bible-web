/**
 * Slides as Lamp draws them (LampPresentationSlideCanvas in lamp-bible-core), in SVG on the
 * canvas's own grid, so they keep its proportions at any size: a widescreen slide is 1,600 by 900
 * units, the page inset 96 across and 72 down, a heading 58 units over a 120-by-6 rule in the
 * accent, and the body at its reading size, 48 where it fits. They are drawn in a deck's theme,
 * which does not follow light and dark mode.
 */
import type { CSSProperties, ReactNode } from 'react'
import { slideMap } from './slide-map'

export type SlideTheme = { name: string; ground: string; ink: string; accent: string }

/** Lamp's seven themes, in the order the Deck pane shows them (LampPresentationTheme.builtIn). */
export const slideThemes: SlideTheme[] = [
  { name: 'Lamp Dark', ground: '#111827', ink: '#F9FAFB', accent: '#F59E0B' },
  { name: 'Parchment', ground: '#F4EBD8', ink: '#29221B', accent: '#8B4513' },
  { name: 'Olive Grove', ground: '#1C251C', ink: '#F2EFE4', accent: '#C8B35A' },
  { name: 'Linen', ground: '#F8F6F1', ink: '#1C1C1E', accent: '#B4432C' },
  { name: 'Harbour', ground: '#E9EEF2', ink: '#13202C', accent: '#1F5FA8' },
  { name: 'Vespers', ground: '#241318', ink: '#F7EEE9', accent: '#E39B5C' },
  { name: 'Nocturne', ground: '#0E1A2B', ink: '#EEF3F8', accent: '#7DB7E8' },
]

export const themeNamed = (name: string) => slideThemes.find((t) => t.name === name) ?? slideThemes[0]

/** The body's face when a deck names none: Lamp Rounded, the system's rounded design. */
const rounded = "ui-rounded, 'SF Pro Rounded', system-ui, sans-serif"
/** System Serif, which the deck drawn here gives its headings. */
export const serifHeadings = "ui-serif, 'New York', 'Iowan Old Style', Georgia, serif"

/** Whether a ground is dark, as the map decides it: below 0.35 relative luminance. */
function isDark(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.35
}

/** One slide, its ground filled; `children` draw on the 1,600 × 900 grid. */
export function Slide({
  theme,
  headings,
  className = '',
  children,
}: {
  theme: SlideTheme
  /** The deck's heading face, when it names one apart from the body's. */
  headings?: string
  className?: string
  children: ReactNode
}) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className={`block h-auto w-full ${className}`}
      style={{ fontFamily: rounded, '--heading': headings ?? rounded } as CSSProperties}
      aria-hidden="true"
    >
      <rect width="1600" height="900" fill={theme.ground} />
      {children}
    </svg>
  )
}

const headingFace = { fontFamily: 'var(--heading)' }

/** A Title & Body heading: 58 units, bold, over the accent's rule. */
function Heading({ theme, children }: { theme: SlideTheme; children: string }) {
  return (
    <>
      <text x="96" y="107" fontSize="58" fontWeight="700" fill={theme.ink} dominantBaseline="central" style={headingFace}>
        {children}
      </text>
      <rect x="96" y="176" width="120" height="6" fill={theme.accent} />
    </>
  )
}

/** A title slide: the title at 76 units, bold, and its subtitle at 40 in the accent, centred. */
export function TitleSlide({
  theme,
  headings,
  title,
  subtitle,
}: {
  theme: SlideTheme
  headings?: string
  title: string
  subtitle: string
}) {
  return (
    <Slide theme={theme} headings={headings}>
      <g textAnchor="middle" style={headingFace}>
        <text x="800" y="414" fontSize="76" fontWeight="700" fill={theme.ink} dominantBaseline="central">
          {title}
        </text>
        <text x="800" y="508" fontSize="40" fill={theme.accent} dominantBaseline="central">
          {subtitle}
        </text>
      </g>
    </Slide>
  )
}

/** A title slide as a Statement: its heading as large as the slide allows, 160 units, heavy. */
export function StatementSlide({ theme, headings, lines }: { theme: SlideTheme; headings?: string; lines: string[] }) {
  const size = 160
  return (
    <Slide theme={theme} headings={headings}>
      <g textAnchor="middle" style={headingFace}>
        {lines.map((line, i) => (
          <text
            key={i}
            x="800"
            y={450 + (i - (lines.length - 1) / 2) * size * 1.15}
            fontSize={size}
            fontWeight="800"
            fill={theme.ink}
            dominantBaseline="central"
          >
            {line}
          </text>
        ))}
      </g>
    </Slide>
  )
}

/** A Scripture slide: the passage beside a rule in the accent, its citation beneath. */
export function ScriptureSlide({
  theme,
  headings,
  lines,
  citation,
}: {
  theme: SlideTheme
  headings?: string
  lines: string[]
  citation: string
}) {
  const size = 60
  const top = 450 - (lines.length * size * 1.25 + 30 + 36) / 2
  return (
    <Slide theme={theme} headings={headings}>
      <rect x="96" y={top} width="8" height={lines.length * size * 1.25 + 66} rx="4" fill={theme.accent} />
      {lines.map((line, i) => (
        <text key={i} x="138" y={top + size * 0.62 + i * size * 1.25} fontSize={size} fill={theme.ink} dominantBaseline="central">
          {line}
        </text>
      ))}
      <text x="138" y={top + lines.length * size * 1.25 + 48} fontSize="30" fontWeight="500" fill={theme.accent} dominantBaseline="central">
        {citation}
      </text>
    </Slide>
  )
}

/**
 * A Title & Body slide whose list is drawn as a map (LampSlideMap): the land around its places,
 * a step off the ground, with its relief, lakes and rivers; each place marked and named in the
 * accent; a route joining them; and the credit on its face. The map is the page's width and
 * 540 units tall, set in the room under the heading.
 */
export function MapSlide({ id, theme, headings }: { id: string; theme: SlideTheme; headings?: string }) {
  const { width, height, size, places } = slideMap
  const dark = isDark(theme.ground)
  // Slide Studio's canvas draws a slide at about half its size, so a point there is two of the
  // slide's units: what the map's least line widths and its credit's least size come to.
  const point = 2
  return (
    <Slide theme={theme} headings={headings}>
      <Heading theme={theme}>The first journey</Heading>
      <g transform="translate(96 252)">
        <defs>
          <clipPath id={`${id}-frame`}>
            <rect width={width} height={height} rx={size * 0.35} />
          </clipPath>
          <clipPath id={`${id}-land`}>
            <path d={slideMap.land} />
          </clipPath>
          {/* A soft edge in the ground's colour, so a name reads over relief, a river or a route. */}
          <filter id={`${id}-halo`} x="-10%" y="-40%" width="120%" height="180%">
            <feMorphology in="SourceAlpha" operator="dilate" radius={size * 0.05} result="spread" />
            <feGaussianBlur in="spread" stdDeviation={size * 0.1} result="soft" />
            <feFlood floodColor={theme.ground} floodOpacity="0.9" />
            <feComposite in2="soft" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g clipPath={`url(#${id}-frame)`} style={{ isolation: 'isolate' }}>
          <rect width={width} height={height} fill={theme.ground} />
          <path d={slideMap.land} fill={theme.ink} fillOpacity={dark ? 0.1 : 0.07} />
          {/* Slopes shaded on the land alone: darkened on a light ground, lightened on a dark one. */}
          <image
            href={slideMap.relief.href}
            x={slideMap.relief.x}
            y={slideMap.relief.y}
            width={slideMap.relief.width}
            height={slideMap.relief.height}
            preserveAspectRatio="none"
            clipPath={`url(#${id}-land)`}
            opacity={dark ? 0.5 : 0.55}
            style={dark ? { mixBlendMode: 'screen', filter: 'invert(1)' } : { mixBlendMode: 'multiply' }}
          />
          <path d={slideMap.lakes} fill={theme.ground} />
          <path
            d={slideMap.rivers}
            fill="none"
            stroke={theme.ground}
            strokeWidth={point}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {places.slice(1).map((place, i) => (
            <line
              key={place.label}
              x1={places[i].x}
              y1={places[i].y}
              x2={place.x}
              y2={place.y}
              stroke={theme.accent}
              strokeOpacity="0.8"
              strokeWidth={2 * point}
              strokeLinecap="round"
            />
          ))}
          {places.map((place) =>
            place.uncertain ? (
              <circle
                key={place.label}
                cx={place.x}
                cy={place.y}
                r={size * 0.18}
                fill="none"
                stroke={theme.accent}
                strokeWidth={Math.max(1.5 * point, size * 0.07)}
              />
            ) : (
              <circle key={place.label} cx={place.x} cy={place.y} r={size * 0.18} fill={theme.accent} />
            ),
          )}
          <g filter={`url(#${id}-halo)`} fontSize={size * 0.74} fontWeight="600" fill={theme.ink} textAnchor="middle">
            {places.map((place) => (
              <text key={place.label} x={place.labelX} y={place.labelY} dominantBaseline="central">
                {place.label}
              </text>
            ))}
          </g>
          <text
            x={width - size * 0.3}
            y={height - size * 0.15 - 4}
            fontSize={9 * point}
            fill={theme.ink}
            fillOpacity="0.55"
            textAnchor="end"
          >
            Places: OpenBible.info, CC BY 4.0, adapted · Map: Natural Earth
          </text>
        </g>
        <rect width={width} height={height} rx={size * 0.35} fill="none" stroke={theme.ink} strokeOpacity="0.18" strokeWidth={point} />
      </g>
    </Slide>
  )
}

/**
 * A Title & Body slide whose list is drawn as a timeline: each event in a column of its own, its
 * date above in the accent, a mark on the line, the event beneath. At 48 units the date is 34.6
 * and bold, the event 38.4, the mark 17.3 across.
 */
export function TimelineSlide({
  theme,
  headings,
  title,
  events,
}: {
  theme: SlideTheme
  headings?: string
  title: string
  /** Each event's date and the lines its words wrap to. */
  events: Array<{ date: string; event: string[] }>
}) {
  const size = 48
  const column = 1408 / events.length
  const lines = Math.max(...events.map((e) => e.event.length))
  const tall = size * 0.72 * 1.2 + size * 0.3 * 2 + size * 0.36 + lines * size * 0.8 * 1.25
  const top = 216 + (612 - tall) / 2
  const axis = top + size * 0.72 * 1.2 + size * 0.3 + size * 0.18
  const centre = (i: number) => 96 + column * (i + 0.5)
  return (
    <Slide theme={theme} headings={headings}>
      <Heading theme={theme}>{title}</Heading>
      <line
        x1={centre(0)}
        x2={centre(events.length - 1)}
        y1={axis}
        y2={axis}
        stroke={theme.accent}
        strokeOpacity="0.55"
        strokeWidth={size * 0.06}
      />
      {events.map((e, i) => (
        <g key={e.date} textAnchor="middle">
          <text x={centre(i)} y={top + size * 0.72 * 0.6} fontSize={size * 0.72} fontWeight="700" fill={theme.accent} dominantBaseline="central">
            {e.date}
          </text>
          <circle cx={centre(i)} cy={axis} r={size * 0.18} fill={theme.accent} />
          {e.event.map((line, n) => (
            <text
              key={n}
              x={centre(i)}
              y={axis + size * 0.18 + size * 0.3 + size * 0.8 * (0.6 + n * 1.25)}
              fontSize={size * 0.8}
              fill={theme.ink}
              dominantBaseline="central"
            >
              {line}
            </text>
          ))}
        </g>
      ))}
    </Slide>
  )
}

/**
 * A Title & Body slide whose list is drawn as a passage's structure: each line lettered in the
 * accent and stepped in, toward the centre of a chiasm or under the line it answers, with the
 * citation beneath in the accent.
 */
export function StructureSlide({
  theme,
  headings,
  title,
  figure,
  lines,
  citation,
}: {
  theme: SlideTheme
  headings?: string
  title: string
  figure: 'chiasm' | 'parallel'
  lines: string[]
  citation: string
}) {
  const size = 48
  const count = lines.length
  // LampPresentationFigure.letter(at:of:) and indent(at:of:).
  const letter = (n: number) => String.fromCharCode(65 + n)
  const lettered = (i: number) =>
    figure === 'chiasm'
      ? i <= count - 1 - i
        ? letter(i)
        : `${letter(count - 1 - i)}′`
      : `${letter(Math.floor(i / 2))}${i % 2 ? '′' : ''}`
  const indent = (i: number) => (figure === 'chiasm' ? Math.min(i, count - 1 - i) : i % 2)
  const row = size * 1.2
  const gap = size * 0.32
  const citationSize = 29.76
  const tall = count * row + (count - 1) * gap + 10 + citationSize * 1.2
  const top = 216 + (612 - tall) / 2
  return (
    <Slide theme={theme} headings={headings}>
      <Heading theme={theme}>{title}</Heading>
      <g>
        {lines.map((line, i) => {
          const x = 96 + indent(i) * size * 1.5
          const y = top + i * (row + gap) + row / 2
          return (
            <g key={i}>
              <text x={x} y={y} fontSize={size * 0.8} fontWeight="700" fill={theme.accent} dominantBaseline="central">
                {lettered(i)}
              </text>
              <text x={x + size * 1.3 + size * 0.4} y={y} fontSize={size} fill={theme.ink} dominantBaseline="central">
                {line}
              </text>
            </g>
          )
        })}
        <text
          x="96"
          y={top + count * row + (count - 1) * gap + 10 + citationSize * 0.6}
          fontSize={citationSize}
          fontWeight="500"
          fill={theme.accent}
          dominantBaseline="central"
        >
          {citation}
        </text>
      </g>
    </Slide>
  )
}
