// 076 Extract, transform, and load (ETL).
export const meta = {
  num: 76,
  slug: "etl",
  title: "Extract, transform, and load (ETL)",
  url: "https://learn.microsoft.com/azure/architecture/data-guide/relational-data/etl",
  category: "Databases",
  status: "done",
  otherDiagrams: ["Extract, load, transform (ELT)", "Data flow as a task within a control flow", "Push, transform, and load"],
  substitutions: { "Data source 1 (table)": "table", "Data source 2 / Target (database cylinder)": "sql-database", "Transformation engine": "gear" },
  differences: ["The generic table and database glyphs map to the table and sql-database sketch icons."],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow } = k;
  txt("title", 40, 10, "Extract, transform, and load (ETL)", { size: 30 });
  group("ext", 40, 90, 440, 700, "Extract", { fill: TINT.white, stroke: "#4dabf7", size: 24, align: "center" });
  card("ds1", 100, 170, 320, 250, "table", "Data source 1");
  card("ds2", 100, 480, 320, 250, "sql-database", "Data source 2");
  group("tr", 600, 90, 440, 700, "Transform", { fill: TINT.white, stroke: "#4dabf7", size: 24, align: "center" });
  card("eng", 660, 310, 320, 260, "gear", "Transformation\nengine");
  group("ld", 1160, 90, 440, 700, "Load", { fill: TINT.white, stroke: "#4dabf7", size: 24, align: "center" });
  card("tgt", 1220, 300, 320, 280, "sql-database", "Target", { fill: TINT.sub });
  arrow("e-t", "ext", "right", 440, "tr", "left", 440, [], { color: "#868e96" });
  arrow("t-l", "tr", "right", 440, "ld", "left", 440, [], { color: "#868e96" });
  txt("footer", 40, 840, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Extract, transform, and load (ETL)\"", { size: 20, color: "#495057" });
}
