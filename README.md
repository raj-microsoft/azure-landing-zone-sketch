# Azure reference architectures, sketched

Microsoft Azure Architecture Center reference architectures, each redrawn like for like as a hand-drawn Excalidraw scene using only the ChatGPT pencil-sketch Azure icons. The **Azure landing zone (ALZ) - Hub & Spoke** sketch is the featured first card.

Live: https://raj-microsoft.github.io/azure-landing-zone-sketch/ (gallery) · `?a=<slug>` opens one scene in the viewer (Edit, Reset, Download .excalidraw, PNG, SVG, source link).

## Layout

- `specs/<slug>.mjs`: one spec per architecture: `meta` (title, Learn URL, category, status, other diagrams, icon substitutions, differences) and `draw(k)`.
- `scripts/lib/sketch.mjs`: shared generator (bound text, bound orthogonal arrows, icons embedded as data URLs, roughness 1, Excalifont, role-based tints). Unknown icon ids throw.
- `scripts/build-scene.mjs [slug...]`: writes `public/scenes/<slug>.excalidraw` and `public/scenes/index.json` (all 148 queue entries plus the landing zone; anything without a finished spec is `pending`).
- `scripts/check-geometry.mjs [scene...]`: checks bindings, edge endpoints, crossings, overlaps, files, text ≥ 16 px and labelled shapes ≥ 120×60. Defaults to every scene.
- `scripts/render.mjs <slug...>`: renders with the real Excalidraw exporter into `public/thumbs/<slug>.png` (< 60 KB) and local full/compare images.
- `scripts/browser-check.mjs [url] [slug...]`: gallery and viewers in headless Edge and WebKit, no console errors.
- `scripts/fetch-ref.mjs`, `scripts/ref-png.mjs`: download the official diagrams into the local, uncommitted `ref/`.

## Build

```
npm install
npm run build     # build-scene -> check-geometry (must PASS) -> vite build into docs/
```

Per-scene differences from the originals and icon substitutions are listed in `public/scenes/index.json`.
