// 033 Use Qlik to replicate mainframe and midrange data to Azure.
export const meta = {
  num: 33,
  slug: "mainframe-midrange-data-replication-azure-qlik",
  title: "Use Qlik to replicate mainframe and midrange data to Azure",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/mainframe/mainframe-midrange-data-replication-azure-qlik",
  category: "Mainframe",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Host agent": "gear", "Replication server": "server-farm", "Azure ExpressRoute": "expressroute-circuits", "Azure SQL": "sql-database", "Azure Database for MySQL": "azure-database-mysql-server", "Azure Database for PostgreSQL": "azure-database-postgresql-server", "Azure Cosmos DB": "azure-cosmos-db", "Azure Databricks": "azure-databricks" },
  differences: [
    "Db2, IMS, VSAM, change logs and Qlik Data Integration are labelled sketch shapes (non-Azure).",
    "Eventstream, Eventhouse, OneLake and Microsoft Fabric are labelled shapes (no sketch icons for Fabric items).",
    "The two ExpressRoute edge routers are small labelled boxes.",
  ],
};

export function draw(k) {
  const { TINT, txt, box, card, group, step, arrow } = k;
  txt("title", 60, 10, "Use Qlik to replicate mainframe and midrange data to Azure", { size: 30 });
  group("op", 60, 80, 1200, 900, "On-premises datacenter", { fill: TINT.onprem, dashed: true, align: "center", size: 22 });
  group("mf", 100, 160, 520, 780, "Mainframe and midrange data", { fill: TINT.white, align: "center" });
  for (const [n, y, lbl] of [["db2", 220, "Db2"], ["ims", 450, "IMS"], ["vsam", 680, "VSAM"]]) {
    box(n, 130, y, 150, 90, lbl, { type: "ellipse", fill: TINT.data });
    box(`${n}-cl`, 320, y + 110, 160, 80, "Change log", { size: 16 });
    arrow(`${n}-a`, n, "right", null, `${n}-cl`, "top", 400);
  }
  card("agent", 650, 380, 170, 170, "gear", "Host agent"); step("s1", 715, 320, 1);
  group("rep", 850, 220, 250, 400, "Replication server", { fill: TINT.white, align: "center" });
  card("rsrv", 870, 270, 210, 150, "server-farm", "Server", { size: 16 });
  box("qlik", 870, 460, 210, 130, "Qlik Data\nIntegration\nplatform", { size: 18, fill: TINT.onprem });
  step("s2", 1050, 170, 2);
  box("r1", 1135, 410, 120, 80, "Router", { size: 16 });
  card("er", 1290, 370, 170, 170, "expressroute-circuits", "Azure\nExpressRoute", { size: 16 });

  group("az", 1490, 80, 1400, 900, "Azure", { fill: TINT.sub, dashed: true, align: "center", size: 22 });
  box("r2", 1505, 410, 120, 80, "Router", { size: 16 });
  group("si", 1640, 140, 560, 620, "Stream ingestion", { fill: TINT.white });
  step("s3", 1880, 150, 3);
  group("sp", 1670, 220, 500, 510, "Stage & prepare", { fill: TINT.data, align: "center" });
  box("es", 1700, 300, 160, 110, "Eventstream", { size: 18 });
  box("eh", 1990, 300, 160, 110, "Eventhouse", { size: 18 });
  box("ol", 1990, 590, 160, 110, "OneLake", { size: 18 });
  arrow("hot", "es", "right", 355, "eh", "left", 355); txt("hot-t", 1895, 310, "Hot", { size: 18 });
  arrow("cold", "eh", "bottom", 2070, "ol", "top", 2070, [], { dashed: true });
  txt("cold-t", 1730, 470, "Cold, using\nOneLake\navailability", { size: 16 });

  group("ds", 2280, 140, 580, 620, "Azure data services", { fill: TINT.white, align: "center" });
  step("s4", 2800, 150, 4);
  card("sql", 2310, 200, 240, 170, "sql-database", "Azure SQL");
  card("my", 2590, 200, 240, 170, "azure-database-mysql-server", "Azure Database\nfor MySQL", { size: 18 });
  card("pg", 2310, 385, 240, 170, "azure-database-postgresql-server", "Azure Database\nfor PostgreSQL", { size: 18 });
  card("cos", 2590, 385, 240, 170, "azure-cosmos-db", "Azure\nCosmos DB");
  card("dbx", 2310, 570, 240, 170, "azure-databricks", "Azure\nDatabricks");
  box("fab", 2590, 570, 240, 170, "Microsoft Fabric", { size: 18, fill: TINT.onprem });

  arrow("m-ag", "mf", "right", 465, "agent", "left", 465, [], { head: null });
  arrow("ag-rep", "agent", "right", 465, "rep", "left", 465, [], { head: null });
  arrow("rep-r1", "rep", "right", 450, "r1", "left", 450, [], { head: null });
  arrow("er-r1", "er", "left", 450, "r1", "right", 450);
  arrow("r2-er", "r2", "left", 450, "er", "right", 450, [], { head: null });
  arrow("r2-si", "r2", "right", 450, "si", "left", 450, [], { head: null });
  arrow("si-ds", "si", "right", 450, "ds", "left", 450);
  arrow("rep-ds", "rep", "bottom", 950, "ds", "bottom", 2620, [920]);
  arrow("si-ds2", "si", "bottom", 1900, "ds", "bottom", 2540, [860]);

  txt("footer", 60, 1010, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Use Qlik to replicate mainframe and midrange data to Azure\"", { size: 20, color: "#495057" });
}
