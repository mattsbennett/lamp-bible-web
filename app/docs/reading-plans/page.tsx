import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Figure, Table } from '@/components/docs/DocPage'
import { Platform } from '@/components/docs/Platform'
import { PlansArt } from '@/components/home/art'

export const metadata: Metadata = {
  title: 'Reading plans',
  description:
    'Follow or create reading plans, track progress, set reminders and use reading-time estimates, quizzes and widgets.',
}

export default function Page() {
  return (
    <DocPage
      href="/docs/reading-plans"
      title="Reading plans"
      intro="Follow reading plans, track your progress and create a schedule for passages you choose."
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
        You can <a href="#making-a-plan">create a plan</a> or install one as a module.
        See <Link href="/docs/modules/authoring">Authoring modules</Link>.
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
        Quiz modules add age-graded questions to plan readings. The bundled quiz has five questions
        per reading for each of five age groups, from young children to adults. Select a group
        under <strong>Questions For</strong>; Lamp remembers your choice.
      </p>
      <p>
        Each question has a theme and passage cards. Swipe between cards or choose{' '}
        <strong>Read in Context</strong> to open a passage. <strong>Show Answer</strong> reveals the
        answer; <strong>Next Question</strong> advances. There is no scoring. The menu offers{' '}
        <strong>Always Show Answers</strong> and read aloud. If no questions are available for the
        selected group, Lamp suggests another.
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
          Choose <strong>New Plan</strong> under Your Plans. On iOS 26 with Apple Intelligence,{' '}
          <strong>Make from Description</strong> fills the form from a prompt. This requires{' '}
          <strong>Show AI Features</strong> in Settings, which is off by default. Choose{' '}
          <strong>Preview</strong> to review the schedule, then name the plan and tap <strong>Add</strong>{' '}
          to follow it. Swipe a plan or tap <strong>Edit</strong> to delete it.
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
            If the widget says no plan is selected, open Lamp and add a plan under Plans.
            The widget updates on its next refresh.
          </p>
        </Callout>
      </Platform>

      <Platform only="mac">
        <h2>On the Mac</h2>

        <h3>Today</h3>
        <p>
          <strong>Today</strong> shows your followed plans, today’s readings, completion counts
          and weekly progress. Each plan offers <strong>Start Reading</strong>,{' '}
          <strong>Continue Reading</strong> or <strong>Read Again</strong>.{' '}
          <strong>Pick Up Where You Left Off</strong> links to your current passage, daily quiz
          and last writing. Use the arrows or calendar to change days.
        </p>
        <p>
          Each reading shows an estimated time. Mark it complete, open it in the reader or use its
          context menu to open an <Link href="/docs/reader">external Bible app</Link>.
          The <strong>Lamp Bible</strong> menu bar item also lists today’s readings.
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
