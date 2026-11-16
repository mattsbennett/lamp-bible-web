import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Callout, Table } from '@/components/docs/DocPage'
import { OnThisPage, OnThisPageFolded } from '@/components/docs/OnThisPage'

export const metadata: Metadata = {
  title: 'Content licences',
  description:
    'Sources, copyright status, licences, notices and downloads for content bundled with Lamp Bible.',
}

const externalProps = { target: '_blank', rel: 'noopener noreferrer' } as const

const sections = [
  { id: 'translations', title: 'Translations' },
  { id: 'lexicons', title: 'Lexicons' },
  { id: 'cross-references', title: 'Cross-references' },
  { id: 'reading-plans-and-quizzes', title: 'Reading plans and quizzes' },
  { id: 'user-created-modules', title: 'User-created modules' },
  { id: 'corrections', title: 'Corrections' },
]

/** Which kind of rights basis a work rests on, told apart by a dot as well as by its words. */
const kinds = {
  public: { colour: '#3f9a5f', name: 'Public domain' },
  open: { colour: '#4a7fd1', name: 'Open licence' },
  grant: { colour: '#c98a1b', name: 'Permission or grant' },
}

function Rights({ kind, children }: { kind: keyof typeof kinds; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-sunken px-2.5 py-0.5 text-[0.8rem] font-medium">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: kinds[kind].colour }} />
      {children}
    </span>
  )
}

/** A source's note of changes, a click away so the notices above it stay readable. */
function Changes({ children }: { children: ReactNode }) {
  return (
    <details className="group rounded-xl border border-line bg-raised">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
        What Lamp Bible changed
        <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-faint transition-transform group-open:rotate-180" aria-hidden="true">
          <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="space-y-4 border-t border-line px-4 py-4 text-[0.95rem] leading-relaxed">{children}</div>
    </details>
  )
}

function Note({ children }: { children: ReactNode }) {
  return <span className="mt-1 block text-[0.8rem] leading-snug text-muted">{children}</span>
}

