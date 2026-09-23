import { macRelease, site } from '@/lib/site'

/*
 * The Sparkle update feed the Mac app polls (SUFeedURL in its Info.plist). It lists only the
 * current release, built from the same `macRelease` object as the download pages. Until a
 * release is fully described the channel is empty, which Sparkle reads as "no update".
 */

export const dynamic = 'force-static'

const feedUrl = `${site.url}/appcast.xml`

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function releaseItem(): string {
  const { url, lengthBytes, edSignature, releasedAt } = macRelease
  if (!url || lengthBytes === null || !edSignature || !releasedAt) return ''

  const pubDate = new Date(`${releasedAt}T00:00:00Z`).toUTCString()
  return `
    <item>
      <title>Version ${escapeXml(macRelease.version)}</title>
      <pubDate>${pubDate}</pubDate>
      <sparkle:version>${escapeXml(macRelease.build)}</sparkle:version>
      <sparkle:shortVersionString>${escapeXml(macRelease.version)}</sparkle:shortVersionString>
      <sparkle:minimumSystemVersion>${escapeXml(macRelease.minimumSystemVersion)}</sparkle:minimumSystemVersion>
      <enclosure url="${escapeXml(url)}" length="${lengthBytes}" type="application/octet-stream" sparkle:edSignature="${escapeXml(edSignature)}" />
    </item>`
}

export function GET() {
  const body = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle">
  <channel>
    <title>${escapeXml(site.name)} for Mac</title>
    <link>${feedUrl}</link>
    <description>Updates for ${escapeXml(site.name)} for Mac.</description>
    <language>en</language>${releaseItem()}
  </channel>
</rss>
`
  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // A new release reaches the CDN edge within ten minutes.
      'Cache-Control': 'public, max-age=0, s-maxage=600',
    },
  })
}
