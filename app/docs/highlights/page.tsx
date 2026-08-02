import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Highlights',
  description:
    'Four highlight styles, custom colours, multiple sets per translation, and named themes that record what each colour means.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/highlights"
      title="Highlights"
      intro="Character-precise marking, organised into sets, with names attached to what your colours mean."
    >
      <h2>Styles</h2>
      <p>A highlight has both a colour and a style. There are four styles:</p>

      <Table>
        <thead>
          <tr>
            <th>Style</th>
            <th>Appearance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Highlight</td>
            <td>Filled background behind the text</td>
          </tr>
          <tr>
            <td>Underline</td>
            <td>Solid rule beneath the text</td>
          </tr>
          <tr>
            <td>Dashed</td>
            <td>Dashed underline</td>
          </tr>
          <tr>
            <td>Dotted</td>
            <td>Dotted underline</td>
          </tr>
        </tbody>
      </Table>

      <p>
        Because style and colour are independent, the same colour can carry two distinct meanings —
        a solid red underline and a red fill are different marks.
      </p>

      <h2>Colours</h2>
      <p>
        Colours are stored as hex values, so you are not limited to a fixed palette. The set of
        colours shown in the reader’s inline strip, and the order they appear in, is configured in
        Settings. Colours you use often go first; the rest fold into an overflow control.
      </p>

      <h2>Precision</h2>
      <p>
        Highlights record character offsets within a verse, not whole verses. You can mark three
        words in the middle of a sentence and nothing else.
      </p>

      <Callout title="Why highlights belong to a translation">
        <p>
          Since a highlight is a character range in a specific wording, it cannot be transplanted to
          a translation that words the verse differently. Each highlight set therefore belongs to
          one translation. Switching translations shows the highlights for that translation.
        </p>
      </Callout>

      <h2>Sets</h2>
      <p>
        A highlight set is a named collection of highlights for one translation — and it is a{' '}
        <Link href="/docs/modules">module</Link> like everything else. That means you can keep more
        than one: a personal set and a set for a class you teach, a set for a study series you are
        working through. Sets can be created, renamed, exported and imported independently.
      </p>

      <h2>Themes: naming what a colour means</h2>
      <p>
        A theme attaches a name and optional description to a colour-and-style combination within a
        set. “Yellow fill” becomes <em>Promises</em>. “Blue dotted underline” becomes{' '}
        <em>Questions to come back to</em>.
      </p>
      <p>This is worth doing for two reasons:</p>
      <ul>
        <li>
          It survives you. Six months on, you will not remember the scheme you invented; the app
          will.
        </li>
        <li>
          It makes colour a search key. Filtering{' '}
          <Link href="/docs/search">search</Link> by that colour returns every passage you marked
          with it — an index of your own reading, built as a side effect of marking the text.
        </li>
      </ul>
      <p>
        Themes are managed per set, with a live preview of how the colour and style combination will
        look against verse text.
      </p>

      <h2>Portability</h2>
      <p>
        Highlight sets export as <code>.lamp</code> modules containing the verse references,
        character offsets, styles, colours and theme names. Import brings the whole set in, themes
        included. If your sync method is iCloud Drive or WebDAV, sets sync automatically along with
        your other editable content — see <Link href="/docs/sync">Sync &amp; backup</Link>.
      </p>
    </DocPage>
  )
}
