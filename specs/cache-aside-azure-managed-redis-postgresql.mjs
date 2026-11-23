// 017 Cache-aside caching using Azure Managed Redis and Azure Database for PostgreSQL. Redraw of the article's diagram.
// Queue entry 018 (cache-aside-azure-managed-redis-postgresql-2) is the same Learn URL; build-scene marks it as a duplicate.
export const meta = {
  num: 17,
  slug: "cache-aside-azure-managed-redis-postgresql",
  title: "Cache-aside caching using Azure Managed Redis and Azure Database for PostgreSQL",
  url: "https://learn.microsoft.com/azure/architecture/databases/architecture/cache-aside-azure-managed-redis-postgresql",
  category: "Databases + analytics",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Client application": "browser", "App Service": "app-services" },
  differences: [
    "Read steps are green circles and write steps blue squares, as in the original.",
    "The App Service to private endpoint flows leave through separate lanes so no two arrows share a line.",
  ],
};

export function draw(k) {
  const { TINT, txt, zone, card, step, arrow, line } = k;
  const G = "#2b8a3e", B = "#1971c2", M = "#868e96";
  const W = (id, x, y, n) => step(id, x, y, n, { square: true, fill: "#d0ebff", stroke: B });
  txt("title", 60, 10, "Cache-aside caching with Azure Managed Redis and Azure Database for PostgreSQL", { size: 28 });

  card("client", 60, 520, 220, 150, "browser", "Client\napplication");
  zone("vnet", 520, 70, 1300, 1300, "transparent", { dashed: true, stroke: "#4a6b8a" });
  txt("vnet-t", 590, 85, "Azure virtual network", { size: 18 });
  k.icon("vnet-i", "virtual-networks", 530, 80, 48);
  zone("inner", 580, 150, 1180, 900, "transparent", { stroke: "#adb5bd" });

  card("app", 700, 520, 200, 150, "app-services", "App\nService");
  card("pe-r", 1500, 200, 230, 140, "private-endpoints", "Private\nendpoint");
  card("pe-p", 1500, 800, 230, 140, "private-endpoints", "Private\nendpoint");
  card("redis", 1900, 190, 300, 170, "azure-managed-redis", "Azure Managed Redis\nDistributed cache", { fill: TINT.mg });
  card("pg", 1900, 760, 300, 210, "azure-database-postgresql-server", "Azure Database for\nPostgreSQL\nSystem of record", { fill: TINT.mg });
  card("mon", 1060, 1150, 220, 150, "monitor", "Azure Monitor");

  // 1 requests
  arrow("r1", "client", "right", 560, "app", "left", 560, [], { color: G });
  arrow("r1b", "app", "left", 595, "client", "right", 595);
  arrow("w1", "client", "right", 630, "app", "left", 630, [], { color: B });
  step("s1r", 330, 470, 1); txt("s1r-t", 380, 470, "HTTPS read\nrequest", { size: 16 });
  W("s1w", 330, 660, 1); txt("s1w-t", 380, 660, "HTTPS write\nrequest", { size: 16 });
  // read flow
  arrow("r2", "app", "top", 740, "pe-r", "left", 230, [230], { color: G, firstDir: "v" });
  step("s2r", 620, 200, 2); txt("s2r-t", 620, 248, "Check Redis\nfor key", { size: 16 });
  arrow("r3", "pe-r", "left", 270, "app", "top", 780, [780], { color: G });
  step("s3r", 820, 300, 3); txt("s3r-t", 870, 305, "Cache hit: Return value", { size: 16 });
  arrow("r6", "app", "top", 860, "pe-r", "bottom", 1560, [400], { color: G, firstDir: "v" });
  step("s6r", 1040, 410, 6); txt("s6r-t", 1090, 415, "Store results in Redis with TTL", { size: 16 });
  arrow("r4", "app", "bottom", 760, "pe-p", "left", 870, [], { color: G, firstDir: "v" });
  step("s4r", 800, 820, 4); txt("s4r-t", 850, 825, "Cache miss: Query PostgreSQL", { size: 16 });
  arrow("r5", "pe-p", "left", 910, "app", "bottom", 720, [720], { color: G });
  step("s5r", 620, 900, 5); txt("s5r-t", 620, 950, "Return PostgreSQL\nresults", { size: 16 });
  // write flow
  arrow("w3", "app", "right", 560, "pe-r", "bottom", 1680, [1680], { color: B });
  W("s3w", 1000, 500, 3); txt("s3w-t", 1050, 495, "Invalidate affected Redis keys.\nNext read repopulates cache.", { size: 16 });
  arrow("w2", "app", "right", 640, "pe-p", "top", 1615, [1615], { color: B });
  W("s2w", 1000, 660, 2); txt("s2w-t", 1050, 665, "Write and commit authoritative data", { size: 16 });
  arrow("pr", "pe-r", "right", 270, "redis", "left", 270);
  arrow("pp", "pe-p", "right", 870, "pg", "left", 870);
  // telemetry
  arrow("m-in", "inner", "bottom", 640, "mon", "left", 1200, [], { color: M, firstDir: "v" });
  arrow("m-pg", "pg", "bottom", 2050, "mon", "right", 1200, [], { color: M, firstDir: "v" });
  arrow("m-r", "redis", "right", 275, "mon", "right", 1250, [2260], { color: M });

  step("lg-r", 80, 880, ""); txt("lg-r-t", 130, 888, "Read flow", { size: 18 });
  W("lg-w", 80, 940, ""); txt("lg-w-t", 130, 948, "Write flow", { size: 18 });
  txt("footer", 60, 1400, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Cache-aside caching using Azure Managed Redis and Azure Database for PostgreSQL\"", { size: 20, color: "#495057" });
}
