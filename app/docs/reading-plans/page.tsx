import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'

export const metadata: Metadata = {
  title: 'Reading plans',
  description:
    'Daily reading plans with per-reading completion, reading-time estimates, daily reminders, age-graded quizzes and a home-screen widget.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/reading-plans"
      title="Reading plans"
      intro="Follow one plan or several at once, track each reading separately, and keep today’s portion on your home screen."
    >
      <h2>Included companion plans</h2>

      <Table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Shape</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Bible Companion</td>
            <td>
              Robert Roberts’ classic scheme: three readings a day, taking you through the Old
              Testament once and the New Testament twice each year.
            </td>
          </tr>
          <tr>
            <td>Children’s Bible Companion — Junior</td>
            <td>A graded plan for roughly ages 7–9, from the Christadelphian Sunday School.</td>
          </tr>
          <tr>
            <td>Children’s Bible Companion — Intermediate</td>
            <td>The same scheme graded for roughly ages 10–12.</td>
          </tr>
        </tbody>
      </Table>

      <Callout title="Public-domain plans">
        <p>
          All three companion plans are public domain and included in new release bundles. Their
          original author and committee credits are retained under{' '}
          <Link href="/content-licences">Content licences</Link>.
        </p>
      </Callout>

      <p>
        Plans are modules, so this list is not fixed. A plan you author yourself installs exactly
        like the bundled ones — see <Link href="/docs/modules/authoring">Authoring modules</Link>.
      </p>

      <h2>Following plans</h2>
      <p>
        The home screen is today’s readings. Under <strong>Plans</strong>, tap{' '}
        <strong>Add</strong> to choose which plans you follow — more than one at a time is fine, and
        each appears with its own readings, the day’s total time, and how many you have read. Tap
        the circle beside a reading to mark it read; a three-reading day can be half done.
        Completions are recorded per plan, per year, so restarting a plan next year gives you a
        fresh slate without erasing history.
      </p>
      <p>
        The date at the top moves backwards and forwards a day at a time, or tap it to pick one —
        which is how you catch up on a missed day or read ahead.
      </p>

      <h3>Reading time estimates</h3>
      <p>
        Every reading shows a verse count and an estimated time. The estimate is your
        words-per-minute setting applied to the actual word count of the passage in your chosen
        translation. The default is 183 wpm, the average adult rate for reading aloud; a{' '}
        <strong>Silent</strong> preset sets 238 wpm, and the slider goes from 70 to 400. The same
        rate sets the pace of <Link href="/docs/reader">read aloud</Link>.
      </p>

      <h3>Where readings open</h3>
      <p>
        Tapping a reading opens it in the reader, scoped to exactly the assigned verses; pulling
        past the end moves on to the next reading. Each plan also has a{' '}
        <strong>Start Reading</strong> button that goes through the day’s readings in order from
        the first one you have not read, and becomes <strong>Continue Reading</strong> and then{' '}
        <strong>Read Again</strong>.
      </p>
      <p>
        If you would rather read in Accordance, e-Sword LT, Logos, Olive Tree or YouVersion, choose
        that app under <strong>External Bible</strong> in Settings, and each reading gets a button
        named for it. Opening a reading there marks it read. Turn off{' '}
        <strong>In-app Bible</strong> to make the external app the default.
      </p>

      <h2>Daily reminder</h2>
      <p>
        A single local notification can be scheduled at a time of your choosing — 6:30 pm by default
        — reminding you of the day’s readings. It is a local notification, so it needs no account
        and no server.
      </p>

      <h2>Quizzes</h2>
      <p>
        A plan can have a companion quiz module: questions tied to specific readings, graded by age
        group. When a plan reading has questions, a <strong>Quiz Available</strong> card appears
        after its last verse, and the Readings menu in the reader’s toolbar offers it too.
      </p>
      <Callout title="Quiz content cleared">
        <p>
          The Bible Companion quiz module is included in new release bundles. Its identified
          ESV-specific wording was replaced through a reviewed, targeted process using the CC0
          Berean Standard Bible; the existing questions and answers were preserved rather than
          wholesale regenerated. The final audit found no explicit ESV naming and no ESV-only exact
          run of eight or more words. Other works used during original generation remain recorded
          as provenance, not as release blockers.
        </p>
      </Callout>
      <p>
        The bundled quiz has five questions a reading for each of five age groups, from young
        children to adults. Choose a group at the top of the quiz; your choice is remembered. Each
        question has a theme and its references, which open a preview, and{' '}
        <strong>Show Answer</strong> reveals the answer — it is a set of questions to discuss rather
        than a test, with no scoring. The quiz menu can <strong>Always Show Answers</strong>, for
        use with a group, and the quiz can be read aloud. If a reading has no questions for the
        selected group, the app says so and suggests another.
      </p>

      <h2>The home-screen widget</h2>
      <p>
        A <strong>Today’s Readings</strong> widget shows a plan’s readings, how many you have
        completed, and the total estimated time. It comes in small and medium Home Screen sizes and
        three Lock Screen sizes. Edit the widget to choose the plan and whether readings open in
        Lamp Bible or your external Bible app; in the medium size, each reading opens directly.
      </p>
      <p>The widget needs iOS 26.2 or later; the rest of the app runs on iOS 18.</p>

      <Callout title="If the widget looks empty">
        <p>
          The widget reads from a shared data store that the app writes to. If it says no plan is
          selected, open the app and add a plan under Plans; the widget will fill in on its next
          refresh.
        </p>
      </Callout>
    </DocPage>
  )
}
