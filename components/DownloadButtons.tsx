import Image from 'next/image'
import Link from 'next/link'
import { downloadPaths, site } from '@/lib/site'

/*
 * The Mac app is not on the Mac App Store, so Apple's badge and logo are off-limits for it.
 * This button borrows the badge's shape and two-line label instead, so it sits level with
 * the App Store badge beside it.
 */

const sizes = {
  md: { height: 'h-[53px]', badge: { width: 160, height: 53 } },
  lg: { height: 'h-[57px]', badge: { width: 172, height: 57 } },
}

type Size = keyof typeof sizes

export function LaptopIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4.5" width="16" height="11" rx="1.5" />
      <path d="M2 18.5h20" />
    </svg>
  )
}

export function MacDownloadButton({ size = 'md' }: { size?: Size }) {
  return (
    <Link
      href={downloadPaths.mac}
      className={`${sizes[size].height} inline-flex items-center gap-3 rounded-[10px] bg-accent pl-4 pr-5 text-white transition-opacity hover:opacity-90`}
    >
      <LaptopIcon className="size-7 shrink-0" />
      <span className="flex flex-col text-left leading-none">
        <span className="text-[11px] font-medium opacity-85">Download for</span>
        <span className="mt-1 text-[19px] font-semibold tracking-tight">Mac</span>
      </span>
    </Link>
  )
}

export function AppStoreBadge({ size = 'md', priority }: { size?: Size; priority?: boolean }) {
  const { width, height } = sizes[size].badge
  return (
    <a href={site.appStoreUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
      <Image
        src="/appstore.svg"
        alt="Download on the App Store"
        width={width}
        height={height}
        priority={priority}
      />
    </a>
  )
}
