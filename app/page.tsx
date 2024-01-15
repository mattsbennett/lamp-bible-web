import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full font-mono items-center justify-between text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-center justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Image
            src="/lampflame.svg"
            alt="Lamp Logo"
            width={25}
            height={50}
            priority
          />
          <span className="pl-2 pt-2 text-lg">Lamp Bible</span>
        </div>
        <p className="fixed left-0 top-0 text-s flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Bible Reading Companion App
        </p>
      </div>

      <div className="relative flex place-items-center">
        <a href="#" target="_blank">
          <Image
            src="/lampicon.png"
            alt="Lamp App Icon"
            width={200}
            height={200}
            priority
          />
        </a>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-center">
        <a
          href="https://github.com/mattsbennett/lamp-bible-ios/issues"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Contact{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 inline-block`}>
            Contact the developer with support or feature requests.
          </p>
        </a>
        <a
          href="/privacy"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Privacy Policy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 text-sm opacity-50 inline-block`}>
            Read Lamp Bible&apos;s privacy policy.
          </p>
        </a>
        <a
          href="#"
          className="flex flex-wrap justify-center group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
        >
          <h2 className={`mb-3 text-2xl font-semibold w-full`}>
            Download{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <Image
            src="/appstore.svg"
            alt="Lamp App Icon"
            className='mt-1'
            width={140}
            height={40}
            priority
          />
        </a>
      </div>
    </main>
  )
}
