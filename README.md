# lamp-bible-web

Marketing site and documentation for [Lamp Bible](https://apps.apple.com/us/app/lamp-bible/id6476050185), built with Next.js (App Router) and Tailwind CSS v4.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  page.tsx            Landing page
  privacy/            Privacy policy
  docs/               Documentation, one directory per page
    layout.tsx        Sidebar + content shell
components/
  SiteHeader.tsx      Shared header
  SiteFooter.tsx      Shared footer
  docs/DocPage.tsx    Doc page shell, Callout and Table helpers
  docs/DocsSidebar.tsx
lib/
  site.ts             Site metadata and platform availability
  docs-nav.ts         Docs sidebar structure and page ordering
```

### Adding a documentation page

1. Create `app/docs/<slug>/page.tsx` exporting `metadata` and a default component wrapped in `<DocPage>`.
2. Add the page to `docsNav` in `lib/docs-nav.ts`. That single entry drives the sidebar, the docs index cards, and the previous/next links at the foot of each page.

Doc body content is plain markup — `h2`, `p`, `ul`, `pre`, `table` — styled by the `.doc` rules in `app/globals.css`. Wrap tables in the `<Table>` helper so wide content scrolls inside its own container.

### Theming

Colours are CSS custom properties defined in `app/globals.css`, with a `prefers-color-scheme` block for dark mode. Semantic utilities (`text-muted`, `border-line`, `bg-raised`, …) map onto those variables, so there are no `dark:` variants to keep in sync.

## Module assets

The site publishes the JSON Schemas, SQLite table definitions and a working sample module of every
type, under `public/modules/`. These are committed, so the build never needs the private
`lamp-bible-modules` repo.

```bash
npm run sync:modules     # copy schemas from a local lamp-bible-modules checkout
npm run check:modules    # report drift; exits 1 if the copies are stale
npm run build:samples    # regenerate and verify the sample .lamp modules
```

### Keeping the copies honest

`scripts/sync-module-assets.mjs` copies `schemas/*.json` out of a local checkout of the private
repo and writes `public/modules/manifest.json`, recording the source commit and a SHA-256 for every
file. `--check` compares three things and fails if any has moved:

1. upstream schemas against the recorded hashes,
2. the committed copies against the recorded hashes (catches hand-edits),
3. the converter scripts the docs are *derived* from — the SQLite DDL on `/docs/modules/building` is
   transcribed out of them, so a change upstream flags the prose as needing review even though no
   file is copied.

It looks for the repo at `../lamp-bible-modules`, overridable with `LAMP_MODULES_REPO` or
`--source`. If the repo is absent it prints a note and exits 0, so it is safe to run anywhere.

Run `npm run check:modules` before a release; run `npm run sync:modules` when it complains.

### Sample modules

`scripts/build_sample_modules.py` builds one small `.lamp` of each module type, plus the source JSON
and the DDL, using only the Python standard library. It doubles as the reference implementation the
docs walk through, so it is written to be read.

`scripts/verify_sample_modules.py` decompresses each result, runs `PRAGMA integrity_check`, queries
it, and asserts that every annotation and highlight offset still covers the text it claims. Offsets
are the one thing that can be wrong in a file that otherwise looks perfect, so they are checked
rather than trusted.

### Platform availability

`lib/site.ts` holds the platform list. Flipping a platform from `planned` to `available` and giving it an `href` updates the hero, the download section and the FAQ together.

## Deployment

Deployed on Vercel. Pushes to `main` deploy automatically.
