// Geometry and integrity check for an Excalidraw scene. Prints PASS or the list of failures.
// Usage: node scripts/check-geometry.mjs <scene.excalidraw> [more scenes...]   (default: every public/scenes/*.excalidraw)
import { readFileSync, readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";

export function checkScene(scene) {
const els = scene.elements.filter((e) => !e.isDeleted);
const byId = new Map(els.map((e) => [e.id, e]));
const fail = [];
const EDGE = 6; // px tolerance for "on the edge"

const rect = (e) => ({ x1: e.x, y1: e.y, x2: e.x + e.width, y2: e.y + e.height });
const contains = (a, b) => a.x1 <= b.x1 && a.y1 <= b.y1 && a.x2 >= b.x2 && a.y2 >= b.y2;
const intersects = (a, b, pad = 0) => a.x1 < b.x2 - pad && b.x1 < a.x2 - pad && a.y1 < b.y2 - pad && b.y1 < a.y2 - pad;

const arrows = els.filter((e) => e.type === "arrow");
const solids = els.filter((e) => e.type !== "arrow" && e.type !== "line" && e.customData?.role !== "zone" && !e.containerId);
const zones = els.filter((e) => e.customData?.role === "zone");

// 1. images have files
for (const e of els.filter((e) => e.type === "image")) {
  const f = scene.files?.[e.fileId];
  if (!f || !/^data:image\/(svg\+xml|png);base64,/.test(f.dataURL)) fail.push(`image ${e.id} has no file`);
}
// 2. bound text follows container, container lists it
els.forEach((e, i) => {
  if (e.type === "text" && e.containerId) {
    const c = byId.get(e.containerId);
    if (!c) fail.push(`text ${e.id} container missing`);
    else {
      if (els[i - 1]?.id !== c.id) fail.push(`text ${e.id} not immediately after container`);
      if (!c.boundElements?.some((b) => b.id === e.id)) fail.push(`container ${c.id} does not list ${e.id}`);
      if (c.width < 120 || c.height < 60) fail.push(`labelled shape ${c.id} < 120x60`);
    }
  }
  if (e.type === "text" && e.fontSize < 16) fail.push(`text ${e.id} font ${e.fontSize} < 16`);
});
// 3. arrows bound, endpoints on edges
const segs = [];
for (const a of arrows) {
  const pts = a.points.map(([x, y]) => [a.x + x, a.y + y]);
  for (const [end, b, want, p] of [["start", a.startBinding, a.customData?.from, pts[0]], ["end", a.endBinding, a.customData?.to, pts.at(-1)]]) {
    if (!b?.elementId) { fail.push(`arrow ${a.id} ${end} unbound`); continue; }
    if (want && b.elementId !== want) fail.push(`arrow ${a.id} ${end} bound to ${b.elementId}, intended ${want}`);
    const t = byId.get(b.elementId);
    if (!t) { fail.push(`arrow ${a.id} ${end} target missing`); continue; }
    if (!t.boundElements?.some((x) => x.id === a.id)) fail.push(`${t.id} does not list arrow ${a.id}`);
    const r = rect(t);
    const inX = p[0] >= r.x1 - EDGE && p[0] <= r.x2 + EDGE, inY = p[1] >= r.y1 - EDGE && p[1] <= r.y2 + EDGE;
    const onEdge = inX && inY && (Math.abs(p[0] - r.x1) <= EDGE || Math.abs(p[0] - r.x2) <= EDGE || Math.abs(p[1] - r.y1) <= EDGE || Math.abs(p[1] - r.y2) <= EDGE);
    if (!onEdge) fail.push(`arrow ${a.id} ${end} point ${p} not on edge of ${t.id}`);
  }
  for (let i = 1; i < pts.length; i++) segs.push({ a, p: pts[i - 1], q: pts[i], first: i === 1, last: i === pts.length - 1 });
}
// segment vs rectangle (shrunk by 1px so touching an edge is allowed)
const segHits = (p, q, r) => {
  const x1 = Math.min(p[0], q[0]), x2 = Math.max(p[0], q[0]), y1 = Math.min(p[1], q[1]), y2 = Math.max(p[1], q[1]);
  return x1 < r.x2 - 1 && x2 > r.x1 + 1 && y1 < r.y2 - 1 && y2 > r.y1 + 1;
};
// 4. no arrow passes through a non-endpoint box/icon/text, nor through the interior of its own endpoints
for (const s of segs) {
  const ends = [s.a.startBinding?.elementId, s.a.endBinding?.elementId];
  for (const e of solids) {
    const r = rect(e);
    if (ends.includes(e.id)) {
      if (segHits(s.p, s.q, { x1: r.x1 + 2, y1: r.y1 + 2, x2: r.x2 - 2, y2: r.y2 - 2 })) fail.push(`arrow ${s.a.id} cuts through its own endpoint ${e.id}`);
      continue;
    }
    if (segHits(s.p, s.q, r)) fail.push(`arrow ${s.a.id} passes through ${e.id}`);
  }
  // zones may be crossed only at their border, not traversed, unless they are an endpoint or contain an endpoint
  for (const z of zones) {
    if (ends.includes(z.id)) continue;
    const zr = rect(z);
    const endRects = ends.filter((id) => byId.has(id)).map((id) => rect(byId.get(id)));
    if (endRects.some((r) => contains(zr, r))) continue;
    const inner = { x1: zr.x1 + 20, y1: zr.y1 + 20, x2: zr.x2 - 20, y2: zr.y2 - 20 };
    if (segHits(s.p, s.q, inner)) fail.push(`arrow ${s.a.id} runs across zone ${z.id}`);
  }
}
// 5. no two arrows overlap (collinear shared length)
for (let i = 0; i < segs.length; i++) for (let j = i + 1; j < segs.length; j++) {
  const A = segs[i], B = segs[j];
  if (A.a === B.a) continue;
  const hA = A.p[1] === A.q[1], hB = B.p[1] === B.q[1];
  if (hA !== hB) continue;
  const k = hA ? 1 : 0, o = hA ? 0 : 1;
  if (Math.abs(A.p[k] - B.p[k]) > 4) continue;
  const lo = Math.max(Math.min(A.p[o], A.q[o]), Math.min(B.p[o], B.q[o]));
  const hi = Math.min(Math.max(A.p[o], A.q[o]), Math.max(B.p[o], B.q[o]));
  if (hi - lo > 2) fail.push(`arrows ${A.a.id} and ${B.a.id} overlap`);
}
// 6. shapes/icons/text do not overlap except by containment
const all = [...solids, ...zones];
for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
  const a = rect(all[i]), b = rect(all[j]);
  if (intersects(a, b) && !contains(a, b) && !contains(b, a)) fail.push(`overlap ${all[i].id} x ${all[j].id}`);
}
// 7. style
for (const e of els) {
  if (e.type !== "image" && (e.roughness < 1 || e.roughness > 2)) fail.push(`roughness ${e.id}=${e.roughness}`);
  if (e.type === "text" && ![1, 5].includes(e.fontFamily)) fail.push(`font ${e.id}`);
}

  const summary = `${els.length} elements, ${arrows.length} bound arrows, ${els.filter((e) => e.type === "image").length} images with files`;
  return { pass: fail.length === 0, fail, summary };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  let paths = process.argv.slice(2);
  if (!paths.length) paths = readdirSync("public/scenes").filter((f) => f.endsWith(".excalidraw")).map((f) => `public/scenes/${f}`);
  let bad = 0;
  for (const p of paths) {
    const r = checkScene(JSON.parse(readFileSync(p, "utf8")));
    if (r.pass) console.log(`PASS ${p}: ${r.summary}, no crossings/overlaps`);
    else { bad++; console.log(r.fail.join("\n")); console.log(`FAIL ${p} (${r.fail.length})`); }
  }
  process.exit(bad ? 1 : 0);
}