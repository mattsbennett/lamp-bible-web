import type { Metadata } from 'next'
import Link from 'next/link'
import { Platform } from '@/components/docs/Platform'
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
      intro="Highlight words or verses, organise highlights into sets and name colours by topic."
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
        Colours are stored as hex values, so you are not limited to a fixed palette, and your
        palette syncs with your settings.
      </p>

      <h2>Precision</h2>
      <p>
        You can highlight any part of a verse, from a single character to the whole verse.
      </p>

      <Callout title="Why highlights belong to a translation">
        <p>
          Highlights refer to exact character positions in a translation, so each set belongs to
          one translation. Switching translations shows that translation’s highlights.
        </p>
      </Callout>

      <h2>Sets</h2>
      <p>
        A highlight set groups highlights for one translation in a{' '}
        <Link href="/docs/modules">module</Link>. Keep separate sets for personal study, classes
        or study series. Your first highlight in a translation creates its first set, and new
        highlights go into the set you have chosen as the active one.
      </p>

      <h2>Themes: naming what a colour means</h2>
      <p>
        A theme attaches a name and optional description to a colour-and-style combination within a
        set. “Yellow fill” becomes <em>Promises</em>. “Blue dotted underline” becomes{' '}
        <em>Questions to come back to</em>.
      </p>
      <p>Use themes to organise your highlights:</p>
      <ul>
        <li>
          Names record what each colour and style represents.
        </li>
        <li>
          Filter{' '}
          <Link href="/docs/search">search</Link> by colour to find passages you marked with it.
        </li>
      </ul>
      <p>
        Themes belong to the active set, so a class set and a personal set can mean different
        things by the same colour.
      </p>

      <Platform only="ios">
        <h2>On iPhone and iPad</h2>
        <p>
          Tap a verse number to highlight the whole verse, or select any span of text and choose
          Highlight. The highlight controls in the reader’s menu start with yellow, green, blue and
          pink; <strong>+</strong> adds any colour from the system colour picker. Drag colours to
          put the ones you use most first — the rest fold into an overflow control — and long-press
          one to remove it. The same controls choose the active set; the module manager creates,
          renames and deletes sets.
        </p>
        <p>
          To add a theme, long-press a colour in the highlight controls and choose{' '}
          <strong>Add Theme</strong>; the name then shows under that colour.
        </p>
      </Platform>

      <Platform only="mac">
        <h2>On the Mac</h2>
        <p>
          Right-click a verse to highlight it. To highlight part of a verse, choose{' '}
          <strong>Highlight Words…</strong>, then a set, style and colour or a theme. You can also
          save a new theme here. Existing highlights each have a <strong>Remove</strong> button.{' '}
          <strong>Delete Set…</strong> deletes the set and all its highlights across translations.{' '}
          <strong>Remove Highlight</strong> in a verse’s menu clears your highlights on that verse,
          leaving installed module highlights intact.
        </p>
        <p>
          The study column’s Notes tab shows the selected verse’s highlights and lists the
          chapter’s highlights to go to. Its <strong>Study Data</strong> menu exports a
          translation’s highlights as JSON or a <code>.lamp</code> module, and imports them back.
        </p>
      </Platform>

      <h2>Portability</h2>
      <p>
        Exported <code>.lamp</code> files include the set’s verse references, character ranges,
        styles, colours and themes. Installing the file imports the complete set. Each set syncs
        as a separate file through iCloud Drive or WebDAV. See{' '}
        <Link href="/docs/sync">Sync &amp; backup</Link>.
      </p>
    </DocPage>
  )
}
