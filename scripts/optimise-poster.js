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
//
// The mobile poster is cropped to match s15-hero-mobile.mp4, otherwise the wide
// shot would flash for a moment before the cropped video replaced it. The
// rectangle is the video crop scaled by 2752/2560, since the still was rendered
// slightly wider than the video.
const MOBILE_CROP = { left: 998, top: 441, width: 512, height: 1095 }

const outputs = [
  {
    file: 's15-poster.jpg',
    // Matches the 2560-wide desktop video. At 1600 it was visibly upscaled on
    // larger displays during the moment before the video starts playing.
    run: (img) => img.resize({ width: 2560, withoutEnlargement: true }).jpeg({ quality: 76, mozjpeg: true }),
  },
  {
    file: 's15-poster-mobile.jpg',
    run: (img) =>
      img.extract(MOBILE_CROP).resize({ width: 720 }).jpeg({ quality: 76, mozjpeg: true }),
  },
]

const kb = async (path) => Math.round((await stat(path)).size / 1024)

console.log(`source  s15-poster-source.png  ${await kb(source)} KB`)

for (const { file, run } of outputs) {
  const target = join(root, 'public', file)
  await run(sharp(source)).toFile(target)
  console.log(`written ${file}  ${await kb(target)} KB`)
}
