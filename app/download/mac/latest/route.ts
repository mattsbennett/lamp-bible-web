import { NextResponse } from 'next/server'
import { downloadPaths, macRelease } from '@/lib/site'

/**
 * A permanent address for "the current Mac build". The redirect is temporary (307) so that
 * browsers and caches follow the next release rather than pinning this one.
 */
export function GET(request: Request) {
  const target = macRelease.url ?? new URL(downloadPaths.page, request.url)
  return NextResponse.redirect(target, 307)
}
