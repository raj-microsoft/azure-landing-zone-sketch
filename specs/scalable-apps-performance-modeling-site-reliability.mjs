// 052 Scalable cloud applications and site reliability engineering (SRE).
export const meta = {
  num: 52,
  slug: "scalable-apps-performance-modeling-site-reliability",
  title: "Scalable cloud applications and site reliability engineering (SRE)",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/apps/scalable-apps-performance-modeling-site-reliability",
  category: "Web",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Web app": "browser", "Mobile app": "mobile", "API client": "api-connections", "Azure": "azure-a", "Azure Front Door": "front-door-and-cdn-profiles", "Microsoft Entra ID": "entra-connect", "Azure Managed Redis": "azure-managed-redis", "Azure Chaos Studio": "azure-chaos-studio", "API Management": "api-management-services", "Application Gateway for Containers": "application-gateway-containers", "AKS microservice": "worker-container-app", "Azure Cosmos DB": "azure-cosmos-db", "Azure Storage": "storage-accounts", "Azure SQL": "sql-database", "Data Lake Storage": "data-lake-storage-gen1", "Azure Monitor dashboard": "azure-monitor-dashboard", "Application Insights": "application-insights", "Grafana": "azure-managed-grafana" },
  differences: [],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow, both, step } = k;
  txt("title", 40, 10, "Scalable cloud applications and site reliability engineering (SRE)", { size: 30 });
  group("cli", 40, 300, 360, 420, "Client apps", { fill: TINT.white, size: 20 });
  step("s1", 340, 320, 1);
  card("web", 140, 370, 150, 130, "browser", "Web app");
  card("mob", 60, 550, 150, 130, "mobile", "Mobile app");
  card("api", 230, 550, 150, 130, "api-connections", "API");

  group("az", 560, 70, 2260, 1300, "Azure", { fill: TINT.white, iconName: "azure-a", size: 20 });
  card("fd", 600, 440, 220, 170, "front-door-and-cdn-profiles", "Azure Front Door");
  step("s2", 600, 390, 2);
  txt("fd-cap", 605, 630, "SSL termination\nand Web\nApplication\nFirewall\nprotection", { size: 16 });
  card("entra", 1000, 110, 220, 150, "entra-connect", "Microsoft Entra ID");
  step("s7", 950, 120, 7);
  card("redis", 1380, 90, 200, 150, "azure-managed-redis", "Azure Managed\nRedis");
  card("chaos", 1880, 90, 200, 150, "azure-chaos-studio", "Azure Chaos\nStudio");
  card("apim", 940, 440, 240, 170, "api-management-services", "API Management\nservices");
  step("s3", 940, 390, 3);
  txt("apim-cap", 950, 630, "- Access control\n- Rate limit\n- Transform\n- Cache", { size: 16 });
  card("agc", 1300, 440, 240, 170, "application-gateway-containers", "Application\nGateway for\nContainers");
  step("s4", 1300, 390, 4);

  group("aks", 1640, 330, 520, 480, "Azure Kubernetes Services (AKS)\nmicroservices", { fill: TINT.mg, size: 18 });
  step("s5", 1592, 340, 5);
  card("p1", 1680, 420, 200, 150, "worker-container-app", "Product");
  card("p2", 1920, 420, 200, 150, "worker-container-app", "Profile");
  card("p3", 1680, 620, 200, 150, "worker-container-app", "Orders &\npayments");
  card("p4", 1920, 620, 200, 150, "worker-container-app", "Content");

  group("data", 2240, 330, 500, 480, "Data services", { fill: TINT.mg, size: 18 });
  step("s6", 2190, 340, 6);
  card("cos", 2270, 420, 200, 150, "azure-cosmos-db", "Azure Cosmos DB");
  card("sto", 2510, 420, 200, 150, "storage-accounts", "Azure Storage");
  card("sql", 2270, 620, 200, 150, "sql-database", "Azure SQL");
  card("dl", 2510, 620, 200, 150, "data-lake-storage-gen1", "Data Lake\nStorage");
  step("s9", 2180, 590, 9);

  group("mon", 1900, 900, 720, 400, "Monitoring and observability", { fill: TINT.mg, size: 18 });
  step("s8", 1850, 905, 8);
  card("dash", 1950, 1040, 200, 170, "azure-monitor-dashboard", "Azure Monitor\ndashboard");
  card("ai", 2170, 1040, 200, 170, "application-insights", "Application\nInsights");
  card("graf", 2390, 1040, 200, 170, "azure-managed-grafana", "Grafana");

  both("c-fd", "cli", "right", 525, "fd", "left", 525);
  txt("url-lbl", 410, 470, "https://\napi.contoso.com", { size: 16 });
  both("fd-apim", "fd", "right", 525, "apim", "left", 525);
  txt("h1", 845, 490, "HTTPS", { size: 16 });
  arrow("apim-agc", "apim", "right", 525, "agc", "left", 525);
  txt("h2", 1205, 490, "HTTPS", { size: 16 });
  arrow("agc-aks", "agc", "right", 525, "aks", "left", 525);
  txt("h3", 1560, 490, "HTTPS", { size: 16 });
  arrow("aks-data", "aks", "right", 560, "data", "left", 560);

  arrow("fd-en", "fd", "top", 660, "entra", "left", 185, [185], { dashed: true, color: "#2b8a3e" });
  txt("auth1", 675, 300, "authentication\nauthorization", { size: 16 });
  arrow("apim-en", "apim", "top", 1080, "entra", "bottom", 1080, [], { dashed: true, color: "#2b8a3e" });
  txt("auth2", 1095, 280, "authentication\nauthorization", { size: 16 });
  arrow("apim-redis", "apim", "top", 1160, "redis", "bottom", 1480, [380, 1480], { head: null });
  txt("cache-lbl", 1400, 300, "cache", { size: 16 });
  arrow("chaos-aks", "chaos", "bottom", 1980, "aks", "top", 1980, [], { color: "#c92a2a" });
  txt("chaos-lbl", 1770, 260, "Fault injection\nResiliency testing", { size: 16 });

  arrow("t-aks", "aks", "bottom", 1700, "mon", "left", 960, [960], { dashed: true });
  txt("t1", 1710, 850, "telemetry", { size: 16 });
  arrow("t-agc", "agc", "bottom", 1420, "mon", "left", 1040, [1040], { dashed: true });
  txt("t2", 1500, 1005, "telemetry", { size: 16 });
  arrow("t-apim", "apim", "bottom", 1160, "mon", "left", 1120, [1120], { dashed: true });
  txt("t3", 1500, 1085, "telemetry", { size: 16 });
  arrow("t-fd", "fd", "bottom", 800, "mon", "left", 1200, [1200], { dashed: true });
  txt("t4", 1500, 1165, "telemetry", { size: 16 });
  arrow("t-data", "data", "bottom", 2690, "mon", "right", 1100, [1100], { dashed: true });
  txt("t5", 2700, 1000, "telemetry", { size: 16 });

  txt("footer", 40, 1420, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Scalable cloud applications and site reliability engineering (SRE)\"", { size: 20, color: "#495057" });
}
