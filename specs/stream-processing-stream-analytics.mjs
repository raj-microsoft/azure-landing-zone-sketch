// 141 Stream processing with Azure Stream Analytics.
export const meta = {
  num: 141,
  slug: "stream-processing-stream-analytics",
  title: "Stream processing with Azure Stream Analytics",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/data/stream-processing-stream-analytics",
  category: "Analytics",
  status: "done",
  otherDiagrams: ["img1: Event Hubs detail", "img2-img3: dashboard and autoscaling screenshots", "img4: Stream Analytics jobs"],
  substitutions: { "Azure Event Hubs": "event-hubs", "Stream Analytics": "stream-analytics-jobs", "Azure Cosmos DB": "azure-cosmos-db", "Power BI": "power-bi-embedded", "Azure Monitor": "monitor", "Dashboard": "dashboard" },
  differences: ["Data source 1 (fare data) and data source 2 (trip data) drawn as labelled shapes without the dollar and taxi glyphs."],
};

export function draw(k) {
  const { TINT, txt, card, box, arrow } = k;
  const S = 16;
  box("ds1", 20, 40, 220, 80, "Data source 1:\nFare data", { fill: TINT.onprem, size: S });
  box("ds2", 20, 240, 220, 80, "Data source 2:\nTrip data", { fill: TINT.onprem, size: S });
  card("eh1", 320, 20, 180, 120, "event-hubs", "Azure Event\nHubs", { size: S });
  card("eh2", 320, 220, 180, 120, "event-hubs", "Azure Event\nHubs", { size: S });
  card("asa", 640, 120, 180, 120, "stream-analytics-jobs", "Stream\nAnalytics", { size: S });
  card("cos", 900, 120, 180, 120, "azure-cosmos-db", "Azure\nCosmos DB", { size: S });
  card("pbi", 1160, 120, 160, 120, "power-bi-embedded", "Power BI", { size: S });
  card("mon", 640, 380, 180, 120, "monitor", "Azure\nMonitor", { size: S });
  card("dash", 900, 380, 180, 120, "dashboard", "Dashboard", { size: S });
  arrow("a1", "ds1", "right", 80, "eh1", "left", 80, [], {});
  arrow("a2", "ds2", "right", 280, "eh2", "left", 280, [], {});
  arrow("a3", "eh1", "right", 80, "asa", "left", 165, [570], {});
  arrow("a4", "eh2", "right", 280, "asa", "left", 195, [590], {});
  arrow("a5", "asa", "right", 180, "cos", "left", 180, [], {});
  arrow("a6", "cos", "right", 180, "pbi", "left", 180, [], {});
  arrow("a7", "mon", "right", 440, "dash", "left", 440, [], {});
  txt("footer", 20, 560, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Stream processing pipeline with Azure Stream Analytics\"", { size: 20, color: "#495057" });
}
