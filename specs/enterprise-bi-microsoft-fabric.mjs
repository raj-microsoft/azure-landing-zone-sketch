// 066 Use Microsoft Fabric to design an enterprise BI solution.
export const meta = {
  num: 66,
  slug: "enterprise-bi-microsoft-fabric",
  title: "Use Microsoft Fabric to design an enterprise BI solution",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/analytics/enterprise-bi-microsoft-fabric",
  category: "Analytics",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Azure data services": "azure-cosmos-db", "Azure Event Hubs": "event-hubs", "Azure IoT Hub": "iot-hub", "Data Factory pipelines": "data-factories", "Mirroring for SQL Server or Copy job": "sql-database", "SQL scripts": "sql-database", "Microsoft Foundry": "ai-foundry", "Azure Machine Learning": "azure-machine-learning", "Power BI": "power-bi-embedded", "Vector store": "cognitive-search", "Business users": "users", "Agentic AI": "foundry-agent-service", "Microsoft Entra ID": "entra-connect", "Cost Management": "cost-management", "Azure Key Vault": "key-vaults", "Azure Monitor": "monitor", "Microsoft Defender for Cloud": "microsoft-defender-for-cloud", "Azure DevOps and GitHub": "azure-devops", "Azure Policy": "policy" },
  differences: ["Fabric items (eventstreams, Eventhouse, Lakehouse/Warehouse, mirrored replica, KQL queryset, Spark notebook, Dataflow Gen2, data agent, shortcuts), OneLake, Purview and the source types are plain sketch shapes (no sketch icon).", "The second 'Hot path' label beside the source arrows is omitted for space; the hot path label beside Event Hubs is kept."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, both, line } = k;
  txt("title", 40, 10, "Use Microsoft Fabric to design an enterprise BI solution", { size: 30 });

  group("str", 40, 100, 340, 300, null, { fill: TINT.white, stroke: "#868e96" });
  box("bds", 60, 120, 300, 110, "Big data streams", { fill: TINT.mg, size: 18 });
  box("iot", 60, 250, 300, 110, "IoT devices", { fill: TINT.mg, size: 18 });
  txt("str-lbl", 160, 365, "Streaming", { size: 18 });
  box("unstr", 40, 440, 340, 160, "Unstructured\nimages, video, audio,\nfree text\n(no structure)", { fill: TINT.mg, size: 16 });
  box("semi", 40, 640, 340, 160, "Semistructured\nCSV, logs, JSON, XML\n(loosely typed)", { fill: TINT.mg, size: 16 });
  box("rel", 40, 860, 340, 220, "Relational databases\n(structured)", { fill: TINT.app, size: 18 });
  card("azds", 40, 1120, 340, 200, "azure-cosmos-db", "Azure data services\n(Azure Cosmos DB, Dataverse,\nAzure SQL Database)", { size: 16 });

  group("ingest", 560, 60, 300, 380, "Ingest", { fill: TINT.white, size: 20, align: "center" });
  card("eh", 590, 110, 240, 150, "event-hubs", "Azure Event Hubs");
  card("ioth", 590, 275, 240, 150, "iot-hub", "Azure IoT Hub");
  arrow("bds-eh", "bds", "right", 175, "eh", "left", 175);
  both("iot-ioth", "iot", "right", 320, "ioth", "left", 320);
  txt("lambda", 875, 120, "Lambda architecture", { size: 16 });
  txt("hot", 1030, 300, "Hot path\nreal-time, event\ndriven data", { size: 16 });

  group("proc", 1200, 60, 300, 380, "Process", { fill: TINT.white, size: 20, align: "center" });
  box("es2", 1220, 130, 260, 160, "Fabric eventstreams", { fill: TINT.app, size: 18 });
  arrow("eh-es2", "eh", "right", 185, "es2", "left", 185);

  group("fabric", 560, 460, 920, 800, null, { fill: TINT.app, stroke: "#2b8a3e" });
  txt("fabric-lbl", 600, 470, "Microsoft Fabric", { size: 18 });
  box("es1", 590, 520, 240, 200, "Fabric eventstreams", { fill: TINT.white, size: 18 });
  card("dfp", 590, 760, 240, 200, "data-factories", "Data Factory pipelines\nScheduled or event-\ntriggered ingestion", { size: 16 });
  card("mir", 590, 1000, 240, 220, "sql-database", "Mirroring for SQL\nServer or Copy job", { size: 16 });

  group("onelake", 880, 500, 270, 740, null, { fill: TINT.white, stroke: "#2b8a3e" });
  box("ohouse", 900, 530, 230, 150, "Eventhouse", { fill: TINT.mg, size: 18 });
  box("lh", 900, 760, 230, 180, "Fabric Lakehouse\nor Fabric Warehouse\n(enterprise data\nwarehouse capabilities)", { fill: TINT.mg, size: 16 });
  box("mr", 900, 1000, 230, 150, "Mirrored replica", { fill: TINT.mg, size: 18 });
  txt("ol-lbl", 893, 1180, "OneLake storage", { size: 18 });

  box("kql", 1200, 520, 240, 140, "KQL queryset\n(near real-time\ntelemetry)", { fill: TINT.white, size: 16 });
  box("spark", 1200, 720, 240, 140, "Spark notebook\n(data lakehouse\nworkloads)", { fill: TINT.white, size: 16 });
  card("sqls", 1200, 900, 240, 160, "sql-database", "SQL scripts\n(data warehouse\nthat uses T-SQL)", { size: 16 });
  box("dfg2", 1200, 1090, 240, 130, "Dataflow Gen2", { fill: TINT.white, size: 18 });

  arrow("un-es1", "unstr", "right", 560, "es1", "left", 560);
  arrow("se-es1", "semi", "right", 680, "es1", "left", 680);
  arrow("rel-es1", "rel", "right", 900, "es1", "left", 700, [540]);
  arrow("rel-dfp", "rel", "right", 920, "dfp", "left", 920);
  arrow("rel-mir", "rel", "right", 1060, "mir", "left", 1060);
  txt("cold", 395, 960, "Cold path\nhistory and\ntrend analysis", { size: 16 });
  arrow("az-mr", "azds", "right", 1300, "mr", "bottom", 1110, [], { dashed: true });
  txt("az-lbl", 600, 1330, "OneLake shortcuts, other mirrored databases", { size: 16 });

  arrow("eh-oh", "eh", "right", 230, "ohouse", "top", 1000, [1000]);
  arrow("es1-oh", "es1", "right", 580, "ohouse", "left", 600, [855]);
  arrow("es1-lh", "es1", "right", 690, "lh", "left", 820, [875]);
  arrow("dfp-lh", "dfp", "right", 880, "lh", "left", 880);
  arrow("mir-mr", "mir", "right", 1080, "mr", "left", 1080);
  arrow("oh-es2", "ohouse", "top", 1060, "es2", "bottom", 1330, [450, 1330], { dashed: true });
  txt("thr", 1345, 320, "High throughput\nstream ingestion", { size: 16 });

  group("enrich", 1540, 100, 300, 420, "Enrich", { fill: TINT.white, size: 20, align: "center" });
  card("foundry", 1570, 150, 240, 170, "ai-foundry", "Microsoft Foundry");
  card("aml", 1570, 335, 240, 170, "azure-machine-learning", "Azure Machine\nLearning");
  both("es2-fd", "es2", "right", 250, "foundry", "left", 235, [1515]);
  txt("pred", 1545, 40, "Predictive analytics with machine learning models", { size: 16 });
  both("aml-kql", "aml", "left", 470, "kql", "right", 590, [1525, 590]);
  txt("cml", 1560, 540, "Custom ML models training\nand ML operations", { size: 16 });

  group("serve", 1900, 460, 340, 860, "Serve", { fill: TINT.white, size: 20, align: "center" });
  card("pbi", 1930, 520, 280, 160, "power-bi-embedded", "Power BI");
  box("agent", 1930, 710, 280, 140, "Fabric data agent", { fill: TINT.mg, size: 18 });
  card("vec", 1930, 880, 280, 160, "cognitive-search", "Vector store");
  box("share", 1930, 1070, 280, 200, "Fabric internal\nshortcuts and\nexternal share", { fill: TINT.mg, size: 18 });
  arrow("es2-pbi", "es2", "top", 1440, "pbi", "top", 2160, [80, 2160]);
  txt("strm", 1880, 100, "Stream datasets and\nreal-time dashboards", { size: 16 });
  arrow("f-pbi", "fabric", "right", 650, "pbi", "left", 650, [], { color: "#1971c2" });
  txt("sem", 1500, 670, "Enterprise-grade semantic\nmodels and self-service BI", { size: 16 });
  arrow("sp-ag", "spark", "right", 790, "agent", "left", 790);
  txt("conv", 1560, 805, "Conversational AI", { size: 16 });
  arrow("sq-vec", "sqls", "right", 960, "vec", "left", 960);
  txt("aiapp", 1560, 975, "AI applications", { size: 16 });
  arrow("df-sh", "dfg2", "right", 1150, "share", "left", 1150);
  txt("cur", 1500, 1170, "Securely share curated datasets\nwith business units and\nexternal parties", { size: 16 });

  group("cons", 2300, 60, 280, 1260, null, { fill: TINT.white, stroke: "#868e96" });
  card("busers", 2320, 80, 240, 180, "users", "Business users");
  box("analytics", 2320, 540, 240, 140, "Analytics", { fill: TINT.mg, size: 18 });
  card("agentic", 2320, 710, 240, 150, "foundry-agent-service", "Agentic AI");
  box("aiapps", 2320, 890, 240, 140, "AI applications", { fill: TINT.mg, size: 18 });
  box("shared", 2320, 1080, 240, 140, "Shared datasets", { fill: TINT.mg, size: 18 });
  arrow("p-an", "pbi", "right", 610, "analytics", "left", 610, [], { color: "#1971c2" });
  arrow("a-ag", "agent", "right", 780, "agentic", "left", 780);
  arrow("v-ai", "vec", "right", 960, "aiapps", "left", 960);
  arrow("s-sh", "share", "right", 1150, "shared", "left", 1150);

  group("gov", 560, 1400, 1960, 140, null, { fill: TINT.mg, stroke: "#adb5bd" });
  txt("gov-lbl", 620, 1455, "Discover and govern", { size: 20 });
  box("purview", 1000, 1415, 320, 110, "Microsoft Purview", { fill: TINT.white, size: 18 });

  group("plat", 560, 1580, 1960, 200, null, { fill: TINT.mg, stroke: "#adb5bd" });
  txt("plat-lbl", 400, 1660, "Platform", { size: 20 });
  const P = [["entra-connect", "Microsoft\nEntra ID"], ["cost-management", "Cost\nManagement"], ["key-vaults", "Azure Key\nVault"], ["monitor", "Azure\nMonitor"], ["microsoft-defender-for-cloud", "Microsoft Defender\nfor Cloud"], ["azure-devops", "Azure DevOps\nand GitHub"], ["policy", "Azure\nPolicy"]];
  P.forEach(([ic, l], i) => card(`plat${i}`, 590 + i * 270, 1605, 240, 150, ic, l, { size: 16 }));

  txt("footer", 40, 1840, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Use Microsoft Fabric to design an enterprise BI solution\"", { size: 20, color: "#495057" });
}
