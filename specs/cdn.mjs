// 145 CDN guidance.
export const meta = {
  num: 145,
  slug: "cdn",
  title: "CDN guidance",
  url: "https://learn.microsoft.com/azure/architecture/best-practices/cdn",
  category: "Best practices",
  status: "done",
  otherDiagrams: [],
  substitutions: { "CDN": "cdn-profiles" },
  differences: ["Clients, Origin and the cached IMG triangles drawn as labelled sketch shapes; the CDN box carries the cdn-profiles icon.", "The two client lines that merge into one trunk are drawn as separate parallel arrows."],
};

export function draw(k) {
  const { TINT, txt, box, card, arrow } = k;
  const S = 18;
  box("c1", 20, 20, 160, 70, "Client", { fill: TINT.sub, size: S });
  box("c2", 20, 220, 160, 70, "Client", { fill: TINT.sub, size: S });
  box("org", 900, 120, 460, 260, "Origin\n\n(IMG)", { fill: TINT.sub, size: S });
  card("cdn", 320, 420, 220, 120, "cdn-profiles", "CDN (IMG cached)", { size: S });
  arrow("a1", "c1", "right", 55, "org", "left", 250, [240], {});
  arrow("a2", "c2", "right", 270, "org", "left", 270, [], {});
  txt("l120", 600, 220, "120ms", { size: S });
  arrow("a3", "c2", "bottom", 140, "cdn", "left", 480, [], {});
  txt("l40", 160, 360, "40ms", { size: S });
  arrow("a4", "cdn", "right", 480, "org", "bottom", 1000, [], { color: "#e8590c", head: null });
  txt("footer", 20, 600, "Pencil-sketch redraw of the Azure Architecture Center diagram \"CDN\"", { size: 20, color: "#495057" });
}
