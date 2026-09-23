import type { Metadata } from 'next'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Table } from '@/components/docs/DocPage'
import { isMacAvailable } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Software licences',
  description: 'Third-party open-source software notices for the Lamp Bible apps.',
}

const externalProps = { target: '_blank', rel: 'noopener noreferrer' } as const

/**
 * Swift packages in the Mac app and its lamp-mcp helper. Generated notices live in the Mac repo
 * (scripts/generate_third_party_notices.py); keep this list in step with its README.txt.
 */
const macPackages: Array<{ name: string; version: string; licence: string; url: string }> = [
  { name: 'EventSource', version: '1.4.1', licence: 'MIT', url: 'https://github.com/mattt/eventsource' },
  { name: 'GRDB.swift', version: '6.29.3', licence: 'MIT', url: 'https://github.com/groue/GRDB.swift' },
  { name: 'Kingfisher', version: '8.12.0', licence: 'MIT', url: 'https://github.com/onevcat/Kingfisher' },
  { name: 'MCP Swift SDK', version: '0.12.1', licence: 'Apache 2.0 and MIT', url: 'https://github.com/modelcontextprotocol/swift-sdk' },
  { name: 'Sparkle', version: '2.10.0', licence: 'MIT', url: 'https://github.com/sparkle-project/Sparkle' },
  { name: 'Swift Atomics', version: '1.3.1', licence: 'Apache 2.0', url: 'https://github.com/apple/swift-atomics' },
  { name: 'Swift Collections', version: '1.6.0', licence: 'Apache 2.0', url: 'https://github.com/apple/swift-collections' },
  { name: 'Swift System', version: '1.8.0', licence: 'Apache 2.0', url: 'https://github.com/apple/swift-system' },
  { name: 'SwiftLog', version: '1.15.0', licence: 'Apache 2.0', url: 'https://github.com/apple/swift-log' },
  { name: 'SwiftNIO', version: '2.101.3', licence: 'Apache 2.0', url: 'https://github.com/apple/swift-nio' },
  { name: 'SwiftTerm', version: '1.11.2', licence: 'MIT', url: 'https://github.com/migueldeicaza/SwiftTerm' },
  // Ships through SwiftyChat by project-owner decision (ACCEPTED_GAPS in the Mac repo's notice
  // script). Update this row if the author publishes a licence.
  { name: 'SwiftUIEKtensions', version: '0.4.0', licence: 'No licence published', url: 'https://github.com/EnesKaraosman/SwiftUIEKtensions' },
  { name: 'SwiftyChat', version: '4.1.1', licence: 'Apache 2.0', url: 'https://github.com/EnesKaraosman/SwiftyChat' },
]

export default function SoftwareLicences() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
        <header className="border-b border-line pb-8">
          <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">Software licences</h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">
            Open-source components used by the current Lamp Bible apps.
          </p>
          <p className="mt-3 text-sm text-faint">Last reviewed August 8, 2026.</p>
        </header>

        <div className="doc mt-10">
          <p>
            The full licence texts and copyright notices listed below accompany each app inside its
            Third Party Licences resources. These terms apply to the named components, not to Lamp
            Bible&apos;s own code or its bundled Bible content.
          </p>

          <h2>iPhone and iPad</h2>

          <Table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Version</th>
                <th>Licence</th>
                <th>Project</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GRDB.swift</td>
                <td>6.29.3</td>
                <td>MIT</td>
                <td><a href="https://github.com/groue/GRDB.swift" {...externalProps}>Source</a></td>
              </tr>
              <tr>
                <td>Realm Swift / Realm Core</td>
                <td>20.0.5 / 20.1.5</td>
                <td>Apache 2.0</td>
                <td><a href="https://github.com/realm/realm-swift" {...externalProps}>Source</a></td>
              </tr>
              <tr>
                <td>Tiptap packages</td>
                <td>3.18.0</td>
                <td>MIT</td>
                <td><a href="https://github.com/ueberdosis/tiptap" {...externalProps}>Source</a></td>
              </tr>
              <tr>
                <td>ProseMirror packages</td>
                <td>Versions recorded with the app build</td>
                <td>MIT</td>
                <td><a href="https://github.com/ProseMirror" {...externalProps}>Source</a></td>
              </tr>
              <tr>
                <td>tiptap-markdown</td>
                <td>0.9.0</td>
                <td>MIT</td>
                <td><a href="https://github.com/aguingand/tiptap-markdown" {...externalProps}>Source</a></td>
              </tr>
            </tbody>
          </Table>

          <p>
            The editor bundle also includes small transitive packages under MIT, BSD, ISC and the
            Python Software Foundation licence. Their package names, copyright notices and complete
            licence texts are included with the app distribution.
          </p>

          {isMacAvailable && (
            <>
              <h2>Mac</h2>
              <p>
                The Mac app uses the same writing editor as the iPhone and iPad app, so the editor
                components above apply to it too. It also includes these Swift packages, in the app
                and its <code>lamp-mcp</code> helper. Their complete licence texts, and any NOTICE
                files, open from Help → Third-Party Notices.
              </p>
              <Table>
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Version</th>
                    <th>Licence</th>
                    <th>Project</th>
                  </tr>
                </thead>
                <tbody>
                  {macPackages.map((p) => (
                    <tr key={p.name}>
                      <td>{p.name}</td>
                      <td>{p.version}</td>
                      <td>{p.licence}</td>
                      <td>
                        <a href={p.url} {...externalProps}>
                          Source
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
