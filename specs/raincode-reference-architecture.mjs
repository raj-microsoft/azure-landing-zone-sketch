// 115 Raincode mainframe COBOL migration to Azure (reference architecture).
export const meta = {
  num: 115,
  slug: "raincode-reference-architecture",
  title: "Rehost mainframe applications to Azure with Raincode compilers",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/app-modernization/raincode-reference-architecture",
  category: "Mainframe",
  status: "done",
  otherDiagrams: ["img0: legacy COBOL mainframe architecture (pre-migration)"],
  substitutions: { "Peer virtual network": "virtual-network-gateways", "AKS cluster/VM": "kubernetes-services", "Business apps": "app-service-plans", "Online/Batch services": "app-services", "SSD managed disk": "disks", "Accelerated networking": "network-interfaces", "Azure Files, NetApp CIFS/NFS": "storage-azure-files", "Active Directory domain controllers": "entra-domain-services", "System and network management": "monitor", "Azure Analytics (Databricks, Power BI)": "azure-databricks", "Azure Blob container": "blob-block", "Azure Data Factory v2": "data-factories", "Azure Stream Analytics or Kafka": "stream-analytics-jobs", "Users": "users" },
  differences: ["Main diagram is img1 (img0 is the legacy mainframe).", "The business-app glyph pair (apps grid + function) is shown as one App Service plan icon per row.", "Blob containers 1, 2 and [n] shown as 1 and [n].", "Region 2 is drawn as a narrower zone with the replicated data services only, as in the official diagram."],
};

