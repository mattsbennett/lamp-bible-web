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

### Platform availability

`lib/site.ts` holds the platform list. Flipping a platform from `planned` to `available` and giving it an `href` updates the hero, the download section and the FAQ together.

## Deployment

Deployed on Vercel. Pushes to `main` deploy automatically.
