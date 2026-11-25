// Checks the Video panel's Sketch / Official switch in headless Edge.
// Usage: node scripts/video-switch-check.mjs [baseUrl] [--shot out.png]   (default: local server over docs/ with Range support)
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync, createReadStream } from "node:fs";
import { join, extname } from "node:path";
const require = createRequire("C:/repos/gh-pages-lab/azure-icons/package.json");
const { chromium } = require("playwright-core");
const args = process.argv.slice(2);
const shotI = args.indexOf("--shot"); const SHOT = shotI >= 0 ? args[shotI + 1] : null;
let base = args.find((a) => a.startsWith("http"));
let server;
if (!base) {
  const PREFIX = "/azure-landing-zone-sketch/";
  const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".excalidraw": "application/json", ".mp4": "video/mp4" };
  server = createServer((req, res) => {
    const p = decodeURIComponent(req.url.split("?")[0]);
    if (!p.startsWith(PREFIX)) { res.writeHead(404); return res.end(); }
    const f = join("docs", p.slice(PREFIX.length) || "index.html");
    if (!existsSync(f) || !statSync(f).isFile()) { res.writeHead(404); return res.end(); }
    const size = statSync(f).size, type = MIME[extname(f)] ?? "application/octet-stream";
    const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range ?? "");
    if (m) {
      const s = m[1] ? +m[1] : 0, e = m[2] ? +m[2] : size - 1;
      res.writeHead(206, { "content-type": type, "content-range": `bytes ${s}-${e}/${size}`, "accept-ranges": "bytes", "content-length": e - s + 1 });
      return createReadStream(f, { start: s, end: e }).pipe(res);
    }
    res.writeHead(200, { "content-type": type, "content-length": size, "accept-ranges": "bytes" });
    createReadStream(f).pipe(res);
  });
  await new Promise((r) => server.listen(0, r));
  base = `http://localhost:${server.address().port}${PREFIX}`;
}
const SLUGS = ["aks-baseline", "protect-apis", "azure-landing-zone"];
const b = await chromium.launch({ channel: "msedge", headless: true, args: ["--autoplay-policy=no-user-gesture-required"] });
let bad = 0; const shots = [];
for (const [vp, w, h, mobile] of [["desktop", 1440, 900, false], ["phone", 390, 844, true]]) {
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1 });
  for (const slug of SLUGS) {
    const p = await ctx.newPage();
    const errs = [];
    p.on("pageerror", (e) => errs.push(e.message));
    p.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
    const r = { vp, slug };
    try {
      await p.goto(`${base}?a=${slug}&cb=${Date.now()}`, { waitUntil: "load" });
      await p.waitForSelector('button[data-action="video"]', { timeout: 30000 });
      await p.waitForTimeout(1200);
      // other buttons still work
      await p.click('button[data-action="fit"]'); await p.click('button[data-action="replay"]').catch(() => {});
      const flow = p.locator('button[data-action="flow"]');
      if (await flow.isEnabled()) { await flow.click(); r.flow = await flow.getAttribute("aria-pressed"); await flow.click(); }
      await p.evaluate(() => localStorage.removeItem("aac-sketch:video-style")); // each slug starts from the default
      await p.click('button[data-action="video"]');
      await p.waitForSelector("dialog.video-panel[open] .vstyle", { timeout: 10000 });
      const play = async () => {
        await p.waitForFunction(() => { const v = document.querySelector("dialog.video-panel video"); return v && v.readyState >= 1; }, null, { timeout: 30000 });
        await p.evaluate(() => document.querySelector("dialog.video-panel video").play());
        await p.waitForFunction(() => document.querySelector("dialog.video-panel video").currentTime > 1.2, null, { timeout: 40000 });
        return p.evaluate(() => { const v = document.querySelector("dialog.video-panel video"); return { src: v.currentSrc, t: +v.currentTime.toFixed(2), style: v.dataset.vstyle }; });
      };
      r.defaultPressed = await p.getAttribute('.vstyle [data-vstyle="sketch"]', "aria-pressed");
      r.sketch = await play();
      await p.click('.vstyle [data-vstyle="official"]');
      r.official = await play();
      r.stored = await p.evaluate(() => localStorage.getItem("aac-sketch:video-style"));
      if (SHOT && slug === "aks-baseline") { const f = SHOT.replace(/\.png$/, `-${vp}.png`); await p.waitForTimeout(3500); await p.screenshot({ path: f }); shots.push(f); }
      // close, reopen: remembers Official
      await p.click(".video-close");
      await p.click('button[data-action="video"]');
      await p.waitForSelector("dialog.video-panel[open] .vstyle");
      r.remembered = await p.getAttribute('.vstyle [data-vstyle="official"]', "aria-pressed");
      await p.click('.vstyle [data-vstyle="sketch"]');
      r.backToSketch = (await play()).style;
      await p.click(".video-close");
      r.dialogClosed = !(await p.$("dialog.video-panel[open]"));
    } catch (e) { r.error = e.message.split("\n")[0]; }
    r.errors = errs;
    const ok = !r.error && !errs.length && r.defaultPressed === "true" && r.sketch?.style === "sketch" && r.official?.style === "official" && r.official.src.includes("azure-architecture-videos/official/") && r.stored === "official" && r.remembered === "true" && r.backToSketch === "sketch" && r.dialogClosed;
    if (!ok) bad++;
    console.log(ok ? "OK  " : "FAIL", JSON.stringify(r));
    await p.close();
  }
  await ctx.close();
}
await b.close(); server?.close();
console.log(bad ? `FAILS=${bad}` : "ALL_OK", shots.join(" "));
process.exit(bad ? 1 : 0);
