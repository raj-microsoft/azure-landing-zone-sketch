// 083 Real-time lakehouse data processing.
export const meta = {
  num: 83,
  slug: "real-time-lakehouse-data-processing",
  title: "Real-time lakehouse data processing",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/data/real-time-lakehouse-data-processing",
  category: "Databases + analytics",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Mobile apps": "mobile", "Customer-facing applications": "browser", "OLTP databases": "sql-database", "Data Lake Storage": "data-lake-storage-gen1", "Power BI": "power-bi-embedded", "APIs for downstream consumption": "api-connections", "Azure AI Search": "cognitive-search", "Customers": "users", "Partner datasets": "files", "Other documents": "file" },
  differences: ["Debezium connectors (open source) are a plain labelled shape.", "Italic sub-captions are written as extra caption lines."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, step } = k;
  const M = { size: 16 };
  txt("title", 40, 10, "Real-time lakehouse data processing", { size: 30 });
  group("str", 100, 80, 300, 500, "Streaming data sources", { align: "center", fill: TINT.mg });
  card("mob", 150, 160, 200, 150, "mobile", "Mobile apps", M);
  card("capp", 150, 380, 200, 170, "browser", "Customer-facing\napplications", M);
  card("oltp", 520, 390, 200, 150, "sql-database", "OLTP\ndatabases", M);
  box("deb", 480, 90, 240, 120, "Debezium connectors\nExtract and send events", { size: 16, fill: TINT.app });
  card("eh", 860, 80, 200, 150, "event-hubs", "Event Hubs", M);
  card("spark1", 1300, 70, 240, 190, "azure-synapse-analytics", "Azure Synapse Analytics\nSpark pool\nStructured stream\nprocessing", M);
  card("dls1", 860, 440, 200, 170, "data-lake-storage-gen1", "Data Lake Storage\nLanding zone", M);
  card("pipe1", 1100, 440, 200, 170, "azure-synapse-analytics", "Synapse Analytics\npipelines\nProcess data", M);
  card("dls2", 1340, 440, 200, 170, "data-lake-storage-gen1", "Data Lake Storage\nValidated zone", M);
  card("spark2", 1580, 440, 200, 170, "azure-synapse-analytics", "Azure Synapse\nAnalytics Spark pool", M);
  card("dsql", 1880, 240, 220, 170, "azure-synapse-analytics", "Synapse Analytics\ndedicated SQL pool", M);
  card("cosmos", 1880, 440, 220, 170, "azure-cosmos-db", "Azure\nCosmos DB", M);
  card("srch", 1880, 700, 220, 150, "cognitive-search", "Azure AI\nSearch", M);
  card("pbi", 2160, 240, 200, 170, "power-bi-embedded", "Power BI\nReports and\ndashboards", M);
  card("apis", 2160, 570, 220, 160, "api-connections", "APIs for\ndownstream\nconsumption", M);
  card("sless", 1580, 900, 220, 170, "azure-synapse-analytics", "Synapse Analytics\nserverless SQL pool", M);
  card("cust", 2040, 890, 260, 190, "users", "Customers\nUnplanned and\nexploratory analysis", M);
  card("ml", 1980, 1130, 280, 190, "azure-machine-learning", "Azure Machine Learning\nModel training and\ndeployment", M);
  group("bat", 100, 700, 300, 640, "Batch data sources", { align: "center", fill: TINT.mg });
  card("partner", 150, 760, 200, 150, "files", "Partner\ndatasets", M);
  card("ftp", 150, 950, 200, 170, "ftp", "File Transfer\nProtocol (FTP)", M);
  card("odoc", 150, 1160, 200, 150, "file", "Other\ndocuments", M);
  card("pipe2", 840, 1080, 240, 170, "azure-synapse-analytics", "Azure Synapse Analytics\npipelines", M);

  arrow("a-capp", "capp", "right", 465, "oltp", "left", 465);
  arrow("a1", "oltp", "top", 620, "deb", "bottom", 620);
  step("s1", 650, 280, 1);
  arrow("a2", "deb", "right", 150, "eh", "left", 150);
  step("s2", 770, 80, 2);
  arrow("a3", "eh", "right", 150, "spark1", "left", 150);
  step("s3", 1090, 260, 3);
  arrow("a-cap", "eh", "bottom", 960, "dls1", "top", 960);
  txt("cap-lbl", 980, 320, "Event Hubs\ncapture", { size: 16 });
  arrow("a-p1", "dls1", "right", 525, "pipe1", "left", 525);
  arrow("a-p2", "pipe1", "right", 525, "dls2", "left", 525);
  arrow("a5", "spark1", "bottom", 1420, "dls2", "top", 1420);
  step("s5", 1460, 320, 5);
  arrow("a-sp", "dls2", "right", 525, "spark2", "left", 525);
  step("s6", 1440, 650, 6);
  arrow("a7", "spark2", "right", 470, "dsql", "left", 325, [1830]);
  step("s7", 1770, 260, 7);
  arrow("a8", "dsql", "right", 325, "pbi", "left", 325);
  step("s8", 2110, 250, 8);
  arrow("a10", "spark2", "right", 525, "cosmos", "left", 525);
  step("s10", 1785, 640, 10);
  arrow("a11", "spark2", "right", 580, "srch", "left", 775, [1850]);
  step("s11", 1790, 800, 11);
  arrow("a-capi", "cosmos", "right", 525, "apis", "top", 2260, [2260]);
  arrow("a-sapi", "srch", "right", 775, "apis", "bottom", 2300, [2300]);
  arrow("a9", "dls2", "bottom", 1400, "sless", "left", 985, [985]);
  arrow("a-ml", "dls2", "bottom", 1370, "ml", "left", 1215, [1215]);
  step("s9", 1420, 1100, 9);
  arrow("a-cust", "sless", "right", 985, "cust", "left", 985);
  arrow("a-batch", "bat", "right", 1165, "pipe2", "left", 1165);
  txt("copy-lbl", 430, 1115, "Copy data to Data Lake Storage", { size: 18 });
  arrow("a4", "pipe2", "top", 960, "dls1", "bottom", 960);
  step("s4", 880, 880, 4);
  txt("footer", 40, 1380, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Real-time lakehouse data processing\"", { size: 20, color: "#495057" });
}
