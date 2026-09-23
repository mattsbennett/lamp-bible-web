'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'

type Device = 'unknown' | 'mac' | 'other'

/** iPadOS reports a Macintosh user agent, so touch support is what tells them apart. */
function detectDevice(): Device {
  const ua = navigator.userAgent
  const macUA = /Macintosh|Mac OS X/.test(ua) && !/iPhone|iPad|iPod/.test(ua)
  return macUA && navigator.maxTouchPoints <= 1 ? 'mac' : 'other'
}

const subscribe = () => () => {}

/**
 * Starts the .dmg download once, on Macs only, and says what happened. Visitors on other
 * devices are told the file needs a Mac instead of receiving a disk image they can't open.
 */
export function AutoDownload({ href, appStoreUrl }: { href: string; appStoreUrl: string }) {
  const device = useSyncExternalStore<Device>(subscribe, detectDevice, () => 'unknown')
  const started = useRef(false)

  useEffect(() => {
    if (device !== 'mac' || started.current) return
    started.current = true
    window.location.assign(href)
  }, [device, href])

  return (
    <p aria-live="polite" className="mt-5 min-h-[1.75rem] text-lg leading-relaxed text-muted">
      {device === 'mac' && (
        <>
          Your download has started. If it didn&apos;t,{' '}
          <a href={href} className="text-accent hover:underline">
            download it directly
          </a>
          .
        </>
      )}
      {device === 'other' && (
        <>
          This file is for Mac. Open this page on your Mac, or{' '}
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            get the iPhone &amp; iPad app
          </a>{' '}
          from the App Store.
        </>
      )}
    </p>
  )
}
