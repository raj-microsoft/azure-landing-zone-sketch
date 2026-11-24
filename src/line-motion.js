// Calm line motion for the sketch viewer, with three presets (see looks.js).
// Excalidraw paints to canvas, so lines are redrawn in a temporary SVG overlay that sits exactly on top
// of them (same scene coordinates, same scroll/zoom). The overlay is only on screen while something moves:
//   - draw-in: on open (and on Replay) each line is traced once, then the canvas lines come back and the
//     overlay fades out, so the settled image is Excalidraw's own. Finite: about 3 s, never loops.
//   - flow: only when the viewer switches it on. Each preset has its own calm, resting rhythm.
// Overlay strokes always use the element's own strokeWidth: never thicker than the scene.
// Nothing here touches scene data: the viewer hides canvas lines with display-only opacity copies.

const NS = "http://www.w3.org/2000/svg";

export const isLinear = (e) => (e.type === "arrow" || e.type === "line") && !e.isDeleted && e.points?.length > 1;

// Excalidraw 0.18 arrowhead geometry (getArrowheadPoints / getArrowheadSize / getArrowheadAngle).
const HEAD_SIZE = { arrow: 25, diamond: 12, diamond_outline: 12, crowfoot_many: 20, crowfoot_one: 20, crowfoot_one_or_many: 20 };
const HEAD_ANGLE = { bar: 90, arrow: 20 };

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
// Easing curves. cubic = today's; quint = Emil Kowalski / Impeccable "confident arrival" (0.16,1,0.3,1);
// inOut = pen-like acceleration then settle (rough-notation's ease-out per stroke, eased at both ends).
export const EASE = {
  cubic: (t) => 1 - Math.pow(1 - t, 3),
  quint: (t) => 1 - Math.pow(1 - t, 5),
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
};
const smooth = (u) => u * u * (3 - 2 * u);

function hex(c) {
  const m = /^#?([0-9a-f]{6})$/i.exec(c || "");
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(a, b, t) {
  const A = hex(a), B = hex(b);
  if (!A || !B) return t < 0.5 ? a : b;
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
}

function polyline(e) {
  const pts = e.points.map(([px, py]) => [e.x + px, e.y + py]);
  const seg = [];
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    seg.push(l);
    len += l;
  }
  return { pts, seg, len };
}

function pointAt({ pts, seg }, d) {
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i] || i === seg.length - 1) {
      const t = seg[i] ? clamp(d / seg[i], 0, 1) : 0;
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t];
    }
    d -= seg[i];
  }
  return pts[pts.length - 1];
}

function head(e, pts, position, kind, bg) {
  const tip = position === "end" ? pts[pts.length - 1] : pts[0];
  const prev = position === "end" ? pts[pts.length - 2] : pts[1];
  const len = Math.hypot(tip[0] - prev[0], tip[1] - prev[1]);
  if (!len) return null;
  const nx = (tip[0] - prev[0]) / len, ny = (tip[1] - prev[1]) / len;
  const mult = kind === "diamond" || kind === "diamond_outline" ? 0.25 : 0.5;
  const size = Math.min(HEAD_SIZE[kind] ?? 15, len * mult);
  const xs = tip[0] - nx * size, ys = tip[1] - ny * size;
  if (kind === "dot" || kind === "circle" || kind === "circle_outline") {
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", tip[0]);
    c.setAttribute("cy", tip[1]);
    c.setAttribute("r", Math.max(0.5, (size + e.strokeWidth - 2) / 2));
    c.setAttribute("fill", kind === "circle_outline" ? bg : "currentColor");
    return c;
  }
  const a = ((HEAD_ANGLE[kind] ?? 25) * Math.PI) / 180;
  const rot = (s) => {
    const dx = xs - tip[0], dy = ys - tip[1];
    return [tip[0] + dx * Math.cos(s * a) - dy * Math.sin(s * a), tip[1] + dx * Math.sin(s * a) + dy * Math.cos(s * a)];
  };
  const [p3, p4] = [rot(-1), rot(1)];
  const p = document.createElementNS(NS, "path");
  if (kind === "triangle" || kind === "triangle_outline") {
    p.setAttribute("d", `M${tip[0]} ${tip[1]}L${p3[0]} ${p3[1]}L${p4[0]} ${p4[1]}Z`);
    p.setAttribute("fill", kind === "triangle_outline" ? bg : "currentColor");
  } else {
    p.setAttribute("d", `M${p3[0]} ${p3[1]}L${tip[0]} ${tip[1]}L${p4[0]} ${p4[1]}`);
    p.setAttribute("fill", "none");
  }
  return p;
}

