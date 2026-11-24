// Three design directions for the sketch viewer (design/explore branch). Pick with ?look=a|b|c.
// A look only changes display colour, paper, chrome and motion. It never changes structure, labels,
// positions or stroke widths, and exports/saved edits always get the scene's own colours back.

// Scenes carry no semantic role per group, so roles follow the tint family the scene already uses
// (which mirrors the hue hints in Microsoft's originals): gray = platform, blue = network,
// green = workload, violet/red = security, cyan = data, yellow = management/notes, orange = external.
const FAMILY_BY_BG = {
  "#ffffff": "card",
  "#f8f9fa": "platform", "#f1f3f5": "platform", "#e9ecef": "platform",
  "#e7f5ff": "network", "#d0ebff": "network", "#a5d8ff": "network",
  "#ebfbee": "workload", "#d3f9d8": "workload",
  "#b2f2bb": "step",
  "#f3f0ff": "security", "#e5dbff": "security", "#fff5f5": "alert", "#ffc9c9": "alert",
  "#e3fafc": "data", "#c5f6fa": "data", "#e6fcf5": "data",
  "#fff9db": "note", "#fff3bf": "note",
  "#fff4e6": "external", "#ffe8cc": "external", "#ffd8a8": "external",
};
const FAMILY_BY_STROKE = {
  "#1971c2": "network", "#1c7ed6": "network", "#74c0fc": "network",
  "#2b8a3e": "workload", "#2f9e44": "workload",
  "#7048e8": "security", "#6741d9": "security",
  "#e03131": "alert", "#c92a2a": "alert",
  "#0c8599": "data", "#20c997": "data",
  "#f08c00": "note", "#e67700": "note",
  "#e8590c": "external",
};

export const LOOKS = {
  a: {
    id: "a",
    name: "Pencil",
    note: "Today's sketch, refined: same colours, calmer timing, accent Flow dots.",
    paper: "#fdfdfb",
    ink: "#1e1e1e", muted: "#495057", line: "#343a40", zoneInk: "#4a6b8a",
    accent: "#1971c2",
    fill: null, // keep the scene's own fills
    stroke: null,
    motion: { order: "reading", wash: null, flow: "dots", speed: null },
  },
  b: {
    id: "b",
    name: "Folio",
    note: "Editorial and premium: warm paper, quiet slate ink, desaturated washes, Fluent blue accent.",
    paper: "#f7f4ee",
    ink: "#1c2733", muted: "#4d5966", line: "#3b4754", zoneInk: "#6a7a88",
    accent: "#0f6cbd",
    fill: {
      card: "#fffefb", platform: "#efebe3", network: "#e3ecf5", workload: "#e4efe6", step: "#d3e7d9",
      security: "#ece9f5", alert: "#f6e6e4", data: "#e1eff1", note: "#f6eed6", external: "#f5e9de",
    },
    stroke: {
      network: "#3f6d96", workload: "#3b7a50", step: "#2f6b45", security: "#5f5394", alert: "#a23b32",
      data: "#2f7480", note: "#86691c", external: "#9a5b2e",
    },
    motion: { order: "graph", wash: "down", flow: "relay", speed: 0.9 },
  },
  c: {
    id: "c",
    name: "Sketchnote",
    note: "Whiteboard sketchnote: bright marker washes, warm white board, orange marker accent.",
    paper: "#fffdf6",
    ink: "#262626", muted: "#4a4a4a", line: "#3d3d3d", zoneInk: "#6a6156",
    accent: "#d9480f",
    fill: {
      card: "#ffffff", platform: "#efede6", network: "#d8ebff", workload: "#d6f5dd", step: "#ffe066",
      security: "#e7defe", alert: "#ffdcdc", data: "#cff3f3", note: "#fff1a8", external: "#ffe4c9",
    },
    stroke: {
      network: "#1c6fc0", workload: "#2b8a3e", step: "#9c7400", security: "#6741d9", alert: "#c92a2a",
      data: "#0b7285", note: "#9c7400", external: "#c2410c",
    },
    motion: { order: "sweep", wash: "right", flow: "wave", speed: 1.2 },
  },
};

export function getLook() {
  const q = new URLSearchParams(location.search).get("look");
  return LOOKS[q] ?? LOOKS.a;
}

const lc = (c) => (typeof c === "string" ? c.toLowerCase() : c);

function themeOne(e, look) {
  if (look.id === "a") return null;
  const bg = lc(e.backgroundColor), sc = lc(e.strokeColor);
  let strokeColor = e.strokeColor, backgroundColor = e.backgroundColor;
  const fam = FAMILY_BY_BG[bg];
  if (fam && look.fill[fam]) backgroundColor = look.fill[fam];
  if (e.type === "text") {
    if (sc === "#1e1e1e") strokeColor = look.ink;
    else if (sc === "#495057" || sc === "#343a40") strokeColor = look.muted;
    else if (FAMILY_BY_STROKE[sc]) strokeColor = look.stroke[FAMILY_BY_STROKE[sc]] ?? strokeColor;
  } else if (e.type === "arrow" || e.type === "line") {
    if (sc === "#343a40" || sc === "#1e1e1e" || sc === "#495057") strokeColor = look.line;
    else if (FAMILY_BY_STROKE[sc]) strokeColor = look.stroke[FAMILY_BY_STROKE[sc]] ?? strokeColor;
  } else if (e.type !== "image") {
    const sFam = FAMILY_BY_STROKE[sc];
    if (sc === "#4a6b8a") strokeColor = fam && look.stroke[fam] ? look.stroke[fam] : look.zoneInk;
    else if (sc === "#1e1e1e") strokeColor = look.ink;
    else if (sc === "#343a40" || sc === "#495057") strokeColor = look.muted;
    else if (sFam) strokeColor = look.stroke[sFam] ?? strokeColor;
  }
  if (strokeColor === e.strokeColor && backgroundColor === e.backgroundColor) return null;
  return { strokeColor, backgroundColor };
}

// Returns display copies plus a map that lets exports and saved edits get the scene's own colours back.
export function themeElements(elements, look, map = new Map()) {
  const out = elements.map((e) => {
    const t = themeOne(e, look);
    if (!t) return e;
    map.set(e.id, { o: { strokeColor: e.strokeColor, backgroundColor: e.backgroundColor }, t });
    return { ...e, ...t };
  });
  return { elements: out, map };
}

// Only colours still equal to the themed value are restored, so colours a person edited are kept.
export function untheme(elements, map) {
  return elements.map((e) => {
    const m = map.get(e.id);
    if (!m) return e;
    const r = {};
    if (e.strokeColor === m.t.strokeColor) r.strokeColor = m.o.strokeColor;
    if (e.backgroundColor === m.t.backgroundColor) r.backgroundColor = m.o.backgroundColor;
    return Object.keys(r).length ? { ...e, ...r } : e;
  });
}
