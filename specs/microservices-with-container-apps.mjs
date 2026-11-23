// 065 Deploy microservices to Azure Container Apps.
export const meta = {
  num: 65,
  slug: "microservices-with-container-apps",
  title: "Deploy Microservices to Azure Container Apps",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/serverless/microservices-with-container-apps",
  category: "Containers",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Azure Service Bus": "azure-service-bus", "Azure Container Apps environment": "container-apps-environments", "Ingestion / Package / Drone scheduler / Delivery service": "worker-container-app", "Workflow service": "workflow", "Azure DocumentDB": "azure-documentdb", "Azure Cosmos DB for NoSQL": "azure-cosmos-db", "Azure Managed Redis": "azure-managed-redis", "Application Insights": "application-insights", "Log Analytics workspace": "log-analytics-workspaces", "Azure Monitor": "monitor", "Azure Key Vault": "key-vaults", "Azure Container Registry": "container-registries" },
  differences: ["HTTP traffic is a plain sketch shape (no sketch icon).", "Managed identity badges on the environment and services are omitted."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, step } = k;
  txt("title", 40, 10, "Deploy microservices to Azure Container Apps", { size: 30 });

  card("sb", 760, 90, 260, 180, "azure-service-bus", "Azure\nService Bus");

  group("env", 380, 380, 1300, 900, null, { fill: TINT.sub, stroke: "#1971c2", iconName: "container-apps-environments" });
  txt("env-lbl", 1160, 400, "Azure Container Apps environment", { size: 22 });
  box("http", 40, 630, 220, 120, "HTTP traffic", { fill: TINT.mg, size: 18 });
  step("s1", 280, 600, 1);

  txt("ca1", 470, 560, "Container app", { size: 16 });
  card("ing", 460, 600, 280, 170, "worker-container-app", "Ingestion\nservice");
  txt("ca2", 970, 560, "Container app", { size: 16 });
  step("s2", 1200, 540, 2);
  card("wf", 960, 600, 280, 170, "workflow", "Workflow\nservice");

  txt("ca3", 480, 950, "Container app", { size: 16 });
  step("s3", 760, 920, 3);
  card("pkg", 470, 990, 280, 180, "worker-container-app", "Package\nservice");
  txt("ca4", 900, 950, "Container app", { size: 16 });
  step("s4", 1180, 920, 4);
  card("drone", 890, 990, 280, 180, "worker-container-app", "Drone scheduler\nservice");
  txt("ca5", 1320, 950, "Container app", { size: 16 });
  step("s5", 1600, 920, 5);
  card("deliv", 1310, 990, 280, 180, "worker-container-app", "Delivery\nservice");

  arrow("h-ing", "http", "right", 690, "ing", "left", 690);
  arrow("ing-sb", "ing", "top", 600, "sb", "left", 180, [180]);
  arrow("sb-wf", "sb", "right", 180, "wf", "top", 1100, [1100]);
  arrow("wf-pkg", "wf", "bottom", 1030, "pkg", "top", 610, [860]);
  arrow("wf-dr", "wf", "bottom", 1100, "drone", "top", 1030, [880]);
  arrow("wf-de", "wf", "bottom", 1170, "deliv", "top", 1450, [860]);

  card("ddb", 440, 1380, 340, 180, "azure-documentdb", "Azure DocumentDB");
  card("cos", 860, 1380, 340, 180, "azure-cosmos-db", "Azure Cosmos\nDB for NoSQL");
  card("red", 1280, 1380, 340, 180, "azure-managed-redis", "Azure Managed\nRedis");
  arrow("p-d", "pkg", "bottom", 610, "ddb", "top", 610);
  arrow("d-c", "drone", "bottom", 1030, "cos", "top", 1030);
  arrow("de-r", "deliv", "bottom", 1450, "red", "top", 1450);

  group("monit", 1820, 360, 760, 560, null, { fill: TINT.white, dashed: true, stroke: "#868e96" });
  card("ai", 1860, 400, 300, 200, "application-insights", "Application\nInsights");
  card("la", 1860, 680, 300, 200, "log-analytics-workspaces", "Log Analytics\nworkspace");
  card("mon", 2260, 540, 260, 200, "monitor", "Azure\nMonitor");
  step("s7", 1760, 610, 7);
  arrow("env-ai", "env", "right", 500, "ai", "left", 500);
  arrow("env-la", "env", "right", 780, "la", "left", 780);

  step("s6", 1760, 1000, 6);
  card("kv", 1860, 980, 300, 200, "key-vaults", "Azure Key\nVault");
  step("s8", 1760, 1380, 8);
  card("acr", 1860, 1360, 300, 200, "container-registries", "Azure Container\nRegistry");

  txt("footer", 40, 1660, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Deploy microservices to Azure Container Apps\"", { size: 20, color: "#495057" });
}