// ---------- ordering ----------
// reading: rows of roughly one box height, then left to right (today's behaviour).
const rowKey = (l) => Math.round(l.geo.pts[0][1] / 140);
function readingOrder(lines) {
  return lines.sort((a, b) => rowKey(a) - rowKey(b) || a.geo.pts[0][0] - b.geo.pts[0][0]);
}
// sweep: the whiteboard artist's hand moves across the board, left to right by where a line starts.
function sweepOrder(lines) {
  return lines.sort((a, b) => Math.min(...a.geo.pts.map((p) => p[0])) - Math.min(...b.geo.pts.map((p) => p[0])) || a.geo.pts[0][1] - b.geo.pts[0][1]);
}
// graph: follow the architecture. Scenes record from/to on every arrow; draw sources first, then each
// hop outwards (breadth first), so the drawing tells the request path. Cycles and islands fall back to
// reading order after the reachable part.
function graphOrder(lines) {
  const out = new Map(), indeg = new Map();
  for (const l of lines) {
    const { from, to } = l.e.customData ?? {};
    if (!from || !to) continue;
    const [a, b] = l.dir === -1 ? [to, from] : [from, to];
    l.src = a;
    if (!out.has(a)) out.set(a, []);
    out.get(a).push(b);
    indeg.set(b, (indeg.get(b) ?? 0) + (l.dir === 2 || l.dir === 0 ? 0 : 1));
    if (!indeg.has(a)) indeg.set(a, 0);
  }
  const depth = new Map();
  const queue = [...indeg.keys()].filter((k) => !indeg.get(k));
  for (const k of queue) depth.set(k, 0);
  while (queue.length) {
    const k = queue.shift();
    for (const n of out.get(k) ?? []) if (!depth.has(n)) { depth.set(n, depth.get(k) + 1); queue.push(n); }
  }
  let maxD = 0;
  for (const d of depth.values()) maxD = Math.max(maxD, d);
  for (const l of lines) l.depth = l.src && depth.has(l.src) ? depth.get(l.src) : maxD + 1 + rowKey(l) / 100;
  return lines.sort((a, b) => a.depth - b.depth || rowKey(a) - rowKey(b) || a.geo.pts[0][0] - b.geo.pts[0][0]);
}

// ---------- presets ----------
// Every preset: starts after a short beat (so the page has landed), ends within about 3 s, never loops.
export const PRESETS = {
  // A: today, calmer. One pencil in reading order, ink colour throughout.
  a: { order: "reading", ease: "cubic", delay: 450, span: 2200, step: 100, dur: [650, 1200], perPx: 0.55, dry: 0, tip: false, flow: "dots" },
  // B: editorial. Follows the request path hop by hop; each hop arrives with a confident deceleration in
  // the accent and "dries" to ink, so the eye sees where the flow is going without any line getting heavier.
  b: { order: "graph", ease: "quint", delay: 500, span: 2300, hop: 420, step: 50, dur: [700, 1150], perPx: 0.5, dry: 650, tip: false, flow: "relay" },
  // C: sketchnote. The hand sweeps left to right with a small marker tip leading each stroke.
  c: { order: "sweep", ease: "inOut", delay: 400, span: 2400, step: 90, dur: [600, 1100], perPx: 0.6, dry: 450, tip: true, flow: "wave" },
};

