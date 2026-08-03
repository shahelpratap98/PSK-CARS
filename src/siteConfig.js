// ---------------------------------------------------------------------------
// TODO: replace these two placeholders with the real PSK Cars details.
// The WhatsApp number must be in international format with no spaces, plus or
// leading zero — the NZ mobile 021 234 5678 becomes 64212345678.
// ---------------------------------------------------------------------------
export const BUSINESS_EMAIL = 'REPLACE_ME@example.co.nz'
export const WHATSAPP_NUMBER = '6400000000'

export const WHATSAPP_MESSAGE =
  'Hi PSK Cars — I would like to ask about a repair on my vehicle.'

export const whatsappLink = (message = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const BUSINESS = {
  name: 'PSK Cars',
  suburb: 'Manukau',
  city: 'Auckland',
  region: 'South Auckland',
  hours: 'Mon–Fri, 8am–5pm',
  hoursLong: 'Monday to Friday, 8am to 5pm',
}

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Our story', to: '/our-story' },
  { label: 'Contact', to: '/contact' },
]

export const SERVICES = [
  {
    slug: 'paint-work',
    number: '01',
    title: 'Paint Work',
    tagline: 'Colour-matched refinishing that disappears into the panel next to it.',
    summary:
      'Single-panel touch-ups through to full resprays, sprayed in a controlled booth and blended so the repair is invisible.',
    intro:
      'Paint is the part of a repair everyone sees. A panel can be straight, gapped and aligned perfectly, and it will still look wrong if the colour sits half a shade off the door beside it. That is why we treat colour matching as its own step rather than something that happens on the way to the booth.',
    points: [
      {
        heading: 'Colour matched to your car, not to the code',
        body: 'Paint codes tell us where to start. Age, sun and previous repairs move the colour from there, so we spray and check a test card against your actual panel before anything goes near the car.',
      },
      {
        heading: 'Sprayed in a controlled booth',
        body: 'Filtered air and controlled temperature keep dust and insects out of the finish and let the paint flash off evenly, which is what gives you a flat, even gloss instead of orange peel.',
      },
      {
        heading: 'Blended into the surrounding panels',
        body: 'Rather than stopping hard at a panel edge, we fade the new colour into the adjacent panels so there is no visible line where the repair starts.',
      },
      {
        heading: 'Cut and polished before it goes back',
        body: 'The finish is cut back and polished so the repaired area matches the depth and gloss of the rest of the car.',
      },
    ],
    faq: [
      {
        q: 'Can you match faded or older paint?',
        a: 'Usually, yes. Older paint that has faded unevenly is exactly why we test-spray and compare against the panel rather than trusting the factory code.',
      },
      {
        q: 'How long does a respray take?',
        a: 'A single panel is typically a few days. A full respray depends on how much preparation the body needs underneath — we will give you a realistic date once we have seen the car.',
      },
    ],
  },
  {
    slug: 'panel-beating',
    number: '02',
    title: 'Panel Beating',
    tagline: 'Damaged bodywork brought back to the lines it left the factory with.',
    summary:
      'Dents, collision damage and structural repair — reshaped and realigned so panel gaps and body lines read straight again.',
    intro:
      'Good panel work is judged by what you cannot see. Body lines should run straight down the length of the car, gaps should stay even from top to bottom, and doors should shut with the same weight they always did. Getting there means reshaping metal properly rather than burying the problem in filler.',
    points: [
      {
        heading: 'Metal reshaped, not filled over',
        body: 'We work the panel back toward its original shape first. Filler is for the final skim, not for hiding a dent that was never pulled out.',
      },
      {
        heading: 'Gaps and alignment checked against the other side',
        body: 'Panel gaps are measured against the undamaged side of the car so the repaired side matches rather than merely looking close.',
      },
      {
        heading: 'Structural repair where it is needed',
        body: 'Where damage has gone past the outer skin, the underlying structure is pulled and measured before any cosmetic work starts.',
      },
      {
        heading: 'Handed straight to paint',
        body: 'Because the panel and paint work happen under one roof, nothing gets lost between two workshops blaming each other for the finish.',
      },
    ],
    faq: [
      {
        q: 'Is it worth repairing or should I replace the panel?',
        a: 'It depends on how far the metal has stretched and whether the panel is still available. We will tell you honestly when replacing is the better value option.',
      },
      {
        q: 'Do you work with insurance repairs?',
        a: 'Talk to us about your claim and we will let you know how we can help with the assessment.',
      },
    ],
  },
  {
    slug: 'compliance',
    number: '03',
    title: 'Compliance',
    tagline: 'Entry and repair certification handled end to end.',
    summary:
      'Imported and repaired vehicles taken through certification, with the repair work and the paperwork managed by the same team.',
    intro:
      'Compliance is where a lot of projects stall — the car is nearly there, but something fails, and now the repair shop and the certifier are pointing at each other. We handle both sides, so what needs fixing gets fixed and the vehicle goes back through without a second round trip.',
    points: [
      {
        heading: 'Entry certification for imports',
        body: 'Imported vehicles taken through the entry certification process so they can be registered for New Zealand roads.',
      },
      {
        heading: 'Repair certification',
        body: 'Vehicles that have been damaged and repaired assessed and certified, with the structural repair work done to the standard the certification requires.',
      },
      {
        heading: 'Faults fixed in house',
        body: 'When something needs rectifying, it is handled here rather than sending you somewhere else and starting the process again.',
      },
      {
        heading: 'Told what it needs up front',
        body: 'We would rather tell you early that a vehicle is going to be difficult than take it in and surprise you later.',
      },
    ],
    faq: [
      {
        q: 'I just imported a car — what do I need?',
        a: 'Bring it in and we will walk you through what entry certification will involve for that specific vehicle.',
      },
      {
        q: 'My car failed certification elsewhere. Can you help?',
        a: 'Yes. Bring the failure sheet with you and we will work through what is required.',
      },
    ],
  },
  {
    slug: 'sandblasting',
    number: '04',
    title: 'Sandblasting',
    tagline: 'Rust, paint and old coatings stripped back to clean, sound metal.',
    summary:
      'Chassis, panels, wheels and parts blasted back to bare metal so whatever goes on next has something solid to bond to.',
    intro:
      'Coatings only last as long as what is underneath them. Paint over rust and the rust keeps going, quietly, until it lifts the new finish off. Blasting takes the surface back to clean metal so the primer, paint or powder coat that follows actually bonds.',
    points: [
      {
        heading: 'Back to bare, sound metal',
        body: 'Old paint, surface rust, underseal and previous coatings removed so you can see the true condition of the metal underneath.',
      },
      {
        heading: 'Restoration and chassis work',
        body: 'Well suited to restoration projects where you need to know exactly what you are working with before committing to the rest of the build.',
      },
      {
        heading: 'Parts, wheels and componentry',
        body: 'Smaller components stripped and prepared, not just full shells and chassis.',
      },
      {
        heading: 'Straight into primer',
        body: 'Bare metal starts flash rusting quickly, so blasted work goes into primer promptly rather than sitting exposed.',
      },
    ],
    faq: [
      {
        q: 'Will blasting damage or warp thin panels?',
        a: 'Panel thickness changes how the work is approached. Tell us what the part is and we will let you know what is appropriate for it.',
      },
      {
        q: 'Can you prime it afterwards?',
        a: 'Yes — and we recommend it, because bare metal will start surfacing rust again quickly if it is left.',
      },
    ],
  },
]

export const getService = (slug) => SERVICES.find((s) => s.slug === slug)
