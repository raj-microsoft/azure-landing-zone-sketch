// 147 Minimize coordination.
export const meta = {
  num: 147,
  slug: "minimize-coordination",
  title: "Minimize coordination",
  url: "https://learn.microsoft.com/azure/architecture/guide/design-principles/minimize-coordination",
  category: "Design principles",
  status: "done",
  otherDiagrams: ["img1: coordination between two workers to process orders exactly once"],
  substitutions: { "Node 1 / Node 2": "virtual-machine", "SQL database": "sql-database" },
  differences: ["Lock glyphs on locked rows drawn as text labels '(locked)'; Node 1 diagonal arrow drawn orthogonally."],
};

export function draw(k) {
  const { TINT, txt, card, box, arrow } = k;
  const S = 18;
  card("n1", 20, 40, 180, 140, "virtual-machine", "Node 1", { size: S });
  card("n2", 20, 380, 180, 140, "virtual-machine", "Node 2", { size: S });
  box("ord", 560, 160, 300, 70, "Orders", { fill: TINT.white, size: S });
  box("ordr", 560, 230, 300, 60, "locked row", { fill: TINT.warn, size: S });
  box("oi", 560, 400, 300, 70, "OrderItems", { fill: TINT.white, size: S });
  box("oir", 560, 470, 300, 60, "locked row", { fill: TINT.warn, size: S });
  txt("l1", 880, 245, "(locked)", { size: S });
  txt("l2", 880, 485, "(locked)", { size: S });
  card("sql", 1000, 300, 180, 140, "sql-database", "SQL database", { size: S });
  arrow("u1", "n1", "right", 110, "ordr", "left", 260, [380], {});
  txt("u1-l", 230, 60, "Update", { size: S });
  arrow("u2", "n2", "right", 500, "oir", "left", 500, [], {});
  txt("u2-l", 300, 450, "Update", { size: S });
  txt("blk", 290, 530, "(blocked)", { size: S });
  arrow("rel", "ordr", "bottom", 710, "oi", "top", 710, [], { head: null });
  txt("footer", 20, 620, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Node 2 waiting for Node 1 to release a database lock\"", { size: 20, color: "#495057" });
}
