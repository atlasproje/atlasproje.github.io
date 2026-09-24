# Atlas Proje — art direction

The house style of the promo film (`atlas-tanitim.html`), written down so new
videos, slides, posts and pages feel like they come from the same hand.

## The idea in one line

**An engineer's drawing sheet that comes alive.** Everything is drawn in ink
on warm paper, with pencil and compass, the way an engineer sketches: precise
but human. Nothing is rendered, glossy or stock. The Atlas star is the thread
that runs through it.

Three words: **precise, warm, alive.**

## Palette

| Role | Name | Hex | Use |
| --- | --- | --- | --- |
| Paper | Paper | `#fbf9f5` | The background, always. Never pure white. |
| Ink | Navy | `#233e65` | All line work, headlines, the default "ink". |
| Accent | Gold | `#b58c4f` | The star, flow (water, data in motion), one italic word per headline. |
| Mark | Oxblood | `#912930` | The hand's red pencil: underlines, circles, notes, stamps. Use sparingly. |
| Soft ink | Ink soft | `#4d566a` | Body text, labels. |
| Support | Sand | `#ddd1bc` | Paper blotches, back of a turning page. |

Rules: navy does the work, gold is the hero, oxblood is the teacher's pen.
Pale secondary lines are navy at 10–50% opacity, not grey. No pure black, no
pure white, no gradients, no glows or drop shadows.

## Type

- **Fraunces** (serif, 380 weight, soft) for headlines. One word or phrase per
  headline goes into *italic gold* (`<em>`) and gets a hand-drawn oxblood
  underline that draws itself in.
- **Instrument Sans** for sentences and body copy.
- **IBM Plex Mono**, uppercase and widely tracked, for eyebrows and technical
  labels (`N° 03 — YAPAY ZEKA`, `DN 50`, `Ø 500`, `+3.20`).
- **Fraunces italic** in oxblood for handwritten notes on the drawing
  ("vana", "tahmin").
- Headlines are big and short (2–4 words per line) and rise line by line
  through a mask. Text never bounces or spins.

## Line and texture

- **Line:** round caps and joins, consistent weights (about 2–2.6 for objects,
  1–1.4 for construction lines, 3+ for the one line that matters).
- **Boil:** every line wobbles slightly and re-draws 8 times a second, like
  pencil animation. In code: an SVG `feTurbulence` + `feDisplacementMap` whose
  seed changes 8×/s. It stays the same size on screen however far the camera zooms.
- **Paper:** low-frequency sand blotches that move with the drawing, plus fine
  film grain that stays on the screen. A faint navy vignette at the edges.
- **Construction is part of the picture.** Show the compass arcs, centre lines,
  dimension lines, hatching, crop marks and registration targets. The drawing
  explains how it was made.

## The drawing sheet (frame)

Crop marks in the corners, a registration target top-centre, a ruler bottom
left, a title block bottom right (PROJE / LEVHA / ÖLÇEK / ÇİZEN). The frame is
quiet (50% navy) and never competes with the picture. It is live: the ruler
slides when the camera pans, ÖLÇEK shows the zoom, LEVHA counts chapters.

## The mark (our protagonist)

The gold eight-point star, built from two squares, is the only "character".
It has **no face, no limbs, no mascot behaviour.** It shows personality only
through physics:

- it **rolls** along lines, turning exactly by the distance it covers;
- it **hops** and flies on arcs, stretching in the air and squashing on landing;
- it **spins** when it works (turning a valve, thinking inside the LLM);
- it throws a small ring of gold **sparks** at moments of success;
- it leaves a short gold **trail** when it moves fast.

It always touches the story: it opens the valve, draws the trend line, carries
the question through the AI, underlines the book, becomes the logo.

## Motion

- **Draw on, erase off.** Things appear by being drawn (the stroke travels
  along its path) and leave by being erased the same way. Fades are for text
  and fills only.
- **One continuous world, never a slideshow.** No hard cuts between topics.
  Each scene grows out of the one before, through a shared object:
  - *match cut:* the ground line becomes the floor slab, then the chart axis;
  - *transform:* water drops land and become data points;
  - *iris:* the camera pushes into the star's centre and it opens onto the next scene;
  - *push-through:* the camera flies into the answer bubble's paper and the book grows out of it;
  - *whip-pan:* fast pan with horizontal motion blur;
  - *become:* the star rises and turns into the logo.
- **The camera is always slightly alive:** a few pixels of hand-held drift,
  slow pushes, smooth spline moves between framings. Never locked off, never
  shaky.
- **Easing:** cubic in-out for drawing and camera, quartic out for text
  arriving, a small overshoot (back-out) for things that pop into place.
  Starts accelerate, stops brake. Nothing moves linearly except flow.
- **Chain reactions over simultaneity.** One action causes the next: turn the
  valve → the pump spins → water flows → the fan turns → drops fall → data appears.
- **Accents with weight:** the rubber stamp (YAKINDA, the round seal) slams in
  crooked and the whole frame jolts. Use once or twice per piece.
- **Pacing:** about 5 seconds per idea, each with one clear action and one
  headline, then the next idea grows out of it. Hold the final logo for 3+ seconds.

## Composition

- The headline sits in a clear area of the drawing (usually top-left) with a
  soft paper halo behind it so lines pass under it without fighting.
- One idea per frame. Leave paper empty; the empty paper is part of the look.
- Vary scale: extreme close-ups (a valve, a lens) next to wide shots (the
  whole building section), so the camera itself tells the story.

## Voice

Short Turkish lines, confident and concrete ("Ham veriyi tahmine, tahmini
karara dönüştürüyoruz."). The eyebrow gives the chapter (`N° 02 — Veri Bilimi`),
the headline gives the idea, the sub-line gives the proof.

## Don't

- Characters with faces, mascots, emoji, cartoon eyes.
- Stock icons, 3D renders, photos, gradients, glassmorphism, neon.
- Slide layouts that repeat (title left, picture right, next).
- Everything moving at once. Things arriving without a cause.
- More than one oxblood accent competing in a frame.

## Sound

Warm, organic and precise: felt piano or plucked strings, soft mallets
(marimba, kalimba), light percussion; about 90–110 BPM; one small build and a
resolved final chord on the logo. Small foley on the key actions: pencil
scratch on paper, compass click, valve squeak, water, a soft whoosh on the
whip-pan, a real stamp thud. No EDM drops, no epic trailer drums.