export class LineMotion {
  constructor(svg, { background = "#fdfdfb", accent = "#1971c2", preset = PRESETS.a, reduced = false } = {}) {
    this.svg = svg;
    this.bg = background;
    this.accent = accent;
    this.p = preset;
    this.reduced = reduced;
    this.ease = EASE[preset.ease] ?? EASE.cubic;
    this.view = document.createElementNS(NS, "g");
    this.drawLayer = document.createElementNS(NS, "g");
    this.flowLayer = document.createElementNS(NS, "g");
    this.view.append(this.drawLayer, this.flowLayer);
    svg.replaceChildren(this.view);
    this.lines = [];
    this.draw = null;
    this.flow = false;
    this.flowT = 0;
    this.zoom = 1;
    this.raf = 0;
    this.last = 0;
    this.tick = this.tick.bind(this);
    this.onVis = () => { if (document.hidden) this.halt(); else this.wake(); };
    document.addEventListener("visibilitychange", this.onVis);
  }

  destroy() {
    this.halt();
    document.removeEventListener("visibilitychange", this.onVis);
    this.svg.replaceChildren();
  }

  setView(scrollX, scrollY, zoom) {
    this.zoom = zoom;
    this.view.setAttribute("transform", `scale(${zoom}) translate(${scrollX} ${scrollY})`);
    this.sizeMarks();
  }

  // A stroke of the element's own width and dash, shown through a mask whose dash we animate.
  masked(e, geo, d, id, color) {
    const g = document.createElementNS(NS, "g");
    g.setAttribute("color", color);
    g.setAttribute("stroke", "currentColor");
    g.setAttribute("stroke-width", e.strokeWidth);
    g.dataset.id = e.id; // lets checks assert overlay width === scene strokeWidth
    g.setAttribute("stroke-linecap", "round");
    g.setAttribute("stroke-linejoin", "round");
    g.setAttribute("fill", "none");
    if (e.opacity !== 100) g.setAttribute("opacity", e.opacity / 100);
    const mask = document.createElementNS(NS, "mask");
    mask.setAttribute("id", id);
    mask.setAttribute("maskUnits", "userSpaceOnUse");
    for (const [k, v] of [["x", -1e5], ["y", -1e5], ["width", 2e5], ["height", 2e5]]) mask.setAttribute(k, v);
    const reveal = document.createElementNS(NS, "path");
    reveal.setAttribute("d", d);
    reveal.setAttribute("stroke", "#fff");
    reveal.setAttribute("stroke-width", e.strokeWidth + 4); // mask only: never visible as ink
    reveal.setAttribute("stroke-linecap", "butt");
    mask.append(reveal);
    const stroke = document.createElementNS(NS, "path");
    stroke.setAttribute("d", d);
    stroke.setAttribute("mask", `url(#${id})`);
    stroke.dataset.ink = "1";
    if (e.strokeStyle === "dashed") stroke.setAttribute("stroke-dasharray", `8 ${8 + e.strokeWidth}`);
    else if (e.strokeStyle === "dotted") stroke.setAttribute("stroke-dasharray", `1.5 ${6 + e.strokeWidth}`);
    g.append(mask, stroke);
    return { g, reveal };
  }

