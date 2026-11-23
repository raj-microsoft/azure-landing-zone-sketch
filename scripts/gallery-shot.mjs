// Screenshots the local gallery (desktop + mobile) to work/gallery-*.png for a visual check.
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
const require = createRequire("C:/repos/gh-pages-lab/azure-icons/package.json");
const { chromium } = require("playwright-core");
const PREFIX = "/azure-landing-zone-sketch/";
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".excalidraw": "application/json" };
const server = createServer((req, res) => {
  const p = decodeURIComponent(req.url.split("?")[0]);
  const f = join("docs", p.slice(PREFIX.length) || "index.html");
  if (!p.startsWith(PREFIX) || !existsSync(f) || !statSync(f).isFile()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": MIME[extname(f)] ?? "application/octet-stream" });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(0, r));
const url = `http://localhost:${server.address().port}${PREFIX}`;
const b = await chromium.launch({ channel: "msedge", headless: true });
for (const [n, w, h] of [["desktop", 1440, 1800], ["mobile", 390, 1600]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  await p.goto(url); await p.waitForSelector(".card"); await p.waitForTimeout(1500);
  await p.screenshot({ path: `work/gallery-${n}.png` });
}
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(url + "?a=azure-local-baseline"); await p.waitForFunction(() => window.__alz?.api); await p.waitForTimeout(1500);
await p.screenshot({ path: "work/viewer.png" });
await b.close(); server.close();
