import type { Metadata } from 'next'
import Link from 'next/link'
import { Platform } from '@/components/docs/Platform'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'AI features',
  description:
    'Set up optional AI features: reading plans, Reader Chat, writing agents and access from other AI apps.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/ai"
      title="AI features"
      intro="Use your own AI account to discuss passages or edit writing. Library lookups are read-only."
    >
      <p>
        AI features are optional. Apple Intelligence can create a{' '}
        <Link href="/docs/reading-plans">reading plan</Link> from a description on iPhone, iPad
        and Mac, using the on-device model. System Writing Tools are also available in the editor.
        On the Mac, Reader Chat and writing agents use your provider’s command-line tool with
        read-only access to your library. Lamp Bible does not run an AI service.
      </p>

      <h2 id="turning-on">Turning it on</h2>
      <p>
        Turn on <strong>Show AI Features</strong>{' '}in Settings → AI &amp; Agents on the Mac.
        AI is off by default, except for libraries already using it. Turning it off hides Reader
        Chat, writing agents and plan generation, disables system Writing Tools in Lamp, and
        revokes other apps’ access to Lamp. Your chats and drafts are retained.
      </p>
      <p>
        The switch is shared with your iPhone and iPad, where it is Settings →{' '}
        <strong>AI Features</strong> and covers making a{' '}
        <Link href="/docs/reading-plans">reading plan</Link> from a description and the system’s
        Writing Tools in Lamp’s text.
      </p>

      <Platform only="ios">
        <h2>On iPhone and iPad</h2>
        <p>
          On iOS 26 with Apple Intelligence, enable <strong>Show AI Features</strong> in Settings
          → AI Features to use <strong>Make from Description</strong> for{' '}
          <Link href="/docs/reading-plans">reading plans</Link> and system Writing Tools in the editor.
          Plan descriptions are processed on the device and are not sent to Lamp Bible.
        </p>
      </Platform>

      <Platform only="mac">
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
          With AI on, Settings → AI &amp; Agents lists each provider under{' '}
          <strong>AI Provider Accounts</strong>,
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
          Library tools can search and read passages, commentary, dictionaries, books, plans and
          quizzes, and analyse Strong’s numbers. They can read personal study content if you enable it.
          Creating writings, replacing drafts from other apps and adding plans require separate
          permissions, all off by default. See <a href="#start-writing">Reader Chat</a> and{' '}
          <a href="#other-apps">Using Lamp in other apps</a>. Use <strong>Test Module Tools</strong>{' '}
          to check the connection.
        </p>

        <h3 id="model">Provider, model and effort</h3>
        <p>
          Use the menus at the top of a chat to choose its provider, model and effort. The model
          menu offers the provider’s default and model aliases, such as <code>opus</code>,{' '}
          <code>sonnet</code> and <code>haiku</code> for Claude Code. Choose{' '}
          <strong>Other Model…</strong> to enter a name, which Lamp passes to the provider unchanged.
          Claude Code offers effort levels from low to max; Codex accepts a typed value; OpenCode
          lists the variants supported by its installed tool. Each chat has its own settings.
        </p>

        <h2 id="skills">Study skills</h2>
        <p>
          Lamp’s agents come with two skills for questions about scripture, which they read before
          answering one:
        </p>
        <ul>
          <li>
            <strong>sola-scriptura</strong> assesses claims against quoted scripture. For a single
            claim, it explains whether the text establishes it. For a draft, it classifies each claim
            as stated, entailed, inferred, imported, unsupported or contrary, and ranks findings by
            their importance to the argument.
          </li>
          <li>
            <strong>original-languages</strong> examines Hebrew or Greek words and their parsing,
            compares translations and checks claims about the original text. It consults TBESG first
            for Greek and BDB for Hebrew, and traces Greek words to the Hebrew they translate in the Septuagint.
          </li>
        </ul>
        <p>
          Both skills instruct agents to assess claims against scripture. They look passages up rather than quoting from memory,
          report a commentary’s view as that commentary’s, and distinguish the contents of your library from evidence for an interpretation. Reader Chat and writing agents have both;{' '}
          <a href="#other-apps">other apps</a> get them as prompts.
        </p>

        <h2>Reader Chat</h2>
        <p>
          <strong>Reader Chat</strong> (⇧⌘J, or the speech-bubble button) opens beside the reader
          once AI is on.
          Ask about the chapter on screen, or name any other passage. It answers from your modules
          through the read-only tools, and cannot edit files or run commands.
        </p>
        <p>
          Each message includes your current chapter, translation, selected verse and selected words
          with their verse references. Enabling <strong>Include personal writing, notes, and highlights</strong>{' '}
          also sends your notes and highlights for that chapter. When disabled, the chat is told that
          this content is not shared. A line below the chapter name lists what the next message will include.
        </p>
        <p>
          The chat looks only in the modules your Module Access setting allows, so a module you have
          hidden stays out of its answers unless you choose all installed modules. A line at the top
          of the chat says what it can reach.
        </p>
        <p>
          Replies appear as they are generated. Claude Code also shows its current tool and passage;
          completed replies list the tools used beneath your question. Replies continue when you
          close the chat, switch to Study Tools or leave the reader. Messages sent during a reply
          are queued. You can edit, prioritise or remove queued messages, and the queue survives
          quitting the app.
        </p>
        <p>
          Each reader tab retains its chat across launches. Use <strong>Chats</strong> to start or
          reopen a conversation, or search its questions and replies. The list identifies chats open
          in other tabs. Right-click a question and choose <strong>Fork From Here</strong>{' '}to start
          a separate conversation from that point. In Settings → AI &amp; Agents,{' '}
          <strong>Keep chats for</strong> sets retention from the last use (two months by default).
          Empty chats are discarded. Reader Chat conversations stay on the Mac and do not sync.
        </p>
        <p id="start-writing">
          Choose <strong>Start a Writing</strong> in the chat header to create a document and copy
          the conversation into its agent chat. To copy only part, right-click a question and choose{' '}
          <strong>Start a Writing from Here…</strong>. The chats are independent after copying:
          Reader Chat stays on this Mac, while the writing’s chat syncs. The new chat marks the end of the copied conversation; the original links to writings created from it.
        </p>
        <p>
          To let an agent create a writing, enable <strong>Allow agents to start a writing</strong>{' '}
          in Settings → AI &amp; Agents → Reader Chats. This is off by default and permits creation
          only, not changes to or deletion of existing writings.
        </p>

        <h2>Writing with an agent</h2>
        <p>
          Choose <strong>Agent</strong> in the writing editor to open the document’s workspace.
          The editor and agent share the draft. Changes are saved in <strong>Revisions</strong>,
          where you can undo them or restore an earlier version. If you and the agent edit a file
          at the same time, you choose which version to keep. The agent receives the active filename
          and selected text, so you can select a paragraph and ask about it.
        </p>
        <ul>
          <li>
            <strong>Chat</strong> shows the workspace folder the agent can read and edit. Edits appear
            in the draft and are saved in Revisions. Claude Code requests permissions in chat, with{' '}
            <strong>Allow</strong>, <strong>Always Allow</strong> for that request type, and <strong>Deny</strong>.
            New messages queue while the agent works; closing the pane does not stop it.
            <p>
              Right-click a question and choose <strong>Undo This Turn…</strong> to restore the draft
              from before that turn and remove that turn and later messages. This also replaces your
              subsequent edits. The restoration is saved in Revisions and can be undone.
            </p>
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
            A writing agent can always read its document, metadata, companion files and added context,
            regardless of the personal-content setting. It can also use web search or shell commands
            when permitted by its provider tool’s settings. Building decks requires Python 3;
            macOS offers to install it on first use.
          </p>
        </Callout>

        <h2 id="other-apps">Using Lamp in other apps</h2>
        <p>
          The same library tools can be used from an AI app you already run — Claude Desktop, Codex,
          Cursor or opencode — through the Model Context Protocol. Turn them on in Settings → AI &amp;
          Agents, under <strong>Use Lamp in Other Apps</strong>, once AI is on:
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
          Enable <strong>Allow other apps to add reading plans</strong> to let an agent create
          a plan for the passages you specify. Lamp adds it to the library and Today when it next
          reads the library. This permission does not allow changes to or deletion of existing content.
          With <strong>Allow agents to start a writing</strong> also enabled, the agent can create
          an empty writing or one with a draft. No Lamp conversation is copied into it.
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
      </Platform>

      <h2>Privacy</h2>
      <p>
        Apple Intelligence processes plan descriptions on the device. On the Mac, Reader Chat
        and writing agents send messages and retrieved content to your chosen provider under its
        terms and privacy policy. No provider tool starts unless you connect a provider. Content
        read by another AI app goes to that app’s provider under its terms.
      </p>
      <p>
        Lamp Bible does not operate or proxy these services and does not receive your conversations.
        See the <Link href="/privacy/apps">app privacy declaration</Link>.
      </p>
    </DocPage>
  )
}
