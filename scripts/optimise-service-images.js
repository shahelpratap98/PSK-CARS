// Turns the 2432x1792 Recraft renders in assets/services into web-sized cards.
//
// The cards render at roughly 620px wide, so 1200px covers a 2x display without
// shipping multi-megabyte PNGs. WebP only: these are decorative <img> tags, not
// link-preview targets, and every browser in use supports it.
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdir, readdir, stat } from 'node:fs/promises'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = join(root, 'assets', 'services')
const outDir = join(root, 'public', 'services')

await mkdir(outDir, { recursive: true })

const kb = async (path) => Math.round((await stat(path)).size / 1024)
const files = (await readdir(sourceDir)).filter((f) => f.endsWith('.png'))

for (const file of files) {
  const slug = file.replace(/\.png$/, '')
  const target = join(outDir, `${slug}.webp`)
  await sharp(join(sourceDir, file))
    .resize({ width: 1200, height: 900, fit: 'cover' })
    .webp({ quality: 78 })
    .toFile(target)
  console.log(`${slug.padEnd(16)} ${await kb(join(sourceDir, file))} KB -> ${await kb(target)} KB`)
}
