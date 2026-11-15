import type { ReactNode } from 'react'
import { PlatformNote } from '@/components/docs/DeviceSwitch'

export type Device = 'ios' | 'mac'

export const deviceNames: Record<Device, string> = { ios: 'iPhone & iPad', mac: 'Mac' }

/**
 * A part of a docs page that belongs to one app. The device switch hides it when the reader has
 * chosen the other; in its place a line says what was folded away and offers it back.
 */
export function Platform({ only, children }: { only: Device; children: ReactNode }) {
  return (
    <>
      <PlatformNote only={only} />
      <div className={`platform only-${only}`} data-only={only}>
        {children}
      </div>
    </>
  )
}