export default function ContentLicences() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20 xl:grid xl:grid-cols-[minmax(0,1fr)_12rem] xl:gap-14">
        <div className="min-w-0">
        <header className="border-b border-line pb-8">
          <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">Content licences</h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">
            The exact sources and distribution terms for the library bundled with Lamp Bible.
          </p>
          <p className="mt-3 text-sm text-faint">Last reviewed November 14, 2026.</p>
        </header>

        <div className="mt-8 xl:hidden">
          <OnThisPageFolded items={sections} />
        </div>

        <div className="doc mt-10">
          <Callout title="Public domain is not the only category">
            <p>
              Some bundled works are public domain; others are distributed under an open or
              permission-based licence. The terms and source record for each work control. Lamp
              Bible&apos;s software and module format do not change the rights in the underlying
              content.
            </p>
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              {Object.values(kinds).map((kind) => (
                <span key={kind.name} className="inline-flex items-center gap-1.5 text-[0.8rem]">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: kind.colour }} />
                  {kind.name}
                </span>
              ))}
            </p>
          </Callout>

          <h2 id="translations">Translations</h2>
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
                <td><Rights kind="public">Public domain</Rights></td>
              </tr>
              <tr>
                <td><code>BSBs</code> — Berean Standard Bible</td>
                <td>Official Strong&apos;s USFM archive, obtained August 12, 2026</td>
                <td>
                  <Rights kind="public">
                    <a href="https://creativecommons.org/publicdomain/zero/1.0/" {...externalProps}>CC0 1.0</a>
                  </Rights>
                  <Note>Public-domain dedication</Note>
                </td>
              </tr>
              <tr>
                <td><code>Brenton</code> — Brenton English Septuagint</td>
                <td>eBible.org <code>eng-Brenton</code> USFM, source files dated October 7, 2026</td>
                <td><Rights kind="public">Public domain</Rights></td>
              </tr>
              <tr>
                <td><code>KJVs</code> — King James Version with Strong&apos;s and morphology</td>
                <td>CrossWire KJV module v3.1</td>
                <td>
                  <Rights kind="grant">CrossWire grant</Rights>
                  <Note>Any-purpose grant; source metadata also labels it GPL</Note>
                </td>
              </tr>
              <tr>
                <td><code>LSG</code> — Louis Segond 1910 (French)</td>
                <td>eBible.org <code>fraLSG</code> USFM, source files dated October 30, 2026</td>
                <td><Rights kind="public">Public domain</Rights></td>
              </tr>
              <tr>
                <td><code>LXX</code> — Brenton Greek Septuagint, tagged</td>
                <td>
                  eBible.org <code>grcbrent</code> USFM, source files dated April 8, 2026; tags from
                  STEPBible-Data, upstream commit <code>5de0a47f35f0</code> (November 2, 2026)
                </td>
                <td>
                  <Rights kind="public">Public domain</Rights>
                  <Note>
                    The text; its tags are{' '}
                    <a href="https://creativecommons.org/licenses/by/4.0/" {...externalProps}>CC BY 4.0</a>
                  </Note>
                </td>
              </tr>
              <tr>
                <td><code>RV1909</code> — Reina-Valera 1909 (Spanish)</td>
                <td>eBible.org <code>spaRV1909</code> USFM, source files dated August 10, 2015</td>
                <td><Rights kind="public">Public domain</Rights></td>
              </tr>
              <tr>
                <td><code>TAGNT</code> — Translators Amalgamated Greek New Testament</td>
                <td>STEPBible-Data, upstream commit <code>5de0a47f35f0</code> (November 2, 2026)</td>
                <td>
                  <Rights kind="open">
                    <a href="https://creativecommons.org/licenses/by/4.0/" {...externalProps}>CC BY 4.0</a>
                  </Rights>
                </td>
              </tr>
              <tr>
                <td><code>TAHOT</code> — Translators Amalgamated Hebrew Old Testament</td>
                <td>STEPBible-Data, upstream commit <code>5de0a47f35f0</code> (November 2, 2026)</td>
                <td>
                  <Rights kind="open">
                    <a href="https://creativecommons.org/licenses/by/4.0/" {...externalProps}>CC BY 4.0</a>
                  </Rights>
                </td>
              </tr>
              <tr>
                <td><code>WEBs</code> — World English Bible</td>
                <td>World English Bible source text</td>
                <td>
                  <Rights kind="public">Public domain</Rights>
                  <Note>“World English Bible” is an eBible.org trademark</Note>
                </td>
              </tr>
              <tr>
                <td><code>YLT</code> — Young&apos;s Literal Translation</td>
                <td>CrossWire SWORD module v1.1, 1898 edition</td>
                <td><Rights kind="public">Public domain</Rights></td>
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
            express any-purpose grant for its converted <code>KJVs</code>{' '}content while preserving the
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
          <Changes>
            <p>
              Lamp preserves each word&apos;s inflected form, Strong&apos;s key, dictionary form and
              morphology tag. It omits edition, variant, gloss, Spanish rendering and sub-meaning columns.
              Strong&apos;s keys are normalised: <code>H7225G</code> becomes <code>H7225</code>.
              STEPBible&apos;s <code>H9xxx</code> prefix and suffix codes remain in morphology tags but
              are not used for lexicon lookups. Hebrew morpheme divisions and attached marks are removed
              from displayed words; segmented forms remain in the morphology tags.
            </p>
            <p>
              Each module presents one reading text. <code>TAGNT</code> uses the Nestlé-Aland readings,
              which the dataset identifies as those followed by almost all translations. Words found
              only in the Textus Receptus or other editions are omitted.
            </p>
            <p>
              <code>TAHOT</code>{' '}uses the Leningrad Codex reading text, substituting marginal corrections
              (Qere) for the written forms (Ketiv), which appear in footnotes. It includes the dataset&apos;s
              restorations of Joshua 21:36–37 and the end of Nehemiah 7:68 from parallel passages, with
              footnotes. Reconstructions from the Septuagint are omitted. All omitted data remains available
              in the upstream dataset.
            </p>
          </Changes>

          <h3>Brenton&apos;s Septuagint</h3>
          <p>
            The <code>LXX</code> and <code>Brenton</code>{' '}modules are the Greek text printed with Sir
            Lancelot C. L. Brenton&apos;s 1851 translation of the Septuagint, and that translation, both
            in the public domain, from eBible.org&apos;s{' '}
            <a href="https://ebible.org/grcbrent/copyright.htm" {...externalProps}>grcbrent</a> and{' '}
            <a href="https://ebible.org/eng-Brenton/copyright.htm" {...externalProps}>eng-Brenton</a>{' '}
            sources. They carry the 38 books of the Hebrew canon in the Septuagint&apos;s own numbering;
            the deuterocanonical books in the sources are left out, and lettered verses merge into the
            numbered verse they follow. English Brenton&apos;s separate Nehemiah, a renumbered copy of
            2 Esdras 11–23, is left out in favour of 2 Esdras as printed.
          </p>
          <p>
            The Greek text&apos;s Strong&apos;s numbers, dictionary forms and morphology are not
            Brenton&apos;s and are not public domain. They are data created by{' '}
            <a href="https://www.stepbible.org" {...externalProps}>STEPBible.org</a> based on work at
            Tyndale House, Cambridge, distributed under the{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/" {...externalProps}>
              Creative Commons Attribution 4.0 International licence
            </a>
            , from{' '}
            <a href="https://STEPBible.github.io/STEPBible-Data" {...externalProps}>
              STEPBible.github.io/STEPBible-Data
            </a>
            : the Translators Amalgamated Greek NT and Hebrew OT, and the Translators Brief lexicons
            of Extended Strong&apos;s for Greek and Hebrew. STEPBible has not tagged this text: Lamp
            Bible&apos;s own program assigned the numbers, dictionary forms and morphology codes to
            Brenton&apos;s words, by machine and unchecked by hand, so its errors are Lamp
            Bible&apos;s, not STEPBible&apos;s.
          </p>
          <Changes>
            <p>
              Forms found in the Greek New Testament use that reading. Other forms are derived from
              lexicon paradigms. A statistical model trained on the tagged New Testament resolves
              ambiguous forms in context. Names absent from the New Testament receive the Hebrew
              Strong&apos;s number from the corresponding Hebrew verse, matched using Septuagint
              spellings of Hebrew names. No other tagged Septuagint was used.
            </p>
            <p>
              The program, tagged text and accuracy measurements are published at{' '}
              <a href="https://github.com/mattsbennett/lamp-septuagint-strongs" target="_blank" rel="noopener noreferrer">
                github.com/mattsbennett/lamp-septuagint-strongs
              </a>.
            </p>
          </Changes>

          <h3>Reina-Valera 1909 and Louis Segond 1910</h3>
          <p>
            The <code>RV1909</code> (Spanish) and <code>LSG</code> (French) modules are public
            domain, as eBible.org states for{' '}
            <a href="https://ebible.org/spaRV1909/copyright.htm" {...externalProps}>spaRV1909</a> and{' '}
            <a href="https://ebible.org/fraLSG/copyright.htm" {...externalProps}>fraLSG</a>, and are
            converted from eBible.org&apos;s USFM. Both files also tag words with Strong&apos;s
            numbers that eBible.org does not source or license; the modules are built without them.
            The Segond&apos;s section headings, from the 2011 edition eBible.org states is in the
            public domain, are kept; its book introductions and cross-references are not. Each
            text&apos;s verse numbering is recorded with the places it departs from the original
            numbering, so its verses line up with the other translations.
          </p>

          <h2 id="lexicons">Lexicons</h2>
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
                <td><Rights kind="public">Public domain</Rights></td>
              </tr>
              <tr>
                <td>Strong&apos;s Greek Dictionary</td>
                <td>James Strong, 1890; CrossWire/Open Scriptures data</td>
                <td><Rights kind="public">Public domain</Rights></td>
              </tr>
              <tr>
                <td>Translators Brief Lexicon of Extended Strong&apos;s for Greek (TBESG)</td>
                <td>STEPBible-Data, upstream commit <code>5de0a47f35f0</code> (November 2, 2026)</td>
                <td>
                  <Rights kind="open">
                    <a href="https://creativecommons.org/licenses/by/4.0/" {...externalProps}>CC BY 4.0</a>
                  </Rights>
                </td>
              </tr>
              <tr>
                <td>Brown–Driver–Briggs Hebrew Lexicon</td>
                <td>
                  <a href="https://github.com/eliranwong/unabridged-BDB-Hebrew-lexicon" {...externalProps}>
                    Unabridged BDB Hebrew Lexicon dataset
                  </a>
                </td>
                <td>
                  <Rights kind="public">Public domain</Rights>
                  <Note>The work and the dataset</Note>
                </td>
              </tr>
              <tr>
                <td>Strong&apos;s Hebrew to BDB mapping</td>
                <td>
                  Open Scriptures Hebrew Lexicon, Lexical Index, upstream commit{' '}
                  <code>21c9add13bc7</code> (September 2, 2019)
                </td>
                <td>
                  <Rights kind="open">
                    <a href="https://creativecommons.org/licenses/by/4.0/" {...externalProps}>CC BY 4.0</a>
                  </Rights>
                </td>
              </tr>
              <tr>
                <td>Dodson Greek-English Lexicon</td>
                <td>John Jeffrey Dodson; CrossWire distribution record</td>
                <td>
                  <Rights kind="public">
                    <a href="https://www.crosswire.org/sword/copyright/ModInfoCopyright.jsp?modName=Dodson" {...externalProps}>
                      Public domain
                    </a>
                  </Rights>
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
          <Changes>
            <p>
              Entries use Strong&apos;s numbers without leading zeros (<code>G0025</code> becomes{' '}
              <code>G25</code>); STEPBible&apos;s extended numbers are preserved. Parts of an entry that
              share a definition are combined with their glosses. Parts with distinct definitions
              remain separate senses.
            </p>
            <p>
              Scripture references link to Lamp&apos;s English verse numbering. Some Old Testament
              references use Hebrew numbering. When the two differ, Lamp uses the Hebrew reading only
              if the word occurs in that verse of Brenton&apos;s Greek Septuagint and not in the English
              reading&apos;s verse. It never uses a Hebrew reading that points to a psalm title.
              References tagged “1Ki” or “2Ki” where the definition names 1 or 2 Kingdoms link to 1 or
              2 Samuel.
            </p>
            <p>
              The source uses its Esther code for Esther, 1 and 2 Esdras, and Esther&apos;s Greek additions.
              Lamp links these references only when the word occurs in the corresponding Greek Esther
              verse, excluding lettered additions. Apocryphal references and references absent from
              both numbering schemes remain plain text.
            </p>
            <p>
              Grammar codes distinguish the article from demonstrative pronouns. Source marks “(AS)”
              and “(ML)” are expanded to “(Abbott-Smith)” and “(Middle Liddell)”. The extended Strong&apos;s
              and unified Strong&apos;s columns are omitted. Hebrew words named in a definition as
              Septuagint equivalents are also listed with Strong&apos;s numbers, matched using
              STEPBible&apos;s Translators Brief lexicon of Extended Strongs for Hebrew (TBESH), under
              the same licence.
            </p>
          </Changes>

          <h3>Open Scriptures Hebrew Lexicon</h3>
          <p>
            The Strong&apos;s-to-BDB mapping carries the Lexical Index of the{' '}
            <a href="https://github.com/openscriptures/HebrewLexicon" {...externalProps}>
              Open Scriptures Hebrew Bible Project
            </a>
            , distributed under the{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/" {...externalProps}>
              Creative Commons Attribution 4.0 International licence
            </a>
            . The text of Brown, Driver and Briggs and of Strong&apos;s dictionary remains in the
            public domain.
          </p>
          <Changes>
            <p>
              The index links Strong&apos;s numbers to Open Scriptures&apos; digitisation of BDB;
              Lamp bundles a different digitisation. Entries were matched by order, headword, cited
              verses, glosses and whether an entry refers only to another entry. Each pair is attached
              to the matched entry. Uncertain matches and augment letters are omitted: <code>7227a</code>{' '}
              and <code>7227b</code> both become <code>H7227</code>.
            </p>
            <p>
              Where the index has no matched entry, Lamp retains the BDB dataset&apos;s own Strong&apos;s
              numbers; those pairs are not from Open Scriptures. If a number appears only after another
              headword&apos;s number, the entry is retained only when it contains the spelling in Open
              Scriptures&apos; Strong&apos;s dictionary and, for names, describes a name. That dictionary
              uses the same licence. Matching was automated; any matching errors are Lamp Bible&apos;s.
            </p>
          </Changes>

          <h2 id="cross-references">Cross-references</h2>

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

          <h2 id="reading-plans-and-quizzes">Reading plans and quizzes</h2>
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
                <td><Rights kind="public">Public domain</Rights></td>
              </tr>
              <tr>
                <td>Children&apos;s Bible Companion: Junior</td>
                <td>Birmingham Central Christadelphian Sunday School Committee</td>
                <td><Rights kind="public">Public domain</Rights></td>
              </tr>
              <tr>
                <td>Children&apos;s Bible Companion: Intermediate</td>
                <td>Birmingham Central Christadelphian Sunday School Committee</td>
                <td><Rights kind="public">Public domain</Rights></td>
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

          <h2 id="user-created-modules">User-created modules</h2>
          <p>
            The module format is a container, not permission to copy a work. Import content only if
            you created it, it is public domain where you use it, or its licence expressly permits
            the copying and conversion you intend. Export or share a module only when you also have
            redistribution rights. See <Link href="/docs/modules/authoring">Authoring modules</Link>.
          </p>

          <h2 id="corrections">Corrections</h2>
          <p>
            If a credit, source or licence is incomplete, please report it through the contact
            address in the footer. Lamp Bible will investigate and correct or remove affected
            content where necessary.
          </p>
        </div>
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <OnThisPage items={sections} />
          </div>
        </aside>
      </main>
      <SiteFooter />
    </>
  )
}
