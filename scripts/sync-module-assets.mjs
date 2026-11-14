#!/usr/bin/env node
/**
 * Copies the module JSON schemas out of lamp-bible-core's Schemas/ folder into
 * public/modules/schemas, and records where they came from. It also hashes the
 * converter scripts in the private lamp-bible-modules repo that the docs
 * describe, without copying them.
 *
 * The web repo must stay standalone — Vercel builds it without either repo —
 * so the copies are committed. The manifest is what makes the copies
 * auditable: it pins the source commits and the SHA-256 of every file, so
 * `--check` can tell you when the upstream originals have moved on.
 *
 *   node scripts/sync-module-assets.mjs            # copy and rewrite manifest
 *   node scripts/sync-module-assets.mjs --check    # report drift, change nothing
 *   node scripts/sync-module-assets.mjs --core ../elsewhere --source ../elsewhere
 *
 * The repos are only needed by whoever runs this. Without lamp-bible-core the
 * script says so and exits 0, so it is safe to wire into a build. Without
 * lamp-bible-modules it still copies the schemas, keeps the watched hashes the
 * manifest already has, and says the scripts weren't checked.
 */

import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const webRepo = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const args = process.argv.slice(2)
const checkOnly = args.includes('--check')
const argument = (flag) => (args.indexOf(flag) !== -1 ? args[args.indexOf(flag) + 1] : undefined)
const coreRepo = resolve(webRepo, argument('--core') ?? process.env.LAMP_CORE_REPO ?? '../lamp-bible-core')
const sourceRepo = resolve(
  webRepo,
  argument('--source') ?? process.env.LAMP_MODULES_REPO ?? '../lamp-bible-modules'
)

const OUT_DIR = join(webRepo, 'public/modules/schemas')
const MANIFEST = join(webRepo, 'public/modules/manifest.json')

/** JSON schema files copied verbatim into public/, from lamp-bible-core. */
const COPY_GLOB = { dir: 'Schemas', match: (f) => f.endsWith('.json') }

/**
 * Files that are not copied, but that the documentation describes. The SQLite
 * DDL on /docs/modules/building is transcribed from lamp-bible-core's compilers,
 * and scripts/verify_sample_modules.py checks the samples against core's own
 * CLI. These converters build the bundled library, so a change here can still
 * mean the prose needs review — hashing them shows that up as drift, which a
 * plain file copy would never catch.
 */
const WATCHED = [
  ['scripts/core_module_builder.py', "Hands module JSON to core's lamp-module build"],
  ['scripts/json_to_sqlite.py', 'Builds dictionary, commentary, notes and devotional modules'],
  ['scripts/commentary_units.py', 'How commentary JSON becomes commentary_units rows'],
  ['scripts/bundle_book_modules.py', 'DDL for long-form book modules'],
  ['scripts/translation_to_sqlite.py', 'Builds translation modules'],
  ['scripts/highlights_to_sqlite.py', 'Builds highlight modules'],
  ['scripts/bundle_plans.py', 'DDL for reading plan modules'],
  ['scripts/bundle_quizzes.py', 'DDL for quiz modules'],
]

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex')

function repoCommit(repo) {
  try {
    const out = execFileSync('git', ['-C', repo, 'rev-parse', 'HEAD'], { encoding: 'utf8' })
    return out.trim()
  } catch {
    return null
  }
}

/** Whether `repo` has uncommitted changes, under `paths` when given. */
function repoIsDirty(repo, paths = []) {
  try {
    const out = execFileSync('git', ['-C', repo, 'status', '--porcelain', '--', ...paths], {
      encoding: 'utf8',
    })
    return out.trim().length > 0
  } catch {
    return false
  }
}

function collect(haveModules) {
  const schemaDir = join(coreRepo, COPY_GLOB.dir)
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

  if (!haveModules) return { assets, watched: null }
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
  if (!existsSync(join(coreRepo, COPY_GLOB.dir))) {
    console.log(`• lamp-bible-core's Schemas/ not found at ${coreRepo}`)
    console.log('  Skipping. Set LAMP_CORE_REPO or pass --core to point at a checkout.')
    process.exit(0)
  }
  const haveModules = existsSync(sourceRepo)

  const { assets, watched } = collect(haveModules)
  const commit = repoCommit(coreRepo)
  const dirty = repoIsDirty(coreRepo, [COPY_GLOB.dir])

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
    for (const w of watched ?? []) {
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

    if (!haveModules) {
      console.log(`• lamp-bible-modules not found at ${sourceRepo}; its watched scripts were not checked.`)
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

  const previous = readManifest()
  const manifest = {
    $comment:
      'Generated by scripts/sync-module-assets.mjs. Do not edit by hand — run npm run sync:modules.',
    generatedAt: new Date().toISOString().slice(0, 10),
    source: {
      repo: 'lamp-bible-core',
      commit,
      dirtyWorkingTree: dirty || undefined,
    },
    watchedSource: haveModules
      ? {
          repo: 'lamp-bible-modules',
          private: true,
          commit: repoCommit(sourceRepo),
          dirtyWorkingTree: repoIsDirty(sourceRepo) || undefined,
        }
      : previous?.watchedSource,
    assets: assets.map(({ _bytes, ...rest }) => rest),
    watched: watched ?? previous?.watched ?? [],
  }

  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

  console.log(`✓ Copied ${assets.length} schema files from ${commit?.slice(0, 7) ?? 'unknown'}`)
  if (dirty) console.log("  ! lamp-bible-core's Schemas/ has uncommitted changes; commit there for a stable reference.")
  if (!haveModules) console.log(`  ! lamp-bible-modules not found at ${sourceRepo}; kept the watched hashes already recorded.`)
  for (const w of (watched ?? []).filter((w) => w.missing)) {
    console.log(`  ! Watched file missing upstream: ${w.from}`)
  }
}

main()
