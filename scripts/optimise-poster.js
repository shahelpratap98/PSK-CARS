// Regenerates the hero poster from the original still.
// The raw 2752x1536 PNG is ~5.7MB, which is the page's LCP element — far too
// heavy. Run `npm run optimise:poster` if the source still is ever replaced.
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { stat } from 'node:fs/promises'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
// The full-resolution still is kept out of public/ so it is never served.
const source = join(root, 'assets', 's15-poster-source.png')

// JPEG only: <video poster> takes a single URL with no format negotiation, and
// link-preview scrapers are unreliable with WebP, so one broadly supported file
// is worth more here than a smaller one.
const outputs = [{ file: 's15-poster.jpg', run: (img) => img.jpeg({ quality: 74, mozjpeg: true }) }]

const kb = async (path) => Math.round((await stat(path)).size / 1024)

console.log(`source  s15-poster-source.png  ${await kb(source)} KB`)

for (const { file, run } of outputs) {
  const target = join(root, 'public', file)
  await run(sharp(source).resize({ width: 1600, withoutEnlargement: true })).toFile(target)
  console.log(`written ${file}  ${await kb(target)} KB`)
}
