#!/usr/bin/env node
/**
 * Copies the module JSON schemas out of the (private) lamp-bible-modules repo
 * into public/modules/schemas, and records where they came from.
 *
 * The web repo must stay standalone — Vercel builds it without any access to
 * the private repo — so the copies are committed. The manifest is what makes
 * the copies auditable: it pins the source commit and the SHA-256 of every
 * file, so `--check` can tell you when the upstream originals have moved on.
 *
 *   node scripts/sync-module-assets.mjs            # copy and rewrite manifest
 *   node scripts/sync-module-assets.mjs --check    # report drift, change nothing
 *   node scripts/sync-module-assets.mjs --source ../elsewhere
 *
 * The source repo is only needed by whoever runs this. If it is missing the
 * script says so and exits 0, so it is safe to wire into a build.
 */

import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const webRepo = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const args = process.argv.slice(2)
const checkOnly = args.includes('--check')
const sourceArg = args.indexOf('--source')
const sourceRepo = resolve(
  webRepo,
  sourceArg !== -1 ? args[sourceArg + 1] : process.env.LAMP_MODULES_REPO || '../lamp-bible-modules'
)

const OUT_DIR = join(webRepo, 'public/modules/schemas')
const MANIFEST = join(webRepo, 'public/modules/manifest.json')

/** JSON schema files copied verbatim into public/. */
const COPY_GLOB = { dir: 'schemas', match: (f) => f.endsWith('.json') }

/**
 * Files that are not copied, but that the documentation is derived from — the
 * SQLite DDL on /docs/modules/building is transcribed out of these converters.
 * Hashing them means a change upstream shows up as drift and prompts a review
 * of the prose, which a plain file copy would never catch.
 */
const WATCHED = [
  ['scripts/json_to_sqlite.py', 'DDL for dictionary, commentary, notes and devotional modules'],
  ['scripts/translation_to_sqlite.py', 'DDL for translation modules'],
  ['scripts/highlights_to_sqlite.py', 'DDL for highlight modules'],
  ['scripts/bundle_plans.py', 'DDL for reading plan modules'],
  ['scripts/bundle_quizzes.py', 'DDL for quiz modules'],
]

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex')

function sourceCommit() {
  try {
    const out = execFileSync('git', ['-C', sourceRepo, 'rev-parse', 'HEAD'], { encoding: 'utf8' })
    return out.trim()
  } catch {
    return null
  }
}

function sourceIsDirty() {
  try {
    const out = execFileSync('git', ['-C', sourceRepo, 'status', '--porcelain'], {
      encoding: 'utf8',
    })
    return out.trim().length > 0
  } catch {
    return false
  }
}

function collect() {
  const schemaDir = join(sourceRepo, COPY_GLOB.dir)
  const assets = readdirSync(schemaDir)
    .filter(COPY_GLOB.match)
    .sort()
    .map((name) => {
      const bytes = readFileSync(join(schemaDir, name))
      return {
        path: `schemas/${name}`,
        from: `${COPY_GLOB.dir}/${name}`,
        bytes: bytes.length,
        sha256: sha256(bytes),
        _bytes: bytes,
      }
    })

  const watched = WATCHED.map(([rel, note]) => {
    const abs = join(sourceRepo, rel)
    if (!existsSync(abs)) return { from: rel, note, sha256: null, missing: true }
    return { from: rel, note, sha256: sha256(readFileSync(abs)) }
  })

  return { assets, watched }
}

function readManifest() {
  if (!existsSync(MANIFEST)) return null
  return JSON.parse(readFileSync(MANIFEST, 'utf8'))
}

function main() {
  if (!existsSync(sourceRepo)) {
    console.log(`• lamp-bible-modules not found at ${sourceRepo}`)
    console.log('  Skipping. Set LAMP_MODULES_REPO or pass --source to point at a checkout.')
    process.exit(0)
  }

  const { assets, watched } = collect()
  const commit = sourceCommit()
  const dirty = sourceIsDirty()

  if (checkOnly) {
    const manifest = readManifest()
    if (!manifest) {
      console.error('✗ No manifest at public/modules/manifest.json. Run without --check first.')
      process.exit(1)
    }

    const problems = []
    const bySourcePath = new Map(manifest.assets.map((a) => [a.from, a]))

    for (const asset of assets) {
      const known = bySourcePath.get(asset.from)
      if (!known) problems.push(`new upstream file, not yet copied: ${asset.from}`)
      else if (known.sha256 !== asset.sha256) problems.push(`changed upstream: ${asset.from}`)
      bySourcePath.delete(asset.from)
    }
    for (const stale of bySourcePath.keys()) {
      problems.push(`copied file no longer exists upstream: ${stale}`)
    }

    const watchedByPath = new Map(manifest.watched.map((w) => [w.from, w]))
    for (const w of watched) {
      const known = watchedByPath.get(w.from)
      if (!known) problems.push(`newly watched file: ${w.from}`)
      else if (known.sha256 !== w.sha256) {
        problems.push(`changed upstream (docs may be stale): ${w.from} — ${w.note}`)
      }
    }

    // Verify the committed copies still match their recorded hashes.
    for (const known of manifest.assets) {
      const local = join(webRepo, 'public/modules', known.path)
      if (!existsSync(local)) problems.push(`missing local copy: public/modules/${known.path}`)
      else if (sha256(readFileSync(local)) !== known.sha256) {
        problems.push(`local copy edited by hand: public/modules/${known.path}`)
      }
    }

    if (problems.length === 0) {
      console.log(`✓ Module assets are in sync with ${manifest.source.commit?.slice(0, 7)}`)
      process.exit(0)
    }

    console.error('✗ Module assets have drifted:\n')
    for (const p of problems) console.error(`  - ${p}`)
    console.error('\nRun: npm run sync:modules')
    process.exit(1)
  }

  mkdirSync(OUT_DIR, { recursive: true })
  for (const asset of assets) {
    writeFileSync(join(webRepo, 'public/modules', asset.path), asset._bytes)
  }

  const manifest = {
    $comment:
      'Generated by scripts/sync-module-assets.mjs. Do not edit by hand — run npm run sync:modules.',
    generatedAt: new Date().toISOString().slice(0, 10),
    source: {
      repo: 'lamp-bible-modules',
      private: true,
      commit,
      dirtyWorkingTree: dirty || undefined,
    },
    assets: assets.map(({ _bytes, ...rest }) => rest),
    watched,
  }

  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

  console.log(`✓ Copied ${assets.length} schema files from ${commit?.slice(0, 7) ?? 'unknown'}`)
  if (dirty) console.log('  ! Source working tree is dirty; commit there for a stable reference.')
  for (const w of watched.filter((w) => w.missing)) {
    console.log(`  ! Watched file missing upstream: ${w.from}`)
  }
}

main()
