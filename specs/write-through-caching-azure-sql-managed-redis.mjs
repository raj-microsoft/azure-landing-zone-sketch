// 023 Write-through caching with Azure Managed Redis and Azure SQL Database.
export const meta = {
  num: 23,
  slug: "write-through-caching-azure-sql-managed-redis",
  title: "Write-through caching with Azure Managed Redis and Azure SQL Database",
  url: "https://learn.microsoft.com/azure/architecture/databases/architecture/write-through-caching-azure-sql-managed-redis",
  category: "Databases",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Client application": "browser", "Application tier (App Service)": "app-services", "Write-through / repair function": "function-apps" },
  differences: [
    "Green circles are the read flow and blue squares the write flow, as in the original; a small legend is added.",
  ],
};

export function draw(k) {
  const { TINT, txt, box, card, group, step, arrow } = k;
  const W = { square: true, fill: "#d0ebff", stroke: "#1971c2" };
  txt("title", 60, 10, "Write-through caching with Azure Managed Redis and Azure SQL Database", { size: 30 });
  group("vnet", 400, 70, 1340, 1240, "Azure virtual network", { fill: TINT.white, dashed: true, stroke: "#1971c2", iconName: "virtual-networks" });
  group("rg", 470, 160, 1220, 1110, null, { fill: TINT.mg });
  group("inner", 510, 190, 1140, 880, null, { fill: TINT.white, dashed: true });
  card("client", 60, 520, 230, 150, "browser", "Client application");
  card("app", 640, 520, 240, 160, "app-services", "Application tier\nApp Service");
  card("fn", 1040, 520, 260, 160, "function-apps", "Write-through function\nRepair function");
  card("per", 1380, 220, 240, 160, "private-endpoints", "Private endpoint\n(Azure Managed Redis)", { size: 16 });
  card("pes", 1380, 840, 240, 160, "private-endpoints", "Private endpoint\n(Azure SQL Database)", { size: 16 });
  card("mon", 1380, 1110, 240, 140, "monitor", "Azure Monitor");
  group("redz", 1800, 180, 330, 260, null, { fill: TINT.mg });
  card("redis", 1830, 210, 270, 200, "azure-managed-redis", "Azure Managed Redis\ndistributed cache");
  group("sqlz", 1800, 800, 330, 260, null, { fill: TINT.mg });
  card("sql", 1830, 830, 270, 200, "sql-database", "Azure SQL Database\nsystem of record");

  arrow("https", "client", "right", 595, "app", "left", 595);
  txt("https-t", 300, 535, "HTTPS\nrequests", { size: 18 }); step("g1", 330, 470, 1); step("b1", 330, 630, 1, W);
  arrow("read", "app", "top", 700, "per", "left", 260, [260]);
  txt("read-t", 710, 400, "Read\nrequests", { size: 18 }); step("g2", 820, 400, 2);
  arrow("write", "app", "right", 595, "fn", "left", 595);
  txt("write-t", 900, 535, "Write\nrequests", { size: 18 }); step("b2", 930, 630, 2, W);
  arrow("miss", "app", "bottom", 700, "pes", "left", 960, [960]);
  txt("miss-t", 710, 720, "Cache-miss\nread requests", { size: 18 }); step("g4", 860, 900, 4);
  arrow("sync", "fn", "top", 1170, "per", "left", 320, [320]);
  txt("sync-t", 1190, 390, "Synchronous write-\nthrough cache update", { size: 18 }); step("b4", 1240, 460, 4, W); step("b5", 1300, 460, 5, W);
  arrow("auth", "fn", "bottom", 1170, "pes", "left", 900, [900]);
  txt("auth-t", 1190, 740, "Authoritative writes\nvia Functions", { size: 18 }); step("b3", 1190, 795, 3, W); step("b6", 1320, 600, 6, W);
  arrow("pr", "per", "right", 300, "redis", "left", 300); step("g3", 1750, 240, 3);
  step("g5", 1200, 200, 5);
  arrow("ps", "pes", "right", 920, "sql", "left", 920);
  arrow("met", "inner", "bottom", 560, "mon", "left", 1180, [], { dashed: true });
  txt("met-t", 780, 1190, "Metrics and logs", { size: 18 });
  arrow("met2", "sql", "right", 930, "mon", "right", 1180, [2180], { dashed: true });
  txt("leg", 60, 1200, "Circles: read flow\nSquares: write flow", { size: 18, color: "#495057" });

  txt("footer", 60, 1340, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Write-through caching with Azure Managed Redis and Azure SQL Database\"", { size: 20, color: "#495057" });
}
