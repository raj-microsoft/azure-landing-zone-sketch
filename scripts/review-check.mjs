// Design-review verification: gallery, empty search, three viewers, at 1440x900 and 390x844 in Edge and WebKit.
// Usage: node scripts/review-check.mjs [baseUrl] [outDir]
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync, mkdirSync } from "node:fs";
import { join, extname } from "node:path";
const require = createRequire("C:/repos/gh-pages-lab/azure-icons/package.json");
const { chromium, webkit } = require("playwright-core");

let [base, out = "C:/Users/dev/.openclaw/workspace/coordinator/artifacts/design-review/after"] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
let server;
if (!base || !base.startsWith("http")) {
  const PREFIX = "/azure-landing-zone-sketch/";
  const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".excalidraw": "application/json" };
  server = createServer((req, res) => {
    const p = decodeURIComponent(req.url.split("?")[0]);
    if (!p.startsWith(PREFIX)) { res.writeHead(404); return res.end(); }
    const f = join("docs", p.slice(PREFIX.length) || "index.html");
    if (!existsSync(f) || !statSync(f).isFile()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": MIME[extname(f)] ?? "application/octet-stream" });
    res.end(readFileSync(f));
  });
  await new Promise((r) => server.listen(0, r));
  base = `http://localhost:${server.address().port}${PREFIX}`;
}
const SLUGS = ["aks-baseline", "azure-landing-zone", "hub-spoke-virtual-wan-architecture"];
const SIZES = { desk: { width: 1440, height: 900 }, phone: { width: 390, height: 844 } };
const report = {};
const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };

