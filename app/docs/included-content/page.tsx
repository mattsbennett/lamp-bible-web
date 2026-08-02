import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'What ships in the app',
  description:
    'The translations, lexicons, cross-references and reading plans included with a fresh Lamp Bible install.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/included-content"
      title="What ships in the app"
      intro="Everything below is bundled with the download, available offline from first launch, and free."
    >
      <h2>Translations</h2>
      <p>
        Six public-domain translations. Identifiers ending in <code>s</code> carry Strong’s numbers
        on individual words, which is what enables tap-to-lexicon lookups.
      </p>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Translation</th>
            <th>Strong’s</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>BSBs</code>
            </td>
            <td>Berean Standard Bible</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <code>KJVs</code>
            </td>
            <td>King James Version</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <code>ASVs</code>
            </td>
            <td>American Standard Version</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <code>WEBs</code>
            </td>
            <td>World English Bible</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <code>YLT</code>
            </td>
            <td>Young’s Literal Translation</td>
            <td>—</td>
          </tr>
          <tr>
            <td>
              <code>BBE</code>
            </td>
            <td>Bible in Basic English</td>
            <td>—</td>
          </tr>
        </tbody>
      </Table>

      <p>
        The Berean Standard Bible is the default. Translations you do not use can be hidden from the
        picker in Settings without uninstalling them.
      </p>

      <h2>Lexicons</h2>

      <Table>
        <thead>
          <tr>
            <th>Lexicon</th>
            <th>Language</th>
            <th>Approx. entries</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Strong’s Hebrew Dictionary</td>
            <td>Hebrew</td>
            <td>8,700</td>
          </tr>
          <tr>
            <td>Strong’s Greek Dictionary</td>
            <td>Greek</td>
            <td>5,600</td>
          </tr>
          <tr>
            <td>Brown-Driver-Briggs, unabridged</td>
            <td>Hebrew</td>
            <td>10,000</td>
          </tr>
          <tr>
            <td>Dodson Greek Lexicon</td>
            <td>Greek</td>
            <td>5,500</td>
          </tr>
        </tbody>
      </Table>

      <p>
        A Strong’s-to-BDB mapping is included so that Hebrew lookups reach the fuller BDB article,
        including where one Strong’s number resolves to several BDB entries. See{' '}
        <Link href="/docs/lexicons">Lexicons</Link>.
      </p>

      <h2>Cross-references</h2>
      <p>
        An enhanced Treasury of Scripture Knowledge, covering effectively every verse in the Bible.
        References can be sorted by relevance or canonically, and each one is a link into the
        reader.
      </p>

      <h2>Reading plans</h2>

      <Table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Audience</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Bible Companion</td>
            <td>Adults — three readings a day, OT once and NT twice a year</td>
          </tr>
          <tr>
            <td>Children’s Bible Companion: Junior</td>
            <td>Roughly ages 7–9</td>
          </tr>
          <tr>
            <td>Children’s Bible Companion: Intermediate</td>
            <td>Roughly ages 10–12</td>
          </tr>
        </tbody>
      </Table>

      <p>
        Companion quiz content is available for plan readings, graded by age group. See{' '}
        <Link href="/docs/reading-plans">Reading plans</Link>.
      </p>

      <h2>What is not included</h2>
      <p>
        Modern translations — NIV, ESV, NASB, NKJV and the rest — are under copyright and are not
        distributed with the app. The same applies to most commercial commentary series and study
        dictionaries.
      </p>

      <Callout title="You can still add them">
        <p>
          The <Link href="/docs/modules">module system</Link> is open, so content you hold the
          rights to can be converted and installed. That is a matter between you and the licence you
          bought; the app simply reads whatever module you give it.
        </p>
      </Callout>
    </DocPage>
  )
}
