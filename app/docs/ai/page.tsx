import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'
import { isMacAvailable } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI chat & agents',
  description:
    'Reader Chat and writing agents on the Mac, using your own Codex, Claude Code or OpenCode account with read-only access to your library and skills for weighing what scripture says — and Lamp’s library tools in Claude Desktop, Codex, Cursor or opencode.',
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
        but cannot change your library. The two exceptions let another app replace a writing’s
        draft or add a reading plan, and are off unless you turn them on; see{' '}
        <a href="#other-apps">Using Lamp in other apps</a>. <strong>Test Module Tools</strong>{' '}
        checks that the tools are working.
      </p>

      <h3 id="model">Provider, model and effort</h3>
      <p>
        At the top of each chat, three menus choose the provider, the model and the effort. Lamp
        names no model of its own: the menu offers the provider’s default, the names the provider
        itself keeps pointed at its current models — <code>opus</code>, <code>sonnet</code> and{' '}
        <code>haiku</code> for Claude Code — and <strong>Other Model…</strong> for a name you type,
        which is passed on as it is. Effort is low to max for Claude Code, a value you type for
        Codex, and for OpenCode the variants the installed tool lists for the model you named. The
        choices belong to the chat, so two windows can use two providers or two models at once.
      </p>

      <h2 id="skills">Study skills</h2>
      <p>
        Lamp’s agents come with two skills for questions about scripture, which they read before
        answering one:
      </p>
      <ul>
        <li>
          <strong>sola-scriptura</strong> tells what a passage states from what is inferred from it
          or brought to it. Asked about one claim, it says whether scripture establishes it, in a
          paragraph with the text quoted. Given a whole piece of writing, it goes through it claim
          by claim — stated, entailed, inferred, imported, unsupported or contrary — and ranks what
          it finds by how much of the argument rests on each.
        </li>
        <li>
          <strong>original-languages</strong> reads the Hebrew or Greek behind a verse, word by
          word with each word’s parsing, and shows where translations differ and whether the
          difference is a translator’s decision. Given a writing, it checks the claims it makes
          about the original.
        </li>
      </ul>
      <p>
        Both measure against the text alone. They look passages up rather than quoting from memory,
        report a commentary’s view as that commentary’s, and never count what your library happens
        to hold as evidence for a reading. Reader Chat and writing agents have both;{' '}
        <a href="#other-apps">other apps</a> get them as prompts.
      </p>

      <h2>Reader Chat</h2>
      <p>
        <strong>Reader Chat</strong> (⇧⌘J, or the speech-bubble button) opens beside the reader.
        Ask about the chapter on screen, or name any other passage. It answers from your modules
        through the read-only tools, and cannot edit files or run commands.
      </p>
      <p>
        Each message is sent with the chapter and translation you are reading, the verse marked in
        the reader, and any words you have selected in it, traced to their verses. With{' '}
        <strong>Include personal writing, notes, and highlights</strong> on, it also carries your
        own notes and highlights in that chapter; with it off, the chat is told they are not shared.
        A line under the chapter’s name says what the next message will carry.
      </p>
      <p>
        The chat looks only in the modules your Module Access setting allows, so a module you have
        hidden stays out of its answers unless you choose all installed modules. A line at the top
        of the chat says what it can reach.
      </p>
      <p>
        Replies appear as they are written, and with Claude Code a line says what the agent is doing
        meanwhile — the tool it is using, and the passage it is reading. A reply keeps arriving if
        you close the chat, switch it for Study Tools or leave the reader, and is there when you come
        back. Each reader window keeps its own conversation, and comes back to it when you relaunch.
        Reader Chat conversations stay on the Mac and do not sync.
      </p>

      <h2>Writing with an agent</h2>
      <p>
        In the writing editor, the <strong>Agent</strong> button opens a workspace for that piece of
        writing. The agent works on the same text you do: the draft in the editor and the agent’s
        copy are kept in step as either of you changes it, and every change goes into{' '}
        <strong>Revisions</strong>, where you can undo it or restore an earlier version. If you and
        the agent change an open file at once, you choose whose version to keep. The agent is told
        which file is open in the editor and the text you have selected in it, so you can point at
        a paragraph and ask about it.
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
          <strong>Workspace Skills</strong> are instructions the agent can follow. Three are built
          in: <strong>build-lamp-deck</strong>, which turns the writing into a{' '}
          <Link href="/docs/presenting">Slide Studio deck</Link>, and the two{' '}
          <a href="#skills">study skills</a>, which can audit the draft. You can write your own,
          and add one you wrote for another writing.
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
          <tr>
            <td>Allow other apps to add reading plans</td>
            <td>Off</td>
            <td>Lets an agent in that app add a reading plan, and nothing else</td>
          </tr>
        </tbody>
      </Table>
      <p>
        All three need <strong>Allow agents to query Lamp modules</strong>, and the last two need
        reading allowed as well. What an app may read follows the same Module Access and
        personal-content settings as Lamp’s own agents.
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
        Strong’s number, check, fill in and draw a deck, and lay out a reading plan without adding
        it. An app that offers prompts also gets Lamp’s skills as prompts:{' '}
        <strong>Build a Lamp deck</strong>, <strong>Audit writing against scripture alone</strong>{' '}
        and <strong>Read the Hebrew or Greek</strong>.
      </p>
      <p>
        With <strong>Allow other apps to add reading plans</strong> on, it can also add a plan over
        the passages you name — so a model you already pay for can work out a plan with you, show
        you its days, and put it in your library. Lamp lays the plan out and adds it when it next
        reads its library, and includes it in Today. It adds plans and nothing else: it cannot
        change or remove anything already there.
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
