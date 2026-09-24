# Atlas Proje — tanıtım filmi

A 30-second promo film in Turkish (1920×1080). It is not linked from the
website and is not part of the Vite build.

| File | What it is |
| --- | --- |
| `atlas-tanitim.html` | The film. All text is in the `COPY` object at the top of the script. |
| `render-video.mjs` | Renders the film to MP4 with Chrome + ffmpeg. |
| `fonts/` | Fraunces, Instrument Sans, IBM Plex Mono (SIL Open Font License), bundled so renders work offline. |

```bash
node video/render-video.mjs --serve              # preview live in your browser
node video/render-video.mjs --stills 3.6,21.5    # a few PNG frames in video/stills
node video/render-video.mjs                      # full video -> video/atlas-tanitim.mp4
node video/render-video.mjs --crf 24 --out atlas-paylas.mp4   # smaller file for sharing
```

Needs Node 22+, Chrome or Edge, and ffmpeg on PATH (`winget install Gyan.FFmpeg`).
