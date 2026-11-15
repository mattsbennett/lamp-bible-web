'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { site } from '@/lib/site'

/**
 * The contact address as a link. The page carries it written out ("[at]", "[dot]") for anyone
 * harvesting addresses; the link is made in the browser, so a reader can still just click it.
 */
export function EmailLink({
  subject,
  className,
  children,
}: {
  subject?: string
  className?: string
  children?: ReactNode
}) {
  const link = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    const address = site.email.replace('[at]', '@').replace('[dot]', '.')
    link.current?.setAttribute('href', `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`)
  }, [subject])
  return (
    <a ref={link} className={className}>
      {children ?? site.email}
    </a>
  )
}
