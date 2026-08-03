// Builds the two hero videos from the original Higgsfield render.
//
// The source is 2560x1440 at ~1.65 Mbps, which is roughly five times under the
// bitrate that resolution needs. It is simultaneously expensive to decode and
// full of compression artifacts. It also carries an AAC track the muted hero
// never plays.
//
// Desktop gets 1080p at a proper bitrate: downscaling averages out the source's
// compression noise, and decoding drops from 3.7 to 2.1 megapixels per frame.
//
// Mobile gets the front-of-car framing baked in as a real portrait crop, so the
// browser no longer CSS-scales the full frame by 1.4x to reach the same shot.
// The crop rectangle below reproduces what that transform used to show.
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { stat } from 'node:fs/promises'
import ffmpeg from '@ffmpeg-installer/ffmpeg'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'assets', 's15-hero-source.mp4')

const COMMON = ['-an', '-movflags', '+faststart', '-pix_fmt', 'yuv420p', '-preset', 'slow']

const jobs = [
  {
    name: 's15-hero.mp4',
    label: 'desktop 1080p',
    filters: 'scale=1920:1080:flags=lanczos',
    crf: '20',
  },
  {
    name: 's15-hero-mobile.mp4',
    label: 'mobile portrait crop',
    // x/y/w/h picked to match the old CSS crop: object-position 42% with
    // scale(1.4) about 70% 100% on a phone-shaped viewport.
    filters: 'crop=476:1030:928:410,scale=720:1558:flags=lanczos',
    crf: '19',
  },
]

const kb = async (path) => Math.round((await stat(path)).size / 1024)

console.log(`source  ${await kb(source)} KB`)

for (const job of jobs) {
  const target = join(root, 'public', job.name)
  execFileSync(
    ffmpeg.path,
    ['-y', '-i', source, '-vf', job.filters, '-c:v', 'libx264', '-crf', job.crf, ...COMMON, target],
    { stdio: 'pipe' },
  )
  console.log(`written ${job.name.padEnd(20)} ${String(await kb(target)).padStart(5)} KB  (${job.label})`)
}
