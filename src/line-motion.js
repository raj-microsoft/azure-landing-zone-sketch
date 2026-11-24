// Calm line motion for the sketch viewer.
// Excalidraw paints to canvas, so arrows are redrawn in a temporary SVG overlay that sits exactly on top
// of them (same scene coordinates, same scroll/zoom). The overlay is only on screen while something moves:
//   - draw-in: on open (and on Replay) each arrow is traced once like a pencil stroke, in reading order;
//     then the canvas arrows come back and the overlay fades out, so the settled image is Excalidraw's own.
//   - flow: when switched on, one small dot drifts along each directed arrow, slowly, with rests between trips.
// Nothing here touches scene data: the viewer hides canvas arrows with display-only opacity copies.

const NS = "http://www.w3.org/2000/svg";

export const isLinear = (e) => (e.type === "arrow" || e.type === "line") && !e.isDeleted && e.points?.length > 1;

// Excalidraw 0.18 arrowhead geometry (getArrowheadPoints / getArrowheadSize / getArrowheadAngle).
const HEAD_SIZE = { arrow: 25, diamond: 12, diamond_outline: 12, crowfoot_many: 20, crowfoot_one: 20, crowfoot_one_or_many: 20 };
const HEAD_ANGLE = { bar: 90, arrow: 20 };

const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

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
    c.setAttribute("fill", kind === "circle_outline" ? bg : e.strokeColor);
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
    p.setAttribute("fill", kind === "triangle_outline" ? bg : e.strokeColor);
  } else {
    p.setAttribute("d", `M${p3[0]} ${p3[1]}L${tip[0]} ${tip[1]}L${p4[0]} ${p4[1]}`);
    p.setAttribute("fill", "none");
  }
  return p;
}

// Reading order: rows of roughly one box height, then left to right, keyed on where each line starts.
function readingOrder(lines) {
  return lines.sort((a, b) => {
    const ra = Math.round(a.geo.pts[0][1] / 140), rb = Math.round(b.geo.pts[0][1] / 140);
    return ra - rb || a.geo.pts[0][0] - b.geo.pts[0][0];
  });
}

export class LineMotion {
  constructor(svg, { background = "#fdfdfb" } = {}) {
    this.svg = svg;
    this.bg = background;
    this.view = document.createElementNS(NS, "g");
    this.drawLayer = document.createElementNS(NS, "g");
    this.dotLayer = document.createElementNS(NS, "g");
    this.view.append(this.drawLayer, this.dotLayer);
    svg.replaceChildren(this.view);
    this.lines = [];
    this.draw = null; // { t, end, onReveal, onDone, fading }
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
    this.sizeDots();
  }

  // Rebuild from the live scene (after edits the geometry may differ).
  build(elements) {
    this.drawLayer.replaceChildren();
    this.dotLayer.replaceChildren();
    const lines = elements.filter(isLinear).map((e) => ({ e, geo: polyline(e) })).filter((l) => l.geo.len > 0);
    this.lines = readingOrder(lines);
    this.lines.forEach((l, i) => {
      const { e, geo } = l;
      const d = "M" + geo.pts.map((p) => `${p[0]} ${p[1]}`).join("L");
      const g = document.createElementNS(NS, "g");
      g.setAttribute("stroke", e.strokeColor);
      g.setAttribute("stroke-width", e.strokeWidth);
      g.setAttribute("stroke-linecap", "round");
      g.setAttribute("stroke-linejoin", "round");
      g.setAttribute("fill", "none");
      if (e.opacity !== 100) g.setAttribute("opacity", e.opacity / 100);
      // The stroke itself (dashed like Excalidraw: [8, 8 + strokeWidth]) revealed through a growing mask.
      const mask = document.createElementNS(NS, "mask");
      const id = `lm-${i}`;
      mask.setAttribute("id", id);
      mask.setAttribute("maskUnits", "userSpaceOnUse");
      for (const [k, v] of [["x", -1e5], ["y", -1e5], ["width", 2e5], ["height", 2e5]]) mask.setAttribute(k, v);
      const reveal = document.createElementNS(NS, "path");
      reveal.setAttribute("d", d);
      reveal.setAttribute("stroke", "#fff");
      reveal.setAttribute("stroke-width", e.strokeWidth + 4);
      reveal.setAttribute("stroke-dasharray", `${geo.len + 1} ${geo.len + 8}`);
      reveal.setAttribute("stroke-dashoffset", geo.len + 1);
      mask.append(reveal);
      const stroke = document.createElementNS(NS, "path");
      stroke.setAttribute("d", d);
      stroke.setAttribute("mask", `url(#${id})`);
      if (e.strokeStyle === "dashed") stroke.setAttribute("stroke-dasharray", `8 ${8 + e.strokeWidth}`);
      else if (e.strokeStyle === "dotted") stroke.setAttribute("stroke-dasharray", `1.5 ${6 + e.strokeWidth}`);
      g.append(mask, stroke);
      const heads = [];
      if (e.type === "arrow") {
        for (const pos of ["start", "end"]) {
          const kind = pos === "start" ? e.startArrowhead : e.endArrowhead;
          if (!kind) continue;
          const h = head(e, geo.pts, pos, kind, this.bg);
          if (!h) continue;
          h.setAttribute("opacity", 0);
          g.append(h);
          heads.push({ el: h, pos });
        }
      }
      this.drawLayer.append(g);
      l.g = g;
      l.reveal = reveal;
      l.heads = heads;
      // Flow: only lines with a direction get a dot; two-headed arrows alternate direction per trip.
      l.dir = e.type !== "arrow" ? 0 : e.startArrowhead && e.endArrowhead ? 2 : e.endArrowhead ? 1 : e.startArrowhead ? -1 : 0;
      if (l.dir) {
        const dot = document.createElementNS(NS, "circle");
        dot.setAttribute("fill", e.strokeColor);
        dot.setAttribute("opacity", 0);
        this.dotLayer.append(dot);
        l.dot = dot;
        l.phase = (i * 0.61803) % 1;
      }
    });
    this.sizeDots();
  }

