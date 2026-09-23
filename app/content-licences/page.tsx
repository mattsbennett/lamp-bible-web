import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Content licences',
  description:
    'Sources, copyright status, licences, notices and downloads for content bundled with Lamp Bible.',
}

const externalProps = { target: '_blank', rel: 'noopener noreferrer' } as const

export default function ContentLicences() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
        <header className="border-b border-line pb-8">
          <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">Content licences</h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">
            The exact sources and distribution terms for the library bundled with Lamp Bible.
          </p>
          <p className="mt-3 text-sm text-faint">Last reviewed August 12, 2026.</p>
        </header>

        <div className="doc mt-10">
          <Callout title="Public domain is not the only category">
            <p>
              Some bundled works are public domain; others are distributed under an open or
              permission-based licence. The terms and source record for each work control. Lamp
              Bible&apos;s software and module format do not change the rights in the underlying
              content.
            </p>
          </Callout>

          <Callout title="Live app and replacement bundle">
            <p>
              The current live Apple app already includes plain-text BBE and KJV, without
              Strong&apos;s or morphology data. BBE has been retired and will be removed in the next
              release, with BSB as its recommended replacement. The upcoming bundle includes both
              plain <code>KJV</code> and CrossWire-enhanced <code>KJVs</code>; both are unavailable for
              United Kingdom and unresolved App Store storefronts.
            </p>
          </Callout>

          <h2>Translations</h2>
          <Table>
            <thead>
              <tr>
                <th>Module</th>
                <th>Source and version</th>
                <th>Rights basis</th>
                <th>Release status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>ASVs</code> — American Standard Version</td>
                <td>CrossWire SWORD module v2.0</td>
                <td>Public domain</td>
                <td>Cleared</td>
              </tr>
              <tr>
                <td><code>BBE</code> — Bible in Basic English</td>
                <td>Legacy live-app plain text; historical CrossWire SWORD v1.3 record</td>
                <td>Retired by product decision; historical source asserts US public-domain status</td>
                <td>Present in legacy live app; removed from the next release</td>
              </tr>
              <tr>
                <td><code>BSBs</code> — Berean Standard Bible</td>
                <td>Official Strong&apos;s USFM archive, obtained August 12, 2026</td>
                <td>
                  <a href="https://creativecommons.org/publicdomain/zero/1.0/" {...externalProps}>CC0 1.0</a>{' '}
                  public-domain dedication
                </td>
                <td>Cleared</td>
              </tr>
              <tr>
                <td><code>KJV</code> — King James Version, plain text</td>
                <td>Scrollmapper <code>t_kjv.json</code>, commit <code>7dce14a</code>; edition not identified by source</td>
                <td>Base Authorized Version; treated as public domain outside the UK</td>
                <td>Included; unavailable for UK and unresolved storefronts</td>
              </tr>
              <tr>
                <td><code>KJVs</code> — King James Version with Strong&apos;s and morphology</td>
                <td>CrossWire KJV module v3.1</td>
                <td>CrossWire any-purpose grant; source metadata also labels it GPL; UK Crown rights apply to the base text</td>
                <td>Included; unavailable for UK and unresolved storefronts</td>
              </tr>
              <tr>
                <td><code>WEBs</code> — World English Bible</td>
                <td>World English Bible source text</td>
                <td>Public domain; “World English Bible” is an eBible.org trademark</td>
                <td>Cleared</td>
              </tr>
              <tr>
                <td><code>YLT</code> — Young&apos;s Literal Translation</td>
                <td>CrossWire SWORD module v1.1, 1898 edition</td>
                <td>Public domain</td>
                <td>Cleared</td>
              </tr>
            </tbody>
          </Table>

          <p>
            The Berean Bible project confirms that its texts were placed in the public domain on
            April 30, 2023; see its{' '}
            <a href="https://berean.bible/licensing.htm" {...externalProps}>licensing page</a>.
            The World English Bible&apos;s dedication and trademark request are on its{' '}
            <a href="https://ebible.org/eng-web/copyright.htm" {...externalProps}>copyright page</a>.
          </p>

          <h3>Bible in Basic English retirement</h3>
          <p>
            BBE was retired on August 9, 2026. It will not be included in the replacement bundle or
            offered as a standalone Lamp Bible download. The CC0 Berean Standard Bible is the
            recommended modern-language replacement.
          </p>

          <h3>Plain-text KJV</h3>
          <p>
            The current live Apple app&apos;s KJV is plain text without Strong&apos;s or morphology. Its
            immediate electronic source is Scrollmapper&apos;s{' '}
            <a href="https://github.com/scrollmapper/bible_databases/blob/7dce14ad7b94561943d42e02e93eed9b35bffb9a/json/t_kjv.json" {...externalProps}>
              <code>json/t_kjv.json</code> at commit <code>7dce14a</code>
            </a>
            . The source calls it King James Version but does not identify a specific print or
            electronic edition. The upcoming app makes this first-party bundled edition unavailable
            for UK and unresolved App Store storefronts.
          </p>

          <h3>CrossWire KJV v3.1 notice</h3>
          <p>
            The source module states that any copyright in CrossWire&apos;s digital work is held by
            CrossWire Bible Society © 2003–2023 and grants a general public licence to use the text
            for any purpose. Version 3.1 labels its distribution licence “GPL.” Its modern OSIS
            markup and New Testament Strong&apos;s tagging are CrossWire work. The base Authorized
            Version remains subject to Crown rights in the United Kingdom. Lamp Bible relies on the
            express any-purpose grant for its converted <code>KJVs</code> content while preserving the
            module&apos;s GPL label rather than calling the enhanced dataset public domain.
          </p>
          <p>
            Lamp Bible converted the SWORD representation to Lamp translation JSON and then to its
            bundled SQLite database. This changes the container and annotation representation, not
            the intended biblical wording. The exact input archive and conversion script are in the{' '}
            <a href="https://github.com/mattsbennett/lamp-bible-modules" {...externalProps}>
              public Lamp Bible modules repository
            </a>
            ; full contributor provenance and original OSIS source are linked from the{' '}
            <a href="https://wiki.crosswire.org/CrossWire_KJV" {...externalProps}>CrossWire KJV project</a>.
            The upcoming app makes both first-party bundled KJV editions unavailable for UK and
            unresolved App Store storefronts. Lamp Bible does not offer either edition as a
            standalone website download.
          </p>

          <h2>Lexicons</h2>
          <Table>
            <thead>
              <tr>
                <th>Module</th>
                <th>Source</th>
                <th>Rights basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Strong&apos;s Hebrew Dictionary</td>
                <td>James Strong, 1890; CrossWire/Open Scriptures data</td>
                <td>Public domain</td>
              </tr>
              <tr>
                <td>Strong&apos;s Greek Dictionary</td>
                <td>James Strong, 1890; CrossWire/Open Scriptures data</td>
                <td>Public domain</td>
              </tr>
              <tr>
                <td>Brown–Driver–Briggs Hebrew Lexicon</td>
                <td>
                  <a href="https://github.com/eliranwong/unabridged-BDB-Hebrew-lexicon" {...externalProps}>
                    Unabridged BDB Hebrew Lexicon dataset
                  </a>
                </td>
                <td>Public-domain work and dataset</td>
              </tr>
              <tr>
                <td>Dodson Greek-English Lexicon</td>
                <td>John Jeffrey Dodson; CrossWire distribution record</td>
                <td>
                  <a href="https://www.crosswire.org/sword/copyright/ModInfoCopyright.jsp?modName=Dodson" {...externalProps}>
                    Public domain
                  </a>
                </td>
              </tr>
            </tbody>
          </Table>

          <h2>Cross-references</h2>

          <h3>Treasury of Scripture Knowledge, Enhanced v1.2</h3>
          <p>
            The Treasury of Scripture Knowledge, Enhanced, v1.2. Copyright 2010, Timothy S. Morton
            (www.BibleAnalyzer.com). All Rights Reserved.
          </p>
          <p>
            Permission is conditional: the text and improvements must remain free of charge; a
            proprietary-format copy must also be offered by the distributor in an open format; and
            the copyright notice must accompany every distribution. There is no express or implied
            warranty. Read the{' '}
            <a href="https://www.bibleanalyzer.com/tske-copy.htm" {...externalProps}>complete TSKe terms</a>.
          </p>
          <p>
            Lamp Bible distributes TSKe free of charge in open, documented database containers. A
            standalone <code>.lamp</code> module and the in-app bundled database both use the same
            raw-DEFLATE-compressed SQLite structure; neither is proprietary or encrypted. The
            distributed database is therefore itself the open-format copy. See{' '}
            <Link href="/docs/modules/building">Building a .lamp file</Link> for the complete
            container and table definitions.
          </p>

          <h3>OpenBible.info cross-references</h3>
          <p>
            The relevance-ranked cross-reference dataset is adapted from{' '}
            <a href="https://www.openbible.info/labs/cross-references/" {...externalProps}>
              OpenBible.info Bible Cross References
            </a>{' '}
            by OpenBible.info and is licensed under the{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/" {...externalProps}>
              Creative Commons Attribution 4.0 International licence
            </a>
            . Lamp Bible converts references to its numeric verse identifiers and SQLite module
            format; it does not add Bible quotation text to this dataset.
          </p>

          <h2>Reading plans and quizzes</h2>
          <Table>
            <thead>
              <tr>
                <th>Module</th>
                <th>Credited author</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The Bible Companion</td>
                <td>Robert Roberts</td>
                <td>Public domain — cleared</td>
              </tr>
              <tr>
                <td>Children&apos;s Bible Companion: Junior</td>
                <td>Birmingham Central Christadelphian Sunday School Committee</td>
                <td>Public domain — cleared</td>
              </tr>
              <tr>
                <td>Children&apos;s Bible Companion: Intermediate</td>
                <td>Birmingham Central Christadelphian Sunday School Committee</td>
                <td>Public domain — cleared</td>
              </tr>
              <tr>
                <td>The Bible Companion Quizzes</td>
                <td>Lamp Bible</td>
                <td>Cleared after reviewed ESV-to-BSB wording remediation</td>
              </tr>
            </tbody>
          </Table>
          <p>
            The three reading plans are public domain. Lamp Bible retains their author and committee
            credits as provenance.
          </p>
          <Callout title="Quiz remediation complete">
            <p>
              The quiz module was cleared on August 12, 2026 through targeted, reviewed replacement
              of fields that named the ESV or contained ESV-specific wording. It was not wholesale
              regenerated. The final audit found no explicit ESV naming and no exact ESV run of
              eight or more words absent from the corresponding CC0 Berean Standard Bible verse.
              Other works used during the original generation remain recorded as provenance, not
              as release blockers.
            </p>
          </Callout>

          <h2>User-created modules</h2>
          <p>
            The module format is a container, not permission to copy a work. Import content only if
            you created it, it is public domain where you use it, or its licence expressly permits
            the copying and conversion you intend. Export or share a module only when you also have
            redistribution rights. See <Link href="/docs/modules/authoring">Authoring modules</Link>.
          </p>

          <h2>Corrections</h2>
          <p>
            If a credit, source or licence is incomplete, please report it through the contact
            address in the footer. Lamp Bible will investigate and correct or remove affected
            content where necessary.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
