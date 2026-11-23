// 060 Greenfield lakehouse on Microsoft Fabric.
export const meta = {
  num: 60,
  slug: "greenfield-lakehouse-fabric",
  title: "Greenfield lakehouse on Microsoft Fabric",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/data/greenfield-lakehouse-fabric",
  category: "Analytics",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Data Factory": "data-factories", "Real-Time dashboards": "dashboard", "Power BI": "power-bi-embedded", "Custom API": "api-connections", "SQL endpoint": "sql-database", "Notebooks (consume)": "code" },
  differences: ["Fabric items (Fabric/Premium capacity, Eventstream, Eventhouse, Activator, lakehouses, Notebook, Dataflow, OneLake), Microsoft Purview, Microsoft 365 and Power Automate are plain sketch shapes (no sketch icons).", "Source-type glyphs and the source bracket line are omitted; the source labels sit in a dashed zone."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, step } = k;
  txt("title", 40, 10, "Greenfield lakehouse on Microsoft Fabric", { size: 30 });

  group("strm", 40, 230, 300, 140, null, { fill: TINT.white, dashed: true });
  txt("src-stream", 60, 245, "Stream\nIoT devices, sensors,\ngadgets (loosely typed)", { size: 18 });
  group("batchsrc", 40, 600, 300, 760, null, { fill: TINT.white, dashed: true });
  txt("src-b", 60, 630, "Not structured\n.pdf, .docx, .jpeg, etc. -\nknowledge mining, etc.\n\nSemistructured\nCSV, logs, JSON, XML\n(loosely typed)\n\nRelational databases\n(strongly typed,\nstructured)", { size: 18 });

  group("fab", 440, 60, 1500, 1520, null, { fill: "#f8f9fa" });
  group("cap", 480, 80, 1300, 90, null, { fill: TINT.mg });
  box("fc", 500, 92, 260, 66, "Fabric capacity", { size: 18 });
  txt("or1", 790, 110, "or", { size: 18 });
  box("pc", 850, 92, 300, 66, "Premium capacity", { size: 18 });
  txt("or2", 1180, 110, "or", { size: 18 });
  box("ppu", 1240, 92, 300, 66, "Premium per user", { size: 18 });

  txt("rt-lbl", 900, 210, "Real-time dashboards - Stream processing", { size: 20 });
  group("rt", 700, 250, 1080, 520, null, { fill: TINT.mg });
  step("s3", 500, 250, 3);
  box("es", 740, 280, 220, 100, "Eventstream", { size: 18 });
  box("eh", 1040, 440, 220, 100, "Eventhouse", { size: 18 });
  box("act", 1420, 280, 220, 100, "Activator", { size: 18 });
  card("rtd", 1420, 580, 260, 150, "dashboard", "Real-Time dashboards");
  step("s4", 720, 640, 4);

  txt("b-lbl", 1060, 800, "Batch processing", { size: 20 });
  group("bp", 700, 850, 1080, 520, null, { fill: TINT.mg });
  box("bronze", 740, 900, 200, 110, "Bronze\nlakehouse", { size: 18 });
  box("silver", 1130, 900, 200, 110, "Silver\nlakehouse", { size: 18 });
  box("gold", 1530, 900, 200, 110, "Gold\nlakehouse", { size: 18 });
  box("nb1", 900, 1100, 200, 110, "Notebook\nDataflow", { size: 18 });
  box("nb2", 1310, 1100, 200, 110, "Notebook\nDataflow", { size: 18 });
  step("s2", 740, 1260, 2);
  card("adf", 470, 1070, 200, 150, "data-factories", "Data Factory");
  step("s1", 520, 960, 1);

  group("gov", 700, 1420, 1080, 120, null, { fill: TINT.badge });
  box("ol", 820, 1440, 240, 80, "OneLake", { size: 18 });
  box("pv", 1300, 1440, 300, 80, "Microsoft Purview", { size: 18 });

  txt("cs-lbl", 2080, 60, "Consume/Serve", { size: 22 });
  group("cs", 2060, 110, 300, 1460, null, { fill: TINT.white, stroke: "#1971c2" });
  box("m365", 2100, 140, 220, 110, "Microsoft 365", { size: 18 });
  box("pa", 2100, 330, 220, 110, "Power\nAutomate", { size: 18 });
  card("api", 2100, 520, 220, 160, "api-connections", "Custom API");
  card("pbi", 2100, 760, 220, 160, "power-bi-embedded", "Power BI");
  card("sqle", 2100, 1000, 220, 160, "sql-database", "SQL endpoint");
  card("nbs", 2100, 1240, 220, 160, "code", "Notebooks");
  step("s5", 1980, 900, 5);

  arrow("st-in", "strm", "right", 300, "rt", "left", 300);
  arrow("es-act", "es", "right", 310, "act", "left", 310, [], { color: "#868e96" });
  arrow("es-eh", "es", "bottom", 800, "eh", "left", 490, [490], { color: "#868e96" });
  arrow("eh-act", "eh", "right", 490, "act", "bottom", 1530, [1530], { color: "#868e96" });
  arrow("es-br", "es", "bottom", 900, "bronze", "top", 900, [], { dashed: true, color: "#1971c2" });
  arrow("b-in", "batchsrc", "right", 960, "bp", "left", 960);
  arrow("br-nb1", "bronze", "bottom", 840, "nb1", "left", 1155, [1155]);
  arrow("nb1-sv", "nb1", "right", 1155, "silver", "bottom", 1230, [1230]);
  arrow("sv-nb2", "silver", "bottom", 1180, "nb2", "left", 1180, [1180]);
  arrow("nb2-gd", "nb2", "right", 1180, "gold", "bottom", 1630, [1630]);
  arrow("rt-cs", "rt", "right", 330, "cs", "left", 880, [1880]);
  arrow("bp-cs", "bp", "right", 1250, "cs", "left", 900, [1900]);

  txt("footer", 40, 1640, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Greenfield lakehouse on Microsoft Fabric\"", { size: 20, color: "#495057" });
}
