// 091 Many models machine learning with Azure Machine Learning.
export const meta = {
  num: 91,
  slug: "many-models-machine-learning-azure-machine-learning",
  title: "Many-models machine learning at scale with Azure Machine Learning",
  url: "https://learn.microsoft.com/azure/architecture/ai-ml/idea/many-models-machine-learning-azure-machine-learning",
  category: "AI + machine learning",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Enterprise data / third-party metadata": "table", "Azure Data Factory": "data-factories", "Azure Stream Analytics": "stream-analytics-jobs", "Azure Data Lake Storage": "data-lake-storage-gen1", "Managed endpoint": "machine-learning", "Power BI": "power-bi-embedded", "Web application": "app-services" },
  differences: ["Step 3 batch and near real-time routes are drawn as orthogonal lanes above and below the AI zone."],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow, step } = k;
  const M = { size: 16 };
  const col = (id, x, title, w = 260) => { group(id, x, 170, w, 720, null, { dashed: true, fill: TINT.white }); txt(`${id}-t`, x + w / 2, 120, title, { size: 22, align: "center" }); };
  txt("title", 40, 10, "Many-models machine learning with Azure Machine Learning", { size: 30 });
  col("md", 40, "Model data");
  card("ent", 70, 240, 200, 150, "table", "Enterprise data", M);
  card("tp", 70, 640, 200, 160, "table", "Third-party\nmetadata", M);
  col("dw", 400, "Data workload");
  card("adf", 430, 280, 200, 150, "data-factories", "Azure Data\nFactory", M);
  card("asa", 430, 560, 200, 160, "stream-analytics-jobs", "Azure Stream\nAnalytics", M);
  step("s1", 330, 420, 1);
  arrow("a-ent", "ent", "right", 315, "dw", "left", 500, [310]);
  arrow("a-tp", "tp", "right", 720, "dw", "left", 540, [310]);
  col("st", 760, "Staging area");
  card("dls1", 790, 210, 200, 150, "data-lake-storage-gen1", "Azure Data Lake\nStorage", M);
  card("syn1", 790, 420, 200, 150, "azure-synapse-analytics", "Azure Synapse\nAnalytics", M);
  card("sql1", 790, 630, 200, 150, "sql-database", "Azure SQL\nDatabase", M);
  arrow("a-dw", "dw", "right", 520, "st", "left", 520);
  txt("ai-t", 1450, 60, "Artificial intelligence", { size: 24, align: "center" });
  group("ai", 1100, 100, 700, 860, null, { dashed: true, fill: TINT.mg });
  txt("tr-t", 1255, 125, "Training", { size: 20, align: "center" });
  txt("in-t", 1615, 125, "Inference", { size: 20, align: "center" });
  group("tr", 1130, 260, 260, 560, null, { dashed: true, fill: TINT.white });
  txt("tr-note", 1145, 280, "Create Azure Machine\nLearning pipelines\nfor training and\npromotion.", { size: 16 });
  card("aml", 1160, 470, 200, 170, "azure-machine-learning", "Azure Machine\nLearning", M);
  step("s2", 1140, 420, 2);
  group("inf", 1490, 260, 280, 560, null, { dashed: true, fill: TINT.white });
  card("mep", 1530, 460, 200, 170, "machine-learning", "Managed\nendpoint", M);
  step("s4", 1500, 400, 4);
  arrow("a-st", "st", "right", 520, "tr", "left", 520);
  arrow("a-dep", "aml", "right", 555, "mep", "left", 555);
  txt("dep-lbl", 1395, 580, "Deploy\nendpoint", { size: 16 });
  arrow("a-batch", "tr", "top", 1260, "mep", "top", 1630, [200]);
  txt("batch-lbl", 1420, 165, "Batch", { size: 16 });
  step("s3a", 1180, 180, 3);
  arrow("a-rt", "aml", "bottom", 1260, "mep", "bottom", 1630, [880]);
  txt("rt-lbl", 1400, 895, "Near real-time", { size: 16 });
  step("s3b", 1180, 900, 3);
  txt("an-t", 2000, 90, "Analytical\nworkload", { size: 22, align: "center" });
  group("an", 1870, 170, 260, 720, null, { dashed: true, fill: TINT.white });
  card("dls2", 1900, 210, 200, 150, "data-lake-storage-gen1", "Azure Data Lake\nStorage", M);
  card("syn2", 1900, 420, 200, 150, "azure-synapse-analytics", "Azure Synapse\nAnalytics", M);
  card("sql2", 1900, 630, 200, 150, "sql-database", "Azure SQL\nDatabase", M);
  step("s5", 1820, 100, 5);
  arrow("a-an", "ai", "right", 520, "an", "left", 520);
  col("fe", 2230, "Front end");
  card("pbi", 2260, 300, 200, 150, "power-bi-embedded", "Power BI", M);
  card("web", 2260, 520, 200, 150, "app-services", "Web application", M);
  arrow("a-fe", "an", "right", 520, "fe", "left", 520);
  txt("footer", 40, 1000, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Many-models architecture\"", { size: 20, color: "#495057" });
}