  // Rebuild from the live scene (after edits the geometry may differ).
  build(elements) {
    this.drawLayer.replaceChildren();
    this.flowLayer.replaceChildren();
    const lines = elements.filter(isLinear).map((e) => ({ e, geo: polyline(e) })).filter((l) => l.geo.len > 0);
    for (const l of lines) {
      const e = l.e;
      l.dir = e.type !== "arrow" ? 0 : e.startArrowhead && e.endArrowhead ? 2 : e.endArrowhead ? 1 : e.startArrowhead ? -1 : 0;
    }
    const order = { reading: readingOrder, sweep: sweepOrder, graph: graphOrder }[this.p.order] ?? readingOrder;
    this.lines = order(lines);
    this.lines.forEach((l, i) => {
      const { e, geo } = l;
      // Pencil travels in the arrow's direction (a start-only arrow is drawn from its head end).
      const pts = l.dir === -1 ? [...geo.pts].reverse() : geo.pts;
      const d = "M" + pts.map((p) => `${p[0]} ${p[1]}`).join("L");
      l.fwd = l.dir === -1 ? { pts, seg: [...geo.seg].reverse(), len: geo.len } : geo;
      const { g, reveal } = this.masked(e, geo, d, `lm-${i}`, this.p.dry ? this.accent : e.strokeColor);
      reveal.setAttribute("stroke-dasharray", `${geo.len + 1} ${geo.len + 8}`);
      reveal.setAttribute("stroke-dashoffset", geo.len + 1);
      const heads = [];
      if (e.type === "arrow") {
        for (const pos of ["start", "end"]) {
          const kind = pos === "start" ? e.startArrowhead : e.endArrowhead;
          if (!kind) continue;
          const h = head(e, geo.pts, pos, kind, this.bg);
          if (!h) continue;
          h.setAttribute("opacity", 0);
          g.append(h);
          // Which head the pencil reaches first, in drawing direction.
          heads.push({ el: h, first: (pos === "start") === (l.dir !== -1) });
        }
      }
      if (this.p.tip) {
        const tip = document.createElementNS(NS, "circle");
        tip.setAttribute("fill", this.accent);
        tip.setAttribute("stroke", "none");
        tip.setAttribute("opacity", 0);
        g.append(tip);
        l.tip = tip;
      }
      this.drawLayer.append(g);
      l.g = g;
      l.reveal = reveal;
      l.heads = heads;
      // Flow marks (built lazily so draw-in stays light).
      l.phase = (i * 0.61803) % 1;
    });
    this.flowBuilt = false;
    this.sizeMarks();
  }

  buildFlow() {
    if (this.flowBuilt) return;
    this.flowBuilt = true;
    this.flowLayer.replaceChildren();
    this.lines.forEach((l, i) => {
      if (!l.dir) return;
      const { e } = l;
      if (this.p.flow === "dots") {
        const dot = document.createElementNS(NS, "circle");
        dot.setAttribute("fill", this.accent);
        dot.setAttribute("opacity", 0);
        this.flowLayer.append(dot);
        l.dot = dot;
      } else {
        // relay / wave: the line itself lights up in the accent, same width and dash as the scene.
        const d = "M" + l.fwd.pts.map((p) => `${p[0]} ${p[1]}`).join("L");
        const { g, reveal } = this.masked(e, l.geo, d, `lf-${i}`, this.accent);
        g.setAttribute("opacity", 0);
        this.flowLayer.append(g);
        l.fg = g;
        l.freveal = reveal;
      }
    });
    this.sizeMarks();
  }

  sizeMarks() {
    const z = this.zoom || 1;
    // Dots are points, not lines; keep them findable on a phone (about 3 screen px radius).
    const r = Math.max(3.5, 3 / z);
    for (const l of this.lines) {
      l.dot?.setAttribute("r", r);
      // Marker tip: no wider than the stroke itself.
      l.tip?.setAttribute("r", Math.max(0.5, l.e.strokeWidth * 0.5));
    }
  }

  // Draw every line once. onReveal: canvas lines should come back now.
  drawIn({ onReveal, onDone } = {}) {
    this.finishDraw(false);
    const n = this.lines.length;
    if (!n) { onReveal?.(); onDone?.(); return; }
    const P = this.p;
    let end = 0;
    if (P.order === "graph") {
      // Hop-by-hop: one beat per depth, a small offset inside a hop, compressed to fit the span.
      const depths = [...new Set(this.lines.map((l) => Math.floor(l.depth)))].sort((a, b) => a - b);
      const hop = Math.min(P.hop, P.span / Math.max(1, depths.length));
      const within = new Map();
      for (const l of this.lines) {
        const k = depths.indexOf(Math.floor(l.depth));
        const j = within.get(k) ?? 0;
        within.set(k, j + 1);
        l.start = P.delay + k * hop + Math.min(j * P.step, hop * 0.8);
      }
    } else {
      const span = Math.min(P.span, P.step * n + 500);
      this.lines.forEach((l, i) => { l.start = P.delay + (n > 1 ? (i / (n - 1)) * span : 0); });
    }
    for (const l of this.lines) {
      l.dur = clamp(450 + l.geo.len * P.perPx, P.dur[0], P.dur[1]);
      l.g.setAttribute("color", P.dry ? this.accent : l.e.strokeColor);
      end = Math.max(end, l.start + l.dur + (P.dry || 160));
    }
    this.drawLayer.style.transition = "none";
    this.drawLayer.style.opacity = 1;
    this.svg.dataset.motion = "draw";
    this.draw = { t: 0, end, onReveal, onDone, revealed: false };
    this.paintDraw();
    this.wake();
  }

