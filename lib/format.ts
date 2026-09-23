/** '2026-10-01' → '1 October 2026'. Null for a missing or unparseable date. */
export function formatReleaseDate(iso: string | null): string | null {
  if (!iso) return null
  const date = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
