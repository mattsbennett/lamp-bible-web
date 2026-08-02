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
      <h2>The bundled plans</h2>

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

      <p>
        Plans are modules, so this list is not fixed. A plan you author yourself installs exactly
        like the bundled ones — see <Link href="/docs/modules/authoring">Authoring modules</Link>.
      </p>

      <h2>Following plans</h2>
      <p>
        You can select more than one plan at a time; the Plans tab merges the day’s readings from
        all of them. Each individual reading is completed on its own, so a three-reading day can be
        half done. Completions are recorded per plan, per year, so restarting a plan next year gives
        you a fresh slate without erasing history.
      </p>
      <p>
        The date can be moved backwards and forwards from the plan view, which is how you catch up
        on a missed day or read ahead.
      </p>

      <h3>Reading time estimates</h3>
      <p>
        Every reading shows a verse count and an estimated time. The estimate is your
        words-per-minute setting applied to the actual word count of the passage in your chosen
        translation. The default is 183 wpm; presets cover average adult silent reading and reading
        aloud, and the value is adjustable directly.
      </p>

      <h3>Where readings open</h3>
      <p>
        By default, tapping a reading opens it in the in-app reader in Portion mode, which scopes
        the passage to exactly the assigned verses. If you would rather read in Accordance, e-Sword
        LT, Logos, Olive Tree or YouVersion, set that app in Settings and readings will hand off to
        it instead. Both buttons can be shown at once.
      </p>

      <h2>Daily reminder</h2>
      <p>
        A single local notification can be scheduled at a time of your choosing — 6:30 pm by default
        — reminding you of the day’s readings. It is a local notification, so it needs no account
        and no server.
      </p>

      <h2>Quizzes</h2>
      <p>
        Some plans ship with a companion quiz module: questions tied to specific readings, graded by
        age group. When the passage you are reading has questions available, the reader offers them
        from the bottom toolbar.
      </p>
      <p>
        Set your default age group in Settings. If a reading has no questions for the selected
        group, the app says so and suggests trying another group rather than showing an empty quiz.
        There is also an option to always reveal answers, for use with a group.
      </p>

      <h2>The home-screen widget</h2>
      <p>
        A <strong>Today’s Readings</strong> widget shows the current plan’s readings, how many you
        have completed, and the total estimated time. Tapping a reading opens it directly in the
        app.
      </p>

      <Callout title="If the widget looks empty">
        <p>
          The widget reads from a shared data store that the app writes to. If it says no plan is
          selected, open the app and choose a plan in the Plans tab; the widget will fill in on its
          next refresh.
        </p>
      </Callout>
    </DocPage>
  )
}
