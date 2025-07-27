import Image from 'next/image'
import Link from 'next/link'

export default function Privacy() {
    return (
      <main className="flex min-h-screen flex-col justify-between p-10 sm:p-24">
        <div className="z-10 max-w-5xl w-full font-mono items-center justify-between text-sm lg:flex">
        <Link href="/">
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-center justify-center bg-linear-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                <Image
                    src="/lampflame.svg"
                    alt="Lamp Logo"
                    width={25}
                    height={50}
                    priority
                />
                <span className="pl-2 pt-2 text-lg">Lamp Bible</span>
            </div>
        </Link>
        </div>
        <div className='flex min-h-screen flex-col justify-between lg:pt-16 pb-20'>
            <h2 className="text-3xl font-bold">Privacy Policy</h2>
            <h3 className="text-2xl mt-10 mb-2">Information Collection and Use</h3>
            <p className='leading-loose'>Lamp Bible does not collect any personal information or user data. We do not gather, use, or share any information about your device, location, or activities within the app.</p>
            <h3 className="text-2xl mt-10 mb-2">User Tracking</h3>
            <p className='leading-loose'>We do not employ any user tracking or analytics tools within Lamp Bible. Your usage of the app is not monitored, and no data is collected for the purpose of tracking your behavior.</p>
            <h3 className="text-2xl mt-10 mb-2">Third-Party Services</h3>
            <p className='leading-loose'>Lamp Bible does not integrate with any third-party services that collect user data. We do not share any information with external parties.</p>
            <h3 className="text-2xl mt-10 mb-2">Contact Us</h3>
            <p className='leading-loose'>If you have any questions about our Privacy Policy, please contact us at lampbibleapp[at]gmail[dot]com.</p>
            <h3 className="text-2xl mt-10 mb-2">Changes to This Privacy Policy</h3>
            <p className='leading-loose'>Lamp Bible reserves the right to make changes to this Privacy Policy. Any updates will be communicated within the app or on our website.</p>
            <p className='leading-loose'>By using Lamp Bible, you agree to the terms of this Privacy Policy. If you do not agree with these terms, please do not use the app.</p>
            <p className='leading-loose'>This Privacy Policy was last updated on Jan. 13, 2024.</p>
        </div>
      </main>
    )
  }