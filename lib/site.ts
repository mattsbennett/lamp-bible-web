export const site = {
  name: 'Lamp Bible',
  tagline: 'A Bible reading companion you own.',
  description:
    'A study-grade Bible reader with reading plans, notes, devotionals, highlights, lexicons and commentaries — all offline, all yours, in an open module format.',
  url: 'https://lampbible.app',
  appStoreUrl: 'https://apps.apple.com/us/app/lamp-bible/id6476050185',
  issuesUrl: 'https://github.com/mattsbennett/lamp-bible-ios/issues',
  modulesRepoUrl: 'https://github.com/mattsbennett/lamp-bible-modules',
  email: 'lampbibleapp[at]gmail[dot]com',
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

/**
 * Platform availability drives the download section and any "works on" copy.
 * Adding macOS at launch is a one-line status change here.
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
    status: 'planned',
    note: 'In development.',
  },
]

export const availablePlatforms = platforms.filter((p) => p.status === 'available')
export const plannedPlatforms = platforms.filter((p) => p.status === 'planned')
