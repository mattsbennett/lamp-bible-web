/**
 * A heading's anchor, made from its words: the same rule for the ids a page
 * gives its headings and for the search index that links to them, so the two
 * cannot disagree.
 */
export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Ids for headings in reading order, numbering any that repeat ("notes", "notes-2"). A heading
 * that names its own id keeps it.
 */
export function uniqueSlugger() {
  const seen = new Map<string, number>()
  return (text: string, id?: string) => {
    const base = id || slugify(text) || 'section'
    if (id) {
      seen.set(base, (seen.get(base) ?? 0) + 1)
      return id
    }
    const count = (seen.get(base) ?? 0) + 1
    seen.set(base, count)
    return count === 1 ? base : `${base}-${count}`
  }
}