  // Jump to the settled state (used for Edit, Reset, exports during a draw-in).
  finishDraw(notify = true) {
    const d = this.draw;
    if (!d) return;
    this.draw = null;
    this.drawLayer.style.transition = "none";
    this.drawLayer.style.opacity = 0;
    if (notify && !d.revealed) d.onReveal?.();
    if (notify) d.onDone?.();
    this.settle();
  }

  setFlow(on) {
    this.flow = on;
    if (on) this.buildFlow();
    this.svg.dataset.flow = on ? "on" : "off";
    for (const l of this.lines) {
      l.dot?.setAttribute("opacity", 0);
      l.fg?.setAttribute("opacity", 0);
    }
    if (on && this.reduced) {
      // Reduced motion: Flow shows direction as a still accent tint on directed lines. Nothing moves.
      for (const l of this.lines) {
        if (!l.fg) continue;
        l.freveal.setAttribute("stroke-dasharray", "none");
        l.fg.setAttribute("opacity", 0.9);
      }
      for (const l of this.lines) if (l.dot) { const [x, y] = pointAt(l.fwd, l.geo.len * 0.5); l.dot.setAttribute("cx", x); l.dot.setAttribute("cy", y); l.dot.setAttribute("opacity", 0.9); }
      this.svg.dataset.motion = "still";
      return;
    }
    this.flowT = 0;
    if (on) this.wake();
    else this.settle();
  }

  settle() {
    if (!this.draw && !(this.flow && !this.reduced)) {
      this.halt();
      this.svg.dataset.motion = "still";
    }
  }

  wake() {
    if (this.raf || document.hidden || (!this.draw && !(this.flow && !this.reduced))) return;
    this.last = 0;
    this.raf = requestAnimationFrame(this.tick);
  }

  halt() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  tick(now) {
    this.raf = 0;
    const dt = this.last ? Math.min(1000, now - this.last) : 16; // wall-clock, so slow devices still finish on time
    this.last = now;
    if (this.draw) {
      this.draw.t += dt;
      this.paintDraw();
    }
    const flowing = this.flow && !this.reduced;
    if (flowing) {
      this.flowT += dt;
      this.paintFlow();
    }
    if (this.draw || flowing) this.raf = requestAnimationFrame(this.tick);
    else this.settle();
  }

  paintDraw() {
    const d = this.draw, P = this.p;
    for (const l of this.lines) {
      const raw = clamp((d.t - l.start) / l.dur, 0, 1);
      const p = this.ease(raw);
      l.reveal.setAttribute("stroke-dashoffset", (l.geo.len + 1) * (1 - p));
      for (const h of l.heads) {
        const at = h.first ? l.start : l.start + l.dur * 0.8;
        h.el.setAttribute("opacity", clamp((d.t - at) / 160, 0, 1));
      }
      if (P.dry) {
        // Wet accent ink settles to the line's own colour once the stroke has landed.
        const k = clamp((d.t - l.start - l.dur * 0.7) / P.dry, 0, 1);
        l.g.setAttribute("color", mix(this.accent, l.e.strokeColor, smooth(k)));
      }
      if (l.tip) {
        const on = raw > 0 && raw < 1;
        if (on) { const [x, y] = pointAt(l.fwd, l.geo.len * p); l.tip.setAttribute("cx", x); l.tip.setAttribute("cy", y); }
        l.tip.setAttribute("opacity", on ? 0.9 : 0);
      }
    }
    if (!d.revealed && d.t >= d.end) {
      d.revealed = true;
      d.onReveal?.();
      d.fadeAt = d.t;
      this.drawLayer.style.transition = "opacity 280ms cubic-bezier(0.16, 1, 0.3, 1)";
      requestAnimationFrame(() => { this.drawLayer.style.opacity = 0; });
    }
    if (d.revealed && d.t >= d.fadeAt + 320) {
      this.draw = null;
      d.onDone?.();
    }
  }

