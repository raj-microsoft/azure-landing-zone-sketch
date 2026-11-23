// 007 Event-driven cache updates with Azure Managed Redis and Azure Cosmos DB. Redraw of the article's diagram.
export const meta = {
  num: 7,
  slug: "event-driven-cache-updates-azure-managed-redis-cosmos-db",
  title: "Event-driven cache updates with Azure Managed Redis and Azure Cosmos DB",
  url: "https://learn.microsoft.com/azure/architecture/databases/architecture/event-driven-cache-updates-azure-managed-redis-cosmos-db",
  category: "Databases + analytics",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Client application": "browser", "App Service application tier": "app-services", "Change feed processor": "function-apps" },
  differences: [
    "Read flow steps are green circles and write flow steps blue squares, as in the original; the arrows are orthogonal.",
    "The diagonal 'Return value' arrow (read step 5) is routed through a lane.",
  ],
};

export function draw(k) {
  const { TINT, txt, zone, box, card, step, arrow, line } = k;
  const G = "#2b8a3e", B = "#1971c2";
  const W = (id, x, y, n) => step(id, x, y, n, { square: true, fill: "#d0ebff", stroke: B });
  txt("title", 80, 20, "Event-driven cache updates with Azure Managed Redis and Azure Cosmos DB", { size: 30 });

  card("client", 60, 560, 200, 140, "browser", "Client\napplication");
  zone("vnet", 560, 90, 1440, 1300, "transparent", { dashed: true, stroke: "#74c0fc" });
  txt("vnet-t", 580, 105, "Azure virtual network", { size: 18 });
  zone("inner", 640, 170, 1320, 960, "transparent", { dashed: true, stroke: "#495057" });

  card("app", 820, 560, 220, 150, "app-services", "App Service\nApplication tier");
  card("pe-redis", 1400, 300, 280, 150, "private-endpoints", "Private endpoint\n(Azure Managed Redis)");
  card("func", 1400, 580, 280, 160, "function-apps", "Azure Functions\nChange feed\nprocessor");
  card("pe-cosmos", 1400, 880, 280, 150, "private-endpoints", "Private endpoint\n(Azure Cosmos DB)");
  card("redis", 2060, 290, 300, 170, "azure-managed-redis", "Azure Managed Redis\nDistributed cache", { fill: TINT.mg });
  card("cosmos", 2060, 860, 300, 190, "azure-cosmos-db", "Azure Cosmos DB\nFor NoSQL\nSystem of record", { fill: TINT.mg });
  card("mon", 1640, 1200, 220, 140, "monitor", "Azure Monitor");

  // 1 read / write request
  arrow("req", "client", "right", 630, "app", "left", 630);
  step("r1", 300, 540, 1); txt("r1-t", 350, 540, "HTTPS\nread request", { size: 16 });
  W("w1", 300, 650, 1); txt("w1-t", 350, 650, "HTTPS\nwrite request", { size: 16 });
  // read flow (green)
  arrow("r-read", "app", "top", 880, "pe-redis", "top", 1520, [220], { color: G });
  step("r2", 680, 300, 2); txt("r2-t", 730, 300, "Read from\ncache", { size: 16 });
  arrow("r-hit", "pe-redis", "top", 1470, "app", "top", 960, [260], { color: G });
  step("r3", 1000, 380, 3); txt("r3-t", 1050, 380, "Cache hit:\nReturn value", { size: 16 });
  arrow("r-miss", "app", "bottom", 860, "pe-cosmos", "bottom", 1560, [1100], { color: G });
  step("r4", 668, 930, 4); txt("r4-t", 712, 930, "Cache miss:\nRead from Azure\nCosmos DB", { size: 16 });
  arrow("r-ret", "pe-cosmos", "left", 920, "app", "right", 680, [1200], { color: G });
  step("r5", 1220, 740, 5); txt("r5-t", 1270, 745, "Return value", { size: 16 });
  // write flow (blue)
  arrow("w-write", "app", "bottom", 1000, "pe-cosmos", "bottom", 1460, [1060], { color: B });
  W("w2", 1080, 990, 2); txt("w2-t", 1130, 985, "Write authoritative\nchange", { size: 16 });
  arrow("w-commit", "pe-cosmos", "right", 950, "cosmos", "left", 950, [], { color: B });
  W("w3", 1730, 980, 3); txt("w3-t", 1780, 975, "Azure Cosmos\nDB commits\nchange", { size: 16 });
  arrow("w-feed", "pe-cosmos", "top", 1540, "func", "bottom", 1540, [], { color: B });
  W("w4", 1720, 600, 4); txt("w4-t", 1770, 595, "Read and\nprocess\nchange feed", { size: 16 });
  arrow("w-upd", "func", "top", 1540, "pe-redis", "bottom", 1540, [], { color: B });
  W("w5", 1720, 470, 5); txt("w5-t", 1770, 465, "Update value\nor write\nversioned\ntombstone", { size: 16 });
  arrow("pe-r", "pe-redis", "right", 375, "redis", "left", 375);
  // telemetry
  arrow("m-in", "inner", "bottom", 800, "mon", "left", 1270, [], { color: "#868e96", firstDir: "v" });
  txt("m-t", 900, 1290, "Metrics and logs", { size: 16 });
  line("m-redis", "redis", "right", 400, "mon", "right", 1270, [2420], { color: "#868e96" });
  line("m-cos", "cosmos", "right", 960, "mon", "right", 1300, [2400], { color: "#868e96", head: "arrow" });

  step("lg-r", 80, 800, "");
  txt("lg-r-t", 130, 808, "Read flow", { size: 18 });
  W("lg-w", 80, 860, "");
  txt("lg-w-t", 130, 868, "Write flow", { size: 18 });
  txt("footer", 80, 1420, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Event-driven cache updates with Azure Managed Redis and Azure Cosmos DB\"", { size: 20, color: "#495057" });
}
