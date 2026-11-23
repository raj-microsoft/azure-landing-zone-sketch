// 061 Measure Azure app sustainability by using the SCI score.
export const meta = {
  num: 61,
  slug: "measure-azure-app-sustainability-sci-score",
  title: "Measure Azure app sustainability by using the SCI score",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/apps/measure-azure-app-sustainability-sci-score",
  category: "Web",
  status: "done",
  otherDiagrams: ["Screenshot of the Carbon optimization page in the Azure portal"],
  substitutions: { "Application Insights proxy metrics": "application-insights", "App cost behavior": "cost-analysis", "Azure carbon optimization": "azure-sustainability", "Data Lake Storage": "data-lake-storage-gen1", "Logic Apps": "logic-apps", "Demand-shaping scripts": "automation-accounts", "Eco-mode application": "app-services", "Functions": "function-apps", "Dashboard": "dashboard" },
  differences: ["Non-Microsoft data sources and SDKs are a plain labelled box."],
};

export function draw(k) {
  const { TINT, txt, card, box, arrow, step } = k;
  txt("title", 40, 10, "Measure Azure app sustainability by using the SCI score", { size: 30 });
  const cols = [["Proxy sources", 100], ["Storage", 470], ["Calculation", 840], ["Actions", 1210], ["Reporting", 1580]];
  cols.forEach(([l, x], i) => { txt(`h${i}`, x + 110, 100, l, { size: 22, align: "center" }); step(`s${i + 1}`, x + 90, 150, i + 1); });
  card("ai", 100, 240, 220, 170, "application-insights", "Application\nInsights\nproxy metrics");
  card("cost", 100, 450, 220, 150, "cost-analysis", "App cost\nbehavior");
  card("carb", 100, 640, 220, 150, "azure-sustainability", "Azure carbon\noptimization");
  card("dl", 470, 240, 220, 170, "data-lake-storage-gen1", "Data Lake\nStorage");
  card("la", 840, 240, 220, 170, "logic-apps", "Logic Apps");
  card("ds", 1210, 240, 220, 170, "automation-accounts", "Demand-\nshaping scripts");
  card("eco", 1210, 450, 220, 150, "app-services", "Eco-mode\napplication");
  card("fn", 1210, 640, 220, 150, "function-apps", "Functions");
  card("dash", 1580, 240, 220, 170, "dashboard", "Dashboard");
  box("nonms", 760, 520, 380, 270, "Non-Microsoft\ndata sources and SDKs\n\n- WattTime API\n- Electricity Maps\n- Carbon Aware SDK", { size: 18 });

  arrow("a1", "ai", "right", 325, "dl", "left", 325, [], { color: "#66a80f" });
  arrow("a2", "dl", "right", 325, "la", "left", 325, [], { color: "#66a80f" });
  arrow("a3", "la", "right", 325, "ds", "left", 325, [], { color: "#66a80f" });
  arrow("a4", "ds", "right", 325, "dash", "left", 325, [], { color: "#66a80f" });
  arrow("a5", "nonms", "top", 1100, "ds", "left", 380, [380], { color: "#66a80f" });

  txt("footer", 40, 860, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Measure Azure app sustainability by using the SCI score\"", { size: 20, color: "#495057" });
}
