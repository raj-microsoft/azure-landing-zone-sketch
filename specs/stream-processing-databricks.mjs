// 069 Stream processing with Azure Databricks.
export const meta = {
  num: 69,
  slug: "stream-processing-databricks",
  title: "Stream processing with Azure Databricks",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/data/stream-processing-databricks",
  category: "Analytics",
  status: "done",
  otherDiagrams: ["Stream processing with Azure Databricks and Event Hubs (detail)"],
  substitutions: { "Event Hubs": "event-hubs", "Azure Databricks": "azure-databricks", "Azure Cosmos DB": "azure-cosmos-db", "Analyze/Report (Fabric, Log Analytics)": "log-analytics-workspaces", "Azure Monitor": "monitor", "Dashboard": "dashboard" },
  differences: ["Data sources, Microsoft Fabric items and generic data analysis tools are plain sketch shapes."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, step } = k;
  txt("title", 40, 10, "Stream processing with Azure Databricks", { size: 30 });

  box("ds1", 60, 200, 360, 180, "Data source 1:\nFare data", { fill: TINT.mg, size: 20 });
  box("ds2", 60, 500, 360, 180, "Data source 2:\nTrip data", { fill: TINT.mg, size: 20 });

  group("ingest", 540, 90, 340, 720, "Ingest", { fill: TINT.white, size: 20, align: "center" });
  card("eh1", 590, 200, 240, 180, "event-hubs", "Event Hubs");
  card("eh2", 590, 500, 240, 180, "event-hubs", "Event Hubs");
  step("s1a", 450, 220, 1);
  step("s1b", 450, 520, 1);
  arrow("d1-e1", "ds1", "right", 290, "eh1", "left", 290);
  arrow("d2-e2", "ds2", "right", 590, "eh2", "left", 590);

  group("proc", 980, 90, 340, 720, "Process", { fill: TINT.white, size: 20, align: "center" });
  box("ds3", 1010, 150, 280, 130, "Data source 3:\nNeighborhood data", { fill: TINT.mg, size: 18 });
  card("adb", 1030, 360, 240, 200, "azure-databricks", "Azure\nDatabricks");
  arrow("d3-adb", "ds3", "bottom", 1150, "adb", "top", 1150);
  arrow("e1-adb", "eh1", "right", 290, "adb", "left", 440, [920]);
  arrow("e2-adb", "eh2", "right", 590, "adb", "left", 480, [940]);
  step("s2", 900, 200, 2);

  group("store", 1420, 90, 340, 720, "Store", { fill: TINT.white, size: 20, align: "center" });
  card("cos", 1470, 360, 240, 200, "azure-cosmos-db", "Azure\nCosmos DB");
  arrow("adb-cos", "adb", "right", 460, "cos", "left", 460);
  step("s3", 1330, 400, 3);

  group("ana", 1860, 90, 380, 720, "Analyze/Report", { fill: TINT.white, size: 20, align: "center" });
  box("fab", 1900, 160, 300, 110, "Microsoft Fabric\n(warehouse, lakehouse)", { fill: TINT.mg, size: 16 });
  card("la", 1900, 330, 300, 170, "log-analytics-workspaces", "Log Analytics", { size: 16 });
  box("tools", 1900, 560, 300, 170, "Data analysis and\nvisualization tools", { fill: TINT.mg, size: 18 });
  arrow("cos-ana", "cos", "right", 420, "la", "left", 420);
  step("s4", 1770, 360, 4);

  card("mon", 1030, 900, 240, 200, "monitor", "Azure Monitor");
  card("dash", 1450, 900, 240, 200, "dashboard", "Dashboard");
  arrow("adb-mon", "adb", "bottom", 1150, "mon", "top", 1150);
  step("s5", 1080, 650, 5);
  arrow("mon-dash", "mon", "right", 1000, "dash", "left", 1000);

  txt("footer", 40, 1180, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Stream processing with Azure Databricks\"", { size: 20, color: "#495057" });
}