const lum = (hex) => { const c = hex.match(/\w\w/g).map((h) => parseInt(h, 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

for (const [eng, launch] of [["edge", () => chromium.launch({ channel: "msedge", headless: true })], ["webkit", () => webkit.launch({ headless: true })]]) {
  const b = await launch();
  for (const [sz, viewport] of Object.entries(SIZES)) {
    const ctx = await b.newContext({ ignoreHTTPSErrors: true, viewport, acceptDownloads: true, ...(sz === "phone" ? { isMobile: eng === "edge", hasTouch: true, deviceScaleFactor: 2 } : {}) });
    const p = await ctx.newPage();
    const errs = [];
    let step = "start";
    p.on("pageerror", (e) => errs.push(`[${step}] ${e.message}`));
    p.on("console", (m) => { if (m.type() === "error") errs.push(`[${step}] ${m.text().slice(0, 200)}`); });
    const r = {};
    const tag = `${eng}-${sz}`;

    // Loading skeleton (throttle index.json so the skeleton is visible)
    let slowed = false;
    await p.route("**/scenes/index.json", async (route) => { if (slowed) return route.continue().catch(() => {}); slowed = true; await new Promise((z) => setTimeout(z, 1200)); await route.continue().catch(() => {}); });
    await p.goto(`${base}?cb=${Date.now()}`, { waitUntil: "domcontentloaded" });
    await p.waitForSelector(".card.skeleton", { timeout: 5000 }).catch(() => {});
    r.skeleton = await p.evaluate(() => document.querySelectorAll(".card.skeleton").length);
    await p.screenshot({ path: `${out}/${tag}-01-loading.png` });
    await p.waitForSelector(".card:not(.skeleton)", { timeout: 20000 });
    await p.unroute("**/scenes/index.json");
    await p.waitForTimeout(1500);
    await p.screenshot({ path: `${out}/${tag}-02-gallery.png` });
    r.gallery = await p.evaluate(() => {
      const first = document.querySelector(".grid .card");
      const chips = document.querySelector(".cats");
      const select = document.querySelector(".catselect select");
      const vis = (el) => el && getComputedStyle(el).display !== "none";
      const featured = document.querySelector(".card.featured");
      const fm = featured?.querySelector(".meta");
      const small = [...document.querySelectorAll(".grid a:not(.stretch), .cats button, .suggest button")].filter((a) => { const b = a.getBoundingClientRect(); return b.width && b.height < 24; }).length;
      const linkH = [...document.querySelectorAll(".grid .learn")].slice(0, 5).map((a) => Math.round(a.getBoundingClientRect().height));
      const cardTap = first ? (() => { const t = first.querySelector(".thumb").getBoundingClientRect(); const el = document.elementFromPoint(t.x + t.width / 2, t.y + t.height / 2); return el?.closest?.("a")?.className ?? el?.tagName; })() : null;
      return {
        cards: document.querySelectorAll(".grid .card").length,
        firstCardTop: Math.round(first?.getBoundingClientRect().top ?? -1),
        chipsVisible: vis(chips), chipCount: chips?.querySelectorAll("button").length, chipsBottom: vis(chips) ? Math.round(chips.getBoundingClientRect().bottom) : 0,
        selectVisible: vis(select?.parentElement), categories: select ? select.options.length - 1 : 0,
        featuredBlurb: !!fm?.querySelector(".blurb"), featuredOpenBtn: !!fm?.querySelector(".btn.primary"),
        smallTargets: small, learnHeights: linkH, thumbHit: cardTap,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    const g = r.gallery;
    check(g.cards > 100, `${tag} cards ${g.cards}`);
    check(g.categories >= 10 && g.categories <= 16, `${tag} category count ${g.categories}`);
    check(g.featuredBlurb && g.featuredOpenBtn, `${tag} featured panel empty`);
    check(g.smallTargets === 0, `${tag} small targets ${g.smallTargets}`);
    check(g.thumbHit === "stretch", `${tag} thumb not a link (${g.thumbHit})`);
    check(!g.overflow, `${tag} horizontal overflow`);
    check(r.skeleton > 0, `${tag} no skeleton`);
    if (sz === "phone") { check(!g.chipsVisible && g.selectVisible, `${tag} chips still on phone`); check(g.firstCardTop < 560, `${tag} first card at ${g.firstCardTop}`); }
    else { check(g.chipsVisible && g.chipCount <= 10, `${tag} desktop chips ${g.chipCount}`); }

    // Contrast of the text pairs flagged in the review
    r.contrast = await p.evaluate(() => {
      const hex = (c) => "#" + c.match(/\d+/g).slice(0, 3).map((n) => (+n).toString(16).padStart(2, "0")).join("");
      const sel = document.querySelector(".cats button[aria-pressed=true] .n");
      return { chipN: sel ? [hex(getComputedStyle(sel).color), "#e7f5ff"] : null, cat: [hex(getComputedStyle(document.querySelector(".cat")).color), "#ffffff"] };
    });

    // Search with no results
    await p.fill(".search input", "zzzqqq");
    await p.waitForTimeout(400);
    await p.screenshot({ path: `${out}/${tag}-03-empty.png` });
    r.empty = await p.evaluate(() => ({
      helper: !!document.querySelector(".empty-state .suggest button"),
      allCount: document.querySelector(".cats button .n")?.textContent ?? document.querySelector(".catselect option")?.textContent,
    }));
    check(r.empty.helper, `${tag} bare empty state`);
    check(/^0$|\(0\)/.test(r.empty.allCount ?? ""), `${tag} stale count ${r.empty.allCount}`);
    // a pending card (no-diagram) for contrast
    await p.fill(".search input", "troubleshoot");
    await p.waitForTimeout(300);
    r.contrast.pending = await p.evaluate(() => { const s = document.querySelector(".pending .thumb span"); if (!s) return null; const hex = (c) => "#" + c.match(/\d+/g).slice(0, 3).map((n) => (+n).toString(16).padStart(2, "0")).join(""); return [hex(getComputedStyle(s).color), hex(getComputedStyle(s.parentElement).backgroundColor)]; });
    for (const [k, pair] of Object.entries(r.contrast)) if (pair) { const c = ratio(pair[0], pair[1]); r.contrast[k] = [...pair, +c.toFixed(2)]; check(c >= 4.5, `${tag} contrast ${k} ${c.toFixed(2)}`); }

    // Viewers
    for (const s of SLUGS) {
      step = `viewer ${s}`;
      await p.goto(`${base}?a=${s}&cb=${Date.now()}`, { waitUntil: "load" });
      await p.waitForFunction(() => window.__alz?.api, null, { timeout: 30000 });
      await p.waitForTimeout(800);
      await p.screenshot({ path: `${out}/${tag}-v-${s}-1-drawing.png` });
      await p.waitForTimeout(3800);
      await p.screenshot({ path: `${out}/${tag}-v-${s}-2-settled.png` });
      const v = await p.evaluate(() => {
        const a = window.__alz.api, st = a.getAppState();
        const els = a.getSceneElements().filter((e) => !e.isDeleted);
        let x1 = 1e9, y1 = 1e9, x2 = -1e9, y2 = -1e9;
        for (const e of els) { x1 = Math.min(x1, e.x); y1 = Math.min(y1, e.y); x2 = Math.max(x2, e.x + e.width); y2 = Math.max(y2, e.y + e.height); }
        const z = st.zoom.value, sx = (x) => (x + st.scrollX) * z, sy = (y) => (y + st.scrollY) * z;
        const canvas = document.querySelector(".canvas").getBoundingClientRect();
        const h1 = document.querySelector(".bar h1");
        // Excalidraw's own bottom controls: visible buttons in the lower half of the canvas.
        const ctlTops = [...document.querySelectorAll(".excalidraw button, .excalidraw .zoom-actions")].map((el) => el.getBoundingClientRect()).filter((b) => b.width && b.height && b.top > canvas.top + canvas.height / 2).map((b) => b.top);
        const ctl = ctlTops.length ? { top: Math.min(...ctlTops) } : null;
        const caption = els.filter((e) => e.type === "text").sort((m, n) => n.y - m.y)[0];
        const capBottom = caption ? canvas.top + sy(caption.y + caption.height) : 0;
        const buttons = [...document.querySelectorAll(".actions .act, .actions .source, .bar a.back")];
        const rows = new Set(buttons.map((b) => Math.round(b.getBoundingClientRect().top / 10))).size;
        return {
          zoom: +z.toFixed(3),
          left: Math.round(sx(x1)), right: Math.round(sx(x2)), top: Math.round(sy(y1)), bottom: Math.round(sy(y2)),
          cw: Math.round(st.width), ch: Math.round(st.height), canvasTop: Math.round(canvas.top),
          titleTrunc: h1.scrollWidth > h1.clientWidth + 1 || h1.scrollHeight > h1.clientHeight + 1,
          ctlTop: ctl ? Math.round(ctl.top) : null, capBottom: Math.round(capBottom),
          visibleButtons: buttons.length, actionRows: rows, resetShown: !!document.querySelector("[data-action=reset]"),
          minTap: Math.min(...buttons.map((b) => b.getBoundingClientRect().height)),
        };
      });
      r[s] = v;
      check(v.left >= 0 && v.right <= v.cw && v.top >= 0 && v.bottom <= v.ch, `${tag} ${s} cropped ${JSON.stringify(v)}`);
      if (sz === "phone") check(v.top <= 24, `${tag} ${s} dead space above (${v.top})`);
      check(!v.titleTrunc, `${tag} ${s} title truncated`);
      check(v.ctlTop == null || v.capBottom <= v.ctlTop, `${tag} ${s} caption under controls cap=${v.capBottom} ctl=${v.ctlTop}`);
      check(!v.resetShown, `${tag} ${s} reset shown without edits`);
      check(v.minTap >= 36, `${tag} ${s} small toolbar tap ${v.minTap}`);
      if (sz === "phone") check(v.actionRows <= 2, `${tag} ${s} toolbar rows ${v.actionRows}`);

      if (s === "aks-baseline") {
        // Flow
        await p.click("[data-action=flow]");
        await p.waitForTimeout(1200);
        const flowOn = await p.evaluate(() => document.querySelector(".line-motion").dataset.flow);
        await p.screenshot({ path: `${out}/${tag}-v-${s}-3-flow.png` });
        await p.click("[data-action=flow]");
        const flowOff = await p.evaluate(() => document.querySelector(".line-motion").dataset.flow);
        // Replay
        await p.click("[data-action=replay]");
        await p.waitForTimeout(400);
        const drawing = await p.evaluate(() => !!window.__alz.motion()?.draw);
        await p.waitForTimeout(4000);
        // Downloads
        const dl = {};
        for (const fmt of ["PNG", "SVG", ".excalidraw"]) {
          step = `download ${fmt}`;
          await p.click(".menu-wrap > button");
          const [d] = await Promise.all([p.waitForEvent("download", { timeout: 20000 }), p.click(`.menu [data-format="${fmt}"]`)]);
          const path = `${out}/${tag}-dl-${d.suggestedFilename()}`;
          await d.saveAs(path);
          dl[fmt] = [d.suggestedFilename(), statSync(path).size];
          check(statSync(path).size > 2000, `${tag} download ${fmt} too small`);
        }
        step = "edit";
        // Edit, then Reset appears, then reset
        await p.click("[data-action=edit]");
        await p.waitForTimeout(300);
        const editing = await p.evaluate(() => !window.__alz.api.getAppState().viewModeEnabled);
        const resetVisible = await p.isVisible("[data-action=reset]");
        await p.screenshot({ path: `${out}/${tag}-v-${s}-4-edit.png` });
        await p.click("[data-action=reset]");
        await p.waitForTimeout(300);
        const back = await p.evaluate(() => window.__alz.api.getAppState().viewModeEnabled);
        r.actions = { flowOn, flowOff, drawing, dl, editing, resetVisible, back };
        check(flowOn === "on" && flowOff === "off", `${tag} flow toggle`);
        check(drawing, `${tag} replay`);
        check(editing && resetVisible && back, `${tag} edit/reset`);
      }
    }
    r.errs = errs;
    check(!errs.length, `${tag} console errors ${errs.join(" | ")}`);
    report[tag] = r;
    await ctx.close();
  }
  await b.close();
}
server?.close();
console.log(JSON.stringify(report, null, 1));
console.log(fails.length ? "FAIL\n" + fails.join("\n") : "ALL CHECKS PASS");
process.exit(fails.length ? 1 : 0);
