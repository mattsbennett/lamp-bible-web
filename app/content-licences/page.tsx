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
          <p className="mt-3 text-sm text-faint">Last reviewed November 9, 2026.</p>
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

          <h2>Translations</h2>
          <Table>
            <thead>
              <tr>
                <th>Module</th>
                <th>Source and version</th>
                <th>Rights basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>ASVs</code> — American Standard Version</td>
                <td>CrossWire SWORD module v2.0</td>
                <td>Public domain</td>
              </tr>
              <tr>
                <td><code>BSBs</code> — Berean Standard Bible</td>
                <td>Official Strong&apos;s USFM archive, obtained August 12, 2026</td>
                <td>
                  <a href="https://creativecommons.org/publicdomain/zero/1.0/" {...externalProps}>CC0 1.0</a>{' '}
                  public-domain dedication
                </td>
              </tr>
              <tr>
                <td><code>Brenton</code> — Brenton English Septuagint</td>
                <td>eBible.org <code>eng-Brenton</code> USFM, source files dated October 7, 2026</td>
                <td>Public domain</td>
              </tr>
              <tr>
                <td><code>KJVs</code> — King James Version with Strong&apos;s and morphology</td>
                <td>CrossWire KJV module v3.1</td>
                <td>CrossWire any-purpose grant; source metadata also labels it GPL</td>
              </tr>
              <tr>
                <td><code>LXX</code> — Brenton Greek Septuagint</td>
                <td>eBible.org <code>grcbrent</code> USFM, source files dated April 8, 2026</td>
                <td>Public domain</td>
              </tr>
              <tr>
                <td><code>TAGNT</code> — Translators Amalgamated Greek New Testament</td>
                <td>STEPBible-Data, upstream commit <code>5de0a47f35f0</code> (November 2, 2026)</td>
                <td>
                  <a href="https://creativecommons.org/licenses/by/4.0/" {...externalProps}>CC BY 4.0</a>
                </td>
              </tr>
              <tr>
                <td><code>TAHOT</code> — Translators Amalgamated Hebrew Old Testament</td>
                <td>STEPBible-Data, upstream commit <code>5de0a47f35f0</code> (November 2, 2026)</td>
                <td>
                  <a href="https://creativecommons.org/licenses/by/4.0/" {...externalProps}>CC BY 4.0</a>
                </td>
              </tr>
              <tr>
                <td><code>WEBs</code> — World English Bible</td>
                <td>World English Bible source text</td>
                <td>Public domain; “World English Bible” is an eBible.org trademark</td>
              </tr>
              <tr>
                <td><code>YLT</code> — Young&apos;s Literal Translation</td>
                <td>CrossWire SWORD module v1.1, 1898 edition</td>
                <td>Public domain</td>
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

          <h3>CrossWire KJV v3.1 notice</h3>
          <p>
            The source module states that any copyright in CrossWire&apos;s digital work is held by
            CrossWire Bible Society © 2003–2023 and grants a general public licence to use the text
            for any purpose. Version 3.1 labels its distribution licence “GPL.” Its modern OSIS
            markup and New Testament Strong&apos;s tagging are CrossWire work. Lamp Bible relies on the
            express any-purpose grant for its converted <code>KJVs</code> content while preserving the
            module&apos;s GPL label rather than calling the enhanced dataset public domain.
          </p>
          <p>
            Lamp Bible converted the SWORD representation to Lamp translation JSON and then to its
            bundled SQLite database. This changes the container and annotation representation, not
            the intended biblical wording. The input was CrossWire&apos;s v3.1 module archive, SHA-256{' '}
            <code className="break-all whitespace-normal">873815aa4b4123025616d1f41eae75f412111275f4c3884e36f92d4f46dcba1d</code>
            , and Lamp Bible keeps the archive and its conversion script as a provenance record. Full
            contributor provenance and the original OSIS source are linked from the{' '}
            <a href="https://wiki.crosswire.org/CrossWire_KJV" {...externalProps}>CrossWire KJV project</a>.
            Lamp Bible does not offer <code>KJVs</code> as a standalone website download.
          </p>

          <h3>STEPBible Translators Amalgamated Hebrew OT and Greek NT</h3>
          <p>
            The <code>TAHOT</code> and <code>TAGNT</code> modules carry data created by{' '}
            <a href="https://www.stepbible.org" {...externalProps}>STEPBible.org</a> based on work at
            Tyndale House, Cambridge, distributed under the{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/" {...externalProps}>
              Creative Commons Attribution 4.0 International licence
            </a>
            . The source of the data is{' '}
            <a href="https://STEPBible.github.io/STEPBible-Data" {...externalProps}>
              STEPBible.github.io/STEPBible-Data
            </a>
            .
          </p>
          <p>
            Lamp Bible changed the data in these ways. Each word&apos;s inflected form, Strong&apos;s
            key, dictionary form and morphology tag are carried over; the datasets&apos; other columns
            — editions, variants, glosses, Spanish renderings and sub-meanings — are not.
            Strong&apos;s keys are normalised to their plain form, so the disambiguated{' '}
            <code>H7225G</code> is recorded as <code>H7225</code>, and STEPBible&apos;s{' '}
            <code>H9xxx</code> codes for Hebrew prefixes and suffixes are not offered as lexicon keys;
            they remain visible in the morphology tag. Morpheme divisions and attached marks are removed
            from the Hebrew word, and the segmented form stays in the morphology tag.
          </p>
          <p>
            Each module is one text rather than the amalgamation. <code>TAGNT</code> carries the words
            of the Nestlé-Aland editions, the reading the dataset notes as the one almost all
            translations follow, so words read only by the Textus Receptus or by other editions are
            absent. <code>TAHOT</code> carries the dataset&apos;s reading text: the Leningrad Codex,
            with the scribes&apos; marginal corrections (Qere) read in place of the written text they
            correct, and that written text (Ketiv) given in a footnote at the word. It includes the
            dataset&apos;s restorations of Joshua 21:36–37 and the end of Nehemiah 7:68 from their
            parallels, each footnoted, and leaves out the words the dataset reconstructs from the
            Septuagint. Everything left out remains in the upstream dataset.
          </p>

          <h3>Brenton&apos;s Septuagint</h3>
          <p>
            The <code>LXX</code> and <code>Brenton</code> modules are the Greek text printed with Sir
            Lancelot C. L. Brenton&apos;s 1851 translation of the Septuagint, and that translation, both
            in the public domain, from eBible.org&apos;s{' '}
            <a href="https://ebible.org/grcbrent/copyright.htm" {...externalProps}>grcbrent</a> and{' '}
            <a href="https://ebible.org/eng-Brenton/copyright.htm" {...externalProps}>eng-Brenton</a>{' '}
            sources. They carry the 38 books of the Hebrew canon in the Septuagint&apos;s own numbering;
            the deuterocanonical books in the sources are left out, and lettered verses merge into the
            numbered verse they follow. English Brenton&apos;s separate Nehemiah, a renumbered copy of
            2 Esdras 11–23, is left out in favour of 2 Esdras as printed.
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
                <td>Translators Brief Lexicon of Extended Strong&apos;s for Greek (TBESG)</td>
                <td>STEPBible-Data, upstream commit <code>5de0a47f35f0</code> (November 2, 2026)</td>
                <td>
                  <a href="https://creativecommons.org/licenses/by/4.0/" {...externalProps}>CC BY 4.0</a>
                </td>
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

          <h3>STEPBible Translators Brief Lexicon of Extended Strong&apos;s for Greek</h3>
          <p>
            The <code>tbesg</code> dictionary carries data created by{' '}
            <a href="https://www.stepbible.org" {...externalProps}>STEPBible.org</a> based on work at
            Tyndale House, Cambridge, distributed under the{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/" {...externalProps}>
              Creative Commons Attribution 4.0 International licence
            </a>
            . The source of the data is{' '}
            <a href="https://STEPBible.github.io/STEPBible-Data" {...externalProps}>
              STEPBible.github.io/STEPBible-Data
            </a>
            . Its definitions are mostly G. Abbott-Smith&apos;s <em>Manual Greek Lexicon of the New
            Testament</em> (1922), completed from Middle Liddell (1889) and by STEPBible&apos;s
            scholars.
          </p>
          <p>
            Lamp Bible changed the data in these ways. Entries are keyed by Strong&apos;s number
            without leading zeros (<code>G0025</code> is <code>G25</code>), and STEPBible&apos;s
            extended numbers keep theirs. Where STEPBible divides one number into parts that share a
            definition, the definition is given once with the parts&apos; glosses; a part with its own
            definition is its own sense. Scripture references are linked to Lamp&apos;s English verse
            numbering, mapping the Hebrew numbering the Old Testament references follow; references
            to the Apocrypha, and those the Hebrew numbering has no verse for, are left as text. The
            source marks “(AS)” and “(ML)” are written out as “(Abbott-Smith)” and “(Middle
            Liddell)”. The extended Strong&apos;s and unified Strong&apos;s columns are not carried
            over. Where a definition names the Hebrew words the Septuagint renders with the word,
            they are also listed with their Strong&apos;s numbers, matched using STEPBible&apos;s
            Translators Brief lexicon of Extended Strongs for Hebrew (TBESH), under the same licence.
          </p>

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
                <td>Public domain</td>
              </tr>
              <tr>
                <td>Children&apos;s Bible Companion: Junior</td>
                <td>Birmingham Central Christadelphian Sunday School Committee</td>
                <td>Public domain</td>
              </tr>
              <tr>
                <td>Children&apos;s Bible Companion: Intermediate</td>
                <td>Birmingham Central Christadelphian Sunday School Committee</td>
                <td>Public domain</td>
              </tr>
              <tr>
                <td>The Bible Companion Quizzes</td>
                <td>Lamp Bible</td>
                <td>—</td>
              </tr>
            </tbody>
          </Table>
          <p>
            The three reading plans are public domain. Lamp Bible retains their author and committee
            credits as provenance.
          </p>

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
