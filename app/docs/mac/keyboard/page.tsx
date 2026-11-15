import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Keyboard shortcuts',
  description:
    'Every keyboard shortcut in Lamp Bible for Mac: moving through scripture, tabs and windows, the study column, writing, modules, books and presenting.',
}

function Keys({ rows }: { rows: Array<[action: React.ReactNode, keys: string]> }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Action</th>
          <th>Keys</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([action, keys]) => (
          <tr key={keys}>
            <td>{action}</td>
            <td>{keys}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default function Page() {
  return (
    <DocPage
      href="/docs/mac/keyboard"
      title="Keyboard shortcuts"
      intro="The Mac app’s shortcuts, by where you use them. Each also appears beside its command in the menu bar."
    >
      <h2>Moving through scripture</h2>
      <Keys
        rows={[
          ['Previous / next chapter (or plan reading)', '⌘[ / ⌘]'],
          ['Previous / next book', '⇧⌘[ / ⇧⌘]'],
          ['Back / forward in reading history', '⌥⌘[ / ⌥⌘]'],
          ['Go to a passage, or search', '⌘L'],
          ['Go to Anything', '⌘K'],
          ['Larger / smaller text', '⌘+ / ⌘−'],
        ]}
      />

      <h2>Tabs and windows</h2>
      <Keys
        rows={[
          ['New tab, in the reader or Search', '⌘T'],
          ['Next / previous tab', '⌃Tab / ⌃⇧Tab'],
          ['New reader window', '⌥⌘N'],
        ]}
      />

      <h2>Beside the text</h2>
      <Keys
        rows={[
          ['Study tools', '⇧⌘I'],
          ['Link study tool scrolling', '⇧⌘L'],
          [
            <>
              Reader Chat, with <Link href="/docs/ai">AI features</Link> on
            </>,
            '⇧⌘J',
          ],
        ]}
      />

      <h2>Writing</h2>
      <Keys
        rows={[
          ['New writing', '⇧⌘N'],
          ['Save now', '⌘S'],
          ['Find / find and replace', '⌘F / ⌥⌘F'],
          ['New presentation deck', '⌥⇧⌘N'],
        ]}
      />

      <h2>Library and books</h2>
      <Keys
        rows={[
          ['Install module / import personal study data', '⌘O / ⌥⌘O'],
          ['Import or Create Content', '⇧⌘M'],
          ['Previous / next section in a book', '⌥⌘← / ⌥⌘→'],
        ]}
      />

      <h2>Presenting</h2>
      <p>
        While a deck plays full screen — see <Link href="/docs/presenting">Slides &amp; presenting</Link>:
      </p>
      <Keys
        rows={[
          ['Go forward', '→, ↓, Page Down, Space, Return, or click'],
          ['Go back', '←, ↑, Page Up, ⇧Space or Delete'],
          ['First / last slide', 'Home / End'],
          ['Black the screen', 'B or .'],
          ['Stop', 'Esc'],
        ]}
      />
    </DocPage>
  )
}
