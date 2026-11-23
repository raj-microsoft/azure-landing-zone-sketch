// 064 Modern data warehouses for small or medium-sized businesses.
export const meta = {
  num: 64,
  slug: "small-medium-data-warehouse",
  title: "Modern data warehouses for small or medium-sized businesses",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/data/small-medium-data-warehouse",
  category: "Analytics",
  status: "done",
  otherDiagrams: ["Expanded architecture for future needs"],
  substitutions: { "Data pipeline": "data-factories", "SQL Database or SQL Managed Instance": "sql-database", "Users / Power BI": "power-bi-embedded" },
  differences: ["Legacy data warehousing solution and Microsoft Fabric are plain sketch shapes (no sketch icon).", "The mirroring link glyph between the zones is drawn as a labelled connector."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, line } = k;
  txt("title", 40, 10, "Modern data warehouses for small or medium-sized businesses", { size: 30 });

  box("legacy", 60, 200, 300, 200, "Legacy data\nwarehousing solution", { fill: TINT.mg, size: 18 });
  card("pipe", 470, 220, 200, 160, "data-factories", "Data pipeline");
  arrow("l-p", "legacy", "right", 300, "pipe", "left", 300);

  group("store", 790, 130, 420, 340, null, { fill: TINT.white, dashed: true, stroke: "#1971c2" });
  card("sql", 830, 170, 340, 260, "sql-database", "SQL Database or SQL\nManaged Instance");
  txt("store-lbl", 880, 490, "Store and process", { size: 20 });
  arrow("p-s", "pipe", "right", 300, "store", "left", 300);

  group("proc", 1400, 130, 420, 340, null, { fill: TINT.white, dashed: true, stroke: "#1971c2" });
  box("fabric", 1440, 170, 340, 260, "Microsoft Fabric", { fill: TINT.mg, size: 20 });
  txt("proc-lbl", 1480, 490, "Process and present", { size: 20 });
  line("s-f", "store", "right", 300, "proc", "left", 300, [], { dashed: true });
  txt("mir-lbl", 1230, 250, "Mirroring", { size: 16 });

  card("users", 2000, 200, 260, 200, "power-bi-embedded", "Users\nPower BI");
  arrow("f-u", "proc", "right", 300, "users", "left", 300);

  txt("footer", 40, 600, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Modern data warehouses for small or medium-sized businesses\"", { size: 20, color: "#495057" });
}
