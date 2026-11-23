// Renders scenes with the real Excalidraw exporter (headless Edge, via the built viewer) to:
//   work/render/<slug>.png   full PNG (local)
//   public/thumbs/<slug>.png thumbnail (< 60 KB, committed)
//   work/compare/<slug>.png  official diagram next to the sketch (local)
// Usage: node scripts/render.mjs <slug...>   (needs a prior `vite build` into docs/; scenes are served fresh from public/)
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
const require = createRequire("C:/repos/gh-pages-lab/azure-icons/package.json");
const { chromium } = require("playwright-core");
const sharp = require("sharp");

const PREFIX = "/azure-landing-zone-sketch/";
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".excalidraw": "application/json" };
const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (!p.startsWith(PREFIX)) { res.writeHead(404); return res.end(); }
  p = p.slice(PREFIX.length) || "index.html";
  const f = [join("public", p), join("docs", p)].find((x) => existsSync(x) && statSync(x).isFile());
  if (!f) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": MIME[extname(f)] ?? "application/octet-stream" });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(0, r));
const port = server.address().port;
for (const d of ["work/render", "work/compare", "public/thumbs"]) mkdirSync(d, { recursive: true });

const slugs = process.argv.slice(2);
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await (await browser.newContext({ viewport: { width: 1400, height: 900 } })).newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
for (const slug of slugs) {
  await page.goto(`http://localhost:${port}${PREFIX}?a=${slug}&draft=1`, { waitUntil: "load" });
  await page.waitForFunction(() => window.__alz?.api, null, { timeout: 30000 });
  await page.waitForTimeout(1500);
  const b64 = await page.evaluate(async () => {
    const { api, exportToBlob } = window.__alz;
    const els = api.getSceneElements();
    const w = Math.max(...els.map((e) => e.x + e.width)) - Math.min(...els.map((e) => e.x));
    const scale = Math.min(2, 3600 / w);
    const blob = await exportToBlob({ elements: els, files: api.getFiles(), appState: { exportBackground: true, viewBackgroundColor: "#fdfdfb", exportScale: scale }, mimeType: "image/png", exportPadding: 32, getDimensions: (W, H) => ({ width: W * scale, height: H * scale, scale }) });
    const buf = new Uint8Array(await blob.arrayBuffer());
    let s = ""; for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode(...buf.subarray(i, i + 0x8000));
    return btoa(s);
  });
  const full = Buffer.from(b64, "base64");
  const fullPath = `work/render/${slug}.png`;
  await sharp(full).png().toFile(fullPath);
  // thumbnail: 560 px wide, palette PNG, shrink until < 60 KB
  let tw = 560, thumb;
  do {
    thumb = await sharp(full).resize({ width: tw, height: 350, fit: "contain", background: "#fdfdfb" }).flatten({ background: "#fdfdfb" }).png({ palette: true, colours: 64, compressionLevel: 9 }).toBuffer();
    tw -= 60;
  } while (thumb.length > 60000 && tw > 200);
  writeFileSync(`public/thumbs/${slug}.png`, thumb);
  // compare: official image (ref/<slug>/<main>) above the sketch, each 1600 wide
  const metaPath = `ref/${slug}/meta.json`;
  let refImg = null;
  if (existsSync(metaPath)) {
    const m = JSON.parse(readFileSync(metaPath, "utf8"));
    const pick = m.main ?? m.images?.[0]?.file;
    if (pick) {
      const viewPng = pick.replace(/\.svg$/, ".view.png");
      refImg = existsSync(viewPng) ? viewPng : pick;
    }
  }
  const W = 1600;
  const parts = [];
  if (refImg) parts.push(await sharp(refImg).resize({ width: W }).flatten({ background: "#ffffff" }).png().toBuffer());
  parts.push(await sharp(full).resize({ width: W }).png().toBuffer());
  const metas = await Promise.all(parts.map((p) => sharp(p).metadata()));
  const H = metas.reduce((a, m) => a + m.height + 20, 0);
  let y = 0;
  const comps = parts.map((p, i) => { const c = { input: p, left: 0, top: y }; y += metas[i].height + 20; return c; });
  await sharp({ create: { width: W, height: H, channels: 3, background: "#adb5bd" } }).composite(comps).png().toFile(`work/compare/${slug}.png`);
  console.log(`rendered ${slug}: full ${full.length >> 10} KB, thumb ${thumb.length >> 10} KB, compare ref=${refImg ?? "none"}`);
}
if (errs.length) console.log("PAGE ERRORS:", errs.join(" | "));
await browser.close();
server.close();
