// Builds the monochrome site logo from the supplied colour badge.
//
// The source is a small JPEG on a white background with a faint watermark
// pattern, so three things have to happen:
//
// 1. Knock out the background. A flood fill from the corners is used rather
//    than a plain "remove all white" pass, because the car, the stars and the
//    wordmark are white too and must survive. The threshold is loose enough to
//    take the watermark speckle with it.
// 2. Convert to greyscale.
// 3. Invert. A straight greyscale badge would be near-invisible on black: the
//    gear ring and the banner are the darkest parts of the artwork. Inverting
//    flips those to light and drops the white details to black, which keeps
//    every element legible against a dark page.
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdir, stat } from 'node:fs/promises'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'assets', 'brand', 'logo-source.jpg')
const outDir = join(root, 'public', 'brand')

await mkdir(outDir, { recursive: true })

const BACKGROUND_MIN_LUMA = 170

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height, channels } = info
const at = (x, y) => (y * width + x) * channels
const luma = (i) => 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]

// Flood fill inward from every corner, clearing background pixels to alpha 0.
const seen = new Uint8Array(width * height)
const queue = [
  [0, 0],
  [width - 1, 0],
  [0, height - 1],
  [width - 1, height - 1],
]

let cleared = 0
while (queue.length) {
  const [x, y] = queue.pop()
  if (x < 0 || y < 0 || x >= width || y >= height) continue

  const flat = y * width + x
  if (seen[flat]) continue
  seen[flat] = 1

  const i = at(x, y)
  if (luma(i) < BACKGROUND_MIN_LUMA) continue

  data[i + 3] = 0
  cleared++
  queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
}

const mono = await sharp(data, { raw: { width, height, channels } })
  .grayscale()
  .negate({ alpha: false })
  // The badge carries a lot of fine detail (gear teeth, the car outline, the
  // stars) and renders about 40px tall in the navbar. Stretching the histogram
  // to the full range stops it reading as a grey smudge at that size.
  .normalise()
  .png()
  .toBuffer()

// Trim the transparent margin so the mark can be sized by its own bounding box.
const target = join(outDir, 'psk-logo.png')
await sharp(mono).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toFile(target)

const trimmed = await sharp(target).metadata()
const kb = Math.round(((await stat(target)).size / 1024) * 10) / 10

console.log(`source        ${width}x${height}`)
console.log(`background    ${cleared} px cleared`)
console.log(`written       psk-logo.png  ${trimmed.width}x${trimmed.height}  ${kb} KB`)
