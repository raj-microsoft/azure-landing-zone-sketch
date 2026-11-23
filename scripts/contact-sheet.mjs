// Contact sheet for Raj: 3x3 grid of the newest finished thumbnails (queue order, newest = highest finished num), labelled.
// Writes C:\Users\dev\.openclaw\media\outbound\aac-sketch-sheet.png
import { createRequire } from "node:module";
import { readFileSync, mkdirSync } from "node:fs";
const require = createRequire("C:/repos/gh-pages-lab/azure-icons/package.json");
const sharp = require("sharp");
const idx = JSON.parse(readFileSync("public/scenes/index.json", "utf8"));
const done = idx.scenes.filter((s) => s.status === "done" && s.num).sort((a, b) => b.num - a.num).slice(0, 9);
const CW = 600, TH = 375, LH = 70, G = 16;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const wrap = (t, n = 52) => { const w = t.split(" "), l = [""]; for (const x of w) { if ((l.at(-1) + " " + x).trim().length > n) l.push(x); else l[l.length - 1] = (l.at(-1) + " " + x).trim(); } return l.slice(0, 2); };
const comps = [];
for (const [i, s] of done.entries()) {
  const x = G + (i % 3) * (CW + G), y = G + Math.floor(i / 3) * (TH + LH + G);
  const img = await sharp(`public/thumbs/${s.slug}.png`).resize({ width: CW, height: TH, fit: "contain", background: "#fdfdfb" }).png().toBuffer();
  comps.push({ input: img, left: x, top: y });
  const lines = wrap(`${String(s.num).padStart(3, "0")} ${s.title}`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CW}" height="${LH}"><rect width="100%" height="100%" fill="#ffffff"/>${lines.map((l, j) => `<text x="12" y="${28 + j * 26}" font-family="Segoe UI, sans-serif" font-size="20" fill="#1e1e1e">${esc(l)}</text>`).join("")}</svg>`;
  comps.push({ input: Buffer.from(svg), left: x, top: y + TH });
}
const rows = Math.ceil(done.length / 3);
mkdirSync("C:/Users/dev/.openclaw/media/outbound", { recursive: true });
const out = "C:/Users/dev/.openclaw/media/outbound/aac-sketch-sheet.png";
await sharp({ create: { width: G + 3 * (CW + G), height: G + rows * (TH + LH + G), channels: 3, background: "#dee2e6" } }).composite(comps).png().toFile(out);
console.log("sheet", out, done.map((s) => s.slug).join(","));
