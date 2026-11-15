import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { docsNav } from '@/lib/docs-nav'
import { uniqueSlugger } from '@/lib/slug'

/** One thing the docs search can find: a page, or a heading within one. */
export type DocsEntry = {
  /** The page's title, and the heading's words where this is a heading. */
  page: string
  heading?: string
  href: string
  /** What the result says under its title. */
  detail: string
  /** The sidebar section the page sits in. */
  section: string
}

const ENTITIES: Record<string, string> = { apos: '’', quot: '"', amp: '&', lt: '<', gt: '>', nbsp: ' ' }

/** A heading's words as they render: tags dropped, `{' '}` and entities read as text. */
function plain(jsx: string) {
  return jsx
    .replace(/\{\s*'([^']*)'\s*\}/g, '$1')
    .replace(/\{[^}]*\}/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&(\w+);/g, (match, name) => ENTITIES[name] ?? match)
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Every docs page and every heading in one, read from the pages' source at build time, so the
 * search never drifts from what the pages say. Headings get the ids `DocPage` gives them.
 */
export function docsIndex(): DocsEntry[] {
  const entries: DocsEntry[] = []
  for (const section of docsNav) {
    for (const link of section.links) {
      entries.push({ page: link.title, href: link.href, detail: link.summary, section: section.title })
      if (link.href === '/docs') continue
      let source: string
      try {
        source = readFileSync(join(process.cwd(), 'app', link.href, 'page.tsx'), 'utf8')
      } catch {
        continue
      }
      const slug = uniqueSlugger()
      for (const match of source.matchAll(/<h([23])(?:\s+id="([^"]+)")?\s*>([\s\S]*?)<\/h\1>/g)) {
        const heading = plain(match[3])
        if (!heading) continue
        entries.push({
          page: link.title,
          heading,
          href: `${link.href}#${slug(heading, match[2])}`,
          detail: link.title,
          section: section.title,
        })
      }
    }
  }
  return entries
}