export function draw(k) {
  const { TINT, txt, card, group, box, icon, arrow, step } = k;
  const S = 16;
  const both = (id, f, fs, fa, t, ts, ta, lanes = [], o = {}) => arrow(id, f, fs, fa, t, ts, ta, lanes, { tail: "arrow", ...o });
  const C = (id, x, y, ic, l, w = 180, h = 120) => card(id, x, y, w, h, ic, l, { size: S });
  txt("title", 40, 0, "Mainframe COBOL rehost to Azure with Raincode", { size: 28 });

  txt("onp-lbl", 40, 60, "On-premises", { size: 22 });
  C("er", 60, 120, "expressroute-circuits", "ExpressRoute", 200, 130);
  txt("er-lbl", 115, 262, "Web browsing\nTLS over port 443", { size: 16 });
  step("s1", 220, 320, 1);
  C("opu", 60, 420, "users", "On-premises user", 200, 130);
  both("a-er", "er", "bottom", 100, "opu", "top", 100, [], { firstDir: "v" });

  txt("az-lbl", 360, 60, "Azure", { size: 22 });
  C("azu", 900, 40, "users", "Users from Azure systems", 260, 110);
  group("r1", 360, 170, 1560, 1400, null, { fill: TINT.white, dashed: true });
  txt("r1-lbl", 1720, 180, "Azure region 1", { size: 18 });
  C("peer", 960, 200, "virtual-network-gateways", "Peer virtual network", 220, 110);
  arrow("a-azu", "azu", "bottom", 1030, "peer", "top", 1030);
  group("vnet", 380, 340, 1120, 860, null, { fill: TINT.sub });
  icon("vnet-i", "virtual-networks", 395, 350, 40);
  txt("vnet-lbl", 445, 357, "Virtual network (10.0.0.0/24)", { size: 18 });
  C("lb", 880, 360, "load-balancers", "Azure Load Balancer", 240, 110);
  arrow("a-web", "er", "right", 150, "lb", "top", 900, [900], {});
  arrow("a-peer", "peer", "bottom", 1070, "lb", "top", 1070);
  step("s2", 1180, 450, 2);

  const col = (p, x) => {
    C(`${p}aks`, x + 90, 500, "kubernetes-services", "AKS cluster/VM", 200, 110);
    group(`${p}col`, x, 630, 390, 520, null, { fill: TINT.white });
    group(`${p}on`, x + 15, 645, 360, 180, null, { fill: TINT.app });
    txt(`${p}on-lbl`, x + 90, 652, "Online services", { size: 16 });
    box(`${p}on1`, x + 30, 680, 330, 60, "Business apps", { size: 16, iconLeft: "app-service-plans" });
    box(`${p}on2`, x + 30, 750, 330, 60, "Business apps", { size: 16, iconLeft: "app-service-plans" });
    group(`${p}ba`, x + 15, 840, 360, 180, null, { fill: TINT.app });
    txt(`${p}ba-lbl`, x + 90, 847, "Batch services", { size: 16 });
    box(`${p}ba1`, x + 30, 875, 330, 60, "Business apps", { size: 16, iconLeft: "app-service-plans" });
    box(`${p}ba2`, x + 30, 945, 330, 60, "Business apps", { size: 16, iconLeft: "app-service-plans" });
    box(`${p}dk`, x + 15, 1030, 175, 60, "SSD managed\ndisk", { size: 16, iconLeft: "disks" });
    box(`${p}nw`, x + 200, 1030, 175, 60, "Accelerated\nnetworking", { size: 16, iconLeft: "network-interfaces" });
    box(`${p}fs`, x + 15, 1090, 360, 60, "Azure Files, NetApp CIFS/NFS", { size: 16, iconLeft: "storage-azure-files" });
  };
  col("a", 400, 0);
  col("b", 960, 0);
  arrow("a-lb1", "lb", "left", 415, "aaks", "top", 590, [590]);
  arrow("a-lb2", "lb", "right", 415, "baks", "top", 1150, [1150]);
  step("s3", 860, 720, 3);
  step("s4", 860, 910, 4);
  step("s5", 860, 1060, 5);
  icon("nsg", "network-security-groups", 395, 1150, 40);

  C("pl1", 1540, 600, "private-link", "Private Link for Azure SQL,\nPostgreSQL or Cosmos DB", 260, 150);
  arrow("a-pl1", "bcol", "right", 680, "pl1", "left", 680);
  C("ad1", 1560, 215, "entra-domain-services", "Active Directory\nprimary DC", 160, 130);
  C("ad2", 1740, 215, "entra-domain-services", "Active Directory\nbackup DC", 160, 130);
  step("s8", 1510, 240, 8);
  C("sql1", 1540, 420, "sql-database", "Azure SQL Database", 260, 70);
  C("pg1", 1540, 500, "azure-database-postgresql-server", "Azure Database for PostgreSQL", 340, 80);
  step("s6", 1850, 600, 6);
  C("cos1", 1540, 780, "azure-cosmos-db", "Azure Cosmos DB", 260, 70);
  C("sa", 1540, 870, "stream-analytics-jobs", "Azure Stream Analytics\nor Kafka", 260, 100);
  C("mgmt", 1540, 990, "monitor", "System and network\nmanagement", 260, 100);
  C("ana", 1540, 1110, "azure-databricks", "Azure Analytics\n(Databricks, Power BI, etc.)", 300, 110);

  group("r2", 1980, 170, 360, 1400, null, { fill: TINT.white, dashed: true });
  txt("r2-lbl", 2140, 180, "Azure region 2", { size: 18 });
  C("sql2", 2010, 420, "sql-database", "Azure SQL Database", 300, 70);
  C("pg2", 2010, 500, "azure-database-postgresql-server", "Azure Database for\nPostgreSQL", 300, 80);
  C("cos2", 2010, 780, "azure-cosmos-db", "Azure Cosmos DB", 300, 70);
  both("r-sql", "sql1", "right", 455, "sql2", "left", 455);
  both("r-pg", "pg1", "right", 540, "pg2", "left", 540);
  both("r-cos", "cos1", "right", 815, "cos2", "left", 815);

  C("pl2", 860, 1215, "private-link", "Private Link", 160, 100);
  arrow("a-pla", "acol", "bottom", 760, "pl2", "left", 1265, [1265], { firstDir: "v" });
  arrow("a-plb", "bcol", "bottom", 1150, "pl2", "right", 1265, [1265], { firstDir: "v" });
  txt("nsg-t", 445, 1160, "Network security group", { size: 16 });

  C("sto", 400, 1240, "storage-accounts", "Azure storage account\nLanding zone from external", 300, 110);
  group("blobs", 400, 1370, 400, 160, null, { fill: TINT.white });
  box("b1", 410, 1380, 380, 60, "Azure Blob container 1", { size: 16, iconLeft: "blob-block" });
  box("b2", 410, 1460, 380, 60, "Azure Blob container [n]", { size: 16, iconLeft: "blob-block" });
  C("adf", 900, 1370, "data-factories", "Azure Data Factory v2\nEvent trigger based pipeline", 300, 130);
  arrow("a-b1", "b1", "right", 1410, "adf", "left", 1410);
  arrow("a-b2", "b2", "right", 1490, "adf", "left", 1480, [850]);
  step("s7", 830, 1520, 7);
  C("wfs", 1300, 1370, "storage-azure-files", "Azure Files storage\nLocal working share", 300, 130);
  arrow("a-wfs", "adf", "right", 1435, "wfs", "left", 1435);
  arrow("a-pl2", "pl2", "right", 1290, "wfs", "top", 1450, [1450]);
  txt("footer", 40, 1620, "Pencil-sketch redraw of the Azure Architecture Center diagram \"legacy architecture migration to Azure workflow\"", { size: 20, color: "#495057" });
}
