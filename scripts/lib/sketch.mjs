// Shared Excalidraw scene toolkit for the pencil-sketch reference architectures.
// A spec (specs/<slug>.mjs) exports `meta` and `draw(k)`; build-scene.mjs calls createScene() and passes the toolkit.
// Every icon id is verified against azure-icons/public/icons.json and the sketchnote-gpt set; unknown ids throw.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export const SRC = "C:/repos/gh-pages-lab/azure-icons/public";
const catalog = new Set(JSON.parse(readFileSync(join(SRC, "icons.json"), "utf8")).icons.map((i) => i.id));
const sketch = new Set(readdirSync(join(SRC, "sketchnote-gpt/svg")).map((f) => f.replace(/\.svg$/, "")));
export const hasIcon = (n) => catalog.has(n) && sketch.has(n);

export const INK = "#1e1e1e";
export const FONT = 5; // Excalifont (hand-drawn)
// Calm, role-based tints.
export const TINT = {
  sub: "#e7f5ff",     // subscriptions / Azure boundary panels (light blue)
  mg: "#f1f3f5",      // grey areas, resource groups, neutral groups
  hub: "#e3fafc",     // virtual networks, hubs
  subBox: "#fff3bf",  // pale yellow callouts / subscription boxes
  white: "#ffffff",
  onprem: "#e9ecef",  // on-premises, third-party, non-Azure
  badge: "#b2f2bb",   // step / design-area badges
  pim: "#c5f6fa",
  data: "#f3f0ff",    // data stores / analytics zones
  app: "#ebfbee",     // application / compute zones
  warn: "#fff4e6",    // external, internet, edge
};

