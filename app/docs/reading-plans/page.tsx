import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Figure, Table } from '@/components/docs/DocPage'
import { Platform } from '@/components/docs/Platform'
import { PlansArt } from '@/components/home/art'

export const metadata: Metadata = {
  title: 'Reading plans',
  description:
    'Daily reading plans with per-reading completion, reading-time estimates, plans made from what you want to read, daily reminders, age-graded quizzes and a home-screen widget.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/reading-plans"
      title="Reading plans"
      intro="Follow one plan or several at once, track each reading separately, and keep today’s portion in front of you."
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
        Plans are modules, so this list is not fixed. You can{' '}
        <a href="#making-a-plan">make a plan</a> from what you want to read, and a plan you author
        as a module installs exactly like the bundled ones — see{' '}
        <Link href="/docs/modules/authoring">Authoring modules</Link>.
      </p>

      <h2>Reading time estimates</h2>
      <p>
        Every reading shows an estimated time: your words-per-minute setting applied to the actual
        word count of the passage in your chosen translation. The default is 183 wpm, the average
        adult rate for reading aloud; a <strong>Silent</strong> preset sets 238 wpm, and the slider
        goes from 70 to 400. The same rate sets the pace of{' '}
        <Link href="/docs/reader">read aloud</Link>.
      </p>

      <h2 id="making-a-plan">Making your own plan</h2>
      <p>
        A new plan starts from the passages you want to read, such as <code>Matthew–John</code> or{' '}
        <code>Psalms 1–41</code>, with <strong>Read Something Alongside</strong> for parallel
        readings. Each part is spread over the plan or read at a set number of chapters a day. Set
        the duration, start date and days off; if every part has a daily pace, choose{' '}
        <strong>Until Read Through</strong> instead of a fixed duration. With Apple Intelligence
        and <strong>Show AI Features</strong> on, you can describe the plan instead — “the Gospels
        in a month, weekdays only” — and the model on the device fills the form in.
      </p>
      <p>
        A plan you make is a plan module like any other, and syncs to your other devices. Deleting
        it deletes it on every device you sync with, and its ticked readings go with it.
      </p>

      <h2>Quizzes</h2>
      <p>
        A plan can have a companion quiz module: questions tied to specific readings, graded by age
        group. The bundled quiz has five questions a reading for each of five age groups, from young
        children to adults. Choose a group from <strong>Questions For</strong> at the top of the
        quiz; your choice is remembered. Each question has a theme, and the passages it cites are
        shown beneath it as cards — swipe between them, and tap{' '}
        <strong>Read in Context</strong> to open one in the reader.{' '}
        <strong>Show Answer</strong> reveals the answer, and <strong>Next Question</strong> moves
        on. The questions are for discussion and are not scored. The quiz menu
        can <strong>Always Show Answers</strong>, for use with a group, and the quiz can be read
        aloud. If a reading has no questions for the selected group, the app says so and suggests
        another.
      </p>

      <Platform only="ios">
        <h2>On iPhone and iPad</h2>

        <h3>Following plans</h3>
        <p>
          Tap <strong>Manage</strong> beside Daily Reading on the home screen, or{' '}
          <strong>Reading Plan</strong> if you follow none. Bundled plans appear under{' '}
          <strong>Built In</strong>; added plans appear under <strong>Your Plans</strong>.
          Choose <strong>Follow</strong> for each plan you want.
        </p>
        <p>
          Each followed plan shows the day of the year and a circle for each day of the week.
          Its home-screen card lists today’s readings, total reading time and completion count.
          On iPhone, readings appear within the card. The chevron collapses the summary to the
          plan name and completion count, leaving readings visible; this applies to all plans on
          that device. Tap a reading’s circle to mark it complete. Progress is stored separately
          for each plan and year, preserving previous years’ history.
        </p>
        <p>
          The date at the top moves backwards and forwards a day at a time, or tap it to pick one —
          which is how you catch up on a missed day or read ahead. The Readings menu in the reader
          adds each reading’s verse count.
        </p>

        <Figure caption="The day’s card for The Bible Companion: the day of the year, the readings and how long they take, and what is up next.">
          <PlansArt />
        </Figure>

        <h3>Where readings open</h3>
        <p>
          Tapping a reading opens it in the reader, scoped to exactly the assigned verses; pulling
          past the end moves on to the next reading. Each plan also has a{' '}
          <strong>Start Reading</strong> button that goes through the day’s readings in order from
          the first one you have not read, and becomes <strong>Continue Reading</strong> and then{' '}
          <strong>Read Again</strong>. When a reading has quiz questions, a{' '}
          <strong>Quiz Available</strong> card appears after its last verse, and the Readings menu
          offers it too.
        </p>
        <p>
          If you would rather read in Accordance, e-Sword LT, Logos, Olive Tree or YouVersion, choose
          that app under <strong>Open Readings In</strong> in Settings, and each reading gets a
          button named for it. Opening a reading there marks it read. Turn off{' '}
          <strong>In-app Bible</strong> to make the external app the default.
        </p>

        <h3>Group reading</h3>
        <p>
          For group reading, set <strong>Readers</strong> in Settings → Reading Plans to how many of
          you take turns. With more than one, each reading shows how many verses each reader takes,
          and tapping that changes the number.
        </p>

        <h3>Making a plan</h3>
        <p>
          Choose <strong>New Plan</strong> at the end of Your Plans. On iOS 26 with Apple
          Intelligence, <strong>Make from Description</strong> fills the form in from a
          description; it shows only once <strong>Show AI Features</strong> is on in Settings, and
          starts off. Either way, <strong>Preview</strong> lays out every day and its readings
          before anything is added, with a sentence saying what is read, how fast and on which
          days. Name the plan, tap <strong>Add</strong>, and you are following it. Swipe a plan, or
          tap <strong>Edit</strong>, to delete it.
        </p>

        <h3>Daily reminder</h3>
        <p>
          Set a daily reminder for your preferred time (6:30 pm by default). The notification
          runs locally and needs no account or server.
        </p>

        <h3>The home-screen widget</h3>
        <p>
          A <strong>Today’s Readings</strong> widget shows a plan’s readings, how many you have
          completed, and the total estimated time. It comes in small and medium Home Screen sizes
          and three Lock Screen sizes. Edit the widget to choose the plan and whether readings open
          in Lamp Bible or your external Bible app; in the medium size, each reading opens directly.
          The widget needs iOS 26.2 or later; the rest of the app runs on iOS 18.
        </p>

        <Callout title="If the widget looks empty">
          <p>
            The widget reads from a shared data store that the app writes to. If it says no plan is
            selected, open the app and add a plan under Plans; the widget will fill in on its next
            refresh.
          </p>
        </Callout>
      </Platform>

      <Platform only="mac">
        <h2>On the Mac</h2>

        <h3>Today</h3>
        <p>
          <strong>Today</strong> is the day’s page. It shows each plan you follow with that day’s
          readings, how many are done, and <strong>Start Reading</strong>,{' '}
          <strong>Continue Reading</strong> or <strong>Read Again</strong>; a strip showing how the
          week stands; and, under <strong>Pick Up Where You Left Off</strong>, the passage open in
          the reader, the quiz on the day’s readings and the writing you last worked on. The arrows
          and the calendar at the top show another day. Each reading shows its estimated time and
          can be marked complete, opened in the reader, or — from its context menu — opened in an
          external Bible app. The <strong>Lamp Bible</strong> item in the menu bar lists today’s
          readings too.
        </p>

        <h3>Reading Plans and plan reading</h3>
        <p>
          <strong>Reading Plans</strong> chooses which plans appear in Today. Opening a plan enters
          plan reading: only the day’s passages, a bar to move between readings and mark them
          complete, and the day’s quiz in a panel. Settings → Reading Plans sets the reading speed
          and a daily reminder. The plans you follow and the readings you tick sync with your iPhone
          and iPad.
        </p>

        <h3>Making a plan</h3>
        <p>
          <strong>New Plan…</strong> in Reading Plans opens the plan form in a sheet, with the days
          laid out beside it as you fill it in; <strong>Fill In the Form</strong> reads a
          description on macOS 26, with <strong>Show AI Features</strong>{' '}on in Settings → AI
          &amp; Agents. Delete a plan of your own from its menu.
        </p>
      </Platform>
    </DocPage>
  )
}
