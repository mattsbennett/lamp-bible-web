import type { DownloadFile } from '@/lib/module-downloads'

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="size-3.5 shrink-0 opacity-60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v8m0 0 3-3m-3 3L5 7M2.5 11.5v1a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5v-1" />
    </svg>
  )
}

/** A row of downloadable files, used throughout the module documentation. */
export function DownloadList({ files }: { files: DownloadFile[] }) {
  return (
    <ul className="grid list-none gap-2 p-0 sm:grid-cols-2">
      {files.map((f) => (
        <li key={f.href}>
          <a
            href={f.href}
            download
            className="flex items-center gap-2.5 rounded-lg border border-line bg-raised px-3.5 py-2.5 text-sm no-underline transition-colors hover:border-line-strong"
          >
            <DownloadIcon />
            <span className="min-w-0 flex-1 truncate font-mono text-[0.82rem]">{f.label}</span>
            <span className="shrink-0 text-xs text-faint">{f.size}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