export function createScene({ seed: seed0 = 4100 } = {}) {
  let seed = seed0;
  const nextSeed = () => (seed = (seed * 48271) % 2147483647);
  const shapes = [];
  const arrowsOut = [];
  const files = {};
  const byId = new Map();
  const usedIcons = new Set();

  function base(type, id, x, y, w, h, extra = {}) {
    if (byId.has(id)) throw new Error("duplicate id " + id);
    const e = {
      id, type, x, y, width: w, height: h, angle: 0,
      strokeColor: INK, backgroundColor: "transparent", fillStyle: "solid",
      strokeWidth: 2, strokeStyle: "solid", roughness: 1, opacity: 100,
      groupIds: [], frameId: null, roundness: null, seed: nextSeed(), version: 1,
      versionNonce: nextSeed(), isDeleted: false, boundElements: [], updated: 1,
      link: null, locked: false, ...extra,
    };
    byId.set(id, e);
    return e;
  }
  const measure = (t, size) => {
    const lines = t.split("\n");
    return { w: Math.ceil(Math.max(...lines.map((l) => l.length)) * size * 0.58), h: Math.ceil(lines.length * size * 1.25) };
  };
  function textEl(id, x, y, t, { size = 20, align = "left", color = INK, containerId = null, w, h, valign = "top", role = "text" } = {}) {
    const m = measure(t, size);
    return base("text", id, x, y, w ?? m.w, h ?? m.h, {
      strokeColor: color, text: t, originalText: t, fontSize: size, fontFamily: FONT,
      textAlign: align, verticalAlign: valign, containerId, lineHeight: 1.25, autoResize: true,
      roughness: 1, customData: { role },
    });
  }
  // Free text. align=center means x is the centre.
  function txt(id, x, y, t, opts = {}) {
    const m = measure(t, opts.size ?? 20);
    const e = textEl(id, opts.align === "center" ? x - m.w / 2 : x, y, t, opts);
    shapes.push(e);
    return e;
  }
  function zone(id, x, y, w, h, fill, { dashed = false, stroke = "#4a6b8a" } = {}) {
    const e = base("rectangle", id, x, y, w, h, {
      backgroundColor: fill, strokeColor: stroke, strokeWidth: 1.5, roundness: { type: 3 },
      strokeStyle: dashed ? "dashed" : "solid", fillStyle: "solid",
      customData: { role: "zone" },
    });
    shapes.push(e);
    return e;
  }
  // Labelled shape with bound text (text element immediately follows the container).
  // iconLeft: icon sits at the left inside the box and the text is left-aligned beside it.
  function box(id, x, y, w, h, label, { fill = TINT.white, size = 20, align = "center", valign = "middle", type = "rectangle", stroke = INK, iconName, dashed = false, iconLeft } = {}) {
    if (w < 120 || h < 60) throw new Error(`labelled shape ${id} smaller than 120x60`);
    const r = base(type, id, x, y, w, h, {
      backgroundColor: fill, strokeColor: stroke, roundness: type === "rectangle" ? { type: 3 } : { type: 2 },
      strokeStyle: dashed ? "dashed" : "solid", customData: { role: "box" },
    });
    const m = measure(label, size);
    const is = iconLeft ? Math.min(h - 16, 48) : 0;
    if (iconLeft) align = "left";
    const tw = Math.min(m.w, w - 16 - (is ? is + 12 : 0));
    const ty = valign === "middle" ? y + (h - m.h) / 2 : valign === "bottom" ? y + h - m.h - 8 : y + 8;
    const tx = iconLeft ? x + is + 20 : align === "center" ? x + (w - tw) / 2 : x + 12;
    const t = textEl(`${id}-text`, tx, ty, label, { size, align, valign, containerId: id, w: tw, h: m.h, role: "bound" });
    r.boundElements.push({ id: t.id, type: "text" });
    shapes.push(r, t);
    if (iconLeft) icon(`${id}-icon`, iconLeft, x + 10, y + (h - is) / 2, is);
    else if (iconName) icon(`${id}-icon`, iconName, x + w / 2 - 28, y + 12, 56);
    return r;
  }
  function useIcon(name) {
    if (!catalog.has(name)) throw new Error(`icon id not in icons.json: ${name}`);
    if (!sketch.has(name)) throw new Error(`no ChatGPT sketch for: ${name}`);
    usedIcons.add(name);
    const fileId = `icon-${name}`;
    if (!files[fileId]) {
      const svg = readFileSync(join(SRC, "sketchnote-gpt/svg", `${name}.svg`));
      files[fileId] = { mimeType: "image/svg+xml", id: fileId, created: 1, lastRetrieved: 1, dataURL: `data:image/svg+xml;base64,${svg.toString("base64")}` };
    }
    return fileId;
  }
  function icon(id, name, x, y, size = 56) {
    const e = base("image", id, x, y, size, size, {
      strokeColor: "transparent", roughness: 0, fileId: useIcon(name), status: "saved", scale: [1, 1], crop: null,
      customData: { role: "icon", icon: name },
    });
    shapes.push(e);
    return e;
  }
  // icon with caption centred underneath
  function iconCap(id, name, x, y, caption, { size = 56, font = 16 } = {}) {
    const i = icon(id, name, x, y, size);
    if (caption) txt(`${id}-cap`, x + size / 2, y + size + 4, caption, { size: font, align: "center" });
    return i;
  }
  // Icon card: a labelled box with the icon on top and the caption at the bottom (arrow-bindable).
  // The icon shrinks so it never collides with a multi-line caption.
  function card(id, x, y, w, h, name, label, opts = {}) {
    const size = opts.size ?? 18;
    if (opts.valign && opts.valign !== "bottom" || opts.iconName === undefined && "iconName" in opts) return box(id, x, y, w, h, label, { valign: "bottom", size, ...opts });
    const th = measure(label, size).h;
    const is = Math.max(28, Math.min(56, h - th - 8 - 12 - 6));
    const r = box(id, x, y, w, h, label, { valign: "bottom", size, ...opts, iconName: undefined });
    icon(`${id}-icon`, name, x + w / 2 - is / 2, y + 10, is);
    return r;
  }
  function badge(id, x, y, letter, { w = 120, h = 64, size = 28 } = {}) {
    return box(id, x, y, w, h, letter, { type: "ellipse", fill: TINT.badge, size, stroke: "#2b8a3e" });
  }
  // Numbered step marker (small green circle, free shapes so it can sit next to an arrow). Not bindable.
  function step(id, x, y, n, { square = false, fill = TINT.badge, stroke = "#2b8a3e" } = {}) {
    const e = base(square ? "rectangle" : "ellipse", id, x, y, 40, 40, { backgroundColor: fill, strokeColor: stroke, roundness: square ? null : { type: 2 }, customData: { role: "step" } });
    shapes.push(e);
    const s = String(n);
    txt(`${id}-n`, x + 20, y + 7, s, { size: 20, align: "center" });
    return e;
  }
  function header(prefix, x, y, title, { letter, iconName = "subscriptions", size = 26 } = {}) {
    let cx = x;
    if (letter) { badge(`${prefix}-badge`, x, y, letter); cx += 130; }
    if (iconName) { icon(`${prefix}-hicon`, iconName, cx, y + 4, 56); cx += 66; }
    txt(`${prefix}-title`, cx, y + (title.includes("\n") ? 0 : 14), title, { size });
  }
  // Titled group (zone + title top-left + optional icon top-right). Arrow-bindable via its id.
  function group(id, x, y, w, h, title, { fill = TINT.white, stroke = "#4a6b8a", dashed = false, iconName, iconSize = 40, size = 18, align = "left" } = {}) {
    const z = zone(id, x, y, w, h, fill, { dashed, stroke });
    if (title) {
      if (align === "center") txt(`${id}-t`, x + w / 2, y + 10, title, { size, align: "center" });
      else txt(`${id}-t`, x + 14, y + 10, title, { size });
    }
    if (iconName) icon(`${id}-i`, iconName, x + w - iconSize - 10, y + 8, iconSize);
    return z;
  }

  // ---------- arrows ----------
  function at(el, side, abs) {
    const { x, y, width: w, height: h } = el;
    if (side === "left") return { p: [x, abs], fp: [0, (abs - y) / h] };
    if (side === "right") return { p: [x + w, abs], fp: [1, (abs - y) / h] };
    if (side === "top") return { p: [abs, y], fp: [(abs - x) / w, 0] };
    return { p: [abs, y + h], fp: [(abs - x) / w, 1] };
  }
  const mid = (el, side) => at(el, side, side === "left" || side === "right" ? el.y + el.height / 2 : el.x + el.width / 2);
  // Orthogonal route: start, lanes (alternating h/v starting with firstDir), end.
  function arrow(id, fromId, fromSide, fromAbs, toId, toSide, toAbs, lanes = [], opts = {}) {
    const { firstDir = fromSide === "left" || fromSide === "right" ? "h" : "v", dashed = false, head = "arrow", tail = null, color = "#343a40" } = opts;
    const A = byId.get(fromId), B = byId.get(toId);
    if (!A || !B) throw new Error(`arrow ${id}: missing ${fromId} or ${toId}`);
    const s = fromAbs == null ? mid(A, fromSide) : at(A, fromSide, fromAbs);
    const e = toAbs == null ? mid(B, toSide) : at(B, toSide, toAbs);
    const pts = [s.p];
    let dir = firstDir, cur = s.p;
    for (const m of lanes) { cur = dir === "h" ? [m, cur[1]] : [cur[0], m]; pts.push(cur); dir = dir === "h" ? "v" : "h"; }
    if (cur[0] !== e.p[0] && cur[1] !== e.p[1]) pts.push(dir === "h" ? [e.p[0], cur[1]] : [cur[0], e.p[1]]);
    pts.push(e.p);
    const clean = pts.filter((p, i) => i === 0 || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1]);
    for (let i = 1; i < clean.length; i++) if (clean[i][0] !== clean[i - 1][0] && clean[i][1] !== clean[i - 1][1]) throw new Error(`arrow ${id} not orthogonal at ${i}`);
    const [x0, y0] = clean[0];
    const rel = clean.map(([x, y]) => [x - x0, y - y0]);
    const xs = rel.map((p) => p[0]), ys = rel.map((p) => p[1]);
    const a = base("arrow", id, x0, y0, Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys), {
      strokeColor: color, strokeWidth: 2, strokeStyle: dashed ? "dashed" : "solid", roughness: 1,
      roundness: null, points: rel, lastCommittedPoint: null, elbowed: false,
      startArrowhead: tail, endArrowhead: head,
      startBinding: { elementId: fromId, focus: 0, gap: 1, fixedPoint: s.fp },
      endBinding: { elementId: toId, focus: 0, gap: 1, fixedPoint: e.fp },
      customData: { role: "arrow", from: fromId, to: toId },
    });
    A.boundElements.push({ id, type: "arrow" });
    B.boundElements.push({ id, type: "arrow" });
    arrowsOut.push(a);
    return a;
  }
  const line = (id, f, fs, fa, t, ts, ta, lanes, o = {}) => arrow(id, f, fs, fa, t, ts, ta, lanes, { head: null, ...o });
  const both = (id, f, fs, fa, t, ts, ta, lanes, o = {}) => arrow(id, f, fs, fa, t, ts, ta, lanes, { tail: "arrow", ...o });
  const peer = (id, f, fs, fa, t, ts, ta, lanes) => arrow(id, f, fs, fa, t, ts, ta, lanes, { head: "circle_outline", tail: "circle_outline", color: "#1971c2" });

  // free polyline / smooth curve (charts, axes); absolute points; not bound
  function poly(id, pts, { color = INK, dashed = false, head = null, smooth = false, width = 2 } = {}) {
    const [x0, y0] = pts[0];
    const rel = pts.map(([x, y]) => [x - x0, y - y0]);
    const xs = rel.map((p) => p[0]), ys = rel.map((p) => p[1]);
    const e = base("line", id, x0 + Math.min(...xs), y0 + Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys), {
      strokeColor: color, strokeWidth: width, strokeStyle: dashed ? "dashed" : "solid", roundness: smooth ? { type: 2 } : null,
      points: rel, lastCommittedPoint: null, startBinding: null, endBinding: null, startArrowhead: null, endArrowhead: head,
      customData: { role: "line" },
    });
    e.x = x0; e.y = y0;
    shapes.push(e);
    return e;
  }

  function finish({ source = "https://raj-microsoft.github.io/azure-landing-zone-sketch/" } = {}) {
    const elements = [...shapes, ...arrowsOut];
    return {
      scene: { type: "excalidraw", version: 2, source, elements, appState: { viewBackgroundColor: "#fdfdfb", gridSize: null, currentItemFontFamily: FONT }, files },
      usedIcons: [...usedIcons].sort(),
    };
  }

  return { INK, FONT, TINT, byId, txt, zone, group, box, icon, iconCap, card, badge, step, header, arrow, line, both, peer, poly, finish, hasIcon };
}
