export const site = {
  name: 'Lamp Bible',
  tagline: 'A Bible reading companion you own.',
  description:
    'A study-grade Bible reader with reading plans, notes, devotionals, highlights, lexicons and commentaries — all offline, all yours, in an open module format.',
  url: 'https://lampbible.com',
  appStoreUrl: 'https://apps.apple.com/us/app/lamp-bible/id6476050185',
  issuesUrl: 'https://github.com/mattsbennett/lamp-bible-ios/issues',
  appPrivacyUrl: 'https://lampbible.com/privacy/apps',
  websitePrivacyUrl: 'https://lampbible.com/privacy/website',
  contentLicencesUrl: 'https://lampbible.com/content-licences',
  softwareLicencesUrl: 'https://lampbible.com/software-licences',
  email: 'lampbibleapp[at]gmail[dot]com',
} as const

export type MacRelease = {
  /** CFBundleShortVersionString (MARKETING_VERSION). */
  version: string
  /**
   * CFBundleVersion (CURRENT_PROJECT_VERSION). Sparkle compares this, not `version`, to decide
   * whether an update is newer — it must increase with every release.
   */
  build: string
  /** ISO date, e.g. '2026-10-01'. */
  releasedAt: string | null
  /**
   * Where the signed, notarized .dmg is hosted. Null until the first public build — every
   * Mac download link and the update feed stay empty until this is set. The host must serve
   * the file as a download (GitHub Releases does; object storage needs
   * Content-Disposition: attachment).
   */
  url: string | null
  /** Exact byte length of the .dmg; `sign_update` prints it as `length`. */
  lengthBytes: number | null
  /** Sparkle EdDSA signature of the .dmg; `sign_update` prints it as `sparkle:edSignature`. */
  edSignature: string | null
  sha256: string | null
  minimumOS: string
  /** LSMinimumSystemVersion form of `minimumOS`, for the update feed. */
  minimumSystemVersion: string
  architectures: string
}

/**
 * The Mac app runs without the App Sandbox, so it ships as a direct download rather than
 * through the Mac App Store. Publishing a release means updating this object: it drives the
 * download pages and the Sparkle update feed at /appcast.xml.
 */
export const macRelease: MacRelease = {
  version: '0.1.0',
  build: '1',
  releasedAt: null,
  url: null,
  lengthBytes: null,
  edSignature: null,
  sha256: null,
  minimumOS: 'macOS 15 Sequoia or later',
  minimumSystemVersion: '15.0',
  architectures: 'Apple silicon and Intel',
}

/** '184 MB', derived from the exact byte length so the two can't disagree. */
export const macDownloadSize =
  macRelease.lengthBytes === null ? null : `${Math.round(macRelease.lengthBytes / 1_000_000)} MB`

export const downloadPaths = {
  /** Every platform, and the target of the header's Download button. */
  page: '/download',
  /** Starts the Mac download and explains installation. Link here, not to the file. */
  mac: '/download/mac',
  /** Stable permalink that redirects to the current .dmg, for release notes and READMEs. */
  macLatest: '/download/mac/latest',
} as const

export type PlatformStatus = 'available' | 'planned'

export type Platform = {
  id: string
  name: string
  status: PlatformStatus
  /** Where "Download" points. Undefined for platforms that aren't shipping yet. */
  href?: string
  note: string
}

export const isMacAvailable = macRelease.url !== null

/**
 * Platform availability drives the download section and any "works on" copy.
 * macOS becomes available when `macRelease.url` is set.
 */
export const platforms: Platform[] = [
  {
    id: 'ios',
    name: 'iPhone & iPad',
    status: 'available',
    href: site.appStoreUrl,
    note: 'Available on the App Store.',
  },
  {
    id: 'macos',
    name: 'Mac',
    status: isMacAvailable ? 'available' : 'planned',
    href: isMacAvailable ? downloadPaths.mac : undefined,
    note: isMacAvailable ? 'Direct download, signed and notarized by Apple.' : 'In development.',
  },
]

export const availablePlatforms = platforms.filter((p) => p.status === 'available')
export const plannedPlatforms = platforms.filter((p) => p.status === 'planned')
