// 067 Analytics end-to-end with Microsoft Fabric.
export const meta = {
  num: 67,
  slug: "data-platform-end-to-end",
  title: "Analytics end-to-end with Microsoft Fabric",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/dataplate2e/data-platform-end-to-end",
  category: "Analytics",
  status: "done",
  otherDiagrams: [],
  substitutions: { "IoT Hub": "iot-hub", "Azure Event Hubs": "event-hubs", "Azure Data Explorer": "azure-data-explorer-clusters", "Azure Databricks": "azure-databricks", "Azure SQL Database": "sql-database", "Azure Cosmos DB": "azure-cosmos-db", "Azure Database for PostgreSQL": "azure-database-postgresql-server", "Machine Learning": "azure-machine-learning", "Microsoft Foundry": "ai-foundry", "Power BI": "power-bi-embedded", "Microsoft Entra ID": "entra-connect", "Cost Management": "cost-management", "Azure Key Vault": "key-vaults", "Azure DevOps": "azure-devops", "Azure Policy": "policy", "Data Lake Storage": "data-lake-storage-gen1", "Blob storage": "blob-block" },
  differences: ["Fabric items (Lakehouse, Data Warehouse, SQL database, Eventhouse, mirrored database, Real-Time Intelligence, data agent, GraphQL API, SQL analytics endpoint), Copilot, OneLake, Purview and all non-Azure sources and shortcuts (AWS, Google Cloud, Kafka, Snowflake, Dataverse, Amazon S3, GitHub) are plain sketch shapes.", "Ingest and process tool glyphs (Notebook, Data Factory, Eventstream, Stored procedure, Dataflow Gen2) are text labels.", "The dense web of Serve-layer connectors is simplified to one arrow per item."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow } = k;
  txt("title", 40, 10, "Analytics end-to-end with Microsoft Fabric", { size: 30 });

  const item = (id, x, y, label, ic) => ic ? box(id, x, y, 190, 75, label, { iconLeft: ic, size: 16 }) : box(id, x, y, 190, 75, label, { fill: TINT.mg, size: 16 });

  group("dsrc", 40, 330, 420, 240, "Data source", { fill: TINT.white, dashed: true, stroke: "#1971c2", align: "center" });
  item("onp", 55, 380, "On-premises\ndatacenter"); item("ssd", 255, 380, "Structured and\nsemistructured data");
  item("aws", 55, 475, "Amazon Web\nServices"); item("gcp", 255, 475, "Google Cloud");

  group("strm", 40, 610, 420, 410, "Streaming data", { fill: TINT.white, dashed: true, stroke: "#1971c2", align: "center" });
  item("ioth", 55, 655, "IoT Hub", "iot-hub"); item("kin", 255, 655, "AWS Kinesis");
  item("dbs", 55, 745, "Databases"); item("eh", 255, 745, "Azure Event\nHubs", "event-hubs");
  item("ade", 55, 835, "Azure Data\nExplorer", "azure-data-explorer-clusters"); item("pubsub", 255, 835, "Google Cloud\nPub/Sub");
  item("kafka", 55, 925, "Kafka");

  group("mirg", 40, 1060, 420, 330, "Mirroring", { fill: TINT.white, dashed: true, stroke: "#1971c2", align: "center" });
  item("adb", 55, 1105, "Azure\nDatabricks", "azure-databricks"); item("asql", 255, 1105, "Azure SQL\nDatabase", "sql-database");
  item("cosmos", 55, 1195, "Azure\nCosmos DB", "azure-cosmos-db"); item("pg", 255, 1195, "Azure Database\nfor PostgreSQL", "azure-database-postgresql-server");
  item("snow", 55, 1285, "Snowflake");

  group("tenant", 700, 190, 1630, 1410, "Provider tenant", { fill: TINT.white, dashed: true, stroke: "#7048e8" });
  txt("ingest-lbl", 520, 300, "Ingest", { size: 20 });

  txt("store-lbl", 810, 320, "Store", { size: 20 });
  group("store", 720, 360, 260, 700, null, { fill: TINT.mg, dashed: true, stroke: "#1971c2" });
  box("slh", 740, 390, 220, 80, "Lakehouse", { fill: TINT.white, size: 18 });
  group("sdw", 740, 510, 220, 240, null, { fill: TINT.white, dashed: true, stroke: "#1971c2" });
  box("sdw1", 755, 525, 190, 80, "Data Warehouse", { fill: TINT.white, size: 16 });
  box("sdw2", 755, 640, 190, 90, "SQL database\nin Fabric", { fill: TINT.white, size: 16 });
  box("seh", 740, 800, 220, 90, "Eventhouse", { fill: TINT.white, size: 18 });
  box("smir", 740, 950, 220, 90, "Mirrored\ndatabase", { fill: TINT.white, size: 18 });

  txt("nb-lbl", 480, 390, "Notebook", { size: 16 });
  arrow("ds-slh", "dsrc", "right", 430, "slh", "left", 430);
  txt("df-lbl", 480, 600, "Data Factory", { size: 16 });
  arrow("st-sdw", "strm", "right", 640, "sdw", "left", 640);
  txt("es-lbl", 480, 810, "Eventstream", { size: 16 });
  arrow("st-seh", "strm", "right", 845, "seh", "left", 845);
  txt("mir-lbl", 480, 1320, "Mirror", { size: 18 });
  arrow("mg-smir", "mirg", "right", 1300, "smir", "bottom", 850, [600, 1080, 850]);

  txt("proc-lbl", 1250, 325, "Process", { size: 20 });
  group("proc", 1080, 360, 430, 700, null, { fill: TINT.mg, dashed: true, stroke: "#1971c2" });
  txt("pnb", 1100, 390, "Notebook", { size: 16 });
  box("de", 1280, 400, 210, 120, "Data Engineer\nData Science", { fill: TINT.white, size: 16 });
  txt("psp", 1100, 560, "Stored\nprocedure", { size: 16 });
  group("pdw", 1280, 570, 210, 220, null, { fill: TINT.white, dashed: true, stroke: "#1971c2" });
  box("pdw1", 1290, 585, 190, 80, "Data Warehouse", { fill: TINT.white, size: 16 });
  box("pdw2", 1290, 690, 190, 85, "SQL database\nin Fabric", { fill: TINT.white, size: 16 });
  txt("pdf", 1100, 715, "Dataflow Gen2\nin Fabric", { size: 16 });
  txt("pes", 1100, 800, "Eventstream", { size: 16 });
  box("rti", 1280, 830, 210, 100, "Real-Time\nIntelligence", { fill: TINT.white, size: 16 });
  box("pmir", 1100, 960, 200, 80, "Mirrored\ndatabase", { fill: TINT.white, size: 16 });
  arrow("slh-de", "slh", "right", 430, "de", "left", 430);
  arrow("sdw-pdw", "sdw", "right", 690, "pdw", "left", 690);
  arrow("seh-rti", "seh", "right", 845, "rti", "left", 845);

  txt("serve-lbl", 1800, 325, "Serve", { size: 20 });
  group("serve", 1620, 360, 400, 700, null, { fill: TINT.mg, dashed: true, stroke: "#1971c2" });
  box("vlh", 1640, 420, 200, 70, "Lakehouse", { fill: TINT.white, size: 16 });
  group("vdw", 1640, 510, 200, 230, null, { fill: TINT.white, dashed: true, stroke: "#1971c2" });
  box("vdw1", 1650, 525, 180, 80, "Data Warehouse", { fill: TINT.white, size: 16 });
  box("vdw2", 1650, 630, 180, 95, "SQL database\nin Fabric", { fill: TINT.white, size: 16 });
  box("gql", 1870, 540, 130, 80, "GraphQL\nAPI", { fill: TINT.white, size: 16 });
  box("veh", 1640, 780, 200, 70, "Eventhouse", { fill: TINT.white, size: 16 });
  box("sae", 1860, 770, 150, 100, "SQL analytics\nendpoint", { fill: TINT.white, size: 16 });
  box("rtd", 1640, 875, 200, 90, "Real-Time\nIntelligence\ndashboard", { fill: TINT.white, size: 16 });
  txt("sem", 1860, 890, "Semantic model\n(Direct Lake)", { size: 16 });
  box("vmir", 1640, 985, 200, 65, "Mirrored database", { fill: TINT.white, size: 16 });
  box("pbi", 1860, 960, 150, 80, "Power BI", { iconLeft: "power-bi-embedded", size: 16 });
  arrow("vlh-de", "vlh", "left", 460, "de", "right", 460);
  arrow("vdw-pdw", "vdw", "left", 620, "pdw", "right", 620);
  arrow("rtd-rti", "rtd", "left", 900, "rti", "right", 900);
  arrow("vmir-pmir", "vmir", "left", 1015, "pmir", "right", 1015);
  arrow("pbi-vmir", "pbi", "left", 1000, "vmir", "right", 1000);
  arrow("gql-vlh", "gql", "top", 1935, "vlh", "right", 445, [445]);
  arrow("sae-veh", "sae", "left", 815, "veh", "right", 815);

  txt("enr-lbl", 2140, 340, "Enrich", { size: 20 });
  group("enr", 2060, 380, 240, 680, null, { fill: TINT.mg, dashed: true, stroke: "#1971c2" });
  box("agent", 2080, 430, 200, 90, "Data agent\n(preview)", { fill: TINT.white, size: 16 });
  box("copilot", 2080, 960, 200, 80, "Copilot", { fill: TINT.white, size: 16 });
  arrow("ag-vlh", "agent", "left", 475, "vlh", "right", 475);
  arrow("cp-pbi", "copilot", "left", 1000, "pbi", "right", 1000);

  group("enr2", 1900, 20, 420, 165, "Enrich", { fill: TINT.mg, dashed: true, stroke: "#1971c2", align: "center", size: 16 });
  card("ml", 1920, 60, 180, 110, "azure-machine-learning", "Machine\nLearning", { size: 16 });
  card("fd", 2120, 60, 180, 110, "ai-foundry", "Microsoft\nFoundry", { size: 16 });
  arrow("ml-vlh", "ml", "left", 115, "vlh", "top", 1740, [1740]);
  arrow("fd-ag", "fd", "right", 115, "agent", "right", 500, [2360, 500]);

  box("bar1", 720, 1110, 1590, 60, "Copilot in Fabric", { fill: TINT.mg, size: 18 });
  box("bar2", 720, 1180, 1590, 60, "Microsoft Purview", { fill: TINT.mg, size: 18 });
  box("bar3", 720, 1250, 1590, 60, "Workspace monitoring", { fill: TINT.mg, size: 18 });
  box("bar4", 720, 1320, 1590, 60, "OneLake", { fill: TINT.sub, size: 18 });
  group("plat", 720, 1400, 1590, 180, null, { fill: TINT.mg, stroke: "#adb5bd" });
  txt("plat-lbl", 740, 1475, "Platform", { size: 20 });
  const P = [["entra-connect", "Microsoft Entra ID"], ["cost-management", "Cost Management"], ["key-vaults", "Azure Key Vault"], [null, "GitHub"], ["azure-devops", "Azure DevOps"], ["policy", "Azure Policy"]];
  P.forEach(([ic, l], i) => ic ? card(`plat${i}`, 900 + i * 230, 1415, 210, 150, ic, l, { size: 16 }) : box(`plat${i}`, 900 + i * 230, 1415, 210, 150, l, { fill: TINT.white, size: 16 }));

  txt("sc-lbl", 540, 1620, "Shortcuts", { size: 18 });
  group("sc", 220, 1660, 780, 180, null, { fill: TINT.mg, dashed: true, stroke: "#1971c2" });
  const S = [["data-lake-storage-gen1", "Data Lake\nStorage"], ["blob-block", "Blob storage"], [null, "Dataverse"], [null, "Google Cloud\nStorage"], [null, "Amazon S3"]];
  S.forEach(([ic, l], i) => ic ? card(`sc${i}`, 235 + i * 152, 1685, 142, 130, ic, l, { size: 16 }) : box(`sc${i}`, 235 + i * 152, 1685, 142, 130, l, { fill: TINT.white, size: 16 }));
  arrow("t-sc", "tenant", "bottom", 850, "sc", "top", 850);

  group("cons", 1200, 1660, 760, 180, "Consumer tenant", { fill: TINT.white, dashed: true, stroke: "#7048e8" });
  box("cons-ol", 1220, 1740, 720, 70, "OneLake", { fill: TINT.sub, size: 18 });
  arrow("share", "cons-ol", "right", 1775, "bar4", "right", 1350, [2380, 1350]);
  txt("share-lbl", 1990, 1700, "Cross-tenant OneLake data share", { size: 16 });

  txt("footer", 40, 1900, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Analytics end-to-end with Microsoft Fabric\"", { size: 20, color: "#495057" });
}
