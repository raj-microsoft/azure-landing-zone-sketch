// Loads the gallery and viewers in headless Edge and WebKit and reports console errors.
// Usage: node scripts/browser-check.mjs [baseUrl] [slug...]
//   baseUrl defaults to a local server over docs/ (after `npm run build`); pass the live URL to check GitHub Pages.
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
const require = createRequire("C:/repos/gh-pages-lab/azure-icons/package.json");
const { chromium, webkit } = require("playwright-core");

let [base, ...slugs] = process.argv.slice(2);
let server;
if (!base || !base.startsWith("http")) {
  if (base) slugs.unshift(base);
  const PREFIX = "/azure-landing-zone-sketch/";
  const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".excalidraw": "application/json" };
  server = createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (!p.startsWith(PREFIX)) { res.writeHead(404); return res.end(); }
    const f = join("docs", p.slice(PREFIX.length) || "index.html");
    if (!existsSync(f) || !statSync(f).isFile()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": MIME[extname(f)] ?? "application/octet-stream" });
    res.end(readFileSync(f));
  });
  await new Promise((r) => server.listen(0, r));
  base = `http://localhost:${server.address().port}${PREFIX}`;
}
if (!slugs.length) slugs = ["azure-landing-zone"];
const out = {};
let bad = 0;
for (const [n, launch] of [["edge", () => chromium.launch({ channel: "msedge", headless: true })], ["webkit", () => webkit.launch({ headless: true })]]) {
  const b = await launch();
  const p = await (await b.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } })).newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 160)); });
  const r = {};
  await p.goto(`${base}?cb=${Date.now()}`, { waitUntil: "load" });
  await p.waitForSelector(".card", { timeout: 20000 }).catch(() => {});
  await p.waitForTimeout(1500);
  r.gallery = await p.evaluate(() => ({ cards: document.querySelectorAll(".card").length, done: document.querySelectorAll(".card:not(.pending)").length, featured: document.querySelector(".card.featured h2")?.textContent, brokenThumbs: [...document.querySelectorAll(".thumb img")].filter((i) => i.complete && i.naturalWidth === 0).length }));
  for (const s of slugs) {
    await p.goto(`${base}?a=${s}&cb=${Date.now()}`, { waitUntil: "load" });
    await p.waitForFunction(() => window.__alz?.api, null, { timeout: 30000 }).catch(() => {});
    await p.waitForTimeout(1500);
    r[s] = await p.evaluate(() => ({ canvas: document.querySelectorAll("canvas").length, elements: window.__alz?.api.getSceneElements().length ?? 0, title: document.querySelector(".bar h1")?.textContent }));
    if (!r[s].elements) bad++;
  }
  r.errs = errs;
  if (errs.length || !r.gallery.cards) bad++;
  out[n] = r;
  await b.close();
}
console.log(JSON.stringify(out, null, 1));
server?.close();
console.log(bad ? "BROWSER CHECK FAIL" : "BROWSER CHECK PASS");
process.exit(bad ? 1 : 0);
