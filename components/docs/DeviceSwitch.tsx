'use client'

import { useEffect, useId, useRef, useSyncExternalStore, type KeyboardEvent } from 'react'
import { deviceKey as KEY } from '@/lib/device'

type Choice = 'both' | 'ios' | 'mac'
const choices: Array<{ value: Choice; label: string }> = [
  { value: 'both', label: 'Both' },
  { value: 'ios', label: 'iPhone & iPad' },
  { value: 'mac', label: 'Mac' },
]

const listeners = new Set<() => void>()

function current(): Choice {
  const value = document.documentElement.dataset.device
  return value === 'ios' || value === 'mac' ? value : 'both'
}

function choose(value: Choice) {
  if (value === 'both') delete document.documentElement.dataset.device
  else document.documentElement.dataset.device = value
  try {
    if (value === 'both') localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, value)
  } catch {
    // A private window or blocked storage: the choice holds for this page view only.
  }
  listeners.forEach((listener) => listener())
}

/** Shows everything again if the reader's choice would hide a section about `only`. */
export function revealDevice(only: 'ios' | 'mac' | undefined) {
  const device = current()
  if (only && device !== 'both' && device !== only) choose('both')
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function useDevice() {
  return useSyncExternalStore(subscribe, current, () => 'both' as Choice)
}

/**
 * Which app's instructions to show: Both, iPhone & iPad, or Mac. Remembered on this browser.
 * A link into a section the choice hides shows everything again, so it never lands on nothing.
 */
export function DeviceSwitch({ className = '' }: { className?: string }) {
  const device = useDevice()
  const label = useId()
  const buttons = useRef<Array<HTMLButtonElement | null>>([])

  // A radio group: one tab stop, the chosen option, and the arrow keys move the choice.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
    if (!step) return
    event.preventDefault()
    const at = choices.findIndex((choice) => choice.value === device)
    const next = (at + step + choices.length) % choices.length
    choose(choices[next].value)
    buttons.current[next]?.focus()
  }

  useEffect(() => {
    const reveal = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const target = id && document.getElementById(id)
      if (target && target.closest('[data-only]') && target.offsetParent === null) {
        choose('both')
        target.scrollIntoView()
      }
    }
    reveal()
    window.addEventListener('hashchange', reveal)
    return () => window.removeEventListener('hashchange', reveal)
  }, [])

  return (
    <div className={className}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-faint" id={label}>
        Show instructions for
      </p>
      <div
        role="radiogroup"
        aria-labelledby={label}
        onKeyDown={onKeyDown}
        className="grid grid-cols-[auto_1fr_auto] rounded-xl border border-line bg-sunken p-0.5 text-[0.8rem]"
      >
        {choices.map((choice, index) => (
          <button
            key={choice.value}
            ref={(button) => {
              buttons.current[index] = button
            }}
            type="button"
            role="radio"
            aria-checked={device === choice.value}
            tabIndex={device === choice.value ? 0 : -1}
            onClick={() => choose(choice.value)}
            className={`whitespace-nowrap rounded-[0.6rem] px-2 py-1.5 font-medium transition-colors ${
              device === choice.value ? 'bg-raised text-ink shadow-[0_1px_2px_rgb(28_18_8/0.12)]' : 'text-muted hover:text-ink'
            }`}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * Stands where a section for the other device was folded away: says so, and offers it back.
 * Shown only while that section is hidden, by the same rule that hides it.
 */
export function PlatformNote({ only }: { only: 'ios' | 'mac' }) {
  const name = only === 'mac' ? 'Mac' : 'iPhone and iPad'
  return (
    <div className={`platform-note note-for-${only}`}>
      <span>{name} instructions are hidden.</span>{' '}
      <button type="button" onClick={() => choose('both')} className="font-medium text-accent hover:underline">
        Show them
      </button>
    </div>
  )
}