  paintFlow() {
    const mode = this.p.flow, sp = this.p.speed ?? 1;
    if (mode === "dots") {
      // A: one small accent dot drifts along each directed arrow, with long rests between trips.
      const SPEED = 55, REST = 1600;
      for (const l of this.lines) {
        if (!l.dot) continue;
        const travel = (l.geo.len / SPEED) * 1000 + 600;
        const cycle = travel + REST;
        const t = this.flowT + l.phase * cycle;
        const k = Math.floor(t / cycle);
        const u = (t % cycle) / travel;
        if (u >= 1) { l.dot.setAttribute("opacity", 0); continue; }
        const back = l.dir === 2 && k % 2 === 1;
        const s = smooth(u);
        const [x, y] = pointAt(l.fwd, (back ? 1 - s : s) * l.geo.len);
        l.dot.setAttribute("cx", x);
        l.dot.setAttribute("cy", y);
        l.dot.setAttribute("opacity", (0.9 * Math.min(1, u / 0.12, (1 - u) / 0.12)).toFixed(3));
      }
    } else if (mode === "relay") {
      // B: the request path lights up one hop at a time in the accent (same width), then rests.
      const groups = this.relayGroups ??= (() => {
        const m = new Map();
        for (const l of this.lines) if (l.fg) { const k = Math.floor(l.depth ?? 0); if (!m.has(k)) m.set(k, []); m.get(k).push(l); }
        return [...m.entries()].sort((a, b) => a[0] - b[0]).map((x) => x[1]);
      })();
      const HOP = 1100 / sp, HOLD = 500, REST = 1800;
      const cycle = groups.length * HOP + HOLD + REST;
      const t = this.flowT % cycle;
      groups.forEach((g, i) => {
        const u = (t - i * HOP) / HOP;
        for (const l of g) {
          const len = l.geo.len;
          if (u < 0 || t > groups.length * HOP + HOLD + 600) { l.fg.setAttribute("opacity", 0); continue; }
          const p = EASE.quint(clamp(u, 0, 1));
          l.freveal.setAttribute("stroke-dasharray", `${len + 1} ${len + 8}`);
          l.freveal.setAttribute("stroke-dashoffset", (len + 1) * (1 - p));
          // Fade the whole path out together after the last hop has landed.
          const out = clamp((t - (groups.length * HOP + HOLD)) / 600, 0, 1);
          l.fg.setAttribute("opacity", (1 - out).toFixed(3));
        }
      });
    } else {
      // C: a short marker dash glides along each directed arrow in sweep order, with rests.
      const SPEED = 70 * sp, REST = 1400, SEG = 36;
      for (const l of this.lines) {
        if (!l.fg) continue;
        const len = l.geo.len;
        const travel = ((len + SEG) / SPEED) * 1000;
        const cycle = travel + REST;
        const t = this.flowT + l.phase * cycle;
        const u = (t % cycle) / travel;
        if (u >= 1) { l.fg.setAttribute("opacity", 0); continue; }
        const k = Math.floor(t / cycle);
        const back = l.dir === 2 && k % 2 === 1;
        const s = smooth(u) * (len + SEG) - SEG;
        const pos = back ? len - s - SEG : s;
        l.freveal.setAttribute("stroke-dasharray", `${SEG} ${len * 2 + SEG}`);
        l.freveal.setAttribute("stroke-dashoffset", -pos);
        l.fg.setAttribute("opacity", Math.min(1, u / 0.1, (1 - u) / 0.1).toFixed(3));
      }
    }
  }
}
