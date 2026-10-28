import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Bundled content',
  description:
    'The translations, lexicons, cross-references and reading plans in Lamp Bible, with their release status.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/included-content"
      title="Bundled content"
      intro="The offline library in the current release: five translations, four lexicons, two cross-reference sets, three reading plans and a quiz module."
    >
      <h2>Translations</h2>
      <p>
        The translations use several different rights bases rather than one blanket public-domain
        claim. Identifiers ending in <code>s</code> carry Strong’s numbers on individual words,
        which is what enables tap-to-lexicon lookups.
      </p>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Translation</th>
            <th>Strong’s</th>
            <th>Rights basis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>BSBs</code>
            </td>
            <td>Berean Standard Bible</td>
            <td>Yes</td>
            <td>CC0 1.0</td>
          </tr>
          <tr>
            <td>
              <code>KJVs</code>
            </td>
            <td>CrossWire King James Version v3.1</td>
            <td>Yes</td>
            <td>Any-purpose grant/GPL source record</td>
          </tr>
          <tr>
            <td>
              <code>ASVs</code>
            </td>
            <td>American Standard Version</td>
            <td>Yes</td>
            <td>Public domain</td>
          </tr>
          <tr>
            <td>
              <code>WEBs</code>
            </td>
            <td>World English Bible</td>
            <td>Yes</td>
            <td>Public domain; trademark notice</td>
          </tr>
          <tr>
            <td>
              <code>YLT</code>
            </td>
            <td>Young’s Literal Translation</td>
            <td>—</td>
            <td>Public domain</td>
          </tr>
        </tbody>
      </Table>

      <p>
        The Berean Standard Bible is the default. Translations you do not use can be hidden from the
        picker in Settings without uninstalling them. See <Link href="/content-licences">Content
        licences</Link> for sources, versions, notices and links to the governing terms.
      </p>

      <Callout title="Upgrading from version 1.0">
        <p>
          Earlier releases also carried plain-text <code>BBE</code> and <code>KJV</code>. BBE is
          retired, and plain KJV is superseded by <code>KJVs</code>, the same translation with
          Strong&apos;s numbers and morphology. If your reader was set to either, the update opens
          BSB instead; choose <code>KJVs</code> from the translation picker to go back to the KJV.
        </p>
      </Callout>

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
            <td>5,500</td>
          </tr>
          <tr>
            <td>Brown-Driver-Briggs, unabridged</td>
            <td>Hebrew</td>
            <td>10,000</td>
          </tr>
          <tr>
            <td>Dodson Greek Lexicon</td>
            <td>Greek</td>
            <td>5,400</td>
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
        The Treasury of Scripture Knowledge, Enhanced v1.2 is distributed under Timothy S.
        Morton&apos;s permission terms. Lamp Bible also adapts the OpenBible.info cross-reference
        dataset under CC BY 4.0. Both appear as commentary series in the reader’s tool panel, and
        each reference is a link into the reader. Full notices are under{' '}
        <Link href="/content-licences">Content licences</Link>.
      </p>

      <h2>Reading plans</h2>

      <Table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Audience</th>
            <th>New releases</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Bible Companion</td>
            <td>Adults — three readings a day, OT once and NT twice a year</td>
            <td>Included — public domain</td>
          </tr>
          <tr>
            <td>Children’s Bible Companion: Junior</td>
            <td>Roughly ages 7–9</td>
            <td>Included — public domain</td>
          </tr>
          <tr>
            <td>Children’s Bible Companion: Intermediate</td>
            <td>Roughly ages 10–12</td>
            <td>Included — public domain</td>
          </tr>
        </tbody>
      </Table>

      <p>
        The Bible Companion quizzes — 27,375 questions across five age groups, from young children
        to adults — are included. Their identified
        ESV-specific wording was replaced through a reviewed, targeted process using the CC0 Berean
        Standard Bible; the questions were not wholesale regenerated. See{' '}
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
          The <Link href="/docs/modules">module system</Link> is open, so you can convert content
          when its licence permits you to make that copy. Installing a module privately and sharing
          it with others are separate acts; sharing requires redistribution rights too.
        </p>
      </Callout>
    </DocPage>
  )
}
