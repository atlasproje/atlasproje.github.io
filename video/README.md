# Atlas Proje — tanıtım filmi

A 38-second animated promo short in Turkish (1920×1080). It is not linked from
the website and is not part of the Vite build.

One continuous story instead of a slideshow, carried by the gold eight-point
star of the Atlas mark. A pencil line becomes a compass-built star; the star
shrinks, drops onto the ground line and rolls into a building section that draws
itself around it. It hops over the pump, docks on the valve and spins it open,
and the whole MEP system comes alive. It bounces out over the basin and follows
the water, which falls into a chart as data points, then rolls up the trend
line, drawing it as it goes. The camera pushes into the star's centre, which
opens as an iris onto the AI scene: the star lands on the data, travels through
RAG into the LLM, spins while it thinks and lands in the answer. The camera
pushes through the answer bubble into a book: the star underlines a line, sits
on the spine while the page turns, hops across the bars as they grow, and jumps
when the YAKINDA stamp lands. A whip-pan brings in the physical/digital circles;
the star flies into their overlap, rises and becomes the logo.

| File | What it is |
| --- | --- |
| `atlas-tanitim.html` | The film. All text is in the `COPY` object at the top of the script; all times are absolute seconds. |
| `render-video.mjs` | Renders the film to MP4 with Chrome + ffmpeg. |
| `ART-DIRECTION.md` | The house style (palette, type, line, motion, the mark, sound), for future pieces. |
| `fonts/` | Fraunces, Instrument Sans, IBM Plex Mono (SIL Open Font License), bundled so renders work offline. |

How the page is put together:

- **Worlds.** Four drawings (`W1` intro + MEP + data, `W2` AI, `W3` training,
  `W4` bridge + outro), each with its own camera. Camera keys are
  `[time, x, y, zoom, rotation]`, splined so moves flow into each other.
- **The mark.** `mark()` is the travelling star: `segs` move it (roll along a
  `ground`, `hop`, or fly on an arc through `via`), it turns by the distance it
  rolls, `spins` add turns, `ks` change its size, landings squash it and
  `bursts` throw sparks.
- **Transitions** live in `buildIris()`, the camera keys of `W2`/`W3`
  (push-through), `buildWhip()`, and the mark in `buildOutro()`.

```bash
node video/render-video.mjs --serve              # preview live in your browser
node video/render-video.mjs --stills 4.7,8.3     # a few PNG frames in video/stills
node video/render-video.mjs                      # full video -> video/atlas-tanitim.mp4
node video/render-video.mjs --crf 24 --out atlas-paylas.mp4   # smaller file for sharing
node video/render-video.mjs --width 1280 --height 720 --fps 40 --crf 28 --out atlas-720p.mp4 # 720p smaller size
```

Needs Node 22+, Chrome or Edge, and ffmpeg on PATH (`winget install Gyan.FFmpeg`).
