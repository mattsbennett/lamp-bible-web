import type { ReactNode, SVGProps } from 'react'

export type IconComponent = (props: SVGProps<SVGSVGElement>) => ReactNode

/** One stroke style for every icon, so they read as a set at 20–24px. */
function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const ReaderIcon: IconComponent = (p) => (
  <Icon {...p}>
    <path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z" />
    <path d="M12 6.5v13" />
  </Icon>
)

export const PanelIcon: IconComponent = (p) => (
  <Icon {...p}>
    <rect x="3" y="4.5" width="18" height="15" rx="2" />
    <path d="M14 4.5v15M16.5 8.5h2M16.5 11.5h2M16.5 14.5h2" />
  </Icon>
)

export const PlanIcon: IconComponent = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    <path d="m9 14.5 2 2 4-4" />
  </Icon>
)

export const HighlightIcon: IconComponent = (p) => (
  <Icon {...p}>
    <path d="m14 4.5 5.5 5.5-8 8H6v-5.5z" />
    <path d="m12 6.5 5.5 5.5M4 21h9" />
  </Icon>
)

export const NoteIcon: IconComponent = (p) => (
  <Icon {...p}>
    <path d="M6 3h8.5L19 7.5V21H6z" />
    <path d="M14 3v5h5M9 12.5h7M9 16h4.5" />
  </Icon>
)

export const PenIcon: IconComponent = (p) => (
  <Icon {...p}>
    <path d="M19.5 4.5c-5.5 0-10.5 3.5-12 9.5L6 20l6-1.5c6-1.5 7.5-8 7.5-14z" />
    <path d="M6 20l7.5-7.5" />
  </Icon>
)

export const SearchIcon: IconComponent = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Icon>
)

export const SyncIcon: IconComponent = (p) => (
  <Icon {...p}>
    <path d="M19.5 12a7.5 7.5 0 0 1-13 5.1M4.5 12a7.5 7.5 0 0 1 13-5.1" />
    <path d="M17.5 3v4h-4M6.5 21v-4h4" />
  </Icon>
)

export const AgentIcon: IconComponent = (p) => (
  <Icon {...p}>
    <path d="M11 3.5 12.6 8l4.4 1.6-4.4 1.6L11 15.5l-1.6-4.3L5 9.6 9.4 8z" />
    <path d="m18 14.5.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
  </Icon>
)

export const SlidesIcon: IconComponent = (p) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="12.5" rx="1.5" />
    <path d="M12 16.5V20M8.5 20h7" />
    <path d="m10.5 8 4 2.25-4 2.25z" />
  </Icon>
)

export const ModuleIcon: IconComponent = (p) => (
  <Icon {...p}>
    <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z" />
    <path d="M4 7.5 12 12l8-4.5M12 12v9" />
  </Icon>
)

export const WindowsIcon: IconComponent = (p) => (
  <Icon {...p}>
    <rect x="7" y="3.5" width="14" height="11" rx="1.5" />
    <path d="M17 17.5V19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 19v-8a1.5 1.5 0 0 1 1.5-1.5H7" />
  </Icon>
)

export const ChatIcon: IconComponent = (p) => (
  <Icon {...p}>
    <path d="M4.5 5h15a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1H10L5.5 20v-3.5h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
  </Icon>
)

export const TerminalIcon: IconComponent = (p) => (
  <Icon {...p}>
    <rect x="3" y="4.5" width="18" height="15" rx="2" />
    <path d="m7 9.5 3 2.5-3 2.5M12.5 15h4.5" />
  </Icon>
)

export const FolderIcon: IconComponent = (p) => (
  <Icon {...p}>
    <path d="M3.5 6.5a1 1 0 0 1 1-1H9l2 2h8.5a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z" />
  </Icon>
)

export const SkillIcon: IconComponent = (p) => (
  <Icon {...p}>
    <path d="M9.5 6.5h11M9.5 12h11M9.5 17.5h11" />
    <path d="m3.5 6.5 1 1 2-2M3.5 12l1 1 2-2M3.5 17.5l1 1 2-2" />
  </Icon>
)

export const HistoryIcon: IconComponent = (p) => (
  <Icon {...p}>
    <path d="M4 12a8 8 0 1 0 2.4-5.7" />
    <path d="M4 4.5V8h3.5M12 8v4.5l3 2" />
  </Icon>
)

export const FootnoteIcon: IconComponent = (p) => (
  <Icon {...p}>
    <path d="M3.5 18.5 8 7l4.5 11.5M5.3 14h5.4" />
    <path d="M16 5.5h2v6.5M16 12h4" />
  </Icon>
)

export const TableIcon: IconComponent = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
    <path d="M3.5 9.5h17M3.5 14.5h17M9.5 4.5v15" />
  </Icon>
)

export const MicIcon: IconComponent = (p) => (
  <Icon {...p}>
    <rect x="9" y="3.5" width="6" height="11" rx="3" />
    <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" />
  </Icon>
)

export const FullScreenIcon: IconComponent = (p) => (
  <Icon {...p}>
    <path d="M4 8.5v-4h4M16 4.5h4v4M20 15.5v4h-4M8 19.5H4v-4" />
  </Icon>
)

export const RemoteIcon: IconComponent = (p) => (
  <Icon {...p}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </Icon>
)