  sizeDots() {
    const z = this.zoom || 1;
    // Keep motion readable when a big diagram is fitted small (phones zoom to ~0.15):
    // the overlay pencil stroke is at least ~2.5 screen px and dots at least ~5 screen px.
    const r = Math.max(3.5, 3 / z);
    for (const l of this.lines) l.dot?.setAttribute("r", r);
  }

  // Draw every line in reading order over ~2.4 s. onReveal: canvas arrows should come back now.
  drawIn({ onReveal, onDone } = {}) {
    this.finishDraw(false);
    const n = this.lines.length;
    if (!n) { onReveal?.(); onDone?.(); return; }
    const span = Math.min(2600, 110 * n + 600);
    let end = 0;
    this.lines.forEach((l, i) => {
      l.start = 500 + (n > 1 ? (i / (n - 1)) * span : 0);
      l.dur = clamp(500 + l.geo.len * 0.6, 700, 1300);
      end = Math.max(end, l.start + l.dur + 160);
    });
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
    if (!on) for (const l of this.lines) l.dot?.setAttribute("opacity", 0);
    this.svg.dataset.flow = on ? "on" : "off";
    if (on) this.wake();
    else this.settle();
  }

  settle() {
    if (!this.draw && !this.flow) {
      this.halt();
      this.svg.dataset.motion = "still";
    }
  }

  wake() {
    if (this.raf || document.hidden || (!this.draw && !this.flow)) return;
    this.last = 0;
    this.raf = requestAnimationFrame(this.tick);
  }

  halt() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  tick(now) {
    this.raf = 0;
    const dt = this.last ? Math.min(250, now - this.last) : 16; // follows wall-clock time on slow frames; hidden tabs pause via visibilitychange
    this.last = now;
    if (this.draw) {
      this.draw.t += dt;
      this.paintDraw();
    }
    if (this.flow) {
      this.flowT += dt;
      this.paintFlow();
    }
    if (this.draw || this.flow) this.raf = requestAnimationFrame(this.tick);
    else this.settle();
  }

  paintDraw() {
    const d = this.draw;
    for (const l of this.lines) {
      const p = easeOut(clamp((d.t - l.start) / l.dur, 0, 1));
      l.reveal.setAttribute("stroke-dashoffset", (l.geo.len + 1) * (1 - p));
      for (const h of l.heads) {
        // Start heads appear as the pencil sets down, end heads once the stroke arrives.
        const at = h.pos === "start" ? l.start : l.start + l.dur * 0.8;
        h.el.setAttribute("opacity", clamp((d.t - at) / 160, 0, 1));
      }
    }
    if (!d.revealed && d.t >= d.end) {
      // Hand back to Excalidraw's own rough arrows, then let the overlay fade away.
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
    const SPEED = 55; // scene px per second: slow and even
    const REST = 1400; // ms pause at the end of each trip
    for (const l of this.lines) {
      if (!l.dot) continue;
      const travel = (l.geo.len / SPEED) * 1000 + 600;
      const cycle = travel + REST;
      const t = this.flowT + l.phase * cycle;
      const k = Math.floor(t / cycle);
      const u = (t % cycle) / travel;
      if (u >= 1) { l.dot.setAttribute("opacity", 0); continue; }
      const forward = l.dir === 1 || (l.dir === 2 && k % 2 === 0);
      const s = (u * u * (3 - 2 * u)); // gentle start and stop along the line
      const [x, y] = pointAt(l.geo, (forward ? s : 1 - s) * l.geo.len);
      l.dot.setAttribute("cx", x);
      l.dot.setAttribute("cy", y);
      const fade = Math.min(1, u / 0.12, (1 - u) / 0.12);
      l.dot.setAttribute("opacity", (0.85 * fade).toFixed(3));
    }
  }
}
