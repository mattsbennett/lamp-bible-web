import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'
import { isMacAvailable } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI chat & agents',
  description:
    'Reader Chat and writing agents on the Mac, using your own Codex, Claude Code or OpenCode account with read-only access to your library — and Lamp’s library tools in Claude Desktop, Codex, Cursor or opencode.',
}

export default function Page() {
  if (!isMacAvailable) notFound()

  return (
    <DocPage
      href="/docs/ai"
      title="AI chat & agents"
      intro="Ask about the passage you are reading, or write with an agent beside you — through an AI account of your own, with read-only access to your library."
    >
      <p>
        AI in Lamp Bible is optional, Mac-only, and runs through an AI tool you already use. Lamp
        Bible has no AI service of its own: it starts your provider’s command-line tool on your Mac,
        and gives it read-only tools for looking things up in your library.
      </p>

      <h2>Setting up</h2>
      <p>Three providers are supported. Each needs its command-line tool installed and signed in:</p>
      <Table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Tool</th>
            <th>Signs in</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>OpenAI Codex</td>
            <td>
              <code>codex</code>
            </td>
            <td>In your browser</td>
          </tr>
          <tr>
            <td>Claude Code</td>
            <td>
              <code>claude</code>
            </td>
            <td>In your browser</td>
          </tr>
          <tr>
            <td>OpenCode</td>
            <td>
              <code>opencode</code>
            </td>
            <td>In a terminal, with whichever provider you configure</td>
          </tr>
        </tbody>
      </Table>
      <p>
        Settings → AI &amp; Agents lists each provider under <strong>AI Provider Accounts</strong>,
        and whether its tool is installed and connected. <strong>Connect…</strong> starts the
        provider’s own sign-in. Lamp Bible never reads or stores your credentials; they stay with
        the tool. The tool must be on your login shell’s path, which is where installers normally
        put it.
      </p>

      <h3>What the AI may see</h3>
      <Table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Allow agents to query Lamp modules</td>
            <td>On</td>
            <td>Gives the AI read-only tools to search and read your installed modules</td>
          </tr>
          <tr>
            <td>Module Access</td>
            <td>Enabled modules</td>
            <td>
              Whether Reader Chat and writing agents see only modules you have enabled, or all of
              them
            </td>
          </tr>
          <tr>
            <td>Include personal writing, notes, and highlights</td>
            <td>Off</td>
            <td>Lets the tools read your own notes, highlights and writing too</td>
          </tr>
        </tbody>
      </Table>
      <p>
        Lamp’s tools are read-only: the AI can look up passages, commentary, dictionary entries,
        books, plans, quizzes and — if you allow it — your own study, and analyse a Strong’s number,
        but cannot change your library. The one exception lets another app replace a writing’s
        draft, and is off unless you turn it on; see{' '}
        <a href="#other-apps">Using Lamp in other apps</a>. <strong>Test Module Tools</strong>{' '}
        checks that the tools are working.
      </p>

      <h2>Reader Chat</h2>
      <p>
        <strong>Reader Chat</strong> (⇧⌘J, or the speech-bubble button) opens beside the reader.
        Ask about the chapter on screen, or name any other passage; each message tells the AI which
        chapter and translation you are reading. It answers from your modules through the read-only
        tools, and cannot edit files or run commands. Choose the provider at the top of the chat.
      </p>
      <p>
        The chat looks only in the modules your Module Access setting allows, so a module you have
        hidden stays out of its answers unless you choose all installed modules. A line under the
        chat says what it can reach.
      </p>
      <p>
        Each reader window keeps its own conversation, which picks up where it left off when you
        reopen the chat. Reader Chat conversations stay on the Mac and do not sync.
      </p>

      <h2>Writing with an agent</h2>
      <p>
        In the writing editor, the <strong>Agent</strong> button opens a workspace for that piece of
        writing. The agent works on the same text you do: the draft in the editor and the agent’s
        copy are kept in step as either of you changes it, and every change goes into{' '}
        <strong>Revisions</strong>, where you can undo it or restore an earlier version. If you and
        the agent change an open file at once, you choose whose version to keep.
      </p>
      <ul>
        <li>
          <strong>Chat</strong> is a conversation with the agent. Its edits go straight into the
          draft, and each one is in Revisions. When Claude Code needs permission — to run a
          command or fetch a web page,
          say — it asks in the chat: <strong>Allow</strong>, <strong>Always Allow</strong> for
          that exact kind of request, or <strong>Deny</strong>.
        </li>
        <li>
          <strong>Terminal</strong> runs the provider’s own tool directly, continuing the same
          session, for anything the chat does not offer.
        </li>
        <li>
          <strong>Context</strong> holds files you add for the agent to read — sources, a previous
          talk, notes — as read-only copies.
        </li>
        <li>
          <strong>Workspace Skills</strong> are instructions the agent can follow. One is built in:{' '}
          <strong>Build Lamp Deck</strong>, which turns the writing into a{' '}
          <Link href="/docs/presenting">Slide Studio deck</Link>. You can write your own.
        </li>
      </ul>
      <p>
        The workspace — companion files, context, skills, revisions and the conversation — syncs
        with your library, so it follows the writing to your other Macs.
      </p>

      <Callout tone="warn" title="What a writing agent sees">
        <p>
          A writing agent always has the writing it was opened from, its details, its companion
          files and the context you added, whatever the personal-content setting says. It can also
          use its provider tool’s own abilities, such as web search or shell commands, as your
          settings for that tool allow. Building decks needs Python 3, which macOS offers to install
          the first time it is used.
        </p>
      </Callout>

      <h2 id="other-apps">Using Lamp in other apps</h2>
      <p>
        The same library tools can be used from an AI app you already run — Claude Desktop, Codex,
        Cursor or opencode — through the Model Context Protocol. Turn them on in Settings → AI &amp;
        Agents, under <strong>Use Lamp in Other Apps</strong>:
      </p>
      <Table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Allow other apps to read my library</td>
            <td>Off</td>
            <td>Lets an app you have set up use Lamp’s read-only tools</td>
          </tr>
          <tr>
            <td>Allow other apps to change my writings</td>
            <td>Off</td>
            <td>Lets an agent in that app replace a writing’s draft</td>
          </tr>
        </tbody>
      </Table>
      <p>
        Both need <strong>Allow agents to query Lamp modules</strong>, and what an app may read
        follows the same Module Access and personal-content settings as Lamp’s own agents.
      </p>

      <h3>Setting an app up</h3>
      <p>Once reading is allowed, the section lists the apps it can set up:</p>
      <ul>
        <li>
          <strong>Add to Claude Desktop…</strong> builds a bundle and opens it in Claude Desktop,
          which asks you before installing it.
        </li>
        <li>
          For opencode, Codex and Cursor — or Claude Desktop by hand — <strong>Copy</strong> puts a
          snippet on the clipboard, and the section names the file to paste it into.
        </li>
      </ul>
      <p>
        Lamp never edits another app’s settings. Each snippet names a small launcher in Lamp’s
        Application Support folder, which finds the app wherever it is installed, so the setup keeps
        working when Lamp moves or updates.
      </p>

      <h3>What the app can do</h3>
      <p>
        An app set up this way has the read-only tools a writing agent has: it can search your
        library, read passages, commentary, dictionaries, books, plans and quizzes, analyse a
        Strong’s number, and check, fill in and draw a deck. An app that offers prompts also gets{' '}
        <strong>Build a Lamp deck</strong>, the instructions behind the Build Lamp Deck skill.
      </p>
      <p>
        With personal content allowed, it can also read the writings that have an agent workspace —
        any writing whose Agent pane you have opened. With{' '}
        <strong>Allow other apps to change my writings</strong> on, it can replace one’s draft:
      </p>
      <ul>
        <li>
          The change is refused if you or another agent have changed the draft since the app read
          it, so it cannot write over words it has not seen.
        </li>
        <li>
          Lamp takes the new draft in when you next open that writing’s agent workspace, and records
          it in Revisions like any agent’s edit. If you have edited the writing in the meantime, your
          text stays, and the other app’s version is kept in Revisions instead.
        </li>
      </ul>

      <h2>Privacy</h2>
      <p>
        When you use AI, your messages — and whatever the agent reads to answer them — go to the
        provider you chose, under that provider’s terms and privacy policy. Nothing goes to Lamp
        Bible, which does not operate or proxy these services and never sees your conversations. If
        you never connect a provider, no AI tool is ever started. What another app reads through
        Lamp’s tools goes to whichever AI provider that app uses, under its terms. See the{' '}
        <Link href="/privacy/apps">app privacy declaration</Link>.
      </p>
    </DocPage>
  )
}
