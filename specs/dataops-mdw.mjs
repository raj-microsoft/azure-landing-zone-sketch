// 015 DataOps for a modern data warehouse (medallion architecture in Microsoft Fabric). Redraw of the article's diagram.
export const meta = {
  num: 15,
  slug: "dataops-mdw",
  title: "DataOps for the modern data warehouse",
  url: "https://learn.microsoft.com/azure/architecture/databases/architecture/dataops-mdw",
  category: "Databases + analytics",
  status: "done",
  otherDiagrams: [],
  substitutions: {
    "Operational DBs": "sql-database", "Blobs": "blob-block", "Mirroring": "data-shares", "Pipelines / Fabric Data Factory": "data-factories",
    "Warehouse / notebook (bronze, silver, gold)": "sql-data-warehouses", "OneLake": "data-lake-storage-gen1", "Power BI": "power-bi-embedded",
  },
  differences: [
    "Fabric item icons (warehouse, notebook, mirroring) have no sketch icon; Azure equivalents are used and recorded.",
    "Hexagon shapes for other sources and consumers are drawn as rounded boxes.",
  ],
};

export function draw(k) {
  const { TINT, txt, zone, box, card, arrow } = k;
  const T = "#20c997";
  const t = (id, f, fs, fa, to, ts, ta, lanes = [], o = {}) => arrow(id, f, fs, fa, to, ts, ta, lanes, { color: T, ...o });
  txt("title", 60, 10, "DataOps: medallion architecture in Microsoft Fabric", { size: 30 });

  zone("src", 60, 240, 260, 460, TINT.mg);
  card("opdb", 80, 270, 220, 170, "sql-database", "Operational DBs");
  card("blobs", 80, 500, 220, 170, "blob-block", "Blobs");
  box("other-src", 60, 800, 260, 140, "Other data\nsources", { fill: TINT.mg, size: 20 });

  zone("fab", 400, 260, 1700, 720, TINT.white, { stroke: "#ced4da" });
  card("mirror", 460, 340, 200, 170, "data-shares", "Mirroring", { fill: TINT.app, stroke: T });
  card("pipes", 460, 560, 200, 170, "data-factories", "Pipelines", { fill: TINT.app, stroke: T });
  txt("p1-t", 880, 290, "Process", { size: 20, align: "center" });
  card("b2s", 760, 330, 240, 140, "sql-data-warehouses", "Bronze to silver", { fill: TINT.app, stroke: T });
  txt("p2-t", 1500, 290, "Process", { size: 20, align: "center" });
  card("s2g", 1380, 330, 240, 140, "sql-data-warehouses", "Silver to gold", { fill: TINT.app, stroke: T });
  zone("wh", 740, 540, 1060, 260, "transparent", { dashed: true, stroke: "#adb5bd" });
  card("bronze", 760, 560, 300, 220, "sql-data-warehouses", "Bronze (warehouse)\nRaw data, separate\nschema/warehouse");
  card("silver", 1100, 560, 300, 220, "sql-data-warehouses", "Silver (warehouse)\nTypically cleansed,\nhistorized, and enriched");
  card("gold", 1440, 560, 300, 220, "sql-data-warehouses", "Gold (warehouse)\nConsumption-\nready data");
  card("pbi", 1880, 520, 200, 200, "power-bi-embedded", "Power BI", { fill: TINT.mg });
  zone("orch", 440, 840, 1620, 110, TINT.app, { stroke: "#ced4da" });
  box("orch-df", 470, 855, 560, 80, "Orchestrate by using Fabric Data Factory", { size: 20, iconLeft: "data-factories" });
  box("onelake", 1100, 855, 300, 80, "OneLake", { size: 20, iconLeft: "data-lake-storage-gen1" });
  box("other-con", 1700, 80, 280, 120, "Other data\nconsumers", { fill: TINT.mg, size: 20 });

  t("f-op", "src", "right", 400, "mirror", "left", 400, [360]);
  t("f-bl", "src", "right", 640, "pipes", "left", 640);
  t("f-ot", "other-src", "right", 870, "pipes", "left", 680, [380]);
  t("f-mir", "mirror", "right", 425, "bronze", "left", 600, [720]);
  t("f-pip", "pipes", "right", 700, "bronze", "left", 700);
  t("f-bb", "bronze", "top", 880, "b2s", "bottom", 880);
  t("f-bs", "b2s", "right", 400, "silver", "top", 1250, [1250]);
  t("f-ss", "silver", "top", 1350, "s2g", "left", 400, [], { firstDir: "v" });
  t("f-sg", "s2g", "bottom", 1500, "gold", "top", 1500);
  t("f-pbi", "gold", "right", 620, "pbi", "left", 620);
  arrow("f-con", "wh", "top", 1780, "other-con", "bottom", 1780, [], { dashed: true, color: "#adb5bd" });

  txt("footer", 60, 1010, "Pencil-sketch redraw of the Azure Architecture Center diagram \"DataOps for the modern data warehouse\"", { size: 20, color: "#495057" });
}
